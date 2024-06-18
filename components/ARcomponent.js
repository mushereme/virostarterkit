import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroText,
  ViroSpotLight,
  ViroTrackingStateConstants,
  ViroVideo,
  ViroOmniLight,
  ViroMaterials,
  ViroARImageMarker,
  ViroARTrackingTargets,
  Viro3DObject,
  ViroAnimations,
  ViroNode,
  ViroQuad,
  ViroButton
} from "@reactvision/react-viro";
import React, { useRef, useState } from "react";
import { StyleSheet } from "react-native";
  
const HelloWorldSceneAR = () => {

  const videoRef = useRef();
  const [playVideoAnimation, setPlayVideoAnimation] = useState(false);
  const [videoAnimationName, setVideoAnimationString] = useState("showVideo");
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false);

  const [text, setText] = useState("Initializing AR...");
  const [videoStatus, setVideoStatus] = useState("not ready");
  const [videoPaused, setVideoPaused] = useState(false);

  const [state, setState] = useState({
    pauseUpdates: false,
    playAnim: false,
    modelAnim: false,
    loopState: false,
    animationName: "01",
    videoUrl: require("../res/sq.mp4")
  })
  
  const onInitialized = (state, reason) => {
    console.log("onInitialized", state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText("Hello World!");
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      // Handle loss of tracking
    }
  }
  const handleAnchorFound = () => {
    console.log("$:/handle anchor found");

    setState({
      ...state,
      pauseUpdates: true,
      playAnim: true,
      modelAnim: true
    })
  }

  const handleAnimationFinish = (value) => {

    console.log("value ", value)

    setState({
      ...state,
      animationName: "02",
      loopState: true
    })
  }

  const handleModelLoad = (value) => {

    // console.log("$:/model load ", value);
  }

  const handleButtonIntro = (value) => {

    console.log("$:/button intro ", value);
    setState({
      ...state,
      videoUrl: require("../res/sq.mp4")
    })
  }

  const handleButtonAgenda = (value) => {

    console.log("$:/button agenda ", value);
    setState({
      ...state,
      videoUrl: require("../res/video.mp4")
    })
  }

  const handleButtonService = (value) => {

    console.log("$:/button service ", value);
    setState({
      ...state,
      videoUrl: require("../res/test.mp4")
    })
  }

  return (         
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroARImageMarker
        target="video"
        onAnchorFound={handleAnchorFound}   
      >
        <ViroNode
          rotation={[-90, 0, 0]}
          position={[0, -0.02, 0]}
        >          
          <ViroVideo
            width={1}
            height={3}
            source={state.videoUrl} // source={{ uri: 'https://www.w3schools.com/html/mov_bbb.mp4' }}
            scale={[0.2, 0.1, 0]}
            position={[0.12, 0.04, 0]}
            loop={true}
            paused={videoPaused}
            materials={["chromaKeyFilteredVideo"]}
            onBufferEnd={() => setVideoStatus("playing")}
            onFinish={() => setVideoStatus("finished")}
          />
        </ViroNode>

        <ViroNode
          position={[0, 0, 0]}
          scale={[0, 0, 0]}
          rotation={[-90, 0, 0]}
          dragType="FixedToWorld"
          onDrag={() => {}}
          animation={{
            name: "scaleModel", run: state.playAnim
          }}
        >
          <Viro3DObject 
            onLoadEnd={handleModelLoad}
            source={require('../res/blackpanther/object_bpanther_anim.vrx')}
            // source={require('../res/bee/beedrill.vrx')}
            resources={
              [
                require('../res/blackpanther/object_bpanther_Base_Color.png'),
                require('../res/blackpanther/object_bpanther_Metallic.png'),
                require('../res/blackpanther/object_bpanther_Mixed_AO.png'),
                require('../res/blackpanther/object_bpanther_Normal_OpenGL.png'),
                require('../res/blackpanther/object_bpanther_Roughness.png')
              ]
            }
            scale={[0.04, 0.04, 0.04]}
            position={[0, 0, 0]}
            animation={{
              name: state.animationName, 
              run: state.modelAnim, 
              loop: state.loopState, 
              onFinish: handleAnimationFinish,
            }}
            type="VRX"
          />
        </ViroNode>
      </ViroARImageMarker>
      
      <ViroNode
        // scale={[0, 0, 0]}
        position={[-0.25, 0.1, -0.5]}
        rotation={[0, 25, 0]}
        dragType="FixedToWorld"
      >
        <ViroButton
          source={require("../res/button/intro-main.png")}
          gazeSource={require("../res/button/intro-anim.png")}
          tapSource={require("../res/button/intro-anim.png")}
          position={[0, -0.03, 0]}
          scale={[0.1, 0.1, 0.1]}
          height={0.5}
          width={1.5}
          onClick={handleButtonIntro}
        />
      </ViroNode>
      
      <ViroNode
        // scale={[0, 0, 0]}
        position={[-0.25, 0, -0.5]}
        rotation={[0, 25, 0]}
        dragType="FixedToWorld"
      >
        <ViroButton
          source={require("../res/button/agenda-main.png")}
          gazeSource={require("../res/button/agenda-anim.png")}
          tapSource={require("../res/button/agenda-anim.png")}
          position={[0, -0.03, 0]}
          scale={[0.1, 0.1, 0.1]}
          height={0.5}
          width={1.5}
          onClick={handleButtonAgenda}
        />
      </ViroNode>
      
      <ViroNode
        // scale={[0, 0, 0]}
        position={[-0.25, -0.1, -0.5]}
        rotation={[0, 25, 0]}
        dragType="FixedToWorld"
      >
        <ViroButton
          source={require("../res/button/service-main.png")}
          gazeSource={require("../res/button/service-anim.png")}
          tapSource={require("../res/button/service-anim.png")}
          position={[0, -0.03, 0]}
          scale={[0.1, 0.1, 0.1]}
          height={0.5}
          width={1.5}
          onClick={handleButtonService}
        />
      </ViroNode>
      
      <ViroOmniLight
          intensity={300}
          position={[-10, 10, 1]}
          color={"#FFFFFF"}
          attenuationStartDistance={20}
          attenuationEndDistance={30} />

      <ViroOmniLight
          intensity={300}
          position={[10, 10, 1]}
          color={"#FFFFFF"}
          attenuationStartDistance={20}
          attenuationEndDistance={30} />

      <ViroOmniLight
          intensity={300}
          position={[-10, -10, 1]}
          color={"#FFFFFF"}
          attenuationStartDistance={20}
          attenuationEndDistance={30} />

      <ViroOmniLight
          intensity={300}
          position={[10, -10, 1]}
          color={"#FFFFFF"}
          attenuationStartDistance={20}
          attenuationEndDistance={30} />

      <ViroSpotLight
        position={[0, 8, -2]}
        color="#ffffff"
        direction={[0, -1, 0]}
        intensity={50}
        attenuationStartDistance={5}
        attenuationEndDistance={10}
        innerAngle={5}
        outerAngle={20}
        castsShadow={true}
      />

      <ViroQuad
        rotation={[-90, 0, 0]}
        position={[0, -1.6, 0]}
        width={5} height={5}
        arShadowReceiver={true}
        />
    </ViroARScene>
  );
};

ViroMaterials.createMaterials({
  chromaKeyFilteredVideo : {
    chromaKeyFilteringColor: "#1BFE01"
  }
});

ViroAnimations.registerAnimations({
  showVideo: {
    properties: { scaleX: 0.9, scaleY: 0.9, scaleZ: 0.9 },
    duration: 1,
    easing: "bounce"
  },
  closeVideo: {
    properties: { scaleX: 0, scaleY: 0, scaleZ: 0 },
    duration: 1
  },
  scaleModel:{
    properties:{
      scaleX:1, 
      scaleY:1, 
      scaleZ:1,
    },
    duration: 1000
  },
});

ViroARTrackingTargets.createTargets({
  video: {
    source: require("../res/video.png"),
    orientation: "Up",
    physicalWidth: 0.165
  }
});

var styles = StyleSheet.create({
  f1: { flex: 1 },
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
});


export default HelloWorldSceneAR;