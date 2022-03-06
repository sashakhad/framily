import React, { useEffect, useState } from "react"
import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import * as Contacts from "expo-contacts"
import { OurModal } from "./Modal"

export default function App() {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([])
  const [modalVisible, setModalVisible] = useState(false)
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

  function handlePress(firstName?: string): void {
    setModalVisible(true)
  }

  return (
    <View style={styles.container}>
      <OurModal {...{ setModalVisible, modalVisible }} />
      {contacts.map(({ firstName, lastName, id }) => (
        <TouchableOpacity key={id} onPress={() => handlePress(firstName)}>
          <Text>
            {" "}
            {firstName} {lastName}{" "}
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
