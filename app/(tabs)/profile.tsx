import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Card } from '@/components/Card';
import { GradientBackground } from '@/components/GradientBackground';
import { useTheme } from '@/hooks/useTheme';
import { Spacing } from '@/constants/Spacing';
import { User, ChartBar as BarChart3, Settings, Globe, Palette, Bell, Crown, CircleHelp as HelpCircle, Info, LogOut, ChevronRight } from 'lucide-react-native';

export default function ProfileScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const menuItems = [
    {
      id: 'statistics',
      title: t('profile.statistics'),
      icon: BarChart3,
      color: colors.primary,
    },
    {
      id: 'settings',
      title: t('profile.settings'),
      icon: Settings,
      color: colors.textSecondary,
    },
    {
      id: 'language',
      title: t('profile.language'),
      icon: Globe,
      color: colors.accent,
    },
    {
      id: 'theme',
      title: t('profile.theme'),
      icon: Palette,
      color: colors.secondary,
    },
    {
      id: 'notifications',
      title: t('profile.notifications'),
      icon: Bell,
      color: colors.warning,
    },
    {
      id: 'premium',
      title: t('profile.premium'),
      icon: Crown,
      color: colors.warning,
      premium: true,
    },
    {
      id: 'support',
      title: t('profile.support'),
      icon: HelpCircle,
      color: colors.textSecondary,
    },
    {
      id: 'about',
      title: t('profile.about'),
      icon: Info,
      color: colors.textSecondary,
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
            <View style={styles.avatarContainer}>
              <User color="white" size={40} strokeWidth={2} />
            </View>
            <ThemedText variant="heading2" style={styles.userName}>
              Welcome Back
            </ThemedText>
            <ThemedText variant="body" style={styles.userEmail}>
              user@example.com
            </ThemedText>
          </View>
        </GradientBackground>

        {/* Stats Overview */}
        <View style={styles.section}>
          <View style={styles.statsContainer}>
            <Card variant="default" padding="large" style={styles.statCard}>
              <ThemedText variant="heading2" color="primary" style={styles.statNumber}>
                7
              </ThemedText>
              <ThemedText variant="caption" color="textSecondary" style={styles.statLabel}>
                Day Streak
              </ThemedText>
            </Card>
            
            <Card variant="default" padding="large" style={styles.statCard}>
              <ThemedText variant="heading2" color="accent" style={styles.statNumber}>
                45
              </ThemedText>
              <ThemedText variant="caption" color="textSecondary" style={styles.statLabel}>
                Minutes This Week
              </ThemedText>
            </Card>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.section}>
          {menuItems.map((item) => (
            <Card
              key={item.id}
              variant="default"
              padding="large"
              pressable
              onPress={() => {
                console.log('Navigate to:', item.id);
              }}
              style={styles.menuItem}
            >
              <View style={styles.menuItemContent}>
                <View style={styles.menuItemLeft}>
                  <View style={[styles.menuItemIcon, { backgroundColor: item.color + '20' }]}>
                    <item.icon color={item.color} size={20} strokeWidth={2} />
                  </View>
                  <ThemedText variant="body" weight="medium" style={styles.menuItemTitle}>
                    {item.title}
                  </ThemedText>
                  {item.premium && (
                    <View style={styles.premiumBadge}>
                      <Crown color={colors.warning} size={12} strokeWidth={2} />
                    </View>
                  )}
                </View>
                <ChevronRight color={colors.textMuted} size={20} strokeWidth={2} />
              </View>
            </Card>
          ))}
        </View>

        {/* Sign Out */}
        <View style={styles.section}>
          <Card
            variant="outlined"
            padding="large"
            pressable
            onPress={() => {
              console.log('Sign out');
            }}
            style={styles.signOutButton}
          >
            <View style={styles.signOutContent}>
              <LogOut color={colors.error} size={20} strokeWidth={2} />
              <ThemedText variant="body" color="error" weight="medium">
                {t('profile.signOut')}
              </ThemedText>
            </View>
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
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  userName: {
    marginBottom: Spacing.xs,
    color: 'white',
    textAlign: 'center',
  },
  userEmail: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    marginBottom: Spacing.xs,
  },
  statLabel: {
    textAlign: 'center',
  },
  menuItem: {
    marginBottom: Spacing.sm,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  menuItemTitle: {
    flex: 1,
  },
  premiumBadge: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderRadius: 12,
    padding: 4,
    marginLeft: Spacing.sm,
  },
  signOutButton: {
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  signOutContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
});