import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { addRendezVous } from "../../api/dataService";
import React, { useEffect, useState } from "react";
import globalStyles from "../../assets/syles generaux/globalStyle";
import CustomHeader from "../../components/CustomHeader";
import { colors } from "../../assets/colors/colors";
import CustomInputPaper from "../../components/CustomInputPaper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";
import { getPatients } from "../../api/dataService";
import { Button, Divider, Menu, Provider } from "react-native-paper";
import CustomSnackbar from "../../components/CustomSnackbar";
const AddRendezVous = () => {
  // definition des differents state de cette ecrans
  const [data, setData] = useState({
    motif: "",
    date: new Date(Date.now()),
    nomPatient: "",
    id: 0,
  });
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [patient, setPatient] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visibleSnack, setVisibleSnack] = useState(false);
  // ! difinition  des different fonctions
  /**
   *
   * @param {} event information sur l'evennement declencher
   * @param {date} selectedDate la selectionner
   * cette fonction sera appeller pour changer la valeur de date lorsque l'utilisateur aura choisi une date
   */
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || data.date;
    setShow(false);
    setData({ ...data, date: currentDate });
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const fetch = async () => {
    try {
      const patients = await getPatients();
      setPatient(patients);
      return true;
    } catch (error) {}
    return false;
  };

  useEffect(() => {
    fetch();
  }, []);
  console.log(patient);

  const showMenu = () => setVisible(true);
  const hideMenu = () => setVisible(false);

  const handleSelect = (name, id) => {
    setData({ ...data, nomPatient: name, id: id });

    hideMenu();
  };
  // fonction de soummison
  const submit = async () => {
    try {
      const response = await addRendezVous(data);
      setVisibleSnack(true);
    } catch (error) {
      console.error("Erreur lors de l'envoi du rendez-vous :", error);
    }
  };
  return (
    <View
      style={[globalStyles.container, { backgroundColor: colors.bleuClaire }]}
    >
      <CustomHeader
        title="Fixer Un Rendez-Vous"
        subtitle="Veillez à remplir tout les champs "
      />
      <CustomSnackbar
        visible={visibleSnack}
        onDismiss={() => setVisibleSnack(false)}
        message="Ajout du rendez-vous reussie !"
      />

      <View style={[globalStyles.contain, { height: "100%" }]}>
        <CustomInputPaper
          value={data.motif}
          onChangeText={(text) => setData({ ...data, motif: text })}
          multiline={true}
          label="Motif de la visite"
          style={globalStyles.input2}
        />
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <CustomInputPaper
              value={data.date.toLocaleDateString()}
              label="Date"
              style={globalStyles.input2}
            />
            <TouchableOpacity style={styles.position} onPress={showDatepicker}>
              <MaterialIcons
                name="calendar-month"
                size={30}
                color={colors.bleuClaire}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <CustomInputPaper
              value={data.date.toLocaleTimeString()}
              label="Time"
              style={globalStyles.input2}
            />
            <TouchableOpacity style={styles.position} onPress={showTimepicker}>
              <MaterialIcons
                name="access-time-filled"
                size={30}
                color={colors.bleuClaire}
              />
            </TouchableOpacity>
          </View>
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={data.date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )}

        {/* definition du men u */}
        <Provider>
          <Menu
            visible={visible}
            onDismiss={hideMenu}
            anchor={
              <View style={styles.nameContainer}>
                {/* <Text>Selectionner un patient</Text> */}
                <Text>{data.nomPatient}</Text>
                <TouchableOpacity style={styles.position2} onPress={showMenu}>
                  <MaterialIcons
                    name="arrow-drop-down"
                    size={40}
                    color={colors.bleuClaire}
                  />
                </TouchableOpacity>
              </View>
            }
            style={{ marginTop: -330, backgroundColor: colors.grisClair }}
          >
            {patient.map((item, index) => {
              return (
                <View>
                  <Menu.Item
                    key={index}
                    title={item.nom}
                    onPress={() => handleSelect(item.nom, item.id)}
                    style={{ backgroundColor: colors.grisClair }}
                    contentStyle={{ backgroundColor: colors.grisClair }}
                  />
                  {index < patient.length - 1 && <Divider key={index + 1} />}
                </View>
              );
            })}
          </Menu>
          <Button
            style={[globalStyles.btn, { marginVertical: 30 }]}
            mode="contained"
            onPress={submit}
          >
            Enregistré
          </Button>
        </Provider>

        {/* definition du date picker */}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  position: {
    position: "absolute",
    top: "25%",
    left: "78%",
  },
  nameContainer: {
    backgroundColor: colors.grisClair,
    paddingHorizontal: 7,
    paddingVertical: 20,
    marginVertical: 10,
  },
  position2: {
    position: "absolute",
    top: "50%",
    left: "90%%",
  },
});
export default AddRendezVous;
