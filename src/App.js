import { useState } from "react"
import Connection from "./Connection"
import "./app.css"

export default function App() {
  const [device, setDevice] = useState("")
  return (
    <>
      <Connection {...{ device, setDevice }} />
      <p>Connection info</p>
    </>
  )
}
