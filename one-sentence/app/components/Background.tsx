import { globalStyles } from "../styles/globalStyles";
import { View, Text } from "react-native";
import { getSplitDate } from "../utils/getDate";

export function Background() {
  const { month, day, year } = getSplitDate();

  return (
    <View style={globalStyles.backgroundContainer}>
      <Text style={globalStyles.backgroundMonth}>{month}</Text>
      <Text style={globalStyles.backgroundDayYear}>
        {day} {year}
      </Text>
    </View>
  );
}
