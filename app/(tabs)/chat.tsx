import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChatScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Text style={styles.title}>Chat</Text>
      <Text style={styles.subtitle}>Talk with your coach and training partners.</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>No new messages</Text>
        <Text style={styles.cardSubtitle}>Start a conversation to get personalized tips.</Text>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0d12',
    paddingHorizontal: 24,
    paddingTop: 56,
  },
  title: {
    color: '#f8fafc',
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#141824',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  cardTitle: {
    color: '#e2e8f0',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  cardSubtitle: {
    color: '#94a3b8',
    fontSize: 14,
    lineHeight: 20,
  },
});
