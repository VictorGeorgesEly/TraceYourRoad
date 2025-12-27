import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateArticle } from '@/hooks/useArticles';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { colors, spacing } from '@/theme';
import { useTheme } from '@/hooks/useTheme';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import { Article } from '@/types';
import { useTranslation } from 'react-i18next';
import { useToastStore } from '@/stores/toastStore';

export default function CreateArticleScreen() {
  const { pointId } = useLocalSearchParams<{ pointId: string }>();
  const { mutate: createArticle, isPending } = useCreateArticle();
  const { user } = useAuth();
  const { mode } = useTheme();
  const router = useRouter();
  const { t } = useTranslation();
  const showToast = useToastStore(state => state.showToast);

  const schema = z.object({
    title: z.string().min(3, { message: 'Title required' }),
    content: z.string().min(20, { message: 'Content must be at least 20 characters' }),
  });

  type FormData = z.infer<typeof schema>;

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const onSubmit = (data: FormData) => {
    if (!pointId || !user) return;

    const newArticle: Article = {
      id: Math.random().toString(36).substr(2, 9),
      pointId: Array.isArray(pointId) ? pointId[0] : pointId,
      title: data.title,
      content: data.content,
      publishedAt: new Date().toISOString(),
      author: user.id,
      images: [],
      coverImage: 'https://picsum.photos/800/600',
    };

    createArticle(newArticle, {
      onSuccess: () => {
        showToast(t('articles.published_msg'), 'success');
        router.back();
      },
      onError: (err) => {
        showToast(err.message, 'error');
      }
    });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors[mode].background }]}>
      <Stack.Screen options={{ headerBackTitle: '' }} />
      <View style={styles.content}>
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t('articles.field_title')}
              placeholder="Article Title"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.title?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="content"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t('articles.field_content')}
              placeholder="Write your story..."
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.content?.message}
              multiline
              numberOfLines={10}
              style={{ height: 200, textAlignVertical: 'top' }}
            />
          )}
        />

        <Button 
          title={t('articles.publish_btn')} 
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
