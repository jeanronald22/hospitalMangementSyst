import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { BarChart, LineChart } from "react-native-chart-kit";
import { colors } from "../assets/colors/colors";
import globalStyles from "../assets/syles generaux/globalStyle";

const screenWidth = Dimensions.get("window").width;
const RendezVStat = ({ data }) => {
  const chartData = {
    labels: data.labels, // peridoe (ex ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun])
    datasets: [
      {
        data: data.values, // data des patients (ex [20, 30, 10, 50, 40, 60])
      },
    ],
  };
  return (
    <View
      style={{ justifyContent: "center", alignItems: "center", width: "100%" }}
    >
      <Text style={[globalStyles.subHeader, { textAlign: "center" }]}>
        Nombre de Rendez-vous sur les 4 derniers mois
      </Text>
      <BarChart
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        data={chartData}
        width={screenWidth - 16}
        height={220}
        chartConfig={{
          backgroundColor: colors.bleuClaire,
          backgroundGradientFrom: colors.bleuClaire,
          backgroundGradientTo: colors.white,
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
      />
    </View>
  );
};

export default RendezVStat;

const styles = StyleSheet.create({});
