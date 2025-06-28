import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ThemedText } from './ThemedText';
import { Card } from './Card';
import { useTheme } from '@/hooks/useTheme';
import { Spacing } from '@/constants/Spacing';
import { TrendingUp, Calendar, Clock, Target } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface ProgressData {
  streak: number;
  weeklyMinutes: number;
  totalSessions: number;
  weeklyGoal: number;
}

interface ProgressTrackerProps {
  data: ProgressData;
}

export function ProgressTracker({ data }: ProgressTrackerProps) {
  const { colors } = useTheme();
  
  const progressPercentage = Math.min((data.weeklyMinutes / data.weeklyGoal) * 100, 100);
  
  const stats = [
    {
      icon: TrendingUp,
      label: 'Current Streak',
      value: `${data.streak} days`,
      color: colors.success,
    },
    {
      icon: Clock,
      label: 'This Week',
      value: `${data.weeklyMinutes} min`,
      color: colors.primary,
    },
    {
      icon: Calendar,
      label: 'Total Sessions',
      value: data.totalSessions.toString(),
      color: colors.accent,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Weekly Goal Progress */}
      <Card variant="elevated" padding="large" style={styles.goalCard}>
        <View style={styles.goalHeader}>
          <Target color={colors.primary} size={24} strokeWidth={2} />
          <ThemedText variant="heading4" style={styles.goalTitle}>
            Weekly Goal
          </ThemedText>
        </View>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  width: `${progressPercentage}%`,
                  backgroundColor: colors.primary,
                }
              ]} 
            />
          </View>
          <ThemedText variant="body" color="textSecondary" style={styles.progressText}>
            {data.weeklyMinutes} / {data.weeklyGoal} minutes
          </ThemedText>
        </View>
        
        <ThemedText variant="heading3" color="primary" style={styles.progressPercentage}>
          {Math.round(progressPercentage)}% Complete
        </ThemedText>
      </Card>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <Card key={index} variant="default" padding="large" style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
              <stat.icon color={stat.color} size={24} strokeWidth={2} />
            </View>
            <ThemedText variant="heading3" color="text" style={styles.statValue}>
              {stat.value}
            </ThemedText>
            <ThemedText variant="caption" color="textSecondary" style={styles.statLabel}>
              {stat.label}
            </ThemedText>
          </Card>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  goalCard: {
    marginBottom: Spacing.lg,
    backgroundColor: 'rgba(125, 211, 252, 0.05)',
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  goalTitle: {
    flex: 1,
  },
  progressContainer: {
    marginBottom: Spacing.md,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: Spacing.sm,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    textAlign: 'center',
  },
  progressPercentage: {
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    minHeight: 120,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  statValue: {
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  statLabel: {
    textAlign: 'center',
  },
});