import { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

interface LogProps {
  id: string;
  date: string;
  content: string;
}

interface Props {
  visible: boolean;
  item: LogProps | null;
  onCancel: () => void;
  onSubmit: () => void;
}

export default function EditModal({
  visible,
  item,
  onCancel,
  onSubmit,
}: Props) {
  const [date, setDate] = useState(item?.date ?? "");
  const [content, setContent] = useState(item?.content ?? "");

  useEffect(() => {
    setDate(item?.date ?? "");
    setContent(item?.content ?? "");
  }, [item, visible]);

  let itemId = item?.id ?? "";

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={editStyles.modalContainer}>
        <View style={editStyles.modalContent}>
          <Text style={editStyles.testText}>
            edit menu for {itemId}, {date}, {content}
          </Text>
          <TextInput
            style={editStyles.editInput}
            value={content}
            onChangeText={setContent}
            multiline={true}
          />

          <View style={editStyles.inlineContainer}>
            <TouchableOpacity
              onPress={onCancel}
              style={[editStyles.closeModalButton, { marginRight: 25 }]}
            >
              <Text style={{ color: "#ff443b" }}>cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onSubmit}
              style={[editStyles.closeModalButton, { marginLeft: 25 }]}
            >
              <Text style={{ color: "#448df4" }}>submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export const editStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#272727",
  },
  closeModalButton: {
    backgroundColor: "transparent",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    borderColor: "red",
    borderWidth: 1,
  },
  testText: {
    color: "#ffffff",
    fontSize: 18,
  },
  inlineContainer: {
    flexDirection: "row",
  },
  editInput: {
    width: "90%",
    height: 80,
    borderColor: "#888",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    color: "#E0E0E0",
    fontSize: 16,
    padding: 12,
    marginTop: 20,
  },
});
