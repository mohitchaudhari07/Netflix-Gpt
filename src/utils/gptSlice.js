// import { createSlice } from "@reduxjs/toolkit";


// const gptSlice = createSlice({
//     name:'gpt',
//     initialState: {
//         showGptSearch: false,
//         gptMovies: null,
//         movieNames:null,
//         movieResults:null,

//     },
//     reducers:{
//         toggleGptSearchView : (state)=>{
//             state.showGptSearch = !state.showGptSearch;
            
//         },
//         addGptMovieResult:(state,action) =>{
//             const {movieNames, movieResults} = action.payload;
//             state.movieNames = movieNames;
//             state.movieResults = movieResults;
//         },
//     },
// });
import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: true,
    gptMovies: null,
    movieNames: null,
    movieResults: null,
  },
  reducers: {
    addGptMovieResult: (state, action) => {
      // Store movie names + results separately
      state.movieNames = action.payload.movieNames;
      state.movieResults = action.payload.movieResults;
    },
    toggleGptSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
  },
});

export const { addGptMovieResult, toggleGptSearchView } = gptSlice.actions;

export default gptSlice.reducer;
