import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/hooks/useTheme';

const { width } = Dimensions.get('window');
const CIRCLE_SIZE = width * 0.6;

interface BreathingAnimationProps {
  isActive: boolean;
  phase: 'inhale' | 'hold' | 'exhale' | 'pause';
  duration: number;
}

export function BreathingAnimation({ isActive, phase, duration }: BreathingAnimationProps) {
  const { colors } = useTheme();
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0.6);

  useEffect(() => {
    if (isActive) {
      const animationDuration = duration * 1000;
      
      if (phase === 'inhale') {
        scale.value = withTiming(1.2, {
          duration: animationDuration,
          easing: Easing.inOut(Easing.ease),
        });
        opacity.value = withTiming(0.9, {
          duration: animationDuration,
          easing: Easing.inOut(Easing.ease),
        });
      } else if (phase === 'exhale') {
        scale.value = withTiming(0.8, {
          duration: animationDuration,
          easing: Easing.inOut(Easing.ease),
        });
        opacity.value = withTiming(0.6, {
          duration: animationDuration,
          easing: Easing.inOut(Easing.ease),
        });
      }
    } else {
      scale.value = withTiming(0.8, { duration: 500 });
      opacity.value = withTiming(0.6, { duration: 500 });
    }
  }, [isActive, phase, duration, scale, opacity]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const pulseStyle = useAnimatedStyle(() => {
    const pulseScale = interpolate(scale.value, [0.8, 1.2], [1, 1.1]);
    return {
      transform: [{ scale: pulseScale }],
    };
  });

  return (
    <View style={styles.container}>
      {/* Outer pulse ring */}
      <Animated.View style={[styles.pulseRing, pulseStyle]}>
        <View style={[styles.ring, { borderColor: colors.primary + '30' }]} />
      </Animated.View>
      
      {/* Main breathing circle */}
      <Animated.View style={[styles.circle, animatedStyle]}>
        <LinearGradient
          colors={[colors.primary + 'AA', colors.accent + 'AA']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>
      
      {/* Inner glow */}
      <View style={[styles.innerGlow, { backgroundColor: colors.primary + '20' }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  circle: {
    width: CIRCLE_SIZE * 0.8,
    height: CIRCLE_SIZE * 0.8,
    borderRadius: (CIRCLE_SIZE * 0.8) / 2,
    overflow: 'hidden',
    position: 'absolute',
  },
  gradient: {
    flex: 1,
    borderRadius: (CIRCLE_SIZE * 0.8) / 2,
  },
  pulseRing: {
    position: 'absolute',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    width: CIRCLE_SIZE * 0.9,
    height: CIRCLE_SIZE * 0.9,
    borderRadius: (CIRCLE_SIZE * 0.9) / 2,
    borderWidth: 2,
  },
  innerGlow: {
    position: 'absolute',
    width: CIRCLE_SIZE * 0.6,
    height: CIRCLE_SIZE * 0.6,
    borderRadius: (CIRCLE_SIZE * 0.6) / 2,
  },
});