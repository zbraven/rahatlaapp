import React from 'react';
import { StyleSheet, ScrollView, View, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Card } from '@/components/Card';
import { GradientBackground } from '@/components/GradientBackground';
import { useTheme } from '@/hooks/useTheme';
import { Spacing } from '@/constants/Spacing';
import { Volume2, Play, Crown, TreePine, Cloud } from 'lucide-react-native';

export default function SoundsScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const soundCategories = [
    {
      id: 'nature',
      title: t('sounds.nature'),
      icon: TreePine,
      sounds: [
        {
          id: 'rain',
          title: 'Gentle Rain',
          image: 'https://images.pexels.com/photos/125510/pexels-photo-125510.jpeg?auto=compress&cs=tinysrgb&w=400',
          premium: false,
        },
        {
          id: 'ocean',
          title: 'Ocean Waves',
          image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=400',
          premium: false,
        },
        {
          id: 'forest',
          title: 'Forest Sounds',
          image: 'https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&w=400',
          premium: true,
        },
      ],
    },
    {
      id: 'ambient',
      title: t('sounds.ambient'),
      icon: Cloud,
      sounds: [
        {
          id: 'white-noise',
          title: 'White Noise',
          image: 'https://images.pexels.com/photos/1323712/pexels-photo-1323712.jpeg?auto=compress&cs=tinysrgb&w=400',
          premium: true,
        },
        {
          id: 'cafe',
          title: 'Coffee Shop',
          image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400',
          premium: true,
        },
      ],
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
        <GradientBackground variant="secondary" style={styles.headerGradient}>
          <View style={styles.header}>
            <Volume2 color="white" size={40} strokeWidth={2} />
            <ThemedText variant="heading1" style={styles.title}>
              {t('sounds.title')}
            </ThemedText>
            <ThemedText variant="body" style={styles.subtitle}>
              {t('sounds.subtitle')}
            </ThemedText>
          </View>
        </GradientBackground>

        {/* Sound Categories */}
        {soundCategories.map((category) => (
          <View key={category.id} style={styles.section}>
            <View style={styles.categoryHeader}>
              <category.icon color={colors.text} size={24} strokeWidth={2} />
              <ThemedText variant="heading3" style={styles.categoryTitle}>
                {category.title}
              </ThemedText>
            </View>
            
            <View style={styles.soundsGrid}>
              {category.sounds.map((sound) => (
                <Card
                  key={sound.id}
                  variant="default"
                  padding="none"
                  pressable
                  onPress={() => {
                    console.log('Play sound:', sound.id);
                  }}
                  style={styles.soundCard}
                >
                  <Image
                    source={{ uri: sound.image }}
                    style={styles.soundImage}
                    resizeMode="cover"
                  />
                  <View style={styles.soundOverlay}>
                    {sound.premium && (
                      <View style={styles.premiumBadge}>
                        <Crown color={colors.warning} size={12} strokeWidth={2} />
                      </View>
                    )}
                    <View style={styles.playButtonContainer}>
                      <View style={styles.playButton}>
                        <Play color="white" size={20} strokeWidth={2} />
                      </View>
                    </View>
                  </View>
                  <View style={styles.soundInfo}>
                    <ThemedText variant="body" weight="medium" style={styles.soundTitle}>
                      {sound.title}
                    </ThemedText>
                  </View>
                </Card>
              ))}
            </View>
          </View>
        ))}
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
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  categoryTitle: {
    flex: 1,
  },
  soundsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  soundCard: {
    width: '48%',
    aspectRatio: 1,
    overflow: 'hidden',
  },
  soundImage: {
    width: '100%',
    height: '70%',
  },
  soundOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '70%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  premiumBadge: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    backgroundColor: 'rgba(245, 158, 11, 0.9)',
    borderRadius: 12,
    padding: 4,
  },
  playButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  soundInfo: {
    padding: Spacing.md,
    height: '30%',
    justifyContent: 'center',
  },
  soundTitle: {
    textAlign: 'center',
  },
});