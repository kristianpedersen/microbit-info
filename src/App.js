import "./App.css"
import { useRef, useState } from "react"
import Connection from "./Connection"
import SimpleLogWindow from "./SimpleLogWindow"
import styled from "styled-components"

export default function App() {
  const logWindow = useRef()
  const [microbit, setMicrobit] = useState()
  const [messages, setMessages] = useState([])
  const [keys, setKeys] = useState(new Set())

  const allProps = {
    logWindow,
    keys, setKeys,
    messages, setMessages,
    microbit, setMicrobit,
  }

  return (
    <ButtonsAndLogWindow>
      <Connection {...allProps} />
      <SimpleLogWindow {...allProps} />
    </ButtonsAndLogWindow>
  )
}

const ButtonsAndLogWindow = styled.div`
  display: flex;
  flex-direction: column;
`