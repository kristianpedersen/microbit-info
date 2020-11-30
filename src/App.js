import { useState } from "react"
import Connection from "./Connection"
import "./App.css"

export default function App() {
  const [device, setDevice] = useState("")
  return (
    <>
      <Connection {...{ device, setDevice }} />
    </>
  )
}
