import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import globalStyles from "../../assets/syles generaux/globalStyle";
import { Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../assets/colors/colors";
import { Card, FAB, Provider } from "react-native-paper";

const PatientInfo = ({ route, navigation }) => {
  // recuperation des information depusi la route
  const patient = route.params;
  // definition des fonction
  const handlePress = (route) => {
    navigation.navigate(route, patient);
  };

  return (
    <View style={[globalStyles.container, styles.container]}>
      <View style={styles.title}>
        <TouchableOpacity
          style={{ marginRight: 25 }}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons
            name="arrow-back-ios"
            size={28}
            color={colors.blueFonce}
          />
        </TouchableOpacity>
        <Text style={globalStyles.header}>{route.name}</Text>
      </View>
      <View style={styles.header}>
        <View style={styles.imgContainer}>
          <Image
            source={require("../../assets/images/profil.jpg")}
            style={styles.img}
          />
        </View>
        <View style={styles.info}>
          <Text style={globalStyles.header}>{patient.nom}</Text>
          <Text style={[{ textAlign: "center" }, globalStyles.text]}>
            {patient.prenom}
          </Text>
        </View>
      </View>
      <View>
        <View style={styles.card}>
          <Text style={[globalStyles.text, { fontWeight: 500 }]}>Adresse</Text>
          <Card style={styles.cardContent}>
            <Card.Title
              title={
                <Text style={globalStyles.secondaryText}>
                  {patient.adresse}
                </Text>
              }
            />
          </Card>
        </View>
        <View style={styles.card}>
          <Text style={[globalStyles.text, { fontWeight: 500 }]}>
            Télephone
          </Text>
          <Card style={styles.cardContent}>
            <Card.Title
              title={
                <Text style={globalStyles.secondaryText}>
                  {patient.telephone}
                </Text>
              }
            />
          </Card>
        </View>
        <View style={styles.card}>
          <Text style={[globalStyles.text, { fontWeight: 500 }]}>
            Adresse Email
          </Text>
          <Card style={styles.cardContent}>
            <Card.Title
              title={
                <Text style={globalStyles.secondaryText}>
                  {patient.adresseEmail}
                </Text>
              }
            />
          </Card>
        </View>
        <View style={styles.card}>
          <Text style={[globalStyles.text, { fontWeight: 500 }]}>
            Date de naissance
          </Text>
          <Card style={styles.cardContent}>
            <Card.Title
              title={
                <Text style={globalStyles.secondaryText}>
                  {patient.dateNaissance}
                </Text>
              }
            />
          </Card>
        </View>
      </View>

      <FAB
        onPress={() => handlePress("Mise à jour")}
        label="Modifier"
        style={globalStyles.fab}
        icon={"plus"}
        color={colors.white}
      />
    </View>
  );
};

export default PatientInfo;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  header: {
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
  },
  imgContainer: {
    height: 200,
    width: 200,

    // backgroundColor: "red",
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  title: {
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 20,
    marginHorizontal: 20,
    alignItems: "center",
  },
  card: {
    padding: 20,
  },
  cardContent: {
    backgroundColor: colors.grisClair,
  },
});
