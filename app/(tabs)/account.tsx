import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface StatItem {
  label: string;
  value: string;
}

const stats: StatItem[] = [
  { label: 'Sessions', value: '18' },
  { label: 'Streak', value: '4 weeks' },
  { label: 'Level', value: 'Intermediate' },
];

const AccountScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ACCOUNT</Text>
      <Text style={styles.subtitle}>TRAINING PROFILE</Text>
      <View style={styles.profileCard}>
        <View>
          <Text style={styles.name}>Nora R.</Text>
          <Text style={styles.plan}>Muay Thai • Unlimited</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>PRO</Text>
        </View>
      </View>
      <View style={styles.statsRow}>
        {stats.map((item) => (
          <View key={item.label} style={styles.statCard}>
            <Text style={styles.statValue}>{item.value}</Text>
            <Text style={styles.statLabel}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default AccountScreen;

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
  profileCard: {
    marginTop: 24,
    padding: 20,
    borderRadius: 24,
    backgroundColor: '#141417',
    borderWidth: 1,
    borderColor: '#222229',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f7f7f7',
  },
  plan: {
    marginTop: 6,
    fontSize: 12,
    color: '#8b8b94',
    letterSpacing: 1,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#f7f7f7',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0b0b0d',
    letterSpacing: 1,
  },
  statsRow: {
    marginTop: 20,
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 18,
    backgroundColor: '#141417',
    borderWidth: 1,
    borderColor: '#222229',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f7f7f7',
  },
  statLabel: {
    marginTop: 6,
    fontSize: 11,
    letterSpacing: 1,
    color: '#6b6b72',
  },
});
