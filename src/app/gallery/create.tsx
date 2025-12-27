import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Text, Alert } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useCreateGallery } from '@/hooks/useGalleries';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { colors, spacing, typography } from '@/theme';
import { useTheme } from '@/hooks/useTheme';
import { useTranslation } from 'react-i18next';
import { useToastStore } from '@/stores/toastStore';
import { Ionicons } from '@expo/vector-icons';

export default function CreateGalleryScreen() {
  const { pointId } = useLocalSearchParams<{ pointId: string }>();
  const [title, setTitle] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const { mutate: createGallery, isPending } = useCreateGallery();
  const { mode } = useTheme();
  const router = useRouter();
  const { t } = useTranslation();
  const showToast = useToastStore(state => state.showToast);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImages([...images, ...result.assets.map(a => a.uri)]);
    }
  };

  const handleCreate = () => {
    if (!title || images.length === 0) {
      showToast('Title and at least one image required', 'error');
      return;
    }

    createGallery({
      id: Math.random().toString(36).substr(2, 9),
      pointId: Array.isArray(pointId) ? pointId[0] : pointId!,
      title,
      createdAt: new Date().toISOString(),
      images: images.map((uri, idx) => ({
        id: idx.toString(),
        uri,
        thumbnail: uri,
        width: 800,
        height: 600
      }))
    }, {
      onSuccess: () => {
        showToast('Gallery created!', 'success');
        router.back();
      }
    });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors[mode].background }]}>
      <Stack.Screen options={{ title: 'Add Photos', headerBackTitle: '' }} />
      <View style={styles.content}>
        <Input 
          label="Gallery Title" 
          value={title} 
          onChangeText={setTitle} 
          placeholder="Our memories..." 
        />

        <Text style={[styles.label, { color: colors[mode].text }]}>Photos</Text>
        <View style={styles.imageGrid}>
          {images.map((uri, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image source={{ uri }} style={styles.image} />
              <TouchableOpacity 
                style={styles.removeBtn} 
                onPress={() => setImages(images.filter((_, i) => i !== index))}
              >
                <Ionicons name="close-circle" size={20} color="red" />
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity 
            style={[styles.addBtn, { borderColor: colors[mode].border }]} 
            onPress={pickImage}
          >
            <Ionicons name="camera" size={32} color={colors[mode].textSecondary} />
            <Text style={{ color: colors[mode].textSecondary, fontSize: 12 }}>Add</Text>
          </TouchableOpacity>
        </View>

        <Button 
          title="Save Gallery" 
          onPress={handleCreate} 
          loading={isPending}
          style={styles.saveBtn}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing.m },
  label: { ...typography.caption, fontWeight: '600', marginBottom: spacing.s },
  imageGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  imageContainer: { width: 100, height: 100, position: 'relative' },
  image: { width: '100%', height: '100%', borderRadius: 8 },
  removeBtn: { position: 'absolute', top: -5, right: -5, backgroundColor: 'white', borderRadius: 10 },
  addBtn: { 
    width: 100, 
    height: 100, 
    borderRadius: 8, 
    borderWidth: 2, 
    borderStyle: 'dashed', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  saveBtn: { marginTop: spacing.xl },
});
