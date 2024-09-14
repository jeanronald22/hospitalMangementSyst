import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { BarChart, LineChart } from "react-native-chart-kit";
import { colors } from "../assets/colors/colors";
import globalStyles from "../assets/syles generaux/globalStyle";

const screenWidth = Dimensions.get("window").width;
const PatientStatsChart = ({ data }) => {
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
        Nombre de Patient sur les 4 derniers mois
      </Text>
      <LineChart
        data={chartData}
        width={screenWidth - 16} // Largeur du graphe
        height={220} // Hauteur du graphe
        chartConfig={{
          backgroundColor: "#1cc910",
          backgroundGradientFrom: colors.bleuClaire,
          backgroundGradientTo: colors.white,
          decimalPlaces: 0, // Pas de décimales
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: colors.white,
          },
        }}
        bezier // Pour un effet de courbe lissée
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default PatientStatsChart;

const styles = StyleSheet.create({});
