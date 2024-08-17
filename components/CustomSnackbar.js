import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Snackbar, IconButton } from "react-native-paper";
import { colors } from "../assets/colors/colors";

const CustomSnackbar = ({ visible, onDismiss, message }) => {
  return (
    <View style={styles.container}>
      <Snackbar
        visible={visible}
        onDismiss={onDismiss}
        duration={Snackbar.DURATION_SHORT}
        style={styles.snackbar}
      >
        <View style={styles.snackbarContent}>
          <Text style={styles.message}>{message}</Text>
          <IconButton
            icon="close"
            color={colors.white}
            size={30}
            onPress={onDismiss}
            style={styles.closeButton}
          />
        </View>
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // Aligne le Snackbar en haut
    alignItems: "flex-end", // Aligne le Snackbar à droite
    padding: 16,
    // backgroundColor: "red",
    // position: "relative",
  },
  snackbar: {
    marginTop: 200, // Marge au-dessus du Snackbar pour éviter qu'il ne soit collé en haut
    marginRight: 16, // Marge à droite
    backgroundColor: colors.white, // Couleur de fond du Snackbar
    height: 50,
    alignItems: "center",
  },
  snackbarContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  message: {
    color: colors.bleuClaire, // Couleur du texte
    flex: 1,
  },
  closeButton: {
    marginLeft: 8,
  },
});
export default CustomSnackbar;
