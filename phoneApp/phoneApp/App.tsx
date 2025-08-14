import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { sendMessage } from "react-native-wear-connectivity";

export default function PhoneApp() {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('Ready');

  const send = () => {
    if (!message.trim()) {
      setStatus('Please enter a message');
      return;
    }

    setStatus('Sending...');

    sendMessage(
      message.trim(),
      (success) => {
        setStatus('✅ Sent successfully!');
        setMessage('');
      },
      (error) => {
        setStatus(`❌ Failed: ${error}`);
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📱 Send Message</Text>

      <Text style={styles.status}>{status}</Text>

      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Type your message..."
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={send}>
        <Text style={styles.buttonText}>Send to Watch</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 20,
    minHeight: 100,
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