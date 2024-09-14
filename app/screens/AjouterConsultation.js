import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { addConsultation, getPatients } from "../../api/dataService";
import globalStyles from "../../assets/syles generaux/globalStyle";
import { colors } from "../../assets/colors/colors";
import CustomHeader from "../../components/CustomHeader";
import CustomInputPaper from "../../components/CustomInputPaper";
import { Menu, Provider, Divider, Button } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

const AjouterConsultation = ({ route, navigation }) => {
  // !  ------------------DEFINITION DES STATES ------------------------------
  const [patient, setPatient] = useState([]);
  const [data, setData] = useState({
    diagnostic: "",
    motif: "",
    symptome: "",
    dureeSymptome: "",
    id: route.params,
    nomPatient: "Veillez selectionner un patient",
  });
  const [visible, setVisible] = useState(false);
  //! ----------------------------DEFINITON DES HOOKS ----------------------------
  useEffect(() => {
    fetch();
  }, []);
  //! ------------------ DEFINITION DES FONCTIONS -------------------------------------
  const fetch = async () => {
    try {
      const response = await getPatients();
      setPatient(response);
    } catch (error) {
      console.error("Erreur lors de la récupération des patients : ", error);
    }
  };
  const showMenu = () => setVisible(true);
  const hideMenu = () => setVisible(false);

  const handleSelect = (name, id) => {
    setData({ ...data, nomPatient: name, id: id });
    hideMenu();
  };
  const handlePress = async () => {
    try {
      response = await addConsultation(data);
      console.log(response);
    } catch (error) {
      console.log("Erreur lors de la sommusin des donner", error);
    }
  };

  return (
    <View
      style={[globalStyles.container, { backgroundColor: colors.bleuClaire }]}
    >
      <CustomHeader
        title="Ajouter une consultation"
        subtitle="Veillez renseignez tout les champs"
      />
      <ScrollView style={[globalStyles.contain, { height: "100%" }]}>
        <CustomInputPaper
          label="Motif Consultation"
          style={globalStyles.input2}
          value={data.motif}
          onChangeText={(text) => setData({ ...data, motif: text })}
        />
        <CustomInputPaper
          label="Symptome"
          style={globalStyles.input2}
          value={data.symptome}
          onChangeText={(text) => setData({ ...data, symptome: text })}
        />
        <CustomInputPaper
          label="Dureé symptomes"
          style={globalStyles.input2}
          value={data.dureeSymptome}
          onChangeText={(text) => setData({ ...data, dureeSymptome: text })}
          keyboardType="numeric"
        />
        <CustomInputPaper
          label="Diagnostic"
          style={globalStyles.input2}
          value={data.diagnostic}
          onChangeText={(text) => setData({ ...data, diagnostic: text })}
        />
        <Provider>
          <Button style={globalStyles.btn} onPress={handlePress}>
            <Text style={globalStyles.buttonText}>Ajouter</Text>
          </Button>
        </Provider>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  nameContainer: {
    backgroundColor: colors.grisClair,
    paddingHorizontal: 7,
    paddingVertical: 20,
    marginVertical: 10,
  },
  position2: {
    position: "absolute",
    top: 10,
    left: 320,
  },
});
export default AjouterConsultation;
