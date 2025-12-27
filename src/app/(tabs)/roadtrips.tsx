import React, { useMemo } from 'react';
import { View, Text, SectionList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRoadtrips } from '@/hooks/useRoadtrips';
import { useTheme } from '@/hooks/useTheme';
import { colors, spacing, typography } from '@/theme';
import { Loading } from '@/components/ui/Loading';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Roadtrip } from '@/types';
import { useTranslation } from 'react-i18next';

export default function RoadtripsScreen() {
  const { data: roadtrips, isLoading } = useRoadtrips();
  const { mode } = useTheme();
  const router = useRouter();
  const { t } = useTranslation();

  const sections = useMemo(() => {
    if (!roadtrips) return [];
    
    // Group by Year
    const grouped = roadtrips.reduce((acc, roadtrip) => {
      const year = new Date(roadtrip.startDate).getFullYear().toString();
      if (!acc[year]) acc[year] = [];
      acc[year].push(roadtrip);
      return acc;
    }, {} as Record<string, Roadtrip[]>);

    // Convert to SectionList format and sort by year desc
    return Object.keys(grouped)
      .sort((a, b) => parseInt(b) - parseInt(a))
      .map(year => ({
        title: year,
        data: grouped[year]
      }));
  }, [roadtrips]);

  if (isLoading) return <Loading />;

  return (
    <View style={[styles.container, { backgroundColor: colors[mode].background }]}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors[mode].text }]}>{title}</Text>
            <View style={[styles.sectionLine, { backgroundColor: colors[mode].border }]} />
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.card, { backgroundColor: colors[mode].surface }]}
            onPress={() => router.push(`/roadtrip/${item.id}`)}
            activeOpacity={0.9}
          >
            <Image source={{ uri: item.coverImage }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text style={[styles.cardTitle, { color: colors[mode].text }]}>{item.title}</Text>
                <View style={styles.durationBadge}>
                   <Text style={styles.durationText}>{item.stats.duration}d</Text>
                </View>
              </View>
              
              <View style={styles.locationRow}>
                <Ionicons name="location-sharp" size={14} color={colors[mode].primary} />
                <Text style={[styles.locationText, { color: colors[mode].textSecondary }]}>
                  {item.countries.join(' • ')}
                </Text>
              </View>

              <View style={[styles.cardFooter, { borderColor: colors[mode].border }]}>
                 <Text style={[styles.dateText, { color: colors[mode].textSecondary }]}>
                    {new Date(item.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                 </Text>
                 <Text style={[styles.kmText, { color: colors[mode].textSecondary }]}>
                    {item.stats.distance} km
                 </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 50, color: colors[mode].textSecondary }}>
            {t('roadtrips.empty')}
          </Text>
        }
      />
      
      <TouchableOpacity 
        style={[styles.fab, { backgroundColor: colors[mode].primary }]}
        onPress={() => router.push('/roadtrip/create')}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: spacing.m,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.m,
    marginTop: spacing.s,
  },
  sectionTitle: {
    ...typography.h2,
    marginRight: spacing.s,
  },
  sectionLine: {
    flex: 1,
    height: 1,
  },
  card: {
    borderRadius: 16,
    marginBottom: spacing.l,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  cardContent: {
    padding: spacing.m,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  cardTitle: {
    ...typography.h3,
    flex: 1,
    marginRight: 10,
  },
  durationBadge: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  durationText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#555',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  locationText: {
    ...typography.caption,
    marginLeft: 4,
    fontWeight: '600',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: spacing.s,
    borderTopWidth: 1,
  },
  dateText: {
    fontSize: 12,
    fontWeight: '500',
  },
  kmText: {
    fontSize: 12,
    fontWeight: '500',
  },
});
