import { useLocalSearchParams } from "expo-router";
import {
  Text,
  View,
  FlatList,
  Pressable,
  useAnimatedValue,
  Animated,
  Alert,
  TextInput,
  Easing,
} from "react-native";
import { viewStyles } from "./styles/viewStyles";
import {
  storeData,
  getAllData,
  removeLog,
  clearAllData,
} from "./utils/manageData";
import { useMemo, useEffect, useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import EditModal from "./components/EditModal";
import DeleteModal from "./components/DeleteModal";

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
  const [showMenu, setShowDelete] = useState<ShowProps[]>([]);
  const { content, date } = useLocalSearchParams();
  const trashTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const trashFadeAnim = useAnimatedValue(0);
  const [editVisible, setEditVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<LogProps | null>(null);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const fadeInAnim = useAnimatedValue(0);

  useEffect(() => {
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.bezier(0.17, 0.67, 0.83, 0.67),
      useNativeDriver: true,
    }).start();
  });

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
        console.log("DATA:", formattedData);

        setShowDelete(formattedData.map(({ id }) => ({ id, show: false })));
      } catch (error) {
        console.error("Error: " + error);
      }
    };
    processData();
  }, [content, date]);

  // Initialize showMenu for trash bin animation
  useEffect(() => {
    setShowDelete((prev) =>
      DATA.map(({ id }) => ({
        id,
        show: false,
      }))
    );
  }, [DATA]);

  const filteredSearchData = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const result = DATA.filter((item) => {
      return (item.content + " " + item.date).toLowerCase().includes(q);
    });
    console.log("result:", result);
    if (!q) return DATA;
    return result;
  }, [DATA, searchQuery]);

  const handleDelete = (id: string, date: string, content: string) => {
    console.log("delete pressed:", id);
    setSelectedItem({ id, date, content });
    setDeleteVisible(true);
  };

  const handleCancelDelete = () => {
    console.log("delete canceled");
    setSelectedItem(null);
    setDeleteVisible(false);
  };

  const handleActuallyDelete = async (id: string) => {
    setDATA((prevData) => prevData.filter((item) => item.id !== id));
    setSelectedItem(null);
    setDeleteVisible(false);
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

  const handleSubmitEdit = (id: string, newContent: string) => {
    setDATA((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, content: newContent } : item
      )
    );
    setEditVisible(false);
    setSelectedItem(null);
  };

  const handlePress = (id: string, date: string, content: string) => {
    console.log("item pressed:", id, date, content);
    console.log("temp:", showMenu);
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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const Item = ({ id, date, content }: ItemProps) => {
    const isMenuVisible =
      showMenu.find((item) => item.id === id)?.show ?? false;

    return (
      <Pressable
        onPress={() => handlePress(id, date, content)}
        onLongPress={() => handleLongPress(id, date, content)}
      >
        <View style={viewStyles.itemContainer}>
          <View style={{ flexDirection: "row" }}>
            <Text style={viewStyles.logDate}>{date}</Text>
            {isMenuVisible && (
              <Animated.View
                style={{ opacity: trashFadeAnim }}
                pointerEvents={isMenuVisible ? "auto" : "none"}
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
                    onPress={() => handleDelete(id, date, content)}
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
    <Animated.View style={[{ opacity: fadeInAnim }, viewStyles.viewContainer]}>
      <TextInput
        placeholder="looking for a specific log?"
        style={viewStyles.searchBar}
        onChangeText={(query) => handleSearch(query)}
      />
      <FlatList
        data={filteredSearchData}
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
      <DeleteModal
        visible={deleteVisible}
        item={selectedItem}
        onCancel={handleCancelDelete}
        onDelete={handleActuallyDelete}
      />
    </Animated.View>
  );
}

/* dev delete button
<TouchableOpacity
  style={globalStyles.devButton}
  onPress={receiveClearAllData}
>
  <Text>delete logs</Text>
</TouchableOpacity>
*/
