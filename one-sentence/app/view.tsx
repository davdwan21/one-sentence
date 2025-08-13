import { useLocalSearchParams } from "expo-router";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { globalStyles } from "./styles/globalStyles";
import { viewStyles } from "./styles/viewStyles";
import {
  storeData,
  getAllData,
  clearAllData,
  removeLog,
} from "./utils/manageData";
import { useEffect, useState } from "react";

interface ItemProps {
  id: string;
  date: string;
  content: string;
  onPress: (id: string, date: string, content: string) => void;
  onLongPress: (id: string, date: string, content: string) => void;
}

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

  const receiveRemoveLog = async (id: string) => {
    await removeLog(id);
    setDATA((prevData) => prevData.filter((item) => item.id !== id));
  };

  const handlePress = (id: string, date: string, content: string) => {
    console.log("item pressed:", id, date, content);
  };

  const handleLongPress = (id: string, date: string, content: string) => {
    console.log("item long pressed:", id, date, content);
    receiveRemoveLog(id);
  };

  const Item = ({ id, date, content, onPress, onLongPress }: ItemProps) => (
    <Pressable
      onPress={() => handlePress(id, date, content)}
      onLongPress={() => handleLongPress(id, date, content)}
    >
      <View style={viewStyles.itemContainer}>
        <Text style={viewStyles.logDate}>{date}</Text>
        <Text style={viewStyles.logContent}>{content}</Text>
      </View>
    </Pressable>
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
          <Item
            id={item.id}
            date={item.date}
            content={item.content}
            onPress={handlePress}
            onLongPress={handleLongPress}
          />
        )}
        keyExtractor={(item) => item.id}
        style={viewStyles.listContainer}
      />
    </View>
  );
}
