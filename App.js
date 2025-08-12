import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useDispatch } from "react-redux";
import { store } from "./src/store/store";
import AppNavigator from "./src/navigation/AppNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setIdeas } from "./src/store/IdeasSlice";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context"
import "./global.css"
import Toast from "react-native-toast-message";
import { mockStartupIdeas } from "./src/constants"

function App() {

  const dispatch = useDispatch();

  // initialising mock data to async storage

  async function saveMockIdeasToAsyncStorageIfEmpty(mockStartupIdeas) {
    try {
      const existingIdeas = await AsyncStorage.getItem("ideas");
      if (!existingIdeas) {
        await AsyncStorage.setItem("ideas", JSON.stringify(mockStartupIdeas));
        console.log("Mock startup ideas saved to AsyncStorage!");
      } else {
        console.log("Ideas already exist in storage, skipping save.");
      }
    } catch (error) {
      console.error("Failed to save or check ideas in AsyncStorage", error);
    }
  }

  useEffect(() => {
    saveMockIdeasToAsyncStorageIfEmpty(mockStartupIdeas)
    const loadIdeasFromStorage = async () => {
      try {
        const stored = await AsyncStorage.getItem("ideas");
        if (stored) {
          const parsed = JSON.parse(stored);
          dispatch(setIdeas(parsed));
        }
      } catch (e) {
        console.error("Failed to load ideas from AsyncStorage", e);
      }
    };
    loadIdeasFromStorage();
  }, [dispatch]);

  return (<>
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
        <Toast />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  </>
  );
}

export default function AppContent() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
