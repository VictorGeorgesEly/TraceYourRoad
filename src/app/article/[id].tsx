import React from 'react';
import { ScrollView, StyleSheet, Image, View } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useArticle } from '@/hooks/useArticles';
import { useTheme } from '@/hooks/useTheme';
import { colors, spacing } from '@/theme';
import { Loading } from '@/components/ui/Loading';
import Markdown from 'react-native-markdown-display';

export default function ArticleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const articleId = Array.isArray(id) ? id[0] : id;
  const { data: article, isLoading } = useArticle(articleId);
  const { mode } = useTheme();

  if (isLoading) return <Loading />;
  if (!article) return null;

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors[mode].background }]}>
      <Stack.Screen options={{ headerBackTitle: '' }} />
      {article.coverImage && (
        <Image source={{ uri: article.coverImage }} style={styles.cover} />
      )}
      <View style={styles.content}>
        <Markdown
          style={{
            body: { color: colors[mode].text },
            heading1: { color: colors[mode].primary },
          }}
        >
          {article.content}
        </Markdown>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  cover: { width: '100%', height: 200 },
  content: { padding: spacing.m },
});
