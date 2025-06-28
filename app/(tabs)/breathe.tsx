import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Card } from '@/components/Card';
import { GradientBackground } from '@/components/GradientBackground';
import { useTheme } from '@/hooks/useTheme';
import { Spacing } from '@/constants/Spacing';
import { Wind, Clock, Play } from 'lucide-react-native';

export default function BreatheScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const exercises = [
    {
      id: 'basic',
      title: t('breathing.exercises.basic'),
      duration: '5 min',
      description: 'Perfect for beginners',
      color: colors.primary,
    },
    {
      id: 'deep',
      title: t('breathing.exercises.deep'),
      duration: '10 min',
      description: 'Deep relaxation technique',
      color: colors.secondary,
    },
    {
      id: 'energizing',
      title: t('breathing.exercises.energizing'),
      duration: '7 min',
      description: 'Boost your energy',
      color: colors.accent,
    },
    {
      id: 'sleep',
      title: t('breathing.exercises.sleep'),
      duration: '15 min',
      description: 'Prepare for restful sleep',
      color: colors.tertiary,
    },
  ];

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <GradientBackground variant="primary" style={styles.headerGradient}>
          <View style={styles.header}>
            <Wind color="white" size={40} strokeWidth={2} />
            <ThemedText variant="heading1" style={styles.title}>
              {t('breathing.title')}
            </ThemedText>
            <ThemedText variant="body" style={styles.subtitle}>
              {t('breathing.subtitle')}
            </ThemedText>
          </View>
        </GradientBackground>

        {/* Exercises */}
        <View style={styles.section}>
          <ThemedText variant="heading3" style={styles.sectionTitle}>
            Choose Your Exercise
          </ThemedText>
          
          {exercises.map((exercise) => (
            <Card
              key={exercise.id}
              variant="default"
              padding="large"
              pressable
              onPress={() => {
                // TODO: Navigate to exercise detail
                console.log('Start exercise:', exercise.id);
              }}
              style={[styles.exerciseCard, { borderLeftColor: exercise.color }]}
            >
              <View style={styles.exerciseContent}>
                <View style={styles.exerciseInfo}>
                  <ThemedText variant="heading4" style={styles.exerciseTitle}>
                    {exercise.title}
                  </ThemedText>
                  <ThemedText variant="body" color="textSecondary" style={styles.exerciseDescription}>
                    {exercise.description}
                  </ThemedText>
                  <View style={styles.exerciseMeta}>
                    <Clock color={colors.textMuted} size={16} strokeWidth={2} />
                    <ThemedText variant="caption" color="textMuted">
                      {exercise.duration}
                    </ThemedText>
                  </View>
                </View>
                <View style={[styles.playButton, { backgroundColor: exercise.color + '20' }]}>
                  <Play color={exercise.color} size={24} strokeWidth={2} />
                </View>
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xl,
  },
  headerGradient: {
    paddingTop: Spacing['3xl'],
    paddingBottom: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
  },
  title: {
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  section: {
    paddingHorizontal: Spacing.lg,
  },
  sectionTitle: {
    marginBottom: Spacing.lg,
  },
  exerciseCard: {
    marginBottom: Spacing.md,
    borderLeftWidth: 4,
  },
  exerciseContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseTitle: {
    marginBottom: Spacing.xs,
  },
  exerciseDescription: {
    marginBottom: Spacing.sm,
  },
  exerciseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  playButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});