import type { Metadata } from "next";
import { Header } from "../../_components";

export const metadata: Metadata = {
  title: "Sales Performance Analytics with Databricks and Power BI | Treva Antony Ogwang",
  description: "How I validated 9,800 retail sales line items in Databricks and communicated the results through Power BI.",
  openGraph: { title: "Sales Performance Analytics", description: "A validated business-intelligence workflow from PySpark and SQL to Power BI.", images: ["/projects/sales-performance/cover.png"] },
  twitter: { card: "summary_large_image", title: "Sales Performance Analytics", description: "A validated business-intelligence workflow from PySpark and SQL to Power BI.", images: ["/projects/sales-performance/cover.png"] },
};

const findings = [
  ["Recorded sales value", "2,261,536.78", "The source does not document a currency."],
  ["Distinct orders", "4,922", "Calculated from unique Order IDs, not line items."],
  ["Average sales per order", "459.48", "Recorded sales divided by distinct orders."],
  ["Largest segment", "Consumer · 50.8%", "Share of recorded sales value."],
  ["Largest region", "West", "West and East together contributed 61.0%."],
  ["Q4 share", "38.5%", "November was the strongest calendar month."],
];

function DashboardFigure({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return <figure className="sales-dashboard"><img src={src} alt={alt}/><figcaption>{caption}</figcaption></figure>;
}

export default function SalesPerformanceCaseStudy() {
  return <><Header active="Projects"/><main className="case-container sales-case">
    <section className="case-hero"><p className="case-kicker">DATABRICKS · PYSPARK · SPARK SQL · POWER BI · 2025</p><h1>From 9,800 retail line items to a reconciled Power BI report</h1><p className="case-deck">I built the complete path from an operational sales table to a report a stakeholder could read quickly: establish the data grain, validate the source, define order-level metrics and reconcile the dashboard with Databricks.</p><div className="case-facts"><span><b>Data</b>9,800 retail sales line items</span><span><b>Period</b>2015–2018</span><span><b>Stack</b>Databricks · PySpark · SQL · Power BI</span><span><b>Output</b>Validated Delta table · two report pages</span></div><div className="case-actions"><a href="https://github.com/Begge10850/powerbu_sales_performance_dashboard" target="_blank" rel="noreferrer">View technical repository ↗</a></div></section>

    <section className="case-summary"><div><p className="case-kicker">WHAT I BUILT</p><h2>A validated analytical table and an interactive business report</h2></div><div><p>Databricks and PySpark prepared and tested the source. Spark SQL answered the business questions and published a reusable table. Power BI presented an executive summary and a filterable market breakdown.</p><p className="case-note">This is descriptive analysis. The data does not contain cost, profit, campaign, conversion, inventory or returns fields, so the project does not claim profitability or causal business impact.</p></div></section>

    <section className="case-section"><p className="case-kicker">THE IMPORTANT DATA DECISION</p><h2>One row is a product line, not an order</h2><p className="case-copy sales-copy">An order can contain several products. Counting rows would therefore overstate order volume and distort average-order calculations. I used distinct Order IDs for order-level KPIs and tested the prepared table before reporting results.</p><div className="research-grid sales-quality"><article><span>ROW RECONCILIATION</span><b>9,800 → 9,800</b><p>Preparation preserved the source count.</p></article><article><span>REQUIRED FIELDS</span><b>0 nulls</b><p>All analytical fields were populated.</p></article><article><span>VALUE AND DATE RULES</span><b>0 invalid rows</b><p>No non-positive sales or shipping before ordering.</p></article><article><span>DUPLICATE REVIEW</span><b>1 exact duplicate</b><p>Reported for review rather than silently deleted.</p></article></div></section>

    <section className="case-section"><p className="case-kicker">RESULTS</p><h2>Six findings that orient the reader</h2><div className="sales-answer-grid">{findings.map(([label,value,detail])=><article key={label}><span>{label}</span><b>{value}</b><p>{detail}</p></article>)}</div></section>

    <section className="case-section"><p className="case-kicker">EXECUTIVE REPORT</p><h2>Start with scale, order value and market concentration</h2><p className="case-copy sales-copy">The first page places the reconciled KPIs before segment, regional and annual views. The second page adds year and segment filters, shipping information, category rankings and monthly trends.</p><DashboardFigure src="/projects/sales-performance/executive-summary.png" alt="Executive sales summary with reconciled KPIs and market views" caption="The headline values reconcile with the validated Databricks table."/></section>

    <section className="case-section"><p className="case-kicker">INTERACTIVE BREAKDOWN</p><h2>The same definitions support narrower questions</h2><DashboardFigure src="/projects/sales-performance/market-breakdown.png" alt="Market performance report filtered to 2018 and Home Office" caption="A saved 2018 Home Office view demonstrates the report filters."/></section>

    <section className="case-section sales-boundaries"><div><p className="case-kicker">SUPPORTED</p><h2>What the project establishes</h2><ul><li>Consumer contributed the largest recorded sales share.</li><li>West and East were the leading regions.</li><li>Technology was the largest category.</li><li>Sales dipped in 2016, then rose in 2017 and 2018.</li></ul></div><div><p className="case-kicker">NOT SUPPORTED</p><h2>What the data cannot establish</h2><ul><li>No segment can be called the most profitable.</li><li>Seasonality cannot be attributed to a campaign.</li><li>The report does not measure conversion or marketing return.</li><li>No commercial uplift or production adoption is claimed.</li></ul></div></section>

    <section className="case-closing"><p className="case-kicker">EXPLORE THE WORK</p><h2>The website carries the story; GitHub carries the evidence.</h2><p>The repository contains the validated notebook, metric definitions, data dictionary, validation plan, DAX reference, reports and reproduction steps.</p><div className="case-actions"><a href="https://github.com/Begge10850/powerbu_sales_performance_dashboard" target="_blank" rel="noreferrer">View repository ↗</a><a href="/projects">Back to all projects</a></div></section>
  </main></>;
}
