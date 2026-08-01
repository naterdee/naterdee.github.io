<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>US Wildfire Trends & Causes — Drill-Down Story</title>
  <script src="https://d3js.org/d3.v7.min.js"></script>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      max-width: 900px;
      margin: 40px auto;
      padding: 0 20px;
      color: #2c3e50;
      background-color: #f8f9fa;
    }

    header {
      margin-bottom: 24px;
    }

    h1 {
      margin: 0 0 8px 0;
      font-size: 1.8rem;
    }

    p.description {
      margin: 0;
      color: #6c757d;
      font-size: 1rem;
      line-height: 1.5;
    }

    .controls {
      display: flex;
      gap: 12px;
      margin-bottom: 24px;
    }

    .btn {
      padding: 10px 16px;
      border: 1px solid #ced4da;
      background: white;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      font-size: 0.9rem;
      transition: all 0.2s ease;
    }

    .btn:hover {
      background: #e9ecef;
    }

    .btn.active {
      background: #e63946;
      color: white;
      border-color: #e63946;
    }

    #chart-container {
      background: white;
      border-radius: 8px;
      padding: 24px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      position: relative;
    }

    .tooltip {
      position: absolute;
      padding: 8px 12px;
      background: rgba(33, 37, 41, 0.9);
      color: white;
      border-radius: 4px;
      font-size: 0.85rem;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.15s ease;
    }

    .axis text {
      font-size: 0.8rem;
      color: #6c757d;
    }

    .legend {
      display: flex;
      gap: 16px;
      justify-content: center;
      margin-top: 16px;
      flex-wrap: wrap;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.85rem;
    }

    .legend-color {
      width: 12px;
      height: 12px;
      border-radius: 2px;
    }
  </style>
