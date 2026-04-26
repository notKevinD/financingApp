import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

type Transaction = {
  type: "income" | "expense";
  amount: number;
};

type FinanceContextType = {
  balance: number;
  transactions: Transaction[];
  addIncome: (amount: number) => void;
  addExpense: (amount: number) => void;
  deleteTransaction: (index: number) => void;
};

const FinanceContext = createContext<FinanceContextType | null>(null);

export const FinanceProvider = ({ children }: any) => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // LOAD
  useEffect(() => {
    const loadData = async () => {
      const savedTransactions = await AsyncStorage.getItem("transactions");
      const savedBalance = await AsyncStorage.getItem("balance");

      if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
      if (savedBalance) setBalance(Number(savedBalance));

      setIsLoaded(true);
    };

    loadData();
  }, []);

  // SAVE
  useEffect(() => {
    if (!isLoaded) return;

    AsyncStorage.setItem("transactions", JSON.stringify(transactions));
    AsyncStorage.setItem("balance", balance.toString());
  }, [transactions, balance, isLoaded]);

  // ACTIONS
  const addIncome = (amount: number) => {
    setBalance((prev) => prev + amount);
    setTransactions((prev) => [...prev, { type: "income", amount }]);
  };

  const addExpense = (amount: number) => {
    setBalance((prev) => prev - amount);
    setTransactions((prev) => [...prev, { type: "expense", amount }]);
  };

  const deleteTransaction = (index: number) => {
    const item = transactions[index];

    if (item.type === "income") {
      setBalance((prev) => prev - item.amount);
    } else {
      setBalance((prev) => prev + item.amount);
    }

    setTransactions((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <FinanceContext.Provider
      value={{
        balance,
        transactions,
        addIncome,
        addExpense,
        deleteTransaction,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

// custom hook
export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) throw new Error("useFinance must be used inside Provider");
  return context;
};
