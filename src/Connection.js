var device
export default function connection({ microbit, setMicrobit }) {
	async function connect() {
		device = await navigator.usb.requestDevice({
			filters: [{ "vendorId": 0x0d28 }]
		})
		await device.open()
		await device.selectConfiguration(1)
		await device.claimInterface(2)
		console.table(device)
		listen()
	}

	async function disconnect() {
		await device.close()
	}

	async function listen() {
		const results = await device.transferIn(4, 64)
		const decoder = new TextDecoder()
		const message = decoder.decode(results.data).trim()
		if (message.length > 0) {
			console.log(message)
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