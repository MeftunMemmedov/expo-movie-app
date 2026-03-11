import { secondary_black } from "@/constants/colors";
import { View, Text, StyleSheet, TextInput } from "react-native";

interface Props {
  name: string;
  value: string;
  onChange: (text: string) => void;
}

const Input = ({ name, value, onChange }: Props) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputTitle}>{name}</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={"gray"}
        placeholder={`Enter your ${name}`}
        onChangeText={onChange}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: { },
  inputTitle: { color: "white", marginBottom: 10 },
  input: {
    backgroundColor: secondary_black,
    borderRadius: 10,
    paddingHorizontal: 20,
    color:"white"
  },
});
