import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

import Svg, { Path } from "react-native-svg";
import Colors from "constants/Colors";
import UtilsStyles from "constants/utils";

interface ButtonProps {
  onPress: () => void;
  roomName: string;
  roomPower: number;
  IconComponent: () => JSX.Element;
}

const RoomButton = (props: ButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={props.onPress}
      activeOpacity={0.8}
    >
      <View
        style={[
          UtilsStyles.flex,
          UtilsStyles.alignItemsCenter,
          UtilsStyles.justifyContentSapceBetween,
        ]}
      >
        <View
          style={[UtilsStyles.flex, UtilsStyles.alignItemsCenter, { gap: 12 }]}
        >
          <View
            style={{
              backgroundColor: "#EFEFEF",
              padding: 10,
              borderRadius: 50,
            }}
          >
            {props.IconComponent()}
          </View>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              {props.roomName}
            </Text>
            <View style={[UtilsStyles.flex, UtilsStyles.alignItemsCenter]}>
              <Svg
                height="14px"
                viewBox="0 -960 960 960"
                width="14px"
                fill={"orange"}
              >
                <Path d="m422-232 207-248H469l29-227-185 267h139l-30 208ZM320-80l40-280H160l360-520h80l-40 320h240L400-80h-80Zm151-390Z" />
              </Svg>
              <Text style={{ fontSize: 11, marginTop: 2 }}>
                {props.roomPower} W
              </Text>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.status,
            {
              backgroundColor: Colors.light.lightGreen,
            },
          ]}
        >
          <Text style={[styles.statusText, { color: Colors.light.green }]}>
            Active
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 7,
    width: "100%",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    // iOS shadow
    shadowColor: "rgba(0,0,0,0.3)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android shadow
    elevation: 4,
  },
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

export default RoomButton;
