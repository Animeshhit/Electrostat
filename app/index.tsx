import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import Colors from "../constants/Colors";
import MainCard from "components/MainCard";
import Buttons from "components/welcome/Buttons";
import UtilsStyles from "constants/utils";
import HeaderText from "components/HeaderText";
import React, { useState, useEffect, useRef } from "react";

//firebase
import { ref, onValue, update } from "firebase/database";
import { database } from "../lib/firebase";
import { ScrollView } from "react-native-gesture-handler";

export default function WelcomeScreen() {
  const colorSchema = useColorScheme();
  const themeColor = Colors[colorSchema ?? "light"];

  const [mainSwitch, setMainSwitch] = useState(0);
  const [voltage, setVoltage] = useState(0);
  const [powerConsumption, setPowerConsumption] = useState(0);
  const [wifiMode, setWifiMode] = useState(0);

  const isFirstRun = useRef(true);

  useEffect(() => {
    const dashboardRef = ref(database, "dashboard");
    const unsubscribe = onValue(dashboardRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setVoltage(Math.round(data.currentVoltage) || 0);
        setPowerConsumption(Math.round(data.powerConsumption) || 0);
        setMainSwitch(data.powerStatus || 0);
        setWifiMode(data.online || 0);
      }
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, []);

  // Write powerStatus to Firebase when mainSwitch changes (skip first load)
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    const dashboardRef = ref(database, "dashboard");
    update(dashboardRef, {
      powerStatus: mainSwitch,
    }).catch((error) => {
      console.error("Failed to update powerStatus:", error);
    });
  }, [mainSwitch]);

  return (
    <SafeAreaView
      style={[
        UtilsStyles.container,
        { backgroundColor: themeColor.background },
      ]}
    >
      <ScrollView>
        <HeaderText text="Dashboard" />
        <MainCard
          mainSwitch={mainSwitch}
          setMainSwitch={setMainSwitch}
          voltage={voltage}
          powerConsumption={powerConsumption}
          wifiMode={wifiMode}
        />
        <Buttons />
      </ScrollView>
    </SafeAreaView>
  );
}

export const screenOptions = {
  headerShown: false,
};
