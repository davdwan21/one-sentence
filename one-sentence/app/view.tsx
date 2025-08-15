import { useLocalSearchParams } from "expo-router";
import { Text, View, FlatList, Pressable } from "react-native";
import { globalStyles } from "./styles/globalStyles";
import { viewStyles } from "./styles/viewStyles";
import { storeData, getAllData, removeLog } from "./utils/manageData";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

interface ItemProps {
  id: string;
  date: string;
  content: string;
  onPress: (id: string, date: string, content: string) => void;
  onLongPress: (id: string, date: string, content: string) => void;
}

interface LogProps {
  id: string;
  date: string;
  content: string;
}

interface ShowProps {
  id: string;
  show: boolean;
}

export default function viewScreen() {
  const [DATA, setDATA] = useState<LogProps[]>([]);
  const [showDelete, setShowDelete] = useState<ShowProps[]>([]);
  const { content, date } = useLocalSearchParams();

  useEffect(() => {
    const processData = async () => {
      try {
        const existingData = await getAllData();
        const newLogId = Date.now().toLocaleString();

        const thisLog = {
          id: String(newLogId),
          date: date,
          content: content,
        };

        await storeData(thisLog);

        const allData = await getAllData();

        const formattedData = allData!
          .map(([_, value]) => {
            const parsedValue = JSON.parse(value!);
            return { ...parsedValue };
          })
          .sort((a, b) => parseInt(b.id) - parseInt(a.id));

        setDATA(formattedData);

        setShowDelete(formattedData.map(({ id }) => ({ id, show: false })));
      } catch (error) {
        console.error("Error: " + error);
      }
    };
    processData();
  }, [content, date]);

  useEffect(() => {
    setShowDelete((prev) =>
      DATA.map(({ id }) => ({
        id,
        show: false,
      }))
    );
  }, [DATA]);

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
    console.log("temp:", showDelete);
  };

  const handleLongPress = (id: string, date: string, content: string) => {
    setShowDelete((prev) =>
      prev.map((item) =>
        item.id === id
          ? { id: item.id, show: true }
          : { id: item.id, show: false }
      )
    );
    setTimeout(() => {
      setShowDelete((prev) =>
        prev.map((item) => ({ id: item.id, show: false }))
      );
    }, 2000);
  };

  const Item = ({ id, date, content }: ItemProps) => {
    const isDeleteVisible =
      showDelete.find((item) => item.id === id)?.show ?? false;

    return (
      <Pressable
        onPress={() => handlePress(id, date, content)}
        onLongPress={() => handleLongPress(id, date, content)}
      >
        <View style={viewStyles.itemContainer}>
          <View style={viewStyles.inlineContainer}>
            <Text style={viewStyles.logDate}>{date}</Text>
            {isDeleteVisible && (
              <Pressable
                style={viewStyles.deleteContainer}
                onPress={() => handleDelete(id, date, content)}
              >
                <Ionicons name="trash" size={17} color="#666" />
              </Pressable>
            )}
          </View>
          <Text style={viewStyles.logContent}>{content}</Text>
        </View>
      </Pressable>
    );
  };

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
