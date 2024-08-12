import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Appbar, Card, Avatar, Searchbar, FAB } from "react-native-paper";
import globalStyles from "../../assets/syles generaux/globalStyle";
import { colors } from "../../assets/colors/colors";
import { getPatients } from "../../api/dataService";
import { differenceInYears } from "date-fns";

const Patiens = ({ route, navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [patients, setPatients] = useState([]);
  useEffect(() => {
    fetch();
    navigation.setOptions({
      tabBarBadge: patients.length,
    });
    // definitin des badget
  }, [navigation]);

  //!----------------------------------------definition des fonction----------------------------------
  // fonction qui prend en entrer une date et retourne le nombre d'annee jusqua nos jour
  const getAge = (birdDate) => {
    const bird = new Date(birdDate);
    const today = new Date();
    const diff = differenceInYears(today, bird);
    return diff + 10;
  };
  // recuperations des patients
  const fetch = async () => {
    try {
      const patients = await getPatients();
      setPatients(patients);
      console.log(patients);
      return true;
    } catch (error) {}
    return false;
  };
  const onChangeSearch = (query) => setSearchQuery(query);
  const renderPatient = ({ item }) => {
    // console.log(item.personne.date_naissance);

    return (
      <TouchableOpacity onPress={() => navigation.navigate("Details", item)}>
        <Card style={styles.card}>
          <Card.Title
            title={
              <Text style={{ fontFamily: "Roboto_500Medium" }}>
                {`${item.nom} ${item.prenom}`}
              </Text>
            }
            subtitle={`Age: ${getAge(item.dateNaissance)}, Sexe: ${item.sexe}`}
            left={(props) => (
              <Avatar.Icon
                {...props}
                icon="account"
                style={{ backgroundColor: colors.bleuMoyen }}
              />
            )}
          />
          <Card.Content>
            <Text style={globalStyles.text}>
              Details apropos des patients seront ici !.
            </Text>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };
  // !-------------------------------------fonction de retour-----------------------------------
  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: colors.white }}>
        <View style={styles.headerStyle}>
          <Text style={globalStyles.header}>{route.name}</Text>
          <Image source={require("../../assets/images/logo.png")} />
        </View>
      </Appbar.Header>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={[styles.searchbar]}
      />
      <FlatList
        data={patients.filter(
          (patient) =>
            patient.nom.toLowerCase().includes(searchQuery.toLowerCase()) //on fais un tri sur les patient en fonction de ce qui a ete taper dans la base
        )}
        renderItem={renderPatient}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      <FAB
        style={styles.fab}
        small
        icon="plus"
        color={colors.white}
        onPress={() => navigation.navigate("Ajouter patient")}
      />
    </View>
  );
};

export default Patiens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    width: "100%",
    padding: 16,
    // backgroundColor: "red",
  },
  searchbar: {
    marginVertical: 15,
    borderRadius: 15,
    backgroundColor: colors.grisClair,
  },
  list: {
    // padding: 10,
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
  headerStyle: {
    // backgroundColor: "red",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
