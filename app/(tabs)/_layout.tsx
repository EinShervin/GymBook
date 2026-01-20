import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface TabIconProps {
  color: string;
  focused: boolean;
  name: 'figure.run' | 'bubble.left.and.bubble.right.fill' | 'person.crop.circle.fill';
}

const TabIcon: React.FC<TabIconProps> = React.memo(({ color, focused, name }) => (
  <View style={[styles.iconWrapper, focused && styles.iconWrapperActive]}>
    <IconSymbol size={22} name={name} color={color} />
  </View>
));

TabIcon.displayName = 'TabIcon';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: '#7a7a82',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarLabelStyle: styles.tabBarLabel,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Trainings',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="figure.run" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="bubble.left.and.bubble.right.fill" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="person.crop.circle.fill" color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#101013',
    borderTopWidth: 0,
    height: 78,
    paddingTop: 8,
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: -6 },
    elevation: 12,
  },
  tabBarItem: {
    borderRadius: 22,
    marginHorizontal: 6,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.6,
  },
  iconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  iconWrapperActive: {
    backgroundColor: '#1b1b20',
    borderWidth: 1,
    borderColor: '#2f2f36',
  },
});
