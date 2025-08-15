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
import { Ionicons } from "@expo/vector-icons";

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
  const [showDelete, setShowDelete] = useState<{ id: string; show: Boolean }[]>(
    []
  );

  useEffect(() => {
    const processData = async () => {
      try {
        const existingData = await getAllData();

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

        console.log(formattedData);
        setDATA(formattedData);
      } catch (error) {
        console.error("Error: " + error);
      }
    };
    processData();
  }, [content, date]);

  const receiveRemoveLog = async (id: string) => {
    await removeLog(id);
    setDATA((prevData) => prevData.filter((item) => item.id !== id));
  };

  const handleDelete = (id: string, date: string, content: string) => {
    console.log("item deleted:", id, date, content);
    receiveRemoveLog(id);
  };

  const handlePress = (id: string, date: string, content: string) => {
    console.log("item pressed:", id, date, content);
  };

  const handleLongPress = (id: string, date: string, content: string) => {
    console.log("item long pressed:", id, date, content);
  };

  const Item = ({ id, date, content, onPress }: ItemProps) => (
    /*     const [showDelete, setShowDelete] = useState(false);

    const handleLongPress = (thisId: string) => {
      console.log("item long pressed:", thisId);
      setShowDelete(true);
      const deleteAppears = setTimeout(() => {
        setShowDelete(false);
      }, 3000);
    }; */

    <Pressable
      onPress={() => handlePress(id, date, content)}
      onLongPress={() => handleLongPress(id, date, content)}
    >
      <View style={viewStyles.itemContainer}>
        <View style={viewStyles.inlineContainer}>
          <Text style={viewStyles.logDate}>{date}</Text>
          <Pressable
            style={viewStyles.deleteContainer}
            onPress={() => handleDelete(id, date, content)}
          >
            <Ionicons name="trash" size={17} color="#666" />
          </Pressable>
        </View>
        <Text style={viewStyles.logContent}>{content}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={viewStyles.viewContainer}>
      <Text style={globalStyles.title}>view logs</Text>
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
