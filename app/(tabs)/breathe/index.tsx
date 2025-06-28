import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { GradientBackground } from '@/components/GradientBackground';
import { BreathingAnimation } from '@/components/BreathingAnimation';
import { useTheme } from '@/hooks/useTheme';
import { Spacing } from '@/constants/Spacing';
import { Wind, Play, Pause, Square, RotateCcw } from 'lucide-react-native';
import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

interface BreathingExercise {
  id: string;
  name: string;
  inhale: number;
  hold: number;
  exhale: number;
  pause: number;
  cycles: number;
  description: string;
}

const exercises: BreathingExercise[] = [
  {
    id: 'basic',
    name: 'Basic Breathing',
    inhale: 4,
    hold: 2,
    exhale: 4,
    pause: 2,
    cycles: 8,
    description: 'Perfect for beginners and daily practice',
  },
  {
    id: 'deep',
    name: 'Deep Relaxation',
    inhale: 6,
    hold: 3,
    exhale: 8,
    pause: 2,
    cycles: 6,
    description: 'Activates your parasympathetic nervous system',
  },
  {
    id: 'energizing',
    name: 'Energizing Breath',
    inhale: 4,
    hold: 4,
    exhale: 4,
    pause: 1,
    cycles: 10,
    description: 'Boost energy and mental clarity',
  },
  {
    id: 'sleep',
    name: 'Sleep Preparation',
    inhale: 4,
    hold: 7,
    exhale: 8,
    pause: 3,
    cycles: 5,
    description: 'Prepare your mind and body for rest',
  },
];

export default function BreatheScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [selectedExercise, setSelectedExercise] = useState<BreathingExercise>(exercises[0]);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale');
  const [currentCycle, setCurrentCycle] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showExerciseList, setShowExerciseList] = useState(true);

  const triggerHaptic = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            // Move to next phase
            triggerHaptic();
            
            if (currentPhase === 'inhale') {
              setCurrentPhase('hold');
              return selectedExercise.hold;
            } else if (currentPhase === 'hold') {
              setCurrentPhase('exhale');
              return selectedExercise.exhale;
            } else if (currentPhase === 'exhale') {
              setCurrentPhase('pause');
              return selectedExercise.pause;
            } else {
              // End of cycle
              if (currentCycle >= selectedExercise.cycles) {
                // Exercise complete
                setIsActive(false);
                setCurrentCycle(1);
                setCurrentPhase('inhale');
                setShowExerciseList(true);
                return 0;
              } else {
                setCurrentCycle(prev => prev + 1);
                setCurrentPhase('inhale');
                return selectedExercise.inhale;
              }
            }
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused, currentPhase, currentCycle, selectedExercise]);

  const startExercise = (exercise: BreathingExercise) => {
    setSelectedExercise(exercise);
    setIsActive(true);
    setIsPaused(false);
    setCurrentPhase('inhale');
    setCurrentCycle(1);
    setTimeRemaining(exercise.inhale);
    setShowExerciseList(false);
    triggerHaptic();
  };

  const pauseResume = () => {
    setIsPaused(!isPaused);
    triggerHaptic();
  };

  const stopExercise = () => {
    setIsActive(false);
    setIsPaused(false);
    setCurrentCycle(1);
    setCurrentPhase('inhale');
    setTimeRemaining(0);
    setShowExerciseList(true);
    triggerHaptic();
  };

  const resetExercise = () => {
    setCurrentCycle(1);
    setCurrentPhase('inhale');
    setTimeRemaining(selectedExercise.inhale);
    setIsPaused(false);
    triggerHaptic();
  };

  const getPhaseText = () => {
    switch (currentPhase) {
      case 'inhale':
        return t('breathing.inhale');
      case 'hold':
        return t('breathing.hold');
      case 'exhale':
        return t('breathing.exhale');
      case 'pause':
        return t('breathing.hold');
      default:
        return '';
    }
  };

  if (showExerciseList) {
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

          {/* Exercise Selection */}
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
                onPress={() => startExercise(exercise)}
                style={styles.exerciseCard}
              >
                <View style={styles.exerciseContent}>
                  <View style={styles.exerciseInfo}>
                    <ThemedText variant="heading4" style={styles.exerciseTitle}>
                      {exercise.name}
                    </ThemedText>
                    <ThemedText variant="body" color="textSecondary" style={styles.exerciseDescription}>
                      {exercise.description}
                    </ThemedText>
                    <View style={styles.exerciseDetails}>
                      <ThemedText variant="caption" color="textMuted">
                        {exercise.inhale}-{exercise.hold}-{exercise.exhale}-{exercise.pause} • {exercise.cycles} cycles
                      </ThemedText>
                    </View>
                  </View>
                  <View style={[styles.playButton, { backgroundColor: colors.primary + '20' }]}>
                    <Play color={colors.primary} size={24} strokeWidth={2} />
                  </View>
                </View>
              </Card>
            ))}
          </View>
        </ScrollView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <GradientBackground variant="primary" style={styles.exerciseContainer}>
        {/* Header */}
        <View style={styles.exerciseHeader}>
          <ThemedText variant="heading3" style={styles.exerciseName}>
            {selectedExercise.name}
          </ThemedText>
          <ThemedText variant="body" style={styles.cycleCounter}>
            Cycle {currentCycle} of {selectedExercise.cycles}
          </ThemedText>
        </View>

        {/* Breathing Animation */}
        <View style={styles.animationContainer}>
          <BreathingAnimation
            isActive={isActive && !isPaused}
            phase={currentPhase}
            duration={timeRemaining}
          />
          
          {/* Phase Text */}
          <View style={styles.phaseContainer}>
            <ThemedText variant="heading2" style={styles.phaseText}>
              {getPhaseText()}
            </ThemedText>
            <ThemedText variant="heading1" style={styles.timeText}>
              {timeRemaining}
            </ThemedText>
          </View>
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          <Button
            title={isPaused ? "Resume" : "Pause"}
            variant="secondary"
            size="large"
            icon={isPaused ? <Play color="white" size={20} /> : <Pause color="white" size={20} />}
            onPress={pauseResume}
            style={styles.controlButton}
          />
          
          <Button
            title="Reset"
            variant="outline"
            size="large"
            icon={<RotateCcw color={colors.text} size={20} />}
            onPress={resetExercise}
            style={styles.controlButton}
          />
          
          <Button
            title="Stop"
            variant="ghost"
            size="large"
            icon={<Square color={colors.error} size={20} />}
            onPress={stopExercise}
            style={styles.controlButton}
          />
        </View>
      </GradientBackground>
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
  exerciseDetails: {
    marginTop: Spacing.xs,
  },
  playButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseContainer: {
    flex: 1,
    paddingTop: Spacing['3xl'],
  },
  exerciseHeader: {
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  exerciseName: {
    color: 'white',
    marginBottom: Spacing.sm,
  },
  cycleCounter: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  phaseContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  phaseText: {
    color: 'white',
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  timeText: {
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
    gap: Spacing.md,
  },
  controlButton: {
    flex: 1,
  },
});