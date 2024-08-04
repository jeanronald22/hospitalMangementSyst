import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React from "react";
import globalStyles from "../assets/syles generaux/globalStyle";

const CustomModal = ({ visible, onClose, message, image }) => {
  return (
    <Modal transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {image && (
            <Image
              source={require("../assets/images/Feeling sorry-rafiki.png")}
              style={styles.image}
            />
          )}
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity
            style={[globalStyles.button, { width: "70%" }]}
            onPress={onClose}
          >
            <Text style={globalStyles.buttonText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent pour l'arrière-plan du modal
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
});
