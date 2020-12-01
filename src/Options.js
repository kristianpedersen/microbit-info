import { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid'

export default function Options({ keys }) {
	const [clicked, setClicked] = useState(false)
	function handleChange(event) {
		console.log(event.target.checked)
	}

	return (
		<form onClick={() => setClicked(true)} style={{ padding: "1rem", background: "pink" }}>
			{clicked && (
				[...keys].map(k => {
					const id = uuidv4()
					return (
						<label htmlFor={id} name={id} id={id}>
							<input type="checkbox" name={id} id={id} />
							{k}
						</label>
					)
				})
			)}
		</form>
	)
}