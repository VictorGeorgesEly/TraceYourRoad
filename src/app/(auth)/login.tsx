import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { colors, spacing, typography } from '@/theme';
import { useTheme } from '@/hooks/useTheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useToastStore } from '@/stores/toastStore';

export default function LoginScreen() {
  const { login, isLoading } = useAuthStore();
  const { mode } = useTheme();
  const { t } = useTranslation();
  const showToast = useToastStore(state => state.showToast);
  
  // Note: Schema validation messages remain hardcoded for now, or move schema inside hook
  // Moving schema inside component to use translation:
  const schema = z.object({
    email: z.string().email({ message: t('auth.invalid_email') }),
    password: z.string().min(6, { message: t('auth.password_min') }),
  });
  
  type FormData = z.infer<typeof schema>;

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: 'alice@example.com',
      password: 'password123',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await login(data.email);
    } catch (error) {
      // showToast is now redundant if QueryClient catches it, 
      // but since login might be a direct store call, we keep it or rely on store
      showToast((error as Error).message, 'error');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors[mode].background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors[mode].primary }]}>{t('auth.login_title')}</Text>
        
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t('auth.email_label')}
              placeholder="Enter your email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.email?.message}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t('auth.password_label')}
              placeholder="Enter your password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.password?.message}
              secureTextEntry
            />
          )}
        />

        <Button 
          title={t('auth.login_btn')} 
          onPress={handleSubmit(onSubmit)} 
          loading={isLoading}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: spacing.l,
    justifyContent: 'center',
  },
  title: {
    ...typography.h1,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  button: {
    marginTop: spacing.m,
  },
});