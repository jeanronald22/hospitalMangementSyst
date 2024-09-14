import { StyleSheet, Text, View } from "react-native";
import React from "react";
import globalStyles from "../../assets/syles generaux/globalStyle";
import { colors } from "../../assets/colors/colors";
import CustomHeader from "../../components/CustomHeader";
import PatientStatsChart from "../../components/PatientStatsChart";
import RendezVStat from "../../components/RendezVStat";

const Consultations = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Avril"], // Les mois
    values: [20, 45, 28, 100], // Nombre de patients par mois
  };
  const datas = {
    labels: ["Jan", "Feb", "Mar", "Avril"], // Les mois
    values: [10, 5, 28, 10], // Nombre de patients par mois
  };

  return (
    <View
      style={[globalStyles.container, { backgroundColor: colors.bleuClaire }]}
    >
      <CustomHeader title={"Statistique "} />
      <View
        style={[globalStyles.contain, { height: "100%", alignItems: "center" }]}
      >
        {data && <PatientStatsChart data={data} />}
        {datas && <RendezVStat data={datas} />}
      </View>
    </View>
  );
};

export default Consultations;

const styles = StyleSheet.create({});
