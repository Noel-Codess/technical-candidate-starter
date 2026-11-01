import { listPersonas } from "ai-persona-sdk";

const foundations = [
  "Next.js App Router shell",
  "Catalogue card → runtime manifest adapter",
  "Amazon Bedrock provider factory",
  "Opt-in, server-only smoke endpoint",
];

export default function Home() {
  const catalogue = listPersonas();

  return (
    <main>
      <div className="eyebrow">Candidate starter · v0.1</div>
      <section className="hero">
        <div>
          <p className="kicker">SDK × BEDROCK</p>
          <h1>A foundation,<br />not the answer.</h1>
        </div>
        <p className="lede">
          The SDK is installed and its Bedrock boundary is isolated. Product architecture,
          persistence, security, and experience design are intentionally yours to solve.
        </p>
      </section>

      <section className="grid" aria-label="Starter contents">
        <article>
          <span className="number">01</span>
          <h2>Included</h2>
          <ul>{foundations.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
        <article>
          <span className="number">02</span>
          <h2>SDK catalogue</h2>
          <div className="catalogue">
            {catalogue.map((card) => (
              <span key={card.id}>{card.name}</span>
            ))}
          </div>
        </article>
        <article className="open-ended">
          <span className="number">03</span>
          <h2>Still open</h2>
          <p>Everything that demonstrates your judgement.</p>
        </article>
      </section>

      <footer>
        <span>Local shell runs without AWS credentials.</span>
        <code>npm run dev</code>
      </footer>
    </main>
  );
}
