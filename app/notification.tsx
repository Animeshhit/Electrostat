import { Text, useColorScheme, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import UtilsStyles from "constants/utils";
import Colors from "constants/Colors";

//firebase


const Notification = () => {
  const colorSchema = useColorScheme();
  const themeColor = Colors[colorSchema ?? "light"];
  return (
    <SafeAreaView
      style={[
        UtilsStyles.container,
        { backgroundColor: themeColor.background },
      ]}
    >
      <Text style={[styles.Header, { color: themeColor.text }]}>
        Notifications
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Header: {
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default Notification;
