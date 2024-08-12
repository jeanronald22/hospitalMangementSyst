import { StatusBar } from 'expo-status-bar';
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
} from "@expo-google-fonts/roboto";
import globalStyles from "./assets/syles generaux/globalStyle";
import StackNavigation from "./components/navigation/StackNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AddPatients from "./app/screens/AddPatients";

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
  });
  if (!fontsLoaded) {
    <AppLoading />;
  } else {
    return (
      <SafeAreaProvider style={globalStyles.container}>
        <StatusBar style="auto" />
        <StackNavigation />
        {/* <AddPatients /> */}
      </SafeAreaProvider>
    );
  }
}
