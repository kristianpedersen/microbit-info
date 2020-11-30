let device
let latestMsg = ""
export default function Connection(props) {
	const { setMessages } = props
	async function connect() {
		device = await navigator.usb.requestDevice({
			filters: [{ "vendorId": 0x0d28 }]
		})
		await device.open()
		await device.selectConfiguration(1)
		await device.claimInterface(2)
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
			latestMsg += receivedData
		} else { // Receiving a bunch of blank messages. The first one of these calls setMessages()
			if (latestMsg.length > 0) {
				console.log(latestMsg)
				const h = new Date().getHours()
				const mm = String(new Date().getMinutes()).padStart(2, "0")
				const ss = String(new Date().getSeconds()).padStart(2, "0")
				setMessages(prev => [...prev.slice(-20),
				{
					time: `${h}:${mm}:${ss}`,
					msg: latestMsg
				}
				])
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