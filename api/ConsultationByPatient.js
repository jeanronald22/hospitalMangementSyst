import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import globalStyles from "../assets/syles generaux/globalStyle";
import { colors } from "../assets/colors/colors";
import CustomHeader from "../components/CustomHeader";
import { getConsultationsByIdPatient } from "./dataService";
import { Button, Card, FAB } from "react-native-paper";
import { format } from "date-fns";
import CustomEmtyView from "../components/EmptyView";

const ConsultationByPatient = ({ route, navigation }) => {
  const patient = route.params;
  const [consulatation, setConsultation] = useState([]);
  // !definition es fonction
  useEffect(() => {
    fetchData();
    return () => {};
  }, [fetchData]);

  const fetchData = async () => {
    try {
      const response = await getConsultationsByIdPatient(patient.id);
      setConsultation(response);
    } catch (error) {
      console.error(error);
    }
  };
  const renderItem = ({ item }) => {
    const date = new Date(item.dateConsultation);
    return (
      <Card style={styles.card}>
        <Card.Title
          title={<Text>Date Consultation: {date.toDateString()}</Text>}
        />
        <Card.Title
          title={<Text>Motif consulatation: {item.motif} jours</Text>}
        />
        <Card.Title
          title={<Text>Duree symptomes: {item.dureeSymptome} jours</Text>}
        />
        <Card.Title
          title={<Text>Diagnostic: {item.diagnostic.diagnostic} jours</Text>}
        />
        <Card.Content>
          <Button
            textColor={colors.bleuClaire}
            onPress={() =>
              navigation.navigate("PrescriptionByPatient", item.id)
            }
          >
            Voir les prescriptions
          </Button>
        </Card.Content>
      </Card>
    );
  };
  // ! definition du rendu du composant

  return (
    <View
      style={[globalStyles.container, { backgroundColor: colors.bleuClaire }]}
    >
      <CustomHeader title={"Liste des consulatations "} />
      <View style={[globalStyles.contain]}>
        {consulatation.length === 0 ? (
          <CustomEmtyView
            title={"Liste des consultation vide"}
            imageSource={require("../assets/images/Empty-bro.png")}
          />
        ) : (
          <FlatList
            data={consulatation}
            renderItem={renderItem}
            style={{ height: "100%" }}
          />
        )}
      </View>
      <FAB
        style={globalStyles.fab}
        label="Ajouter une consultation"
        icon={"plus"}
        color={colors.white}
        onPress={() => navigation.navigate("Ajoute Consultation", patient.id)}
      />
    </View>
  );
};

export default ConsultationByPatient;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.grisClair,
    marginVertical: 5,
  },
});
