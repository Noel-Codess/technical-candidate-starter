import { z } from "zod";

const bedrockConfigSchema = z.object({
  AWS_REGION: z.string().min(1).default("us-east-1"),
  BEDROCK_MODEL_ID: z.string().min(1),
});

export type BedrockConfig = {
  region: string;
  modelId: string;
};

type Environment = Record<string, string | undefined>;

export function readBedrockConfig(
  environment: Environment = process.env,
): BedrockConfig {
  const parsed = bedrockConfigSchema.parse(environment);

  return {
    region: parsed.AWS_REGION,
    modelId: parsed.BEDROCK_MODEL_ID,
  };
}

export function isSmokeTestEnabled(
  environment: Environment = process.env,
): boolean {
  return environment.ENABLE_BEDROCK_SMOKE_TEST === "true";
}
