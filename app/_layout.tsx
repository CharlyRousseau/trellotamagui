import { Suspense, useEffect } from "react";
import { useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { TamaguiProvider, Text, Theme } from "tamagui";
import config from "../tamagui.config";
import { AuthProvider } from "../context/AuthContextProvider";
import { ProgressProvider } from "../context/ProgressLoadingContext";
import { CardUpdateProvider } from "../context/CardUpdateContext";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf")
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <AuthProvider>
      <ProgressProvider>
        <CardUpdateProvider>
          <TamaguiProvider config={config}>
            <Suspense fallback={<Text>Loading...</Text>}>
              <Theme name={colorScheme}>
                <ThemeProvider
                  value={colorScheme === "light" ? DefaultTheme : DarkTheme}
                >
                  <Stack
                    screenOptions={{
                      headerShown: false
                    }}
                  />
                </ThemeProvider>
              </Theme>
            </Suspense>
          </TamaguiProvider>
        </CardUpdateProvider>
      </ProgressProvider>
    </AuthProvider>
  );
}
