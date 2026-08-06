/**
 * Trigger a haptic feedback pattern using the Vibration API.
 * Defaults to a short 10ms pulse for standard UI interactions.
 */
export const triggerHaptic = (pattern: number | number[] = 10) => {
  if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
    try {
      window.navigator.vibrate(pattern);
    } catch (e) {
      // Ignore vibration errors on browsers that don't support it or if it's disabled
    }
  }
};

export const hapticTap = () => triggerHaptic(10);
export const hapticMedium = () => triggerHaptic(18);
export const hapticHeavy = () => triggerHaptic(28);
export const hapticSuccess = () => triggerHaptic([12, 40, 15]);
export const hapticLongPress = () => triggerHaptic([35, 25, 35]);

