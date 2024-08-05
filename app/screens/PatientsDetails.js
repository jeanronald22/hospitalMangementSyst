import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import CustomHeader from "../../components/CustomHeader";
import globalStyles from "../../assets/syles generaux/globalStyle";
import { Avatar, Card, Divider, Provider } from "react-native-paper";
import { colors } from "../../assets/colors/colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { differenceInYears } from "date-fns";

const PatientsDetails = ({ route }) => {
  const patient = route.params; // on recupere les données du patient passé en parametre
  //... on fait le rendu des informations de la vue detaille des patients ici
  return (
    <View style={[globalStyles.container, styles.container]}>
      <CustomHeader origin="Main" title={route.name} />
      {/* definitions des informations de la vue detaille des patients */}
      <Provider>
        <ScrollView style={styles.contentContainer}>
          {/* definitn du profile */}
          <View style={styles.profileContainer}>
            <Avatar.Icon
              size={100}
              icon="account"
              style={{ backgroundColor: colors.bleuMoyen }}
            />
            <Text style={globalStyles.header1}>
              {patient.personne.first_name} {patient.personne.last_name}
            </Text>
            <Text style={globalStyles.text}>
              {patient.personne.phone_number}
            </Text>
          </View>
          {/* definition des diferent action possible  */}
          <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.action}>
              <MaterialIcons name="edit" size={24} color={colors.bleuMoyen} />
              <Text style={[globalStyles.text, styles.actionText]}>
                Modifier
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.action}>
              <MaterialIcons
                name="edit-note"
                size={24}
                color={colors.bleuMoyen}
              />
              <Text style={[globalStyles.text, styles.actionText]}>Note</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.action}>
              <MaterialIcons name="event" size={24} color={colors.bleuMoyen} />
              <Text style={[globalStyles.text, styles.actionText]}>
                Rendez-vous
              </Text>
            </TouchableOpacity>
          </View>
          {/* vue  du dossiers medical */}
          <View>
            <Card style={styles.dossierContainer}>
              <Card.Content>
                <TouchableOpacity style={styles.cartContent}>
                  <View style={styles.cartContent1}>
                    <MaterialIcons
                      name="my-library-books"
                      size={30}
                      color={colors.bleuClaire}
                    />
                    <Text
                      style={[globalStyles.subHeader, { marginHorizontal: 10 }]}
                    >
                      Dossiers Medicals
                    </Text>
                  </View>

                  <MaterialIcons
                    name="arrow-circle-right"
                    size={30}
                    color={colors.bleuMoyen}
                  />
                </TouchableOpacity>

                <Divider style={{ marginVertical: 8 }} />
                <View style={styles.cartContent}>
                  <Text style={styles.label}>Date de création</Text>
                  <Text style={[styles.value, globalStyles.secondaryText]}>
                    2024-20-22
                  </Text>
                </View>
              </Card.Content>
            </Card>
          </View>
          {/* autres informations personnels */}
          <View>
            <View style={styles.infoContainer}>
              <View style={styles.intro}>
                <View>
                  <MaterialIcons
                    name="person"
                    size={30}
                    color={colors.bleuClaire}
                  />
                </View>
                <View>
                  <Text
                    style={[
                      globalStyles.subHeader,
                      { marginHorizontal: 10, marginBottom: 0 },
                    ]}
                  >
                    Informations Personnels
                  </Text>
                </View>
              </View>

              <Card styl={styles.card}>
                <Card.Content style={styles.cartContent}>
                  <Text style={styles.label}>Age</Text>
                  <Text style={[styles.value, globalStyles.secondaryText]}>
                    {differenceInYears(
                      new Date(),
                      patient.personne.date_naissance
                    )}
                    {" Ans"}
                  </Text>
                </Card.Content>
              </Card>
              <Card styl={styles.card}>
                <Card.Content style={styles.cartContent}>
                  <Text style={styles.label}>Sexe</Text>
                  <Text style={[styles.value, globalStyles.secondaryText]}>
                    {patient.personne.sexe === "M" ? "Masculin" : "Féminin"}
                  </Text>
                </Card.Content>
              </Card>
              <Card styl={styles.card}>
                <Card.Content style={styles.cartContent}>
                  <Text style={styles.label}>Email</Text>
                  <Text style={[styles.value, globalStyles.secondaryText]}>
                    {patient.personne.email}{" "}
                  </Text>
                </Card.Content>
              </Card>
              <Card styl={styles.card}>
                <Card.Content style={styles.cartContent}>
                  <Text style={styles.label}>Addresse</Text>
                  <Text style={[styles.value, globalStyles.secondaryText]}>
                    {patient.personne.address}{" "}
                  </Text>
                </Card.Content>
              </Card>
            </View>
          </View>
          {/* info mdedical */}
          <View>
            <View style={styles.intro}>
              <View>
                <MaterialIcons
                  name="medical-information"
                  size={30}
                  color={colors.bleuClaire}
                />
              </View>

              <Text
                style={[
                  globalStyles.subHeader,
                  { marginHorizontal: 10, marginBottom: 0 },
                ]}
              >
                Informations Médicals
              </Text>
            </View>
            {/* elemenst */}
            <Card styl={styles.card}>
              <Card.Content style={styles.cartContent}>
                <Text style={styles.label}>Poids</Text>
                <Text style={[styles.value, globalStyles.secondaryText]}>
                  {patient.poids}
                  {" kgs"}
                </Text>
              </Card.Content>
            </Card>
            <Card styl={styles.card}>
              <Card.Content style={styles.cartContent}>
                <Text style={styles.label}>Tailles</Text>
                <Text style={[styles.value, globalStyles.secondaryText]}>
                  {patient.taille}
                  {" Cm"}
                </Text>
              </Card.Content>
            </Card>
            <Card styl={styles.card}>
              <Card.Content style={styles.cartContent}>
                <Text style={styles.label}>Température</Text>
                <Text style={[styles.value, globalStyles.secondaryText]}>
                  {patient.temperature}
                  {" dégree"}
                </Text>
              </Card.Content>
            </Card>
            <Card styl={styles.card}>
              <Card.Content style={styles.cartContent}>
                <Text style={styles.label}>Tension arterielle</Text>
                <Text style={[styles.value, globalStyles.secondaryText]}>
                  {patient.tension_art}
                  {" mmHg "}
                </Text>
              </Card.Content>
            </Card>
          </View>
        </ScrollView>
      </Provider>
    </View>
  );
};

export default PatientsDetails;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    // backgroundColor: "red",
  },
  profileContainer: {
    // backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    marginVertical: 10,
    borderRadius: 10,
    // elevation: 2,
  },
  cartContent: {
    flexDirection: "row",
    backgroundColor: colors.grisClair,
    justifyContent: "space-between",
  },
  actionContainer: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    // backgroundColor: "red",
  },
  label: {
    fontWeight: "bold",
    color: "#333",
  },
  value: {
    fontSize: 16,
    color: "#555",
  },
  infoContainer: {
    marginTop: 20,
  },
  action: {
    backgroundColor: colors.grisClair,
    padding: 7,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 3,
  },
  iconeColor: {
    color: colors.bleuMoyen,
  },
  actionText: {
    marginTop: 5,
  },
  dossierContainer: {
    backgroundColor: colors.grisClair,
  },
  cartContent1: {
    flexDirection: "row",
  },
  intro: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "red",
    marginVertical: 20,
    justifyContent: "center",
  },
});
