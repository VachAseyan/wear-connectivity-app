import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { watchEvents } from "react-native-wear-connectivity";

export default function WatchApp() {
  const [receivedText, setReceivedText] = useState('Waiting for message...');
  const [status, setStatus] = useState('Ready');

  useEffect(() => {
    // Listen for messages from phone
    const unsubscribe = watchEvents.on('message', (message) => {
      console.log('⌚ Received from phone:', message);

      try {
        // Parse the message
        let data;
        if (typeof message === 'string') {
          data = JSON.parse(message);
        } else if (message.data) {
          data = typeof message.data === 'string' ? JSON.parse(message.data) : message.data;
        } else {
          data = message;
        }

        // Check if it's our text message
        if (data.type === "SHOW_TEXT") {
          setReceivedText(data.text);
          setStatus('Message received!');
          console.log('⌚ Showing text:', data.text);
        }
      } catch (error) {
        console.log('❌ Error parsing message:', error);
        setStatus('Error receiving message');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⌚ Watch Display</Text>

      <Text style={styles.status}>{status}</Text>

      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>{receivedText}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  status: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 15,
    color: '#999',
  },
  messageContainer: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 10,
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