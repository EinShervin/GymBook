import React, { useCallback, useMemo, useState } from 'react';
import type { ListRenderItemInfo } from 'react-native';
import {
  FlatList,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { trainingData, type TrainingItem } from '../training/training-data';

interface DayItem {
  id: string;
  label: string;
  date: string;
}

interface CalendarDay {
  id: string;
  label: string;
  isPlaceholder: boolean;
  date: Date | null;
}

interface CalendarDayCellProps {
  item: CalendarDay;
  onSelect: (date: Date | null) => void;
}

interface DayChipProps {
  day: DayItem;
  isSelected: boolean;
  onSelect: (dayId: string) => void;
}

const DayChip: React.FC<DayChipProps> = React.memo(({ day, isSelected, onSelect }) => {
  const handlePress = useCallback(() => {
    onSelect(day.id);
  }, [day.id, onSelect]);

  return (
    <TouchableOpacity
      style={[styles.dayChip, isSelected ? styles.dayChipSelected : styles.dayChipDefault]}
      onPress={handlePress}
      activeOpacity={0.8}>
      <Text style={[styles.dayLabel, isSelected ? styles.dayLabelSelected : styles.dayLabelDefault]}>
        {day.label}
      </Text>
      <Text style={[styles.dayDate, isSelected ? styles.dayDateSelected : styles.dayDateDefault]}>
        {day.date}
      </Text>
    </TouchableOpacity>
  );
});

DayChip.displayName = 'DayChip';

interface ClassCardProps {
  item: TrainingItem;
  onPress: (classItem: TrainingItem) => void;
  onBookPress: (classItem: TrainingItem) => void;
}

const ClassCard: React.FC<ClassCardProps> = React.memo(({ item, onPress, onBookPress }) => {
  const fillPercentage = useMemo(() => (item.booked / item.capacity) * 100, [item]);
  const handlePress = useCallback(() => {
    onPress(item);
  }, [item, onPress]);
  const handleBookPress = useCallback(() => {
    onPress(item);
    onBookPress(item);
  }, [item, onBookPress, onPress]);

  return (
    <TouchableOpacity style={styles.classCard} onPress={handlePress} activeOpacity={0.9}>
      <Text style={[styles.classTime, { color: item.accent }]}>{item.time}</Text>
      <Text style={styles.classTitle}>{item.listTitle}</Text>
      <Text style={styles.classCoach}>with {item.coach}</Text>
      <View style={styles.capacityRow}>
        <Text style={styles.capacityLabel}>Capacity</Text>
        <Text style={[styles.capacityValue, { color: item.accent }]}>
          {item.booked} / {item.capacity} booked
        </Text>
      </View>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${fillPercentage}%`, backgroundColor: item.accent }]} />
      </View>
      <TouchableOpacity style={styles.bookButton} onPress={handleBookPress} activeOpacity={0.85}>
        <Text style={styles.bookButtonText}>BOOK CLASS</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
});

ClassCard.displayName = 'ClassCard';

const CalendarDayCell: React.FC<CalendarDayCellProps> = React.memo(({ item, onSelect }) => {
  const handlePress = useCallback(() => {
    onSelect(item.date);
  }, [item.date, onSelect]);

  return (
    <TouchableOpacity
      style={[styles.calendarDay, item.isPlaceholder && styles.calendarDayPlaceholder]}
      onPress={handlePress}
      disabled={item.isPlaceholder}
      activeOpacity={0.7}>
      <Text style={styles.calendarDayText}>{item.label}</Text>
    </TouchableOpacity>
  );
});

CalendarDayCell.displayName = 'CalendarDayCell';

const calendarWeekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const dayData: DayItem[] = [
  { id: 'mon', label: 'MON', date: '12' },
  { id: 'tue', label: 'TUE', date: '13' },
  { id: 'wed', label: 'WED', date: '14' },
  { id: 'thu', label: 'THU', date: '15' },
  { id: 'fri', label: 'FRI', date: '16' },
  { id: 'sat', label: 'SAT', date: '17' },
  { id: 'sun', label: 'SUN', date: '18' },
];

const HomeScreen: React.FC = () => {
  const router = useRouter();
  const [selectedDayId, setSelectedDayId] = useState<string>('mon');
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const calendarMonth = useMemo(() => selectedDate.toLocaleString('en-US', { month: 'long' }), [
    selectedDate,
  ]);
  const calendarYear = useMemo(() => selectedDate.getFullYear(), [selectedDate]);

  const calendarDays = useMemo<CalendarDay[]>(() => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const startWeekday = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: CalendarDay[] = [];

    for (let i = 0; i < startWeekday; i += 1) {
      days.push({ id: `empty-${i}`, label: '', isPlaceholder: true, date: null });
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const date = new Date(year, month, day);
      days.push({ id: `${year}-${month}-${day}`, label: day.toString(), isPlaceholder: false, date });
    }

    return days;
  }, [selectedDate]);

  const handleDaySelect = useCallback((dayId: string) => {
    setSelectedDayId(dayId);
  }, []);

  const handleClassPress = useCallback(
    (classItem: TrainingItem) => {
      router.push({
        pathname: '/training/[id]',
        params: {
          id: classItem.id,
        },
      });
    },
    [router],
  );

  const handleBookPress = useCallback((classItem: TrainingItem) => {
    console.log(`Booked class: ${classItem.id}`);
  }, []);

  const handleCalendarOpen = useCallback(() => {
    setIsCalendarOpen(true);
  }, []);

  const handleCalendarClose = useCallback(() => {
    setIsCalendarOpen(false);
  }, []);

  const handleCalendarDayPress = useCallback((date: Date | null) => {
    if (!date) {
      return;
    }
    setSelectedDate(date);
    setIsCalendarOpen(false);
  }, []);

  const renderDayItem = useCallback(
    ({ item }: ListRenderItemInfo<DayItem>) => (
      <DayChip day={item} isSelected={item.id === selectedDayId} onSelect={handleDaySelect} />
    ),
    [handleDaySelect, selectedDayId],
  );

  const renderClassItem = useCallback(
    ({ item }: ListRenderItemInfo<TrainingItem>) => (
      <ClassCard item={item} onPress={handleClassPress} onBookPress={handleBookPress} />
    ),
    [handleBookPress, handleClassPress],
  );

  const renderCalendarItem = useCallback(
    ({ item }: ListRenderItemInfo<CalendarDay>) => (
      <CalendarDayCell item={item} onSelect={handleCalendarDayPress} />
    ),
    [handleCalendarDayPress],
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>MUAY THAI</Text>
            <Text style={styles.subtitle}>SCHEDULE OVERVIEW</Text>
          </View>
          <TouchableOpacity
            style={styles.calendarButton}
            activeOpacity={0.8}
            onPress={handleCalendarOpen}>
            <Feather name="calendar" size={18} color="#f1f1f1" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={dayData}
          renderItem={renderDayItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.dayList}
          contentContainerStyle={styles.dayListContent}
          removeClippedSubviews
          maxToRenderPerBatch={6}
          windowSize={5}
          getItemLayout={(_, index) => ({ length: 84, offset: 84 * index, index })}
        />

        <FlatList
          data={trainingData}
          renderItem={renderClassItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.classListContent}
        />
      </View>

      <Modal
        visible={isCalendarOpen}
        transparent
        animationType="fade"
        onRequestClose={handleCalendarClose}>
        <View style={styles.calendarOverlay}>
          <View style={styles.calendarSheet}>
            <View style={styles.calendarHeader}>
              <Text style={styles.calendarTitle}>
                {calendarMonth} {calendarYear}
              </Text>
              <TouchableOpacity onPress={handleCalendarClose} style={styles.calendarClose}>
                <Feather name="x" size={18} color="#f7f7f7" />
              </TouchableOpacity>
            </View>
            <View style={styles.calendarWeekRow}>
              {calendarWeekdays.map((day, index) => (
                <Text key={`${day}-${index}`} style={styles.calendarWeekday}>
                  {day}
                </Text>
              ))}
            </View>
            <FlatList
              data={calendarDays}
              renderItem={renderCalendarItem}
              keyExtractor={(item) => item.id}
              numColumns={7}
              scrollEnabled={false}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0c0c0e',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerRow: {
    marginTop: 4,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#f7f7f7',
    letterSpacing: 1,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 12,
    letterSpacing: 3,
    color: '#8b5cf6',
  },
  calendarButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#1a1a1d',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a2f',
  },
  dayList: {
    marginBottom: 8,
  },
  dayListContent: {
    paddingRight: 12,
    gap: 12,
  },
  dayChip: {
    width: 72,
    height: 92,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayChipSelected: {
    backgroundColor: '#f7f7f7',
  },
  dayChipDefault: {
    backgroundColor: '#121215',
    borderWidth: 1,
    borderColor: '#2b2b31',
  },
  dayLabel: {
    fontSize: 12,
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  dayLabelSelected: {
    color: '#0b0b0d',
    fontWeight: '700',
  },
  dayLabelDefault: {
    color: '#6b6b72',
    fontWeight: '600',
  },
  dayDate: {
    fontSize: 22,
  },
  dayDateSelected: {
    color: '#0b0b0d',
    fontWeight: '700',
  },
  dayDateDefault: {
    color: '#f7f7f7',
    fontWeight: '600',
  },
  classListContent: {
    paddingTop: 8,
    paddingBottom: 24,
    gap: 16,
  },
  classCard: {
    backgroundColor: '#141417',
    borderRadius: 28,
    padding: 20,
    borderWidth: 1,
    borderColor: '#222229',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 4,
  },
  classTime: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.6,
  },
  classTitle: {
    marginTop: 8,
    fontSize: 20,
    color: '#f7f7f7',
    fontWeight: '700',
  },
  classCoach: {
    marginTop: 4,
    fontSize: 14,
    color: '#8b8b94',
  },
  capacityRow: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  capacityLabel: {
    fontSize: 12,
    color: '#6d6d75',
  },
  capacityValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  progressTrack: {
    marginTop: 10,
    height: 6,
    borderRadius: 999,
    backgroundColor: '#24242a',
    overflow: 'hidden',
  },
  progressFill: {
    height: 6,
    borderRadius: 999,
  },
  bookButton: {
    marginTop: 18,
    backgroundColor: '#f7f7f7',
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
  },
  bookButtonText: {
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: '700',
    color: '#0b0b0d',
  },
  calendarOverlay: {
    flex: 1,
    backgroundColor: 'rgba(8, 8, 10, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  calendarSheet: {
    width: '100%',
    borderRadius: 24,
    backgroundColor: '#141417',
    padding: 20,
    borderWidth: 1,
    borderColor: '#2a2a2f',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  calendarTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f7f7f7',
  },
  calendarClose: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2a2a2f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarWeekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  calendarWeekday: {
    width: 32,
    textAlign: 'center',
    fontSize: 12,
    color: '#6b6b72',
  },
  calendarDay: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
  },
  calendarDayPlaceholder: {
    opacity: 0,
  },
  calendarDayText: {
    color: '#f7f7f7',
    fontSize: 12,
    fontWeight: '600',
  },
});
