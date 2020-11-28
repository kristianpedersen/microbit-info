
export default function connection({ device, setDevice }) {
	async function connect() {
		const mb = await navigator.usb.requestDevice({
			filters: [{ vendorId: 0x0d28 }]
		})
		setDevice(mb.productName)
	}

	return (
		<div>
			<button onClick={connect}>Test</button>
		</div>
	)
}