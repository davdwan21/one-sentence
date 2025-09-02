import { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, TextInput } from "react-native";
import { storeData } from "../utils/manageData";
import { modalStyles } from "../styles/modalStyles";

interface LogProps {
  id: string;
  date: string;
  content: string;
}

interface Props {
  visible: boolean;
  item: LogProps | null;
  onCancel: () => void;
  onSubmit: (id: string, content: string) => void;
}

export default function EditModal({
  visible,
  item,
  onCancel,
  onSubmit,
}: Props) {
  const [content, setContent] = useState(item?.content ?? "");
  const date = item?.date ?? "";
  const itemId = item?.id ?? "";

  useEffect(() => {
    setContent(item?.content ?? "");
  }, [item, visible]);

  const handleConfirmEdit = async () => {
    const edittedLog = {
      id: itemId,
      date: date,
      content: content,
    };
    await storeData(edittedLog);
    onSubmit(itemId, content);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={modalStyles.modalContainer}>
        <View style={modalStyles.modalContent}>
          <Text style={modalStyles.modalText}>editing log...</Text>
          <TextInput
            style={modalStyles.editInput}
            value={content}
            onChangeText={setContent}
            multiline={true}
          />

          <View style={modalStyles.inlineContainer}>
            <TouchableOpacity
              onPress={onCancel}
              style={modalStyles.closeModalButton}
            >
              <Text style={{ color: "#ff443b", fontSize: 16 }}>cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleConfirmEdit}
              style={[modalStyles.closeModalButton, { marginLeft: 50 }]}
            >
              <Text style={{ color: "#448df4", fontSize: 16 }}>submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
