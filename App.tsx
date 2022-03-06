import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { ContactsScreen } from "./ContactsScreen"
import { UpNextScreen } from "./UpNextScreen"
import * as Contacts from "expo-contacts"
export type Frequencies = Record<string, string>

export interface ScreenProps {
  frequencies: Frequencies
  setFrequencies: Dispatch<SetStateAction<Frequencies>>
  switchScreen: () => void
  contacts: Contacts.Contact[]
}

export default function App() {
  const [frequencies, setFrequencies] = useState<Frequencies>({})
  const [isOnContactsScreen, setIsOnContactsScreen] = useState(true)
  const [contacts, setContacts] = useState<Contacts.Contact[]>([])

  useEffect(() => {
    ;(async () => {
      const { status } = await Contacts.requestPermissionsAsync()
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails],
        })

        if (data.length > 0) setContacts(data)
      }
    })()
  }, [])
  function switchScreen() {
    setIsOnContactsScreen(!isOnContactsScreen)
  }
  return isOnContactsScreen ? (
    <ContactsScreen
      {...{ switchScreen, frequencies, setFrequencies, contacts }}
    />
  ) : (
    <UpNextScreen
      {...{ switchScreen, frequencies, setFrequencies, contacts }}
    />
  )
}
