import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Google api key error");
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function roastResume(resumeText: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Analyze the following resume and provide a unique, scathing, and hilarious roast:

${resumeText}

Please structure your response as follows:

 Roast (300 words (Must) 10-15 lines of absolutely brutal, yet creative and humorous critique):
   - Use unexpected metaphors or pop culture references
   - Point out absurd implications of the resume's content
   - Exaggerate the resume's weaknesses to comedic effect
   - Employ witty wordplay or puns related to the resume's content
   - Imagine outlandish scenarios based on the resume's claims
   
   Remember to tailor your roast and feedback to the specific content and style of the provided resume. Be creative, surprising, and ruthlessly funny in the roast section, but ensure the improvement tips and positive aspects are genuinely helpful and encouraging
   Note: Must be more than 12 lines and i will directly show the whole output on screen so dont use ** star to create bold words
   Note: Dont mention the heading like Roast or Roast (300 words, 10-15 lines), direct start roasting with taking name as first word

`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  console.log(response.text(),'=========')
  return response.text();
}

// 2. Tips for Improvement (4-6 specific, actionable suggestions):
//    - Highlight key areas that need work
//    - Provide concrete examples of how to enhance the resume
//    - Suggest modern resume techniques or trends that could be applied
//    - Address any glaring omissions or unnecessary inclusions

// 3. Positive Aspects (2-3 genuinely good things about the resume):
//    - Identify strengths or unique selling points
//    - Highlight any particularly impressive achievements or skills
//    - Mention any effective formatting or presentation choices


// {
//   "roast": "<roast content> : str",
//   "improvementTips": [
//     "<tip 1>: str",
//     "<tip 2>: str",
//     "<tip 3>: str",
//     "<tip 4>: str",
//     "<tip 5>: str",
//     "<tip 6>: str"
//   ],
//   "positiveAspects": [
//     "<positive aspect 1>: str",
//     "<positive aspect 2>",
//     "<positive aspect 3>"
//   ]
// }

// Ensure that the JSON structure is preserved and each section is clearly delineated to be easily readable and parsable.
// Note: give json.stringiy and i will parse that, dont add extra things like '\n' (NOTE) or json''' (NOTE), just normal json.stringified
// NOte must v v imp: dont use any new line like /n or / or any other thing, i need plane json without any noise
