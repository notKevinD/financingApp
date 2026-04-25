import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [balance, setBalance] = useState(20000);
  const [amount, setAmount] = useState("");
  type Transaction = {
    type: "income" | "expense";
    amount: number;
  };
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const savedTransactions = await AsyncStorage.getItem("transactions");
      const savedBalance = await AsyncStorage.getItem("balance");

      if (savedTransactions) {
        setTransactions(JSON.parse(savedTransactions));
      }

      if (savedBalance) {
        setBalance(Number(savedBalance));
      }

      setIsLoaded(true); // ✅ tandai sudah selesai load
    };

    loadData();
  }, []);

  useEffect(() => {
    if (!isLoaded) return; // ❗ jangan save sebelum load selesai

    const saveData = async () => {
      await AsyncStorage.setItem("transactions", JSON.stringify(transactions));
      await AsyncStorage.setItem("balance", balance.toString());
    };

    saveData();
  }, [transactions, balance, isLoaded]);

  const deleteTransaction = (index: number) => {
    Alert.alert("Hapus Transaksi", "Yakin mau hapus?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Hapus",
        style: "destructive",
        onPress: () => {
          const item = transactions[index];

          // 🔥 update balance sesuai tipe
          if (item.type === "income") {
            setBalance((prev) => prev - item.amount);
          } else {
            setBalance((prev) => prev + item.amount);
          }

          // 🔥 hapus transaksi (cara aman)
          setTransactions((prev) => prev.filter((_, i) => i !== index));
        },
      },
    ]);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#121212",
        padding: 20,
        marginTop: 40,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          color: "white",
          fontWeight: "bold",
        }}
      >
        Rp {balance}
      </Text>

      <Text style={{ color: "gray", marginTop: 5 }}>Total Balance</Text>

      <TextInput
        placeholder="Masukkan jumlah"
        placeholderTextColor="gray"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={{
          backgroundColor: "#1e1e1e",
          borderRadius: 10,
          padding: 12,
          marginTop: 20,
          color: "white",
        }}
      />

      <View style={{ marginTop: 20 }}>
        <Button
          title="Add Income"
          onPress={() => {
            const value = parseInt(amount || "0");
            setBalance((prev) => prev + value);
            setTransactions((prev) => [
              ...prev,
              { type: "income", amount: value },
            ]);
            setAmount("");
          }}
        />
      </View>

      <View style={{ marginTop: 10 }}>
        <Button
          title="Add Expense"
          onPress={() => {
            const value = parseInt(amount || "0");
            setBalance((prev) => prev - value);
            setTransactions((prev) => [
              ...prev,
              { type: "expense", amount: value },
            ]);
            setAmount("");
          }}
        />
      </View>
      <SwipeListView
        style={{ marginTop: 20 }}
        data={transactions}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => {
          const isIncome = item.type === "income";

          return (
            <View
              style={{
                backgroundColor: "#1e1e1e",
                padding: 15,
                borderRadius: 10,
                marginBottom: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: "white" }}>
                {isIncome ? "Income" : "Expense"}
              </Text>

              <Text
                style={{
                  color: isIncome ? "#4CAF50" : "#F44336",
                  fontWeight: "bold",
                }}
              >
                {isIncome ? "+" : "-"} Rp {item.amount}
              </Text>
            </View>
          );
        }}
        renderHiddenItem={({ index }) => (
          <View
            style={{
              flex: 1,
              alignItems: "flex-end",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <View
              style={{
                backgroundColor: "#F44336",
                height: "100%",
                width: 80,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
            >
              <Text
                style={{ color: "white", fontWeight: "bold" }}
                onPress={() => deleteTransaction(index)}
              >
                <MaterialIcons name="delete" size={12} color="white" />
                <Text style={{ color: "white", fontSize: 12 }}>Delete</Text>
              </Text>
            </View>
          </View>
        )}
        rightOpenValue={-80}
      />
    </View>
  );
}
