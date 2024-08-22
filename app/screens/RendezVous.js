import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  annulerRendezVous,
  getPatients,
  getRendezVous,
  marquerRendezVousFait,
} from "../../api/dataService";
import CustomHeader from "../../components/CustomHeader";
import globalStyles from "../../assets/syles generaux/globalStyle";
import { colors } from "../../assets/colors/colors";
import { Divider, FAB, ToggleButton } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import IconToggle from "../../components/IconToggle";
import { format } from "date-fns";
import { useFocusEffect } from "@react-navigation/native";
const RendezVous = ({ route, navigation }) => {
  const [rendezVous, setRendezVous] = useState([]);
  const [patient, setPatient] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    navigation.setOptions({
      tabBarBadge: rendezVous.length,
    });
    const fetchRendezVous = async () => {
      try {
        const data = await getRendezVous();
        const patients = await getPatients();
        setRendezVous(data);
        setPatient(patients);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des rendez-vous :",
          error
        );
      }
    };
    fetchRendezVous();
  }, []);
  useFocusEffect(() => {
    navigation.setOptions({
      tabBarBadge: rendezVous.length,
    });
  });
  //! definition des fonction
  // annuler un rendez-vous
  const annuler = async (id) => {
    try {
      const response = await annulerRendezVous(id);
    } catch (error) {
      console.error("Erreur lors de l'annulation du rendez-vous :", error);
    }
  };
  const fait = async (id) => {
    try {
      const response = await marquerRendezVousFait(id);
    } catch (error) {
      console.error("Erreur lors du marquage  :", error);
    }
  };
  const renderItem = ({ item }) => {
    const dateString = item.date_heure;
    const date = new Date(dateString);
    const dateFormat = format(date, "dd MMMM yyyy HH:mm");
    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <View>
            <MaterialIcons
              name="access-time"
              size={20}
              color={colors.white}
              style={{ marginHorizontal: 6 }}
            />
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>{dateFormat}</Text>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.containerImg}>
            <Image
              source={require("../../assets/images/profil.jpg")}
              style={styles.image}
            />
          </View>
          <View>
            <Text style={globalStyles.subHeader}>
              {patient.map((pat, index) => {
                return pat.id === item.patient ? pat.nom : null;
              })}
              <View
                style={[
                  styles.etat,
                  item.actif
                    ? { backgroundColor: colors.sucess }
                    : { backgroundColor: colors.erros },
                ]}
              ></View>
            </Text>

            <View style={styles.description}>
              <Text style={globalStyles.secondaryText}>{item.motif}</Text>
            </View>
          </View>
        </View>

        <View style={styles.action}>
          <TouchableOpacity
            style={[styles.btn, { borderBottomLeftRadius: 20 }]}
            onPress={() => fait(item.id)}
          >
            <MaterialIcons name="check" size={22} color={colors.sucess} />
            <Text style={styles.btntext}>Fait</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <MaterialIcons name="report" size={22} color={colors.bleuClaire} />
            <Text style={[styles.btntext, { color: colors.bleuClaire }]}>
              Reporter{" "}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, { borderBottomRightRadius: 20 }]}
            onPress={() => annuler(item.id)}
          >
            <MaterialIcons name="cancel" size={22} color={colors.erros} />
            <Text style={[styles.btntext, { color: colors.erros }]}>
              Annuler
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View
      style={[globalStyles.container, { backgroundColor: colors.bleuClaire }]}
    >
      <CustomHeader title="Rendez-vous" />
      <View style={[globalStyles.contain, { height: "100%" }]}>
        <View style={styles.toggle}>
          <TouchableOpacity
            onPress={() => setFilter("today")}
            style={[
              styles.menu,
              {
                backgroundColor: filter === "today" ? colors.grisClair : null,
              },
            ]}
          >
            <Text style={[globalStyles.text]}>Aujourd'hui</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.menu,
              {
                backgroundColor:
                  filter === "thisMont" ? colors.grisClair : null,
              },
            ]}
            onPress={() => setFilter("thisMont")}
          >
            <Text style={globalStyles.text}>Ce mois</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.menu,
              { backgroundColor: filter === "all" ? colors.grisClair : null },
            ]}
            onPress={() => setFilter("all")}
          >
            <Text style={globalStyles.text}>Tous</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={rendezVous}
          renderItem={renderItem}
          style={styles.flat}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <FAB
        style={styles.fab}
        icon="plus"
        color={colors.white}
        onPress={() => {
          navigation.navigate("Ajout Rendez-vous");
        }}
        label="Nouveau Rendez-vous"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    width: "100%",
  },
  toggle: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 20,
  },
  menu: {
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.grisMoyen,
  },
  flat: {
    marginTop: 25,
  },
  card: {
    // backgroundColor: "red",
    borderRadius: 10,
    marginVertical: 10,
  },
  header: {
    flexDirection: "row",
    backgroundColor: colors.bleuClaire,
    paddingVertical: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  containerImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
    marginHorizontal: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: "cover",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    borderColor: colors.grisClair,
    borderWidth: 1,
    padding: 10,
  },
  btntext: {
    color: colors.sucess,
  },
  action: {
    flexDirection: "row",
    // backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  date: {
    color: colors.white,
    fontWeight: "bold",
    paddingRight: 10,
  },
  dateContainer: {
    marginHorizontal: 3,
  },
  etat: {
    width: 10,
    height: 10,
    borderRadius: 5,
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
export default RendezVous;
