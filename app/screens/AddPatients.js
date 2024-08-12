import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import CustomHeader from "../../components/CustomHeader";
import { colors } from "../../assets/colors/colors";
import globalStyles from "../../assets/syles generaux/globalStyle";
import { MaterialIcons } from "@expo/vector-icons";
import { Button, Provider } from "react-native-paper";
import CustomInputPaper from "../../components/CustomInputPaper";
import DatePicker from "@react-native-community/datetimepicker";
import { getData } from "../../services/stockage";

const AddPatients = () => {
  // ! definition des state
  const [formData, setFormaData] = useState({
    nom: "",
    prenom: "",
    dateNaissance: new Date(),
    telephone: "",
    adresse: "",
    adresseEmail: "",
    sexe: "",
    groupeSanguin: "",
    antecedentMedicaux: "",
    medicamentEnCour: "",
    alergie: "",
    poids: 0,
    taille: 0,
    tension: 0,
    pouls: 0,
  });
  const [visible, setVisiible] = useState(false);
  //! definition des fonctions
  const handleDateChange = async (newDate) => {
    setVisiible(true);
    // setTimeout(console.log(formData.dateNaissance), 200);
    user = await getData("currentUser");
    console.log(user);
  };
  return (
    <KeyboardAvoidingView
      style={[globalStyles.container, styles.container]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <CustomHeader
        title="Ajouter Un Patient"
        subtitle="Remplissez les détails ci-dessous pour ajouter un patient"
      />

      <ScrollView style={globalStyles.contain}>
        <View style={styles.personnalInformation}>
          <View style={styles.entete}>
            <MaterialIcons
              name="person"
              size={30}
              color={colors.bleuMoyen}
              style={{ marginBottom: 8, marginHorizontal: 10 }}
            />
            <Text style={globalStyles.subHeader}>Informations Personnel</Text>
          </View>
          {/* definition des champs proprement dit  */}
          <Provider>
            <CustomInputPaper
              label="Nom"
              value={formData.nom}
              style={styles.input}
              onChangeText={(text) => setFormaData({ ...formData, nom: text })}
            />
            <CustomInputPaper
              label="Prenom"
              value={formData.prenom}
              style={styles.input}
              onChangeText={(text) =>
                setFormaData({ ...formData, prenom: text })
              }
            />
            <CustomInputPaper
              label="Téléphone"
              value={formData.telephone}
              style={styles.input}
              onChangeText={(text) =>
                setFormaData({ ...formData, telephone: text })
              }
              type="phone-pad"
            />
            <CustomInputPaper
              label="Adresse"
              value={formData.adresse}
              style={styles.input}
              onChangeText={(text) =>
                setFormaData({ ...formData, adresse: text })
              }
            />
            <CustomInputPaper
              label="Adresse Email"
              value={formData.adresseEmail}
              style={styles.input}
              onChangeText={(text) =>
                setFormaData({ ...formData, adresseEmail: text })
              }
              type="email-address"
            />
            <CustomInputPaper
              label="Sexe"
              placeholder="Masculin / Feminin"
              value={formData.sexe}
              onChangeText={(text) => setFormaData({ ...formData, sexe: text })}
              style={styles.input}
            />
            <View style={styles.date}>
              <CustomInputPaper
                // editable={false}
                label="date naissance"
                value={formData.dateNaissance}
                style={styles.input}
                // onChangeText={(text) =>
                //   setFormaData({ ...formData, dateNaissance: text })
                // }
              />

              <TouchableOpacity
                style={styles.calendar}
                onPress={handleDateChange}
              >
                <MaterialIcons
                  name="calendar-month"
                  size={35}
                  color={colors.bleuMoyen}
                />
              </TouchableOpacity>
              {visible && (
                <DatePicker
                  // date={formData.dateNaissance}
                  onDateChange={(text) =>
                    setFormaData({ ...formData, dateNaissance: text })
                  }
                  value={formData.dateNaissance}
                />
              )}
            </View>
            <View style={styles.entete}>
              <MaterialIcons
                name="my-library-books"
                size={30}
                color={colors.bleuMoyen}
                style={{ marginBottom: 8, marginHorizontal: 10 }}
              />
              <Text style={globalStyles.subHeader}>Informations Medical</Text>
            </View>
            <CustomInputPaper
              label="Groupe Sanguin"
              value={formData.groupeSanguin}
              onChangeText={(text) => setFormaData({ ...formData, sexe: text })}
              style={styles.input}
            />
            <CustomInputPaper
              label="Alergies"
              value={formData.alergie}
              onChangeText={(text) =>
                setFormaData({ ...formData, alergie: text })
              }
              style={styles.input}
              multiline={true}
            />
            <CustomInputPaper
              label="Medicaments en cours"
              value={formData.medicamentEnCour}
              onChangeText={(text) =>
                setFormaData({ ...formData, medicamentEnCour: text })
              }
              style={styles.input}
              multiline={true}
            />
            {/* definition du btn de validation*/}
            <CustomInputPaper
              label="Poids"
              value={formData.poids}
              onChangeText={(text) =>
                setFormaData({ ...formData, poids: text })
              }
              style={styles.input}
              type="numeric"
            />
            <CustomInputPaper
              label="Taille"
              value={formData.taille}
              onChangeText={(text) =>
                setFormaData({ ...formData, taille: text })
              }
              style={styles.input}
              type="numeric"
            />
            <CustomInputPaper
              label="Tension arterielle"
              value={formData.tension}
              onChangeText={(text) =>
                setFormaData({ ...formData, tension: text })
              }
              style={styles.input}
              type="numeric"
            />
            <CustomInputPaper
              label="poules"
              value={formData.pouls}
              onChangeText={(text) =>
                setFormaData({ ...formData, pouls: text })
              }
              style={styles.input}
              type="numeric"
            />
            <Button
              mode="contained"
              style={[globalStyles.btn, { marginVertical: 20 }]}
            >
              <Text style={globalStyles.buttonText}>Enregistré</Text>
            </Button>
          </Provider>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddPatients;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bleuClaire,
    marginBottom: 30,
  },
  entete: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    marginVertical: 10,
    backgroundColor: colors.grisClair,
  },
  date: {},
  calendar: {
    position: "absolute",
    right: 0,
    marginRight: 20,
    top: "25%",
  },
});