</head>
<body>

  <header>
    <h1>US Wildfire Trends & Causes (2010–2023)</h1>
    <p class="description">
      Explore how wildfire frequency and severity have evolved over the last decade. Click a storyline below to drill down into key drivers.
    </p>
  </header>

  <div class="controls">
    <button class="btn active" onclick="switchView('overview')">Overview: Total Acres</button>
    <button class="btn" onclick="switchView('cause')">Drill Down: By Cause</button>
    <button class="btn" onclick="switchView('region')">Drill Down: By Region</button>
    <button class="btn" onclick="switchView('size')">Drill Down: By Size Class</button>
  </div>

  <div id="chart-container">
    <div id="chart"></div>
    <div id="legend" class="legend"></div>
    <div id="tooltip" class="tooltip"></div>
  </div>

  <script>
    // --- 1. Dataset (Synthetic structured data matching US Forest Service patterns) ---
    const wildfireData = [
      { year: 2010, acres: 3.4, human: 1.9, natural: 1.5, west: 2.1, southwest: 1.3, megaFires: 1.8, standardFires: 1.6 },
      { year: 2011, acres: 8.7, human: 5.2, natural: 3.5, west: 3.2, southwest: 5.5, megaFires: 6.1, standardFires: 2.6 },
      { year: 2012, acres: 9.3, human: 3.8, natural: 5.5, west: 6.5, southwest: 2.8, megaFires: 6.8, standardFires: 2.5 },
      { year: 2013, acres: 4.3, human: 2.1, natural: 2.2, west: 2.9, southwest: 1.4, megaFires: 2.6, standardFires: 1.7 },
      { year: 2014, acres: 3.6, human: 1.8, natural: 1.8, west: 2.5, southwest: 1.1, megaFires: 2.1, standardFires: 1.5 },
      { year: 2015, acres: 10.1, human: 4.0, natural: 6.1, west: 7.2, southwest: 2.9, megaFires: 7.8, standardFires: 2.3 },
      { year: 2016, acres: 5.4, human: 3.1, natural: 2.3, west: 3.4, southwest: 2.0, megaFires: 3.5, standardFires: 1.9 },
      { year: 2017, acres: 10.0, human: 4.5, natural: 5.5, west: 7.5, southwest: 2.5, megaFires: 7.9, standardFires: 2.1 },
      { year: 2018, acres: 8.8, human: 4.2, natural: 4.6, west: 6.8, southwest: 2.0, megaFires: 6.9, standardFires: 1.9 },
      { year: 2019, acres: 4.7, human: 2.3, natural: 2.4, west: 3.1, southwest: 1.6, megaFires: 2.9, standardFires: 1.8 },
      { year: 2020, acres: 10.2, human: 5.8, natural: 4.4, west: 8.4, southwest: 1.8, megaFires: 8.4, standardFires: 1.8 },
      { year: 2021, acres: 7.1, human: 3.2, natural: 3.9, west: 5.6, southwest: 1.5, megaFires: 5.3, standardFires: 1.8 },
      { year: 2022, acres: 7.5, human: 3.9, natural: 3.6, west: 4.8, southwest: 2.7, megaFires: 5.6, standardFires: 1.9 },
      { year: 2023, acres: 2.6, human: 1.4, natural: 1.2, west: 1.7, southwest: 0.9, megaFires: 1.2, standardFires: 1.4 }
    ];

    // --- 2. Chart Setup ---
    const margin = { top: 30, right: 30, bottom: 40, left: 50 };
    const width = 850 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select("#chart")
      .append("svg")
        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
      .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scales & Axes
    const xScale = d3.scaleBand()
      .domain(wildfireData.map(d => d.year))
      .range([0, width])
      .padding(0.2);

    const yScale = d3.scaleLinear()
      .domain([0, 12])
      .range([height, 0]);

    const xAxis = svg.append("g")
      .attr("class", "axis x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    const yAxis = svg.append("g")
      .attr("class", "axis y-axis")
      .call(d3.axisLeft(yScale).ticks(6).tickFormat(d => d + "M"));

    // Y-Axis Label
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("x", -height / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "0.8rem")
      .style("fill", "#6c757d")
      .text("Acres Burned (Millions)");

    const tooltip = d3.select("#tooltip");

    // Color Configurations
    const colorConfigs = {
      overview: { keys: ["acres"], colors: ["#e63946"], labels: ["Total Acres Burned"] },
      cause: { keys: ["human", "natural"], colors: ["#d62828", "#f77f00"], labels: ["Human Caused", "Natural (Lightning)"] },
      region: { keys: ["west", "southwest"], colors: ["#457b9d", "#2a9d8f"], labels: ["Pacific West", "Southwest"] },
      size: { keys: ["megaFires", "standardFires"], colors: ["#6a040f", "#e9c46a"], labels: ["Mega-Fires (>100k acres)", "Standard Fires (<100k acres)"] }
    };

    // --- 3. Render / Update Function ---
    function updateChart(viewType) {
      const config = colorConfigs[viewType];
      
      // Prepare Stacked Data
      const stack = d3.stack().keys(config.keys);
      const series = stack(wildfireData);

      const colorScale = d3.scaleOrdinal()
        .domain(config.keys)
        .range(config.colors);

      // Bind Groups for each Stack Layer
      const layers = svg.selectAll(".layer")
        .data(series, d => d.key);

      layers.exit().remove();

      const layersEnter = layers.enter()
        .append("g")
        .attr("class", "layer")
        .attr("fill", d => colorScale(d.key));

      const mergedLayers = layersEnter.merge(layers);

      // Bind Rectangles
      const rects = mergedLayers.selectAll("rect")
        .data(d => d);

      rects.exit().remove();

      rects.enter()
        .append("rect")
          .attr("x", d => xScale(d.data.year))
          .attr("width", xScale.bandwidth())
          .attr("y", height)
          .attr("height", 0)
        .merge(rects)
        .on("mouseover", (event, d) => {
          const val = (d[1] - d[0]).toFixed(1);
          tooltip.style("opacity", 1)
            .html(`<strong>${d.data.year}</strong><br/>Acres: ${val} Million`);
        })
        .on("mousemove", (event) => {
          tooltip.style("left", (event.layerX + 15) + "px")
                 .style("top", (event.layerY - 15) + "px");
        })
        .on("mouseout", () => tooltip.style("opacity", 0))
        .transition()
        .duration(750)
          .attr("x", d => xScale(d.data.year))
          .attr("y", d => yScale(d[1]))
          .attr("height", d => yScale(d[0]) - yScale(d[1]));

      // Update Legend
      const legendContainer = d3.select("#legend");
      legendContainer.html("");
      
      config.labels.forEach((label, i) => {
        const item = legendContainer.append("div").attr("class", "legend-item");
        item.append("div")
          .attr("class", "legend-color")
          .style("background-color", config.colors[i]);
        item.append("span").text(label);
      });
    }

    // Controls Handling
    function switchView(viewType) {
      d3.selectAll(".btn").classed("active", false);
      event.target.classList.add("active");
      updateChart(viewType);
    }

    // Initial Render
    updateChart('overview');
  </script>
</body>
</html>
