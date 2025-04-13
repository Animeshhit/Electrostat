import { StyleSheet, View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import ToggleSwitch from "components/ToggleSwitch";
import AntDesign from "@expo/vector-icons/AntDesign";
import Colors from "constants/Colors";
import Svg, { Path } from "react-native-svg";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import UtilsStyles from "constants/utils";
import { TouchableOpacity } from "react-native-gesture-handler";

// firebase
import { ref, onValue } from "firebase/database";
import { database } from "../lib/firebase";
const MainCard = () => {
  const colorScheme = useColorScheme();

  const [mainSwitch, setMainSwitch] = useState(false);
  const [voltage, setVoltage] = useState(0);
  const [powerConsumption, setPowerConsumption] = useState(0);
  const [wifiMode, setWifiMode] = useState(false);

  // // Listen for voltage value in real-time
  useEffect(() => {
    const dashboardRef = ref(database, "dashboard");
    const unsubscribe = onValue(dashboardRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setVoltage(data.currentVoltage || 0);
        setPowerConsumption(data.powerConsumption || 0);
        setMainSwitch(data.powerStatus || false);
        setWifiMode(data.online || false);
      }
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, []);

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colorScheme === "dark" ? "#000" : "#fff" },
      ]}
    >
      {/* cardHeader */}
      <View
        style={[
          UtilsStyles.flex,
          UtilsStyles.alignItemsCenter,
          UtilsStyles.justifyContentSapceBetween,
        ]}
      >
        <View
          style={[UtilsStyles.flex, UtilsStyles.alignItemsCenter, { gap: 9 }]}
        >
          <AntDesign
            name="poweroff"
            size={18}
            color={mainSwitch ? Colors.light.green : "red"}
          />
          <Text style={[styles.cardHeaderTitle]}>Power Status</Text>
        </View>
        <ToggleSwitch isOn={mainSwitch} setIsOn={setMainSwitch} />
      </View>

      {/* voltage card */}
      <View style={[styles.voltageCard]}>
        <View
          style={[UtilsStyles.flex, UtilsStyles.alignItemsCenter, { gap: 4 }]}
        >
          <Svg
            height="18px"
            viewBox="0 -960 960 960"
            width="18px"
            fill={mainSwitch ? "orange" : "gray"}
          >
            <Path d="m422-232 207-248H469l29-227-185 267h139l-30 208ZM320-80l40-280H160l360-520h80l-40 320h240L400-80h-80Zm151-390Z" />
          </Svg>
          <Text style={[styles.voltageCardHeaderTitle]}>Current Voltage</Text>
        </View>
        <View
          style={[
            UtilsStyles.flex,
            UtilsStyles.alignItemsCenter,
            { gap: 2, marginTop: 8, paddingLeft: 8 },
          ]}
        >
          <Text
            style={[styles.value, { color: mainSwitch ? "black" : "gray" }]}
          >
            {mainSwitch ? voltage : 0}
          </Text>
          <Text style={[styles.smallValue]}>V</Text>
        </View>
      </View>
      {/* {currentCard} */}
      <View style={[styles.voltageCard, { marginTop: 16 }]}>
        <View
          style={[UtilsStyles.flex, UtilsStyles.alignItemsCenter, { gap: 4 }]}
        >
          <Svg
            height="18px"
            viewBox="0 -960 960 960"
            width="18px"
            fill={mainSwitch ? "blue" : "gray"}
          >
            <Path d="m140-220-60-60 300-300 160 160 284-320 56 56-340 384-160-160-240 240Z" />
          </Svg>

          <Text style={[styles.voltageCardHeaderTitle]}>Power Consumption</Text>
        </View>
        <View
          style={[
            UtilsStyles.flex,
            UtilsStyles.alignItemsCenter,
            { gap: 2, marginTop: 8, paddingLeft: 8 },
          ]}
        >
          <Text
            style={[styles.value, { color: mainSwitch ? "black" : "gray" }]}
          >
            {mainSwitch ? powerConsumption : 0}
          </Text>
          <Text style={[styles.smallValue]}>W</Text>
        </View>
      </View>
      {/* statusCard */}

      <View
        style={[
          UtilsStyles.flex,
          UtilsStyles.justifyContentSapceBetween,
          UtilsStyles.alignItemsCenter,
          styles.voltageCard,
          { marginTop: 16 },
        ]}
      >
        <View
          style={[UtilsStyles.flex, UtilsStyles.alignItemsCenter, { gap: 5 }]}
        >
          <Ionicons
            name="settings"
            size={18}
            color={mainSwitch ? Colors.light.green : "gray"}
          />
          <Text style={{ fontWeight: "500" }}>Status</Text>
        </View>
        <View
          style={[
            styles.status,
            {
              backgroundColor: mainSwitch
                ? Colors.light.lightGreen
                : Colors.light.lightRed,
            },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              { color: mainSwitch ? Colors.light.green : "red" },
            ]}
          >
            {mainSwitch ? "Active" : " Inactive"}
          </Text>
        </View>
      </View>

      {/* updateStatus */}
      <View
        style={[
          UtilsStyles.flex,
          UtilsStyles.justifyContentSapceBetween,
          UtilsStyles.alignItemsCenter,
          { marginTop: 28 },
        ]}
      >
        <View
          style={[
            UtilsStyles.flex,
            UtilsStyles.alignItemsCenter,
            { gap: 5, paddingHorizontal: 8 },
          ]}
        >
          {wifiMode ? (
            <FontAwesome5 name="wifi" size={15} color="black" />
          ) : (
            <Ionicons name="cellular" size={15} color="black" />
          )}

          <Text style={{ fontSize: 12 }}>
            {wifiMode ? "WIFI Mode" : "AP Mode"}
          </Text>
        </View>
        <TouchableOpacity>
          <EvilIcons name="refresh" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 7,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2, // For Android
  },

  cardHeaderTitle: {
    fontWeight: "900",
    fontSize: 18,
  },
  voltageCard: {
    marginTop: 25,
    borderWidth: 0.2,
    borderColor: "rgba(0,0,0,0.2)",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 7,
  },

  voltageCardHeaderTitle: {
    fontWeight: "500",
    fontSize: 15,
  },
  value: {
    fontWeight: "900",
    fontSize: 28,
  },

  smallValue: { fontSize: 16, color: "rgba(0,0,0,0.6)" },
  status: {
    paddingVertical: 5,
    borderRadius: 25,
    paddingHorizontal: 10,
  },
  statusText: {
    fontWeight: "500",
    fontSize: 12,
  },
});

export default MainCard;
