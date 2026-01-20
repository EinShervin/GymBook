import React, { useCallback, useMemo } from 'react';
import { ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { trainingById, type TrainingItem } from './training-data';

const TrainingDetailScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{
    id?: string;
  }>();

  const training = useMemo<TrainingItem>(() => {
    if (id && trainingById[id]) {
      return trainingById[id];
    }
    return trainingById['technique-morning'];
  }, [id]);

  const availableValue = Math.max(training.capacity - training.booked, 0);
  const availabilityRatio = training.capacity > 0 ? availableValue / training.capacity : 0;

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
          <Feather name="chevron-left" size={20} color="#e6efff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton} onPress={handleSharePress} activeOpacity={0.8}>
          <Feather name="share-2" size={20} color="#e6efff" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 84, paddingBottom: 220 + insets.bottom },
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <MaterialIcons name="sports-mma" size={320} color="rgba(230,239,255,0.04)" style={styles.heroIcon} />
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
              <Feather name="clock" size={16} color="#9aa8c7" />
              <Text style={styles.metaText}>{training.duration}</Text>
            </View>
            <View style={styles.metaItem}>
              <Feather name="users" size={16} color="#9aa8c7" />
              <Text style={styles.metaText}>{`${training.capacity} Plätze gesamt`}</Text>
            </View>
          </View>
        </View>

        <View style={styles.availabilityCard}>
          <View style={styles.availabilityGlow} />
          <Text style={styles.availabilityLabel}>VERFÜGBARKEIT</Text>
          <View style={styles.availabilityRow}>
            <Text style={styles.availabilityValue}>{availableValue}</Text>
            <Text style={styles.availabilityTotal}>/ {training.capacity}</Text>
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
          <Feather name="shield" size={12} color="#4b8dff" />
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
    backgroundColor: '#0a1024',
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
    backgroundColor: 'rgba(18,27,53,0.7)',
    borderWidth: 1,
    borderColor: 'rgba(230,239,255,0.16)',
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
    backgroundColor: 'rgba(75,141,255,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(75,141,255,0.3)',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: '#4b8dff',
  },
  badgeSecondary: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#141f3d',
    borderWidth: 1,
    borderColor: 'rgba(230,239,255,0.16)',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: 'rgba(230,239,255,0.7)',
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    fontStyle: 'italic',
    textTransform: 'uppercase',
    letterSpacing: -1,
    color: '#e6efff',
    lineHeight: 40,
  },
  titleHighlight: {
    color: '#4b8dff',
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
    color: 'rgba(230,239,255,0.6)',
    fontWeight: '500',
  },
  availabilityCard: {
    marginTop: 24,
    borderRadius: 28,
    padding: 24,
    backgroundColor: '#141f3d',
    borderWidth: 1,
    borderColor: 'rgba(230,239,255,0.08)',
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
    backgroundColor: 'rgba(75,141,255,0.12)',
  },
  availabilityLabel: {
    fontSize: 11,
    letterSpacing: 3,
    fontWeight: '700',
    color: 'rgba(230,239,255,0.4)',
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
    color: '#e6efff',
    lineHeight: 58,
  },
  availabilityTotal: {
    fontSize: 28,
    color: 'rgba(230,239,255,0.4)',
    paddingBottom: 6,
  },
  availabilityBadge: {
    marginLeft: 'auto',
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(75,141,255,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(75,141,255,0.32)',
    color: '#4b8dff',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  progressTrack: {
    marginTop: 18,
    height: 10,
    borderRadius: 999,
    backgroundColor: '#1a2747',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#4b8dff',
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
    borderColor: '#1c294a',
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
    backgroundColor: '#4b8dff',
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
    color: '#081022',
    letterSpacing: 1,
  },
  trainerLabel: {
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: 'rgba(230,239,255,0.5)',
    fontWeight: '700',
    marginBottom: 4,
  },
  trainerName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#e6efff',
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(230,239,255,0.12)',
    backgroundColor: 'rgba(9,16,36,0.96)',
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
    color: 'rgba(75,141,255,0.9)',
  },
  confirmButton: {
    backgroundColor: '#4b8dff',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#4b8dff',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 4,
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#081022',
  },
});
