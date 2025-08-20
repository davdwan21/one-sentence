import { useLocalSearchParams } from "expo-router";
import {
  Text,
  View,
  FlatList,
  Pressable,
  TouchableOpacity,
  useAnimatedValue,
  Animated,
  Alert,
} from "react-native";
import { globalStyles } from "./styles/globalStyles";
import { viewStyles } from "./styles/viewStyles";
import {
  storeData,
  getAllData,
  removeLog,
  clearAllData,
} from "./utils/manageData";
import { useEffect, useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import editModal from "./components/EditModal";
import EditModal from "./components/EditModal";

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
  const trashTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const trashFadeAnim = useAnimatedValue(0);
  const [editVisible, setEditVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<LogProps | null>(null);

  // Store formatted data into DATA
  useEffect(() => {
    const processData = async () => {
      try {
        const newLogId = Date.now();

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
        console.log(formattedData);

        setShowDelete(formattedData.map(({ id }) => ({ id, show: false })));
      } catch (error) {
        console.error("Error: " + error);
      }
    };
    processData();
  }, [content, date]);

  // Initialize showDelete for trash bin animation
  useEffect(() => {
    setShowDelete((prev) =>
      DATA.map(({ id }) => ({
        id,
        show: false,
      }))
    );
  }, [DATA]);

  const confirmDelete = (id: string) => {
    Alert.alert(
      "Delete log?",
      "This action can't be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => actuallyDelete(id),
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const actuallyDelete = async (id: string) => {
    await removeLog(id);
    setDATA((prevData) => prevData.filter((item) => item.id !== id));
  };

  const handleEdit = (id: string, date: string, content: string) => {
    console.log("edit pressed:", id, date, content);
    setSelectedItem({ id, date, content });
    setEditVisible(true);
  };

  const handleCancelEdit = () => {
    console.log("edit should cancel");
    setEditVisible(false);
    setSelectedItem(null);
  };

  const handleSubmitEdit = () => {
    console.log("edit should submit");
    setEditVisible(false);
    setSelectedItem(null);
  };

  const handlePress = (id: string, date: string, content: string) => {
    console.log("item pressed:", id, date, content);
    console.log("temp:", showDelete);
  };

  const receiveClearAllData = async () => {
    await clearAllData();
    setDATA([]);
    console.log("receiveClearAllData success");
  };

  const handleLongPress = (id: string, date: string, content: string) => {
    console.log("long pressed:", id, date, content);

    if (trashTimeout.current) {
      clearTimeout(trashTimeout.current);
      trashFadeAnim.stopAnimation();
      Animated.timing(trashFadeAnim, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }).start();
    }

    Animated.timing(trashFadeAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
    setShowDelete((prev) =>
      prev.map((item) =>
        item.id === id
          ? { id: item.id, show: true }
          : { id: item.id, show: false }
      )
    );
    trashTimeout.current = setTimeout(() => {
      Animated.timing(trashFadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start(() => {
        setShowDelete((prev) =>
          prev.map((item) => ({ id: item.id, show: false }))
        );
      });
      trashTimeout.current = null;
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
          <View style={{ flexDirection: "row" }}>
            <Text style={viewStyles.logDate}>{date}</Text>
            {isDeleteVisible && (
              <Animated.View
                style={{ opacity: trashFadeAnim }}
                pointerEvents={isDeleteVisible ? "auto" : "none"}
              >
                <View style={viewStyles.menuInlineContainer}>
                  <Pressable
                    style={viewStyles.menuItemContainer}
                    onPress={() => handleEdit(id, date, content)}
                  >
                    <Ionicons name="pencil" size={17} color="#666" />
                  </Pressable>
                  <Pressable
                    style={viewStyles.menuItemContainer}
                    onPress={() => confirmDelete(id)}
                  >
                    <Ionicons name="trash" size={17} color="#666" />
                  </Pressable>
                </View>
              </Animated.View>
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
      <TouchableOpacity
        style={globalStyles.devButton}
        onPress={receiveClearAllData}
      >
        <Text>delete logs</Text>
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
      <EditModal
        visible={editVisible}
        item={selectedItem}
        onCancel={handleCancelEdit}
        onSubmit={handleSubmitEdit}
      />
    </View>
  );
}
