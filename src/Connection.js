let device
let msg = ""

export default function Connection({
	formRef,
	numberOfReceivedMessages,
	setKeys,
	setMessages,
	setMicrobit
}) {
	// User action is required to connect to WebUSB
	async function connect() {
		device = await navigator.usb.requestDevice({
			filters: [{ "vendorId": 0x0d28 }]
		})
		await device.open()
		await device.selectConfiguration(1)
		await device.claimInterface(2)
		setMicrobit(device)
		readLoop()
	}

	async function disconnect() {
		await device.close()
	}

	function getKeysAndValuesFromString(msgString) {
		const chars = msgString.split("")
		// During tests, I would sometimes get several messages in one go, for example, "x:100y:200z:300".
		// If current === ":"
		// To find the key, loop backwards, concatenate, and break if the character is a number.
		// To find the value, loop forwards, concatenate, and break if the character is not "-" or a number.
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

	async function readLoop() {
		numberOfReceivedMessages.current++
		const results = await device.transferIn(4, 64)
		const decoder = new TextDecoder()
		const receivedData = decoder.decode(results.data).trim()

		if (receivedData.length > 0) {
			msg += receivedData
		} else {
			msg = getKeysAndValuesFromString(msg)
			if (msg.length > 0) {
				for (let m of msg) {
					const key = String(m).split(":")[0].trim()

					setMessages(prev => {
						const d = new Date()
						const hour = d.getHours()
						const minutes = String(d.getMinutes()).padStart(2, "0")
						const seconds = String(d.getSeconds()).padStart(2, "0")
						const time = `${hour}:${minutes}:${seconds}`

						if (prev === undefined) {
							return [{ time, msg: m }]
						} else if (m !== "") {
							const labels = [...formRef.current.querySelectorAll("label")]
							const key = m.split(":")[0]
							const label = labels.filter(l => l.id === key)[0]

							if (label !== undefined) {
								const input = label.querySelector("input")
								if (input.checked) {
									return [...prev.slice(-10), { time, msg: m }]
								}
							}
						}
						return prev
					})

					if (numberOfReceivedMessages.current > 100) {
						setKeys(prev => [...new Set([...prev, key])])
					}
				}
			}
			msg = ""
		}
		readLoop()
	}

	function clear() {
		setKeys([])
	}

	return (
		<div>
			<button onClick={connect}>Connect micro:bit</button>
			<button onClick={disconnect}>Disconnect</button>
			<button onClick={clear}>Clear keys</button> {/*Messages arrive incomplete under rare circumstances*/}
		</div>
	)
}