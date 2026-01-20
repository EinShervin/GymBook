import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#f7f7f7',
        tabBarInactiveTintColor: '#6b6b72',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: '#111114',
          borderTopColor: '#1f1f25',
          borderTopWidth: 1,
          height: 76,
          paddingTop: 8,
          paddingBottom: 14,
          marginHorizontal: 16,
          marginBottom: 12,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          letterSpacing: 0.8,
          fontWeight: '600',
        },
        tabBarItemStyle: {
          paddingTop: 4,
        },
        tabBarHideOnKeyboard: true,
        tabBarBadgeStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].tint,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Trainings',
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="dumbbell.fill" color={color} />,
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
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="person.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
