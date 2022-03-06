import React, { useEffect, useState } from "react"
import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import * as Contacts from "expo-contacts"
import { OurModal } from "./Modal"

export type Frequencies = Record<string, string>

export default function App() {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([])
  const [selectedContactId, setSelectedContactId] = useState<string | false>(
    false
  )
  const [frequencies, setFrequencies] = useState<Frequencies>({})
  useEffect(() => {
    ;(async () => {
      const { status } = await Contacts.requestPermissionsAsync()
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails],
        })

        if (data.length > 0) {
          setContacts(data)
          const contact = data[0]
          console.log(contact)
        }
      }
    })()
  }, [])

  function handlePress(id: string): void {
    setSelectedContactId(id)
  }

  return (
    <View style={styles.container}>
      <OurModal
        {...{
          setSelectedContactId,
          selectedContactId,
          setFrequencies,
          frequencies,
        }}
      />
      {contacts.map(({ firstName, lastName, id }) => (
        <TouchableOpacity key={id} onPress={() => handlePress(id)}>
          <Text>
            {firstName} {lastName}: {frequencies[id]}
          </Text>
        </TouchableOpacity>
      ))}
      <Text>Contacts Module Example</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
