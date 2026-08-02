<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>US Wildfires — Narrative Drill-Down</title>
  <script src="https://d3js.org/d3.v7.min.js"></script>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      max-width: 900px;
      margin: 40px auto;
      padding: 0 20px;
      color: #2c3e50;
      background-color: #f8f9fa;
    }

    header { margin-bottom: 20px; }
    h1 { margin: 0 0 8px 0; font-size: 1.8rem; }
    
    /* Narrative Scene Description & Annotation Styling */
    .scene-narrative {
      background: #eef2f5;
      border-left: 4px solid #e63946;
      padding: 12px 16px;
      margin-bottom: 20px;
      border-radius: 0 6px 6px 0;
      min-height: 48px;
    }
    .scene-title { font-weight: 700; margin-bottom: 4px; color: #1d3557; }
    .scene-annotation { font-size: 0.95rem; color: #457b9d; margin: 0; }

    /* Controls (Triggers UI) */
    .controls { display: flex; gap: 10px; margin-bottom: 20px; }
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
    .btn:hover { background: #e9ecef; }
    .btn.active { background: #e63946; color: white; border-color: #e63946; }

    /* Chart Container */
    #chart-container {
      background: white;
      border-radius: 8px;
      padding: 24px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      position: relative;
    }
    .axis text { font-size: 0.8rem; fill: #6c757d; }
    .legend { display: flex; gap: 16px; justify-content: center; margin-top: 16px; }
    .legend-item { display: flex; align-items: center; gap: 6px; font-size: 0.85rem; }
    .legend-color { width: 12px; height: 12px; border-radius: 2px; }

    /* Tooltip */
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
    .annotation-line {
      stroke: #d62828;
      stroke-width: 1.5px;
      stroke-dasharray: 3 3;
    }
    .annotation-text {
      font-size: 0.75rem;
      font-weight: 600;
      fill: #d62828;
      text-anchor: middle;
    }
  </style>
</head>
<body>

  <header>
    <h1>US Wildfire Trends & Causes (2010–2023)</h1>
  </header>

  <!-- PARAMETER TRIGGER CONTROLS -->
  <div class="controls">
    <button class="btn active" id="btn-overview">Overview</button>
    <button class="btn" id="btn-cause">Causes</button>
    <button class="btn" id="btn-region">Regions</button>
  </div>

  <!-- SCENE ANNOTATION CONTAINER -->
  <div class="scene-narrative">
    <div id="scene-title" class="scene-title"></div>
    <p id="scene-annotation" class="scene-annotation"></p>
  </div>

  <div id="chart-container">
    <div id="chart"></div>
    <div id="legend" class="legend"></div>
    <div id="tooltip" class="tooltip"></div>
  </div>

  <script>
    // =========================================================================
    // 1. DATASET
    // =========================================================================
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

    // =========================================================================
    // 2. PARAMETERS (GLOBAL STATE)
    // =========================================================================
    const state = {
      activeSceneId: "overview", // Active scene identifier
      animationDuration: 850     // Standard transition timing (ms)
    };

    // =========================================================================
    // 3. SCENES & ANNOTATIONS SPECIFICATION
    // =========================================================================
    const scenes = {
      overview: {
        id: "overview",
        title: "Annual Acres Burned",
        annotation: "Wildfire destruction peaked heavily in 2015, 2017, and 2020, with each of these years having over 10 million acres of land burned nationwide.",
        keys: ["acres"],
        colors: ["#e63946"],
        labels: ["Total Acres Burned"]
      },
      cause: {
        id: "cause",
        title: "Human vs. Natural Causes",
        annotation: "Human ignition accounts for over 50% of acres burned on average, but lightning generally accounts for most of the massive spikes.",
        keys: ["human", "natural"],
        colors: ["#d62828", "#f77f00"],
        labels: ["Human Caused", "Natural (Lightning)"]
      },
      region: {
        id: "region",
        title: "Pacific West vs. Southwest",
        annotation: "While the Pacific West experiences severe wildfire seasons consistently, the Southwest typically doesn't. Instead, they have rare peak events such as in 2011.",
        keys: ["west", "southwest"],
        colors: ["#457b9d", "#2a9d8f"],
        labels: ["Pacific West", "Southwest"]
      }
    };

    // =========================================================================
    // 4. CHART CANVAS SETUP
    // =========================================================================
    const margin = { top: 30, right: 30, bottom: 40, left: 50 };
    const width = 850 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select("#chart")
      .append("svg")
        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
      .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    svg.append("defs").append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "0 0 10 10")
      .attr("refX", 5)
      .attr("refY", 5)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto-start-reverse")
      .append("path")
        .attr("d", "M 0 0 L 10 5 L 0 10 z")
        .attr("fill", "#d62828");

    const xScale = d3.scaleBand()
      .domain(wildfireData.map(d => d.year))
      .range([0, width])
      .padding(0.2);

    const yScale = d3.scaleLinear()
      .domain([0, 12])
      .range([height, 0]);

    svg.append("g")
      .attr("class", "axis x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    svg.append("g")
      .attr("class", "axis y-axis")
      .call(d3.axisLeft(yScale).ticks(6).tickFormat(d => d + "M"));

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("x", -height / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "0.8rem")
      .style("fill", "#6c757d")
      .text("Acres Burned (Millions)");

    const annotationGroup = svg.append("g").attr("class", "annotation-group");

    const tooltip = d3.select("#tooltip");

    // =========================================================================
    // 5. ANIMATIONS & SCENE RENDERER
    // =========================================================================
    function renderScene(sceneId) {
      const scene = scenes[sceneId];

      // A. Update Scene Annotations (Text DOM)
      d3.select("#scene-title").text(scene.title);
      d3.select("#scene-annotation").text(scene.annotation);

      // B. Compute Stacked Layout for the active scene parameters
      const stack = d3.stack().keys(scene.keys);
      const series = stack(wildfireData);
      const colorScale = d3.scaleOrdinal().domain(scene.keys).range(scene.colors);

      // C. Bind Layers (Groups) with Scene Key
      const layers = svg.selectAll(".layer")
        .data(series, d => d.key);

      // Animation: Fade out old layers
      layers.exit()
        .transition()
        .duration(state.animationDuration / 2)
        .style("opacity", 0)
        .remove();

      const layersEnter = layers.enter()
        .append("g")
        .attr("class", "layer")
        .attr("fill", d => colorScale(d.key));

      const mergedLayers = layersEnter.merge(layers);

      // D. Bind Rectangles inside Layers
      const rects = mergedLayers.selectAll("rect")
        .data(d => d);

      rects.exit().remove();

      // Animation: Morph rectangle heights & positions smoothly
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
        .duration(state.animationDuration)
        .ease(d3.easeCubicInOut)
          .attr("x", d => xScale(d.data.year))
          .attr("y", d => yScale(d[1]))
          .attr("height", d => yScale(d[0]) - yScale(d[1]));

      // E. Update Legend Output
      const legendContainer = d3.select("#legend");
      legendContainer.html("");
      scene.labels.forEach((label, i) => {
        const item = legendContainer.append("div").attr("class", "legend-item");
        item.append("div")
          .attr("class", "legend-color")
          .style("background-color", scene.colors[i]);
        item.append("span").text(label);
      });
      updateAnnotations(sceneId);
    }

    // =========================================================================
    // 6. TRIGGERS & EVENT LISTENERS
    // =========================================================================
    function setTrigger(buttonId, sceneId) {
      d3.select(buttonId).on("click", function(event) {
        // 1. Mutate state parameter
        state.activeSceneId = sceneId;

        // 2. Update Trigger UI state
        d3.selectAll(".btn").classed("active", false);
        d3.select(this).classed("active", true);

        // 3. Trigger Scene Render & Transition
        renderScene(state.activeSceneId);
      });
    }

    function updateAnnotations(sceneId) {
      annotationGroup.selectAll("*").remove();

      if (sceneId === "overview") {
        const peakYears = [2015, 2017, 2020];

        peakYears.forEach(year => {
          const dataItem = wildfireData.find(d => d.year === year);
          if (!dataItem) return;

          const xPos = xScale(year) + xScale.bandwidth() / 2;
          const yPosBar = yScale(dataItem.acres);
          const yPosArrowStart = yPosBar - 25;

          annotationGroup.append("line")
            .attr("class", "annotation-line")
            .attr("x1", xPos)
            .attr("y1", yPosArrowStart)
            .attr("x2", xPos)
            .attr("y2", yPosBar - 4)
            .attr("marker-end", "url(#arrowhead)");

          annotationGroup.append("text")
            .attr("class", "annotation-text")
            .attr("x", xPos)
            .attr("y", yPosArrowStart - 5)
            .text("Peak Year");
        });
      }
      if (sceneId === "region") {
        const peakYears = [2011];

        peakYears.forEach(year => {
          const dataItem = wildfireData.find(d => d.year === year);
          if (!dataItem) return;

          const xPos = xScale(year) + xScale.bandwidth() / 2;
          const yPosBar = yScale(dataItem.acres);
          const yPosArrowStart = yPosBar - 25; // Arrow starts 25px above bar

          // Draw Arrowed Line pointing down to top of bar
          annotationGroup.append("line")
            .attr("class", "annotation-line")
            .attr("x1", xPos)
            .attr("y1", yPosArrowStart)
            .attr("x2", xPos)
            .attr("y2", yPosBar - 4) // Stop just above bar edge
            .attr("marker-end", "url(#arrowhead)");

          // Text label above arrow
          annotationGroup.append("text")
            .attr("class", "annotation-text")
            .attr("x", xPos)
            .attr("y", yPosArrowStart - 5)
            .text("Peak Year");
        });
      }
      if (sceneId === "cause") {
        const peakYears = [2015, 2017];

        
        peakYears.forEach(year => {
          const dataItem = wildfireData.find(d => d.year === year);
          if (!dataItem) return;

          const xPos = xScale(year) + xScale.bandwidth() / 2;
          const yPosBar = yScale(dataItem.acres);
          const yPosArrowStart = yPosBar - 25;

          // Draw Arrowed Line pointing down to top of bar
          annotationGroup.append("line")
            .attr("class", "annotation-line")
            .attr("x1", xPos)
            .attr("y1", yPosArrowStart)
            .attr("x2", xPos)
            .attr("y2", yPosBar - 4)
            .attr("marker-end", "url(#arrowhead)");

          // Text label above arrow
          annotationGroup.append("text")
            .attr("class", "annotation-text")
            .attr("x", xPos)
            .attr("y", yPosArrowStart - 5)
            .text("Lightning Peak");
        });
      }
    }

    // Bind triggers to controls
    setTrigger("#btn-overview", "overview");
    setTrigger("#btn-cause", "cause");
    setTrigger("#btn-region", "region");
    setTrigger("#btn-size", "size");

    // Initial Trigger Execution
    renderScene(state.activeSceneId);

    
  </script>
</body>
</html>
