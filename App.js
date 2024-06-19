import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Image, View } from "react-native";
import HomeScreen from "./screens/Home";
import ServiceScreen from "./screens/Service";
import Welcome from "./screens/Welcome";
import ARScreen from "./screens/ARScreen";
import { enableScreens } from "react-native-screens";
import { LanguageProvider } from "./components/context/language";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useColorScheme } from "nativewind";

import "./global.css";

// Import your PNG images
import IntroIcon from "./res/icons/star_gray.png";
import ARIcon from "./res/icons/ar.png";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
enableScreens(true);

function Root() {
  const {colorScheme, setColorScheme} = useColorScheme()

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          paddingVertical: 5,
          marginHorizontal: 10,
          marginBottom: 5,
          borderRadius: 40,
          backgroundColor: colorScheme == "light" ? "white" : "#595959",
          position: "absolute",
        },
        tabBarLabelStyle: { paddingBottom: 3 },
      }}
    >
      <Tab.Screen
        name="Intro"
        component={HomeScreen}
        options={{
          title: "Танилцуулга",
          tabBarIcon: ({ size, color, focused }) => (
            <View style={{ width: 24, height: 24, alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={IntroIcon}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  resizeMode: 'contain', 
                  tintColor: focused ? color : '#888' 
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="AR"
        component={ARScreen}
        options={{
          title: "AR",
          tabBarIcon: ({ size, color, focused }) => (
            <View style={{ width: 24, height: 24, alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={ARIcon}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  resizeMode: 'contain', 
                  tintColor: focused ? color : '#888' 
                }}
              />
            </View>
          ),
          unmountOnBlur: true
        }}
      />
      <Tab.Screen
        name="360"
        component={ARScreen}
        options={{
          title: "Үйлчилгээ",
          tabBarIcon: ({ size, color, focused }) => (
            <View style={{ width: 24, height: 24, alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={IntroIcon}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  resizeMode: 'contain', 
                  tintColor: focused ? color : '#888' 
                }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const YourApp = () => {


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <LanguageProvider>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="Welcome"
          >
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="HomeScreen" component={Root} />
          </Stack.Navigator>
        </LanguageProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default YourApp;
