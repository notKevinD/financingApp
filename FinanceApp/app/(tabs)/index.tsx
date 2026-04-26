import { MaterialIcons } from "@expo/vector-icons";
// import { useState } from "react";
import { Text, View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { useFinance } from "../../context/FinanceContext";

export default function Home() {
  // const [isLoaded, setIsLoaded] = useState(false);

  const { balance, transactions, deleteTransaction } = useFinance();

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
