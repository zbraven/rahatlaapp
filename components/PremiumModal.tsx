import React from 'react';
import { StyleSheet, View, Modal, Dimensions } from 'react-native';
import { ThemedText } from './ThemedText';
import { Button } from './Button';
import { Card } from './Card';
import { GradientBackground } from './GradientBackground';
import { useTheme } from '@/hooks/useTheme';
import { Spacing } from '@/constants/Spacing';
import { Crown, X, Sparkles, Check } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

interface PremiumModalProps {
  visible: boolean;
  onClose: () => void;
  feature?: string;
}

export function PremiumModal({ visible, onClose, feature }: PremiumModalProps) {
  const { colors } = useTheme();

  const features = [
    'Unlimited access to all sounds',
    'Advanced breathing exercises',
    'AI-powered wellness chat',
    'Sleep stories & meditations',
    'Progress tracking & insights',
    'Offline mode for all content',
  ];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <GradientBackground variant="sunset" style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Button
            title=""
            variant="ghost"
            size="small"
            icon={<X color="white" size={24} strokeWidth={2} />}
            onPress={onClose}
            style={styles.closeButton}
          />
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Crown color="#FFD700" size={64} strokeWidth={2} />
          </View>
          
          <ThemedText variant="heading1" style={styles.title}>
            Unlock Premium
          </ThemedText>
          
          <ThemedText variant="body" style={styles.subtitle}>
            {feature ? `Unlock ${feature} and` : 'Get'} access to all premium features
          </ThemedText>

          {/* Features List */}
          <Card variant="default" padding="large" style={styles.featuresCard}>
            {features.map((featureText, index) => (
              <View key={index} style={styles.featureRow}>
                <Check color={colors.success} size={20} strokeWidth={2} />
                <ThemedText variant="body" style={styles.featureText}>
                  {featureText}
                </ThemedText>
              </View>
            ))}
          </Card>

          {/* Pricing */}
          <View style={styles.pricingContainer}>
            <Card variant="elevated" padding="large" style={styles.pricingCard}>
              <View style={styles.pricingHeader}>
                <Sparkles color={colors.warning} size={24} strokeWidth={2} />
                <ThemedText variant="heading3" style={styles.pricingTitle}>
                  Premium Plan
                </ThemedText>
              </View>
              <ThemedText variant="heading2" color="primary" style={styles.price}>
                $9.99/month
              </ThemedText>
              <ThemedText variant="caption" color="textSecondary">
                Cancel anytime • 7-day free trial
              </ThemedText>
            </Card>
          </View>

          {/* CTA Buttons */}
          <View style={styles.buttonContainer}>
            <Button
              title="Start Free Trial"
              variant="primary"
              size="large"
              fullWidth
              icon={<Crown color="white" size={20} strokeWidth={2} />}
              onPress={() => {
                console.log('Start premium trial');
                onClose();
              }}
              style={styles.primaryButton}
            />
            
            <Button
              title="Maybe Later"
              variant="ghost"
              size="medium"
              fullWidth
              onPress={onClose}
              style={styles.secondaryButton}
            />
          </View>
        </View>
      </GradientBackground>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: Spacing['3xl'],
    paddingHorizontal: Spacing.lg,
    alignItems: 'flex-end',
  },
  closeButton: {
    width: 40,
    height: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: Spacing.xl,
  },
  title: {
    color: 'white',
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  featuresCard: {
    width: '100%',
    marginBottom: Spacing.xl,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  featureText: {
    flex: 1,
  },
  pricingContainer: {
    width: '100%',
    marginBottom: Spacing.xl,
  },
  pricingCard: {
    alignItems: 'center',
  },
  pricingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  pricingTitle: {
    marginBottom: 0,
  },
  price: {
    marginBottom: Spacing.sm,
  },
  buttonContainer: {
    width: '100%',
    gap: Spacing.md,
  },
  primaryButton: {
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  secondaryButton: {
    opacity: 0.8,
  },
});