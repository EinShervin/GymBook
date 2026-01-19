import React, { useCallback, useMemo } from 'react';
import { ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

interface TrainingDetail {
  id: string;
  category: string;
  level: string;
  title: string;
  highlight: string;
  duration: string;
  booked: number;
  capacity: number;
  trainerName: string;
  trainerBadge: string;
  trainerImage: string;
}

const trainingData: Record<string, TrainingDetail> = {
  'technique-morning': {
    id: 'technique-morning',
    category: 'Muay Thai',
    level: 'Fortgeschritten',
    title: 'Muay Thai',
    highlight: 'Technik',
    duration: '60 Min',
    booked: 24,
    capacity: 40,
    trainerName: 'Alex Rivers',
    trainerBadge: 'Pro',
    trainerImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD4EFulVX07EysCx3bp-xSTWevzL1E4C425l4WyTrN57TAkm6XHEbpEsuFtd9nJIa0QLPRL3y8s_nFF8Cb-pPIvLTEHMDSZFh6ioAQhm-6yg8JWjL6asg2fVU9rvYsJiTfD9Cps38-Q3hvplia9LDSLArVkL0ERr8WkiUEmdOdDDO0Ehvgn2tTH8fVpLBtD944fmAvJ6ppsBDQXdx_X5WhZt9mf8AHbgiMEM3kN4YyRZwAMg9jUWh5hoRrP4LTE4lLtd4hpp9zRvWbi',
  },
  'sparring-midday': {
    id: 'sparring-midday',
    category: 'Muay Thai',
    level: 'Fortgeschritten',
    title: 'Muay Thai',
    highlight: 'Technik',
    duration: '60 Min',
    booked: 38,
    capacity: 40,
    trainerName: 'Alex Rivers',
    trainerBadge: 'Pro',
    trainerImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD4EFulVX07EysCx3bp-xSTWevzL1E4C425l4WyTrN57TAkm6XHEbpEsuFtd9nJIa0QLPRL3y8s_nFF8Cb-pPIvLTEHMDSZFh6ioAQhm-6yg8JWjL6asg2fVU9rvYsJiTfD9Cps38-Q3hvplia9LDSLArVkL0ERr8WkiUEmdOdDDO0Ehvgn2tTH8fVpLBtD944fmAvJ6ppsBDQXdx_X5WhZt9mf8AHbgiMEM3kN4YyRZwAMg9jUWh5hoRrP4LTE4lLtd4hpp9zRvWbi',
  },
  'technique-evening': {
    id: 'technique-evening',
    category: 'Muay Thai',
    level: 'Fortgeschritten',
    title: 'Muay Thai',
    highlight: 'Technik',
    duration: '60 Min',
    booked: 12,
    capacity: 40,
    trainerName: 'Alex Rivers',
    trainerBadge: 'Pro',
    trainerImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD4EFulVX07EysCx3bp-xSTWevzL1E4C425l4WyTrN57TAkm6XHEbpEsuFtd9nJIa0QLPRL3y8s_nFF8Cb-pPIvLTEHMDSZFh6ioAQhm-6yg8JWjL6asg2fVU9rvYsJiTfD9Cps38-Q3hvplia9LDSLArVkL0ERr8WkiUEmdOdDDO0Ehvgn2tTH8fVpLBtD944fmAvJ6ppsBDQXdx_X5WhZt9mf8AHbgiMEM3kN4YyRZwAMg9jUWh5hoRrP4LTE4lLtd4hpp9zRvWbi',
  },
};

const TrainingDetailScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id, booked, capacity } = useLocalSearchParams<{
    id?: string;
    booked?: string;
    capacity?: string;
  }>();

  const training = useMemo<TrainingDetail>(() => {
    if (id && trainingData[id]) {
      return trainingData[id];
    }
    return trainingData['technique-morning'];
  }, [id]);

  const bookedValue = useMemo(() => {
    const parsed = Number(booked);
    return Number.isFinite(parsed) ? parsed : training.booked;
  }, [booked, training.booked]);

  const capacityValue = useMemo(() => {
    const parsed = Number(capacity);
    return Number.isFinite(parsed) ? parsed : training.capacity;
  }, [capacity, training.capacity]);

  const availableValue = Math.max(capacityValue - bookedValue, 0);
  const availabilityRatio = capacityValue > 0 ? availableValue / capacityValue : 0;

  const handleBackPress = useCallback(() => {
    router.back();
  }, [router]);

  const handleSharePress = useCallback(() => {
    console.log('Share training');
  }, []);

  const handleConfirmPress = useCallback(() => {
    router.push('/training/booking-success');
  }, [router]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="light-content" />
      <View style={[styles.headerOverlay, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity style={styles.headerButton} onPress={handleBackPress} activeOpacity={0.8}>
          <Feather name="chevron-left" size={20} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton} onPress={handleSharePress} activeOpacity={0.8}>
          <Feather name="share-2" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 84, paddingBottom: 220 + insets.bottom },
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <MaterialIcons name="sports-mma" size={320} color="rgba(255,255,255,0.03)" style={styles.heroIcon} />
          <View style={styles.badgeRow}>
            <Text style={styles.badgePrimary}>{training.category}</Text>
            <Text style={styles.badgeSecondary}>{training.level}</Text>
          </View>
          <Text style={styles.title}>
            {training.title}
            {'\n'}
            <Text style={styles.titleHighlight}>{training.highlight}</Text>
          </Text>
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Feather name="clock" size={16} color="#8a8a8f" />
              <Text style={styles.metaText}>{training.duration}</Text>
            </View>
            <View style={styles.metaItem}>
              <Feather name="users" size={16} color="#8a8a8f" />
              <Text style={styles.metaText}>{`${capacityValue} Plätze gesamt`}</Text>
            </View>
          </View>
        </View>

        <View style={styles.availabilityCard}>
          <View style={styles.availabilityGlow} />
          <Text style={styles.availabilityLabel}>VERFÜGBARKEIT</Text>
          <View style={styles.availabilityRow}>
            <Text style={styles.availabilityValue}>{availableValue}</Text>
            <Text style={styles.availabilityTotal}>/ {capacityValue}</Text>
            <Text style={styles.availabilityBadge}>Plätze frei</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${availabilityRatio * 100}%` }]} />
          </View>
        </View>

        <View style={styles.trainerRow}>
          <View style={styles.trainerAvatarWrapper}>
            <ImageBackground source={{ uri: training.trainerImage }} style={styles.trainerAvatar} imageStyle={styles.avatarImage}>
              <View style={styles.trainerBadge}>
                <Text style={styles.trainerBadgeText}>{training.trainerBadge}</Text>
              </View>
            </ImageBackground>
          </View>
          <View>
            <Text style={styles.trainerLabel}>Trainer</Text>
            <Text style={styles.trainerName}>{training.trainerName}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: 24 + insets.bottom }]}>
        <View style={styles.bottomStatus}>
          <Feather name="shield" size={12} color="#1fc3d1" />
          <Text style={styles.bottomStatusText}>Abo-Zugang aktiv</Text>
        </View>
        <TouchableOpacity style={styles.confirmButton} activeOpacity={0.9} onPress={handleConfirmPress}>
          <Text style={styles.confirmButtonText}>Buchung Bestätigen</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TrainingDetailScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#111114',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 20,
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(39,39,42,0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingTop: 84,
    paddingHorizontal: 24,
  },
  hero: {
    position: 'relative',
    gap: 14,
  },
  heroIcon: {
    position: 'absolute',
    top: -80,
    right: -90,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 10,
  },
  badgePrimary: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: 'rgba(0,192,209,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0,192,209,0.2)',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: '#1fc3d1',
  },
  badgeSecondary: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#1f1f23',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.7)',
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    fontStyle: 'italic',
    textTransform: 'uppercase',
    letterSpacing: -1,
    color: '#ffffff',
    lineHeight: 40,
  },
  titleHighlight: {
    color: '#18c6d3',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingTop: 6,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '500',
  },
  availabilityCard: {
    marginTop: 24,
    borderRadius: 28,
    padding: 24,
    backgroundColor: '#202125',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 24,
    elevation: 4,
    overflow: 'hidden',
  },
  availabilityGlow: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(0,192,209,0.08)',
  },
  availabilityLabel: {
    fontSize: 11,
    letterSpacing: 3,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.4)',
    marginBottom: 18,
  },
  availabilityRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  availabilityValue: {
    fontSize: 56,
    fontWeight: '700',
    color: '#ffffff',
    lineHeight: 58,
  },
  availabilityTotal: {
    fontSize: 28,
    color: 'rgba(255,255,255,0.4)',
    paddingBottom: 6,
  },
  availabilityBadge: {
    marginLeft: 'auto',
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(0,192,209,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(0,192,209,0.2)',
    color: '#20c7d4',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  progressTrack: {
    marginTop: 18,
    height: 10,
    borderRadius: 999,
    backgroundColor: '#17171b',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#17c3d1',
  },
  trainerRow: {
    marginTop: 26,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  trainerAvatarWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#1f1f23',
  },
  trainerAvatar: {
    flex: 1,
    borderRadius: 32,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  avatarImage: {
    borderRadius: 32,
  },
  trainerBadge: {
    backgroundColor: '#20c7d4',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginBottom: -6,
    marginRight: -6,
  },
  trainerBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#0b0c0d',
    letterSpacing: 1,
  },
  trainerLabel: {
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.45)',
    fontWeight: '700',
    marginBottom: 4,
  },
  trainerName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(17,17,20,0.96)',
  },
  bottomStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 10,
  },
  bottomStatusText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.8,
    color: 'rgba(32,199,212,0.9)',
  },
  confirmButton: {
    backgroundColor: '#18c6d3',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#18c6d3',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 4,
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#0b0c0d',
  },
});
