import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import globalStyles from "../../assets/syles generaux/globalStyle";
import { colors } from "../../assets/colors/colors";
import CustomHeader from "../../components/CustomHeader";
import { MaterialIcons } from "@expo/vector-icons";
import { getPatientById } from "../../api/dataService";
import { Button, Card, Provider, FAB } from "react-native-paper";
import { format, formatDistance } from "date-fns";

const ConsultationDetail = ({ route, navigation }) => {
  // ! ---------------- DEFINITION DES STATES ---------------------
  const [data, setItem] = useState(route.params);
  const [patient, setPatient] = useState([]);
  console.log(data);

  // !--------------- DEFINITION DES FONCTION ---------------------
  const fetch = async () => {
    try {
      const response = await getPatientById(data.item.id);
      setPatient(response);
    } catch (error) {
      console.log(
        "Erreur lors e la recuoeration des infirmation du patient",
        error
      );
    }
  };
  // ! ------------------ DEFINITION DES HOOKS-------------------------------------
  useEffect(() => {
    fetch();
  }, []);
  return (
    <Provider>
      <View
        style={[globalStyles.container, { backgroundColor: colors.bleuClaire }]}
      >
        <CustomHeader
          title="Consultation Détail"
          subtitle={`Ici vous trouverez les détails sur la consultation du patient`}
        />
        <ScrollView style={[globalStyles.contain, { height: "100%" }]}>
          <View style={styles.separationStyle}>
            <MaterialIcons name="info" size={30} color={colors.bleuClaire} />
            <Text style={globalStyles.header1}>
              Détails sur de la consultation
            </Text>
          </View>
          <View style={styles.consultationInfo}>
            <Card style={styles.card}>
              <Card.Content>
                <View style={styles.item}>
                  <Text style={globalStyles.text}>Nom Patient </Text>
                  <Text>{patient.nom}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={globalStyles.text}>Prénom </Text>
                  <Text>{patient.prenom}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={globalStyles.text}>Téléphone </Text>
                  <Text>{patient.telephone}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={globalStyles.text}>Motif consultation </Text>
                  <Text>{data.item.motif}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={globalStyles.text}>Symptômes </Text>
                  <Text>{data.item.symptome}</Text>
                </View>
              </Card.Content>
              <Card.Actions>
                <Button
                  style={styles.btn}
                  labelStyle={{ color: colors.bleuClaire }}
                >
                  Modifier
                </Button>
              </Card.Actions>
            </Card>
            <View style={styles.separationStyle}>
              <MaterialIcons name="info" size={30} color={colors.bleuClaire} />
              <Text style={globalStyles.header1}>Diagnostic</Text>
            </View>
          </View>
          <View style={styles.consultationInfo}>
            <Card style={styles.card}>
              <Card.Content>
                <Text style={globalStyles.text}>
                  {data.item.diagnostic.diagnostic}
                </Text>
              </Card.Content>
              <Card.Actions>
                <Button
                  style={styles.btn}
                  labelStyle={{ color: colors.bleuClaire }}
                >
                  Modifier
                </Button>
              </Card.Actions>
            </Card>
          </View>
          <View style={styles.separationStyle}>
            <MaterialIcons
              name="medical-services"
              size={30}
              color={colors.bleuClaire}
            />
            <Text style={globalStyles.header1}>Préscriptions</Text>
          </View>
          <View style={styles.consultationInfo}>
            <Card style={styles.card}>
              <Card.Content>
                <Text style={globalStyles.subHeader}>Médicaments</Text>
                {data.medicament.length === 0 && (
                  <Text style={globalStyles.text}>Aucune prescription</Text>
                )}
                {data.medicament.map((med) => {
                  return (
                    <View style={styles.item}>
                      <Text style={globalStyles.text}>
                        {med.nomMedicament}{" "}
                      </Text>
                      <Text style={globalStyles.text}>{med.duree} </Text>
                      <Text style={globalStyles.text}>{med.dosage} </Text>
                    </View>
                  );
                })}
                <Text style={globalStyles.subHeader}>Opération</Text>
                {data.operation.length === 0 && (
                  <Text style={globalStyles.text}>Aucune Opération</Text>
                )}
                {data.operation.map((med) => {
                  return (
                    <View style={styles.item}>
                      <Text style={globalStyles.text}>
                        {med.typeOperation}{" "}
                      </Text>
                      <Text style={globalStyles.text}>
                        {med.dateOperation}{" "}
                      </Text>
                      <Text style={globalStyles.text}>{med.dosage} </Text>
                    </View>
                  );
                })}
              </Card.Content>
              <Card.Actions>
                <Button
                  style={styles.btn}
                  labelStyle={{ color: colors.bleuClaire }}
                >
                  Modifier
                </Button>
              </Card.Actions>
            </Card>
          </View>
        </ScrollView>
        <FAB
          label="Allez au dossier Médical"
          icon="directions"
          style={styles.fab}
          color={colors.white}
        />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  separationStyle: {
    flexDirection: "row",
    justifyContent: "center",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn: {
    borderColor: colors.bleuClaire,
  },
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
});

export default ConsultationDetail;
