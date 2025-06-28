import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { GradientBackground } from '@/components/GradientBackground';
import { useTheme } from '@/hooks/useTheme';
import { Spacing } from '@/constants/Spacing';
import { MessageCircle, Crown, Sparkles, Lock } from 'lucide-react-native';

export default function ChatScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <GradientBackground variant="accent" style={styles.headerGradient}>
          <View style={styles.header}>
            <MessageCircle color="white" size={40} strokeWidth={2} />
            <ThemedText variant="heading1" style={styles.title}>
              {t('chat.title')}
            </ThemedText>
            <ThemedText variant="body" style={styles.subtitle}>
              {t('chat.subtitle')}
            </ThemedText>
          </View>
        </GradientBackground>

        {/* Premium Required */}
        <View style={styles.section}>
          <Card variant="outlined" padding="large" style={styles.premiumCard}>
            <View style={styles.premiumContent}>
              <View style={styles.lockIcon}>
                <Lock color={colors.textMuted} size={48} strokeWidth={1.5} />
              </View>
              
              <ThemedText variant="heading3" style={styles.premiumTitle}>
                {t('chat.premiumRequired')}
              </ThemedText>
              
              <ThemedText variant="body" color="textSecondary" style={styles.premiumDescription}>
                {t('chat.upgradeMessage')}
              </ThemedText>

              <View style={styles.featuresContainer}>
                <View style={styles.feature}>
                  <Sparkles color={colors.accent} size={20} strokeWidth={2} />
                  <ThemedText variant="body" style={styles.featureText}>
                    Personalized relaxation tips
                  </ThemedText>
                </View>
                
                <View style={styles.feature}>
                  <Sparkles color={colors.accent} size={20} strokeWidth={2} />
                  <ThemedText variant="body" style={styles.featureText}>
                    24/7 AI wellness companion
                  </ThemedText>
                </View>
                
                <View style={styles.feature}>
                  <Sparkles color={colors.accent} size={20} strokeWidth={2} />
                  <ThemedText variant="body" style={styles.featureText}>
                    Stress management guidance
                  </ThemedText>
                </View>
              </View>

              <Button
                title="Upgrade to Premium"
                variant="accent"
                size="large"
                fullWidth
                icon={<Crown color="white" size={20} strokeWidth={2} />}
                onPress={() => {
                  console.log('Navigate to premium upgrade');
                }}
                style={styles.upgradeButton}
              />
            </View>
          </Card>
        </View>

        {/* Preview */}
        <View style={styles.section}>
          <ThemedText variant="heading3" style={styles.sectionTitle}>
            What you can ask
          </ThemedText>
          
          <View style={styles.examplesContainer}>
            {[
              "How can I reduce stress at work?",
              "What breathing technique is best for anxiety?",
              "Help me create a bedtime routine",
              "I'm feeling overwhelmed, what should I do?",
            ].map((example, index) => (
              <Card
                key={index}
                variant="default"
                padding="medium"
                style={styles.exampleCard}
              >
                <ThemedText variant="body" color="textSecondary" style={styles.exampleText}>
                  "{example}"
                </ThemedText>
              </Card>
            ))}
          </View>
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
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    marginBottom: Spacing.lg,
  },
  premiumCard: {
    borderStyle: 'dashed',
    borderWidth: 2,
  },
  premiumContent: {
    alignItems: 'center',
  },
  lockIcon: {
    marginBottom: Spacing.lg,
    opacity: 0.6,
  },
  premiumTitle: {
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  premiumDescription: {
    marginBottom: Spacing.xl,
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresContainer: {
    width: '100%',
    marginBottom: Spacing.xl,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  featureText: {
    flex: 1,
  },
  upgradeButton: {
    marginTop: Spacing.md,
  },
  examplesContainer: {
    gap: Spacing.md,
  },
  exampleCard: {
    backgroundColor: 'rgba(125, 211, 252, 0.05)',
  },
  exampleText: {
    fontStyle: 'italic',
  },
});