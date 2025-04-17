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
import useStore from "store/store";
import FaultCard from "components/FaultCard";

export default function WelcomeScreen() {
  const colorSchema = useColorScheme();
  const themeColor = Colors[colorSchema ?? "light"];

  const [voltage, setVoltage] = useState(0);
  const [powerConsumption, setPowerConsumption] = useState(0);

  const {
    setStatus,
    togglePower,
    status,
    powerStatus,
    underVoltage,
    surge,
    earthFault,
    overCurrent,
    setEarthFault,
    setOverCurrent,
    setUnderVoltage,
    setSurge,
  } = useStore();

  const isFirstRun = useRef(true);

  //set voltage and current
  useEffect(() => {
    const dashboardRef = ref(database, "dashboard");

    const unsubscribe = onValue(dashboardRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setVoltage(Math.round(data.currentVoltage) || 0);
        setPowerConsumption(Math.round(data.powerConsumption) || 0);

        setStatus(data.online || 0);
      }
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, []);

  //getting the mainSwitch on
  useEffect(() => {
    const rooms = ref(database, "rooms");
    const unsubscribe = onValue(rooms, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        togglePower(data.powerStatus);
      }
    });
    return () => unsubscribe();
  }, []);

  // Write powerStatus to Firebase when mainSwitch changes (skip first load)
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    const roomsRef = ref(database, "rooms");
    const officeRef = ref(database, "rooms/office");
    const livingRef = ref(database, "rooms/living");
    const kitchenRef = ref(database, "rooms/kitchen");

    update(roomsRef, {
      powerStatus: powerStatus,
    }).catch((error) => {
      console.error("Failed to update powerStatus:", error);
    });

    if (powerStatus == 0) {
      update(officeRef, {
        status: powerStatus,
      }).catch((error) => {
        console.error("Failed to update powerStatus:", error);
      });

      update(livingRef, {
        status: powerStatus,
      }).catch((error) => {
        console.error("Failed to update powerStatus:", error);
      });
      update(kitchenRef, {
        status: powerStatus,
      }).catch((error) => {
        console.error("Failed to update powerStatus:", error);
      });
    }
  }, [powerStatus, earthFault, underVoltage, surge]);

  // fault
  useEffect(() => {
    const data = ref(database, "protection");
    const unsubscribe = onValue(data, (snap) => {
      const info = snap.val();
      if (info !== null) {
        setEarthFault(info.earthfault);
        setSurge(info.surge);
        setUnderVoltage(info.underVoltage);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const roomsRef = ref(database, "rooms");
    const officeRef = ref(database, "rooms/office");
    const livingRef = ref(database, "rooms/living");
    const kitchenRef = ref(database, "rooms/kitchen");
    if (earthFault === 1 || surge === 1 || underVoltage === 1) {
      update(roomsRef, {
        powerStatus: 0,
      }).catch((error) => {
        console.error("Failed to update powerStatus:", error);
      });
      update(livingRef, {
        status: 0,
      }).catch((error) => {
        console.error("Failed to update powerStatus:", error);
      });
      update(officeRef, {
        status: 0,
      }).catch((error) => {
        console.error("Failed to update powerStatus:", error);
      });
      update(kitchenRef, {
        status: 0,
      }).catch((error) => {
        console.error("Failed to update powerStatus:", error);
      });
    }
  }, [earthFault, surge, underVoltage]);

  return (
    <SafeAreaView
      style={[
        UtilsStyles.container,
        { backgroundColor: themeColor.background },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <HeaderText text="Dashboard" />
        <MainCard
          mainSwitch={powerStatus}
          setMainSwitch={togglePower}
          voltage={voltage}
          powerConsumption={powerConsumption}
          wifiMode={status}
        />
        <Buttons />
        <FaultCard faultName="Earth Fault" fault={earthFault} />
        <FaultCard faultName="Over Current" fault={overCurrent} />
        <FaultCard faultName="Under Voltage" fault={underVoltage} />
        <FaultCard faultName="Surge" fault={surge} />
      </ScrollView>
    </SafeAreaView>
  );
}

export const screenOptions = {
  headerShown: false,
};
