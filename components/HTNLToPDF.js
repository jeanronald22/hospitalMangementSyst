import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import { Button } from "react-native-paper";

const HTNLToPDF = () => {
  const createPDF = async () => {
    const options = {
      html: `
      <h1>Hello World</h1>`,
      fileName: "exeample",
      directory: "Documents",
    };
    const file = await RNHTMLtoPDF.convert(options);
    console.log(`PDF created at : ${file.filePath}`);
  };
  const requestPermission = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Permission to save PDF",
          message: "App needs access to save PDF",
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      return true;
    }
  };
  return (
    <View>
      <Text>HTNLToPDF</Text>
      <Button
        onPress={async () => {
          const hasPermission = await requestPermission();
          if (hasPermission) {
            createPDF();
          } else {
            console.log("Permission denied");
          }
          // createPDF();
        }}
      >
        Genrate PDF
      </Button>
    </View>
  );
};

export default HTNLToPDF;

const styles = StyleSheet.create({});
