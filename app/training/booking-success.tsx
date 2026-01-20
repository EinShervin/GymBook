import React, { useCallback, useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AccentColors } from '@/constants/theme';
import { trainingById, type TrainingItem } from './training-data';

interface BookingSummary {
  courseTitle: string;
  date: string;
  time: string;
  trainerName: string;
  trainerImage: string;
  reservedCount: string;
}

const formatBookingDate = (date: Date): string =>
  date.toLocaleDateString('de-DE', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  });

const BookingSuccessScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const iconScale = useRef(new Animated.Value(0.6)).current;
  const iconOpacity = useRef(new Animated.Value(0)).current;
  const glowScale = useRef(new Animated.Value(0.9)).current;
  const glowOpacity = useRef(new Animated.Value(0.2)).current;
  const cardTranslateY = useRef(new Animated.Value(32)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const badgeTranslateY = useRef(new Animated.Value(16)).current;
  const badgeOpacity = useRef(new Animated.Value(0)).current;

  const training = React.useMemo<TrainingItem>(() => {
    if (id && trainingById[id]) {
      return trainingById[id];
    }
    return trainingById['technique-morning'];
  }, [id]);

  const bookingSummary = React.useMemo<BookingSummary>(() => {
    const bookedCount = Math.min(training.booked + 1, training.capacity);
    return {
      courseTitle: training.listTitle,
      date: formatBookingDate(new Date()),
      time: training.time,
      trainerName: training.trainerName,
      trainerImage: training.trainerImage,
      reservedCount: `${bookedCount}/${training.capacity}`,
    };
  }, [training]);

  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(glowScale, {
            toValue: 1.05,
            duration: 1200,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(glowOpacity, {
            toValue: 0.45,
            duration: 1200,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(glowScale, {
            toValue: 0.92,
            duration: 1200,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(glowOpacity, {
            toValue: 0.2,
            duration: 1200,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    Animated.parallel([
      Animated.timing(iconScale, {
        toValue: 1,
        duration: 520,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      }),
      Animated.timing(iconOpacity, {
        toValue: 1,
        duration: 360,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(cardTranslateY, {
        toValue: 0,
        duration: 520,
        delay: 120,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(cardOpacity, {
        toValue: 1,
        duration: 520,
        delay: 120,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(badgeTranslateY, {
        toValue: 0,
        duration: 480,
        delay: 220,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(badgeOpacity, {
        toValue: 1,
        duration: 420,
        delay: 220,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();

    pulseAnimation.start();

    return () => {
      pulseAnimation.stop();
    };
  }, [
    badgeOpacity,
    badgeTranslateY,
    cardOpacity,
    cardTranslateY,
    glowOpacity,
    glowScale,
    iconOpacity,
    iconScale,
  ]);

  const handleCalendarPress = useCallback(() => {
    console.log('Add to calendar');
  }, []);

  const handleDonePress = useCallback(() => {
    router.replace('/(tabs)');
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
          <Animated.View
            style={[
              styles.iconGlow,
              {
                opacity: glowOpacity,
                transform: [{ scale: glowScale }],
              },
            ]}
          />
          <Animated.View style={{ opacity: iconOpacity, transform: [{ scale: iconScale }] }}>
            <MaterialIcons name="check-circle" size={120} color={AccentColors.base} style={styles.icon} />
          </Animated.View>
        </View>

        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Buchung</Text>
          <Text style={styles.titleAccent}>Erfolgreich!</Text>
        </View>

        <Animated.View style={[styles.card, { opacity: cardOpacity, transform: [{ translateY: cardTranslateY }] }]}>
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
                <MaterialIcons name="calendar-today" size={16} color="rgba(255,255,255,0.6)" />
                <Text style={styles.cardDetailText}>{bookingSummary.date}</Text>
              </View>
            </View>
            <View style={styles.cardDetailBlock}>
              <Text style={styles.cardLabel}>Zeit</Text>
              <View style={styles.cardDetailRow}>
                <MaterialIcons name="schedule" size={16} color="rgba(255,255,255,0.6)" />
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
        </Animated.View>

        <Animated.View
          style={[
            styles.reservedBadge,
            {
              opacity: badgeOpacity,
              transform: [{ translateY: badgeTranslateY }],
            },
          ]}>
          <MaterialIcons name="confirmation-number" size={16} color={AccentColors.base} />
          <Text style={styles.reservedText}>
            Dein Platz ist reserviert <Text style={styles.reservedCount}>({bookingSummary.reservedCount})</Text>
          </Text>
        </Animated.View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: 24 + insets.bottom }]}>
        <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8} onPress={handleCalendarPress}>
          <MaterialIcons name="event" size={18} color="#ffffff" />
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
    backgroundColor: '#18181b',
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
    backgroundColor: AccentColors.tint18,
    shadowColor: AccentColors.base,
    shadowOpacity: 0.3,
    shadowRadius: 24,
  },
  icon: {
    textShadowColor: AccentColors.tint60,
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
    color: '#ffffff',
  },
  titleAccent: {
    fontSize: 32,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: -1.4,
    fontStyle: 'italic',
    color: AccentColors.base,
    marginTop: 4,
  },
  card: {
    width: '100%',
    marginTop: 28,
    padding: 24,
    borderRadius: 28,
    backgroundColor: '#27272a',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
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
    backgroundColor: AccentColors.tint08,
  },
  cardSection: {
    paddingBottom: 16,
  },
  cardLabelPrimary: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: AccentColors.base,
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#ffffff',
  },
  cardDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
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
    color: 'rgba(255,255,255,0.4)',
  },
  cardDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardDetailText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#ffffff',
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
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
    backgroundColor: '#27272a',
  },
  trainerAvatarImage: {
    borderRadius: 24,
  },
  trainerName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 2,
  },
  reservedBadge: {
    marginTop: 22,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
  },
  reservedText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: 'rgba(255,255,255,0.6)',
  },
  reservedCount: {
    color: '#ffffff',
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
    borderTopColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(24,24,27,0.95)',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#27272a',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#ffffff',
  },
  primaryButton: {
    borderRadius: 16,
    backgroundColor: AccentColors.base,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    shadowColor: AccentColors.base,
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 4,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#0b0c0d',
  },
});
