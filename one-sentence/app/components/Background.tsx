import { globalStyles } from "../styles/globalStyles";
import { View, Text, Animated } from "react-native";
import { getSplitDate } from "../utils/getDate";

interface Props {
  titleText: string;
  titleOpacity: Animated.Value;
}

export function Background({ titleText, titleOpacity }: Props) {
  const { month, day, year } = getSplitDate();

  return (
    <View style={globalStyles.backgroundContainer} pointerEvents="none">
      <Animated.View style={{ opacity: titleOpacity }}>
        <Text style={globalStyles.backgroundTitle}>{titleText}</Text>
      </Animated.View>
      <Text style={globalStyles.backgroundMonth}>{month}</Text>
      <Text style={globalStyles.backgroundDayYear}>
        {day} {year}
      </Text>
    </View>
  );
}
