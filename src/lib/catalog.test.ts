import { describe, expect, it } from "vitest";

import { cardToManifest, loadPersonaCard } from "./catalog";

describe("catalogue adapter", () => {
  it("maps an SDK card to a valid runtime manifest", () => {
    const card = loadPersonaCard("atlas");
    const manifest = cardToManifest(card);

    expect(manifest.id).toBe("atlas");
    expect(manifest.identity.worldview).toBe(card.systemPrompt);
    expect(manifest.metadata.suggestedModel).toBe(card.suggestedModel);
  });

  it("rejects unknown card IDs rather than using the SDK fallback", () => {
    expect(() => loadPersonaCard("not-a-card")).toThrow("Unknown card");
  });
});
