import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([])
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails],
        });

        if (data.length > 0) {
          setContacts(data)
          const contact = data[0];
          console.log(contact);
        }
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {contacts.map(({firstName, lastName}) => (
        <>
          <Text> {firstName} </Text>
          <Text> {lastName} </Text>
        </>
      ))}
      <Text>Contacts Module Example</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
