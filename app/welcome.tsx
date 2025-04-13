import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import Colors from "../constants/Colors";
import MainCard from "components/MainCard";
import Buttons from "components/welcome/Buttons";
import UtilsStyles from "constants/utils";
import HeaderText from "components/HeaderText";

export default function WelcomeScreen() {
  const colorSchema = useColorScheme();
  const themeColor = Colors[colorSchema ?? "light"];
  return (
    <SafeAreaView
      style={[
        UtilsStyles.container,
        { backgroundColor: themeColor.background },
      ]}
    >
      <HeaderText text="Dashboard" />
      <MainCard />
      <Buttons />
    </SafeAreaView>
  );
}

export const screenOptions = {
  headerShown: false,
};
