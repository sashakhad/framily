import React, { useState } from "react"
import { StyleSheet, View, Text, TouchableOpacity } from "react-native"

export function UpNextScreen({ switchScreen }: { switchScreen: () => void }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={switchScreen}>
        <Text>Done</Text>
      </TouchableOpacity>
      <Text>"Up Next Screen yo!"</Text>
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
