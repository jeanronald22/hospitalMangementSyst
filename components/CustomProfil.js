import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import globalStyles from "../assets/syles generaux/globalStyle";
import { Avatar, Card, Icon } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../assets/colors/colors";
import { useNavigation } from "@react-navigation/native";

const CustomProfil = ({ nom, prenom, email, handlePress }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons
            name="arrow-back-ios"
            size={28}
            color={colors.blueFonce}
          />
        </TouchableOpacity>
        <Text style={[globalStyles.header, { marginVertical: 20 }]}>
          Dossier Patient
        </Text>
      </View>

      <Card
        style={{
          backgroundColor: colors.bleuClaire,
          paddingVertical: 10,
          marginVertical: 10,
        }}
      >
        <Card.Title
          left={(props) => (
            <Avatar.Image
              {...props}
              source={require("../assets/images/profil.jpg")}
              size={50}
            />
          )}
          right={(props) => (
            <TouchableOpacity onPress={handlePress}>
              <MaterialIcons
                {...props}
                name="arrow-forward-ios"
                size={28}
                color="white"
                style={{ padding: 15 }}
              />
            </TouchableOpacity>
          )}
          title={
            <Text
              style={[
                {
                  fontFamily: "Roboto_500Medium",
                  color: colors.white,
                  fontSize: 20,
                },
              ]}
            >
              {nom} {prenom}
            </Text>
          }
          subtitle={<Text style={globalStyles.subtitle}>{email}</Text>}
        />
        {/* <Card.Content>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            malesuada mollis libero, at elementum felis consectetur non.
          </Text>
        </Card.Content> */}
      </Card>
    </View>
  );
};

export default CustomProfil;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    // padding: 10,
  },
});
