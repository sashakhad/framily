import { Contact } from "expo-contacts"
import React from "react"
import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { ScreenProps } from "./App"

export function UpNextScreen({
  contacts,
  frequencies,
  switchScreen,
}: ScreenProps) {
  const contactsById = contacts.reduce(
    (memo, contact) => ({
      ...memo,
      [contact.id]: contact,
    }),
    {} as Record<string, Contact>
  )
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={switchScreen}>
        <Text>Contacts</Text>
      </TouchableOpacity>
      {Object.keys(frequencies).map((id) => (
        <Text>{`${contactsById[id].firstName} ${contactsById[id].firstName}: ${frequencies[id]}`}</Text>
      ))}
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
