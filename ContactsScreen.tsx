import React, { useEffect, useState } from "react"
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native"
import * as Contacts from "expo-contacts"
import { OurModal } from "./Modal"

export type Frequencies = Record<string, string>

export function ContactsScreen({ switchScreen }: { switchScreen: () => void }) {
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

        if (data.length > 0) setContacts(data)
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
      <TouchableOpacity style={styles.button} onPress={switchScreen}>
        <Text>Done</Text>
      </TouchableOpacity>
      <ScrollView style={styles.scrollView}>
        {contacts.slice(0, 100).map(({ firstName, lastName, id }) => (
          <TouchableOpacity key={id} onPress={() => handlePress(id)}>
            <Text>
              {firstName} {lastName}: {frequencies[id]}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  scrollView: {
    minWidth: 250,
  },
  button: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 5,
    marginTop: 30,
    marginRight: 20,
    alignSelf: "flex-end",
  },
})
