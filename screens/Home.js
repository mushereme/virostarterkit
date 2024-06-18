import { View, SafeAreaView, Text } from "react-native";
import classNames from "../src/classNames";
import { useLanguageContext } from "../components/context/language";


const Home = ({ navigation, route }) => {
  const { isMn } = useLanguageContext();

  return (
    <SafeAreaView
      className={classNames("w-full h-full bg-[#F9F9F9] dark:bg-[#404040]")}
    >
      <View className="flex-col flex-1">
        <Text>test</Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;
