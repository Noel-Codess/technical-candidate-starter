import {
  createCharacterMemoryRuntime,
  InMemoryMemoryStore,
} from "ai-persona-sdk";
import {
  createBedrockCharacterModel,
  createBedrockExtractor,
  createBedrockTitanEmbeddings,
} from "ai-persona-sdk/bedrock";
import { createPersonaRuntime } from "ai-persona-sdk/persona";

import { readBedrockConfig } from "@/lib/config";
import { cardToManifest, loadPersonaCard } from "@/lib/catalog";

/**
 * Ephemeral by design. Candidates should select tenancy, durable state,
 * observability, and lifecycle policies appropriate to their solution.
 */
export function createBedrockRuntime(cardId: string) {
  const { region, modelId } = readBedrockConfig();
  const manifest = cardToManifest(loadPersonaCard(cardId));

  const memory = createCharacterMemoryRuntime({
    extractor: createBedrockExtractor({ region, modelId }),
    embeddings: createBedrockTitanEmbeddings({ region }),
    store: new InMemoryMemoryStore(),
  });

  return createPersonaRuntime({
    persona: manifest,
    memory,
    model: createBedrockCharacterModel({ region, modelId }),
  });
}
