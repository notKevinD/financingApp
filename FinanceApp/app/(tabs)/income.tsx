import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { useFinance } from "../../context/FinanceContext";
export default function IncomeScreen() {
  const [amount, setAmount] = useState("");
  const { addIncome } = useFinance();
  return (
    <View style={{ flex: 1, backgroundColor: "#121212", padding: 20 }}>
      <Text style={{ color: "white", fontSize: 20 }}>Add Income</Text>

      <TextInput
        placeholder="Jumlah income"
        placeholderTextColor="gray"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={{
          backgroundColor: "#1e1e1e",
          borderRadius: 10,
          padding: 12,
          marginTop: 20,
          marginBottom: 50,
          color: "white",
        }}
      />

      <Button
        title="Save Income"
        onPress={() => {
          addIncome(Number(amount));
          setAmount("");
        }}
      />
    </View>
  );
}
