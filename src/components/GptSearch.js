


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
    You are a movie recommendation engine. The input query is: "${searchText.current.value}".

Task: Return EXACTLY one valid JSON array of 5 movie titles (strings) that best match the query.

MANDATORY RULES (follow exactly):
1. OUTPUT FORMAT: The response must be exactly a JSON array of 5 strings using double quotes. Nothing else. No explanation, no code fences, no extra characters. Example: ["Inception","3 Idiots","Sholay","Interstellar","Gully Boy"]
   - The first character must be '[' and the last character must be ']'.
   - No trailing commas. JSON must parse.
2. LANGUAGE RULES:
   - If the query explicitly mentions a language ("Hindi", "Bollywood", "English", etc.), prioritize that language (at least 4 of 5 picks).
   - If the query mentions both languages or mentions neither, return a mix: **at least 2 Hindi and at least 2 English**; the 5th is the single best match.
3. RELEVANCE: Match genre, mood, era, actor, or keywords in the query. Order movies by relevance (most relevant first).
4. TITLES ONLY: Return only official movie titles. Do NOT include years, director names, parentheses, extra notes, or other metadata. Do NOT return TV shows, songs, or web series.
5. VALIDATION: No duplicates. Use canonical/common titles. If uncertain, pick well-known, widely available films that still match the query.
6. FAILSAFE: If the query is empty or nonsense, return 5 popular mixed-language movies (2+ Hindi, 2+ English) that are broadly liked and recognizable.
7. ESCAPING: If a title contains characters that require escaping in JSON, escape them properly.

FINAL INSTRUCTION: Based solely on the input string above, output a single JSON array of exactly 5 movie titles and nothing else. `;

  const response = await fetch("/api/gpt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: gptQuery }),
  });

  return response.json();
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

    dispatch(addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults}));
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

