import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomProfil from "../../components/CustomProfil";
import globalStyles from "../../assets/syles generaux/globalStyle";

const PatientsDetails = ({ route }) => {
  const patient = route.params;
  return (
    <View style={[globalStyles.container, styles.container]}>
      <CustomProfil
        nom={patient.nom}
        prenom={patient.prenom}
        email={patient.adresseEmail}
      />
    </View>
  );
};

export default PatientsDetails;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    marginTop: 20,
  },
});
