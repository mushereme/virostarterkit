import React, { useEffect } from "react";
import ARcomponent from "../components/ARcomponent"
import { StyleSheet, View } from "react-native";

import {
    ViroARSceneNavigator,
} from "@reactvision/react-viro";

export default ARscreen = (props) => {

    console.log("$:/name ", props.route.name)

    return (
        <View style={{ flex: 1 }}>
            <ViroARSceneNavigator 
                autofocus={true}
                initialScene={{ 
                    scene: ARcomponent 
                }} 
                style={styles.f1}
            />
        </View>
    )
}

var styles = StyleSheet.create({
    f1: { flex: 1 },
});
  