import { SafeAreaProvider } from "react-native-safe-area-context";
import Index from "./index";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Index />
    </SafeAreaProvider>
  );
}
