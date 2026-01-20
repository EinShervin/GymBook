import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChatScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <Text style={styles.title}>Chat</Text>
        <Text style={styles.subtitle}>COACH MESSAGES</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>No messages yet</Text>
          <Text style={styles.cardBody}>
            Start a conversation with your trainer to plan the next session.
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Quick tip</Text>
          <Text style={styles.cardBody}>Enable notifications so you never miss a reply.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0c0c0e',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#f7f7f7',
    letterSpacing: 0.8,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 12,
    letterSpacing: 3,
    color: '#16c5d1',
  },
  card: {
    marginTop: 20,
    backgroundColor: '#141417',
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: '#222229',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f7f7f7',
  },
  cardBody: {
    marginTop: 8,
    fontSize: 13,
    color: '#8b8b94',
    lineHeight: 18,
  },
});
