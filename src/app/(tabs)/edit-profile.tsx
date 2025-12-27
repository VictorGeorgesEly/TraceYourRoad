import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { colors, spacing } from '@/theme';
import { useTheme } from '@/hooks/useTheme';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useToastStore } from '@/stores/toastStore';

export default function EditProfileScreen() {
  const { user, updateProfile, isLoading } = useAuthStore();
  const { mode } = useTheme();
  const router = useRouter();
  const { t } = useTranslation();
  const showToast = useToastStore(state => state.showToast);

  const schema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
    email: z.string().email({ message: t('auth.invalid_email') }),
    bio: z.string().optional(),
    avatar: z.string().url({ message: 'Invalid URL' }).optional().or(z.literal('')),
  });

  type FormData = z.infer<typeof schema>;

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      bio: user?.bio || '',
      avatar: user?.avatar || '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await updateProfile({ ...user!, ...data });
      showToast(t('profile.updated_msg'), 'success');
      router.back();
    } catch (error) {
      showToast((error as Error).message, 'error');
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors[mode].background }]}>
      <View style={styles.content}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Name"
              placeholder="Your Name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t('auth.email_label')}
              placeholder="email@example.com"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.email?.message}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />

        <Controller
          control={control}
          name="bio"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Bio"
              placeholder="Tell us about yourself"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.bio?.message}
              multiline
              numberOfLines={3}
              style={{ height: 80, textAlignVertical: 'top' }}
            />
          )}
        />

        <Controller
          control={control}
          name="avatar"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Avatar URL"
              placeholder="https://..."
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.avatar?.message}
              autoCapitalize="none"
            />
          )}
        />

        <Button 
          title={t('profile.save_changes')} 
          onPress={handleSubmit(onSubmit)} 
          loading={isLoading}
          style={styles.button}
        />
        
        <Button 
          title={t('common.cancel')} 
          variant="outline"
          onPress={() => router.back()} 
          style={styles.cancelButton}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.m,
  },
  button: {
    marginTop: spacing.l,
  },
  cancelButton: {
    marginTop: spacing.s,
  },
});
