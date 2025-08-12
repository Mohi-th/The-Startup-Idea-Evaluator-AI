import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

export default function AiFeedbackChat({ idea ,messages,setMessages}) {

  const [opinion, setOpinion] = useState("");
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const scrollViewRef = useRef(null);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const sendOpinion = async () => {
    if (!opinion.trim()) return;

    const newMessages = [...messages, { sender: "user", text: opinion }];
    setMessages(newMessages);
    setOpinion("");
    setLoading(true);

    try {
      const prompt = `
        Startup Name: ${idea?.name}
        Tagline: ${idea?.tagline}
        Description: ${idea?.description}
        User's Opinion: ${opinion}

        Please give a short, fun, and witty feedback based on the startup and the user's opinion.
      `;
      // This is my own backend for getting live AI feedback instead of using mock data. note : you can check it out in my gitgub
      const response = await axios.post(
        "https://genai-backend-s3vt.onrender.com/generate",
        { prompt },
        { headers: { "Content-Type": "application/json" } }
      );

      setMessages([
        ...newMessages,
        { sender: "ai", text: response.data.text || "No response" },
      ]);
    } catch (error) {
      setMessages([
        ...newMessages,
        {
          sender: "ai",
          text: "Oops! My brain is on vacation. Try again later.",
        },
      ]);
    }
    setLoading(false);
  };

 
  const shouldShowToggle = idea?.description?.split(" ").length > 30;

  return (
    <View className="flex-1 bg-gray-50 rounded-t-2xl p-4">

      <View className="bg-white p-4 rounded-xl shadow mb-4">
        <Text className="text-xl font-bold text-gray-900">{idea?.name}</Text>
        <Text className="text-gray-500 italic">{idea?.tagline}</Text>

        <Text
          className="text-gray-700 mt-2"
          numberOfLines={expanded ? undefined : 5}
        >
          {idea?.description}
        </Text>

        {shouldShowToggle && (
          <TouchableOpacity
            onPress={() => setExpanded(!expanded)}
            className="mt-1 py-1"
          >
            <Text className="text-purple-600 font-semibold">
              {expanded ? "Read less" : "Read more"}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <BottomSheetScrollView
        ref={scrollViewRef}
        className="flex-1 mb-3"
        contentContainerStyle={{ paddingVertical: 10 }}
        keyboardShouldPersistTaps="handled"
      >
        {messages.map((msg, index) => (
          <View
            key={index}
            style={{
              maxWidth: "85%",
              backgroundColor: msg.sender === "user" ? "#3b82f6" : "#e5e7eb",
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              borderRadius: 12,
              padding: 12,
              marginBottom: 8,
            }}
          >
            <Text style={{ color: msg.sender === "user" ? "#fff" : "#111" }}>
              {msg.text}
            </Text>
          </View>
        ))}
        {loading && <ActivityIndicator size="small" className="mt-2" />}
      </BottomSheetScrollView>


      <View className="flex-row items-center bg-white rounded-full border border-gray-300 px-3 py-2">
        <TextInput
          className="flex-1 text-base"
          placeholder="Your opinion..."
          value={opinion}
          onChangeText={setOpinion}
          multiline
        />
        <TouchableOpacity
          className={`ml-2 px-4 py-2 rounded-full ${
            loading || !opinion.trim() ? "bg-gray-400" : "bg-blue-500"
          }`}
          onPress={sendOpinion}
          disabled={loading || !opinion.trim()}
        >
          <Text className="text-white font-semibold">Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
