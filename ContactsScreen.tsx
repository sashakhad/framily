import React, { useEffect, useState } from "react"
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native"
import * as Contacts from "expo-contacts"
import { OurModal } from "./Modal"
import { ScreenProps } from "./App"

export function ContactsScreen({
  frequencies,
  setFrequencies,
  switchScreen,
  contacts,
}: ScreenProps) {
  const [selectedContactId, setSelectedContactId] = useState<string | false>(
    false
  )

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
