import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import globalStyles from "../../assets/syles generaux/globalStyle";
import { colors } from "../../assets/colors/colors";
import CustomHeader from "../../components/CustomHeader";
import { getPatientById } from "../../api/dataService";
import CustomEmtyView from "../../components/EmptyView";
import HTNLToPDF from "../../components/HTNLToPDF";

const Note = ({ route, navigation }) => {
  const id = route.params.id;
  const [patient, setPatient] = useState([]);
  // ! definition des fonction
  useEffect(() => {
    fetch();
    console.log(patient);

    return () => {};
  }, []);

  const fetch = async () => {
    try {
      const response = await getPatientById(id);
      setPatient(response);
    } catch (error) {
      console.log("Erreur,", error);
    }
  };
  return (
    <View
      style={[globalStyles.container, { backgroundColor: colors.bleuClaire }]}
    >
      <CustomHeader title={"Notes"} />
      <View style={[globalStyles.contain, { height: "100%" }]}>
        <View>
          <CustomEmtyView title={"Aucune Note"} />
          <HTNLToPDF />
        </View>
      </View>
    </View>
  );
};

export default Note;

const styles = StyleSheet.create({});
