// import React, { useRef } from "react";
// import groq from "../utils/openai";
// import { API_OPTIONS } from "../utils/constatns";
// import { useDispatch } from "react-redux";
// import { addGptMovieResult } from "../utils/gptSlice";

// const GptSearch = () => {
//   const searchText = useRef(null);
//   const dispatch = useDispatch();
 

//   //Search Movies in TMDB
//   const searchMovieTMDB = async (movie) => {
//     const data = await fetch(
//       "https://api.themoviedb.org/3/search/movie?query=" +
//         movie +
//         "&include_adult=false&language=en-US&page=1",
//       API_OPTIONS
//     );
//     const json = await data.json();
//     return json.results;
// };


//   async function getGroqChatCompletion() {
//     const gptQuery =
//       "Act as a like movie recommendation system and suggest some hindi movies for the query " +
//       searchText.current.value +
//       ". only give me the names of top 5 movies, comma seperated like the example result given ahead. Example Result: Gadar,Sholay,Don,Golmal,Koi mil gaya only give movies name on further text present in it dont give first sentence also only names.";
//     return groq.chat.completions.create({
//       messages: [
//         {
//           role: "user",
//           content: gptQuery,
//         },
//       ],
//       model: "llama3-8b-8192",
//     });
  
// };

//   const handleSearchClick = async () => {
//     console.log(searchText.current.value);

//     const chatCompletion = await getGroqChatCompletion();
//     // Print the completion returned by the LLM.
//     if (!chatCompletion.choices) {
//     }
//     console.log(chatCompletion.choices[0]?.message?.content || "");
//     const gptMovies = chatCompletion.choices[0]?.message?.content.split(",");

//     //for each movie i will search tmdb api

//     const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));

//     const tmdbResults = await Promise.all(promiseArray);
//     console.log(tmdbResults);
    
//     dispatch(addGptMovieResult({movieNames:gptMovies,movieResults: tmdbResults}));
// };

    

//   return (
//     <div className="w-screen overflow-x-clip">
//       <div className="pointer-events-none">
//         <img
//         className="h-screen object-cover w-screen overflow-x-clip"

//           alt="background"
//           src="https://images.unsplash.com/photo-1588546506381-74592e9b8a2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//         />
//       </div>
//       <form
//         onSubmit={(e) => e.preventDefault()}
//         className="absolute top-44 md:top-28 transform-cpu translate-x-[-50%] left-[50%] flex justify-center gap-2  "
//       >
//         <input
//           ref={searchText}
//           type="text"
//           className="focus:outline-none p-2 rounded-md md:w-96 w-[100%] "
//           placeholder="What would you like to watch today?"
//         />
//         <button
//           onClick={handleSearchClick}
//           className="py-2 px-6 rounded-md text-white font-bold hover:bg-opacity-85 transform transition-all duration-600 bg-gray-500"
//         >
//           Search
//         </button>
//       </form>
//     </div>
//   );
// };



import React, { useRef } from "react";
import groq from "../utils/openai";
import { API_OPTIONS } from "../utils/constatns";
import { useDispatch } from "react-redux";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearch = () => {
  const searchText = useRef(null);
  const dispatch = useDispatch();


  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        encodeURIComponent(movie.trim()) + // ✅ handle spaces
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };


  async function getGroqChatCompletion() {
    const gptQuery = `
      Act as a movie recommendation system and suggest 5 Hindi movies for the query: "${
        searchText.current.value
      }".
      ⚠️ Very Important: Return ONLY a JSON array of movie names like this:
      ["Gadar","Sholay","Don","Golmaal","Koi Mil Gaya"]
    `;

    return groq.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "llama3-8b-8192",
    });
  }

  const handleSearchClick = async () => {
    console.log("Searching for:", searchText.current.value);

    const chatCompletion = await getGroqChatCompletion();
    const content = chatCompletion.choices[0]?.message?.content || "";
    console.log("Groq raw response:", content);

    let gptMovies = [];

  
    try {
      gptMovies = JSON.parse(content);
    } catch (err) {
 
      gptMovies = content
        .replace(/\n/g, ",")
        .split(",")
        .map((m) => m.trim())
        .filter((m) => m.length > 0);
    }

    console.log("Parsed GPT movies:", gptMovies);

   
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray);

    console.log("TMDB results:", tmdbResults);

    dispatch(addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults.flat(), }));
  };

  return (
    <div className="w-screen overflow-x-clip">
      <div className="pointer-events-none">
        <img
          className="h-screen object-cover w-screen overflow-x-clip"
          alt="background"
          src="https://images.unsplash.com/photo-1588546506381-74592e9b8a2d?q=80&w=1887&auto=format&fit=crop"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute top-44 md:top-28 transform-cpu translate-x-[-50%] left-[50%] flex justify-center gap-2"
      >
        <input
          ref={searchText}
          type="text"
          className="focus:outline-none p-2 rounded-md md:w-96 w-[100%]"
          placeholder="What would you like to watch today?"
        />
        <button
          onClick={handleSearchClick}
          className="py-2 px-6 rounded-md text-white font-bold hover:bg-opacity-85 transition-all bg-gray-500"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default GptSearch;

