import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateRoadtrip } from '@/hooks/useRoadtrips';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { colors, spacing, typography } from '@/theme';
import { useTheme } from '@/hooks/useTheme';
import { useRouter } from 'expo-router';
import { Roadtrip } from '@/types';
import { useTranslation } from 'react-i18next';
import { COUNTRIES } from '@/constants/countries';
import { Ionicons } from '@expo/vector-icons';
import { useToastStore } from '@/stores/toastStore';

export default function CreateRoadtripScreen() {
  const { mutate: createRoadtrip, isPending } = useCreateRoadtrip();
  const { user } = useAuth();
  const { mode } = useTheme();
  const router = useRouter();
  const { t } = useTranslation();
  const showToast = useToastStore(state => state.showToast);
  const [search, setSearch] = useState('');

  const schema = z.object({
    title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
    description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
    selectedCountries: z.array(z.string()).min(1, { message: 'Select at least one country' }),
  });

  type FormData = z.infer<typeof schema>;

  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      selectedCountries: [],
    },
  });

  const selectedCountries = watch('selectedCountries');

  const toggleCountry = (name: string) => {
    const current = [...selectedCountries];
    const index = current.indexOf(name);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(name);
    }
    setValue('selectedCountries', current);
  };

  const filteredCountries = search.length > 1 
    ? COUNTRIES.filter(c => c.name.toLowerCase().includes(search.toLowerCase())) 
    : [];

  const onSubmit = (data: FormData) => {
    if (!user) return;

    const newRoadtrip: Roadtrip = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      title: data.title,
      description: data.description,
      countries: data.selectedCountries,
      polyline: [],
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      points: [],
      stats: { distance: 0, duration: 0 },
      coverImage: 'https://picsum.photos/800/600',
    };

    createRoadtrip(newRoadtrip, {
      onSuccess: () => {
        showToast(t('roadtrips.created_msg'), 'success');
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
              placeholder="California Dreamin'"
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
              placeholder="Describe your trip..."
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.description?.message}
              multiline
              numberOfLines={3}
              style={{ height: 80, textAlignVertical: 'top' }}
            />
          )}
        />

        <Text style={[styles.label, { color: colors[mode].text }]}>{t('roadtrips.field_country')}</Text>
        
        {/* Selected Countries Tags */}
        <View style={styles.tagsContainer}>
          {selectedCountries.map(name => (
            <TouchableOpacity 
              key={name} 
              style={[styles.tag, { backgroundColor: colors[mode].primary }]}
              onPress={() => toggleCountry(name)}
            >
              <Text style={styles.tagText}>{name}</Text>
              <Ionicons name="close-circle" size={14} color="white" />
            </TouchableOpacity>
          ))}
        </View>

        <Input
          placeholder="Search country..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />

        {filteredCountries.length > 0 && (
          <View style={[styles.dropdown, { backgroundColor: colors[mode].surface, borderColor: colors[mode].border }]}>
            {filteredCountries.slice(0, 5).map(c => (
              <TouchableOpacity 
                key={c.code} 
                style={styles.dropdownItem}
                onPress={() => {
                  toggleCountry(c.name);
                  setSearch('');
                }}
              >
                <Text style={{ color: colors[mode].text }}>{c.name}</Text>
                {selectedCountries.includes(c.name) && (
                  <Ionicons name="checkmark" size={18} color={colors[mode].primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
        {errors.selectedCountries && (
          <Text style={[styles.error, { color: colors[mode].error }]}>{errors.selectedCountries.message}</Text>
        )}

        <Button 
          title={t('roadtrips.create_btn')} 
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
  button: { marginTop: spacing.xl },
  label: { ...typography.caption, marginBottom: spacing.xs, fontWeight: '600' },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: spacing.s },
  tag: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 10, 
    paddingVertical: 6, 
    borderRadius: 20,
    gap: 4
  },
  tagText: { color: 'white', fontSize: 12, fontWeight: '600' },
  searchInput: { marginBottom: 0 },
  dropdown: {
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 4,
    overflow: 'hidden'
  },
  dropdownItem: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee'
  },
  error: { ...typography.caption, marginTop: spacing.xs },
});
