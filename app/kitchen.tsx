import UtilsStyles from "constants/utils";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import Colors from "constants/Colors";
import HeaderText from "components/HeaderText";
import MainCard from "components/MainCard";

export default function Kitchen() {
  const colorSchema = useColorScheme();
  const themeColor = Colors[colorSchema ?? "light"];
  return (
    <SafeAreaView
      style={[
        UtilsStyles.container,
        { backgroundColor: themeColor.background },
      ]}
    >
      <HeaderText text="Kitchen" />
      <MainCard />
    </SafeAreaView>
  );
}
