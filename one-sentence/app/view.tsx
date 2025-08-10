import { useLocalSearchParams } from "expo-router";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { globalStyles } from "./styles/globalStyles";
import { viewStyles } from "./styles/viewStyles";
import { storeData, getAllData, clearAllData } from "./utils/manageData";
import { useEffect, useState } from "react";

export default function viewScreen() {
  const [DATA, setDATA] = useState<
    { id: string; date: string; content: string }[]
  >([]);
  const { content, date } = useLocalSearchParams();

  useEffect(() => {
    const processData = async () => {
      try {
        const existingData = await getAllData();
        // console.log(existingData);

        const newLogId = (existingData && existingData.length) || 0;
        const thisLog = {
          id: String(newLogId),
          date: date,
          content: content,
        };

        await storeData(thisLog);
        const allData = await getAllData();

        const formattedData = allData!
          .map(([key, value]) => {
            const parsedValue = JSON.parse(value!);
            return { ...parsedValue };
          })
          .sort((a, b) => parseInt(b.id) - parseInt(a.id));

        setDATA(formattedData);
      } catch (error) {
        console.error("Error: " + error);
      }
    };
    processData();
  }, [content, date]);

  const receiveClearAllData = async () => {
    await clearAllData();
    setDATA([]);
  };

  const Item = ({ date, content }: { date: string; content: string }) => (
    <View style={viewStyles.itemContainer}>
      <Text style={viewStyles.logDate}>{date}</Text>
      <Text style={viewStyles.logContent}>{content}</Text>
    </View>
  );

  return (
    <View style={viewStyles.viewContainer}>
      <Text style={globalStyles.title}>view logs</Text>
      <TouchableOpacity
        style={[{ transform: [{ translateY: 100 }] }, globalStyles.devButton]}
        onPress={receiveClearAllData}
      >
        <Text>delete data</Text>
      </TouchableOpacity>
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
