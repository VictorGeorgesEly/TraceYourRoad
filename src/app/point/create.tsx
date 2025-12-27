import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreatePoint } from '@/hooks/usePoints';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { colors, spacing } from '@/theme';
import { useTheme } from '@/hooks/useTheme';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Point } from '@/types';
import { useTranslation } from 'react-i18next';
import { useToastStore } from '@/stores/toastStore';

export default function CreatePointScreen() {
  const { roadtripId } = useLocalSearchParams<{ roadtripId: string }>();
  const { mutate: createPoint, isPending } = useCreatePoint();
  const { mode } = useTheme();
  const router = useRouter();
  const { t } = useTranslation();
  const showToast = useToastStore(state => state.showToast);

  const schema = z.object({
    title: z.string().min(3, { message: 'Title required' }),
    description: z.string().optional(),
    type: z.enum(['city', 'monument', 'nature', 'food', 'accommodation']),
  });

  type FormData = z.infer<typeof schema>;

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      type: 'city',
    },
  });

  const onSubmit = (data: FormData) => {
    if (!roadtripId) return;

    const newPoint: Point = {
      id: Math.random().toString(36).substr(2, 9),
      roadtripId: Array.isArray(roadtripId) ? roadtripId[0] : roadtripId,
      title: data.title,
      description: data.description || '',
      coordinates: { latitude: 0, longitude: 0 },
      type: data.type,
      date: new Date().toISOString(),
      order: 99,
      articles: [],
      galleries: [],
      coverImage: 'https://picsum.photos/600/400',
    };

    createPoint(newPoint, {
      onSuccess: () => {
        showToast(t('points.added_msg'), 'success');
        router.back();
      },
      onError: (err) => {
        showToast(err.message, 'error');
      }
    });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors[mode].background }]}>
      <View style={styles.content}>
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t('roadtrips.field_title')}
              placeholder="Stop Name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.title?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t('roadtrips.field_desc')}
              placeholder="What did you do there?"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.description?.message}
              multiline
            />
          )}
        />

        <Controller
          control={control}
          name="type"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t('points.type_label')}
              placeholder="city"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.type?.message}
              autoCapitalize="none"
            />
          )}
        />

        <Button 
          title={t('points.add_btn')} 
          onPress={handleSubmit(onSubmit)} 
          loading={isPending}
          style={styles.button}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing.m },
  button: { marginTop: spacing.l },
});
