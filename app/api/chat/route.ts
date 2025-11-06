import { streamText } from "ai"

interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

export async function POST(request: Request) {
  try {
    const { messages, userProfile } = await request.json()

    const systemPrompt = `You are FutureProof, an AI career advisor helping users with skill development, role exploration, and learning guidance. 
${
  userProfile
    ? `
User Profile:
- Current Field: ${userProfile.currentField}
- Career Goal: ${userProfile.careerGoal || "Exploring options"}
- Skills: ${userProfile.selectedSkills?.join(", ") || "Not specified"}
- Learning Style: ${userProfile.learningStyle || "Not specified"}
- Experience Level: ${userProfile.experienceLevel || "Not specified"}
`
    : ""
}

Your role is to:
1. Provide personalized career guidance based on their profile
2. Help them understand learning paths and next steps
3. Answer questions about skills, roles, and career development
4. Suggest resources and actionable steps
5. Be encouraging and motivational

Keep responses concise (2-3 sentences), actionable, and relevant to their goals. If asked about specific technical topics, provide practical examples.`

    const { text } = await streamText({
      model: "openai/gpt-4o-mini",
      messages: messages as ChatMessage[],
      system: systemPrompt,
      temperature: 0.7,
      maxTokens: 500,
    })

    // Convert stream to text
    let fullText = ""
    for await (const chunk of text) {
      fullText += chunk
    }

    return Response.json({
      success: true,
      message: fullText,
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return Response.json(
      {
        success: false,
        error: "Failed to generate response",
      },
      { status: 500 },
    )
  }
}
