import { useEffect } from "react"
let device
let latestMsg = ""

export default function Connection(props) {
	const {
		setKeys,
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
		listen()
	}

	async function disconnect() {
		await device.close()
	}

	async function listen() {
		const results = await device.transferIn(4, 1024)
		const decoder = new TextDecoder()
		const receivedData = decoder.decode(results.data).trim()

		if (receivedData.length > 0) {
			// Many messages arrive in irregularly sized chunks, 
			// so we concatenate them until an empty message is received.
			latestMsg += receivedData
		} else {
			if (latestMsg.length > 0) {
				const d = new Date()
				const h = d.getHours()
				const mm = String(d.getMinutes()).padStart(2, "0")
				const ss = String(d.getSeconds()).padStart(2, "0")
				const key = latestMsg.split(":").join(" ").split(" ")[0]

				setMessages(function showMaximum20Messages(prev) {
					return [
						...prev.slice(-20),
						{
							time: `${h}:${mm}:${ss}`,
							msg: latestMsg
						}
					]
				})

				setKeys(function checkMsgForNewKeys(prev) {
					if (prev !== undefined) {
						if (!prev.includes(key)) {
							return [...prev, key]
						} else {
							return prev
						}
					} else {
						return [key]
					}
				})

			}
			latestMsg = ""
		}
		listen()
	}

	return (
		<div>
			<button onClick={connect}>Connect</button>
			<button onClick={disconnect}>Disconnect</button>
		</div>
	)
}