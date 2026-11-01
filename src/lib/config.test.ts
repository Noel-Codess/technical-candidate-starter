import { describe, expect, it } from "vitest";

import { isSmokeTestEnabled, readBedrockConfig } from "./config";

describe("Bedrock configuration", () => {
  it("uses a safe region default", () => {
    expect(readBedrockConfig({ BEDROCK_MODEL_ID: "example.model" })).toEqual({
      region: "us-east-1",
      modelId: "example.model",
    });
  });

  it("requires an explicit model", () => {
    expect(() => readBedrockConfig({})).toThrow();
  });

  it("keeps paid smoke tests opt-in", () => {
    expect(isSmokeTestEnabled({})).toBe(false);
    expect(isSmokeTestEnabled({ ENABLE_BEDROCK_SMOKE_TEST: "true" })).toBe(true);
  });
});
