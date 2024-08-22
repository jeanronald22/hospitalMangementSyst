import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { colors } from "../../assets/colors/colors";
import globalStyles from "../../assets/syles generaux/globalStyle";
import CustomHeader from "../../components/CustomHeader";
import {
  getConsultations,
  getExamen,
  getMedicaments,
  getOperation,
  getPrescriptiom,
} from "../../api/dataService";
import { Card, FAB, Provider } from "react-native-paper";
import { format } from "date-fns";
import { useFocusEffect } from "@react-navigation/native";

const Consultations = ({ navigation }) => {
  // ! -----------DEFINITION DES STATES --------------------------------
  const [consultations, setConsultations] = useState([]);
  const [examen, setExamen] = useState([]);
  const [operation, setOperation] = useState([]);
  const [medicament, setMedicament] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);

  // !---------------DEFINITION DES FONCTIONS --------------------------------
  const fetchConsultations = async () => {
    try {
      const response = await getConsultations();
      setConsultations(response);
      const response1 = await getExamen();
      setExamen(response1);
      const response2 = await getOperation();
      setOperation(response2);
      const response3 = await getMedicaments();
      setMedicament(response3);
      const response4 = await getPrescriptiom();
      setPrescriptions(response4);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des consultations :",
        error
      );
    }
  };

  // consulatation press
  const handlerPress = (item) => {
    // recuperation de toutes les prescription lie a cette consultation
    // prescriptions.map((pres) => {
    //   pres.id === item.id ? setCurrentPrescriptions(pres) : null;
    // });

    //  recuperation de tout les medicament, operation, examen lie a cette prescription

    // navigation vers la page de consultation details

    navigation.navigate("Consultation Details", {
      item,
      medicament,
      operation,
    });
  };

  const renderItem = ({ item }) => {
    const id = item.id;
    const dateString = item.dateConsultation;
    const date = new Date(dateString);
    const dateFormat = format(date, "dd MMMM yyyy");
    return (
      <Card style={styles.card} onPress={() => handlerPress(item)}>
        <Card.Title
          title={
            <Text
              style={[{ fontFamily: "Roboto_500Medium", color: colors.white }]}
            >
              {`MOTIF: ${item.motif} `}
            </Text>
          }
          subtitle={
            <Text style={globalStyles.subtitle}>Patient:{item.patient} </Text>
          }
          style={styles.header}
        />

        <Card.Content style={styles.content}>
          <Text
            style={globalStyles.secondaryText}
          >{`Date consultation: ${dateFormat}`}</Text>
          <Text
            style={globalStyles.secondaryText}
          >{`Diagnostic: ${item.diagnostic.diagnostic}`}</Text>
        </Card.Content>
      </Card>
    );
  };

  //! ---------------AFFICHAGE DE LA PAGE --------------------------------

  useEffect(() => {
    navigation.setOptions({
      tabBarBadge: consultations.length,
    });
    fetchConsultations();
  }, []);
  useFocusEffect(() => {
    navigation.setOptions({
      tabBarBadge: consultations.length,
    });
  });
  return (
    <Provider>
      <View
        style={[globalStyles.container, { backgroundColor: colors.bleuClaire }]}
      >
        <CustomHeader title="Listes des Consultations" />
        <View style={[globalStyles.contain, { height: "100%" }]}>
          <FlatList data={consultations} renderItem={renderItem} />
        </View>
        <FAB
          label="Nouvelle Consultation"
          icon="plus"
          style={styles.fab}
          color={colors.white}
          onPress={() => {
            navigation.replace("Ajoute Consultation");
          }}
        />
      </View>
    </Provider>
  );
};

export default Consultations;

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    backgroundColor: colors.grisClair,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: colors.bleuMoyen,
    color: colors.white,
  },
  header: {
    backgroundColor: colors.bleuClaire,
    paddingHorizontal: 7,
    paddingVertical: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  content: {
    paddingVertical: 10,
  },
});
