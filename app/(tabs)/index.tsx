import React from 'react';
import { StyleSheet, ScrollView, View, Image, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { GradientBackground } from '@/components/GradientBackground';
import { useTheme } from '@/hooks/useTheme';
import { Spacing } from '@/constants/Spacing';
import { Wind, Volume2, MessageCircle, Crown, TrendingUp } from 'lucide-react-native';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('home.goodMorning');
    if (hour < 18) return t('home.goodAfternoon');
    return t('home.goodEvening');
  };

  const handleBreathingExercise = () => {
    router.push('/breathe');
  };

  const handleSoundTherapy = () => {
    router.push('/sounds');
  };

  const handleAIChat = () => {
    router.push('/chat');
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Gradient */}
        <GradientBackground variant="primary" style={styles.headerGradient}>
          <View style={styles.header}>
            <ThemedText variant="heading1" color="text" style={styles.greeting}>
              {getGreeting()}
            </ThemedText>
            <ThemedText variant="body" color="textSecondary" style={styles.appName}>
              {t('app.name')}
            </ThemedText>
          </View>
        </GradientBackground>

        {/* Today's Quote Section */}
        <Card variant="elevated" style={styles.quoteCard}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800' }}
            style={styles.quoteImage}
            resizeMode="cover"
          />
          <View style={styles.quoteOverlay}>
            <ThemedText variant="caption" color="textMuted" style={styles.quoteLabel}>
              {t('home.todayQuote')}
            </ThemedText>
            <ThemedText variant="bodyLarge" weight="medium" style={styles.quote}>
              "The present moment is the only time over which we have dominion."
            </ThemedText>
            <ThemedText variant="caption" color="textSecondary" style={styles.quoteAuthor}>
              — Thích Nhất Hạnh
            </ThemedText>
          </View>
        </Card>

        {/* Quick Start Section */}
        <View style={styles.section}>
          <ThemedText variant="heading3" style={styles.sectionTitle}>
            {t('home.quickStart')}
          </ThemedText>
          
          <View style={styles.quickStartGrid}>
            <Card 
              variant="default" 
              padding="large" 
              pressable 
              onPress={handleBreathingExercise}
              style={[styles.quickStartCard, { backgroundColor: colors.primary + '15' }]}
            >
              <Wind color={colors.primary} size={32} strokeWidth={2} />
              <ThemedText variant="heading4" style={styles.quickStartTitle}>
                {t('home.breathingExercise')}
              </ThemedText>
              <ThemedText variant="caption" color="textSecondary" style={styles.quickStartSubtitle}>
                Guided breathing exercises
              </ThemedText>
            </Card>

            <Card 
              variant="default" 
              padding="large" 
              pressable 
              onPress={handleSoundTherapy}
              style={[styles.quickStartCard, { backgroundColor: colors.secondary + '15' }]}
            >
              <Volume2 color={colors.secondary} size={32} strokeWidth={2} />
              <ThemedText variant="heading4" style={styles.quickStartTitle}>
                {t('home.soundTherapy')}
              </ThemedText>
              <ThemedText variant="caption" color="textSecondary" style={styles.quickStartSubtitle}>
                Calming nature sounds
              </ThemedText>
            </Card>
          </View>

          <Card 
            variant="outlined" 
            padding="large" 
            pressable 
            onPress={handleAIChat}
            style={styles.premiumCard}
          >
            <View style={styles.premiumCardContent}>
              <View style={styles.premiumCardLeft}>
                <MessageCircle color={colors.accent} size={28} strokeWidth={2} />
                <View style={styles.premiumCardText}>
                  <View style={styles.premiumTitleRow}>
                    <ThemedText variant="heading4" style={styles.premiumTitle}>
                      {t('home.aiChat')}
                    </ThemedText>
                    <View style={styles.premiumBadge}>
                      <Crown color={colors.warning} size={14} strokeWidth={2} />
                      <ThemedText variant="caption" color="warning" weight="medium">
                        {t('home.premium')}
                      </ThemedText>
                    </View>
                  </View>
                  <ThemedText variant="caption" color="textSecondary">
                    Personalized relaxation guidance
                  </ThemedText>
                </View>
              </View>
            </View>
          </Card>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <ThemedText variant="heading3" style={styles.sectionTitle}>
            {t('home.recentActivity')}
          </ThemedText>
          
          <Card variant="default" padding="large" style={styles.activityCard}>
            <View style={styles.activityHeader}>
              <TrendingUp color={colors.success} size={24} strokeWidth={2} />
              <ThemedText variant="heading4" color="success">
                {t('home.streakDays', { count: 7 })}
              </ThemedText>
            </View>
            <ThemedText variant="body" color="textSecondary" style={styles.activityDescription}>
              {t('home.minutesCompleted', { count: 45 })} this week
            </ThemedText>
          </Card>
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
  greeting: {
    marginBottom: Spacing.xs,
  },
  appName: {
    textAlign: 'center',
  },
  quoteCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
    overflow: 'hidden',
    height: 200,
  },
  quoteImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  quoteOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: Spacing.lg,
    justifyContent: 'center',
  },
  quoteLabel: {
    marginBottom: Spacing.sm,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  quote: {
    fontStyle: 'italic',
    marginBottom: Spacing.md,
    textAlign: 'center',
    color: 'white',
  },
  quoteAuthor: {
    textAlign: 'right',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    marginBottom: Spacing.lg,
  },
  quickStartGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  quickStartCard: {
    flex: 1,
    alignItems: 'center',
    minHeight: 140,
  },
  quickStartTitle: {
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  quickStartSubtitle: {
    textAlign: 'center',
  },
  premiumCard: {
    borderStyle: 'dashed',
  },
  premiumCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  premiumCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  premiumCardText: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  premiumTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  premiumTitle: {
    marginRight: Spacing.sm,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: 12,
    gap: 4,
  },
  activityCard: {
    backgroundColor: 'rgba(16, 185, 129, 0.05)',
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  activityDescription: {
    marginTop: Spacing.xs,
  },
});