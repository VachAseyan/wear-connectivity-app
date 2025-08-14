import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { watchEvents } from "react-native-wear-connectivity";

export default function WatchApp() {
  const [message, setMessage] = useState('⌚ Waiting for messages...');
  const [status, setStatus] = useState('Listening...');

  useEffect(() => {
    const handleMessage = (receivedMessage) => {
      console.log('Message received:', receivedMessage);

      let displayText = '';
      if (typeof receivedMessage === 'string') {
        displayText = receivedMessage;
      } else if (receivedMessage && receivedMessage.text) {
        displayText = receivedMessage.text;
      } else {
        displayText = String(receivedMessage);
      }

      setMessage(displayText);
      setStatus('✅ Message received!');
    };

    const unsubscribe = watchEvents.on('message', handleMessage);

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⌚ Watch</Text>

      <Text style={styles.status}>{status}</Text>

      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  status: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: '#999',
  },
  messageContainer: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 8,
    minHeight: 100,
    justifyContent: 'center',
  },
  messageText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});