import React, { useCallback, useEffect, useRef, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { setIdeas, upvoteIdea } from "../store/IdeasSlice";
import MyBottomSheet from "../components/BottomSheet";
import { SafeAreaView } from "react-native-safe-area-context";
import StartUpIdeaItem from "../components/StartUpIdeaItem";

export default function IdeaListingScreen() {
  const ideas = useSelector((state) => state.ideas.ideas);
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState("rating");
  const [startUpIdea, setStartUpIdea] = useState(null);

  const bottomSheetRef = useRef(null);
  const handleSnapPress = useCallback((index) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);

  const loadIdeas = async () => {
    const stored = await AsyncStorage.getItem("ideas");
    if (stored) {
      const parsed = JSON.parse(stored);
      dispatch(setIdeas(parsed));
    }
  };

  useEffect(() => {
    loadIdeas();
  }, []);

  const sortedIdeas = [...ideas].sort((a, b) => b[sortBy] - a[sortBy]);

  const handleVote = async (id) => {
    dispatch(upvoteIdea(id));
    const updatedIdeas = ideas.map((idea) =>
      idea.id === id ? { ...idea, votes: idea.votes + 1 } : idea
    );
    await AsyncStorage.setItem("ideas", JSON.stringify(updatedIdeas));
  };

  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View className="flex-1 bg-gray-100">

          <View className="flex-row items-center justify-between mb-6 px-6 pt-2">
            <Text className="text-3xl font-extrabold text-gray-900">
              Startup Ideas
            </Text>
          </View>
        
          <View className="flex-row justify-between mx-6 mb-6">
            <TouchableOpacity
              onPress={() => setSortBy("rating")}
              className={`flex-1 flex-row items-center justify-center p-3 rounded-l-xl ${
                sortBy === "rating" ? "bg-purple-600" : "bg-gray-200"
              }`}
              style={{ marginRight: 2 }}
            >
              <MaterialIcons
                name="star-rate"
                size={20}
                color={sortBy === "rating" ? "#fff" : "#6b7280"}
              />
              <Text className={`font-bold ml-2 text-base ${
                sortBy === "rating" ? "text-white" : "text-gray-600"
              }`}>
                Rating
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSortBy("votes")}
              className={`flex-1 flex-row items-center justify-center p-3 rounded-r-xl ${
                sortBy === "votes" ? "bg-purple-600" : "bg-gray-200"
              }`}
              style={{ marginLeft: 2 }}
            >
              <MaterialIcons
                name="trending-up"
                size={20}
                color={sortBy === "votes" ? "#fff" : "#6b7280"}
              />
              <Text className={`font-bold ml-2 text-base ${
                sortBy === "votes" ? "text-white" : "text-gray-600"
              }`}>
                Votes
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 24 }}>
            {sortedIdeas.map((item) => (
              <StartUpIdeaItem
                key={item.id}
                idea={item}
                setStartUpIdea={setStartUpIdea}
                handleSnapPress={handleSnapPress}
                handleVote={handleVote}
              />
            ))}
          </ScrollView>
        </View>

        <MyBottomSheet sheetRef={bottomSheetRef} startUpIdea={startUpIdea} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
