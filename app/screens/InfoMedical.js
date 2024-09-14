import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import globalStyles from "../../assets/syles generaux/globalStyle";
import { colors } from "../../assets/colors/colors";
import CustomHeader from "../../components/CustomHeader";
import { Card, FAB } from "react-native-paper";

const InfoMedical = ({ route, navigation }) => {
  const patient = route.params;
  // definition des fonction
  useEffect(() => {}, [patient]);
  return (
    <View
      style={[globalStyles.container, { backgroundColor: colors.bleuClaire }]}
    >
      <CustomHeader title={"Infrmations Médical"} />
      <View style={[globalStyles.contain, { height: "100%" }]}>
        <Card style={{ backgroundColor: colors.grisClair }}>
          <Card.Title title={`Poids: ${patient.poids} Kgs`} />
          <Card.Title title={`Pouls: ${patient.pouls} `} />
          <Card.Title title={`Taille: ${patient.taille} Cm`} />
          <Card.Title
            title={`Tension arterielle: ${patient.tension_art} mmH`}
          />
          <Card.Title title={`Alergies: ${patient.dossier.alergies} `} />
          <Card.Title
            title={`Antécedents Médicaux: : ${patient.dossier.antecedentsMedicaux} `}
          />
          <Card.Title
            title={`Groupe sanguin:${patient.dossier.groupeSanguin} `}
          />
          <Card.Title
            title={`Groupe sanguin: ${patient.dossier.groupeSanguin} `}
          />
          <Card.Title
            title={`Médicaments en cours: ${patient.dossier.medicamentEncoure} `}
          />
        </Card>
        <FAB
          label="Modifer"
          style={{ marginTop: 20, backgroundColor: colors.bleuClaire }}
          color={colors.white}
          onPress={() => navigation.navigate("Modfier Info Medical", patient)}
        />
      </View>
    </View>
  );
};

export default InfoMedical;

const styles = StyleSheet.create({});
