import React, { useCallback, useMemo, useState } from "react";
import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import AiFeedback from "./AiFeedBack";

const MyBottomSheet = ({ sheetRef, startUpIdea }) => {

  const snapPoints = useMemo(() => ["75%", "86%"], []);

  const [messages, setMessages] = useState([]);
  const handleSheetChange = useCallback((index) => {
    setMessages([])
  }, []);

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      index={-1}
      enableDynamicSizing={false}
      keyboardBlurBehavior="restore"
      enableContentPanningGesture
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: "#f5f5f5", borderRadius: 20, borderColor: "#3b82f6", borderBlockStartColor: "black" }}
      keyboardBehavior="interactive"
      onChange={handleSheetChange}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <AiFeedback idea={startUpIdea} messages={messages} setMessages={setMessages}/>
      </KeyboardAvoidingView>
    </BottomSheet>
  );
};

export default MyBottomSheet;
