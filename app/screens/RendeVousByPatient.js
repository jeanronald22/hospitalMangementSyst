import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  getPatientById,
  getRendezVousByPatientId,
} from "../../api/dataService";
import CustomEmtyView from "../../components/EmptyView";
import globalStyles from "../../assets/syles generaux/globalStyle";
import { colors } from "../../assets/colors/colors";
import CustomHeader from "../../components/CustomHeader";
import { Card, FAB } from "react-native-paper";
import { format } from "date-fns";

const RendeVousByPatient = ({ route, navigation }) => {
  const patient = route.params;
  // ! DEFINITION DES STATES
  const [rendezVous, setRendezVous] = useState([]);

  // ! DEFINITION DES FONCTION
  // TODO : Récupérer les rendez-vous du patient
  const fetch = async () => {
    try {
      const response = await getRendezVousByPatientId(patient.id);
      setRendezVous(response);
    } catch (error) {
      console.log("Erruer lors de la recuperation des rendez vous", error);
    }
  };
  // navigation
  const navigations = (route) => {
    navigation.navigate(route, patient.id);
  };
  // definition du renderItem
  const renderItem = ({ item }) => {
    const date = new Date(item.date_heure);
    return (
      <Card style={{ marginVertical: 10, backgroundColor: colors.grisClair }}>
        <Card.Title
          title={<Text>Date Rende-vous: {format(date, "dd-mm-yyyy")}</Text>}
          subtitle={<Text>Motif: {item.motif}</Text>}
        />
      </Card>
    );
  };
  // ! definition des hooks
  useEffect(() => {
    fetch();
    // cleanup
    return () => {
      //
    };
  }, [rendezVous]);
  // Affichage des rendez-vous
  if (rendezVous.length == 0) {
    return (
      <CustomEmtyView
        title={"Pas de Rendez-vous Disponible !"}
        imageSource={require("../../assets/images/Empty-bro.png")}
        subTitile={"Creer un rendez-vous"}
        handlePress={() => navigations("Ajout RDV")}
      />
    );
  } else {
    return (
      // ici ont retourne la liste de tout les rendez-vous du patient dans l'hopital, mais il y'a pas possibiliter de modification par l'utilisateur connecter

      <View
        style={[globalStyles.container, { backgroundColor: colors.bleuClaire }]}
      >
        <CustomHeader
          title={"Liste des rendez-vous"}
          subtitle={
            "Ici vous trouverez la listes de tous les rendez-vous du patient"
          }
        />
        <FlatList
          style={[globalStyles.contain, { height: "100%" }]}
          data={rendezVous}
          renderItem={renderItem}
        />
        <FAB
          label="Ajouter un Rendez-vous"
          icon={"plus"}
          style={globalStyles.fab}
          color={colors.white}
          onPress={() => navigations("Ajout RDV")}
        />
      </View>
    );
  }
};

export default RendeVousByPatient;

const styles = StyleSheet.create({});
