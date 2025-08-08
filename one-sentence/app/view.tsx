import { useLocalSearchParams } from "expo-router";
import { Text, View, FlatList } from "react-native";
import { globalStyles } from "./styles/globalStyles";
import { viewStyles } from "./styles/viewStyles";

export default function viewScreen() {
  // const { userInput, date } = useLocalSearchParams();

  // Test data
  const DATA = [
    {
      id: "1",
      date: "AUG 06 2025",
      content: "hi there! just testing the flatlist",
    },
    {
      id: "2",
      date: "AUG 05 2025",
      content: "another entry. what's going on recently?",
    },
  ];

  const Item = ({ date, content }: { date: string; content: string }) => (
    <View style={viewStyles.itemContainer}>
      <Text style={viewStyles.logDate}>{date}</Text>
      <Text style={viewStyles.logContent}>{content}</Text>
    </View>
  );

  return (
    <View style={viewStyles.viewContainer}>
      <Text style={globalStyles.title}>view logs</Text>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Item date={item.date} content={item.content} />
        )}
        keyExtractor={(item) => item.id}
        style={viewStyles.listContainer}
      />
    </View>
  );
}
