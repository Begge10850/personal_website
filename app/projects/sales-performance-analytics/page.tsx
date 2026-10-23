import type { Metadata } from "next";
import { Footer, Header } from "../../_components";

export const metadata: Metadata = {
  title: "Sales Performance Analytics with Databricks and Power BI | Treva Antony Ogwang",
  description: "How I used Databricks, PySpark, Spark SQL and Power BI to validate 9,800 retail sales line items, define order-level KPIs and explain segment, regional, product and seasonal patterns.",
  openGraph: {
    title: "Sales Performance Analytics with Databricks and Power BI",
    description: "A verified end-to-end business-intelligence case study by Treva Antony Ogwang.",
    images: ["/projects/sales-performance/cover.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sales Performance Analytics with Databricks and Power BI",
    description: "A verified end-to-end business-intelligence case study by Treva Antony Ogwang.",
    images: ["/projects/sales-performance/cover.png"],
  },
};

const answers = [
  ["Recorded sales", "€2,261,536.78", "Across 9,800 product line items"],
  ["Distinct orders", "4,922", "Counted by unique Order ID"],
  ["Average sales per order", "€459.48", "Recorded sales divided by distinct orders"],
  ["Leading segment", "Consumer", "€1,148,060.53 · 50.8% of sales"],
  ["Leading region", "West", "€710,219.68 · West and East combined: 61.0%"],
  ["Leading category", "Technology", "€827,455.87"],
  ["Leading sub-categories", "Phones and Chairs", "The two largest sub-category contributors"],
  ["Leading customer and state", "Sean Miller · California", "Highest recorded totals in their respective views"],
  ["Most frequent ship mode", "Standard Class", "Measured by sales line-item frequency"],
  ["Strongest calendar month", "November", "Followed by December and September"],
  ["Fourth-quarter share", "38.5%", "€871,138.18 recorded in Q4"],
  ["Highest-sales year", "2018", "€722,052.02 after a 2016 dip and later growth"],
];

const annualSales = [
  ["2015", "€479,856.21"],
  ["2016", "€459,436.01"],
  ["2017", "€600,192.56"],
  ["2018", "€722,052.02"],
];

function DashboardFigure({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return <figure className="sales-dashboard"><img src={src} alt={alt}/><figcaption>{caption}</figcaption></figure>;
}

export default function SalesPerformanceCaseStudy() {
  return <><Header active="Projects"/><main className="case-container sales-case">
    <section className="case-hero">
      <p className="case-kicker">DATABRICKS · PYSPARK · SPARK SQL · POWER BI · BUSINESS INTELLIGENCE · 2025</p>
      <h1>Sales Performance Analytics: from 9,800 retail line items to an executive Power BI report</h1>
      <p className="case-deck">I wanted to practise the complete path from operational sales data to a report that a business stakeholder could read quickly. The charts were only the final layer. First I had to understand what one row represented, validate the data, define the metrics, answer the commercial questions, and make sure the figures agreed across Databricks and Power BI.</p>
      <div className="case-facts"><span><b>Data</b>9,800 retail sales line items</span><span><b>Period</b>2015-2018</span><span><b>Built with</b>Databricks, PySpark, SQL &amp; Power BI</span><span><b>Output</b>Validated table &amp; two-page report</span></div>
      <div className="case-actions"><a href="https://github.com/Begge10850/powerbu_sales_performance_dashboard" target="_blank" rel="noreferrer">View the repository ↗</a></div>
    </section>

    <section className="case-summary"><div><p className="case-kicker">WHAT I BUILT</p><h2>A validated path from a Spark table to an interactive business report</h2></div><div><p>I used Databricks to inspect and prepare the source, PySpark to validate the analytical fields, and Spark SQL to answer the business questions. I then built a Power BI executive summary and a detailed market breakdown.</p><p className="case-note">This is a descriptive analytics project. It explains recorded sales patterns; it does not claim to measure profit, marketing return, conversion, or the causes of customer behaviour because those fields are not present.</p></div></section>

    <section className="case-section"><p className="case-kicker">THE WORKFLOW</p><h2>Five stages, from source validation to communication</h2><div className="sales-process"><article><span>01</span><b>Load and inspect</b><p>Read the registered Databricks table and confirm the expected schema and 9,800 source rows.</p></article><article><span>02</span><b>Prepare</b><p>Standardise dates and sales values, create year and month fields, and retain the fields needed for analysis.</p></article><article><span>03</span><b>Validate</b><p>Check required columns, nulls, exact duplicates, value ranges, shipping dates, and row-count preservation.</p></article><article><span>04</span><b>Analyse and publish</b><p>Use Spark SQL for the business questions and publish a reusable Delta table for reporting.</p></article><article><span>05</span><b>Communicate</b><p>Build Power BI pages, reconcile their KPIs to Databricks, and explain the results and their limits.</p></article></div></section>

    <section className="case-section"><p className="case-kicker">THE QUESTIONS</p><h2>What was I trying to understand?</h2><div className="principle-grid"><article><b>Scale and order value</b><p>How much sales value was recorded, how many distinct orders produced it, and what was the average sales value per order?</p></article><article><b>Customers and markets</b><p>Which customer segment, customer, region, and state contributed the largest recorded totals?</p></article><article><b>Products and fulfilment</b><p>Which categories and sub-categories led the portfolio, and which shipping mode appeared most frequently?</p></article><article><b>Time and seasonality</b><p>How did annual sales change, which calendar months were strongest, and how much was concentrated in Q4?</p></article></div></section>

    <section className="case-section"><p className="case-kicker">DATA GRAIN &amp; QUALITY</p><h2>One row is a product line, not an order</h2><p className="case-copy sales-copy">An order can contain several products, so counting rows would overstate the number of orders. I used distinct Order IDs for order-level KPIs and tested the prepared data before calculating the results.</p><div className="research-grid sales-quality"><article><span>SOURCE RECONCILIATION</span><b>9,800 → 9,800 rows</b><p>The preparation step preserved the complete source row count.</p></article><article><span>ORDER GRAIN</span><b>4,922 distinct orders</b><p>Order metrics use unique Order IDs rather than product-line counts.</p></article><article><span>FIELD COMPLETENESS</span><b>0 null analytical fields</b><p>The fields used by the report contained no missing values.</p></article><article><span>VALUE &amp; DATE CHECKS</span><b>0 invalid records</b><p>No non-positive sales and no shipping dates before their order dates.</p></article><article><span>DUPLICATE REVIEW</span><b>1 exact duplicate</b><p>Reported transparently for review rather than silently removed.</p></article><article><span>PUBLISHED TABLE</span><b>KPIs reconciled</b><p>The Delta table returned the same rows, orders, and sales total after publication.</p></article></div></section>

    <section className="case-section"><p className="case-kicker">ANSWERS AT A GLANCE</p><h2>Each business question produced a result</h2><div className="sales-answer-grid">{answers.map(([question,value,detail])=><article key={question}><span>{question}</span><b>{value}</b><p>{detail}</p></article>)}</div></section>

    <section className="case-section"><p className="case-kicker">EXECUTIVE REPORT</p><h2>Start with scale, order value, market concentration, and direction</h2><p className="case-copy sales-copy">The first page presents three reconciled KPIs—recorded sales, distinct orders, and average sales per order—before showing the segment, regional, and annual contributions behind them.</p><DashboardFigure src="/projects/sales-performance/executive-summary.png" alt="Executive Sales Summary showing recorded sales, distinct orders, average sales per order, segments, regions and annual trend" caption="Executive Sales Summary. The headline KPIs reconcile to the validated Databricks table."/></section>

    <section className="case-section sales-narrative"><p className="case-kicker">CUSTOMER SEGMENTS</p><h2>Consumer contributed just over half of recorded sales</h2><p>Consumer generated €1,148,060.53, or approximately <strong>50.8%</strong> of recorded sales. Corporate contributed €688,494.07, while Home Office contributed €424,982.18.</p><p>This answers where recorded sales were concentrated. It does not establish which segment was most profitable because the dataset does not include costs, margin, or profit.</p></section>

    <section className="case-section sales-narrative"><p className="case-kicker">REGIONS</p><h2>West and East together contributed approximately 61% of sales</h2><p>West led with €710,219.68, followed by East with €669,518.73. Central recorded €492,646.91 and South €389,151.46.</p><p>The result identifies the largest historical markets and supports deeper inventory or market analysis. It does not by itself explain why those regions were larger or predict the return from additional investment.</p></section>

    <section className="case-section sales-narrative"><p className="case-kicker">PRODUCT PORTFOLIO</p><h2>Technology led the categories, while Phones and Chairs led the sub-categories</h2><p>Technology recorded €827,455.87, followed by Furniture at €728,658.58 and Office Supplies at €705,422.33. Phones and Chairs were the two largest sub-category contributors, followed by Storage, Tables, and Binders.</p><p>The three category totals remain relatively balanced, so this is a portfolio-composition result rather than a reason to ignore the other product groups.</p></section>

    <section className="case-section"><p className="case-kicker">TIME</p><h2>Sales dipped in 2016 before rising in 2017 and 2018</h2><div className="sales-time"><div className="sales-year-list">{annualSales.map(([year,value])=><article key={year}><span>{year}</span><b>{value}</b></article>)}</div><div><p>The pattern is not uninterrupted growth. Sales fell by approximately 4.3% in 2016 and then increased in the following two years, reaching their highest level in 2018.</p><p>Across all four years, November was the strongest calendar month, followed by December and September. Q4 contributed €871,138.18, or <strong>38.5%</strong> of total recorded sales.</p><p className="case-note sales-note">The seasonal concentration can guide a planning hypothesis, but campaign and conversion data would be needed to test what caused it.</p></div></div></section>

    <section className="case-section"><p className="case-kicker">INTERACTIVE BREAKDOWN</p><h2>Filters move the analysis from the overall picture to a specific market slice</h2><p className="case-copy sales-copy">The second page adds year and segment filters, shipping-mode information, a segment-category matrix, sub-category rankings, category share, and monthly trends. The example below shows the saved 2018 and Home Office view.</p><DashboardFigure src="/projects/sales-performance/market-breakdown.png" alt="Market Performance Overview filtered to 2018 and the Home Office customer segment" caption="Market Performance Overview. The saved filter state demonstrates how the same definitions support a narrower analytical question."/></section>

    <section className="case-section"><p className="case-kicker">REPORT WALKTHROUGH</p><h2>See how the finished Power BI report moves from summary to detail</h2><p className="case-copy sales-copy">This short recording shows the report as a reader experiences it: starting with the executive KPIs, moving between report pages, and using the available filters to examine the results from different angles.</p><figure className="sales-video"><video controls preload="metadata" playsInline poster="/projects/sales-performance/executive-summary.png"><source src="/projects/sales-performance/presentation-walkthrough.m4v" type="video/mp4"/>Your browser cannot play this recording. <a href="/projects/sales-performance/presentation-walkthrough.m4v">Download the walkthrough instead.</a></video><figcaption>Power BI presentation walkthrough.</figcaption></figure></section>

    <section className="case-section sales-boundaries"><div><p className="case-kicker">WHAT I WOULD CONCLUDE</p><h2>The report answers descriptive sales questions</h2><ul><li>Consumer contributed the largest share of recorded sales.</li><li>West and East were the leading regions.</li><li>Technology was the leading product category.</li><li>Recorded sales were highest in 2018.</li><li>Q4 contained a substantial share of the historical sales value.</li></ul></div><div><p className="case-kicker">WHAT I WOULD NOT CONCLUDE</p><h2>The available fields set the boundary</h2><ul><li>No segment or region can be called the most profitable.</li><li>The seasonal pattern cannot be attributed to a campaign.</li><li>The data does not measure conversion or marketing ROI.</li><li>The project is not presented as a live commercial deployment.</li><li>No measured business uplift is claimed.</li></ul></div></section>

    <section className="case-section"><p className="case-kicker">WHAT THE PROJECT DEMONSTRATES</p><h2>Technical analysis and stakeholder communication in one workflow</h2><div className="priority-grid sales-skills"><article><span>PREPARE</span><b>PySpark data work</b><p>Schema inspection, type preparation, analytical fields, and reusable table publication.</p></article><article><span>VALIDATE</span><b>Data-quality checks</b><p>Row counts, nulls, duplicates, value rules, date logic, and KPI reconciliation.</p></article><article><span>ANALYSE</span><b>Spark SQL</b><p>Segment, regional, customer, product, shipping, annual, and seasonal analysis.</p></article><article><span>COMMUNICATE</span><b>Power BI</b><p>Executive KPIs, interactive filters, clear visual hierarchy, and bounded interpretation.</p></article></div></section>

    <section className="case-closing"><p className="case-kicker">EXPLORE THE WORK</p><h2>The dashboard is the visible result; the repository contains the evidence behind it.</h2><p>Inspect the notebook, validation plan, data dictionary, metric definitions, DAX reference, reports, and project documentation.</p><div className="case-actions"><a href="https://github.com/Begge10850/powerbu_sales_performance_dashboard" target="_blank" rel="noreferrer">View the repository ↗</a><a href="/projects">Back to all projects</a></div></section>
  </main><Footer/></>;
}
