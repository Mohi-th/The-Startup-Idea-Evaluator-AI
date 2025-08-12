import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ideas: [],
};

const ideasSlice = createSlice({
  name: 'ideas',
  initialState,
  reducers: {
    setIdeas(state, action) {
      state.ideas = action.payload;
    },
    addIdea(state, action) {
      state.ideas.push(action.payload);
    },
    upvoteIdea(state, action) {
      const id = action.payload;
      const idea = state.ideas.find(i => i.id === id);
      if (idea) {
        idea.votes += 1;
      }
    },
  },
});

export const { setIdeas, addIdea, upvoteIdea } = ideasSlice.actions;
export default ideasSlice.reducer;
