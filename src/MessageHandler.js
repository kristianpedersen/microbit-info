import { useRef, useState } from "react"
import Connection from "./Connection"
import SimpleLogWindow from "./SimpleLogWindow"

export default function MessageHandler({ keys, setKeys }) {
	const logWindow = useRef()
	const [microbit, setMicrobit] = useState()
	const [messages, setMessages] = useState([])
	const allProps = {
		keys, setKeys,
		logWindow,
		messages, setMessages,
		microbit, setMicrobit
	}

	return (
		<>
			<Connection {...allProps} />
			<SimpleLogWindow {...allProps} />
		</>
	)
}