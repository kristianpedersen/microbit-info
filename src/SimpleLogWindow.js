import { useEffect, useRef } from "react"
import { v4 as uuidv4 } from 'uuid';
import styled from "styled-components"

export default function SimpleLogWindow({ keys, microbit, messages }) {
	return (
		<div>
			{microbit === undefined
				? <h1>Trykk connect</h1>
				: <h1>{microbit.productName}: {[...keys].join(", ")}</h1>
			}
			{messages.map(m => <p key={uuidv4()}>{`${m.time} / ${m.msg}`}</p>)}
		</div>
	)

}

const LoggingWindow = styled.textarea`
	width: 20%;
	height: 90vh;
	margin-top: 1rem;
`