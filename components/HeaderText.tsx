import { Text, useColorScheme } from "react-native";
import Colors from "constants/Colors";
const HeaderText = ({ text }: { text: string }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  return (
    <Text
      style={{
        fontWeight: "bold",
        fontSize: 25,
        paddingVertical: 25,
        color: theme.text,
      }}
    >
      {text}
    </Text>
  );
};

export default HeaderText;
