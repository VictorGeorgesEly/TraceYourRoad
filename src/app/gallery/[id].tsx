import React from 'react';
import { View, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useGallery } from '@/hooks/useGalleries';
import { Loading } from '@/components/ui/Loading';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function GalleryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const galleryId = Array.isArray(id) ? id[0] : id;
  const { data: gallery, isLoading } = useGallery(galleryId);
  const width = Dimensions.get('window').width;
  const router = useRouter();
  const insets = useSafeAreaInsets();

  if (isLoading) return <Loading />;
  if (!gallery) return null;

  return (
    <View style={[styles.container, { backgroundColor: 'black' }]}>
      <TouchableOpacity 
        style={[styles.closeBtn, { top: insets.top + 10 }]} 
        onPress={() => router.back()}
      >
        <Ionicons name="close-circle" size={36} color="white" />
      </TouchableOpacity>

      <FlatList
        data={gallery.images}
        horizontal
        pagingEnabled
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ width, justifyContent: 'center', alignItems: 'center' }}>
            <Image 
              source={{ uri: item.uri }} 
              style={{ width: width, height: 400 }} 
              resizeMode="contain" 
            />
            {item.caption && <Text style={styles.caption}>{item.caption}</Text>}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  closeBtn: {
    position: 'absolute',
    right: 20,
    zIndex: 10,
    padding: 8,
  },
  caption: {
    color: 'white',
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
});
