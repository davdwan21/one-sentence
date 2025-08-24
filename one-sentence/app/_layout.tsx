import { Text, View, useAnimatedValue, Animated, Easing } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Slot } from "expo-router";
import { globalStyles } from "./styles/globalStyles";
import { getSplitDate } from "./utils/getDate";
import { use, useEffect, useState } from "react";
import LogoInner from "./images/ahme-inner-2.svg";
import LogoOuter from "./images/ahme-outer.svg";

export default function RootLayout() {
  const { month, day, year } = getSplitDate();
  const [isLoading, setIsLoading] = useState(true);
  const logoOpacity = useAnimatedValue(1);
  const spinValue = useAnimatedValue(0);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4250);

    setTimeout(() => {
      Animated.timing(spinValue, {
        toValue: 0.5,
        duration: 1000,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }).start();
    }, 500);
    setTimeout(() => {
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }).start(() => {
        spinValue.setValue(0);
      });
    }, 1500);
    setTimeout(() => {
      Animated.timing(spinValue, {
        toValue: 0.5,
        duration: 1000,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }).start();
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

  if (isLoading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView
          style={[{ backgroundColor: "#222" }, globalStyles.container]}
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

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[{ backgroundColor: "#222" }, globalStyles.container]}
      >
        <Text style={globalStyles.backgroundMonth}>{month}</Text>
        <Text style={globalStyles.backgroundDayYear}>
          {day} {year}
        </Text>
        <Slot />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

/* loading screen dots
        <View style={globalStyles.inlineContainer}>
          <View style={globalStyles.testParallelogram} />
          <View style={globalStyles.testParallelogram} />
          <View style={globalStyles.testParallelogram} />
        </View>
        */
