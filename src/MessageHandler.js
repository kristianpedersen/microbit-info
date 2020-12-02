import { useRef, useState } from "react"
import Connection from "./Connection"
import SimpleLogWindow from "./SimpleLogWindow"

export default function MessageHandler({
	formRef,
	keys, setKeys,
	numberOfReceivedMessages
}) {
	const logWindow = useRef()
	const [microbit, setMicrobit] = useState()
	const [messages, setMessages] = useState([])

	const allProps = {
		formRef,
		logWindow,
		numberOfReceivedMessages,
		keys, setKeys,
		messages, setMessages,
		microbit, setMicrobit,
	}

	return (
		<>
			<Connection {...allProps} />
			<SimpleLogWindow {...allProps} />
		</>
	)
}