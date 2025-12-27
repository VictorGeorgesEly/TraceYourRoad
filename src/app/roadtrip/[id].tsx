import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useRoadtrip, useDeleteRoadtrip } from '@/hooks/useRoadtrips';
import { usePoints } from '@/hooks/usePoints';
import { useTheme } from '@/hooks/useTheme';
import { colors, spacing, typography } from '@/theme';
import { Loading } from '@/components/ui/Loading';
import { Button } from '@/components/ui/Button';
import { AppMapView } from '@/components/map/MapView';
import { RoutePolyline } from '@/components/map/RoutePolyline';
import MapView from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

export default function RoadtripDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const roadtripId = Array.isArray(id) ? id[0] : id;
  const { data: roadtrip, isLoading: loadingRT } = useRoadtrip(roadtripId);
  const { data: points, isLoading: loadingPoints } = usePoints(roadtripId);
  const { mutate: deleteRoadtrip } = useDeleteRoadtrip();
  const { mode } = useTheme();
  const router = useRouter();
  const mapRef = useRef<MapView>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (roadtrip && roadtrip.polyline.length > 0) {
      setTimeout(() => {
        mapRef.current?.fitToCoordinates(roadtrip.polyline, {
          edgePadding: { top: 40, right: 40, bottom: 40, left: 40 },
          animated: false,
        });
      }, 100);
    }
  }, [roadtrip]);

  const handleDelete = () => {
    Alert.alert(
      t('roadtrips.delete_confirm_title'),
      t('roadtrips.delete_confirm_msg'),
      [
        { text: t('common.cancel'), style: "cancel" },
        { 
          text: t('common.delete'), 
          style: "destructive", 
          onPress: () => {
            deleteRoadtrip(roadtripId, {
              onSuccess: () => router.back()
            });
          }
        }
      ]
    );
  };

  if (loadingRT || loadingPoints) return <Loading />;
  if (!roadtrip) return <Text>Not found</Text>;

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ headerBackTitle: '' }} />
      <ScrollView style={[styles.container, { backgroundColor: colors[mode].background }]}>
        
        {/* Map Banner */}
        <View style={styles.mapContainer}>
          <AppMapView
            ref={mapRef}
            scrollEnabled={false}
            zoomEnabled={false}
            rotateEnabled={false}
            pitchEnabled={false}
            style={StyleSheet.absoluteFill}
          >
            <RoutePolyline 
              coordinates={roadtrip.polyline} 
              color={colors[mode].primary} 
            />
          </AppMapView>
          <View style={[styles.mapOverlay, { backgroundColor: colors[mode].overlay }]} />
          <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>{roadtrip.title}</Text>
              <View style={styles.countryTag}>
                <Ionicons name="location" size={12} color="white" />
                <Text style={styles.countryText}>{roadtrip.countries.join(', ')}</Text>
              </View>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={[styles.desc, { color: colors[mode].textSecondary }]}>{roadtrip.description}</Text>
          
          <View style={[styles.statsRow, { borderColor: colors[mode].border }]}>
            <View style={styles.statItem}>
              <Ionicons name="resize" size={20} color={colors[mode].primary} />
              <Text style={[styles.statValue, { color: colors[mode].text }]}>{roadtrip.stats.distance} km</Text>
              <Text style={[styles.statLabel, { color: colors[mode].textSecondary }]}>{t('roadtrips.distance')}</Text>
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.statItem}>
               <Ionicons name="calendar" size={20} color={colors[mode].primary} />
              <Text style={[styles.statValue, { color: colors[mode].text }]}>{roadtrip.stats.duration} d</Text>
              <Text style={[styles.statLabel, { color: colors[mode].textSecondary }]}>{t('roadtrips.duration')}</Text>
            </View>
             <View style={styles.verticalDivider} />
            <View style={styles.statItem}>
               <Ionicons name="pin" size={20} color={colors[mode].primary} />
              <Text style={[styles.statValue, { color: colors[mode].text }]}>{points?.length || 0}</Text>
              <Text style={[styles.statLabel, { color: colors[mode].textSecondary }]}>{t('roadtrips.stops')}</Text>
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors[mode].text }]}>{t('roadtrips.itinerary')}</Text>
            <Button 
              title={t('roadtrips.add_point')} 
              variant="outline" 
              onPress={() => router.push({ pathname: '/point/create', params: { roadtripId } })}
              style={{ paddingVertical: 4, paddingHorizontal: 12 }}
            />
          </View>
          
          <View style={styles.timeline}>
            {points?.map((point, index) => (
              <View key={point.id} style={styles.timelineItem}>
                {/* Timeline Line */}
                <View style={styles.timelineLeft}>
                   <View style={[styles.timelineDot, { backgroundColor: colors[mode].primary }]} />
                   {index !== (points.length - 1) && (
                     <View style={[styles.timelineLine, { backgroundColor: colors[mode].border }]} />
                   )}
                </View>

                {/* Content */}
                <TouchableOpacity 
                  style={[styles.pointCard, { backgroundColor: colors[mode].surface, borderColor: colors[mode].border }]}
                  onPress={() => router.push(`/point/${point.id}`)}
                >
                  <View style={styles.pointHeader}>
                    <Text style={[styles.pointTitle, { color: colors[mode].text }]}>{point.title}</Text>
                    <Ionicons name="chevron-forward" size={16} color={colors[mode].textSecondary} />
                  </View>
                  <Text style={[styles.pointType, { color: colors[mode].secondary }]}>{point.type.toUpperCase()}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <Button 
            title={t('roadtrips.delete_btn')}
            variant="outline" 
            onPress={handleDelete}
            style={{ marginTop: spacing.xxl, borderColor: colors[mode].error }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  mapContainer: { width: '100%', height: 280, position: 'relative' },
  mapOverlay: { ...StyleSheet.absoluteFillObject },
  headerTitleContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  headerTitle: {
    ...typography.h1,
    color: 'white',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  countryTag: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  countryText: { color: 'white', fontSize: 12, fontWeight: '600', marginLeft: 4 },
  
  content: { padding: spacing.m, paddingBottom: 50 },
  desc: { ...typography.body, marginBottom: spacing.l, lineHeight: 24 },
  
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.m,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: spacing.xl,
  },
  statItem: { alignItems: 'center', flex: 1 },
  verticalDivider: { width: 1, backgroundColor: '#DDDDDD' },
  statValue: { ...typography.h3, marginTop: 4 },
  statLabel: { ...typography.caption, marginTop: 2 },
  
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.m },
  sectionTitle: { ...typography.h2 },
  
  timeline: { paddingLeft: 10 },
  timelineItem: { flexDirection: 'row', marginBottom: 0 },
  timelineLeft: { alignItems: 'center', width: 30, marginRight: 10 },
  timelineDot: { width: 12, height: 12, borderRadius: 6, marginTop: 18 },
  timelineLine: { width: 2, flex: 1, marginTop: 4, marginBottom: -4 },
  
  pointCard: {
    flex: 1,
    padding: spacing.m,
    borderRadius: spacing.s,
    borderWidth: 1,
    marginBottom: spacing.m,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  pointHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  pointTitle: { ...typography.h3, fontSize: 18 },
  pointType: { ...typography.caption, fontWeight: '700', letterSpacing: 0.5 },
});
