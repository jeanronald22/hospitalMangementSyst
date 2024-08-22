import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import globalStyles from "../../assets/syles generaux/globalStyle";
import { colors } from "../../assets/colors/colors";
import { getData } from "../../services/stockage";
import { getUtilisateurbYID } from "../../api/dataService";
import { Card } from "react-native-paper";

const Profil = () => {
  // !-----------------DEFINITION DES STATES ----------------
  const [user, setUser] = useState([]);
  // !--------DEFINITON DES FONCTIONS ----------------
  const fetch = async () => {
    try {
      const idDoctorString = await getData("idCurrentUser");
      const id = JSON.parse(idDoctorString);
      const response = await getUtilisateurbYID(id);
      setUser(response);
    } catch (error) {
      console.log("Error fetching", error);
    }
  };
  useEffect(() => {
    fetch();
  }, []);
  return (
    <View style={[globalStyles.container]}>
      <View
        style={{
          height: "30%",
          backgroundColor: colors.bleuClaire,
          width: "100%",
        }}
      >
        <Image
          source={require("../../assets/images/pp.avif")}
          style={styles.img}
        />
      </View>
      {/* definition des information */}
      <View
        style={{
          height: "70%",
          // justifyContent: "center",
          // backgroundColor: "red",
        }}
      >
        <View style={{ marginTop: 100, alignItems: "center" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {user.isDoctore ? "Dr." : "Infirmier "}

            {user.personnel.user.username}
          </Text>
          <Text style={{ fontSize: 16, color: "gray" }}>{user.specialite}</Text>
          <Card style={styles.card}>
            <Card.Content>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text>Adresse Email</Text>
                <Text> {user.personnel.user.email}</Text>
              </View>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Content>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text>Téléphone</Text>
                <Text> {user.personnel.telephone}</Text>
              </View>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Content>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text>Année de naissance</Text>
                <Text>{user.personnel.dateNaissance}</Text>
              </View>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Content>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text>Adresse</Text>
                <Text>{user.personnel.adresse}</Text>
              </View>
            </Card.Content>
          </Card>
        </View>
      </View>
    </View>
  );
};

export default Profil;

const styles = StyleSheet.create({
  img: {
    width: 250,
    height: 250,
    resizeMode: "cover",
    position: "absolute",
    top: "35%",
    left: "20%",
    borderRadius: 20,
  },
  card: {
    marginVertical: 10,
    backgroundColor: colors.grisClair,
    width: "90%",
  },
});
