import "./App.css"
import { useRef, useState } from "react"
import Canvas from "./Canvas"
import MessageHandler from "./MessageHandler"
import Options from "./Options"

export default function App() {
  const formRef = useRef(null)
  const [keys, setKeys] = useState([])
  const numberOfReceivedMessages = useRef(0)

  return (
    <>
      <div>
        <MessageHandler {...{ formRef, keys, setKeys, numberOfReceivedMessages }} />
      </div>
      <div>
        <Options {...{ formRef, keys }} />
        {/* <Canvas /> */}
      </div>
    </>
  )
}