import type { Metadata } from "next";
import { FiExternalLink } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import { Header } from "../../_components";
import { ZoomableDiagram, ZoomableImage } from "../saidia-logistics-claims/ZoomableMedia";
import { RoutePulse3DExperience } from "./RoutePulse3DExperience";

export const metadata: Metadata = {
  title: "RoutePulse: Berlin and Brandenburg Mobility Analytics | Treva Antony Ogwang",
  description: "A detailed account of how I collected, tested, modelled and presented VBB public transport data with Python, Amazon S3, Snowflake and Streamlit.",
  openGraph: { title: "RoutePulse: Berlin and Brandenburg Mobility Analytics", description: "From VBB realtime snapshots to a tested Snowflake model and an interactive transport dashboard.", images: ["/projects/routepulse/routepulse-cover.webp"] },
  twitter: { card: "summary_large_image", title: "RoutePulse: Berlin and Brandenburg Mobility Analytics", description: "How I built and tested a public transport data pipeline from collection to dashboard.", images: ["/projects/routepulse/routepulse-cover.webp"] },
};

const liveApp = "https://routepulse-qdwrvckapptwi9xp74ueuuo.streamlit.app/";
const github = "https://github.com/Begge10850/routepulse";

const worksheets = [
  ["01_setup.sql", "Creates the X-Small warehouse, database, RAW and ANALYTICS schemas, and the Parquet file format."],
  ["02_storage_integration.sql", "Creates the secure, read-only Snowflake connection to the project S3 location. No AWS password or access key is stored in the worksheet."],
  ["03_external_stage.sql", "Creates the external stage and lists the Parquet objects Snowflake can see before any load begins."],
  ["04_load_raw_tables.sql", "Defines typed raw tables and uses COPY INTO to load feed snapshots, trip updates and stop-time updates."],
  ["05_analytics_models.sql", "Builds the first route, station, mode and hourly summaries used to explore the data."],
  ["06_gtfs_reference_tables.sql", "Loads static GTFS stops, routes, trips, stop times and shapes so realtime IDs can be translated into names and scheduled geography."],
  ["07_validate_gtfs_joins.sql", "Measures matched and unmatched stop and route IDs instead of assuming every realtime ID has a static reference."],
  ["08_named_station_analytics.sql", "Groups child platforms into readable parent stations and produces named station metrics."],
  ["09_unique_stop_events.sql", "Consolidates repeated feed snapshots to one retained observation for each trip, service date, stop sequence and stop."],
  ["10_geographic_event_enrichment.sql", "Assigns Berlin, Brandenburg, outside-area or unknown status at the observed stop and validates that the join did not change the event grain."],
  ["11_line_focus_models.sql", "Turns technical route IDs into passenger-facing lines and chooses representative scheduled stop patterns and shapes."],
  ["12_dashboard_ui_models.sql", "Precomputes the small additive tables used by every dashboard filter, while keeping counts and denominators separate."],
  ["13_community_cloud_access.sql", "Creates a restricted public reader role and warehouse for the deployed Streamlit app."],
  ["14_validate_regional_filters.sql", "Checks that All regions, Berlin and Brandenburg exist and reconcile in every presentation table."],
  ["15_validate_timing_categories.sql", "Checks the early, near-schedule, minor-delay, serious-delay and unavailable categories against the event table."],
];

const eventSql = `CREATE OR REPLACE TRANSIENT TABLE UNIQUE_STOP_EVENTS AS
SELECT
    s.trip_id,
    s.start_date,
    s.stop_sequence,
    s.stop_id,
    s.route_id,
    f.request_started_at AS observed_at_utc,
    COALESCE(
        s.arrival_delay_seconds,
        s.departure_delay_seconds
    ) AS reported_delay_seconds
FROM RAW.STOP_TIME_UPDATES AS s
JOIN RAW.FEED_SNAPSHOTS AS f
    ON s.snapshot_id = f.snapshot_id
QUALIFY ROW_NUMBER() OVER (
    PARTITION BY
        s.trip_id,
        s.start_date,
        s.stop_sequence,
        s.stop_id
    ORDER BY
        f.request_started_at DESC,
        s.snapshot_id DESC
) = 1;`;

