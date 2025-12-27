import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { usePoint, useDeletePoint } from '@/hooks/usePoints';
import { useTheme } from '@/hooks/useTheme';
import { colors, spacing, typography } from '@/theme';
import { Loading } from '@/components/ui/Loading';
import { Button } from '@/components/ui/Button';
import { useTranslation } from 'react-i18next';

export default function PointDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const pointId = Array.isArray(id) ? id[0] : id;
  const { data: point, isLoading } = usePoint(pointId);
  const { mutate: deletePoint } = useDeletePoint();
  const { mode } = useTheme();
  const router = useRouter();
  const { t } = useTranslation();

  const handleDelete = () => {
    Alert.alert(
      t('points.delete_confirm_title'),
      t('points.delete_confirm_msg'),
      [
        { text: t('common.cancel'), style: "cancel" },
        { 
          text: t('common.delete'), 
          style: "destructive", 
          onPress: () => {
            deletePoint(pointId, {
              onSuccess: () => router.back()
            });
          }
        }
      ]
    );
  };

  if (isLoading) return <Loading />;
  if (!point) return <Text>Not found</Text>;

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors[mode].surface }]}>
      {point.coverImage && (
        <Image source={{ uri: point.coverImage }} style={styles.cover} />
      )}
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors[mode].text }]}>{point.title}</Text>
        <Text style={[styles.type, { color: colors[mode].primary }]}>{point.type.toUpperCase()}</Text>
        <Text style={[styles.desc, { color: colors[mode].textSecondary }]}>{point.description}</Text>

        <View style={styles.actions}>
          <Button 
            title={t('points.write_article')}
            variant="outline"
            onPress={() => router.push({ pathname: '/article/create', params: { pointId } })} 
            style={styles.btn}
          />

          <Button 
            title="Add Photos" 
            variant="outline"
            onPress={() => router.push({ pathname: '/gallery/create', params: { pointId } })} 
            style={styles.btn}
          />
          
          {point.articles.length > 0 && (
            <Button 
              title={`${t('points.read_articles')} (${point.articles.length})`}
              onPress={() => router.push(`/article/${point.articles[0]}`)} 
              style={styles.btn}
            />
          )}
          {point.galleries.length > 0 && (
            <Button 
              title={`${t('points.view_photos')} (${point.galleries.length})`}
              variant="secondary"
              onPress={() => router.push(`/gallery/${point.galleries[0]}`)} 
              style={styles.btn}
            />
          )}

          <Button 
            title={t('points.delete_btn')}
            variant="outline"
            onPress={handleDelete}
            style={[styles.btn, { marginTop: spacing.m, borderColor: colors[mode].error }]}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  cover: { width: '100%', height: 250 },
  content: { padding: spacing.m, paddingBottom: 50 },
  title: { ...typography.h2, marginBottom: spacing.xs },
  type: { ...typography.caption, marginBottom: spacing.m, fontWeight: 'bold' },
  desc: { ...typography.body, marginBottom: spacing.l },
  actions: { gap: spacing.m },
  btn: { width: '100%' },
});
