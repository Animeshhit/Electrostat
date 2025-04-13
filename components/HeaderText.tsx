import { Text } from "react-native";
const HeaderText = ({ text }: { text: string }) => {
  return (
    <Text style={{ fontWeight: "bold", fontSize: 25, paddingVertical: 25 }}>
      {text}
    </Text>
  );
};

export default HeaderText;
