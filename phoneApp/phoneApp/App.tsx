import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { sendMessage } from "react-native-wear-connectivity";

export default function PhoneApp() {
  const [inputText, setInputText] = useState('');
  const [status, setStatus] = useState('Ready to send');

  const sendToWatch = () => {
    if (!inputText.trim()) {
      setStatus('Please enter some text');
      return;
    }

    console.log('📱 Sending to watch:', inputText);

    sendMessage(
      {
        type: "SHOW_TEXT",
        text: inputText
      },
      // Success
      (reply) => {
        console.log('📱 Sent successfully');
        setStatus(`Sent: "${inputText}"`);
        setInputText('');
      },
      (error) => {
        console.log('❌ Error:', error);
        setStatus(`Error: ${error}`);
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📱 Send to Watch</Text>

      <Text style={styles.status}>{status}</Text>

      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={setInputText}
        placeholder="Type your message here..."
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.button} onPress={sendToWatch}>
        <Text style={styles.buttonText}>Send to Watch</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});