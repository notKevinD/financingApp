import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useFinance } from "../../context/FinanceContext";
export default function ExpenseScreen() {
  const [amount, setAmount] = useState("");
  const { addExpense } = useFinance();
  return (
    <View style={{ flex: 1, backgroundColor: "#121212", padding: 20 }}>
      <Text style={{ color: "white", fontSize: 20 }}>Add Expense</Text>

      <TextInput
        placeholder="Jumlah expense"
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
        title="Save Expense"
        onPress={() => {
          addExpense(Number(amount));
          setAmount("");
        }}
      />
    </View>
  );
}
