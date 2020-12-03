import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import WebMidi from "webmidi"
import { clamp, map } from "./Utils"

export default function ListMidiDevices({ messages, ranges }) {
	const h1 = useRef(null)
	const errorMessage = useRef(null)
	const [midiDevices, setMidiDevices] = useState([])
	const [selectedDevice, setSelectedDevice] = useState()

	useEffect(function midiSetup() {
		WebMidi.enable(err => {
			if (err) {
				h1.current.innerText = "Web MIDI works best in Google Chrome"
				errorMessage.innerText = err
			} else {
				if (WebMidi.outputs.length === 0) {
					h1.current.innerHTML = "You need to set up a virtual MIDI port: <a href='https://help.ableton.com/hc/en-us/articles/209774225-How-to-setup-a-virtual-MIDI-bus'>Instructions</a>"
				} else {
					setMidiDevices(() => WebMidi.outputs)
				}
			}
		})
	}, [])

	useEffect(function sendPitchBendOnMessageChange() {
		if (selectedDevice === undefined || messages.length === 0) {
			return
		}

		const lastMessage = messages[0].msg.split(":")[1]
		const normalizedValue = map(lastMessage, ranges["min-from"] || 0, ranges["max-from"] || 0, -1, 1, true) // last parameter is for clamping values

		if (!isNaN(lastMessage)) {
			selectedDevice.sendPitchBend(normalizedValue)
		}
	}, [messages])

	useEffect(function playNoteWhenDeviceChanges() {
		if (selectedDevice === undefined) {
			return
		} else {
			selectedDevice.playNote("C5")
			setTimeout(() => {
				selectedDevice.stopNote("C5")
			}, 100)
		}
	}, [selectedDevice])

	function selectDevice(name) {
		setSelectedDevice(WebMidi.getOutputByName(name))
	}

	return (
		<>
			<h1 ref={h1}>MIDI Output</h1>
			<form>
				{midiDevices.length > 0 && midiDevices.map(device => {
					const deviceName = device.name.replaceAll(" ", "-")
					return (
						<Label htmlFor={deviceName} onClick={() => selectDevice(device.name)}>
							<input
								id={deviceName}
								name="midi-device"
								type="radio"
							/>
							{device.name}
						</Label>
					)
				}
				)}
				<p ref={errorMessage}></p>
			</form>
		</>
	)
}

const Label = styled.label`
	background-color: white;
	/* https://tobiasahlin.com/blog/layered-smooth-box-shadows/ */
	box-shadow: 0 1px 2px rgba(0,0,0,0.07), 
                0 2px 4px rgba(0,0,0,0.07), 
                0 4px 8px rgba(0,0,0,0.07), 
                0 8px 16px rgba(0,0,0,0.07),
                0 16px 32px rgba(0,0,0,0.07), 
                0 32px 64px rgba(0,0,0,0.07);
	padding: 1rem;
`