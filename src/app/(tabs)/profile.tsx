import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Share, Alert } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/Button';
import { colors, spacing, typography } from '@/theme';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useUserRoadtrips } from '@/hooks/useRoadtrips';
import { useMemo } from 'react';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const { mode } = useTheme();
  const router = useRouter();
  const { t } = useTranslation();

  // Fetch real-time roadtrips to calculate stats
  const { data: roadtrips } = useUserRoadtrips(user?.id || '');

  const stats = useMemo(() => {
    if (!roadtrips) return { count: 0, distance: 0, countries: 0 };
    return {
      count: roadtrips.length,
      distance: roadtrips.reduce((acc, r) => acc + r.stats.distance, 0),
      countries: new Set(roadtrips.flatMap(r => r.countries)).size,
    };
  }, [roadtrips]);

  const handleShare = async () => {
    if (!user) return;
    try {
      const result = await Share.share({
        message: `${t('profile.share_msg')} https://traceyourroad.app/u/${user.id}`,
        title: t('profile.share_title'),
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  if (!user) return null;

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors[mode].background }]}>
      <View style={styles.header}>
        <Image source={{ uri: user.avatar || 'https://via.placeholder.com/150' }} style={styles.avatar} />
        <Text style={[styles.name, { color: colors[mode].text }]}>{user.name}</Text>
        <Text style={[styles.bio, { color: colors[mode].textSecondary }]}>{user.bio}</Text>
        
        <View style={styles.headerButtons}>
          <Button 
            title={t('profile.edit_btn')} 
            variant="outline" 
            onPress={() => router.push('/(tabs)/edit-profile')} 
            style={styles.headerButton}
          />
          <Button 
            title={t('profile.share_btn')} 
            variant="secondary" 
            onPress={handleShare} 
            style={styles.headerButton}
          />
        </View>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={[styles.statValue, { color: colors[mode].primary }]}>{stats.count}</Text>
          <Text style={[styles.statLabel, { color: colors[mode].textSecondary }]}>{t('profile.stats_roadtrips')}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={[styles.statValue, { color: colors[mode].primary }]}>{stats.countries}</Text>
          <Text style={[styles.statLabel, { color: colors[mode].textSecondary }]}>{t('profile.stats_countries')}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={[styles.statValue, { color: colors[mode].primary }]}>{stats.distance}</Text>
          <Text style={[styles.statLabel, { color: colors[mode].textSecondary }]}>{t('profile.stats_km')}</Text>
        </View>
      </View>

      <View style={styles.actions}>
         <Button title={t('profile.logout_btn')} onPress={logout} variant="outline" style={[styles.logout, { borderColor: colors[mode].error }]} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.m,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: spacing.m,
  },
  name: {
    ...typography.h2,
    marginBottom: spacing.xs,
  },
  bio: {
    ...typography.body,
    textAlign: 'center',
    marginBottom: spacing.m,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: spacing.m,
    marginTop: spacing.s,
  },
  headerButton: {
    minWidth: 100,
    paddingVertical: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: spacing.xxl,
    paddingHorizontal: spacing.m,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    ...typography.h2,
    fontWeight: '700',
  },
  statLabel: {
    ...typography.caption,
  },
  actions: {
    padding: spacing.m,
  },
  logout: {
    width: '100%',
  },
});
