import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ChatScreen: React.FC = () => {
  const previewMessages = useMemo(
    () => [
      { id: '1', sender: 'Coach Somchai', message: 'Warm-up starts in 10 minutes.' },
      { id: '2', sender: 'Gym Staff', message: 'New sparring session added for Friday.' },
    ],
    [],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CHAT</Text>
      <Text style={styles.subtitle}>TRAINING UPDATES</Text>
      <View style={styles.cardList}>
        {previewMessages.map((item) => (
          <View key={item.id} style={styles.messageCard}>
            <Text style={styles.sender}>{item.sender}</Text>
            <Text style={styles.message}>{item.message}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c0c0e',
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#f7f7f7',
    letterSpacing: 1,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 12,
    letterSpacing: 3,
    color: '#16c5d1',
  },
  cardList: {
    marginTop: 24,
    gap: 16,
  },
  messageCard: {
    borderRadius: 20,
    padding: 16,
    backgroundColor: '#141417',
    borderWidth: 1,
    borderColor: '#222229',
  },
  sender: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f7f7f7',
  },
  message: {
    marginTop: 8,
    fontSize: 13,
    color: '#8b8b94',
    lineHeight: 18,
  },
});
