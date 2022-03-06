import React, { useState } from "react"
import { ContactsScreen } from "./ContactsScreen"
import { UpNextScreen } from "./UpNextScreen"

export default function App() {
  const [isOnContactsScreen, setIsOnContactsScreen] = useState(true)
  return isOnContactsScreen ? (
    <ContactsScreen switchScreen={() => setIsOnContactsScreen(false)} />
  ) : (
    <UpNextScreen switchScreen={() => setIsOnContactsScreen(true)} />
  )
}
