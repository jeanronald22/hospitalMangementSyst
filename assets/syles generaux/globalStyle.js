import { StyleSheet } from "react-native";
import { colors } from "../colors/colors";

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    // padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.blueFonce,
    fontFamily: "Roboto_700Bold",
  },
  header1: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.bleuClaire,
    marginBottom: 16,
    fontFamily: "Roboto_700Bold",
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "500",
    color: "#357ABD",
    marginBottom: 8,
    fontFamily: "Roboto_500Medium",
  },
  text: {
    fontSize: 16,
    fontWeight: "400",
    color: "#2A3E50",
    fontFamily: "Roboto_400Regular",
  },
  secondaryText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#B0B0B0",
    fontFamily: "Roboto_400Regular",
  },
  button: {
    backgroundColor: "#4A90E2",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#4A90E2",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
    fontFamily: "Roboto_500Medium",
  },
  input: {
    height: 40,
    borderColor: "#B0B0B0",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
    fontFamily: "Roboto_400Regular",
  },
  btn: {
    backgroundColor: colors.bleuMoyen,
    borderRadius: 10,
  },
});

export default globalStyles;
