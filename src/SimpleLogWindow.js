import { useEffect, useRef } from "react"
import { v4 as uuidv4 } from 'uuid';
import styled from "styled-components"

export default function SimpleLogWindow(props) {
	const { microbit, messages } = props
	const microbitTitle = useRef(null)
	useEffect(function instructUserToConnect() {
		if (microbit === undefined) {
			microbitTitle.current.innerText = "Trykk connect for å sette i gang"
		} else {
			microbitTitle.current.innerText = `${microbit.productName} er koblet til`
		}
	}, [microbit])
	return (
		<div>
			<h1 ref={microbitTitle}></h1>
			{messages.map(m => <p key={uuidv4()}>{`${m.time} / ${m.msg}`}</p>)}
		</div>
	)

}

const LoggingWindow = styled.textarea`
	width: 20%;
	height: 90vh;
	margin-top: 1rem;
`