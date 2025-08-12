import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { addIdea } from "../store/IdeasSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const initialFormData = {
  name: "",
  tagline: "",
  description: "",
};

export default function IdeaSubmissionScreen({ navigation }) {
  const [formData, setFormData] = useState(initialFormData);
  const [rating, setRating] = useState(null);

  const dispatch = useDispatch();
  const ideas = useSelector((state) => state.ideas.ideas);

  const handleSubmit = async () => {
    const { name, tagline, description } = formData;

    if (!name || !tagline || !description) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please fill in all fields before submitting.",
        position: "bottom",
        visibilityTime: 3000,
        autoHide: true,
        bottomOffset: 70,
      });
      return;
    }

    const aiRating = Math.floor(Math.random() * 101);
    const newIdea = {
      id: Date.now(),
      name,
      tagline,
      description,
      rating: aiRating,
      votes: 0,
    };

    try {
      const updatedIdeas = [...ideas, newIdea];
      await AsyncStorage.setItem("ideas", JSON.stringify(updatedIdeas));

      dispatch(addIdea(newIdea));
      setRating(aiRating);
      setFormData(initialFormData);

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Your idea was submitted successfully!",
        position: "bottom",
        visibilityTime: 3000,
        autoHide: true,
        bottomOffset: 70,
      });

      navigation.navigate("Ideas");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Submission Failed",
        text2: "Failed to save idea. Please try again.",
        position: "bottom",
        visibilityTime: 3000,
        autoHide: true,
        bottomOffset: 70,
      });
      console.error(error);
    }
  };

  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <View className="flex-1 p-6 bg-gray-100">
        <Text className="text-3xl font-bold text-gray-800 mb-8">
          Submit an Idea
        </Text>

        <View className="mb-4">
          <Text className="text-sm font-semibold text-gray-600 mb-1">
            Startup Name
          </Text>
          <TextInput
            className="bg-white border border-gray-300 rounded-xl px-4 py-3 text-base shadow-sm"
            placeholder="e.g., EcoCharge"
            placeholderTextColor="#9ca3af"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />
        </View>

        <View className="mb-4">
          <Text className="text-sm font-semibold text-gray-600 mb-1">
            Tagline
          </Text>
          <TextInput
            className="bg-white border border-gray-300 rounded-xl px-4 py-3 text-base shadow-sm"
            placeholder="A short, catchy phrase"
            placeholderTextColor="#9ca3af"
            value={formData.tagline}
            onChangeText={(text) => setFormData({ ...formData, tagline: text })}
          />
        </View>

        <View className="mb-6">
          <Text className="text-sm font-semibold text-gray-600 mb-1">
            Description
          </Text>
          <TextInput
            className="bg-white border border-gray-300 rounded-xl px-4 py-3 text-base h-32 text-top shadow-sm"
            placeholder="Describe your idea in more detail"
            placeholderTextColor="#9ca3af"
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
            multiline
            numberOfLines={4}
          />
        </View>

        <TouchableOpacity
          className="bg-purple-600 py-4 rounded-xl items-center shadow-lg"
          onPress={handleSubmit}
        >
          <Text className="text-white font-bold text-lg">
            Submit Idea
          </Text>
        </TouchableOpacity>

        {rating !== null && (
          <View className="mt-6 p-4 bg-purple-100 rounded-xl">
            <Text className="text-purple-800 font-semibold text-center">
              Idea submitted! 🎉 AI Rating: {rating}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
