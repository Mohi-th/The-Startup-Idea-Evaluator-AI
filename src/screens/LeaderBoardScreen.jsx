import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";

export default function LeaderboardScreen() {
  const ideas = useSelector((state) => state.ideas.ideas);

  const topIdeas = [...ideas]
    .sort((a, b) => b.votes - a.votes)

  const top3 = topIdeas.slice(0, 3);
  const remainingIdeas = topIdeas.slice(3);

  const iconColor = "gray";

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <View className="p-6 flex-1 bg-gray-50">
       
        <View className="mb-8">
          <Text
            className="text-4xl font-extrabold text-gray-900"
            accessibilityRole="header"
          >
            Startup Leaderboard 🏆
          </Text>
          <Text className="text-lg font-medium text-gray-500 mt-2">
            The community's favorite startup ideas.
          </Text>
        </View>

    
        <View className="flex-row items-end justify-between px-2 mb-8 mt-4">
          
          {top3[1] && (
            <View className="w-[30%] -mb-4">
              <View className="bg-gray-300 rounded-xl p-3 shadow-lg border border-gray-400">
                <Text className="text-center text-3xl font-bold text-gray-800">
                  🥈
                </Text>
                <Text className="text-center text-sm font-bold text-gray-700 mt-1">
                  {top3[1].name}
                </Text>
                <Text className="text-center text-xs text-gray-500">
                  {top3[1].votes} votes
                </Text>
              </View>
              <View className="bg-gray-300 h-16 rounded-b-xl shadow-inner mt-1" />
            </View>
          )}

          {top3[0] && (
            <View className="w-[35%] z-10">
              <LinearGradient
                colors={["#8B5CF6", "#EC4899"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="rounded-2xl p-4 shadow-2xl"
              >
                <Text className="text-center text-5xl font-extrabold text-white">
                  🥇
                </Text>
                <Text className="text-center text-lg font-bold text-white mt-2">
                  {top3[0].name}
                </Text>
                <View className="flex-row items-center justify-center mt-2">
                  <MaterialIcons name="whatshot" size={18} color={iconColor} />
                  <Text className="text-white text-base font-bold ml-1">
                    {top3[0].votes} votes
                  </Text>
                </View>
              </LinearGradient>
              <View className="bg-purple-600 h-24 rounded-b-2xl shadow-inner mt-1" />
            </View>
          )}

          {top3[2] && (
            <View className="w-[30%] -mb-8">
              <View className="bg-yellow-800 rounded-xl p-3 shadow-lg border border-yellow-700">
                <Text className="text-center text-3xl font-bold text-yellow-100">
                  🥉
                </Text>
                <Text className="text-center text-sm font-bold text-white mt-1">
                  {top3[2].name}
                </Text>
                <Text className="text-center text-xs text-yellow-200">
                  {top3[2].votes} votes
                </Text>
              </View>
              <View className="bg-yellow-800 h-12 rounded-b-xl shadow-inner mt-1" />
            </View>
          )}
        </View>

        <View className="flex-1 mt-4">
          <ScrollView showsVerticalScrollIndicator={false}>
            {remainingIdeas.map((item, index) => (
              <View
                key={item.id}
                className="flex-row items-center p-4 mb-3 bg-white rounded-xl shadow-sm border border-gray-200"
              >
                <Text className="text-lg font-bold text-gray-400 mr-4">
                  {index + 4}.
                </Text>
                <View className="flex-1">
                  <Text className="font-bold text-base text-gray-900">
                    {item.name}
                  </Text>
                </View>
                <View className="flex-row items-center ml-4">
                  <MaterialIcons name="whatshot" size={16} color={iconColor} />
                  <Text className="ml-1 text-base font-bold text-gray-700">
                    {item.votes}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
