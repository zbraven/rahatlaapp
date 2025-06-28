import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ThemedText } from './ThemedText';
import { Button } from './Button';
import { Card } from './Card';
import { useTheme } from '@/hooks/useTheme';
import { Spacing } from '@/constants/Spacing';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react-native';
import { Platform } from 'react-native';

const { width } = Dimensions.get('window');

interface SoundPlayerProps {
  sound: {
    id: string;
    title: string;
    description: string;
    duration: string;
    premium: boolean;
  };
  onClose: () => void;
}

export function SoundPlayer({ sound, onClose }: SoundPlayerProps) {
  const { colors } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(300); // 5 minutes in seconds

  const triggerHaptic = () => {
    if (Platform.OS !== 'web') {
      import('expo-haptics').then((Haptics) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }).catch(() => {
        // Silently fail if haptics not available
      });
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && !isMuted) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, isMuted, duration]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    triggerHaptic();
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    triggerHaptic();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (currentTime / duration) * 100;

  return (
    <View style={styles.container}>
      <Card variant="elevated" padding="large" style={styles.playerCard}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.soundInfo}>
            <ThemedText variant="heading4" style={styles.title}>
              {sound.title}
            </ThemedText>
            <ThemedText variant="body" color="textSecondary">
              {sound.description}
            </ThemedText>
          </View>
          <Button
            title="Close"
            variant="ghost"
            size="small"
            onPress={onClose}
          />
        </View>

        {/* Waveform Visualization */}
        <View style={styles.waveformContainer}>
          <View style={styles.waveform}>
            {Array.from({ length: 40 }).map((_, index) => {
              const height = Math.random() * 40 + 10;
              const isActive = (index / 40) * 100 < progress;
              return (
                <View
                  key={index}
                  style={[
                    styles.waveformBar,
                    {
                      height,
                      backgroundColor: isActive ? colors.primary : colors.border,
                    },
                  ]}
                />
              );
            })}
          </View>
        </View>

        {/* Progress */}
        <View style={styles.progressContainer}>
          <ThemedText variant="caption" color="textMuted">
            {formatTime(currentTime)}
          </ThemedText>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${progress}%`,
                  backgroundColor: colors.primary,
                },
              ]}
            />
          </View>
          <ThemedText variant="caption" color="textMuted">
            {formatTime(duration)}
          </ThemedText>
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          <Button
            title=""
            variant="ghost"
            size="large"
            icon={isMuted ? <VolumeX color={colors.textMuted} size={24} /> : <Volume2 color={colors.text} size={24} />}
            onPress={toggleMute}
            style={styles.controlButton}
          />
          
          <Button
            title=""
            variant="primary"
            size="large"
            icon={isPlaying ? <Pause color="white" size={32} /> : <Play color="white" size={32} />}
            onPress={togglePlayPause}
            style={styles.playButton}
          />
          
          <View style={styles.controlButton} />
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  playerCard: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.lg,
  },
  soundInfo: {
    flex: 1,
    marginRight: Spacing.md,
  },
  title: {
    marginBottom: Spacing.xs,
  },
  waveformContainer: {
    marginBottom: Spacing.lg,
  },
  waveform: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: Spacing.sm,
  },
  waveformBar: {
    width: 3,
    borderRadius: 1.5,
    marginHorizontal: 1,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  controlButton: {
    width: 48,
    height: 48,
  },
  playButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
});