import { StyleSheet } from "react-native";

export const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: 500,
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
    borderRadius: 5,
    padding: 15,
  },
  modalText: {
    color: "#ffffff",
    fontSize: 18,
  },
  inlineContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: -10,
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
  logDate: {
    fontSize: 14,
    marginBottom: 8,
    color: "#aaa",
  },
  logContent: {
    fontSize: 16,
    color: "#eee",
  },
  viewLogInModal: {
    marginTop: 15,
    padding: 15,
    flexDirection: "column",
    width: "90%",
    borderBottomWidth: 1,
    borderBottomColor: "#444",
    borderTopWidth: 1,
    borderTopColor: "#444",
  },
});
