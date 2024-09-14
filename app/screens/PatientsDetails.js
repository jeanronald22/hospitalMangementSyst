import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import CustomProfil from "../../components/CustomProfil";
import globalStyles from "../../assets/syles generaux/globalStyle";
import { Avatar, Card, Divider } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../assets/colors/colors";

const PatientsDetails = ({ route, navigation }) => {
  // recuperation des informations depuis la route
  const patient = route.params;
  // fonction de navigatrion
  const handlePress = (route) => {
    navigation.navigate(route, patient);
  };
  // recndu du  composant
  return (
    <View style={[globalStyles.container, styles.container]}>
      <CustomProfil
        nom={patient.nom}
        prenom={patient.prenom}
        email={patient.adresseEmail}
        handlePress={() => handlePress("Information")}
      />
      {/* definition des differents elements du dossiers medical  */}

      <Card style={[styles.card, { marginTop: 35 }]}>
        <Card.Title
          title={<Text style={styles.text}>Listes des rendez-vous</Text>}
          left={(props) => (
            <Avatar.Icon
              {...props}
              icon="calendar"
              color={colors.white}
              style={{ backgroundColor: colors.bleuClaire }}
            />
          )}
          right={() => (
            <TouchableOpacity
              onPress={() => handlePress("Rendez-vous par patient")}
            >
              <MaterialIcons
                name="arrow-forward-ios"
                size={28}
                color="white"
                style={{ padding: 15 }}
              />
            </TouchableOpacity>
          )}
        />
      </Card>
      <Card style={styles.card}>
        <Card.Title
          title={<Text style={styles.text}>Information médical</Text>}
          left={(props) => (
            <Avatar.Icon
              {...props}
              icon="content-paste"
              color={colors.white}
              style={{ backgroundColor: colors.bleuClaire }}
            />
          )}
          right={() => (
            <TouchableOpacity onPress={() => handlePress("Info Medical")}>
              <MaterialIcons
                name="arrow-forward-ios"
                size={28}
                color="white"
                style={{ padding: 15 }}
              />
            </TouchableOpacity>
          )}
        />
      </Card>
      <Card style={styles.card}>
        <Card.Title
          title={<Text style={styles.text}>Listes des consultation</Text>}
          left={(props) => (
            <Avatar.Icon
              {...props}
              icon="stethoscope"
              color={colors.white}
              style={{ backgroundColor: colors.bleuClaire }}
            />
          )}
          right={() => (
            <TouchableOpacity
              onPress={() => handlePress("Consultation par patient")}
            >
              <MaterialIcons
                name="arrow-forward-ios"
                size={28}
                color="white"
                style={{ padding: 15 }}
              />
            </TouchableOpacity>
          )}
        />
      </Card>
      {/* <Card style={styles.card}>
        <Card.Title
          title={<Text style={styles.text}>Listes des Prescription </Text>}
          left={(props) => (
            <Avatar.Icon
              {...props}
              icon="clipboard-list"
              color={colors.white}
              style={{ backgroundColor: colors.bleuClaire }}
            />
          )}
          right={() => (
            <TouchableOpacity>
              <MaterialIcons
                name="arrow-forward-ios"
                size={28}
                color="white"
                style={{ padding: 15 }}
              />
            </TouchableOpacity>
          )}
        />
      </Card> */}
      <Card style={styles.card}>
        <Card.Title
          title={<Text style={styles.text}>Notes </Text>}
          left={(props) => (
            <Avatar.Icon
              {...props}
              icon="note"
              color={colors.white}
              style={{ backgroundColor: colors.bleuClaire }}
            />
          )}
          right={() => (
            <TouchableOpacity onPress={() => handlePress("Note")}>
              <MaterialIcons
                name="arrow-forward-ios"
                size={28}
                color="white"
                style={{ padding: 15 }}
              />
            </TouchableOpacity>
          )}
        />
      </Card>
      <Card style={[styles.card, { marginTop: 35 }]}>
        <Card.Title
          title={<Text style={styles.text}>Autre documents </Text>}
          left={(props) => (
            <Avatar.Icon
              {...props}
              icon="folder"
              color={colors.white}
              style={{ backgroundColor: colors.bleuClaire }}
            />
          )}
          right={() => (
            <TouchableOpacity>
              <MaterialIcons
                name="arrow-forward-ios"
                size={28}
                color="white"
                style={{ padding: 15 }}
              />
            </TouchableOpacity>
          )}
        />
      </Card>
      <Card style={[styles.card]}>
        <Card.Title
          title={<Text style={styles.text}>Imprimer le dossier </Text>}
          left={(props) => (
            <Avatar.Icon
              {...props}
              icon="printer"
              color={colors.white}
              style={{ backgroundColor: colors.bleuClaire }}
            />
          )}
          right={() => (
            <TouchableOpacity>
              <MaterialIcons
                name="arrow-forward-ios"
                size={28}
                color="white"
                style={{ padding: 15 }}
              />
            </TouchableOpacity>
          )}
        />
      </Card>
    </View>
  );
};

export default PatientsDetails;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    marginTop: 20,
    marginHorizontal: 10,
  },
  card: {
    backgroundColor: colors.bleuClaire,
    marginVertical: 5,
  },
  cont: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: colors.white,
    fontSize: 18,
    paddingLeft: 16,
  },
});