const leftJoinSql = `FROM UNIQUE_STOP_EVENTS AS events
LEFT JOIN GTFS_STOPS_GEOGRAPHIC AS stops
    ON events.stop_id = stops.stop_id
LEFT JOIN ROUTE_GEOGRAPHIC_CATALOG AS routes
    ON REPLACE(events.route_id, '-', '_')
       = routes.static_route_id`;

const timingSql = `COUNT_IF(reported_delay_seconds < -60)
    AS early_events,
COUNT_IF(reported_delay_seconds BETWEEN -60 AND 60)
    AS near_schedule_events,
COUNT_IF(
    reported_delay_seconds > 60
    AND reported_delay_seconds <= 300
) AS minor_delay_events,
COUNT_IF(reported_delay_seconds > 300)
    AS serious_delay_events,
COUNT_IF(reported_delay_seconds IS NULL)
    AS timing_unavailable_events`;

const pythonTest = `def test_collect_once_rejects_duplicate_checksum(tmp_path):
    payload = make_valid_feed()
    checksum = sha256_bytes(payload)

    with pytest.raises(
        DuplicateSnapshotError,
        match=checksum,
    ):
        collect_once(
            config=make_config(),
            output_directory=tmp_path,
            client=client,
            known_checksums={checksum},
        )

    assert list(tmp_path.iterdir()) == []

def test_atomic_write_refuses_to_replace_existing_file(tmp_path):
    destination = tmp_path / "snapshot.pb"
    destination.write_bytes(b"original")

    with pytest.raises(
        FileExistsError,
        match="Snapshot already exists",
    ):
        storage.atomic_write_bytes(destination, b"replacement")

    assert destination.read_bytes() == b"original"`;

const parquetTest = `def test_rows_to_table_applies_explicit_schemas():
    stop_table = converter.rows_to_table(
        stop_rows,
        converter.STOP_SCHEMA,
    )

    assert stop_table.schema == converter.STOP_SCHEMA
    assert stop_table.num_rows == 2
    assert stop_table.column(
        "arrival_delay_seconds"
    )[0].as_py() == 0
    assert stop_table.column(
        "arrival_delay_seconds"
    )[1].as_py() is None`;

