/* ==========================================================================
   IIC Oil & Gas — News content
   --------------------------------------------------------------------------
   HOW TO ADD A POST
   1. Copy one object below and paste it at the TOP of the array.
   2. Give it a unique `slug` (lowercase-with-dashes). The page URL becomes
      article.html?slug=<your-slug>
   3. `category` must be one of: "Company", "Trading", "Product Guides", "Compliance"
   4. `date` is YYYY-MM-DD. Posts are sorted newest first automatically.
   5. `featured: true` pins a post to the big card (only the newest featured one is used).
   6. Optional `video` adds a video to the article (see the Berbera post).
      `announcement: true` marks real company deals/partnerships; only these
      appear in the thin news strip under the homepage hero.
   7. `body` is HTML. Use <h2 id="..."> for section headings — they build the
      "On this page" menu automatically.

   NOTE: These are starter articles written for launch. Product-guide and
   compliance pieces are general industry explainers; please have them
   reviewed internally before publishing.
   ========================================================================== */

const IMG = (id, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

window.IIC_NEWS = [
  {
    slug: "iic-partners-with-berbera-rfs-depot",
    announcement: true,
    title: "IIC Oil & Gas partners with Berbera RFS Depot to back its next phase",
    category: "Company",
    date: "2026-09-28",
    featured: true,
    readMins: 3,
    image: "assets/img/news-berbera-rfs-depot.jpg",
    imageAlt: "Aerial view of white fuel storage tanks at Berbera RFS Depot on the coast of Somaliland",
    // Optional video: shown near the top of the article; `preview` is a short silent
    // loop that plays on the featured news card.
    video: {
      src: "assets/video/berbera-rfs-depot-tour.mp4",
      preview: "assets/video/berbera-rfs-depot-preview.mp4?v=3", // clip from 1:17
      previewPoster: "assets/img/berbera-rfs-depot-preview-poster.jpg",
      poster: "assets/img/berbera-rfs-depot-poster.jpg",
      duration: "4:10",
      caption: "A tour of Berbera RFS Depot: the tank farm, pipework, loading gantries and terminal offices."
    },
    excerpt:
      "We are investing in Phase 2 of the Berbera Regional Fuel Storage terminal in Somaliland, a new fuel gateway for Ethiopia and the Horn of Africa.",
    body: `
      <p class="lede">IIC Oil &amp; Gas has partnered with Berbera Regional Fuel Storage (RFS) Depot and is investing in the next phase of its fuel terminal in Berbera, Somaliland.</p>
      <h2 id="the-terminal">The terminal</h2>
      <p>Berbera RFS Depot is a modern fuel storage terminal on Somaliland's Red Sea coast. Construction began in October 2023, and the first phase is already complete and handed over.</p>
      <ul>
        <li><strong>Phase 1 (complete):</strong> 125,000 m³ of storage for diesel, petrol and Jet A-1.</li>
        <li><strong>Phase 2 (targeted for February 2027):</strong> a further 84,000 m³, bringing total capacity to <strong>209,000 m³</strong>.</li>
        <li>Ships unload at an offshore mooring connected directly to the terminal by dedicated pipelines, and more than 53 vessels have been handled safely in two years of operation.</li>
        <li>The terminal's construction has been certified by the international inspection body Bureau Veritas.</li>
      </ul>
      <h2 id="why-berbera">Why Berbera matters</h2>
      <p>Ethiopia, one of Africa's fastest-growing economies, has no coastline of its own, and around 95% of its fuel imports currently pass through a single port in Djibouti. As demand keeps rising, the region needs a second reliable supply route.</p>
      <p>Berbera offers exactly that: an active deep-water port about 900 km from Addis Ababa. The terminal already has a long-term supply agreement with Ethiopia's state petroleum importer, the Ethiopian Petroleum Supply Enterprise (EPSE).</p>
      <blockquote>By backing the next phase at Berbera, we are helping to build a more secure fuel supply for Ethiopia and the wider Horn of Africa.</blockquote>
      <h2 id="what-it-means">What this means for our clients</h2>
      <p>The partnership strengthens our reach in East Africa and gives our trading desk access to a new, well-connected storage and distribution hub for diesel, petrol and jet fuel.</p>
      <p>To discuss supply through Berbera, call <a href="tel:+97148347004">+971 4 834 7004</a> or email <a href="mailto:office@iicpetroleum.com">office@iicpetroleum.com</a>.</p>
    `
  },
  {
    slug: "rotterdam-diesel-storage-agreement",
    announcement: true,
    title: "IIC Oil & Gas secures diesel storage in the Port of Rotterdam",
    category: "Trading",
    date: "2026-09-24",
    readMins: 2,
    image: IMG("photo-1784911543434-da2b61e1128e"),
    imageAlt: "Large fuel storage tanks beside the water under a clear sky",
    excerpt:
      "A 12-month storage agreement with Vinni V. Shipping gives us tank space in Europe's largest port for up to 200,000 tonnes of diesel.",
    body: `
      <p class="lede">IIC Oil &amp; Gas has signed a tank storage agreement with Vinni V. Shipping B.V., giving us dedicated fuel storage at the Port of Rotterdam in the Netherlands.</p>
      <h2 id="the-agreement">The agreement</h2>
      <ul>
        <li><strong>What we'll store:</strong> between 100,000 and 200,000 tonnes of <a href="article.html?slug=en590-10ppm-diesel-explained">EN590 10ppm diesel</a>, the clean, ultra-low-sulphur diesel used by modern vehicles.</li>
        <li><strong>Where:</strong> shore-side storage tanks in the Port of Rotterdam, Europe's largest port and one of the world's main fuel hubs.</li>
        <li><strong>How long:</strong> 12 months from 24 September 2026, with the option to extend.</li>
      </ul>
      <h2 id="why-it-matters">Why it matters</h2>
      <p>Holding fuel in storage close to our customers means we can deliver faster and more flexibly, instead of waiting for each cargo to arrive from the refinery. Diesel is delivered into the tanks by pipeline or rail and loaded onto tankers when our customers need it.</p>
      <p>Vinni V. Shipping also has storage available in other major hubs, including Houston, Singapore and Fujairah, giving us room to grow our supply network.</p>
      <p>To discuss diesel supply, <a href="products.html#enquiry">request a quotation</a>.</p>
    `
  },
  {
    slug: "vinni-shipping-charter-agreement",
    announcement: true,
    title: "12-month shipping agreement with Vinni V. Shipping",
    category: "Trading",
    date: "2026-09-24",
    readMins: 2,
    image: IMG("photo-1568347877321-f8935c7dc5a3"),
    imageAlt: "A red and white tanker ship sailing in open sea",
    excerpt:
      "Vinni V. Shipping will provide tanker ships to carry our diesel cargoes over the next year, securing reliable transport for our customers.",
    body: `
      <p class="lede">IIC Oil &amp; Gas has signed a charter party agreement with Vinni V. Shipping B.V., a shipping company based in the Port of Rotterdam.</p>
      <p>A charter party agreement is a contract to hire ships. Under this one, Vinni V. Shipping will provide tankers to transport our fuel cargoes.</p>
      <h2 id="the-agreement">The agreement</h2>
      <ul>
        <li><strong>Cargo:</strong> <a href="article.html?slug=en590-10ppm-diesel-explained">EN590 10ppm diesel</a>, in shipments of 100,000 to 200,000 tonnes.</li>
        <li><strong>Duration:</strong> 12 months, from 24 September 2026 to 23 September 2027, with the option to extend.</li>
        <li><strong>Schedule:</strong> shipments follow a delivery plan agreed between both companies.</li>
      </ul>
      <h2 id="why-it-matters">Why it matters</h2>
      <p>Securing ships in advance means our deliveries don't depend on finding a vessel at short notice. Together with our new <a href="article.html?slug=rotterdam-diesel-storage-agreement">storage agreement in Rotterdam</a>, it gives us a complete chain: we can store diesel close to market and ship it on to customers when they need it.</p>
    `
  },
  {
    slug: "monarch-singapore-fujairah-charter",
    announcement: true,
    title: "Tanker chartered to carry 200,000 tonnes of diesel from Singapore to Fujairah",
    category: "Trading",
    date: "2026-09-20",
    readMins: 2,
    image: IMG("photo-1720761735305-025bd44521b2"),
    imageAlt: "The red deck of a large oil tanker at sea under a rainbow",
    excerpt:
      "An agreement with Monarch Nexus Barakah will move a full tanker of diesel from Asia's leading refining hub to the UAE.",
    body: `
      <p class="lede">IIC Oil &amp; Gas has signed a charter party agreement with Monarch Nexus Barakah Pte Ltd, a Singapore-based shipping and maritime company, to transport a large diesel cargo to the UAE.</p>
      <h2 id="the-shipment">The shipment</h2>
      <ul>
        <li><strong>Cargo:</strong> about 200,000 tonnes of <a href="article.html?slug=en590-10ppm-diesel-explained">EN590 10ppm diesel</a>, carried on one large oil tanker.</li>
        <li><strong>From:</strong> Jurong, Singapore, one of Asia's biggest refining and fuel-storage centres.</li>
        <li><strong>To:</strong> the port of Fujairah in the UAE, one of the world's largest fuel storage and ship-refuelling hubs.</li>
        <li><strong>Timing:</strong> loading is planned for September 2026, subject to final vessel and port confirmations.</li>
      </ul>
      <h2 id="why-it-matters">Why it matters</h2>
      <p>This route links supply from Asia directly to our home market in the UAE. Fujairah sits outside the Strait of Hormuz on the Gulf of Oman, which makes it a natural base for serving customers across the Middle East, East Africa and the Indian Ocean.</p>
      <p>To discuss supply into the UAE, <a href="products.html#enquiry">contact our trading desk</a>.</p>
    `
  },
  {
    slug: "en590-10ppm-diesel-explained",
    title: "EN590 10ppm diesel, explained: what the specification actually guarantees",
    category: "Product Guides",
    date: "2026-09-10",
    readMins: 5,
    image: IMG("photo-1726731782158-fcf6822b6ca4"),
    imageAlt: "Red and white pipework at a refinery",
    excerpt:
      "EN590 is the most traded diesel specification in the world. Here's what the key limits mean for buyers — and which numbers to check on a Certificate of Quality.",
    body: `
      <p class="lede">EN 590 is the European standard for automotive diesel, and it has become a global benchmark. When a contract says "EN590 10ppm", it refers to a set of measurable limits — not just a sulphur number.</p>
      <h2 id="key-limits">The key limits</h2>
      <table>
        <thead><tr><th>Property</th><th>EN 590 limit</th><th>Why it matters</th></tr></thead>
        <tbody>
          <tr><td>Sulphur</td><td>≤ 10 mg/kg (10 ppm)</td><td>Protects modern after-treatment systems</td></tr>
          <tr><td>Cetane number</td><td>≥ 51</td><td>Ignition quality, cold starts, noise</td></tr>
          <tr><td>Density at 15 °C</td><td>820–845 kg/m³</td><td>Energy content and injector calibration</td></tr>
          <tr><td>Flash point</td><td>&gt; 55 °C</td><td>Safe storage and handling</td></tr>
          <tr><td>FAME content</td><td>≤ 7% v/v</td><td>Biodiesel blend limit</td></tr>
        </tbody>
      </table>
      <h2 id="climate-grades">Climate grades</h2>
      <p>EN 590 also defines cold-flow classes (CFPP) for temperate and arctic climates. For Gulf and most tropical destinations, summer grades are standard; for northern-hemisphere winter deliveries, confirm the CFPP class in the contract.</p>
      <h2 id="what-to-check">What to check on the paperwork</h2>
      <ol>
        <li>The Certificate of Quality is issued by an independent inspector at the load port.</li>
        <li>Sulphur, density, flash point and cetane values sit inside the limits above.</li>
        <li>The sample date and tank or vessel reference match the Bill of Lading.</li>
      </ol>
      <p>IIC Oil &amp; Gas supplies EN590 10ppm in monthly allocations of 10,000 to 500,000 metric tons. <a href="products.html#enquiry">Request a quotation</a>.</p>
    `
  },
  {
    slug: "jet-a1-vs-colonial-grade-54",
    title: "Jet A-1 vs. Colonial Grade 54: choosing the right aviation kerosene",
    category: "Product Guides",
    date: "2026-08-21",
    readMins: 4,
    image: IMG("photo-1629540946404-ebe133e99f49"),
    imageAlt: "Semi-submersible drilling rig docked in a harbour at dusk",
    excerpt:
      "Both are kerosene-type jet fuels, but they are made for different markets. The biggest practical difference is freezing point.",
    body: `
      <p class="lede">Jet A-1 and Colonial Grade 54 (the US pipeline specification for Jet A) are both kerosene-type turbine fuels. Most properties overlap; the important difference is how cold the fuel can get before wax crystals form.</p>
      <h2 id="at-a-glance">At a glance</h2>
      <table>
        <thead><tr><th></th><th>Jet A-1</th><th>Colonial Grade 54 (Jet A)</th></tr></thead>
        <tbody>
          <tr><td>Main standards</td><td>DEF STAN 91-091, ASTM D1655, AFQRJOS</td><td>ASTM D1655, Colonial Pipeline spec</td></tr>
          <tr><td>Max freezing point</td><td>−47 °C</td><td>−40 °C</td></tr>
          <tr><td>Min flash point</td><td>38 °C</td><td>38 °C</td></tr>
          <tr><td>Typical market</td><td>International aviation worldwide</td><td>United States domestic</td></tr>
        </tbody>
      </table>
      <h2 id="which-one">Which one do you need?</h2>
      <p>For international airports and long-haul operations, Jet A-1 is the default because its lower freezing point suits high-altitude, long-duration flights. Colonial Grade 54 is used mainly in North American distribution systems.</p>
      <h2 id="handling">Handling and quality</h2>
      <p>Aviation fuel has the strictest handling chain of any product we trade. Expect dedicated tankage, a documented chain of custody, and re-certification testing whenever the fuel moves between storage systems.</p>
      <p>We supply both grades in allocations from 500,000 to 5 million barrels per month. <a href="products.html#enquiry">Talk to our desk</a>.</p>
    `
  },
  {
    slug: "incoterms-2020-petroleum-cargoes",
    title: "FOB, CIF or DAP? Incoterms® 2020 for petroleum cargoes",
    category: "Trading",
    date: "2026-07-30",
    readMins: 6,
    image: IMG("photo-1518527989017-5baca7a58d3c"),
    imageAlt: "Aerial view of a tanker ship at sea",
    excerpt:
      "The delivery term in your contract decides who pays for freight and insurance — and exactly when risk passes. A practical guide for fuel buyers.",
    body: `
      <p class="lede">In petroleum trading, the Incoterm isn't a formality. It decides who charters the vessel, who insures the cargo and the exact moment risk passes from seller to buyer.</p>
      <h2 id="fob">FOB — Free On Board</h2>
      <p>The seller delivers the cargo on board the buyer's nominated vessel at the load port. Risk passes once the product is on board. The buyer arranges and pays for freight and insurance.</p>
      <p><strong>Best for:</strong> buyers with their own chartering capability who want control over shipping.</p>
      <h2 id="cif">CIF — Cost, Insurance and Freight</h2>
      <p>The seller pays freight and insurance to the destination port, but <em>risk still passes at loading</em>. Under Incoterms 2020, the seller's minimum insurance obligation for CIF is Institute Cargo Clauses (C), so buyers wanting broader cover should specify it.</p>
      <h2 id="dap">DAP — Delivered At Place</h2>
      <p>The seller bears risk and cost until the cargo arrives at the named destination, ready for unloading. DAP replaced the older "DES" (Delivered Ex Ship) term, which you'll still see quoted informally.</p>
      <h2 id="checklist">Contract checklist</h2>
      <ul>
        <li>Named port <em>and</em> Incoterms version (e.g. "CIF Jebel Ali, Incoterms® 2020").</li>
        <li>Laycan (loading window) and demurrage rate.</li>
        <li>Which inspection results are final for quantity and quality — load port or discharge port.</li>
        <li>Payment instrument and when it becomes operative.</li>
      </ul>
      <blockquote>Incoterms® is a registered trademark of the International Chamber of Commerce.</blockquote>
    `
  },
  {
    slug: "inside-a-cargo-inspection",
    title: "Inside a cargo inspection: from shore tank to Certificate of Quality",
    category: "Trading",
    date: "2026-07-08",
    readMins: 5,
    image: IMG("photo-1695800293626-c71dffa08164"),
    imageAlt: "Two large white fuel storage tanks",
    excerpt:
      "Independent inspection protects both sides of a trade. Here's what the inspector does at the load port and which documents you should expect.",
    body: `
      <p class="lede">Before a petroleum cargo sails, an independent inspection company — appointed under the contract — measures how much product was loaded and checks that it meets specification.</p>
      <h2 id="quantity">1. Quantity</h2>
      <p>Inspectors gauge shore tanks before and after loading, then take vessel ullage measurements. Volumes are corrected to standard temperature and compared, and any significant difference between shore and ship figures is recorded.</p>
      <h2 id="quality">2. Quality</h2>
      <p>Samples are drawn from the shore tank, the pipeline and the vessel's tanks. An accredited laboratory tests them against the contract specification (for example EN 590 or ASTM D1655), and retained samples are sealed in case of a dispute.</p>
      <h2 id="documents">3. Documents</h2>
      <ul>
        <li><strong>Certificate of Quality</strong> — laboratory results against the specification.</li>
        <li><strong>Certificate of Quantity</strong> — the measured loaded volume and weight.</li>
        <li><strong>Certificate of Origin</strong> and the <strong>Bill of Lading</strong>.</li>
        <li>Time sheet and notice of readiness, which underpin demurrage calculations.</li>
      </ul>
      <h2 id="why-it-matters">Why it matters</h2>
      <p>Clear, independent inspection is the single best protection against disputes. At IIC Oil &amp; Gas, the inspection regime is agreed before the cargo is scheduled, not after.</p>
    `
  },
  {
    slug: "lpg-vs-lng",
    title: "LPG vs. LNG: two gases that are often confused",
    category: "Product Guides",
    date: "2026-06-17",
    readMins: 4,
    image: IMG("photo-1673208769691-e74104d853fd"),
    imageAlt: "Large white storage tanks on a green field",
    excerpt:
      "They sound almost identical, but LPG and LNG are different molecules, stored in very different ways and sold into different markets.",
    body: `
      <p class="lede">Liquefied petroleum gas (LPG) and liquefied natural gas (LNG) both travel as liquids, but that's where the similarity ends.</p>
      <h2 id="composition">What they are</h2>
      <ul>
        <li><strong>LPG</strong> is mainly propane and butane, produced from gas processing and crude refining.</li>
        <li><strong>LNG</strong> is mainly methane: natural gas cooled until it becomes a liquid.</li>
      </ul>
      <h2 id="storage">How they're stored</h2>
      <p>LPG liquefies under moderate pressure at ambient temperatures, so it can be stored in pressurised cylinders and spheres. LNG must be cooled to about <strong>−162 °C</strong>. At that temperature it takes up roughly 1/600th of its gaseous volume, which is what makes shipping it by sea economic.</p>
      <h2 id="uses">Typical uses</h2>
      <table>
        <thead><tr><th>LPG</th><th>LNG</th></tr></thead>
        <tbody>
          <tr><td>Cooking and heating, autogas, petrochemical feedstock</td><td>Power generation, industrial gas supply, marine fuel, pipeline top-up</td></tr>
        </tbody>
      </table>
      <p>IIC Oil &amp; Gas supplies LPG to GOST 20448-90 (10,000 – 1,000,000 MT/month) and LNG (100,000 – 400,000 MT/month). <a href="products.html#enquiry">Enquire about allocations</a>.</p>
    `
  },
  {
    slug: "due-diligence-red-flags-fuel-trading",
    title: "Five due-diligence red flags in petroleum trading",
    category: "Compliance",
    date: "2026-05-26",
    readMins: 5,
    image: IMG("photo-1620203853151-496c7228306c"),
    imageAlt: "A complex network of industrial pipes and valves",
    excerpt:
      "Fraudulent fuel offers are a well-known problem in the industry. These warning signs help buyers and sellers protect themselves.",
    body: `
      <p class="lede">Most petroleum trades are legitimate, but the industry has long attracted fraudulent "paper" offers. A few simple checks filter out most of them.</p>
      <h2 id="flags">The red flags</h2>
      <ol>
        <li><strong>Prices far below market.</strong> Product priced well below prevailing benchmarks rarely exists.</li>
        <li><strong>Upfront fees for "documents".</strong> Requests to pay for tank storage, "dip tests" or certificates before any verifiable product is shown.</li>
        <li><strong>Long intermediary chains.</strong> Offers passed through many mandates, none of whom can show a direct link to the seller or refinery.</li>
        <li><strong>Unverifiable company details.</strong> Free email addresses, no trade licence, or registration details that don't match official registries.</li>
        <li><strong>Pressure to skip inspection.</strong> Any reluctance to use a mutually agreed, independent inspection company.</li>
      </ol>
      <h2 id="how-we-work">How we work</h2>
      <p>IIC Oil &amp; Gas carries out KYC on every counterparty, trades only through documented and verifiable channels, and agrees independent inspection before scheduling a cargo. If you receive an offer using our name that you can't verify, contact us directly at <a href="mailto:office@iicpetroleum.com">office@iicpetroleum.com</a> or <a href="tel:+97148347004">+971 4 834 7004</a>.</p>
      <blockquote>We will never ask for fees to be paid to a personal account, or send you contracts from a free email address.</blockquote>
    `
  },
  {
    slug: "bitumen-grades-for-gulf-roads",
    title: "Bitumen 60/70 vs. 80/100: matching the grade to the climate",
    category: "Product Guides",
    date: "2026-04-29",
    readMins: 3,
    image: IMG("photo-1651467606797-e1c660cf3fda"),
    imageAlt: "The Dubai skyline with the Burj Khalifa under a blue sky",
    excerpt:
      "Penetration grades tell you how hard a bitumen is. In a hot climate like the Gulf's, the harder grade usually wins.",
    body: `
      <p class="lede">Paving bitumen is graded by <em>penetration</em>: how far a standard needle sinks into a sample at 25 °C, measured in tenths of a millimetre.</p>
      <h2 id="grades">What the numbers mean</h2>
      <ul>
        <li><strong>60/70</strong> — penetration 60–70 dmm. A harder bitumen that resists rutting and softening under high pavement temperatures.</li>
        <li><strong>80/100</strong> — penetration 80–100 dmm. Softer and more flexible, suited to cooler climates where cracking is the bigger risk.</li>
      </ul>
      <h2 id="gulf">Why 60/70 dominates in the Gulf</h2>
      <p>Summer road-surface temperatures in the UAE regularly exceed 60 °C. Harder grades keep the asphalt stable under heavy traffic, which is why 60/70 is the standard choice for highway work across the region.</p>
      <h2 id="supply">Supply</h2>
      <p>IIC Oil &amp; Gas supplies both grades in bulk and drums. <a href="products.html#enquiry">Ask for a quotation</a>.</p>
    `
  }
];

window.IIC_NEWS_CATEGORIES = ["Company", "Trading", "Product Guides", "Compliance"];
