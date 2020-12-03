import "./App.css"
import { useRef, useState } from "react"
import Canvas from "./Canvas"
import MessageHandler from "./MessageHandler"
import Options from "./Options"

export default function App() {
  const formRef = useRef(null)
  const [ranges, setRanges] = useState({})
  const [keys, setKeys] = useState([])
  const numberOfReceivedMessages = useRef(0)

  return (
    <>
      <Options {...{ formRef, keys, ranges, setRanges }} />
      {/* <Canvas /> */}
      <MessageHandler {...{
        formRef,
        numberOfReceivedMessages,
        keys, setKeys,
        ranges, setRanges,
      }} />
    </>
  )
}