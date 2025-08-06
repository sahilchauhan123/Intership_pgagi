// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const Submission = () => {
//     return (
//         <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
//             <Text style={{ color: 'black', fontSize: 18 }}>🧾 Idea Submission Screen</Text>
//         </View>
//     )
// }

// export default Submission

// const styles = StyleSheet.create({})



import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button,useTheme } from 'react-native-paper';

const Submission = () => {
  const [startupName, setStartupName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const { colors } = useTheme();

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
      <Text variant="titleLarge" style={[styles.title, { color: colors.primary }]}>
        🧾 Idea Submission
      </Text>

      <TextInput
        label="Startup Name"
        value={startupName}
        onChangeText={setStartupName}
        style={styles.input}
        mode="outlined"
      />

      <TextInput
        label="Tagline"
        value={tagline}
        onChangeText={setTagline}
        style={styles.input}
        mode="outlined"
      />

      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        multiline
        numberOfLines={4}
        mode="outlined"
      />

      <Button
        mode="contained"
        onPress={() => console.log('Submitted')}
        style={styles.button}
      >
        Submit
      </Button>
    </ScrollView>
  );
};

export default Submission;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
  },
});
