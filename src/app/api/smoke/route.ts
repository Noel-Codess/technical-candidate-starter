import { NextResponse } from "next/server";
import { z } from "zod";

import { createBedrockRuntime } from "@/lib/bedrock";
import { isSmokeTestEnabled } from "@/lib/config";

export const runtime = "nodejs";

const requestSchema = z.object({
  cardId: z.string().min(1).default("atlas"),
  prompt: z.string().min(1).max(500),
});

export async function POST(request: Request) {
  if (!isSmokeTestEnabled()) {
    return NextResponse.json(
      { error: "Bedrock smoke test is disabled." },
      { status: 404 },
    );
  }

  try {
    const input = requestSchema.parse(await request.json());
    const runtime = createBedrockRuntime(input.cardId);
    const result = await runtime.respond({
      conversationId: crypto.randomUUID(),
      userId: "local-smoke-test",
      channel: "text",
      message: input.prompt,
      maxOutputTokens: 180,
    });

    return NextResponse.json({
      text: result.text,
      provider: result.trace.provider,
      model: result.trace.model,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
