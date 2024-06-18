import React, {  useState } from "react";
import {
  ViroARScene,
  ViroTrackingStateConstants,
  ViroVideo,
  ViroMaterials,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroAnimations,
  ViroNode,
} from "@reactvision/react-viro";
  
const HelloWorldSceneAR = () => {

  const [state, setState] = useState({
    pauseUpdates: false,
    playAnim: false,
    modelAnim: false,
    loopState: false,
    videoPaused: false,
    animationName: "01",
    videoUrl: require("../res/test.mp4")
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
            paused={state.videoPaused}
            materials={["chromaKeyFilteredVideo"]}
            onBufferEnd={() => setVideoStatus("playing")}
            onFinish={() => setVideoStatus("finished")}
          />
        </ViroNode>

      </ViroARImageMarker>
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
});

ViroARTrackingTargets.createTargets({
  video: {
    source: require("../res/test.png"),
    orientation: "Up",
    physicalWidth: 0.165
  }
});

export default HelloWorldSceneAR;