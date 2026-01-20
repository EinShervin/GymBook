import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AccountScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <Text style={styles.title}>Account</Text>
        <Text style={styles.subtitle}>MEMBERSHIP</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Premium Access</Text>
          <Text style={styles.cardBody}>Unlimited classes, priority booking, and coach chat.</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Next billing date</Text>
          <Text style={styles.cardBody}>October 12, 2024 · CHF 89.00</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AccountScreen;

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
