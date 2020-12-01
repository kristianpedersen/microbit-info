import { useEffect, useRef, useState } from "react"
import { v4 as uuidv4 } from 'uuid'

export default function Options({ keys }) {
	const formRef = useRef()
	const [clicked, setClicked] = useState(true)

	function handleChange(event) {
		const tagName = event.target.tagName
		const checkbox = event.target.querySelector("input")
		switch (tagName) {
			case "INPUT":
				// const cb = event.target.parentNode.querySelector("input")
				break
			case "LABEL":
				checkbox.checked = !checkbox.checked
		}
	}

	return (
		<form
			onClick={() => setClicked(true)}
			ref={formRef}
			style={{
				padding: "1rem", background: "pink"
			}}>
			{clicked && (
				[...keys].map((k, i) => {
					const id = uuidv4()
					return (
						<>
							<label
								htmlFor={id}
								id={id}
								name={id}
								onClick={handleChange}
								style={{ padding: "1rem", border: "1px solid", display: "inline-block" }}
							>
								<input type="checkbox" name={id} id={id} defaultChecked />
								{k}
								<span>
									<input type="number" name="min-from" id="min-from" />
									<input type="number" name="max-from" id="max-from" />
								</span>
							</label>
						</>
					)
				})
			)}
		</form>
	)
}