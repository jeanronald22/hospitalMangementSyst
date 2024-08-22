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
import CustomHeader from "../../components/CustomHeader";
import { useFocusEffect } from "@react-navigation/native";

const Patiens = ({ route, navigation }) => {
  const patient = route.params;
  const [searchQuery, setSearchQuery] = useState("");
  const [patients, setPatients] = useState([]);
  useEffect(() => {
    fetch();

    // definitin des badget
  }, []);
  useFocusEffect(() => {
    navigation.setOptions({
      tabBarBadge: patients.length,
    });
  });

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
              <Avatar.Image
                {...props}
                // icon="account"
                source={require("../../assets/images/profil.jpg")}
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
    <View style={[globalStyles.container, styles.container]}>
      <CustomHeader
        title={route.name}
        // subtitle="Hi 👋, Bienvenue sur Doctore, que souhaitez-vous faire  "
        image={false}
      />
      <View style={styles.imageWel}>
        <Image
          source={require("../../assets/images/patients1.webp")}
          style={styles.image}
        />
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={[styles.searchbar]}
        />
      </View>

      <View style={[globalStyles.contain, styles.listes]}>
        <FlatList
          data={patients.filter(
            (patient) =>
              patient.nom.toLowerCase().includes(searchQuery.toLowerCase()) //on fais un tri sur les patient en fonction de ce qui a
          )}
          renderItem={renderPatient}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          style={styles.liste}
        />
      </View>
      <FAB
        style={styles.fab}
        icon="plus"
        color={colors.white}
        onPress={() => navigation.navigate("Ajouter patient", patient)}
        label="Ajouter Patient"
      />
    </View>
  );
};

export default Patiens;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bleuClaire,
    width: "100%",
    // padding: 16,
    // backgroundColor: "red",
  },
  searchbar: {
    borderRadius: 15,
    backgroundColor: colors.grisClair,
    width: "90%",
    alignSelf: "center",
    marginBottom: 10,
    position: "absolute",
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
  list: {
    height: "100%",
  },
  imageWel: {
    width: "100%",
    height: 100,
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
});
