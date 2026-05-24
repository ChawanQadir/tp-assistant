import { NextRequest, NextResponse } from "next/server";
import { ORCAInput } from "@/lib/types";
import { SYSTEM_PROMPT, buildUserPrompt } from "@/lib/prompt";
import { MOCK_OUTPUT } from "@/lib/mockData";

export async function POST(request: NextRequest) {
  const body: ORCAInput = await request.json();
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ output: MOCK_OUTPUT, mock: true });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-opus-4-7",
        max_tokens: 8192,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: buildUserPrompt(body) }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Anthropic API error:", err);
      return NextResponse.json({ output: MOCK_OUTPUT, mock: true });
    }

    const data = await response.json();
    const text = data.content?.[0]?.text ?? "";
    const parsed = JSON.parse(text);
    return NextResponse.json({ output: parsed, mock: false });
  } catch (err) {
    console.error("Generation error:", err);
    return NextResponse.json({ output: MOCK_OUTPUT, mock: true });
  }
}
