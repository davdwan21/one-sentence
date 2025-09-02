// DeleteModal: only need the id of the log
// delete and cancel button

import { Modal, Text, Touchable, TouchableOpacity, View } from "react-native";
import { modalStyles } from "../styles/modalStyles";
import { removeLog } from "../utils/manageData";

interface LogProps {
  id: string;
  date: string;
  content: string;
}

interface Props {
  visible: boolean;
  item: LogProps | null;
  onCancel: () => void;
  onDelete: (id: string) => void;
}

export default function DeleteModal({
  visible,
  item,
  onCancel,
  onDelete,
}: Props) {
  const itemId = item?.id ?? "";
  const itemDate = item?.date ?? "";
  const itemContent = item?.content ?? "";

  const handleDelete = async () => {
    await removeLog(itemId);
    onDelete(itemId);
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={modalStyles.modalContainer}>
        <View style={modalStyles.modalContent}>
          <Text style={modalStyles.modalText}>delete log?</Text>
          <View style={modalStyles.viewLogInModal}>
            <Text style={modalStyles.logDate}>{itemDate}</Text>
            <Text style={modalStyles.logContent}>{itemContent}</Text>
          </View>
          <View style={modalStyles.inlineContainer}>
            <TouchableOpacity
              onPress={onCancel}
              style={modalStyles.closeModalButton}
            >
              <Text style={{ color: "#448df4", fontSize: 16 }}>cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDelete}
              style={[modalStyles.closeModalButton, { marginLeft: 50 }]}
            >
              <Text style={{ color: "#ff443b", fontSize: 16 }}>delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
