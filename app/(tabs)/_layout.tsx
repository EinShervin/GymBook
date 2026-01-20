import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const activeTint = isDarkMode ? '#f7f7f7' : '#0b0b0d';
  const inactiveTint = isDarkMode ? '#6f6f78' : '#7c7c86';
  const tabBarBackground = isDarkMode ? '#111114' : '#f5f5f7';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeTint,
        tabBarInactiveTintColor: inactiveTint,
        tabBarStyle: [
          styles.tabBar,
          {
            backgroundColor: tabBarBackground,
            borderTopColor: isDarkMode ? '#1f1f25' : '#e0e0e6',
          },
        ],
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: styles.tabBarItem,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Trainings',
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="flame.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="message.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={26} name="person.crop.circle.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 1,
    height: 76,
    paddingBottom: 16,
    paddingTop: 10,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 28,
    position: 'absolute',
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 8,
  },
  tabBarItem: {
    borderRadius: 18,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
