import { globalStyles } from "../styles/globalStyles";
import { View, Text } from "react-native";
import { getSplitDate } from "../utils/getDate";

interface Props {
  titleText: string;
}

export function Background({ titleText }: Props) {
  const { month, day, year } = getSplitDate();

  return (
    <View style={globalStyles.backgroundContainer} pointerEvents="none">
      <Text style={globalStyles.backgroundTitle}>{titleText}</Text>
      <Text style={globalStyles.backgroundMonth}>{month}</Text>
      <Text style={globalStyles.backgroundDayYear}>
        {day} {year}
      </Text>
    </View>
  );
}
