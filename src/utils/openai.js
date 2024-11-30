import Groq from "groq-sdk";
// import { OPEN_GPT_KEY } from './constatns';

// const openai = new OpenAI({
//   apiKey: OPEN_GPT_KEY,
//   dangerouslyAllowBrowser:true, // This is the default and can be omitted
// });
const groq = new Groq({ apiKey: process.env.REACT_APP_GROQ_KEY , dangerouslyAllowBrowser:true});

export default groq;