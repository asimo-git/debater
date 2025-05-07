import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const aiRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "meta-llama/llama-4-maverick:free",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await aiRes.json();
  const answer = data.choices?.[0]?.message?.content || "Ответ не получен";

  return NextResponse.json({ answer });
}
