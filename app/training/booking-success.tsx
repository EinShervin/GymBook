import React, { useCallback } from 'react';
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

interface BookingSummary {
  courseTitle: string;
  date: string;
  time: string;
  trainerName: string;
  trainerImage: string;
  reservedCount: string;
}

const bookingSummary: BookingSummary = {
  courseTitle: 'Muay Thai Technik',
  date: 'Montag, 12. Juli',
  time: '18:00 - 19:00 Uhr',
  trainerName: 'Alex Rivers',
  trainerImage:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD4EFulVX07EysCx3bp-xSTWevzL1E4C425l4WyTrN57TAkm6XHEbpEsuFtd9nJIa0QLPRL3y8s_nFF8Cb-pPIvLTEHMDSZFh6ioAQhm-6yg8JWjL6asg2fVU9rvYsJiTfD9Cps38-Q3hvplia9LDSLArVkL0ERr8WkiUEmdOdDDO0Ehvgn2tTH8fVpLBtD944fmAvJ6ppsBDQXdx_X5WhZt9mf8AHbgiMEM3kN4YyRZwAMg9jUWh5hoRrP4LTE4lLtd4hpp9zRvWbi',
  reservedCount: '12/40',
};

const BookingSuccessScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleCalendarPress = useCallback(() => {
    console.log('Add to calendar');
  }, []);

  const handleDonePress = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: 160 + insets.bottom, paddingTop: 24 },
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.iconWrapper}>
          <View style={styles.iconGlow} />
          <MaterialIcons name="check-circle" size={120} color="#4b8dff" style={styles.icon} />
        </View>

        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Buchung</Text>
          <Text style={styles.titleAccent}>Erfolgreich!</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardGlow} />
          <View style={styles.cardSection}>
            <Text style={styles.cardLabelPrimary}>Kurs</Text>
            <Text style={styles.cardTitle}>{bookingSummary.courseTitle}</Text>
          </View>

          <View style={styles.cardDivider} />

          <View style={styles.cardDetails}>
            <View style={styles.cardDetailBlock}>
              <Text style={styles.cardLabel}>Datum</Text>
              <View style={styles.cardDetailRow}>
                <MaterialIcons name="calendar-today" size={16} color="rgba(230,239,255,0.6)" />
                <Text style={styles.cardDetailText}>{bookingSummary.date}</Text>
              </View>
            </View>
            <View style={styles.cardDetailBlock}>
              <Text style={styles.cardLabel}>Zeit</Text>
              <View style={styles.cardDetailRow}>
                <MaterialIcons name="schedule" size={16} color="rgba(230,239,255,0.6)" />
                <Text style={styles.cardDetailText}>{bookingSummary.time}</Text>
              </View>
            </View>
          </View>

          <View style={styles.trainerRow}>
            <ImageBackground
              source={{ uri: bookingSummary.trainerImage }}
              style={styles.trainerAvatar}
              imageStyle={styles.trainerAvatarImage}
            />
            <View>
              <Text style={styles.cardLabel}>Trainer</Text>
              <Text style={styles.trainerName}>{bookingSummary.trainerName}</Text>
            </View>
          </View>
        </View>

        <View style={styles.reservedBadge}>
          <MaterialIcons name="confirmation-number" size={16} color="#4b8dff" />
          <Text style={styles.reservedText}>
            Dein Platz ist reserviert <Text style={styles.reservedCount}>({bookingSummary.reservedCount})</Text>
          </Text>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: 24 + insets.bottom }]}>
        <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8} onPress={handleCalendarPress}>
          <MaterialIcons name="event" size={18} color="#e6efff" />
          <Text style={styles.secondaryButtonText}>Zum Kalender hinzufügen</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.primaryButton} activeOpacity={0.9} onPress={handleDonePress}>
          <Text style={styles.primaryButtonText}>Fertig</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BookingSuccessScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0a1024',
  },
  scrollContent: {
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  iconWrapper: {
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconGlow: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(75,141,255,0.2)',
    shadowColor: '#4b8dff',
    shadowOpacity: 0.3,
    shadowRadius: 24,
  },
  icon: {
    textShadowColor: 'rgba(75,141,255,0.6)',
    textShadowRadius: 12,
  },
  titleWrapper: {
    marginTop: 18,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: -1.2,
    fontStyle: 'italic',
    color: '#e6efff',
  },
  titleAccent: {
    fontSize: 32,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: -1.4,
    fontStyle: 'italic',
    color: '#4b8dff',
    marginTop: 4,
  },
  card: {
    width: '100%',
    marginTop: 28,
    padding: 24,
    borderRadius: 28,
    backgroundColor: '#141f3d',
    borderWidth: 1,
    borderColor: 'rgba(230,239,255,0.08)',
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 24,
    elevation: 4,
    overflow: 'hidden',
  },
  cardGlow: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(75,141,255,0.12)',
  },
  cardSection: {
    paddingBottom: 16,
  },
  cardLabelPrimary: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: '#4b8dff',
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#e6efff',
  },
  cardDivider: {
    height: 1,
    backgroundColor: 'rgba(230,239,255,0.12)',
    marginBottom: 16,
  },
  cardDetails: {
    gap: 16,
  },
  cardDetailBlock: {
    gap: 6,
  },
  cardLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2.4,
    textTransform: 'uppercase',
    color: 'rgba(230,239,255,0.4)',
  },
  cardDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardDetailText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#e6efff',
  },
  trainerRow: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  trainerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(230,239,255,0.16)',
    overflow: 'hidden',
    backgroundColor: '#141f3d',
  },
  trainerAvatarImage: {
    borderRadius: 24,
  },
  trainerName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#e6efff',
    marginTop: 2,
  },
  reservedBadge: {
    marginTop: 22,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(230,239,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(230,239,255,0.1)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
  },
  reservedText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: 'rgba(230,239,255,0.6)',
  },
  reservedCount: {
    color: '#e6efff',
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 24,
    paddingTop: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(230,239,255,0.12)',
    backgroundColor: 'rgba(9,16,36,0.96)',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#141f3d',
    borderWidth: 1,
    borderColor: 'rgba(230,239,255,0.12)',
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#e6efff',
  },
  primaryButton: {
    borderRadius: 16,
    backgroundColor: '#4b8dff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    shadowColor: '#4b8dff',
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 4,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#081022',
  },
});
