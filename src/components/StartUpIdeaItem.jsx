import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

const StartUpIdeaItem = ({ setStartUpIdea, idea, handleSnapPress, handleVote }) => {
  function openModel() {
    handleSnapPress(1);
    setStartUpIdea(idea);
  }

  return (
    <View className="bg-white p-6 mb-4 mx-4 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200">
      <View className="flex-row items-start justify-between mb-1">
        <View className="flex-1 pr-4">
          <Text className="font-extrabold text-2xl text-gray-900 mb-1 leading-tight">
            {idea.name}
          </Text>
          <Text className="text-gray-600 text-sm italic">
            "{idea.tagline}"
          </Text>
        </View>
        <View className="flex-row items-center bg-yellow-400 px-3 py-1 rounded-full shadow-sm">
          <Text className="text-white font-bold text-lg mr-1">
            <MaterialIcons name="star-rate" size={18} color="white" />
          </Text>
          <Text className="text-white font-bold text-lg">{idea.rating}</Text>
        </View>
      </View>

      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center">
          <Text className="font-semibold text-lg text-gray-800">
            Votes:
          </Text>
          <Text className="ml-2 font-bold text-lg text-purple-600">
            {idea.votes}
          </Text>
        </View>
      </View>

      <View className="flex-row justify-between gap-4">
        <TouchableOpacity
          className="flex-1 py-3 items-center rounded-xl border-2 border-gray-300 bg-transparent"
          onPress={openModel}
        >
          <Text className="text-gray-700 font-bold text-base">
            Details
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 bg-purple-600 py-3 rounded-xl items-center shadow-lg shadow-purple-200"
          onPress={() => handleVote(idea.id)}
        >
          <View className="flex-row items-center">
            <Text className="text-white font-bold text-base mr-1">
              Upvote
            </Text>
            <MaterialIcons name="arrow-upward" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StartUpIdeaItem;