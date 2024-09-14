import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import globalStyles from "../../assets/syles generaux/globalStyle";
import { colors } from "../../assets/colors/colors";
import CustomHeader from "../../components/CustomHeader";
import { MaterialIcons } from "@expo/vector-icons";
import { Button, TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import AddRendezVous from "./AddRendezVous";
import { addRendezVous } from "../../api/dataService";
import CustomSnackbar from "../../components/CustomSnackbar";
import { useNavigation } from "@react-navigation/native";

const AjoutRDV = ({ route }) => {
  const patientId = route.params;
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({
    motif: "",
    date: new Date(Date.now()),
    id: patientId,
  });
  // ! definition des fonction
  const onChange = (event, selected) => {
    currendDate = selected || data.date;
    setShow(false);
    setData({ ...data, date: currentDate });
  };
  const submit = async () => {
    try {
      const response = await addRendezVous(data);
      setVisible(true);
    } catch (error) {
      console.log("Erreur ", error);
    }
  };
  return (
    <View
      style={[globalStyles.container, { backgroundColor: colors.bleuClaire }]}
    >
      <CustomHeader title="Ajouter un Rendez-Vous" />
      <CustomSnackbar
        visible={visible}
        message={"Rend-vousz ajouter avex success"}
      />
      <View style={[globalStyles.contain, { height: "100%" }]}>
        <TextInput
          mode="outlined"
          label="Motif de la consultation"
          style={globalStyles.input3}
          activeOutlineColor={colors.bleuClaire}
          //   outlineColor={colors.bleuClaire}
          value={data.motif}
          onChangeText={(text) => setData({ ...data, motif: text })}
        />
        <View>
          <TextInput
            mode="outlined"
            label={"Date de Rende-vous"}
            style={globalStyles.input3}
            value={data.date.toDateString()}
            activeOutlineColor={colors.bleuClaire}
          />
          <TouchableOpacity
            style={{ position: "absolute", top: "30%", left: "86%" }}
            onPress={() => setShow(true)}
          >
            <MaterialIcons
              name="calendar-month"
              size={28}
              color={colors.bleuClaire}
            />
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              onChange={onChange}
              value={data.date}
              is24Hour={true}
              display="default"
              testID="DateTimePicker"
              mode="date"
            />
          )}
        </View>
        <Button
          mode="contained"
          style={{
            marginTop: 20,
            backgroundColor: colors.bleuClaire,
            padding: 5,
          }}
          onPress={submit}
        >
          Enregistrer
        </Button>
      </View>
    </View>
  );
};

export default AjoutRDV;
const styles = StyleSheet.create({});
