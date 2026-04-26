import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "utama",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen name="income" options={{ title: "Income" }} />
      <Tabs.Screen name="expense" options={{ title: "Expense" }} />
    </Tabs>
  );
}

// import { FinanceProvider } from "../../context/FinanceContext";

// export default function RootLayout() {
//   return (
//     <FinanceProvider>
//       {/* tabs atau stack kamu */}
//     </FinanceProvider>
//   );
// }
