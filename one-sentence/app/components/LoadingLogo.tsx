import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../styles/globalStyles";
import { Animated, Easing, useAnimatedValue } from "react-native";
import { useEffect } from "react";
import LogoInner from "../assets/images/ahme-inner-0B.svg";
import LogoOuter from "../assets/images/ahme-outer-0B.svg";

export function Loading2Spins() {
  // setTimeout 4000
  const logoOpacity = useAnimatedValue(0);
  const spinValue = useAnimatedValue(0);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }, 250);
    setTimeout(() => {
      Animated.timing(spinValue, {
        toValue: 0.5,
        duration: 1000,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }).start();
    }, 1500);
    setTimeout(() => {
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }).start(() => {
        spinValue.setValue(0);
      });
    }, 2500);
    setTimeout(() => {
      Animated.timing(logoOpacity, {
        toValue: 0,
        duration: 750,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }).start();
    }, 3500);
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[{ backgroundColor: "#0B1215" }, globalStyles.container]}
      >
        <Animated.View
          style={[globalStyles.container, { opacity: logoOpacity }]}
        >
          <Animated.View
            style={[
              globalStyles.logoBox,
              {
                transform: [{ rotate: spin }],
              },
            ]}
          >
            <LogoOuter />
          </Animated.View>
          <LogoInner style={globalStyles.logoInner} />
        </Animated.View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export function Loading1Spin() {
  // setTimeout 3000
  const logoOpacity = useAnimatedValue(0);
  const spinValue = useAnimatedValue(0);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }, 250);
    setTimeout(() => {
      Animated.timing(spinValue, {
        toValue: 0.5,
        duration: 1000,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }).start();
    }, 1500);
    setTimeout(() => {
      Animated.timing(logoOpacity, {
        toValue: 0,
        duration: 750,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }).start();
    }, 2500);
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[{ backgroundColor: "#0B1215" }, globalStyles.container]}
      >
        <Animated.View
          style={[globalStyles.container, { opacity: logoOpacity }]}
        >
          <Animated.View
            style={[
              globalStyles.logoBox,
              {
                transform: [{ rotate: spin }],
              },
            ]}
          >
            <LogoOuter />
          </Animated.View>
          <LogoInner style={globalStyles.logoInner} />
        </Animated.View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
