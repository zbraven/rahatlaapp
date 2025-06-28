import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ThemedView } from '@/components/common/ThemedView';
import { ThemedText } from '@/components/common/ThemedText';
import { Button } from '@/components/common/Button';
import { useTheme } from '@/hooks/useTheme';
import { Spacing } from '@/constants/spacing';

export const HomeScreen: React.FC = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const handleBreathingExercise = () => {
    // TODO: Navigate to breathing exercise
    console.log('Navigate to breathing exercise');
  };

  const handleSoundTherapy = () => {
    // TODO: Navigate to sound therapy
    console.log('Navigate to sound therapy');
  };

  const handleAIChat = () => {
    // TODO: Navigate to AI chat (premium)
    console.log('Navigate to AI chat');
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <ThemedText variant="heading1" style={styles.appName}>
            {t('app.name')}
          </ThemedText>
          <ThemedText variant="body" color="textSecondary" style={styles.tagline}>
            {t('app.tagline')}
          </ThemedText>
        </View>

        {/* Today's Quote Section */}
        <View style={[styles.quoteSection, { backgroundColor: colors.surface }]}>
          <ThemedText variant="heading3" style={styles.sectionTitle}>
            {t('home.todayQuote')}
          </ThemedText>
          <ThemedText variant="body" style={styles.quote}>
            "The present moment is the only time over which we have dominion."
          </ThemedText>
          <ThemedText variant="caption" color="textSecondary" style={styles.quoteAuthor}>
            — Thích Nhất Hạnh
          </ThemedText>
        </View>

        {/* Quick Start Section */}
        <View style={styles.quickStartSection}>
          <ThemedText variant="heading3" style={styles.sectionTitle}>
            {t('home.quickStart')}
          </ThemedText>
          
          <View style={styles.buttonContainer}>
            <Button
              title={t('home.breathingExercise')}
              variant="primary"
              size="large"
              fullWidth
              onPress={handleBreathingExercise}
              style={styles.actionButton}
            />
            
            <Button
              title={t('home.soundTherapy')}
              variant="secondary"
              size="large"
              fullWidth
              onPress={handleSoundTherapy}
              style={styles.actionButton}
            />
            
            <Button
              title={`${t('home.aiChat')} (Premium)`}
              variant="outline"
              size="large"
              fullWidth
              onPress={handleAIChat}
              style={styles.actionButton}
            />
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing['2xl'],
    paddingBottom: Spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  appName: {
    marginBottom: Spacing.sm,
  },
  tagline: {
    textAlign: 'center',
  },
  quoteSection: {
    padding: Spacing.lg,
    borderRadius: 16,
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    marginBottom: Spacing.md,
  },
  quote: {
    fontStyle: 'italic',
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  quoteAuthor: {
    textAlign: 'right',
  },
  quickStartSection: {
    marginBottom: Spacing.xl,
  },
  buttonContainer: {
    gap: Spacing.md,
  },
  actionButton: {
    marginBottom: Spacing.sm,
  },
});