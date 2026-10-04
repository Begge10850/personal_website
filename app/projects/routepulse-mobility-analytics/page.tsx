import type { Metadata } from "next";
import { FiExternalLink } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import { Header } from "../../_components";
import { ZoomableDiagram, ZoomableImage } from "../saidia-logistics-claims/ZoomableMedia";

export const metadata: Metadata = {
  title: "RoutePulse: Berlin–Brandenburg Mobility Analytics | Treva Antony Ogwang",
  description: "How I built and validated a GTFS-Realtime data pipeline from VBB feeds through Amazon S3 and Snowflake to an interactive Streamlit operations dashboard.",
  openGraph: {
    title: "RoutePulse: Berlin–Brandenburg Mobility Analytics",
    description: "An evidence-led public transport data engineering and analytics case study by Treva Antony Ogwang.",
    images: ["/projects/routepulse/dashboard-overview.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "RoutePulse: Berlin–Brandenburg Mobility Analytics",
    description: "From 94.8 million realtime observations to a validated, interactive transport dashboard.",
    images: ["/projects/routepulse/dashboard-overview.png"],
  },
};

const liveApp = "https://routepulse-qdwrvckapptwi9xp74ueuuo.streamlit.app/";
const github = "https://github.com/Begge10850/routepulse";

const deduplicationSql = `CREATE OR REPLACE TRANSIENT TABLE UNIQUE_STOP_EVENTS AS
SELECT
    s.trip_id,
    s.start_date,
    s.stop_sequence,
    s.stop_id,
    COALESCE(s.arrival_delay_seconds, s.departure_delay_seconds)
        AS reported_delay_seconds,
    f.request_started_at AS observed_at_utc
FROM RAW.STOP_TIME_UPDATES AS s
JOIN RAW.FEED_SNAPSHOTS AS f
    ON s.snapshot_id = f.snapshot_id
QUALIFY ROW_NUMBER() OVER (
    PARTITION BY s.trip_id, s.start_date, s.stop_sequence, s.stop_id
    ORDER BY f.request_started_at DESC, s.snapshot_id DESC
) = 1;`;

const categorySql = `COUNT_IF(reported_delay_seconds < -60) AS early_events,
COUNT_IF(reported_delay_seconds BETWEEN -60 AND 60) AS near_schedule_events,
COUNT_IF(
    reported_delay_seconds > 60
    AND reported_delay_seconds <= 300
) AS minor_delay_events,
COUNT_IF(reported_delay_seconds > 300) AS serious_delay_events,
COUNT_IF(reported_delay_seconds IS NULL) AS timing_unavailable_events`;

const reconciliationSql = `timed visits = early + near schedule + minor delay + serious delay
all observed visits = timed visits + timing unavailable`;

export default function RoutePulseCaseStudy() {
  return <><Header active="Projects"/><main className="case-container routepulse-case">
    <section className="case-hero">
      <p className="case-kicker">DATA ENGINEERING · ANALYTICS · PUBLIC TRANSPORT · 2026</p>
      <h1>RoutePulse: turning realtime transport feeds into evidence people can question</h1>
      <p className="case-deck">I built an end-to-end mobility-data pipeline for Berlin and Brandenburg: collecting official VBB feeds, preserving raw evidence, modelling the data in Snowflake, validating every dashboard denominator, and presenting the result in an interactive Streamlit application.</p>
      <div className="case-actions"><a href={liveApp} target="_blank" rel="noreferrer">Open live dashboard <FiExternalLink/></a><a href={github} target="_blank" rel="noreferrer"><FaGithub/> View source code</a></div>
      <div className="case-facts"><span><b>My role</b>Data Engineer &amp; Analyst</span><span><b>Observed window</b>39.5 Friday/weekend hours</span><span><b>Raw scale</b>94,839,920 observations</span><span><b>Core stack</b>Python, S3, Snowflake, Streamlit</span></div>
    </section>

    <section className="case-summary"><div><p className="case-kicker">THE PROJECT AT A GLANCE</p><h2>The difficult part was not drawing charts. It was making every number traceable.</h2></div><div><p>Public transport realtime feeds update repeatedly. The same trip and stop can therefore appear many times, timing values can be missing, static reference data can fail to match, and a populated timing field does not automatically mean a delay.</p><p className="case-note">RoutePulse preserves those distinctions. It reports what the feed said during one limited collection window; it does not claim to measure long-term operator performance, prove a cause, or confirm a passenger&apos;s actual arrival time.</p></div></section>

    <section className="case-section routepulse-narrative">
      <p className="case-kicker">THE BUSINESS QUESTION</p>
      <h2>Where and when did the observed data show the most serious delays?</h2>
      <p>The dashboard helps a reader compare transport modes, Berlin and Brandenburg, stations, passenger-facing lines, and hours. It also asks a second question that is just as important: <b>how much confidence should we place in each result?</b></p>
      <div className="routepulse-question-grid"><article><span>WHERE</span><b>Stations and regions</b><p>Separate dense Berlin services from the wider Brandenburg network.</p></article><article><span>WHAT</span><b>Modes and lines</b><p>Compare both delay rate and the number of seriously late stop visits.</p></article><article><span>WHEN</span><b>Complete hours</b><p>Avoid presenting partial collection hours as comparable peaks.</p></article><article><span>HOW SURE</span><b>Coverage and sample size</b><p>Keep missing timing values and limited samples visible.</p></article></div>
    </section>

    <section className="case-section routepulse-diagram-section">
      <div className="routepulse-diagram-copy"><p className="case-kicker">SYSTEM ARCHITECTURE</p><h2>A traceable path from source feed to public dashboard</h2><p>The collector requests official VBB GTFS-Realtime snapshots and records when each request happened. Raw snapshots and audit metadata remain immutable. Python decodes the Protocol Buffer messages and converts the selected records to typed, compressed Parquet before Amazon S3 and Snowflake take over.</p><p>Snowflake separates raw loading, event-grain modelling, geographic enrichment, line references, presentation aggregates, and validation. Streamlit reads the compact presentation layer with a restricted read-only identity.</p></div>
      <figure className="routepulse-diagram"><ZoomableDiagram title="RoutePulse end-to-end data architecture"><div className="rp-architecture">
        <div className="rp-architecture-row"><div className="rp-node source"><b>VBB feeds</b><span>GTFS Static + Realtime</span></div><i>collect</i><div className="rp-node"><b>Python</b><span>Audit, decode, profile</span></div><i>convert</i><div className="rp-node"><b>Parquet</b><span>Typed, compressed records</span></div></div>
        <div className="rp-architecture-arrow">↓ preserve and load</div>
        <div className="rp-architecture-row"><div className="rp-node storage"><b>Amazon S3</b><span>Immutable evidence boundary</span></div><i>stage</i><div className="rp-node warehouse"><b>Snowflake</b><span>Raw → analytical → presentation</span></div><i>query</i><div className="rp-node app"><b>Streamlit</b><span>Maps, charts, filters, caveats</span></div></div>
      </div></ZoomableDiagram><figcaption>The same pipeline supports reproducibility, analysis, and a public read-only application. Click to enlarge.</figcaption></figure>
    </section>

    <section className="case-section routepulse-numbers">
      <p className="case-kicker">FROM COLLECTION TO ANALYSIS</p><h2>What happened to the data at each stage</h2>
      <div className="rp-number-flow"><article><strong>777</strong><span>audited realtime snapshots</span><p>Each collection cycle retained its source response and metadata.</p></article><article><strong>94.8M</strong><span>raw stop-status rows</span><p>Repeated feed updates were preserved rather than overwritten.</p></article><article><strong>1.76M</strong><span>observed stop visits</span><p>Repeated snapshots were consolidated to the analytical event grain.</p></article><article><strong>0</strong><span>duplicate event keys</span><p>The uniqueness check passed after consolidation.</p></article></div>
      <p className="routepulse-explainer"><b>Why the row count falls:</b> a realtime feed is a sequence of changing snapshots, not a table of final journeys. RoutePulse keeps the raw history, then creates one retained observation for each vehicle trip at each stop. This prevents a frequently refreshed trip from being counted many times simply because it appeared in more snapshots.</p>
    </section>

    <section className="case-section routepulse-code-section">
      <div><p className="case-kicker">SQL CONCEPT 1 · WINDOW FUNCTIONS</p><h2>Choosing one observation without deleting the raw history</h2><p><code>ROW_NUMBER()</code> numbers rows inside each trip-and-stop group. Ordering by observation time puts the latest record first. <code>QUALIFY ... = 1</code> retains that first row in the analytical table.</p><p>This is different from deleting duplicates blindly: the rule states exactly what makes records belong together and which record should win.</p></div>
      <pre aria-label="Simplified SQL showing event deduplication"><code>{deduplicationSql}</code></pre>
    </section>

    <section className="case-section routepulse-join-section">
      <div><p className="case-kicker">SQL CONCEPT 2 · JOINS</p><h2>Realtime events become useful when connected to static reference data</h2><p>A realtime event may contain identifiers and a timing value but not the friendly station name, transport mode, route description, or geographic area needed by a reader. RoutePulse connects it to GTFS stops, routes, trips, and shapes.</p></div>
      <div className="rp-join-grid"><article><b>LEFT JOIN</b><p>Keep every realtime event even when its static reference is missing. The reference columns become null, which allows RoutePulse to measure unmatched data instead of silently losing it.</p></article><article><b>INNER JOIN</b><p>Keep only records that match on both sides. This is useful when a match is required for the output, but it would hide unmatched realtime events if used too early.</p></article><article><b>Why RoutePulse used LEFT JOIN</b><p>Data-quality gaps are part of the result. An unmatched station or route must remain countable and visible in the reconciliation.</p></article></div>
    </section>

    <section className="case-section visual-section routepulse-visual"><div className="visual-intro"><p className="case-kicker">THE PUBLIC DASHBOARD</p><h2>One scope controls the complete analytical story</h2><p className="case-copy">The sidebar begins with observed area, then transport mode, then analytical view. The reader can move from a network overview to stations, lines, time, and data quality without losing the selected scope.</p><p className="case-copy">The headline cards distinguish serious-delay share, the upper range of reported delay, and timing-data availability. These measures answer different questions and should not be collapsed into one score.</p></div><figure className="routepulse-screen wide"><ZoomableImage src="/projects/routepulse/dashboard-overview.png" alt="RoutePulse dashboard overview with regional and transport filters, headline metrics, and key findings"/><figcaption>The deployed Streamlit dashboard. Click to enlarge.</figcaption></figure></section>

    <section className="case-section visual-section reverse routepulse-visual"><figure className="routepulse-screen network"><ZoomableImage src="/projects/routepulse/network-map.png" alt="RoutePulse map showing representative scheduled paths across Berlin and Brandenburg"/><figcaption>Representative scheduled paths for the observed passenger-facing network. Click to enlarge.</figcaption></figure><div className="visual-intro"><p className="case-kicker">GEOGRAPHIC CONTEXT</p><h2>The map explains coverage, not delay severity</h2><p className="case-copy">The all-mode view contains 957 passenger-facing lines and one representative scheduled path for each. GTFS shapes provide the route geometry; event-derived line references determine which services appeared in the observed sample.</p><p className="case-copy">The map deliberately says that these are scheduled paths, not live vehicle movements. Cross-border paths may extend beyond the selected area, and line colour identifies mode rather than performance.</p></div></section>

    <section className="case-section routepulse-narrative">
      <p className="case-kicker">TIMING METHODOLOGY</p><h2>A timing value can mean early, near schedule, or late</h2>
      <p>The GTFS-Realtime timing field is signed. Negative values are ahead of the timetable, positive values are behind it, and null means no usable comparison was supplied. That is why the website and dashboard use the broader phrase <b>timing information</b> rather than assuming every populated value is a delay.</p>
      <div className="rp-timing-grid"><article className="early"><b>Reported &gt;1 min early</b><span>5.0%</span><small>75,983 timed visits</small></article><article className="near"><b>Within ±1 minute</b><span>67.8%</span><small>1,035,925 timed visits</small></article><article className="minor"><b>1–5 min late</b><span>21.5%</span><small>329,195 timed visits</small></article><article className="serious"><b>&gt;5 min late</b><span>5.7%</span><small>87,587 timed visits</small></article></div>
      <p className="routepulse-explainer">These four categories partition all 1,528,690 visits with timing information. The five-minute headline threshold is a consistent RoutePulse analytical rule and is close to VBB&apos;s public regional-rail punctuality convention; it is not presented as one contractual rule shared by every operator and mode.</p>
    </section>

    <section className="case-section routepulse-code-section reverse">
      <pre aria-label="SQL showing mutually exclusive timing categories"><code>{categorySql}</code></pre>
      <div><p className="case-kicker">SQL CONCEPT 3 · CONDITIONAL AGGREGATION</p><h2>One pass creates mutually exclusive categories</h2><p><code>COUNT_IF</code> counts only rows that satisfy each condition. The boundaries are written so that a timed visit can enter exactly one category.</p><p>Missing timing values remain separate. They are never converted to zero because that would incorrectly turn unknown observations into on-time observations.</p></div>
    </section>

    <section className="case-section routepulse-method-grid">
      <div><p className="case-kicker">DENOMINATORS</p><h2>The percentage is only meaningful when its population is named</h2></div>
      <div className="rp-formulas"><article><b>Serious-delay share</b><code>visits &gt;5 minutes late ÷ visits with timing information</code><p>Answers: among the visits that could be compared with the timetable, how many were seriously late?</p></article><article><b>Timing-data availability</b><code>visits with timing information ÷ all observed visits</code><p>Answers: how much of the observed population could be assessed at all?</p></article><article><b>P90 reported delay</b><code>90th percentile of signed timing values</code><p>If P90 is 3.7 minutes, 90% of timed visits were no more delayed than 3.7 minutes; 10% were higher.</p></article></div>
    </section>

    <section className="case-section visual-section reverse routepulse-visual"><figure className="routepulse-screen wide"><ZoomableImage src="/projects/routepulse/station-analysis.png" alt="RoutePulse Brandenburg station ranking with a linked numbered map and explanatory tooltip"/><figcaption>Station rate, evidence size, regional benchmark, and location shown together. Click to enlarge.</figcaption></figure><div className="visual-intro"><p className="case-kicker">EVIDENCE-AWARE RANKINGS</p><h2>A high percentage is not automatically strong evidence</h2><p className="case-copy">Station and line rankings start at 100 timed visits. Results based on 100–299 visits are styled as early signals. The tooltip shows the serious-delay count, timed denominator, total observed visits, availability, and evidence note.</p><p className="case-copy">Berlin and Brandenburg are selectable separately. This prevents Berlin&apos;s dense service network from dominating every ranking and gives the Brandenburg map enough space to remain legible.</p></div></section>

    <section className="case-section routepulse-performance">
      <div><p className="case-kicker">PERFORMANCE ENGINEERING</p><h2>Fast filters came from changing the data flow, not hiding a loading spinner</h2><p>The first version issued new Snowflake queries when readers changed transport mode or station region. I moved repeated work into compact presentation tables, cached all supported mode and region rows together, and filtered the small Pandas results in memory.</p></div>
      <div className="rp-performance-grid"><article><span>S-BAHN MAP</span><b>1,555 → 308 ms</b><p>80.2% lower measured interaction time.</p></article><article><span>U-BAHN MAP</span><b>1,569 → 294 ms</b><p>81.3% lower measured interaction time.</p></article><article><span>WARM REGION FILTER</span><b>436–532 ms</b><p>Berlin/Brandenburg station switches in one public browser session.</p></article></div>
      <p className="routepulse-smallprint">These are indicative timings from selected browser sessions, not a cold-start, concurrency, or production load benchmark. A sleeping Community Cloud app or Snowflake warehouse can still make the first load slower.</p>
    </section>

    <section className="case-section routepulse-validation-section">
      <div><p className="case-kicker">VALIDATION</p><h2>The dashboard tables had to reconcile with the analytical source</h2><p>Validation checked schema assumptions, uniqueness, geographic totals, join coverage, category boundaries, presentation aggregates, and the public application. The six timing-aware dashboard models returned zero category mismatches and zero availability mismatches.</p><pre aria-label="Reconciliation rules"><code>{reconciliationSql}</code></pre><p>The direct source count for visits over five minutes late was 87,587. The dashboard all-mode/all-region count was also 87,587.</p></div>
      <figure className="routepulse-screen"><ZoomableImage src="/projects/routepulse/validation-results.png" alt="Snowflake validation output showing zero timing and availability mismatches across six dashboard models"/><figcaption>Six presentation models, zero timing-category mismatches, zero availability mismatches. Click to enlarge.</figcaption></figure>
    </section>

    <section className="case-section routepulse-checks">
      <p className="case-kicker">WHAT WAS TESTED</p><h2>Evidence was retained at each boundary</h2>
      <div className="rp-check-grid"><article><b>Collection</b><p>Snapshot inventory, headers, timestamps, source checksums, and sleep/wake behaviour.</p></article><article><b>Transformation</b><p>Typed conversion summary, field profiling, missing values, and compressed Parquet output.</p></article><article><b>Warehouse</b><p>Row counts, duplicate keys, joins, geographic reconciliation, category totals, and denominators.</p></article><article><b>Application</b><p>37 Python tests, linting, compilation, static contracts, packaging, public filters, maps, and browser smoke checks.</p></article></div>
    </section>

    <section className="case-section routepulse-boundaries"><div><p className="case-kicker">LIMITATIONS</p><h2>What the evidence supports—and what it does not</h2></div><div><ul><li>The sample covers only 39.5 Friday/weekend hours, not a normal weekday commute or long-term performance.</li><li>Realtime values may be predictions. They were not independently checked against actual arrival or departure timestamps.</li><li>Missing timing information reduces confidence and is excluded from delay-rate denominators.</li><li>Scheduled route shapes describe network coverage, not live vehicle movement or delay severity.</li><li>Rankings identify observations worth reviewing; they do not establish operational causes or passenger impact.</li></ul></div></section>

    <section className="case-section routepulse-sources">
      <p className="case-kicker">DEFINITIONS AND SOURCES</p><h2>The interpretation is tied to public specifications</h2>
      <p>RoutePulse uses the official GTFS-Realtime definition of signed delay values and documents its own analytical categories. The five-minute headline threshold is contextualised against public transport quality methods rather than presented as a universal industry rule.</p>
      <div><a href="https://gtfs.org/documentation/realtime/reference/" target="_blank" rel="noreferrer">GTFS-Realtime reference <FiExternalLink/></a><a href="https://unternehmen.vbb.de/qualitaet-im-oepnv/regionalverkehr/methodik/" target="_blank" rel="noreferrer">VBB regional-rail methodology <FiExternalLink/></a><a href="https://www.bvg.de/dam/jcr%3A70a93fa8-74b3-4b45-917f-41d7494576fa/bvg-geschaeftsbericht-2024.pdf" target="_blank" rel="noreferrer">BVG 2024 annual report <FiExternalLink/></a><a href="https://zbir.deutschebahn.com/2025/en/glossary/" target="_blank" rel="noreferrer">Deutsche Bahn punctuality glossary <FiExternalLink/></a></div>
    </section>

    <section className="case-section routepulse-narrative">
      <p className="case-kicker">WHAT THIS PROJECT DEMONSTRATES</p><h2>Data engineering, analytics, and communication had to work as one system</h2>
      <p>I designed the collection audit trail, Python transformation, S3 preservation boundary, Snowflake model sequence, SQL validation, Streamlit information architecture, geographic views, performance optimization, role-based access, and public deployment.</p>
      <p>The main lesson was that a dashboard becomes trustworthy through definitions and reconciliation: deciding what one row represents, keeping unknown values distinct from zero, naming every denominator, showing sample size, and writing limitations beside the result rather than hiding them in a separate report.</p>
    </section>

    <section className="case-closing"><p className="case-kicker">EXPLORE ROUTEPULSE</p><h2>Change the region, mode, and analytical view—or inspect the full implementation.</h2><p>The dashboard is public and read-only. The repository contains the ordered SQL scripts, Python pipeline, tests, evidence summaries, methodology, and deployment notes.</p><div className="case-actions"><a href={liveApp} target="_blank" rel="noreferrer">Open live dashboard <FiExternalLink/></a><a href={github} target="_blank" rel="noreferrer"><FaGithub/> View source code</a></div></section>
  </main></>;
}
