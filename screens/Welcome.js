import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from "react-native-reanimated";
import LinearGradient from 'react-native-linear-gradient';

const Welcome = ({ navigation }) => {
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleButtonPress = () => {
    setButtonLoading(true); // Set button loading state
    setTimeout(() => {
      setButtonLoading(false); // Reset button loading state after simulated delay
      navigation.navigate("HomeScreen");
    }, 1000); // Simulate a loading period
  };

  const { height: screenHeight } = Dimensions.get("window");
  const titleFontSize = screenHeight * 0.025; // Adjust multiplier as needed

  // Animation durations (in milliseconds)
  const titleAnimationDuration = 500;
  const buttonAnimationDuration = 1000;

  // Shared values for animations
  const titleOpacity = useSharedValue(0);
  const buttonOpacity = useSharedValue(0);

  // Animated styles
  const titleStyle = useAnimatedStyle(() => {
    return {
      opacity: withSpring(titleOpacity.value, { duration: titleAnimationDuration }),
      transform: [{ translateY: withSpring(titleOpacity.value * 10) }], // Example transform animation
    };
  });

  const buttonStyle = useAnimatedStyle(() => {
    return {
      opacity: withSpring(buttonOpacity.value, { duration: buttonAnimationDuration }),
      transform: [{ translateY: withSpring(-buttonOpacity.value * 10) }], // Fades up (negative value moves up)
    };
  });

  // Trigger animations on component mount
  React.useEffect(() => {
    // Title animation (fades in from bottom)
    setTimeout(() => {
      titleOpacity.value = withSpring(1, { duration: titleAnimationDuration });
    }, 500); // Delay title animation

    // Button animation (fades in from top)
    setTimeout(() => {
      buttonOpacity.value = withSpring(1, { duration: buttonAnimationDuration });
    }, 750); // Delay button animation

  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <View style={styles.content}>
        <Image
          style={styles.logo}
          source={require("./../res/icons/Khanbogd_Logo.png")}
        />
        <Animated.Text
          style={[styles.title, titleStyle, { fontSize: titleFontSize }]}
        >
          {"Галбын голын шаргал\nговьд тавтай морилно уу"}
        </Animated.Text>
      </View>

      <View style={styles.loadingContainer}>
        {buttonLoading && <ActivityIndicator size="large" color="#FFA500" />}
      </View>

      <View style={styles.buttonContainer}>
        <Animated.View
          style={[styles.buttonWrapper, buttonStyle]}
        >
          <TouchableOpacity
            style={[styles.button, buttonLoading && styles.buttonDisabled]}
            onPress={handleButtonPress}
            disabled={buttonLoading}
          >
            <LinearGradient
              colors={['#F37D24', '#f3971f', '#F3AA1A']}
              start={{ x: 0, y: 1 }} // Button fades up (y: 1)
              end={{ x: Math.cos(30 * Math.PI / 180), y: Math.sin(30 * Math.PI / 180) }}
              style={styles.gradientBackground}
            >
              <Text style={styles.buttonText}>Эхлэх</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
  },
  content: {
    flex: 0.4, // Adjusted to take 40% of the height
    justifyContent: "center",
    alignItems: "center",
    marginTop: 150, // Add margin top to create space between content and status bar
  },
  logo: {
    width: windowWidth * 0.5,
    height: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    textAlign: "center",
    color: "black",
    marginHorizontal: 20,
    lineHeight: 24,
    marginTop: 20, // Add margin top to create space between logo and title
  },
  loadingContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 150, // Adjust this value to position the button closer to the bottom
    flex: 0.5, // Adjusted to take 50% of the height
    justifyContent: "flex-end", // Align the button to the bottom of the container
  },
  buttonWrapper: {
    width: "80%",
  },
  button: {
    borderRadius: 20,
  },
  buttonDisabled: {
    opacity: 0.7, // Adjust opacity to indicate disabled state
  },
  gradientBackground: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});

export default Welcome;
