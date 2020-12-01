import "./App.css"
import { useRef, useState } from "react"
import Connection from "./Connection"
import MessageHandler from "./MessageHandler"
import Options from "./Options"
import styled from "styled-components"

export default function App() {
  const [keys, setKeys] = useState(new Set())

  return (
    <>
      <MessageHandler {...{ keys, setKeys }} />
      <Options {...{ keys }} />
    </>
  )
}