import { createContext, useRef, useState } from "react"

export const Context = createContext()

export const ContextProvider = props => {

	return (
		<Context.Provider value={{
			logWindow,
			device, setDevice,
			messages, setMessages
		}}>
			{props.children}
		</Context.Provider>
	)
}