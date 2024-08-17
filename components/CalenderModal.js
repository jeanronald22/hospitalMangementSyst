import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, Dialog, Portal } from "react-native-paper";
import { Calendar, CalendarList, LocaleConfig } from "react-native-calendars";
import { colors } from "../assets/colors/colors";

const CalenderModal = ({
  visible,
  onDismiss,
  onDateSelect,
  value,
  dateChange,
}) => {
  LocaleConfig.locales["fr"] = {
    monthNames: [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ],
    monthNamesShort: [
      "Janv.",
      "Févr.",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juil.",
      "Août",
      "Sept.",
      "Oct.",
      "Nov.",
      "Déc.",
    ],
    dayNames: [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
    ],
    dayNamesShort: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
    today: "Aujourd'hui",
  };
  LocaleConfig.defaultLocale = "fr";
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Selectionnez une Date</Dialog.Title>
      </Dialog>
      <Dialog.Content>
        <Calendar
          onDayPress={dateChange}
          markedDates={{
            [value]: { selected: true, selectedColor: colors.bleuMoyen },
          }}
          theme={{
            backgroundColor: "white",
            calendarBackground: "white",
            textSectionTitleColor: "#b6c1c6",
            selectedDayBackgroundColor: "#00adf5",
            selectedDayTextColor: "#ffffff",
          }}
        />
      </Dialog.Content>
      <Dialog.Actions>
        <Button>Confirmer</Button>
        <Button onPress={onDismiss}>Anuller</Button>
      </Dialog.Actions>
    </Portal>
  );
};

export default CalenderModal;

const styles = StyleSheet.create({});