export default function RoutePulseCaseStudy() {
  return <><Header active="Projects" /><main className="case-container routepulse-case">
    <section className="case-hero">
      <p className="case-kicker">DATA ENGINEERING · SQL · ANALYTICS · PUBLIC TRANSPORT · 2026</p>
      <h1>RoutePulse: what the VBB realtime feed showed during 39.5 hours</h1>
      <p className="case-deck">I wanted to understand where and when public transport services in Berlin and Brandenburg were being reported behind schedule. Building the chart was only the final step. First I had to collect changing realtime messages, prove that files had not been damaged or overwritten, connect technical IDs to the static timetable, decide what one observation meant, and test every total shown to a reader.</p>
      <div className="case-actions"><a href={liveApp} target="_blank" rel="noreferrer">Open the live dashboard <FiExternalLink /></a><a href={github} target="_blank" rel="noreferrer"><FaGithub /> View the source code</a></div>
      <div className="case-facts"><span><b>Observed period</b>Fri 25 Sep to Sun 27 Sep 2026</span><span><b>Collection length</b>39.5 hours</span><span><b>Raw observations</b>94,839,920</span><span><b>Final stop visits</b>1,755,847</span></div>
    </section>

    <section className="case-summary"><div><p className="case-kicker">WHAT I BUILT</p><h2>A complete path from an official feed to a dashboard that explains its own limits</h2></div><div><p>RoutePulse collects VBB GTFS-Realtime data with Python, keeps an audit record beside every saved snapshot, converts the Protocol Buffer messages to typed Parquet files, stores the evidence in Amazon S3, models it in Snowflake, and serves compact presentation tables to Streamlit.</p><p>The dashboard can be filtered by observed stop area, transport mode and analytical view. The wording is careful because this is a short Friday and weekend sample. It shows what the feed reported during that window. It does not grade an operator&apos;s long-term performance or prove why a service was late.</p></div></section>

    <section className="case-section routepulse-3d-section"><p className="case-kicker">INTERACTIVE 3D NETWORK</p><h2>Separate five networks without losing their shared geography</h2><p className="rp-section-intro">Bus, tram, U-Bahn, S-Bahn and regional rail remain aligned to the same map. Combine the system into one surface or explode it into readable layers, rotate the model in any direction, and select a route to inspect its ordered stops and reported-delay journey. Vertical spacing is illustrative, not physical elevation or tunnel depth.</p><RoutePulse3DExperience /></section>

    <section className="case-section routepulse-diagram-section">
      <div className="routepulse-diagram-copy"><p className="case-kicker">THE PIPELINE</p><h2>Six stages, each with a different job</h2><p>GTFS Static supplies the planned network: stops, routes, trips, stop order and shapes. GTFS-Realtime supplies changing trip updates and timing values. A realtime snapshot is therefore not a final journey record. It is a view of what the feed knew at one moment.</p><p>I kept collection, conversion, storage, modelling and presentation separate so that a problem at one boundary could be found and tested without rewriting the whole project.</p></div>
      <figure className="routepulse-diagram"><ZoomableDiagram title="RoutePulse data pipeline"><div className="rp-architecture"><div className="rp-architecture-row"><div className="rp-node source"><b>VBB data</b><span>GTFS Static and Realtime</span></div><i>request</i><div className="rp-node"><b>Python collector</b><span>Save, hash and audit</span></div><i>decode</i><div className="rp-node"><b>Parquet</b><span>Typed, compressed tables</span></div></div><div className="rp-architecture-arrow">↓ upload and model</div><div className="rp-architecture-row"><div className="rp-node storage"><b>Amazon S3</b><span>Raw evidence and processed data</span></div><i>load</i><div className="rp-node warehouse"><b>Snowflake</b><span>Raw, analytical and dashboard models</span></div><i>read</i><div className="rp-node app"><b>Streamlit</b><span>Filters, maps and explanations</span></div></div></div></ZoomableDiagram><figcaption>The project keeps the original collection separate from the tables used for analysis.</figcaption></figure>
    </section>

    <section className="case-section routepulse-numbers"><p className="case-kicker">COLLECTION RESULT</p><h2>Why 94.8 million raw rows became 1.76 million stop visits</h2><div className="rp-number-flow"><article><strong>777</strong><span>saved realtime snapshots</span><p>Each request has a timestamp, response details, a checksum and a sidecar audit record.</p></article><article><strong>94.8M</strong><span>raw stop-time updates</span><p>An active trip reappears as the source feed refreshes, roughly every three minutes.</p></article><article><strong>1.76M</strong><span>retained stop visits</span><p>The latest observation was kept for each trip, service date, stop sequence and stop.</p></article><article><strong>0</strong><span>duplicate final keys</span><p>A Snowflake validation query confirmed that the chosen event key was unique.</p></article></div><p className="routepulse-explainer"><b>A simple example:</b> if one bus trip appeared in eight consecutive snapshots while approaching the same stop, counting all eight rows would make that bus look eight times more important than a trip seen once. The raw table keeps all eight messages for traceability. The analytical table keeps one selected observation for the stop visit.</p></section>

    <section className="case-section visual-section routepulse-visual rp-full-visual"><div className="visual-intro"><p className="case-kicker">THE FINISHED INTERFACE</p><h2>The area filter comes first because geography changes every result below it</h2><p className="case-copy">This current screenshot shows Brandenburg, S-Bahn and the Data quality view. The full RoutePulse heading is visible. The dashboard immediately states the collection window, selected scope, serious-delay share, upper-range timing value and timing-data availability.</p><p className="case-copy">Below those cards, timed visits are divided into early, near schedule, 1 to 5 minutes late and more than 5 minutes late. Those four percentages always add to 100%.</p></div><figure className="routepulse-screen wide"><ZoomableImage src="/projects/routepulse/dashboard-overview.png" alt="Current RoutePulse dashboard with the full heading, Brandenburg and S-Bahn filters, data quality cards and timing categories" /><figcaption>Current dashboard UI. The filters shown are Brandenburg, S-Bahn and Data quality.</figcaption></figure></section>

    <section className="case-section visual-section routepulse-visual rp-full-visual"><div className="visual-intro"><p className="case-kicker">ALL MODES</p><h2>The network map is a coverage map, not a delay map</h2><p className="case-copy">This is the correct All modes view. Yellow and orange lines show buses, red shows trams, blue shows U-Bahn, and green shows rail services. The dense centre is Berlin. The wider scheduled network extends across Brandenburg and beyond the study boundary where passenger-facing services continue.</p><p className="case-copy">The geometry comes from GTFS shapes. It describes representative scheduled paths, not live vehicle positions. I say this directly because a map can look authoritative even when the reader is looking at planned geography rather than measured performance.</p></div><figure className="routepulse-screen map-frame"><ZoomableImage src="/projects/routepulse/network-map.png" alt="All modes RoutePulse network map showing the dense Berlin centre and wider Brandenburg public transport network" /><figcaption>All observed transport modes shown together. Open the image for the full map.</figcaption></figure></section>

    <section className="case-section rp-gallery-section rp-mode-section"><p className="case-kicker">THE NETWORK BY TRANSPORT MODE</p><h2>The separate maps reveal routes that disappear inside the All modes view</h2><p className="rp-section-intro">The combined map is useful for understanding the full scale of the network, but the large number of bus routes covers many of the smaller rail and tram patterns. These maps use the same All regions scope and separate the modes so their different geographic roles are easier to see. They still show scheduled GTFS paths, not live vehicle movements.</p><div className="rp-image-grid rp-mode-grid">
      <figure className="routepulse-screen"><ZoomableImage src="/projects/routepulse/map-bus.webp" alt="RoutePulse All regions bus map showing dense bus coverage across Berlin and Brandenburg" /><figcaption><b>Bus.</b> The bus network has the broadest and densest local coverage. It fills gaps between rail corridors and explains why yellow routes dominate the combined map.</figcaption></figure>
      <figure className="routepulse-screen"><ZoomableImage src="/projects/routepulse/map-ubahn.webp" alt="RoutePulse All regions U-Bahn map showing the Berlin underground network" /><figcaption><b>U-Bahn.</b> The underground network is concentrated in Berlin. This closer view makes its compact city-focused structure and individual lines easier to see.</figcaption></figure>
      <figure className="routepulse-screen"><ZoomableImage src="/projects/routepulse/map-sbahn.webp" alt="RoutePulse All regions S-Bahn map showing radial routes from Berlin into surrounding towns" /><figcaption><b>S-Bahn.</b> The S-Bahn forms a radial metropolitan network. It connects central Berlin with places such as Potsdam, Oranienburg, Bernau, Strausberg and the south-eastern suburbs.</figcaption></figure>
      <figure className="routepulse-screen"><ZoomableImage src="/projects/routepulse/map-tram.webp" alt="RoutePulse All regions tram map showing separate urban tram networks in Berlin and Brandenburg" /><figcaption><b>Tram.</b> Tram coverage is not one continuous regional system. The map reveals separate clusters in Berlin, Potsdam, Brandenburg an der Havel and other Brandenburg towns.</figcaption></figure>
      <figure className="routepulse-screen rp-grid-wide"><ZoomableImage src="/projects/routepulse/map-regional-rail.webp" alt="RoutePulse All regions regional rail map showing long corridors across and beyond Berlin and Brandenburg" /><figcaption><b>Regional rail.</b> These are the longest corridors. They cross Berlin and Brandenburg and continue outside the study area because passenger services do not stop at the state boundary.</figcaption></figure>
    </div><p className="routepulse-explainer"><b>Explore the maps yourself:</b> these screenshots document the project, but the <a href={liveApp} target="_blank" rel="noreferrer">live RoutePulse dashboard</a> is interactive. Choose an observed stop area and transport mode, then switch between the network map, stations, lines, time and data-quality views.</p></section>

    <section className="case-section routepulse-sql-guide"><p className="case-kicker">THE SNOWFLAKE WORKSHEETS</p><h2>What each SQL file does, in the order I ran it</h2><p className="rp-section-intro">The repository contains 15 numbered SQL worksheets. The numbering matters: a later model depends on objects created and checked earlier. I did not put all the SQL into one giant script because setup, loading, modelling, permissions and validation are different responsibilities.</p><ol className="rp-worksheet-list">{worksheets.map(([name, description]) => <li key={name}><code>{name}</code><p>{description}</p></li>)}</ol></section>

    <section className="case-section routepulse-code-section rp-stack-code"><div><p className="case-kicker">SQL EXAMPLE 1</p><h2>Defining one stop visit with a window function</h2><p>The key is not just <code>trip_id</code>. A trip serves many stops, and the same trip ID can be reused on another service date. The partition therefore uses trip, date, stop sequence and stop ID. Inside each group, <code>ROW_NUMBER()</code> sorts observations from newest to oldest. <code>QUALIFY ... = 1</code> retains the newest row.</p><p>This rule creates the analytical event table. It does not delete or alter the raw snapshots.</p></div><pre aria-label="SQL from 09_unique_stop_events.sql"><code>{eventSql}</code></pre></section>

    <section className="case-section routepulse-code-section rp-stack-code"><div><p className="case-kicker">SQL EXAMPLE 2</p><h2>Why the enrichment uses LEFT JOIN</h2><p>A join connects rows from two tables. An inner join keeps only rows that match on both sides. A left join keeps every row from the table on the left, even when the reference table has no match.</p><p>Here the left side is the observed event table. Keeping unmatched events is important. If an event has an unknown stop or route ID, dropping it would make the data look cleaner than it really is. With a left join, the event remains in the total and its missing reference can be counted as a data-quality result.</p></div><pre aria-label="LEFT JOIN excerpt from the geographic enrichment worksheet"><code>{leftJoinSql}</code></pre></section>

    <section className="case-section routepulse-narrative"><p className="case-kicker">TIMING LANGUAGE</p><h2>A populated timing field does not automatically mean the service was late</h2><p>The GTFS-Realtime value is signed. A negative number means the feed reported the service ahead of the timetable. Zero means no difference. A positive number means behind the timetable. A null value means no usable timing comparison was supplied.</p><div className="rp-timing-grid"><article className="early"><b>More than 1 min early</b><span>5.0%</span><small>75,983 timed visits</small></article><article className="near"><b>Within 1 minute</b><span>67.8%</span><small>1,035,925 timed visits</small></article><article className="minor"><b>1 to 5 min late</b><span>21.5%</span><small>329,195 timed visits</small></article><article className="serious"><b>More than 5 min late</b><span>5.7%</span><small>87,587 timed visits</small></article></div><p className="routepulse-explainer"><b>Why I use “timing information”:</b> 131 visits with timing information does not mean 131 delays. It means 131 visits could be compared with the timetable. If 32 were more than five minutes behind schedule, the serious-delay share is 32 ÷ 131 = 24.4%.</p></section>

    <section className="case-section routepulse-code-section rp-stack-code"><div><p className="case-kicker">SQL EXAMPLE 3</p><h2>Building timing categories that cannot overlap</h2><p><code>COUNT_IF</code> counts only the rows that meet a condition. The limits below cover every non-null timing value exactly once. Missing timing values stay separate and are never changed to zero, because unknown is not the same as on schedule.</p></div><pre aria-label="Timing category SQL from 12_dashboard_ui_models.sql"><code>{timingSql}</code></pre></section>

    <section className="case-section routepulse-method-grid"><div><p className="case-kicker">HOW TO READ THE METRICS</p><h2>The numerator and denominator are both part of the answer</h2></div><div className="rp-formulas"><article><b>Serious-delay share</b><code>visits over 5 minutes late ÷ visits with timing information</code><p>This does not divide by all observed visits, because visits without a timing value could not be classified.</p></article><article><b>Timing-data availability</b><code>visits with timing information ÷ all observed visits</code><p>This shows how much of the observed population could actually be assessed.</p></article><article><b>Upper-range reported delay, P90</b><code>90th percentile of signed timing values</code><p>If P90 is 3.7 minutes, 90% of timed visits were reported no more than 3.7 minutes behind schedule. The remaining 10% were higher.</p></article></div></section>

    <section className="case-section rp-gallery-section"><p className="case-kicker">STATION ANALYSIS</p><h2>The same question looks different in Brandenburg and Berlin</h2><p className="rp-section-intro">Each station chart uses the selected area and mode. The dashed line is the matching area-and-mode average. Pale bars warn that the result rests on only 100 to 299 timed visits. The blue explanation box turns the first bar into a sentence with its numerator, denominator, comparison and limitation.</p><div className="rp-image-grid"><figure className="routepulse-screen"><ZoomableImage src="/projects/routepulse/station-analysis.png" alt="Brandenburg regional rail station analysis with ranked bars, linked map and plain-language interpretation" /><figcaption>Brandenburg regional rail. Grünheide, Fangschleuse Bf had 32 serious delays among 131 timed visits, so the result is labelled an early signal.</figcaption></figure><figure className="routepulse-screen"><ZoomableImage src="/projects/routepulse/station-berlin-regional-rail.png" alt="Berlin regional rail station ranking and linked station map" /><figcaption>Berlin regional rail. Separating the area prevents Berlin&apos;s dense network from overwhelming the Brandenburg view.</figcaption></figure><figure className="routepulse-screen rp-grid-wide"><ZoomableImage src="/projects/routepulse/station-berlin-bus.png" alt="Berlin bus station ranking showing unusually high serious-delay shares with sample warnings" /><figcaption>Berlin bus. The leading bars are striking, but their small evidence base is shown beside the finding rather than hidden in a footnote.</figcaption></figure></div></section>

    <section className="case-section rp-gallery-section"><p className="case-kicker">LINE ANALYSIS</p><h2>Line names include the mode and endpoints so a non-technical reader knows what 248 or U6 means</h2><p className="rp-section-intro">A route number alone is ambiguous. The dashboard now writes “Bus line 248” or “U-Bahn line U6” and includes the route endpoints. The label at the end of each bar gives the percentage and the count, for example 3,552 seriously late visits out of 7,713 timed visits.</p><div className="rp-image-grid"><figure className="routepulse-screen"><ZoomableImage src="/projects/routepulse/lines-bus.png" alt="Berlin bus line ranking with line numbers, route endpoints, percentages and counts" /><figcaption>Berlin bus lines ranked by the share of timed stop visits reported more than five minutes late.</figcaption></figure><figure className="routepulse-screen"><ZoomableImage src="/projects/routepulse/lines-ubahn.png" alt="Berlin U-Bahn line ranking with route endpoints, percentages and counts" /><figcaption>Berlin U-Bahn lines. The same metric is used, but the scale and distribution differ from the bus view.</figcaption></figure></div></section>

    <section className="case-section rp-gallery-section"><p className="case-kicker">TIME ANALYSIS</p><h2>The rate and the evidence volume must be read together</h2><p className="rp-section-intro">The orange line shows the share reported more than five minutes late. The grey bars show how many timed visits support each hourly rate. The first and last collection hours are marked as partial because comparing an incomplete hour with a complete hour can produce a misleading peak.</p><figure className="routepulse-screen map-frame"><ZoomableImage src="/projects/routepulse/time-analysis.png" alt="Hourly serious-delay share above bars showing the number of timed stop visits, with partial collection hours marked" /><figcaption>Hourly serious-delay share and its denominator across the 39.5-hour collection window.</figcaption></figure></section>

    <section className="case-section routepulse-tests"><p className="case-kicker">PYTHON TESTS FROM THE COLLECTION WORK</p><h2>The tests check failure cases, not only the happy path</h2><p className="rp-section-intro">The repository has 37 unit tests across collection, configuration, storage, profiling, Parquet conversion and S3 upload. They use small controlled feeds and temporary folders, so the behaviour can be checked without calling the live VBB endpoint or changing the real dataset.</p><div className="rp-test-grid"><article><b>Collector tests</b><p>Save a valid snapshot, reject the wrong content type, reject corrupt Protocol Buffer data, handle a 304 Not Modified response, and detect a repeated checksum.</p></article><article><b>Storage tests</b><p>Check stable SHA-256 hashes, different hashes for different payloads, atomic file creation, refusal to overwrite an existing snapshot, and the minimum free-disk guard.</p></article><article><b>Profiling tests</b><p>Count known trip updates, vehicle positions, alerts, deleted entities and field availability. Invalid JSON lines must fail with the correct line number.</p></article><article><b>Upload tests</b><p>Build an upload plan containing both data and evidence, reject a local checksum mismatch, compare remote metadata, and upload only missing objects.</p></article></div><div className="rp-code-pair"><div><h3>Protecting the raw evidence</h3><p>A repeated payload is not saved as a new snapshot, and an existing file can never be silently replaced.</p><pre aria-label="Python collection and storage tests"><code>{pythonTest}</code></pre></div><div><h3>Protecting types and missing values</h3><p>The converter must preserve the declared PyArrow schema. The test also distinguishes a real zero-second difference from a missing timing value.</p><pre aria-label="Python Parquet conversion test"><code>{parquetTest}</code></pre></div></div></section>

    <section className="case-section routepulse-validation-section"><div><p className="case-kicker">SNOWFLAKE VALIDATION</p><h2>The dashboard totals were compared back to the event table</h2><p>The final validation checks six dashboard models. For each row it recomputes the timing categories and data availability from their additive counts. Every model shown here returned zero timing-category mismatches and zero availability mismatches.</p><p>The direct event-table count for visits over five minutes late was 87,587. The all-mode, all-region dashboard count was also 87,587.</p></div><figure className="routepulse-screen"><ZoomableImage src="/projects/routepulse/validation-results.png" alt="Snowflake validation result with zero timing category and availability mismatches across six dashboard models" /><figcaption>Validation result after the timing categories were added to the presentation layer.</figcaption></figure></section>

    <section className="case-section routepulse-performance"><div><p className="case-kicker">FILTER PERFORMANCE</p><h2>The dashboard reads small presentation tables instead of rebuilding the analysis on every click</h2><p>The earlier version requested and recomputed more data when the user changed a mode or area. Worksheet 12 prepares all supported mode-and-region combinations in Snowflake. Streamlit caches those compact tables and applies the selected filter locally. The counts remain additive, so the app calculates rates from numerators and denominators rather than averaging percentages.</p></div><div className="rp-performance-grid"><article><span>S-BAHN MAP</span><b>1,555 to 308 ms</b><p>80.2% lower measured interaction time.</p></article><article><span>U-BAHN MAP</span><b>1,569 to 294 ms</b><p>81.3% lower measured interaction time.</p></article><article><span>WARM AREA FILTER</span><b>436 to 532 ms</b><p>Measured Berlin and Brandenburg station switches.</p></article></div><p className="routepulse-smallprint">These were selected warm-session browser measurements, not a production load test. A sleeping Streamlit app or Snowflake warehouse can still make the first request slower.</p></section>

    <section className="case-section routepulse-boundaries"><div><p className="case-kicker">WHAT I WOULD AND WOULD NOT CONCLUDE</p><h2>The project is useful because its boundary is visible</h2></div><div><ul><li>The 39.5-hour Friday and weekend sample is not a normal working week and should not be used as a long-term operator scorecard.</li><li>The feed values may contain predictions. I did not independently compare them with confirmed physical arrival or departure times.</li><li>A station with 100 to 299 timed visits can reveal a question worth investigating, but it is labelled as an early signal.</li><li>Missing timing information is measured separately and excluded from timing-category denominators.</li><li>Scheduled shapes show where services run. They do not show where a vehicle was when a delay occurred.</li><li>The dashboard describes patterns in the collected data. It does not establish the operational cause of a delay.</li></ul></div></section>

    <section className="case-cta"><p className="case-kicker">EXPLORE THE WORK</p><h2>Use the dashboard, then inspect the code and the numbered worksheets behind it.</h2><div className="case-actions"><a href={liveApp} target="_blank" rel="noreferrer">Open RoutePulse <FiExternalLink /></a><a href={github} target="_blank" rel="noreferrer"><FaGithub /> View the repository</a></div></section>
  </main></>;
}
