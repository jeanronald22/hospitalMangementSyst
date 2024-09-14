import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import globalStyles from "../../assets/syles generaux/globalStyle";
import { colors } from "../../assets/colors/colors";
import CustomHeader from "../../components/CustomHeader";
import { FAB, Provider } from "react-native-paper";
import CustomInputPaper from "../../components/CustomInputPaper";
import { updatePatient, updatePatientMedicalInfo } from "../../api/dataService";

const UpdateInfoMedical = ({ route, navigation }) => {
  const data = route.params;
  const [formData, setFormaData] = useState({
    groupeSanguin: data.dossier.groupeSanguin,
    alergie: data.dossier.alergies,
    medicamentEnCour: data.dossier.medicamentEncoure,
    antecedentMedicaux: data.dossier.antecedentsMedicaux,
    poids: `${data.poids}`,
    taille: `${data.taille}`,
    tension: `${data.tension_art}`,
    pouls: `${data.pouls}`,
  });
  // ! definition des fonctions
  const submit = async () => {
    try {
      const response = await updatePatientMedicalInfo(formData, data.id);
    } catch (error) {
      console.log("Erreur ", error);
    }
  };
  return (
    <View
      style={[globalStyles.container, { backgroundColor: colors.bleuClaire }]}
    >
      <CustomHeader title={"Mise à jour des inofrmation "} />
      <View style={[globalStyles.contain, { height: "100%" }]}>
        <Provider>
          <CustomInputPaper
            label="Groupe Sanguin"
            value={formData.groupeSanguin}
            onChangeText={(text) =>
              setFormaData({ ...formData, groupeSanguin: text })
            }
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
          <CustomInputPaper
            label="Antecedent medicaux"
            value={formData.antecedentMedicaux}
            style={styles.input}
            multiline={true}
            onChangeText={(text) =>
              setFormaData({ ...formData, antecedentMedicaux: text })
            }
          />
          {/* definition du btn de validation*/}
          <CustomInputPaper
            label="Poids"
            value={formData.poids}
            onChangeText={(text) => setFormaData({ ...formData, poids: text })}
            style={styles.input}
            type="numeric"
          />
          <CustomInputPaper
            label="Taille"
            value={formData.taille}
            onChangeText={(text) => setFormaData({ ...formData, taille: text })}
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
            onChangeText={(text) => setFormaData({ ...formData, pouls: text })}
            style={styles.input}
            type="numeric"
          />
          <FAB
            style={{ backgroundColor: colors.bleuClaire, marginTop: 20 }}
            label="Modifier"
            color={colors.white}
            onPress={submit}
          />
        </Provider>
      </View>
    </View>
  );
};

export default UpdateInfoMedical;

const styles = StyleSheet.create({
  input: {
    marginVertical: 10,
    backgroundColor: colors.grisClair,
  },
});
