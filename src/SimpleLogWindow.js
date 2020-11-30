import { useContext, useEffect } from "react"
import { Context } from "./Context"
import styled from "styled-components"

export default function SimpleLogWindow(props) {
	const { logWindow, messages, setMessages } = props
	return (
		<div>
			{messages.map(m => <p>{`${m.time} / ${m.msg}`}</p>)}
		</div>
	)

}

const LoggingWindow = styled.textarea`
	width: 20%;
	height: 90vh;
	margin-top: 1rem;
`