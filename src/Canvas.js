// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

import { useEffect, useRef } from "react"
import styled from "styled-components"

export default function Canvas(props) {
	const canvasRef = useRef(null)

	useEffect(() => {
		let t = 0
		const canvas = canvasRef.current
		const [width, height] = [canvas.width, canvas.height]
		const c = canvas.getContext("2d")
		const rnd255 = () => Math.floor(Math.random() * 255)

		function loop() {
			c.fillStyle = `rgb(${rnd255()}, ${rnd255()}, ${rnd255()})`
			c.fillRect(0, 0, width, height)
			t++
			if (t % 60 === 0) {
				requestAnimationFrame(loop)
			}
		}
		loop()
	}, [])

	return <MyCanvas ref={canvasRef}></MyCanvas>
}

const MyCanvas = styled.canvas`
	border: 1px solid black;
	position: absolute;
	right: 0;
	top: 0;
`