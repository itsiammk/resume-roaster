import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
console.log(apiKey,'apikey')

if (!apiKey) {
  throw new Error("Google api key error");
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function roastResume(resumeText: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const prompt = `Analyze the following tech resume and deliver a scathing, hilarious roast with actionable feedback:

${resumeText}

Structure your response as follows:

Swati, or the candidate’s name, kick off a 300-word, 12-15 line roast that’s a brutal, tech-flavored comedic takedown. Use sharp tech metaphors (e.g., "your resume’s a deprecated API nobody calls"), exaggerate flaws (e.g., "your React skills are stuck in a 90s Netscape loop"), and mock claims with absurd scenarios (e.g., "your SSR optimization crashed Google’s servers"). Sprinkle in puns (e.g., "Node.js? More like No-js!") and tech culture jabs (e.g., "copied your skills from a Stack Overflow thread"). Keep it tailored to the resume’s tech stack (React, Next.js, etc.), roles, and buzzwords. Make it laugh-out-loud ruthless but clever, avoiding generic insults.

Tips for Improvement (4-6 specific, actionable suggestions): (heading in bold letters)
   - Identify weak spots (e.g., vague metrics, cliché terms like "team player").
   - Suggest concrete fixes (e.g., "replace ‘improved UX’ with ‘boosted retention by 15%’").
   - Recommend tech resume trends (e.g., add GitHub/Portfolio links, use ATS keywords).
   - Flag omissions (e.g., missing certifications or project outcomes).

Positive Aspects (2-3 genuinely strong points): (heading in bold letters)
   - Highlight standout skills (e.g., "Next.js expertise is a real asset").
   - Praise specific achievements (e.g., "cutting load times by 40% impresses").
   - Note formatting wins (e.g., "clean LaTeX structure stands out").

Return plain text with no bold markers (**), no section headings (e.g., "Roast"), and no newlines or extra characters. Ensure the roast is creative, surprising, and tied to the resume’s content, with feedback tailored for tech job applications. NOTE: use simple english and avoid complex words `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  console.log(response.text(), 'response.text()') 
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
