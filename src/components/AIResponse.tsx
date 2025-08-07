import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useThemeStore } from '../utils/theme';

const AIResponse = ({ score, explanation, slideAnim }) => {
  const colors = useThemeStore((state) => state.getColors());

  return (
    <Animated.View style={[styles.container, { backgroundColor: colors.surface, transform: [{ translateY: slideAnim }] }]}>
      <Text style={[styles.title, { color: colors.primary }]}>Startup Evaluation</Text>
      <Text style={[styles.score, { color: colors.text }]}>Score: {score}/100</Text>
      <Text style={[styles.explanation, { color: colors.text }]}>{explanation}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  score: {
    fontSize: 16,
    marginBottom: 4,
  },
  explanation: {
    fontSize: 14,
  },
});

export default AIResponse;
