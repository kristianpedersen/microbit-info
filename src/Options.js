import { v4 as uuidv4 } from 'uuid'
import styled from "styled-components"

export default function Options({ formRef, keys, ranges, setRanges }) {
	function setMessageRange(event) {
		setRanges(prev => ({ ...prev, [event.target.id]: Number(event.target.value) }))
	}

	return (
		<KeyForm ref={formRef}>
			{([...keys].map(key => {
				const id = uuidv4()
				return (
					<KeyLabel
						htmlFor={id}
						id={key}
						name={id}
						style={{ padding: "1rem", border: "1px solid", display: "inline-block" }}
					>
						<input type="checkbox" name={id} id={id} defaultChecked />
						{key}
						<RangeSpan>
							From min
							<input type="number" name="min-from" id="min-from" onChange={setMessageRange} />
							From max
							<input type="number" name="max-from" id="max-from" onChange={setMessageRange} />
						</RangeSpan>
					</KeyLabel>
				)
			})
			)}
		</KeyForm>
	)
}

const KeyForm = styled.form`
	padding: 1rem;
	padding-left: 0;
`

const KeyLabel = styled.label`
	background-color: hsl(210, 100%, 90%);
	padding-right: 0;
`

const RangeSpan = styled.span`
	background-color: hsl(30, 100%, 90%);
	margin-left: 1rem;
	margin-right: 0;
`