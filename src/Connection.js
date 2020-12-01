let device
let msg = ""

export default function Connection(props) {
	const {
		keys, setKeys,
		setMessages,
		setMicrobit
	} = props

	async function connect() {
		device = await navigator.usb.requestDevice({
			filters: [{ "vendorId": 0x0d28 }]
		})
		await device.open()
		await device.selectConfiguration(1)
		await device.claimInterface(2)
		setMicrobit(device)
		handleReceivedMessage()
	}

	async function disconnect() {
		await device.close()
	}

	function getKeysAndValuesFromString(msgString) {
		const chars = msgString.split("")
		return chars.reduce((total, current, index, array) => {
			if (current === ":") {
				let key = []
				for (let i = index; i >= 0; i--) {
					const thisChar = array[i]
					if ("0123456789".split("").includes(thisChar) && i < index - 1) {
						break
					}
					key.unshift(thisChar)
				}

				let value = ""
				for (let i = index + 1; i < array.length; i++) {
					const thisChar = array[i]
					if (!"0123456789-".split("").includes(thisChar)) {
						break
					}
					value += thisChar
				}
				key = key.join("").slice(0, -1)
				total.push(`${key}: ${value}`)
			}
			return total
		}, [])
	}

	async function handleReceivedMessage() {
		const results = await device.transferIn(4, 2048)
		const decoder = new TextDecoder()
		const receivedData = decoder.decode(results.data).trim()

		if (receivedData.trim().length > 0) {
			msg += receivedData
		} else {
			msg = getKeysAndValuesFromString(msg)
			if (msg.length > 0) {
				for (const m of msg) {
					const key = m.split(":")[0].trim().replaceAll("\n", "")

					setMessages(prev => {
						const d = new Date()
						const hour = d.getHours()
						const minutes = String(d.getMinutes()).padStart(2, "0")
						const seconds = String(d.getSeconds()).padStart(2, "0")
						const time = `${hour}:${minutes}:${seconds}`

						if (prev === undefined) {
							return [{ time, msg: m }]
						} else if (m !== "") {
							return [...prev.slice(-10), { time, msg: m }]
						}
						return prev
					})

					keys.add(key)
				}
			}
			msg = ""
		}
		handleReceivedMessage()
	}

	function clear() {
		setMessages([])
		setKeys(prev => new Set())
	}

	return (
		<div>
			<button onClick={connect}>Connect</button>
			<button onClick={disconnect}>Disconnect</button>
			<button onClick={clear}>Clear</button>
		</div>
	)
}