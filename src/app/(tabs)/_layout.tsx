import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme';
import { useTheme } from '@/hooks/useTheme';
import { useTranslation } from 'react-i18next';

export default function TabLayout() {
  const { mode } = useTheme();
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors[mode].primary,
        tabBarInactiveTintColor: colors[mode].textSecondary,
        tabBarStyle: {
          backgroundColor: colors[mode].surface,
          borderTopColor: colors[mode].border,
        },
        headerStyle: {
          backgroundColor: colors[mode].surface,
        },
        headerTintColor: colors[mode].text,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('tabs.map'),
          tabBarIcon: ({ color, size }) => <Ionicons name="map" size={size} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="roadtrips"
        options={{
          title: t('tabs.roadtrips'),
          tabBarIcon: ({ color, size }) => <Ionicons name="list" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('tabs.profile'),
          tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="edit-profile"
        options={{
          title: t('tabs.edit_profile'),
          href: null, // This hides it from the tab bar
        }}
      />
    </Tabs>
  );
}