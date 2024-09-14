import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import WelcomeScreen from "../../app/screens/WelcomeScreen";
import LoginScreen from "../../app/screens/LoginScreen";
import { colors } from "../../assets/colors/colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Patiens from "../../app/screens/Patiens";
import RendezVous from "../../app/screens/RendezVous";
import Consultations from "../../app/screens/Consultations";
import { Dimensions, Keyboard } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AddPatients from "../../app/screens/AddPatients";
import PatientsDetails from "../../app/screens/PatientsDetails";
import UpdatePatients from "../../app/screens/UpdatePatients";
import AddRendezVous from "../../app/screens/AddRendezVous";
import ConsultationDetail from "../../app/screens/ConsultationDetail";
import Profil from "../../app/screens/Profil";
import AjouterConsultation from "../../app/screens/AjouterConsultation";
import PatientInfo from "../../app/screens/PatientInfo";
import RendeVousByPatient from "../../app/screens/RendeVousByPatient";
import AjoutRDV from "../../app/screens/AjoutRDV";
import InfoMedical from "../../app/screens/InfoMedical";
import UpdateInfoMedical from "../../app/screens/UpdateInfoMedical";
import ConsultationByPatient from "../../api/ConsultationByPatient";
import PrescriptionByPatient from "../../app/screens/PrescriptionByPatient";
import Note from "../../app/screens/Note";

const StackNavigation = () => {
  useEffect(() => {
    const dimensionChangeHandler = () => {
      // handle dimension change
    };
    const keyboardShowHandler = () => {
      // handle keyboard show
    };

    const dimensionSubscription = Dimensions.addEventListener(
      "change",
      dimensionChangeHandler
    );
    const keyboardShowSubscription = Keyboard.addListener(
      "keyboardDidShow",
      keyboardShowHandler
    );

    return () => {
      dimensionSubscription?.remove();
      keyboardShowSubscription.remove();
    };
  }, []);

  const Stack = createNativeStackNavigator();
  const Tabs = createBottomTabNavigator();
  const BottomTabNavigator = () => {
    return (
      <Tabs.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: colors.bleuMoyen,
          tabBarIcon: ({ focused, color, size }) => {
            color = focused ? colors.bleuMoyen : colors.grisMoyen;
            size = focused ? 28 : 24;
            let iconeName;
            switch (route.name) {
              case "Patients":
                iconeName = "groups";
                break;
              case "Rendez-vous":
                iconeName = "event";
                break;
              case "Statistique":
                iconeName = "bar-chart";
                break;
              case "Prescriptions":
                iconeName = "receipt-long";
                break;
              case "Profil":
                iconeName = "person";
                break;
              default:
                break;
            }
            return <MaterialIcons name={iconeName} size={size} color={color} />;
          },
        })}
      >
        <Tabs.Screen name="Patients" component={Patiens} />
        <Tabs.Screen name="Rendez-vous" component={RendezVous} />
        <Tabs.Screen name="Statistique" component={Consultations} />
        <Tabs.Screen name="Profil" component={Profil} />
      </Tabs.Navigator>
    );
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          contentStyle: { backgroundColor: colors.white },
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={BottomTabNavigator} />
        <Stack.Screen name="Ajouter patient" component={AddPatients} />
        <Stack.Screen name="Details" component={PatientsDetails} />
        <Stack.Screen name="Mise à jour" component={UpdatePatients} />
        <Stack.Screen name="Ajout Rendez-vous" component={AddRendezVous} />
        <Stack.Screen
          name="Consultation Details"
          component={ConsultationDetail}
        />
        <Stack.Screen
          name="Ajoute Consultation"
          component={AjouterConsultation}
        />
        <Stack.Screen name="Information" component={PatientInfo} />
        <Stack.Screen
          name="Rendez-vous par patient"
          component={RendeVousByPatient}
        />
        <Stack.Screen name="Ajout RDV" component={AjoutRDV} />
        <Stack.Screen name="Info Medical" component={InfoMedical} />
        <Stack.Screen
          name="Modfier Info Medical"
          component={UpdateInfoMedical}
        />
        <Stack.Screen
          name="Consultation par patient"
          component={ConsultationByPatient}
        />
        <Stack.Screen
          name="PrescriptionByPatient"
          component={PrescriptionByPatient}
        />
        <Stack.Screen name="Note" component={Note} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default StackNavigation;
