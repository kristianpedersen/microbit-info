import Connection from "./Connection"
import { Context, ContextProvider } from "./Context"
import SimpleLogWindow from "./SimpleLogWindow"
import styled from "styled-components"
import { useContext, useRef, useState } from "react"
import "./App.css"

export default function App() {
  const logWindow = useRef()
  const [device, setDevice] = useState()
  const [messages, setMessages] = useState([])

  const allProps = {
    logWindow,
    device, setDevice,
    messages, setMessages
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