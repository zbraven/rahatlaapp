import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Card } from '@/components/Card';
import { GradientBackground } from '@/components/GradientBackground';
import { SoundPlayer } from '@/components/SoundPlayer';
import { useTheme } from '@/hooks/useTheme';
import { Spacing } from '@/constants/Spacing';
import { Volume2, Play, Crown, TreePine, Cloud, Waves, Coffee } from 'lucide-react-native';

interface Sound {
  id: string;
  title: string;
  description: string;
  image: string;
  premium: boolean;
  duration: string;
  category: string;
}

const sounds: Sound[] = [
  {
    id: 'rain',
    title: 'Gentle Rain',
    description: 'Soft rainfall on leaves',
    image: 'https://images.pexels.com/photos/125510/pexels-photo-125510.jpeg?auto=compress&cs=tinysrgb&w=400',
    premium: false,
    duration: '5:00',
    category: 'nature',
  },
  {
    id: 'ocean',
    title: 'Ocean Waves',
    description: 'Rhythmic waves on shore',
    image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=400',
    premium: false,
    duration: '8:00',
    category: 'nature',
  },
  {
    id: 'forest',
    title: 'Forest Sounds',
    description: 'Birds and rustling leaves',
    image: 'https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&w=400',
    premium: true,
    duration: '10:00',
    category: 'nature',
  },
  {
    id: 'thunderstorm',
    title: 'Distant Thunder',
    description: 'Gentle thunder with rain',
    image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=400',
    premium: true,
    duration: '12:00',
    category: 'nature',
  },
  {
    id: 'white-noise',
    title: 'White Noise',
    description: 'Pure white noise for focus',
    image: 'https://images.pexels.com/photos/1323712/pexels-photo-1323712.jpeg?auto=compress&cs=tinysrgb&w=400',
    premium: true,
    duration: '15:00',
    category: 'ambient',
  },
  {
    id: 'cafe',
    title: 'Coffee Shop',
    description: 'Ambient cafe atmosphere',
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400',
    premium: true,
    duration: '20:00',
    category: 'ambient',
  },
];

const categories = [
  {
    id: 'nature',
    title: 'Nature',
    icon: TreePine,
    color: '#22C55E',
  },
  {
    id: 'ambient',
    title: 'Ambient',
    icon: Cloud,
    color: '#8B5CF6',
  },
];

export default function SoundsScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [selectedSound, setSelectedSound] = useState<Sound | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredSounds = activeCategory === 'all' 
    ? sounds 
    : sounds.filter(sound => sound.category === activeCategory);

  const handleSoundPress = (sound: Sound) => {
    if (sound.premium) {
      // Show premium upgrade modal
      console.log('Show premium upgrade for:', sound.title);
      return;
    }
    setSelectedSound(sound);
  };

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

        {/* Category Filter */}
        <View style={styles.section}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryContainer}
          >
            <Card
              variant={activeCategory === 'all' ? 'elevated' : 'outlined'}
              padding="medium"
              pressable
              onPress={() => setActiveCategory('all')}
              style={[
                styles.categoryCard,
                activeCategory === 'all' && { backgroundColor: colors.primary + '20' }
              ]}
            >
              <ThemedText 
                variant="body" 
                weight="medium"
                color={activeCategory === 'all' ? 'primary' : 'text'}
              >
                All Sounds
              </ThemedText>
            </Card>
            
            {categories.map((category) => (
              <Card
                key={category.id}
                variant={activeCategory === category.id ? 'elevated' : 'outlined'}
                padding="medium"
                pressable
                onPress={() => setActiveCategory(category.id)}
                style={[
                  styles.categoryCard,
                  activeCategory === category.id && { backgroundColor: category.color + '20' }
                ]}
              >
                <View style={styles.categoryContent}>
                  <category.icon 
                    color={activeCategory === category.id ? category.color : colors.textMuted} 
                    size={20} 
                    strokeWidth={2} 
                  />
                  <ThemedText 
                    variant="body" 
                    weight="medium"
                    color={activeCategory === category.id ? 'text' : 'textMuted'}
                    style={styles.categoryText}
                  >
                    {category.title}
                  </ThemedText>
                </View>
              </Card>
            ))}
          </ScrollView>
        </View>

        {/* Sounds Grid */}
        <View style={styles.section}>
          <View style={styles.soundsGrid}>
            {filteredSounds.map((sound) => (
              <Card
                key={sound.id}
                variant="default"
                padding="none"
                pressable
                onPress={() => handleSoundPress(sound)}
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
                  <ThemedText variant="caption" color="textSecondary" style={styles.soundDuration}>
                    {sound.duration}
                  </ThemedText>
                </View>
              </Card>
            ))}
          </View>
        </View>

        {/* Featured Collection */}
        <View style={styles.section}>
          <ThemedText variant="heading3" style={styles.sectionTitle}>
            Featured Collection
          </ThemedText>
          
          <Card variant="elevated" padding="large" style={styles.featuredCard}>
            <View style={styles.featuredContent}>
              <View style={styles.featuredInfo}>
                <ThemedText variant="heading4" style={styles.featuredTitle}>
                  Sleep Stories Premium
                </ThemedText>
                <ThemedText variant="body" color="textSecondary" style={styles.featuredDescription}>
                  Unlock 50+ guided sleep stories and meditation tracks
                </ThemedText>
                <View style={styles.featuredBadge}>
                  <Crown color={colors.warning} size={16} strokeWidth={2} />
                  <ThemedText variant="caption" color="warning" weight="medium">
                    Premium Feature
                  </ThemedText>
                </View>
              </View>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/1671325/pexels-photo-1671325.jpeg?auto=compress&cs=tinysrgb&w=200' }}
                style={styles.featuredImage}
                resizeMode="cover"
              />
            </View>
          </Card>
        </View>
      </ScrollView>

      {/* Sound Player */}
      {selectedSound && (
        <SoundPlayer
          sound={selectedSound}
          onClose={() => setSelectedSound(null)}
        />
      )}
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
  categoryContainer: {
    paddingRight: Spacing.lg,
    gap: Spacing.sm,
  },
  categoryCard: {
    marginRight: Spacing.sm,
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryText: {
    marginLeft: Spacing.sm,
  },
  sectionTitle: {
    marginBottom: Spacing.lg,
  },
  soundsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    justifyContent: 'space-between',
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
    marginBottom: Spacing.xs,
  },
  soundDuration: {
    textAlign: 'center',
  },
  featuredCard: {
    backgroundColor: 'rgba(139, 92, 246, 0.05)',
  },
  featuredContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredInfo: {
    flex: 1,
    marginRight: Spacing.md,
  },
  featuredTitle: {
    marginBottom: Spacing.sm,
  },
  featuredDescription: {
    marginBottom: Spacing.md,
    lineHeight: 20,
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    gap: 4,
  },
  featuredImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
});