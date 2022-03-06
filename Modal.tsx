import React, { Dispatch, SetStateAction, useState } from "react"
import { Modal, StyleSheet, Text, Pressable, View, Picker } from "react-native"
import { Frequencies } from "./App"

export const OurModal = ({
  selectedContactId,
  setSelectedContactId,
  setFrequencies,
  frequencies,
}: {
  selectedContactId: string | false
  setSelectedContactId: Dispatch<SetStateAction<string | false>>
  setFrequencies: Dispatch<SetStateAction<Frequencies>>
  frequencies: Frequencies
}) => {
  if (!selectedContactId) return null
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={!!selectedContactId}
      onRequestClose={() => {
        setSelectedContactId(false)
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Minimum time till catchup</Text>
          <Picker
            itemStyle={styles.pickerItem}
            style={styles.picker}
            selectedValue={frequencies[selectedContactId]}
            onValueChange={(itemValue) =>
              setFrequencies({
                ...frequencies,
                [selectedContactId]:
                  itemValue !== "Not set" ? itemValue : undefined,
              })
            }
          >
            {[
              "Not set",
              "1 week",
              "2 weeks",
              "1 month",
              "3 months",
              "6 months",
              "1 year",
            ].map((val) => (
              <Picker.Item label={val} value={val} />
            ))}
          </Picker>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setSelectedContactId(false)}
          >
            <Text style={styles.textStyle}>Close Modal</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  picker: {
    width: 300,
  },
  pickerItem: {
    color: "grey",
  },
})
