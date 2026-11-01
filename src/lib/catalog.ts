import {
  getPersona,
  personaIds,
  type PersonaCard,
} from "ai-persona-sdk";
import {
  personaManifestSchema,
  type PersonaManifest,
} from "ai-persona-sdk/persona";

/**
 * The SDK intentionally falls back to Atlas for unknown IDs. At an application
 * boundary, failing closed is safer than silently loading the wrong card.
 */
export function loadPersonaCard(id: string): PersonaCard {
  if (!personaIds().includes(id)) {
    throw new Error(`Unknown card: ${id}`);
  }

  return getPersona(id);
}

/**
 * Adapts the SDK's compact catalogue card to its explicit runtime manifest.
 * Product-specific policy belongs outside this starter mapping.
 */
export function cardToManifest(card: PersonaCard): PersonaManifest {
  return personaManifestSchema.parse({
    id: card.id,
    version: card.version,
    name: card.name,
    description: `${card.tagline}. ${card.description}`,
    identity: {
      role: card.name,
      backstory: card.description,
      worldview: card.systemPrompt,
      traits: Object.entries(card.traits).map(([name, value]) => `${name}: ${value}`),
      goals: [],
    },
    speech: {
      tone: [card.traits.tone ?? "neutral"],
      vocabulary: "neutral",
      verbosity: 0.5,
      humor: 0.3,
      signaturePhrases: [],
      forbiddenPhrases: [],
    },
    behavior: {
      warmth: 0.6,
      assertiveness: 0.5,
      curiosity: 0.6,
      emotionalRange: 0.5,
      stayInCharacter: true,
    },
    boundaries: {
      discloseAi: true,
      rules: [],
      prohibitedTopics: [],
    },
    relationships: {
      stages: ["stranger", "acquaintance", "trusted"],
      defaultStage: "stranger",
      progression: "gradual",
    },
    voice: {
      voiceId: null,
      style: card.traits.tone ?? "neutral",
      pace: 1,
      expressiveness: 0.5,
    },
    examples: [{ user: "Hello", assistant: card.greeting }],
    metadata: {
      suggestedModel: card.suggestedModel,
      author: card.author,
    },
  });
}
