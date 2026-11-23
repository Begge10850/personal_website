import type { Metadata } from "next";
import { Header } from "../../_header";

export const metadata: Metadata = {
  title: "Saidia Game Recommender | Treva Antony Ogwang",
  description: "A deployed hybrid recommender combining behavioural similarity, product metadata and chronological offline evaluation.",
  openGraph: { title: "Saidia Game Recommender", description: "From 814,586 interactions to an explainable product-discovery experience.", images: ["/projects/saidia-game-recommender/catalogue.png"] },
  twitter: { card: "summary_large_image", title: "Saidia Game Recommender", description: "A deployed and evaluated hybrid recommender.", images: ["/projects/saidia-game-recommender/catalogue.png"] },
};

const metrics = [["25,585", "catalogue products"], ["88,124", "final test users"], ["5.64%", "test Hit Rate@10"], ["97.05%", "catalogue coverage"]];

function ProjectImage({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return <figure className="game-rec-screen"><img src={src} alt={alt}/><figcaption>{caption}</figcaption></figure>;
}

export default function SaidiaGameRecommender() {
  return <><Header active="Projects"/><main className="case-container game-rec-case">
    <section className="case-hero"><p className="case-kicker">MACHINE LEARNING · RECOMMENDER SYSTEMS · PRODUCT UI · 2026</p><h1>From 814,586 interactions to an explainable product-discovery experience</h1><p className="case-deck">Saidia combines relationships learned from positive ratings with text similarity from product metadata, then serves the saved model through a Streamlit shopping interface.</p><div className="case-facts"><span><b>Role</b>Data science · ML engineering · product UI</span><span><b>Stack</b>Python · SciPy · scikit-learn · Streamlit</span><span><b>Data</b>Amazon Reviews 2023 · Video Games</span><span><b>Status</b>Deployed portfolio application</span></div><div className="case-actions"><a href="https://saidia-game-recommender.streamlit.app/" target="_blank" rel="noreferrer">Try the live recommender ↗</a><a href="https://github.com/Begge10850/saidia-recommender" target="_blank" rel="noreferrer">View technical repository ↗</a></div></section>

    <section className="case-summary"><div><p className="case-kicker">THE PRODUCT</p><h2>Different recommendation signals answer different questions</h2></div><div><p>Visitors can browse a product, inspect behavioural and content neighbours, build a temporary likes profile and receive ten recommendations.</p><p className="case-note">The interface labels each result so that products liked by overlapping users are not confused with products that merely share similar text.</p></div></section>

    <section className="case-section game-rec-intro"><p className="case-kicker">PRODUCT EXPERIENCE</p><h2>Three ways to discover the catalogue</h2><div className="game-rec-three"><article><span>01</span><b>Users also liked</b><p>Positive-rating overlap reveals behavioural associations between products.</p></article><article><span>02</span><b>Similar products</b><p>TF-IDF compares titles, categories, descriptions and feature text.</p></article><article><span>03</span><b>Recommended for you</b><p>A temporary likes profile combines candidate evidence and removes products already selected.</p></article></div></section>

    <section className="case-section game-rec-gallery"><ProjectImage src="/projects/saidia-game-recommender/catalogue.png" alt="Saidia product catalogue" caption="Browse the catalogue or add an item directly to the temporary likes profile."/><ProjectImage src="/projects/saidia-game-recommender/users-also-liked.png" alt="Users also liked recommendations" caption="Behavioural neighbours remain clearly labelled in the product view."/></section>

    <section className="case-section"><p className="case-kicker">MODEL AND EVALUATION</p><h2>The weighting was selected on validation data, not intuition</h2><p className="game-rec-lead">Ratings of four and five became positive interactions. Earlier interactions formed each eligible user&apos;s history; a later interaction was held out for validation and the newest for final testing. Four candidate hybrid weights were compared using validation NDCG@10 before the final test was opened.</p><div className="game-rec-metrics">{metrics.map(([value,label])=><article key={label}><strong>{value}</strong><span>{label}</span></article>)}</div><p className="game-rec-evidence">The selected model uses 70% collaborative and 30% content evidence, with popularity only as a fallback. On final testing, the hidden later product appeared in the top ten for about one in eighteen users. Full model comparisons, metric definitions and leakage checks are documented on GitHub.</p></section>

    <section className="case-section game-rec-evidence-shot"><div><p className="case-kicker">EVIDENCE IN THE PRODUCT</p><h2>Offline results are separated from the current session</h2><p>The application explains the historical evaluation, selected weight and known limitations. Those figures do not change with a visitor&apos;s selections and are not presented as live performance.</p></div><ProjectImage src="/projects/saidia-game-recommender/model-evidence-overview.png" alt="Saidia offline evaluation page" caption="Historical evaluation is shown separately from recommendations generated during the current session."/></section>

    <section className="case-section game-rec-limits"><div><p className="case-kicker">LIMITATIONS</p><h2>What the evaluation does not establish</h2></div><ul><li>Ratings express preference; they do not prove a purchase.</li><li>Missing interactions are unknown, not dislikes.</li><li>The split preserves order within each user but does not use one global time cutoff.</li><li>Offline ranking does not measure satisfaction, conversion or revenue.</li></ul></section>

    <section className="case-closing"><p className="case-kicker">REFLECTION</p><h2>Evaluation design deserved as much attention as model design.</h2><p>The project required a precise target, baseline, separate validation and testing, time-order checks and language that does not overstate what review data can prove.</p><div className="case-actions"><a href="https://saidia-game-recommender.streamlit.app/" target="_blank" rel="noreferrer">Open live application ↗</a><a href="https://github.com/Begge10850/saidia-recommender" target="_blank" rel="noreferrer">Inspect the repository ↗</a></div></section>
  </main></>;
}
