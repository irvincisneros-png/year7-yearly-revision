/* global React, DotPoint, Callout, Figure, Term, MCQ, WrittenQ, QGroup, Interactive,
   Slider, SegToggle, Stat, Reveal, FlipCard, MatchBuckets, Ring, mountTopicApp,
   ExamFocus, Recap, ExamTip, WorkedExample, Practice, SelfCheck, NotebookLink */
const { useState } = React;

const NB = "https://irvincisneros-png.github.io/Year-7/solutions-mixtures/";
const NB_INV = "https://irvincisneros-png.github.io/Year-7/observing-universe/#1.2";

/* ============================================================
   Shared helpers
   ============================================================ */

/* An accurate graph drawn from data. Points are plotted as small crosses,
   like a hand-drawn scatter graph. fit: "linear" = least-squares straight
   line (outliers ignored), "curve" = smooth curve through the points. */
function Graph({ w = 360, h = 268, x, y, xLabel, yLabel, series, aria, extra }) {
  const L = 56, R = 14, T = 12, B = 48;
  const pw = w - L - R, ph = h - T - B;
  const sx = v => L + ((v - x.min) / (x.max - x.min)) * pw;
  const sy = v => T + ph - ((v - y.min) / (y.max - y.min)) * ph;
  const ticks = a => { const out = []; for (let v = a.min; v <= a.max + 1e-9; v += a.step) out.push(Math.round(v * 1000) / 1000); return out; };
  const xt = ticks(x), yt = ticks(y);

  const linePath = (s) => {
    const pts = s.pts.filter((_, i) => !(s.outliers || []).includes(i));
    const n = pts.length;
    const mx = pts.reduce((a, p) => a + p[0], 0) / n, my = pts.reduce((a, p) => a + p[1], 0) / n;
    let sxy = 0, sxx = 0;
    pts.forEach(p => { sxy += (p[0] - mx) * (p[1] - my); sxx += (p[0] - mx) ** 2; });
    const m = sxy / sxx, c = my - m * mx;
    const x0 = Math.min(...s.pts.map(p => p[0])), x1 = Math.max(...s.pts.map(p => p[0]));
    return `M${sx(x0).toFixed(1)},${sy(m * x0 + c).toFixed(1)} L${sx(x1).toFixed(1)},${sy(m * x1 + c).toFixed(1)}`;
  };
  const curvePath = (s) => {
    const P = s.pts.map(p => [sx(p[0]), sy(p[1])]);
    let d = `M${P[0][0].toFixed(1)},${P[0][1].toFixed(1)}`;
    for (let i = 0; i < P.length - 1; i++) {
      const p0 = P[i - 1] || P[i], p1 = P[i], p2 = P[i + 1], p3 = P[i + 2] || P[i + 1];
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
    }
    return d;
  };

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" role="img" aria-label={aria} style={{ maxWidth: 540, display: "block", margin: "0 auto" }}>
      <rect x={L} y={T} width={pw} height={ph} fill="var(--card)" />
      {xt.map(v => <line key={"gx" + v} x1={sx(v)} x2={sx(v)} y1={T} y2={T + ph} stroke="var(--border)" strokeWidth="1" />)}
      {yt.map(v => <line key={"gy" + v} x1={L} x2={L + pw} y1={sy(v)} y2={sy(v)} stroke="var(--border)" strokeWidth="1" />)}
      <line x1={L} y1={T + ph} x2={L + pw} y2={T + ph} stroke="var(--ink)" strokeWidth="1.6" />
      <line x1={L} y1={T} x2={L} y2={T + ph} stroke="var(--ink)" strokeWidth="1.6" />
      {xt.map(v => <text key={"tx" + v} x={sx(v)} y={T + ph + 15} textAnchor="middle" fontSize="11" fill="var(--ink-muted)">{v}</text>)}
      {yt.map(v => <text key={"ty" + v} x={L - 6} y={sy(v) + 4} textAnchor="end" fontSize="11" fill="var(--ink-muted)">{v}</text>)}
      <text x={L + pw / 2} y={h - 8} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ink)">{xLabel}</text>
      <text x={13} y={T + ph / 2} transform={`rotate(-90 13 ${T + ph / 2})`} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ink)">{yLabel}</text>
      {series.map((s, si) => (
        <g key={si}>
          {s.fit === "linear" && <path d={linePath(s)} fill="none" stroke={s.colour || "var(--accent)"} strokeWidth="2" strokeDasharray={s.dash} />}
          {s.fit === "curve" && <path d={curvePath(s)} fill="none" stroke={s.colour || "var(--accent)"} strokeWidth="2" strokeDasharray={s.dash} />}
          {s.pts.map((p, i) => {
            const cx = sx(p[0]), cy = sy(p[1]), k = 4;
            return (
              <g key={i}>
                <line x1={cx - k} y1={cy - k} x2={cx + k} y2={cy + k} stroke="var(--ink)" strokeWidth="1.8" />
                <line x1={cx - k} y1={cy + k} x2={cx + k} y2={cy - k} stroke="var(--ink)" strokeWidth="1.8" />
                {(s.outliers || []).includes(i) && <circle cx={cx} cy={cy} r="10" fill="none" stroke="var(--ink)" strokeWidth="1.4" strokeDasharray="3 2" />}
              </g>
            );
          })}
          {s.label && <text x={sx(s.labelAt[0])} y={sy(s.labelAt[1])} textAnchor={s.anchor || "start"} fontSize="11.5" fontWeight="700" fill={s.labelColour || "var(--ink)"}>{s.label}</text>}
        </g>
      ))}
      {extra && extra(sx, sy)}
    </svg>
  );
}

/* Potassium nitrate solubility (g per 100 g water), rounded textbook values */
const KNO3 = [[0, 13], [10, 21], [20, 32], [30, 46], [40, 64], [50, 86], [60, 110]];
const NACL = [[0, 35.7], [10, 35.8], [20, 36.0], [30, 36.3], [40, 36.6], [50, 37.0], [60, 37.3]];
function kno3At(t) {
  for (let i = 0; i < KNO3.length - 1; i++) {
    const [t0, s0] = KNO3[i], [t1, s1] = KNO3[i + 1];
    if (t >= t0 && t <= t1) return s0 + ((t - t0) / (t1 - t0)) * (s1 - s0);
  }
  return KNO3[KNO3.length - 1][1];
}

function SolubilityGraph() {
  return (
    <Graph x={{ min: 0, max: 60, step: 10 }} y={{ min: 0, max: 120, step: 20 }}
      xLabel="Temperature (°C)" yLabel="Solubility (g per 100 g water)"
      aria="Solubility curves. Potassium nitrate rises steeply from 13 grams at 0 degrees to 110 grams at 60 degrees. Sodium chloride stays almost flat at about 36 to 37 grams."
      series={[
        { pts: KNO3, fit: "curve", label: "potassium nitrate", labelAt: [53, 104], anchor: "end" },
        { pts: NACL, fit: "curve", colour: "var(--ink-muted)", dash: "6 4", label: "sodium chloride", labelAt: [60, 44], anchor: "end", labelColour: "var(--ink-muted)" },
      ]} />
  );
}

/* Bounce height data (original): a tennis ball dropped from different heights */
const BOUNCE = [[20, 11], [40, 23], [60, 32], [80, 58], [100, 55], [120, 66]];
function BounceGraph() {
  return (
    <Graph x={{ min: 0, max: 140, step: 20 }} y={{ min: 0, max: 80, step: 10 }}
      xLabel="Drop height (cm)" yLabel="Bounce height (cm)"
      aria="Scatter graph of bounce height against drop height. Points rise from 11 centimetres at a 20 centimetre drop to 66 centimetres at a 120 centimetre drop. A straight line of best fit slopes up and passes close to the origin. The point at 80 centimetres, 58 centimetres, is circled as an outlier above the line."
      series={[{ pts: BOUNCE, fit: "linear", outliers: [3] }]}
      extra={(sx, sy) => (
        <g>
          <line x1={sx(80) + 8} y1={sy(58) - 7} x2={sx(88)} y2={sy(66)} stroke="var(--ink-muted)" strokeWidth="1" />
          <text x={sx(88) + 2} y={sy(66) - 3} fontSize="11.5" fontWeight="700" fill="var(--ink)">outlier</text>
          <text x={sx(84)} y={sy(30)} fontSize="11" fill="var(--ink)" fontWeight="700">line of best fit</text>
        </g>
      )} />
  );
}

/* Height of a bean seedling over 12 days (original class-style data, about
   1 cm per day after it pokes through the soil): graphing practice */
const SEEDLING = [[2, 1.0], [4, 3.1], [6, 4.9], [8, 7.1], [10, 9.0], [12, 11.0]];
function SeedlingGraph() {
  return (
    <Graph x={{ min: 0, max: 14, step: 2 }} y={{ min: 0, max: 14, step: 2 }}
      xLabel="Time since planting (days)" yLabel="Seedling height (cm)"
      aria="Scatter graph with a straight line of best fit. The height of the bean seedling rises steadily from 1.0 centimetre on day 2 to 11.0 centimetres on day 12, about 1 centimetre per day."
      series={[{ pts: SEEDLING, fit: "linear" }]} />
  );
}

const tableWrap = { overflowX: "auto", margin: "12px 0" };

/* ============================================================
   Interactive: potassium nitrate in a beaker (4.3.3)
   ============================================================ */
function KNO3Beaker() {
  const [t, setT] = useState(20);
  const ADD = 50;
  const s = kno3At(t);
  const left = Math.max(0, ADD - s);
  const saturated = left > 0;
  const pile = (left / ADD) * 34;
  return (
    <Interactive title="50 g of potassium nitrate in 100 g of water"
      subtitle="Change the temperature. Watch how much of the 50 g of potassium nitrate can stay dissolved."
      takeaway="The solubility of potassium nitrate rises as the water gets hotter. Below about 32 °C the water cannot hold all 50 g, so the solution is saturated and the extra solid sits on the bottom. Cool a hot solution and crystals come back out.">
      <Slider label="Temperature" min={0} max={60} step={5} value={t} onChange={setT} unit=" °C" />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", marginTop: 8 }}>
        <svg viewBox="0 0 200 150" width="100%" style={{ maxWidth: 220 }} role="img"
          aria-label={saturated ? `Beaker at ${t} degrees with ${Math.round(left)} grams of undissolved solid on the bottom` : `Beaker at ${t} degrees with all the solid dissolved`}>
          <rect x="52" y="44" width="96" height="92" fill="var(--accent)" opacity={0.15 + 0.35 * (Math.min(ADD, s) / ADD)} />
          <path d="M46,20 L52,26 L52,136 Q52,142 58,142 L142,142 Q148,142 148,136 L148,26 L154,20" fill="none" stroke="var(--ink)" strokeWidth="2.5" />
          <line x1="52" y1="44" x2="148" y2="44" stroke="var(--ink-muted)" strokeWidth="1" />
          {saturated && <path d={`M60,141 Q100,${141 - pile * 2} 140,141 Z`} fill="var(--ink)" opacity="0.75" />}
          <text x="100" y="14" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ink)">{t} °C</text>
        </svg>
        <div style={{ flex: "1 1 180px", display: "grid", gap: 8 }}>
          <Stat value={`${Math.round(s)} g`} label="most that can dissolve in 100 g water" />
          <Stat value={saturated ? `${Math.round(left)} g left over` : "All 50 g dissolved"} label={saturated ? "saturated solution" : "unsaturated solution"} />
        </div>
      </div>
    </Interactive>
  );
}

/* ============================================================
   SECTION 4.1  States of matter
   ============================================================ */
function StatesFigure() {
  const solid = []; for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) solid.push([20 + c * 17, 104 - r * 17]);
  const liquid = [[20, 104], [37, 104], [55, 104], [72, 104], [89, 104], [28, 88], [46, 88], [64, 89], [82, 87], [21, 72], [40, 71], [70, 72], [89, 70], [55, 72]];
  const gas = [[22, 46], [80, 40], [50, 74], [88, 96], [24, 100]];
  const boxes = [["Solid", solid, "Fixed shape", "Fixed volume"], ["Liquid", liquid, "No fixed shape", "Fixed volume"], ["Gas", gas, "No fixed shape", "No fixed volume"]];
  return (
    <svg viewBox="0 0 360 158" width="100%" role="img" style={{ maxWidth: 520 }}
      aria-label="Three boxes of identical particles. Solid: particles packed in neat rows. Liquid: particles touching but jumbled, filling the bottom of the box. Gas: a few particles far apart.">
      {boxes.map(([name, pts, a, b], i) => (
        <g key={name} transform={`translate(${i * 126}, 0)`}>
          <text x="54" y="16" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)">{name}</text>
          <rect x="0" y="24" width="108" height="92" rx="6" fill="var(--card)" stroke="var(--ink)" strokeWidth="1.5" />
          {pts.map(([x, y], k) => <circle key={k} cx={x} cy={y} r="7.5" fill="var(--accent)" stroke="var(--ink)" strokeWidth="1" />)}
          <text x="54" y="134" textAnchor="middle" fontSize="11" fill="var(--ink-muted)">{a}</text>
          <text x="54" y="149" textAnchor="middle" fontSize="11" fill="var(--ink-muted)">{b}</text>
        </g>
      ))}
    </svg>
  );
}

function WaterCycleFigure() {
  const box = (x, y, l1, l2, key) => (
    <g key={key}>
      <rect x={x} y={y} width="132" height="48" rx="10" fill="var(--card)" stroke="var(--ink)" strokeWidth="1.5" />
      <text x={x + 66} y={y + 20} textAnchor="middle" fontSize="11.5" fill="var(--ink)">{l1}</text>
      <text x={x + 66} y={y + 37} textAnchor="middle" fontSize="11.5" fontWeight="700" fill="var(--ink)">{l2}</text>
    </g>
  );
  const arr = (x1, y1, x2, y2) => <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--ink)" strokeWidth="1.8" markerEnd="url(#wc-arrow)" />;
  return (
    <svg viewBox="0 0 360 300" width="100%" role="img" style={{ maxWidth: 480 }}
      aria-label="Water cycle as a loop of four boxes. Oceans, rivers and lakes are liquid. Evaporation turns them into water vapour, a gas. Condensation forms clouds of tiny liquid droplets. Precipitation falls as rain, a liquid, or as snow and hail, a solid. Snow and ice melt and run off back into rivers.">
      <defs>
        <marker id="wc-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--ink)" />
        </marker>
      </defs>
      {box(114, 6, "Water vapour in air", "GAS", "t")}
      {box(2, 118, "Oceans, rivers, lakes", "LIQUID", "l")}
      {box(226, 118, "Clouds: tiny droplets", "LIQUID", "r")}
      {box(114, 246, "Snow and ice", "SOLID", "b")}
      {arr(96, 116, 138, 58)}
      <text x="104" y="84" textAnchor="end" fontSize="11" fontWeight="700" fill="var(--ink)">evaporation</text>
      {arr(222, 58, 264, 116)}
      <text x="250" y="84" fontSize="11" fontWeight="700" fill="var(--ink)">condensation</text>
      {arr(264, 168, 222, 244)}
      <text x="250" y="200" fontSize="11" fontWeight="700" fill="var(--ink)">snow, hail</text>
      <text x="250" y="214" fontSize="10.5" fill="var(--ink-muted)">(precipitation)</text>
      {arr(138, 244, 96, 168)}
      <text x="106" y="206" textAnchor="end" fontSize="11" fontWeight="700" fill="var(--ink)">melting,</text>
      <text x="106" y="220" textAnchor="end" fontSize="10.5" fill="var(--ink-muted)">then runoff</text>
      {arr(224, 142, 138, 142)}
      <text x="181" y="134" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--ink)">rain</text>
      <text x="181" y="158" textAnchor="middle" fontSize="10.5" fill="var(--ink-muted)">(precipitation)</text>
    </svg>
  );
}

function ChangesFigure() {
  const node = (x, y, label) => (
    <g key={label}>
      <rect x={x} y={y} width="100" height="40" rx="10" fill="var(--bg-2)" stroke="var(--ink)" strokeWidth="1.5" />
      <text x={x + 50} y={y + 25} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)">{label}</text>
    </g>
  );
  const heat = (x1, y1, x2, y2) => <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--accent)" strokeWidth="2.4" markerEnd="url(#cs-in)" />;
  const cool = (x1, y1, x2, y2) => <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--ink-muted)" strokeWidth="2" strokeDasharray="5 3" markerEnd="url(#cs-out)" />;
  return (
    <svg viewBox="0 0 360 296" width="100%" role="img" style={{ maxWidth: 480 }}
      aria-label="Changes of state triangle. Solid to liquid is melting, liquid to solid is freezing. Liquid to gas is evaporation or boiling, gas to liquid is condensation. Solid to gas is sublimation, gas to solid is deposition. Melting, evaporation and sublimation take in energy; freezing, condensation and deposition give energy out.">
      <defs>
        <marker id="cs-in" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--accent)" /></marker>
        <marker id="cs-out" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--ink-muted)" /></marker>
      </defs>
      {node(130, 10, "GAS")}
      {node(10, 200, "SOLID")}
      {node(250, 200, "LIQUID")}
      {heat(112, 212, 246, 212)}
      <text x="180" y="205" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--ink)">melting</text>
      {cool(248, 230, 114, 230)}
      <text x="180" y="248" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--ink)">freezing</text>
      {heat(300, 196, 228, 56)}
      <text x="270" y="116" fontSize="11" fontWeight="700" fill="var(--ink)">evaporation</text>
      <text x="270" y="130" fontSize="11" fontWeight="700" fill="var(--ink)">or boiling</text>
      {cool(210, 58, 282, 196)}
      <text x="250" y="160" textAnchor="end" fontSize="11" fontWeight="700" fill="var(--ink)">condensation</text>
      {heat(50, 196, 128, 48)}
      <text x="82" y="116" textAnchor="end" fontSize="11" fontWeight="700" fill="var(--ink)">sublimation</text>
      {cool(146, 56, 68, 196)}
      <text x="106" y="160" fontSize="11" fontWeight="700" fill="var(--ink)">deposition</text>
      <line x1="40" y1="268" x2="68" y2="268" stroke="var(--accent)" strokeWidth="2.4" />
      <text x="74" y="272" fontSize="11" fill="var(--ink)">energy taken in (heating)</text>
      <line x1="40" y1="286" x2="68" y2="286" stroke="var(--ink-muted)" strokeWidth="2" strokeDasharray="5 3" />
      <text x="74" y="290" fontSize="11" fill="var(--ink)">energy given out (cooling)</text>
    </svg>
  );
}

function Section41({ progress, setProgress }) {
  const p = { progress, setProgress };
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">4.1 States of matter</div>
        <h1>Solids, liquids, gases and changes of state</h1>
        <p className="lead">Everything is made of particles. The state a substance is in depends on how its particles are arranged and how much energy they have.</p>
      </div>

      <DotPoint id="4.1.1" title="The three states of matter and the water cycle" {...p}>
        <ExamFocus tier="important" />
        <Recap>
          <ul>
            <li>The three states of matter are <Term def="Particles packed tightly in a fixed pattern, vibrating on the spot.">solid</Term>, <Term def="Particles close together but able to slide past each other.">liquid</Term> and <Term def="Particles far apart, moving fast in all directions.">gas</Term>.</li>
            <li><strong>Solid:</strong> fixed shape and fixed volume. <strong>Liquid:</strong> fixed volume but takes the shape of its container. <strong>Gas:</strong> no fixed shape or volume; spreads out to fill any container and can be squashed (compressed).</li>
            <li>Water is the only common substance found naturally on Earth in all three states: ice and snow (solid), oceans, rivers and rain (liquid), and water vapour in the air (gas).</li>
            <li>In the water cycle, water keeps changing state: <strong>evaporation</strong> (liquid → gas), <strong>condensation</strong> (gas → liquid), <strong>freezing</strong> (liquid → solid) and <strong>melting</strong> (solid → liquid). <strong>Precipitation</strong> is water falling as rain (liquid) or snow and hail (solid).</li>
            <li>Common mistake: water vapour is invisible. The white "steam" you see above a kettle or the clouds in the sky are tiny <em>liquid</em> droplets, not gas.</li>
          </ul>
        </Recap>
        <Figure caption="The same particles in three states. Only the spacing and movement change, never the particles themselves.">
          <StatesFigure />
        </Figure>
        <Figure caption="Water changes state as it moves around the water cycle.">
          <WaterCycleFigure />
        </Figure>
        <WorkedExample title="Following water through the seasons"
          problem="A small lake high in the mountains is frozen solid in winter. By late summer the lake is much lower. Describe the changes of state that happen to the water, naming the state at each stage. (3 marks)"
          steps={[
            "Start with the state in winter: the frozen lake is ice, which is a solid.",
            "Spring: the Sun warms the ice and it melts. Melting is a change from solid to liquid water.",
            "Summer: water at the surface of the lake evaporates into the air. Evaporation is a change from liquid to gas (water vapour), so the lake level drops.",
            "Check: each mark comes from naming a change AND the states either side of it.",
          ]}
          answer="In winter the water is solid ice. In spring the ice melts (solid → liquid). In summer some of the liquid water evaporates from the surface into the air as water vapour (liquid → gas), which is why the lake level falls." />
        <Practice title="States of matter and the water cycle">
          <MCQ num={1} question="Which state of matter has a fixed volume but takes the shape of its container?"
            options={["Solid", "Liquid", "Gas", "Both solid and gas"]}
            correct={1}
            explain="A liquid keeps the same volume but flows to fit its container. A solid keeps its own shape, so it is not the answer, and a gas has no fixed volume at all." />
          <MCQ num={2} question="Snow falls on a mountain in winter. In spring it ends up in a river, and on a hot day some of the river water goes into the air. What are the states of the water, in order?"
            options={["Solid → gas → liquid", "Liquid → liquid → gas", "Solid → liquid → gas", "Solid → liquid → liquid"]}
            correct={2}
            explain="Snow is solid, river water is liquid, and water that goes into the air on a hot day has evaporated into water vapour, a gas. Option D is tempting, but water that 'goes into the air' is no longer a liquid." />
          <MCQ num={3} question="During a storm, hailstones fall onto a car park. Which state of matter are the hailstones?"
            options={["Liquid, because all precipitation is liquid", "Gas, because they formed in a cloud", "Solid, because hail is ice", "A mixture of all three states"]}
            correct={2}
            explain="Hail is lumps of ice, so it is a solid. Precipitation can be liquid (rain) or solid (snow and hail), so 'all precipitation is liquid' is wrong." />
          <WrittenQ num={4} question="After rain, a puddle forms in the school playground. By the afternoon it has disappeared. Identify the change of state, and describe where the water went. (2 marks)"
            model="The water evaporated: it changed from a liquid to a gas (water vapour). The water did not disappear; it moved into the air as invisible water vapour, helped by heat from the Sun and the wind." />
        </Practice>
        <SelfCheck id="4.1.1" items={[
          "I can describe the shape and volume of solids, liquids and gases.",
          "I can give an example of water in each state on Earth.",
          "I can name the changes of state in the water cycle (evaporation, condensation, freezing, melting).",
          "I can explain why visible 'steam' and clouds are liquid droplets, not gas.",
        ]} />
        <NotebookLink href={NB + "#4.1"} label="Learn it in full: 4.1 Properties of Matter" />
      </DotPoint>

      <DotPoint id="4.1.3" title="Changes of state explained with particles" {...p}>
        <ExamFocus tier="important" />
        <Recap>
          <ul>
            <li><strong>Solid:</strong> particles packed closely in a regular pattern, held by strong attractions; they only <em>vibrate</em> on the spot. <strong>Liquid:</strong> particles still touching but can slide and move past each other. <strong>Gas:</strong> particles far apart, moving fast and randomly in all directions.</li>
            <li>Heating gives particles more <Term def="Energy of movement. Hotter particles have more of it and move faster.">kinetic energy</Term>, so they move faster and spread apart. Cooling does the opposite.</li>
            <li><strong>Melting</strong> (solid → liquid): particles vibrate so much they break out of their fixed positions. <strong>Freezing</strong> is the reverse.</li>
            <li><strong>Evaporation</strong> happens only at the surface, at any temperature, when the fastest particles escape. <strong>Boiling</strong> happens throughout the liquid (bubbles form) and only at the boiling point (100 °C for water). <strong>Condensation</strong> (gas → liquid): gas particles cool, slow down and come close together.</li>
            <li><Term def="A change straight from solid to gas, without becoming a liquid.">Sublimation</Term>: solid → gas directly (dry ice, mothballs). The reverse (gas → solid) is called deposition, which is how frost forms.</li>
            <li>Common mistake: particles do not melt, expand or get bigger. Only their <em>spacing</em> and <em>movement</em> change. The mass stays the same.</li>
          </ul>
        </Recap>
        <Figure caption="The six changes of state. Solid coloured arrows take in energy; grey dashed arrows give energy out.">
          <ChangesFigure />
        </Figure>
        <WorkedExample title="Explaining with particles"
          problem="A square of chocolate held in your hand slowly melts. Explain this using particle theory. (3 marks)"
          steps={[
            "Cause: heat energy moves from your warm hand into the chocolate.",
            "Effect on particles: the chocolate's particles gain kinetic energy and vibrate faster and harder.",
            "Link to the change of state: they vibrate enough to overcome the attractions holding them in fixed positions, so they can slide past each other. The solid has become a liquid.",
          ]}
          answer="Heat from the hand is transferred to the chocolate. Its particles gain energy and vibrate more strongly, until they break free of their fixed positions and can slide past each other. The chocolate changes from a solid to a liquid (melting)." />
        <ExamTip>
          "Explain" questions want a chain: <strong>cause → what the particles do → the change you see</strong>. Use the words energy, arrangement and movement. Just naming the change ("it melts") usually earns only one mark.
        </ExamTip>
        <Practice title="Particles and changes of state">
          <MCQ num={5} question="When a liquid freezes, what happens to its particles?"
            options={["They lose energy, slow down and settle into fixed positions", "They shrink and become smaller", "They stop moving completely", "They move further apart"]}
            correct={0}
            explain="Freezing removes energy, so particles slow until they lock into a fixed pattern. They still vibrate, so 'stop moving completely' is wrong, and particles never change size." />
          <MCQ num={6} question="A block of dry ice (solid carbon dioxide) on a bench gives off a gas and gets smaller, but no puddle forms. What is this change called?"
            options={["Evaporation", "Melting", "Condensation", "Sublimation"]}
            correct={3}
            explain="Dry ice goes straight from solid to gas, which is sublimation. Melting would leave a liquid puddle, and evaporation starts from a liquid." />
          <WrittenQ num={7} question="Compare evaporation and boiling. (2 marks)"
            model="Both are changes from liquid to gas. Evaporation happens only at the surface of the liquid and can happen at any temperature below the boiling point. Boiling happens throughout the whole liquid, with bubbles of gas forming, and only at the boiling point." />
          <WrittenQ num={8} question="After a hot shower, the bathroom mirror becomes covered in tiny water droplets. Explain why, using particle theory. (3 marks)"
            model="The hot shower puts lots of water vapour (gas) into the air, with particles moving fast and far apart. When these particles hit the cold mirror they lose energy and slow down. They come close together and attract each other, forming liquid droplets on the mirror. This is condensation (gas → liquid)." />
        </Practice>
        <SelfCheck id="4.1.3" items={[
          "I can describe the arrangement and movement of particles in solids, liquids and gases.",
          "I can explain melting, freezing, evaporation, boiling and condensation using particles and energy.",
          "I can compare evaporation and boiling.",
          "I can give an example of sublimation.",
        ]} />
        <NotebookLink href={NB + "#4.1"} label="Learn it in full: 4.1 Properties of Matter" />
      </DotPoint>
    </>
  );
}

/* ============================================================
   SECTION 4.2  Density
   ============================================================ */
function OverflowFigure() {
  return (
    <svg viewBox="0 0 360 230" width="100%" role="img" style={{ maxWidth: 480 }}
      aria-label="An overflow can filled with water up to its spout. An object on a string is lowered fully under the water. The water it pushes out flows down the spout into a measuring cylinder. The volume collected equals the volume of the object.">
      {/* water in can */}
      <rect x="22" y="78" width="96" height="120" fill="var(--accent)" opacity="0.22" />
      {/* can */}
      <path d="M20,50 L20,198 Q20,202 24,202 L116,202 Q120,202 120,198 L120,50" fill="none" stroke="var(--ink)" strokeWidth="2.5" />
      {/* spout */}
      <path d="M120,72 L168,96" stroke="var(--ink)" strokeWidth="2.5" fill="none" />
      <path d="M120,82 L166,105" stroke="var(--ink)" strokeWidth="2.5" fill="none" />
      <path d="M126,79 L164,98" stroke="var(--accent)" strokeWidth="4" opacity="0.6" />
      {/* drips */}
      <circle cx="170" cy="114" r="2.6" fill="var(--accent)" />
      <circle cx="171" cy="126" r="2.6" fill="var(--accent)" />
      {/* object */}
      <line x1="70" y1="10" x2="70" y2="132" stroke="var(--ink-muted)" strokeWidth="1.5" />
      <path d="M56,140 Q60,128 72,130 Q88,132 86,146 Q90,160 74,162 Q56,164 58,152 Q50,146 56,140 Z" fill="var(--ink-muted)" stroke="var(--ink)" strokeWidth="1.5" />
      {/* measuring cylinder */}
      <rect x="156" y="168" width="32" height="40" fill="var(--accent)" opacity="0.3" />
      <path d="M154,132 L154,208 L190,208 L190,132" fill="none" stroke="var(--ink)" strokeWidth="2" />
      <line x1="146" y1="210" x2="198" y2="210" stroke="var(--ink)" strokeWidth="2.5" />
      {[144, 156, 168, 180, 192].map(yy => <line key={yy} x1="154" y1={yy} x2="162" y2={yy} stroke="var(--ink)" strokeWidth="1" />)}
      {/* labels */}
      <line x1="124" y1="40" x2="114" y2="50" stroke="var(--ink-muted)" strokeWidth="1" />
      <text x="126" y="38" fontSize="11.5" fontWeight="700" fill="var(--ink)">Overflow can</text>
      <text x="70" y="222" textAnchor="middle" fontSize="11" fill="var(--ink)">object fully under water</text>
      <text x="204" y="140" fontSize="11.5" fontWeight="700" fill="var(--ink)">Measuring cylinder</text>
      <line x1="192" y1="180" x2="202" y2="180" stroke="var(--ink-muted)" strokeWidth="1" />
      <text x="206" y="172" fontSize="11" fill="var(--ink)">volume of water</text>
      <text x="206" y="186" fontSize="11" fill="var(--ink)">pushed out =</text>
      <text x="206" y="200" fontSize="11" fontWeight="700" fill="var(--ink)">volume of object</text>
    </svg>
  );
}

function Section42({ progress, setProgress }) {
  const p = { progress, setProgress };
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">4.2 Density</div>
        <h1>Calculating density</h1>
        <p className="lead">Density tells you how much mass is packed into each cubic centimetre of a substance. It decides whether things float or sink.</p>
      </div>

      <DotPoint id="4.2.3" title="Density: ρ = m / V for regular and irregular objects" {...p}>
        <ExamFocus tier="important" />
        <Recap>
          <ul>
            <li><Term def="How much mass is packed into each unit of volume.">Density</Term> = mass ÷ volume, written <strong>ρ = m / V</strong> (ρ is the Greek letter rho).</li>
            <li>Units: mass in grams (g), volume in cm³ or mL, so density is in <strong>g/cm³</strong> (or g/mL). <strong>1 mL = 1 cm³</strong>.</li>
            <li><strong>Regular object</strong> (a box shape): measure length, width and height with a ruler, then volume = l × w × h.</li>
            <li><strong>Irregular object</strong> (a key, a toy): use the <Term def="Finding the volume of an object from the volume of water it pushes aside when fully submerged.">displacement method</Term>. Lower it fully under water in an overflow can and collect the water that spills out in a measuring cylinder, or read the rise in water level in a measuring cylinder. Volume of object = volume of water displaced.</li>
            <li>Water has a density of 1.0 g/cm³. Objects with a density less than 1.0 g/cm³ float in water; greater than 1.0 g/cm³ sink.</li>
            <li>Common mistake: dividing the wrong way (V ÷ m). Mass always goes on top.</li>
          </ul>
        </Recap>
        <Figure caption="The displacement method for an irregular object using an overflow can.">
          <OverflowFigure />
        </Figure>
        <WorkedExample title="Density of an irregular object"
          problem="Mia wants to find the density of a brass door key. Its mass is 34 g. She lowers it into a full overflow can and collects 4 mL of water in a measuring cylinder. Calculate the density of the key. (2 marks)"
          steps={[
            "Volume: the key pushed out 4 mL of water, and 1 mL = 1 cm³, so V = 4 cm³.",
            "Formula: ρ = m / V",
            "Substitute: ρ = 34 g ÷ 4 cm³",
            "Answer with unit: ρ = 8.5 g/cm³",
          ]}
          answer="ρ = m / V = 34 ÷ 4 = 8.5 g/cm³. This is much more than water (1.0 g/cm³), so the key sinks." />
        <ExamTip>
          For every calculation, write three lines: <strong>formula → substitution with units → answer with unit</strong>. You can earn marks for working even if the final number is wrong, and a missing unit often costs a mark.
        </ExamTip>
        <Practice title="Density calculations">
          <MCQ num={9} question="A wooden block measures 10 cm × 5 cm × 2 cm and has a mass of 60 g. What is its density?"
            options={["0.6 g/cm³", "1.67 g/cm³", "6 g/cm³", "6000 g/cm³"]}
            correct={0}
            explain="V = 10 × 5 × 2 = 100 cm³, so ρ = 60 ÷ 100 = 0.6 g/cm³. 1.67 g/cm³ comes from dividing volume by mass, which is the wrong way round." />
          <MCQ num={10} question="A plastic toy dinosaur is lowered into a full overflow can and 15 mL of water flows into the measuring cylinder. What is the volume of the toy?"
            options={["1.5 cm³", "15 cm³", "150 cm³", "It cannot be worked out without the mass"]}
            correct={1}
            explain="The volume of water pushed out equals the volume of the toy, and 1 mL = 1 cm³, so it is 15 cm³. You only need the mass if you want the density." />
          <WrittenQ num={11} question="A glass marble has a mass of 12.5 g. In an overflow can it displaces 5 mL of water. Calculate its density, and state whether it will float or sink in water. Justify your answer. (3 marks)"
            model="ρ = m / V = 12.5 g ÷ 5 cm³ = 2.5 g/cm³. The marble will sink, because its density (2.5 g/cm³) is greater than the density of water (1.0 g/cm³)." />
          <MCQ num={12} question="Which of these objects would float in water (density 1.0 g/cm³)?"
            options={["Steel nut, 7.9 g/cm³", "Candle wax, 0.9 g/cm³", "Glass bead, 2.5 g/cm³", "Rubber eraser, 1.5 g/cm³"]}
            correct={1}
            explain="Only the candle wax has a density less than 1.0 g/cm³, so only it floats. The rubber eraser feels light, but 1.5 g/cm³ is greater than water, so it sinks." />
        </Practice>
        <SelfCheck id="4.2.3" items={[
          "I can calculate density with ρ = m / V and give the unit g/cm³.",
          "I can find the volume of a regular object with l × w × h.",
          "I can describe the displacement method for an irregular object.",
          "I can use 1 mL = 1 cm³ and predict float or sink by comparing with 1.0 g/cm³.",
        ]} />
        <NotebookLink href={NB + "#4.2"} label="Learn it in full: 4.2 Properties of Water" />
      </DotPoint>
    </>
  );
}

/* ============================================================
   SECTION 4.3  Solubility and investigating
   ============================================================ */
function SolutionFigure() {
  const solvent = [[18, 40], [44, 34], [70, 42], [30, 62], [58, 60], [80, 66], [16, 86], [42, 84], [68, 88], [28, 106], [54, 108], [80, 104]];
  const solute = [[33, 100], [45, 100], [57, 100], [39, 89], [51, 89]];
  const spread = [[30, 48], [62, 74], [22, 96], [76, 52], [50, 104]];
  const sq = (x, y, k) => <rect key={k} x={x - 5} y={y - 5} width="10" height="10" fill="var(--accent)" stroke="var(--ink)" strokeWidth="1" />;
  const ci = (x, y, k) => <circle key={k} cx={x} cy={y} r="5" fill="var(--card)" stroke="var(--ink-muted)" strokeWidth="1.4" />;
  const panel = (x, label1, label2, children) => (
    <g transform={`translate(${x},0)`}>
      <rect x="0" y="20" width="96" height="100" rx="6" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
      {children}
      <text x="48" y="138" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ink)">{label1}</text>
      <text x="48" y="153" textAnchor="middle" fontSize="11" fill="var(--ink-muted)">{label2}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 360 160" width="100%" role="img" style={{ maxWidth: 480 }}
      aria-label="Solute plus solvent makes a solution. The solute is a clump of square particles. The solvent is many round particles. In the solution the square solute particles are spread evenly between the solvent particles.">
      {panel(0, "Solute", "e.g. sugar", solute.map(([x, y], k) => sq(x, y, k)))}
      <text x="114" y="76" textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--ink)">+</text>
      {panel(132, "Solvent", "e.g. water", solvent.map(([x, y], k) => ci(x, y, k)))}
      <text x="246" y="76" textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--ink)">→</text>
      {panel(264, "Solution", "sugar water", [...solvent.map(([x, y], k) => ci(x, y, "c" + k)), ...spread.map(([x, y], k) => sq(x, y, "s" + k))])}
    </svg>
  );
}

function Section43({ progress, setProgress }) {
  const p = { progress, setProgress };
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">4.3 Solubility and investigating</div>
        <h1>Solutions, solubility and fair tests</h1>
        <p className="lead">This section joins the chemistry of dissolving with the skills of running an investigation and graphing the results. Both are worth a lot of marks.</p>
      </div>

      <DotPoint id="4.3.1" title="Solution words: solute, solvent, solubility and more" {...p}>
        <ExamFocus tier="important" />
        <Recap>
          <ul>
            <li><Term def="The substance that dissolves.">Solute</Term>: the substance that dissolves (e.g. sugar). <Term def="The substance that does the dissolving, usually a liquid such as water.">Solvent</Term>: the substance it dissolves in (usually water). <Term def="A mixture in which a solute is spread evenly through a solvent.">Solution</Term>: solute + solvent mixed evenly. A solution is see-through (it may still be coloured).</li>
            <li><strong>Soluble</strong>: can dissolve in a solvent (sugar in water). <strong>Insoluble</strong>: cannot dissolve (sand in water).</li>
            <li><Term def="The maximum mass of a solute that dissolves in a set amount of solvent at a set temperature.">Solubility</Term>: the <em>maximum</em> mass of solute that will dissolve in a set amount of solvent (usually 100 g of water) at a set temperature.</li>
            <li><Term def="A cloudy mixture of tiny insoluble particles spread through a liquid; they settle over time.">Suspension</Term>: insoluble particles spread through a liquid. It looks cloudy, the particles settle if left to stand, and filtering removes them.</li>
            <li><strong>Saturated</strong>: no more solute will dissolve at that temperature; extra solid stays at the bottom. <strong>Dilute</strong>: a small amount of solute in the solvent. <strong>Concentrated</strong>: a large amount of solute in the solvent.</li>
            <li>Common mistake: dissolving is not melting. The sugar does not turn into a liquid; its particles spread out between the water particles.</li>
          </ul>
        </Recap>
        <Figure caption="When a solute dissolves, its particles spread evenly between the solvent particles to make a solution.">
          <SolutionFigure />
        </Figure>
        <WorkedExample title="Using the right words"
          problem="Ella makes lime cordial by stirring 40 mL of cordial syrup into 200 mL of water. Her brother says it is too strong, so she adds another 200 mL of water. Identify the solute, solvent and solution, and describe what happened to the concentration. (3 marks)"
          steps={[
            "Solute: the cordial syrup (it is what dissolves).",
            "Solvent: the water (it does the dissolving). Solution: the lime drink, because the syrup is spread evenly through the water.",
            "Concentration: the same amount of solute is now spread through more water, so the drink became more dilute (less concentrated).",
          ]}
          answer="Solute = cordial syrup, solvent = water, solution = the lime drink. Adding water made the solution more dilute: the same amount of solute is in a larger volume." />
        <Practice title="Solution words">
          <MCQ num={13} question="Instant coffee granules are stirred into hot water until they disappear. The coffee granules are the…"
            options={["solvent", "solute", "suspension", "solution"]}
            correct={1}
            explain="The granules dissolve, so they are the solute. The hot water is the solvent, and the finished drink is the solution." />
          <MCQ num={14} question="Liquid A is blue, and a torch beam shines straight through it. Liquid B is muddy brown creek water with gritty bits; the torch beam is blocked, and when B is poured through filter paper a layer of brown silt and sand is left on the paper. Which describes the two liquids?"
            options={["A is a solution; B is a suspension", "A is a suspension; B is a solution", "A and B are both solutions", "A is a pure substance; B is a solution"]}
            correct={0}
            explain="A solution can be coloured but is see-through, and filtering cannot remove a dissolved solute, so A is a solution. B is cloudy and filter paper traps its solid particles, so they are undissolved: B is a suspension. Calling A a suspension because it is coloured is the trap; colour is not the same as cloudiness." />
          <MCQ num={15} question="Jack keeps stirring sugar into a glass of iced tea. Eventually some sugar stays on the bottom, no matter how long he stirs. The iced tea is now…"
            options={["saturated", "dilute", "insoluble", "a suspension"]}
            correct={0}
            explain="When no more solute will dissolve at that temperature, the solution is saturated. Sugar is still soluble; the water simply cannot hold any more." />
          <WrittenQ num={16} question="Two cups of blackcurrant drink are made. Cup A: 20 mL of syrup + 180 mL of water. Cup B: 60 mL of syrup + 140 mL of water. Which cup is more concentrated? Explain. (2 marks)"
            model="Cup B is more concentrated. Both cups hold 200 mL in total, but Cup B has three times as much solute (60 mL of syrup compared with 20 mL), so there is more solute in the same volume of solution." />
        </Practice>
        <SelfCheck id="4.3.1" items={[
          "I can define solute, solvent and solution and identify each in an everyday example.",
          "I can explain the difference between soluble and insoluble.",
          "I can tell a solution from a suspension.",
          "I can use saturated, dilute and concentrated correctly.",
        ]} />
        <NotebookLink href={NB + "#4.3"} label="Learn it in full: 4.3 Solutions" />
      </DotPoint>

      <DotPoint id="4.3.2" title="Measuring solubility in a practical investigation" {...p}>
        <ExamFocus tier="core" />
        <Recap>
          <ul>
            <li>Solubility is usually given in <strong>grams of solute per 100 g of water</strong> (or per 100 mL; 100 mL of water has a mass of about 100 g).</li>
            <li><strong>Method:</strong> measure a set volume of water (e.g. 50 mL) with a measuring cylinder, keep it at a set temperature, then add the solute in small weighed amounts, stirring after each one. Stop when some solid will not dissolve: the solution is saturated. Total mass added before that point = mass dissolved.</li>
            <li>An easy way to weigh it: weigh the solute before you start and the leftover solute at the end. Mass dissolved = start mass − leftover mass.</li>
            <li><strong>Scale up to 100:</strong> if 50 mL dissolves 16 g, then 100 mL dissolves 32 g, so the solubility is 32 g per 100 mL.</li>
            <li>Repeat each measurement (at least three trials) and calculate the average, so the result is more reliable.</li>
            <li>Results tables: the variable you change goes in the first column; units go in the column headings, not in every cell.</li>
          </ul>
          <div style={tableWrap}>
            <table className="data-table" style={{ fontSize: "0.88rem" }}>
              <caption style={{ captionSide: "top", textAlign: "left", fontWeight: 700, marginBottom: 6 }}>Table 1. Solubility of some substances in water at 20 °C</caption>
              <thead><tr><th>Substance</th><th>Solubility (g per 100 g water)</th></tr></thead>
              <tbody>
                <tr><td>Sugar (sucrose)</td><td>about 200</td></tr>
                <tr><td>Potassium nitrate</td><td>about 32</td></tr>
                <tr><td>Baking soda (sodium hydrogen carbonate)</td><td>about 10</td></tr>
                <tr><td>Sand</td><td>0 (insoluble)</td></tr>
              </tbody>
            </table>
          </div>
        </Recap>
        <WorkedExample title="Calculating solubility from results"
          problem="Noah weighs out 30.0 g of potassium nitrate. He adds it bit by bit to 50 mL of water at 20 °C, stirring each time, until no more will dissolve. 14.0 g is left in the weighing boat. Calculate the solubility in g per 100 mL. (2 marks)"
          steps={[
            "Mass dissolved = start mass − leftover mass = 30.0 g − 14.0 g = 16.0 g.",
            "This dissolved in 50 mL. 100 mL is twice as much water, so multiply by 2.",
            "Solubility = 16.0 g × 2 = 32 g per 100 mL.",
          ]}
          answer="32 g per 100 mL of water at 20 °C." />
        <WorkedExample title="Writing a full-mark method"
          problem="Write a method to measure the solubility of baking soda in water at room temperature. (4 marks)"
          steps={[
            "Use numbered steps and name the equipment with amounts: '1. Use a measuring cylinder to pour 50 mL of water into a beaker.'",
            "Say how you add the solute and measure it: '2. Weigh 10.0 g of baking soda on an electronic balance. 3. Add one spatula at a time, stirring until it dissolves.'",
            "Say how you know when to stop: '4. Stop when some solid stays undissolved after one minute of stirring. 5. Weigh the baking soda that is left over.'",
            "Show how you get the answer and make it reliable: '6. Mass dissolved = 10.0 g − leftover mass; multiply by 2 for g per 100 mL. 7. Repeat three times with fresh water at the same temperature and average.'",
          ]}
          answer="A full-mark method has numbered steps, equipment with quantities, a clear end point (solid stays undissolved), a calculation, controlled variables (same volume and temperature of water) and repeats with an average." />
        <ExamTip>
          "Describe a method" questions are marked on whether someone else could repeat your experiment exactly. Include quantities (50 mL, 10.0 g), the equipment, what you measure, and how many times you repeat it.
        </ExamTip>
        <Practice title="Measuring solubility">
          <MCQ num={17} question="During a solubility experiment, how can you tell that the solution has become saturated?"
            options={["The solution turns colourless", "Some solid stays undissolved even after thorough stirring", "The beaker feels warm", "The solute starts to melt"]}
            correct={1}
            explain="Saturated means the water cannot dissolve any more, so extra solid is left over however long you stir. A colour change or a temperature change is not the sign to look for." />
          <MCQ num={18} question="25 mL of water at 20 °C dissolves 2.5 g of baking soda before it becomes saturated. What is the solubility in g per 100 mL?"
            options={["2.5 g per 100 mL", "10 g per 100 mL", "62.5 g per 100 mL", "100 g per 100 mL"]}
            correct={1}
            explain="100 mL is 4 times 25 mL, so 2.5 g × 4 = 10 g per 100 mL. 62.5 comes from multiplying 25 by 2.5, which mixes up the volume and the mass." />
          <MCQ num={19} question="In a different practical, Mila uses a stopwatch to time how long a pendulum takes to make 10 complete swings. She does this three times and calculates the average time. Why does she repeat it?"
            options={["To make the test fair", "To change the independent variable", "To make the result more reliable", "To make the pendulum swing faster"]}
            correct={2}
            explain="Each timing has small random errors (for example, pressing the stopwatch a little early or late), and averaging several trials reduces their effect, so the result is more reliable. 'To make the test fair' is tempting, but a fair test is about controlling variables, which is a different idea." />
          <div style={tableWrap}>
            <table className="data-table" style={{ fontSize: "0.88rem" }}>
              <caption style={{ captionSide: "top", textAlign: "left", fontWeight: 700, marginBottom: 6 }}>Table 2. Mass of potassium nitrate dissolved in 50 mL of water at 20 °C</caption>
              <thead><tr><th>Trial</th><th>1</th><th>2</th><th>3</th><th>Average</th></tr></thead>
              <tbody><tr><td>Mass dissolved (g)</td><td>15.6</td><td>16.4</td><td>16.0</td><td>?</td></tr></tbody>
            </table>
          </div>
          <WrittenQ num={20} question="Use Table 2. Calculate the average mass dissolved, then the solubility of potassium nitrate in g per 100 mL. Show your working. (2 marks)"
            model="Average = (15.6 + 16.4 + 16.0) ÷ 3 = 48.0 ÷ 3 = 16.0 g. This dissolved in 50 mL, so the solubility = 16.0 × 2 = 32 g per 100 mL of water." />
          <div style={tableWrap}>
            <table className="data-table" style={{ fontSize: "0.88rem" }}>
              <caption style={{ captionSide: "top", textAlign: "left", fontWeight: 700, marginBottom: 6 }}>Table 3. Ava's results</caption>
              <thead><tr><th>Salt dissolved</th><th>Water used</th></tr></thead>
              <tbody>
                <tr><td>18 g</td><td>50 mL</td></tr>
                <tr><td>7 g</td><td>20 mL</td></tr>
                <tr><td>29 g</td><td>80 mL</td></tr>
              </tbody>
            </table>
          </div>
          <WrittenQ num={21} question="Ava changed the volume of water and measured how much salt dissolved in it. Identify THREE ways she could improve the layout of Table 3. (3 marks)"
            model="1. Put the independent variable (volume of water) in the first column and the dependent variable (mass of salt dissolved) in the second. 2. Put the units in the column headings, e.g. 'Volume of water (mL)' and 'Mass of salt dissolved (g)', instead of in every cell. 3. List the volumes in order (20, 50, 80 mL). She could also add columns for repeat trials and an average, and give the table a more descriptive title." />
          <WrittenQ num={22} question="Describe a method to compare the solubility of sugar and potassium nitrate in water at room temperature. Name TWO variables you would control. (4 marks)"
            model="1. Measure 50 mL of water into each of two beakers with a measuring cylinder. 2. Weigh a known mass of each solute on a balance. 3. Add one solute to each beaker a spatula at a time, stirring until each addition dissolves. 4. Stop when solid stays undissolved after a minute of stirring, then weigh the leftover solute. 5. Mass dissolved = start mass − leftover; multiply by 2 for g per 100 mL. 6. Repeat three times and average. Controlled variables: the volume of water (50 mL) and the temperature of the water (also the stirring time)." />
        </Practice>
        <SelfCheck id="4.3.2" items={[
          "I can describe a method to measure solubility, including how I know the solution is saturated.",
          "I can calculate mass dissolved and scale it to g per 100 mL.",
          "I can calculate an average from repeat trials.",
          "I can set out a results table with the independent variable first and units in the headings.",
        ]} />
        <NotebookLink href={NB + "#4.3"} label="Learn it in full: 4.3 Solutions" />
      </DotPoint>

      <DotPoint id="4.3.3" title="How temperature affects solubility" {...p}>
        <ExamFocus tier="core" />
        <Recap>
          <ul>
            <li>For <strong>most solids</strong>, solubility <strong>increases</strong> as the temperature of the water increases. Hot water can hold more dissolved solid.</li>
            <li>The size of the effect varies: potassium nitrate becomes far more soluble when heated, while sodium chloride (table salt) barely changes.</li>
            <li><strong>Gases are the opposite</strong>: they are <em>less</em> soluble in warm water. A warm soft drink loses its fizz faster, and warm water holds less dissolved oxygen for fish.</li>
            <li>If a hot saturated solution is cooled, the solubility falls, so some solute comes out of solution as solid <strong>crystals</strong>.</li>
            <li>Do not mix up <em>how fast</em> something dissolves (rate) with <em>how much</em> can dissolve (solubility). Hot water does both for most solids, but they are measured differently.</li>
            <li>A graph of solubility against temperature is called a <Term def="A graph showing how the solubility of a substance changes with temperature.">solubility curve</Term>.</li>
          </ul>
        </Recap>
        <Figure num="1" caption="Solubility curves for potassium nitrate and sodium chloride (rounded data).">
          <SolubilityGraph />
        </Figure>
        <WorkedExample title="Reading a solubility curve"
          problem="Use Figure 1. (a) What mass of potassium nitrate dissolves in 100 g of water at 50 °C? (b) A saturated solution at 50 °C is cooled to 20 °C. What mass of crystals forms? (3 marks)"
          steps={[
            "(a) Find 50 °C on the x-axis, go straight up to the potassium nitrate curve, then straight across to the y-axis: 86 g.",
            "(b) Do the same at 20 °C: 32 g. Only 32 g can stay dissolved at 20 °C.",
            "Crystals formed = mass dissolved at 50 °C − mass that can stay dissolved at 20 °C = 86 g − 32 g = 54 g.",
          ]}
          answer="(a) 86 g per 100 g of water. (b) 86 − 32 = 54 g of potassium nitrate crystallises out." />
        <WorkedExample title="Explaining a gas example"
          problem="Explain why a bottle of soft drink left in a hot car goes flat more quickly than one kept in the fridge. (2 marks)"
          steps={[
            "Identify the solute: the fizz is carbon dioxide gas dissolved in the drink.",
            "State the rule: gases are less soluble at higher temperatures.",
            "Link: in the hot car, less carbon dioxide can stay dissolved, so more escapes as bubbles when the bottle is opened and the drink goes flat.",
          ]}
          answer="Soft drink contains dissolved carbon dioxide. Gases are less soluble in warm liquids, so in the hot car less carbon dioxide can stay dissolved. It comes out as bubbles and escapes, so the drink goes flat faster." />
        <ExamTip>
          When you read a value from a curve, rule light pencil lines up from the x-axis to the curve and across to the y-axis, then give the value with its unit. For "how much crystallises" questions, read two values and subtract.
        </ExamTip>
        <KNO3Beaker />
        <Practice title="Temperature and solubility">
          <MCQ num={23} question="Use Figure 1. At about what temperature do potassium nitrate and sodium chloride have the same solubility?"
            options={["About 10 °C", "About 23 °C", "About 36 °C", "They never have the same solubility"]}
            correct={1}
            explain="The two curves cross where both are about 36 g per 100 g of water, which is at about 23 °C (between the 20 °C and 30 °C grid lines). 36 °C is the trap: 36 is the solubility reading on the y-axis, not the temperature." />
          <MCQ num={24} question="Using Figure 1, at what temperature does about 64 g of potassium nitrate dissolve in 100 g of water?"
            options={["20 °C", "30 °C", "40 °C", "50 °C"]}
            correct={2}
            explain="Go across from 64 g on the y-axis to the curve, then down: 40 °C. At 50 °C it would be about 86 g." />
          <MCQ num={25} question="Fish in a shallow pond can struggle to breathe on very hot days. Which is the best explanation?"
            options={["Warm water holds less dissolved oxygen", "Warm water holds more dissolved oxygen, which is harmful", "Oxygen turns into a solid in warm water", "The water becomes saturated with salt"]}
            correct={0}
            explain="Gases, such as oxygen, are less soluble in warm water, so a hot pond holds less oxygen for the fish. Option B gets the rule for gases backwards." />
          <WrittenQ num={26} question="To make rock candy, lots of sugar is dissolved in very hot water. A string is hung in the solution and it is left to cool. Explain why sugar crystals grow on the string. (3 marks)"
            model="Sugar is more soluble in hot water, so a lot of sugar can dissolve. As the solution cools, the solubility of sugar decreases, so the water can no longer hold all of the dissolved sugar. The extra sugar comes out of solution as solid crystals, which form and grow on the string." />
          <WrittenQ num={27} question="50 g of potassium nitrate is added to 100 g of water at 20 °C and stirred. The beaker is then heated to 50 °C. Use Figure 1 to predict what you would see at each temperature. (2 marks)"
            model="At 20 °C only about 32 g can dissolve, so about 18 g of solid stays on the bottom (a saturated solution). At 50 °C the solubility is about 86 g, which is more than 50 g, so all of the potassium nitrate dissolves." />
          <MCQ num={28} question="Liam says: 'Icing sugar dissolves faster than a sugar cube, so icing sugar must be more soluble.' Which is the best response?"
            options={["He is correct; faster always means more soluble", "Dissolving faster is about rate; both are the same substance (sucrose), so the maximum mass that can dissolve in a set amount of water at one temperature is the same", "Icing sugar is insoluble, so it cannot dissolve at all", "He should compare the colour of the two solutions instead"]}
            correct={1}
            explain="Tiny icing sugar grains have more surface touching the water, so they dissolve faster, but rate (how fast) and solubility (how much) are different measurements. Solubility depends on the substance, the solvent and the temperature, not on the size of the pieces. 'Faster means more soluble' is the trap." />
        </Practice>
        <SelfCheck id="4.3.3" items={[
          "I can state how temperature affects the solubility of most solids and of gases.",
          "I can read values from a solubility curve.",
          "I can explain why crystals form when a hot saturated solution cools.",
          "I can tell the difference between rate of dissolving and solubility.",
        ]} />
        <NotebookLink href={NB + "#4.3"} label="Learn it in full: 4.3 Solutions" />
      </DotPoint>

      <DotPoint id="1.2.6" title="Following a method safely: variables and fair tests" {...p}>
        <ExamFocus tier="core" />
        <Recap>
          <ul>
            <li><strong>Follow the method:</strong> read the whole method first, do the steps in order, measure carefully, and record results as you go.</li>
            <li><strong>Safety:</strong> wear safety glasses when heating or using chemicals; tie back long hair; stand up when heating; use a heatproof mat; never point a heated test tube at anyone; tell your teacher about spills or breakages straight away; wash your hands after the practical.</li>
            <li><strong>Risk assessment:</strong> for each <em>hazard</em> (something that could cause harm), state the <em>risk</em> (what could happen) and the <em>control</em> (what you do to make it safer).</li>
            <li><Term def="The one variable you deliberately change.">Independent variable</Term> (IV): the one thing you change. <Term def="The variable you measure; it may depend on the independent variable.">Dependent variable</Term> (DV): the thing you measure. <Term def="Variables kept the same so they cannot affect the result.">Controlled variables</Term> (CV): everything else you keep the same.</li>
            <li>A <strong>fair test</strong> changes only the independent variable, so any change in the dependent variable must be caused by it. Remember: change one, measure one, keep the rest the same.</li>
          </ul>
        </Recap>
        <WorkedExample title="Identifying variables"
          problem="Investigation: 'Does stirring speed affect how long 5 g of copper sulfate crystals take to dissolve in 100 mL of water?' The class uses a magnetic stirrer set to slow, medium and fast. Identify the independent, dependent and two controlled variables. (3 marks)"
          steps={[
            "IV = what is changed on purpose: the stirring speed (slow, medium, fast).",
            "DV = what is measured: the time taken for all the crystals to dissolve (in seconds, with a stopwatch).",
            "CVs = what must stay the same: the mass of copper sulfate (5 g), the volume of water (100 mL), the water temperature, and the size of the crystals.",
          ]}
          answer="IV: stirring speed. DV: time for the copper sulfate to dissolve (s). CVs: mass of copper sulfate, volume of water (also water temperature and crystal size)." />
        <WorkedExample title="A risk assessment row"
          problem="The class heats water on a hot plate and then dissolves copper sulfate in it. Copper sulfate is harmful if swallowed and irritates the eyes. Complete a risk assessment for TWO hazards. (4 marks)"
          steps={[
            "Hazard 1: the hot plate and hot water. Risk: burns or scalds. Control: do not touch the plate; use tongs or a heatproof glove to move the hot beaker; let it cool before tipping out.",
            "Hazard 2: copper sulfate. Risk: eye irritation or poisoning if swallowed. Control: wear safety glasses; never taste chemicals; wash hands after the practical.",
          ]}
          answer="Each row needs all three parts: hazard → risk → control. A control must actually reduce the risk ('be careful' is too vague to earn the mark)." />
        <ExamTip>
          Name variables precisely, with what is measured. "Temperature" is vague; "the temperature of the water (°C)" earns the mark. For the DV, say how it is measured, e.g. "the mass dissolved, measured with a balance".
        </ExamTip>
        <Practice title="Variables, fair tests and safety">
          <MCQ num={29} question="Zoe tests whether the size of sugar crystals (sugar cubes, normal sugar, icing sugar) affects how long they take to dissolve in water. What is the independent variable?"
            options={["The time taken to dissolve", "The size of the sugar crystals", "The volume of water", "The temperature of the water"]}
            correct={1}
            explain="Zoe deliberately changes the crystal size, so that is the IV. The time taken is what she measures, which makes it the dependent variable." />
          <MCQ num={30} question="In Zoe's investigation, which of these should be controlled?"
            options={["The size of the sugar crystals", "The time taken to dissolve", "The mass of sugar, and the volume and temperature of the water", "Nothing, as long as she repeats the test"]}
            correct={2}
            explain="Everything except the IV must stay the same, including the mass of sugar and the volume and temperature of the water. Repeating improves reliability but does not make an uncontrolled test fair." />
          <MCQ num={31} question="Which is the safest way to heat water in a beaker with a Bunsen burner?"
            options={["Lean over the beaker to check whether it is boiling", "Wear safety glasses, tie back long hair and stand while heating", "Carry the hot beaker to the sink with bare hands", "Leave the burner on a blue flame while you fetch more water"]}
            correct={1}
            explain="Glasses protect your eyes from splashes, tied-back hair cannot catch fire, and standing lets you step away quickly. A lit burner should never be left unattended." />
          <WrittenQ num={32} question="Explain why only one variable should be changed in a fair test. (2 marks)"
            model="If only the independent variable is changed and all others are controlled, then any change in the dependent variable must have been caused by the independent variable. If two variables were changed, you could not tell which one caused the result." />
          <WrittenQ num={33} question="Hamish wants to find out whether the type of liquid (water, vinegar or cooking oil) affects how much sugar dissolves in it. Identify the independent variable, the dependent variable and one controlled variable. (3 marks)"
            model="Independent variable: the type of liquid (water, vinegar, cooking oil). Dependent variable: the mass of sugar that dissolves (in grams). Controlled variable: the volume of each liquid (e.g. 50 mL); others are the temperature of the liquid and the amount of stirring." />
          <WrittenQ num={34} question="Sofia wants to know whether stirring makes sugar dissolve faster. She stirs a sugar cube in one glass of water and leaves a spoonful of caster sugar unstirred in another, then times how long each takes to dissolve. Explain why this is not a fair test and how she could fix it. (2 marks)"
            model="It is not fair because she changed two variables: stirring and the size of the sugar pieces (a cube compared with fine caster sugar). She could not tell which one caused any difference in time. She should use the same type and mass of sugar in both glasses, so only the stirring changes." />
        </Practice>
        <SelfCheck id="1.2.6" items={[
          "I can identify the independent, dependent and controlled variables in an investigation.",
          "I can explain what makes a test fair.",
          "I can write a risk assessment with hazard, risk and control.",
          "I can list safety rules for heating and using chemicals.",
        ]} />
        <NotebookLink href={NB_INV} label="Learn it in full: 1.2 Working scientifically" />
      </DotPoint>

      <DotPoint id="1.2.8" title="Tables, graphs, trends and conclusions" {...p}>
        <ExamFocus tier="core" />
        <Recap>
          <ul>
            <li><strong>Tables:</strong> independent variable in the first column, dependent variable next; units in the headings; repeat trials and an average column; a title.</li>
            <li><strong>Which graph?</strong> If the independent variable is a number that can take any value (temperature, time, mass), draw a <strong>scatter (line) graph</strong>. If it is in categories (types of liquid, brands), draw a <strong>column (bar) graph</strong>.</li>
            <li><strong>Graph checklist:</strong> a title ("dependent variable vs independent variable"); independent variable on the x-axis, dependent variable on the y-axis; both axes labelled with units; <strong>even scales</strong> that use most of the grid; points plotted accurately as small crosses.</li>
            <li><strong>Line of best fit:</strong> a single straight line or smooth curve through the middle of the points, with about the same number of points above and below. Never join the dots.</li>
            <li><strong>Outlier:</strong> a result that does not fit the pattern. Circle it, ignore it when drawing the line and averaging, and repeat that measurement if you can.</li>
            <li><strong>Trend:</strong> "As [IV] increases, [DV] increases / decreases", backed up with numbers. <strong>Conclusion:</strong> answers the aim in one or two sentences, using the data as evidence.</li>
          </ul>
        </Recap>
        <Figure num="2" caption="Bounce height of a tennis ball dropped from different heights onto a concrete floor (Josh's class results).">
          <BounceGraph />
        </Figure>
        <WorkedExample title="Choosing a scale"
          problem="Josh's highest bounce is 66 cm. His graph paper has 14 big squares going up the y-axis. Choose a sensible scale for the y-axis. (1 mark)"
          steps={[
            "Find the range to fit: from 0 up to at least 66 cm.",
            "Divide by the squares available: 66 ÷ 14 ≈ 4.7 cm per square. Round up to an easy step: 5 cm per square.",
            "Check: 14 squares × 5 cm = 70 cm, which fits 66 cm and uses most of the grid. Number the axis 0, 5, 10 … 70 evenly.",
          ]}
          answer="5 cm per big square (0 to 70 cm). Steps of 1, 2, 5, 10, 20, 50 … are easy to plot; steps like 3 or 7 are not." />
        <WorkedExample title="Describing a trend and drawing a conclusion"
          problem="Use Figure 2 to describe the trend, identify the outlier and write a conclusion for the aim 'to find out how the drop height affects the bounce height of a tennis ball'. (3 marks)"
          steps={[
            "Trend in words: as the drop height increases, the bounce height increases.",
            "Evidence: it rises from 11 cm for a 20 cm drop to 66 cm for a 120 cm drop, close to a straight line through the origin. Each bounce is a little over half the drop height.",
            "Outlier: the result for the 80 cm drop (58 cm) is well above the line of best fit (which gives about 44 cm), so it was ignored. It should be repeated.",
            "Conclusion that answers the aim: the higher the ball is dropped from, the higher it bounces.",
          ]}
          answer="As the drop height increases from 20 cm to 120 cm, the bounce height increases from 11 cm to 66 cm, about half the drop height each time. The 80 cm result (58 cm) is an outlier. Conclusion: the greater the drop height, the greater the bounce height." />
        <ExamTip title="Habits for neat graphs">
          Use a sharp pencil so mistakes can be rubbed out. Before you plot anything, check that your scale makes the data fill more than half of the grid. After plotting, read each point back off the axes to check it is in the right place. If the points follow a curve, draw one smooth curve freehand rather than forcing a ruled line through them.
        </ExamTip>
        <Practice title="Tables and graphs">
          <MCQ num={35} question="In an investigation of how the length of a pendulum affects the time it takes to make 10 swings, which variable goes on the x-axis?"
            options={["The time for 10 swings", "The length of the pendulum", "The mass of the pendulum bob", "Whichever has the bigger numbers"]}
            correct={1}
            explain="The independent variable (what you change) goes on the x-axis, so the length of the pendulum. The time for 10 swings is the dependent variable and goes on the y-axis. The mass of the bob is a controlled variable." />
          <MCQ num={36} question="A class measures how much sugar dissolves in four different liquids: water, milk, vinegar and cooking oil. Which type of graph should they draw?"
            options={["A scatter graph with a line of best fit", "A column (bar) graph", "A pie chart", "A line graph joining the dots"]}
            correct={1}
            explain="The independent variable is in categories (types of liquid), so a column graph is correct. A line of best fit only makes sense when the x-axis is a number scale." />
          <MCQ num={37} question="Kai numbers his y-axis 0, 10, 20, 50, 100. What is the main problem with his graph?"
            options={["The scale is not even", "The axis should start at 10", "The numbers should go on the x-axis", "Nothing is wrong"]}
            correct={0}
            explain="Each grid line must stand for the same amount. Jumping from 20 to 50 to 100 squashes the pattern and makes the trend look wrong." />
          <Figure num="3" caption="Height of a bean seedling measured every two days after planting (Mei's class results).">
            <SeedlingGraph />
          </Figure>
          <MCQ num={38} question="Use Figure 3. What is the best estimate of the seedling's height on day 7?"
            options={["About 4 cm", "About 6 cm", "About 7 cm", "About 9 cm"]}
            correct={1}
            explain="Day 7 is halfway between day 6 (about 5.0 cm on the line) and day 8 (about 7.0 cm), so reading from the line gives about 6 cm. 7 cm is tempting because it matches the day number, but it is the height on day 8, not day 7." />
          <WrittenQ num={39} question="Use Figure 3. (a) Extend the line of best fit to predict the seedling's height on day 14. (b) Describe the trend, and use the data to calculate how fast the seedling grew in cm per day. (3 marks)"
            model="(a) About 13 cm (the line rises by about 2 cm every 2 days, so 11.0 cm on day 12 + 2 cm ≈ 13 cm on day 14). (b) As the time since planting increases, the seedling's height increases. The points lie close to a straight line, so it grew at a steady rate. From day 2 (1.0 cm) to day 12 (11.0 cm) it grew 10.0 cm in 10 days, so the growth rate is 10.0 ÷ 10 = 1.0 cm per day. (The line does not pass through the origin because the shoot only pokes above the soil after about a day.)" />
          <WrittenQ num={40} question="A paper helicopter was dropped from the same 2.0 m height four times. The fall times were 4.1 s, 4.3 s, 5.8 s and 4.2 s. Identify the outlier, state what should be done with it, and calculate the average. (3 marks)"
            model="The outlier is 5.8 s, because it is much higher than the other three results. It should be left out of the average (and the trial repeated if possible). Average = (4.1 + 4.3 + 4.2) ÷ 3 = 12.6 ÷ 3 = 4.2 s." />
        </Practice>
        <SelfCheck id="1.2.8" items={[
          "I can set out a results table with units in the headings.",
          "I can choose between a scatter graph and a column graph.",
          "I can draw a graph with a title, labelled axes with units, even scales and a line of best fit.",
          "I can identify an outlier and leave it out of an average.",
          "I can describe a trend with data and write a conclusion that answers the aim.",
        ]} />
        <NotebookLink href={NB_INV} label="Learn it in full: 1.2 Working scientifically" />
      </DotPoint>
    </>
  );
}

/* ============================================================
   SECTION 4.4  Separating mixtures
   ============================================================ */
function ParticleTypesFigure() {
  const A = (x, y, k, r = 7) => <circle key={k} cx={x} cy={y} r={r} fill="var(--accent)" stroke="var(--ink)" strokeWidth="1" />;
  const B = (x, y, k, r = 5) => <circle key={k} cx={x} cy={y} r={r} fill="var(--card)" stroke="var(--ink)" strokeWidth="1.2" />;
  const element1 = [[18, 40], [36, 40], [54, 40], [72, 40], [27, 56], [45, 56], [63, 56], [18, 72], [36, 72], [54, 72], [72, 72]].map(([x, y], k) => A(x, y, k));
  const pair = (x, y, k) => <g key={k}>{A(x, y, "a", 6)}{A(x + 11, y, "b", 6)}</g>;
  const element2 = [[14, 38], [52, 34], [24, 64], [56, 70], [40, 50]].map(([x, y], k) => pair(x, y, k));
  const water = (x, y, k) => <g key={k}>{A(x, y, "o", 7)}{B(x - 9, y + 6, "h1")}{B(x + 9, y + 6, "h2")}</g>;
  const compound = [[24, 36], [62, 40], [40, 64], [70, 72], [18, 76]].map(([x, y], k) => water(x, y, k));
  const mixture = [
    pair(14, 36, "m1"), pair(54, 70, "m2"), pair(58, 30, "m3"),
    water(28, 66, "m4"), water(46, 46, "m5"),
    B(76, 50, "m6", 6), B(18, 52, "m7", 6),
  ];
  const panel = (x, l1, l2, kids) => (
    <g transform={`translate(${x},0)`}>
      <rect x="0" y="16" width="84" height="76" rx="6" fill="none" stroke="var(--ink)" strokeWidth="1.4" />
      {kids}
      <text x="42" y="108" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="var(--ink)">{l1}</text>
      <text x="42" y="122" textAnchor="middle" fontSize="10.5" fill="var(--ink-muted)">{l2}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 360 128" width="100%" role="img" style={{ maxWidth: 520 }}
      aria-label="Four particle pictures. Element made of single atoms all the same kind. Element made of molecules, each two identical atoms joined. Compound: every molecule is one large atom joined to two small atoms of a different kind. Mixture: different kinds of particles mixed together but not joined.">
      {panel(0, "Element", "single atoms", element1)}
      {panel(92, "Element", "molecules", element2)}
      {panel(184, "Compound", "different atoms joined", compound)}
      {panel(276, "Mixture", "not joined", mixture)}
    </svg>
  );
}

function ClassifyTree() {
  const box = (cx, y, w, t1, t2, strong, k) => (
    <g key={k}>
      <rect x={cx - w / 2} y={y} width={w} height={t2 ? 40 : 28} rx="8" fill={strong ? "var(--bg-2)" : "var(--card)"} stroke="var(--ink)" strokeWidth="1.4" />
      <text x={cx} y={y + 18} textAnchor="middle" fontSize={t2 ? "10.5" : "11.5"} fontWeight="700" fill="var(--ink)">{t1}</text>
      {t2 && <text x={cx} y={y + 33} textAnchor="middle" fontSize="10" fill="var(--ink-muted)">{t2}</text>}
    </g>
  );
  const ln = (x1, y1, x2, y2, k) => <line key={k} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--ink)" strokeWidth="1.4" />;
  return (
    <svg viewBox="0 0 360 194" width="100%" role="img" style={{ maxWidth: 520 }}
      aria-label="Classification tree. Matter divides into pure substances and mixtures. Pure substances are elements, such as copper and oxygen, or compounds, such as water and carbon dioxide. Mixtures are homogeneous, the same throughout, such as air and cordial, or heterogeneous, with parts you can see, such as soil and fruit salad.">
      {ln(180, 34, 90, 62, 1)}{ln(180, 34, 270, 62, 2)}
      {ln(90, 90, 46, 118, 3)}{ln(90, 90, 136, 118, 4)}
      {ln(270, 90, 226, 118, 5)}{ln(270, 90, 316, 118, 6)}
      {box(180, 6, 90, "Matter", null, true, "a")}
      {box(90, 62, 120, "Pure substance", null, true, "b")}
      {box(270, 62, 100, "Mixture", null, true, "c")}
      {box(46, 118, 84, "Element", "copper, oxygen", false, "d")}
      {box(136, 118, 84, "Compound", "water, CO₂", false, "e")}
      {box(226, 118, 84, "Homogeneous", "air, cordial", false, "f")}
      {box(316, 118, 84, "Heterogeneous", "soil, fruit salad", false, "g")}
      <text x="180" y="174" textAnchor="middle" fontSize="10.5" fill="var(--ink-muted)">Homogeneous: the same all the way through.</text>
      <text x="180" y="189" textAnchor="middle" fontSize="10.5" fill="var(--ink-muted)">Heterogeneous: you can see the different parts.</text>
    </svg>
  );
}

function FiltrationFigure() {
  return (
    <svg viewBox="0 0 360 236" width="100%" role="img" style={{ maxWidth: 440 }}
      aria-label="Filtration. A mixture is poured into a funnel lined with filter paper. The insoluble solid, called the residue, stays in the paper. The liquid that passes through into the flask below is the filtrate.">
      <defs>
        <marker id="fl-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--ink)" /></marker>
      </defs>
      {/* funnel */}
      <path d="M80,44 L200,44 L146,118 L146,166 L134,166 L134,118 Z" fill="none" stroke="var(--ink)" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M90,48 L140,114 L190,48" fill="none" stroke="var(--ink-muted)" strokeWidth="1.6" strokeDasharray="4 3" />
      {/* residue */}
      {[[132, 100], [140, 106], [148, 100], [136, 92], [144, 92], [140, 98], [128, 94], [152, 94]].map(([x, y], k) => <circle key={k} cx={x} cy={y} r="3" fill="var(--ink)" opacity="0.7" />)}
      {/* drip */}
      <circle cx="140" cy="176" r="2.5" fill="var(--accent)" />
      {/* flask */}
      <path d="M128,160 L128,184 L94,224 L186,224 L152,184 L152,160" fill="none" stroke="var(--ink)" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M104,212 L176,212 L186,224 L94,224 Z" fill="var(--accent)" opacity="0.3" />
      {/* labels */}
      <text x="8" y="20" fontSize="11.5" fontWeight="700" fill="var(--ink)">Mixture poured in</text>
      <line x1="70" y1="26" x2="112" y2="40" stroke="var(--ink)" strokeWidth="1.4" markerEnd="url(#fl-arr)" />
      <line x1="186" y1="56" x2="214" y2="56" stroke="var(--ink-muted)" strokeWidth="1" />
      <text x="218" y="60" fontSize="11.5" fill="var(--ink)">Filter paper</text>
      <line x1="154" y1="98" x2="214" y2="98" stroke="var(--ink-muted)" strokeWidth="1" />
      <text x="218" y="96" fontSize="11.5" fontWeight="700" fill="var(--ink)">Residue</text>
      <text x="218" y="110" fontSize="10.5" fill="var(--ink-muted)">(solid stays in paper)</text>
      <line x1="148" y1="140" x2="214" y2="140" stroke="var(--ink-muted)" strokeWidth="1" />
      <text x="218" y="144" fontSize="11.5" fill="var(--ink)">Funnel</text>
      <line x1="178" y1="216" x2="214" y2="196" stroke="var(--ink-muted)" strokeWidth="1" />
      <text x="218" y="194" fontSize="11.5" fontWeight="700" fill="var(--ink)">Filtrate</text>
      <text x="218" y="208" fontSize="10.5" fill="var(--ink-muted)">(liquid passes through)</text>
    </svg>
  );
}

function DistillationFigure() {
  return (
    <svg viewBox="0 0 360 238" width="100%" role="img" style={{ maxWidth: 520 }}
      aria-label="Simple distillation. A flask of mixture is heated. Vapour rises past a thermometer and into a sloping condenser cooled by cold water that enters at the lower end and leaves at the upper end. The vapour condenses and the pure liquid, the distillate, drips into a beaker.">
      <defs>
        <marker id="ds-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--ink)" /></marker>
      </defs>
      {/* flask liquid + flask */}
      <path d="M30,150 A34,34 0 0 0 90,150 Z" fill="var(--accent)" opacity="0.3" />
      <circle cx="60" cy="140" r="34" fill="none" stroke="var(--ink)" strokeWidth="2.2" />
      <path d="M52,108 L52,70 M68,108 L68,70" stroke="var(--ink)" strokeWidth="2.2" />
      <text x="60" y="164" textAnchor="middle" fontSize="10.5" fill="var(--ink)">mixture</text>
      {/* thermometer */}
      <line x1="60" y1="30" x2="60" y2="80" stroke="var(--ink)" strokeWidth="2" />
      <circle cx="60" cy="83" r="3.5" fill="var(--ink)" />
      <text x="70" y="30" fontSize="11" fill="var(--ink)">thermometer</text>
      {/* heat */}
      <path d="M50,200 Q46,188 54,180 Q56,190 60,184 Q64,190 66,180 Q74,188 70,200 Z" fill="var(--accent)" opacity="0.85" />
      <text x="60" y="218" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="var(--ink)">Heat</text>
      {/* condenser jacket */}
      <polygon points="114.1,80.7 274.1,138.7 265.9,161.3 105.9,103.3" fill="var(--accent)" fillOpacity="0.14" stroke="var(--ink)" strokeWidth="1.8" />
      {/* side arm + inner tube */}
      <path d="M68,80 L285,157" stroke="var(--ink)" strokeWidth="2" fill="none" />
      {/* water in (lower end) */}
      <line x1="250" y1="182" x2="250" y2="158" stroke="var(--ink)" strokeWidth="1.6" markerEnd="url(#ds-arr)" />
      <text x="244" y="192" textAnchor="end" fontSize="11" fill="var(--ink)">cold water in</text>
      {/* water out (upper end) */}
      <line x1="130" y1="86" x2="130" y2="62" stroke="var(--ink)" strokeWidth="1.6" markerEnd="url(#ds-arr)" />
      <text x="136" y="66" fontSize="11" fill="var(--ink)">water out</text>
      <text x="196" y="98" fontSize="11.5" fontWeight="700" fill="var(--ink)">Condenser</text>
      {/* drip + beaker */}
      <circle cx="287" cy="166" r="2.5" fill="var(--accent)" />
      <path d="M278,176 L278,222 L328,222 L328,176" fill="none" stroke="var(--ink)" strokeWidth="2.2" />
      <rect x="279" y="204" width="48" height="17" fill="var(--accent)" opacity="0.3" />
      <text x="303" y="236" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="var(--ink)">Distillate</text>
    </svg>
  );
}

function ChromatogramFigure() {
  const lanes = [
    ["Note", [[130, "#2563eb"], [95, "#ca8a04"], [55, "#db2777"]]],
    ["Pen A", [[130, "#2563eb"], [55, "#db2777"]]],
    ["Pen B", [[130, "#2563eb"], [95, "#ca8a04"], [55, "#db2777"]]],
    ["Pen C", [[130, "#2563eb"], [75, "#7c3aed"]]],
  ];
  return (
    <svg viewBox="0 0 360 196" width="100%" role="img" style={{ maxWidth: 480 }}
      aria-label="Chromatogram with four lanes. The note ink separates into blue, yellow and pink spots. Pen A shows blue and pink only. Pen B shows blue, yellow and pink at the same heights as the note. Pen C shows blue and purple.">
      <rect x="12" y="8" width="336" height="166" rx="4" fill="var(--card)" stroke="var(--ink)" strokeWidth="1.5" />
      <line x1="12" y1="30" x2="348" y2="30" stroke="var(--ink-muted)" strokeWidth="1.2" strokeDasharray="5 4" />
      <line x1="12" y1="158" x2="348" y2="158" stroke="var(--ink)" strokeWidth="1.2" strokeDasharray="2 3" />
      <text x="344" y="24" textAnchor="end" fontSize="10.5" fill="var(--ink-muted)">solvent front</text>
      <text x="344" y="170" textAnchor="end" fontSize="10.5" fill="var(--ink-muted)">pencil start line</text>
      {lanes.map(([name, spots], i) => {
        const x = 52 + i * 66;
        return (
          <g key={name}>
            {spots.map(([y, c], k) => <ellipse key={k} cx={x} cy={y} rx="9" ry="7" fill={c} opacity="0.85" />)}
            <text x={x} y="190" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="var(--ink)">{name}</text>
          </g>
        );
      })}
    </svg>
  );
}

function ColumnFigure() {
  const fr = [
    [40, "Refinery gases (LPG)"],
    [76, "Petrol"],
    [112, "Kerosene (jet fuel)"],
    [148, "Diesel"],
    [184, "Lubricating oil"],
  ];
  return (
    <svg viewBox="0 0 360 262" width="100%" role="img" style={{ maxWidth: 480 }}
      aria-label="Fractionating column. Heated crude oil vapour enters near the bottom. The column is hot at the bottom, about 350 degrees, and cool at the top, about 25 degrees. From top to bottom the fractions collected are refinery gases, petrol, kerosene, diesel, lubricating oil and bitumen.">
      <defs>
        <marker id="fc-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--ink)" /></marker>
      </defs>
      <rect x="120" y="18" width="70" height="208" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--ink)" strokeWidth="2" />
      {[58, 94, 130, 166, 202].map(y => <line key={y} x1="120" y1={y} x2="190" y2={y} stroke="var(--ink-muted)" strokeWidth="1.2" strokeDasharray="4 3" />)}
      {fr.map(([y, l]) => (
        <g key={l}>
          <line x1="190" y1={y} x2="210" y2={y} stroke="var(--ink)" strokeWidth="1.6" markerEnd="url(#fc-arr)" />
          <text x="214" y={y + 4} fontSize="11" fill="var(--ink)">{l}</text>
        </g>
      ))}
      <line x1="155" y1="226" x2="155" y2="244" stroke="var(--ink)" strokeWidth="1.6" markerEnd="url(#fc-arr)" />
      <text x="164" y="250" fontSize="11" fill="var(--ink)">Bitumen (roads)</text>
      <text x="110" y="32" textAnchor="end" fontSize="11" fontWeight="700" fill="var(--ink)">Cooler</text>
      <text x="110" y="46" textAnchor="end" fontSize="10.5" fill="var(--ink-muted)">about 25 °C</text>
      <text x="110" y="166" textAnchor="end" fontSize="11" fontWeight="700" fill="var(--ink)">Hotter</text>
      <text x="110" y="180" textAnchor="end" fontSize="10.5" fill="var(--ink-muted)">about 350 °C</text>
      <line x1="20" y1="214" x2="118" y2="214" stroke="var(--ink)" strokeWidth="1.8" markerEnd="url(#fc-arr)" />
      <text x="8" y="206" fontSize="11" fontWeight="700" fill="var(--ink)">Hot crude oil in</text>
      <line x1="96" y1="150" x2="96" y2="60" stroke="var(--ink-muted)" strokeWidth="1.4" markerEnd="url(#fc-arr)" />
      <text x="88" y="110" textAnchor="end" fontSize="10.5" fill="var(--ink-muted)">vapour</text>
      <text x="88" y="123" textAnchor="end" fontSize="10.5" fill="var(--ink-muted)">rises</text>
    </svg>
  );
}

function Section44({ progress, setProgress }) {
  const p = { progress, setProgress };
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">4.4 Separating mixtures</div>
        <h1>Pure substances, mixtures and separation</h1>
        <p className="lead">Mixtures can be separated because their parts keep their own physical properties. Choosing a technique is all about matching it to a property.</p>
      </div>

      <DotPoint id="4.4.1" title="Atoms, elements, compounds and mixtures" {...p}>
        <ExamFocus tier="know" />
        <Recap>
          <ul>
            <li>An <Term def="The smallest particle of an element.">atom</Term> is the smallest particle of an element. A <Term def="Two or more atoms chemically joined together.">molecule</Term> is two or more atoms joined together.</li>
            <li><strong>Element:</strong> made of only one type of atom (e.g. copper, oxygen). All elements are listed on the periodic table.</li>
            <li><strong>Compound:</strong> two or more <em>different</em> types of atom chemically joined in a fixed ratio (e.g. water, H₂O; carbon dioxide, CO₂). It has new properties, and can only be split up by a chemical reaction.</li>
            <li><strong>Mixture:</strong> two or more substances mixed together but <em>not</em> chemically joined. Each part keeps its own properties, the amounts can vary, and the parts can be separated by physical methods.</li>
          </ul>
        </Recap>
        <Figure caption="Particle pictures of elements, a compound and a mixture.">
          <ParticleTypesFigure />
        </Figure>
        <WorkedExample title="Compound or mixture?"
          problem="Explain why carbon dioxide is a compound but air is a mixture. (2 marks)"
          steps={[
            "Carbon dioxide: every particle has carbon and oxygen atoms chemically joined in a fixed ratio (CO₂), so it is a compound.",
            "Air: nitrogen, oxygen, carbon dioxide and other gases are mixed but not joined to each other, and the amounts can vary, so it is a mixture.",
          ]}
          answer="Carbon dioxide is a compound because carbon and oxygen atoms are chemically joined in a fixed ratio. Air is a mixture because its gases are only mixed together, not chemically joined." />
        <Practice title="Elements, compounds and mixtures">
          <MCQ num={41} question="Which of these is a compound?"
            options={["Oxygen", "Copper", "Water", "Air"]}
            correct={2}
            explain="Water is made of hydrogen and oxygen atoms chemically joined (H₂O). Air contains oxygen and water vapour, but they are not joined, so air is a mixture." />
          <WrittenQ num={42} question="Iron filings and sulfur powder are stirred together, and a magnet can pull the iron out. After the mixture is heated strongly, a new black solid forms that is not attracted to a magnet. Explain which is the mixture and which is the compound. (2 marks)"
            model="Before heating it is a mixture: the iron and sulfur are not joined and the iron keeps its magnetic property, so a magnet separates it. After heating, the iron and sulfur atoms have chemically joined to form a compound (iron sulfide) with new properties, so it is no longer magnetic and cannot be separated with a magnet." />
        </Practice>
        <SelfCheck id="4.4.1" items={[
          "I can define atom, element, compound and mixture.",
          "I can explain the difference between a compound and a mixture.",
          "I can give examples of each.",
        ]} />
        <NotebookLink href={NB + "#4.4"} label="Learn it in full: 4.4 Separating Mixtures" />
      </DotPoint>

      <DotPoint id="4.4.2" title="Classifying matter: pure substances and mixtures" {...p}>
        <ExamFocus tier="know" />
        <Recap>
          <ul>
            <li>A <Term def="A substance made of only one kind of particle: an element or a compound.">pure substance</Term> contains only one kind of particle. Elements and compounds are pure substances. They have a fixed melting and boiling point.</li>
            <li>A <strong>mixture</strong> contains two or more kinds of particle. <strong>Homogeneous</strong> mixtures look the same all the way through (air, cordial). <strong>Heterogeneous</strong> mixtures have parts you can see (soil, fruit salad).</li>
            <li>Watch out: "pure" on a label (pure orange juice, pure spring water) means nothing added. To a scientist these are still mixtures.</li>
          </ul>
        </Recap>
        <Figure caption="Classifying matter.">
          <ClassifyTree />
        </Figure>
        <Practice title="Classifying matter">
          <MCQ num={43} question="Which of these is a pure substance?"
            options={["Orange juice", "Copper wire", "Milk", "Air"]}
            correct={1}
            explain="Copper wire is made of only copper atoms, so it is a pure element. Orange juice is sold as 'pure', but it contains water, sugars and many other substances, so it is a mixture." />
          <WrittenQ num={44} question="A bottle is labelled '100% pure spring water'. Explain why a scientist would say this water is not a pure substance. (2 marks)"
            model="A pure substance contains only one kind of particle. Spring water contains dissolved minerals (and gases) as well as water particles, so it is a mixture, not a pure substance. The label only means nothing has been added." />
        </Practice>
        <SelfCheck id="4.4.2" items={[
          "I can classify a substance as an element, compound or mixture.",
          "I can explain the difference between homogeneous and heterogeneous mixtures.",
          "I can explain why everyday 'pure' products are usually mixtures.",
        ]} />
        <NotebookLink href={NB + "#4.4"} label="Learn it in full: 4.4 Separating Mixtures" />
      </DotPoint>

      <DotPoint id="4.4.3" title="Using physical properties to separate mixtures" {...p}>
        <ExamFocus tier="core" />
        <Recap>
          <p style={{ marginTop: 0 }}>The parts of a mixture are not joined, so you can separate them using a <strong>physical property</strong> that is different for each part.</p>
          <div style={tableWrap}>
            <table className="data-table" style={{ fontSize: "0.88rem" }}>
              <thead><tr><th>Property that differs</th><th>Technique</th><th>Example</th></tr></thead>
              <tbody>
                <tr><td>Particle size</td><td>Sieving; filtration</td><td>Gravel from sand; sand from water</td></tr>
                <tr><td>Solubility</td><td>Dissolve one part, then filter; chromatography</td><td>Sugar from sand; dyes in ink</td></tr>
                <tr><td>Boiling point</td><td>Evaporation, crystallisation; distillation</td><td>Crystals from a solution; ethanol from water</td></tr>
                <tr><td>Magnetism</td><td>Magnetic separation</td><td>Steel cans from aluminium cans</td></tr>
                <tr><td>Density</td><td>Decanting, separating funnel, settling, flotation</td><td>Oil from water; gold panning</td></tr>
              </tbody>
            </table>
          </div>
          <ul>
            <li>Mixtures with three or more parts need several steps. Plan the order: usually remove the magnetic part or the big pieces first, then dissolve, filter and evaporate.</li>
            <li>Filtration cannot remove a dissolved solute: dissolved particles are small enough to pass through the holes in filter paper.</li>
          </ul>
        </Recap>
        <WorkedExample title="Separating a three-part mixture"
          problem="Describe how to separate a mixture of sand, iron filings and sugar, naming the property used in each step. (4 marks)"
          steps={[
            "Step 1, magnetism: run a magnet (wrapped in plastic) through the dry mixture. Only the iron filings are attracted, so they are removed.",
            "Step 2, solubility: add warm water and stir. The sugar dissolves; the sand is insoluble.",
            "Step 3, particle size: filter the mixture. The sand is the residue in the filter paper; the sugar solution passes through as the filtrate.",
            "Step 4, boiling point: gently heat the filtrate to evaporate some of the water, then leave it to cool so sugar crystals form (crystallisation).",
          ]}
          answer="Magnet (magnetism) → dissolve in water (solubility) → filter out the sand (particle size) → evaporate water from the filtrate and crystallise the sugar (boiling point)." />
        <WorkedExample title="Matching technique to property"
          problem="Choose a technique to separate (a) cooking oil from water and (b) ethanol (boils at 78 °C) from water (boils at 100 °C). Name the property each one uses. (4 marks)"
          steps={[
            "(a) Oil and water do not mix, and oil is less dense, so it floats on top. Use a separating funnel (or decant): drain off the water from the bottom. Property: density.",
            "(b) Ethanol and water mix completely, so they cannot be decanted. Ethanol has a lower boiling point, so heat the mixture: ethanol boils off first and is condensed and collected. Technique: distillation. Property: boiling point.",
          ]}
          answer="(a) Separating funnel or decanting, using density. (b) Distillation, using boiling point." />
        <ExamTip>
          In separation questions, marks usually come in pairs: <strong>name the technique AND the property it uses</strong>, and say which part ends up where (residue, filtrate, distillate).
        </ExamTip>
        <Practice title="Properties for separating">
          <MCQ num={45} question="At a recycling centre, a large electromagnet lifts steel cans away from aluminium cans. Which property is being used?"
            options={["Density", "Magnetism", "Boiling point", "Solubility"]}
            correct={1}
            explain="Steel contains iron, which is attracted to a magnet; aluminium is not. Density is a different property, used for things like floating and settling." />
          <MCQ num={46} question="A landscaper separates large pebbles from fine sand by shaking them in a sieve. Which property does this use?"
            options={["Particle size", "Solubility", "Magnetism", "Boiling point"]}
            correct={0}
            explain="A sieve lets small particles through its holes and holds back big ones, so it separates by particle size." />
          <MCQ num={47} question="Why can filtration NOT separate dissolved sugar from water?"
            options={["Sugar is magnetic", "Dissolved sugar particles are small enough to pass through the filter paper", "Sugar is denser than water", "Filter paper reacts with sugar"]}
            correct={1}
            explain="When sugar dissolves, it breaks up into tiny particles spread through the water, and they pass through the pores in the paper. To get the sugar back you need evaporation or crystallisation." />
          <MCQ num={48} question="Ethanol (boils at 78 °C) and water (boils at 100 °C) can be separated by distillation because they have different…"
            options={["densities", "particle sizes", "boiling points", "magnetic properties"]}
            correct={2}
            explain="Distillation works because one liquid boils off before the other. Ethanol and water do have different densities, but they mix completely, so density cannot be used to separate them." />
          <WrittenQ num={49} question="A bucket contains a mixture of gravel, sawdust and water. Describe how you could separate all three parts, naming the property used at each step. (3 marks)"
            model="1. Sawdust is less dense than water, so it floats: skim or scoop it off the surface (density). 2. Gravel is denser and sinks to the bottom, so carefully pour (decant) the water off the gravel (density). 3. Any gravel left with water can be poured through a sieve, which holds back the large gravel pieces and lets the water through (particle size)." />
          <WrittenQ num={50} question="Gold prospectors 'pan' for gold by swirling creek sand and water in a shallow pan. The sand washes out over the edge, and tiny flakes of gold are left behind. Explain which property makes this work. (2 marks)"
            model="Panning separates by density. Gold is much denser than sand, so the gold flakes sink to the bottom of the pan and stay there, while the lighter sand is carried over the edge by the swirling water." />
        </Practice>
        <SelfCheck id="4.4.3" items={[
          "I can match each separation technique to the physical property it uses.",
          "I can plan the steps to separate a mixture of three substances.",
          "I can explain why filtration does not remove a dissolved solute.",
          "I can choose between decanting and distillation for two liquids.",
        ]} />
        <NotebookLink href={NB + "#4.4"} label="Learn it in full: 4.4 Separating Mixtures" />
      </DotPoint>

      <DotPoint id="4.4.4" title="Common separation techniques" {...p}>
        <ExamFocus tier="important" />
        <Recap>
          <ul>
            <li><strong>Sieving:</strong> separates solids of different particle sizes. <strong>Decanting:</strong> carefully pouring off a liquid, leaving a heavier solid or liquid behind.</li>
            <li><strong>Filtration:</strong> separates an insoluble solid from a liquid. The solid caught in the paper is the <Term def="The solid left behind in the filter paper.">residue</Term>; the liquid that passes through is the <Term def="The liquid that passes through the filter paper.">filtrate</Term>.</li>
            <li><strong>Evaporation:</strong> heat a solution until all the solvent has gone, leaving the solid. <strong>Crystallisation:</strong> evaporate only some of the solvent, then let it cool slowly so larger crystals form.</li>
            <li><strong>Distillation:</strong> heat the mixture; the liquid with the lower boiling point turns to vapour, which is cooled in a condenser and collected as the <Term def="The liquid collected after distillation.">distillate</Term>. Use it when you want to keep the liquid.</li>
            <li><strong>Magnetic separation:</strong> a magnet removes iron, steel, nickel or cobalt. <strong>Chromatography:</strong> separates dyes in a mixture as a solvent soaks up paper; each dye travels a different distance.</li>
          </ul>
        </Recap>
        <Figure caption="Filtration separates an insoluble solid from a liquid.">
          <FiltrationFigure />
        </Figure>
        <Figure caption="Simple distillation. Cold water enters the condenser at the lower end.">
          <DistillationFigure />
        </Figure>
        <WorkedExample title="Reading a chromatogram"
          problem="A note was found written in black marker. Ink from the note and from three pens was spotted on a pencil line and the paper was stood in water. Use the chromatogram below to decide which pen wrote the note. Explain your answer. (2 marks)"
          steps={[
            "Look at the note: its ink separated into three dyes (blue, yellow and pink spots).",
            "Compare each pen: Pen A is missing the yellow dye; Pen C has a purple dye the note does not have.",
            "Pen B has the same three spots, at the same heights, as the note.",
          ]}
          answer="Pen B. Its ink separated into the same three dyes, travelling the same distances, as the ink from the note. Pens A and C have a different set of dyes." />
        <Figure caption="Chromatogram of the note and three pens.">
          <ChromatogramFigure />
        </Figure>
        <Practice title="Separation techniques">
          <MCQ num={51} question="Muddy creek water is poured through filter paper. What is the clear water that drips through called?"
            options={["The residue", "The filtrate", "The distillate", "The solute"]}
            correct={1}
            explain="The liquid that passes through filter paper is the filtrate. The mud caught in the paper is the residue." />
          <MCQ num={52} question="In paper chromatography, why is the start line drawn in pencil rather than in pen?"
            options={["Pencil is easier to see", "Pencil does not dissolve in the solvent, so it will not run up the paper", "Pen would make the solvent move faster", "Pencil absorbs the dyes"]}
            correct={1}
            explain="Graphite in pencil is insoluble, so it stays put. Ink from a pen would dissolve and separate into its own spots, which would confuse the results." />
          <MCQ num={53} question="Which technique is best for separating a dry mixture of rice grains and flour?"
            options={["Filtration", "Sieving", "Distillation", "Chromatography"]}
            correct={1}
            explain="Both are dry solids with very different particle sizes, so a sieve holds back the rice and lets the flour through. Filtration is for separating an insoluble solid from a liquid." />
          <WrittenQ num={54} question="Two groups start with the same alum solution. Group A heats theirs strongly until all of the water has gone. Group B heats theirs gently to remove only some of the water, then leaves it on a windowsill to cool slowly for three days. Compare the solids the two groups end up with, and explain why Group B's method gives larger crystals. (3 marks)"
            model="Group A used evaporation to dryness, so they get a crust of tiny crystals (almost a powder) stuck to the basin, and some may spit out or be overheated. Group B used crystallisation, so they get fewer, much larger, well-shaped crystals. As Group B's solution cools slowly, the solubility of alum falls gradually, so only a little solid comes out of solution at a time. The particles have time to join on to a few crystals that are already growing, in an orderly pattern, so those crystals get bigger. In Group A the water leaves quickly and many tiny crystals form all at once." />
        </Practice>
        <SelfCheck id="4.4.4" items={[
          "I can describe filtration, evaporation, crystallisation, distillation, decanting, sieving, magnetic separation and chromatography.",
          "I can label residue, filtrate and distillate on a diagram.",
          "I can explain the difference between evaporation and crystallisation.",
          "I can read a chromatogram to match an unknown ink.",
        ]} />
        <NotebookLink href={NB + "#4.4"} label="Learn it in full: 4.4 Separating Mixtures" />
      </DotPoint>

      <DotPoint id="4.4.6" title="An industrial separation technique" {...p}>
        <ExamFocus tier="know" />
        <Recap>
          <ul>
            <li><strong>Fractional distillation of crude oil:</strong> crude oil is a mixture of many substances. It is heated until most of it becomes vapour, which rises up a tall column that is hot at the bottom and cool at the top.</li>
            <li>Each substance condenses at the level where the column temperature falls below its boiling point. Substances with <strong>low boiling points</strong> (gases, petrol) rise to the <strong>top</strong>; substances with high boiling points (lubricating oil, bitumen) are collected near the bottom. Each group collected is called a <Term def="A group of substances with similar boiling points collected together.">fraction</Term>.</li>
            <li>Other industrial examples: <strong>wastewater treatment</strong> (screens sieve out rubbish, settling tanks let solids sink, sand filters, then bacteria break down waste); <strong>mineral flotation</strong> (crushed ore is mixed with water and bubbles; the valuable mineral sticks to the bubbles and floats off); <strong>desalination by reverse osmosis</strong> (water is pushed at high pressure through a membrane that holds back the dissolved salts).</li>
          </ul>
        </Recap>
        <Figure caption="Fractional distillation of crude oil.">
          <ColumnFigure />
        </Figure>
        <Practice title="Industrial separation">
          <MCQ num={55} question="In a fractionating column, where are the fractions with the LOWEST boiling points collected?"
            options={["At the bottom, where it is hottest", "In the middle", "At the top, where it is coolest", "They do not separate"]}
            correct={2}
            explain="Low-boiling-point substances stay as gas the longest, so they rise to the cool top before condensing. Bitumen, with a very high boiling point, is collected at the bottom." />
          <WrittenQ num={56} question="Name TWO separation techniques used at a wastewater treatment plant and state what each one removes. (2 marks)"
            model="1. Screening (a type of sieving): metal screens remove large objects such as rags, plastic and sticks. 2. Settling (sedimentation): in large tanks, heavy solids sink to the bottom as sludge and the water above is drawn off. (Filtration through sand and gravel removes fine particles.)" />
        </Practice>
        <SelfCheck id="4.4.6" items={[
          "I can describe how fractional distillation separates crude oil using boiling points.",
          "I can name a fraction collected at the top and at the bottom of the column.",
          "I can describe one other industrial separation, such as wastewater treatment.",
        ]} />
        <NotebookLink href={NB + "#4.4"} label="Learn it in full: 4.4 Separating Mixtures" />
      </DotPoint>
    </>
  );
}

/* ============================================================
   Mount
   ============================================================ */
mountTopicApp({
  year: 7,
  topicTitle: "Solutions and Mixtures",
  branch: "chemistry",
  heroImage: "img/hero.webp",
  strand: "Yearly Exam Revision · Stage 4",
  accent: "purple",
  storageKey: "y7.rev-solutions",
  hubHref: "../",
  intro: "Revise states of matter, density, solutions and separating mixtures, plus the investigating skills that go with them: variables, fair tests, tables and graphs. Each dot point has a short recap, a worked example, practice questions with model answers and a self-check.",
  glossary: {
    "boiling": "A change from liquid to gas throughout the whole liquid, at the boiling point.",
    "chromatography": "Separating the dyes in a mixture as a solvent soaks up paper; each dye travels a different distance.",
    "compound": "Two or more different types of atom chemically joined in a fixed ratio.",
    "concentrated": "A solution with a large amount of solute in the solvent.",
    "condensation": "A change from gas to liquid when a gas cools.",
    "controlled variable": "A variable kept the same so it cannot affect the result.",
    "crystallisation": "Evaporating some of the solvent and cooling slowly so crystals of the solute form.",
    "decanting": "Carefully pouring off a liquid to leave a solid or heavier liquid behind.",
    "density": "Mass per unit volume, ρ = m / V, in g/cm³.",
    "dependent variable": "The variable that is measured in an investigation.",
    "dilute": "A solution with a small amount of solute in the solvent.",
    "displacement method": "Finding the volume of an irregular object from the volume of water it pushes aside.",
    "distillation": "Boiling a mixture and condensing the vapour to collect the liquid with the lower boiling point.",
    "element": "A pure substance made of only one type of atom.",
    "evaporation": "A change from liquid to gas at the surface of a liquid; also a way to remove a solvent and leave the solid.",
    "fair test": "An investigation where only the independent variable is changed and all others are controlled.",
    "filtrate": "The liquid that passes through filter paper.",
    "filtration": "Separating an insoluble solid from a liquid with filter paper.",
    "independent variable": "The variable that is deliberately changed in an investigation.",
    "insoluble": "Not able to dissolve in a given solvent.",
    "line of best fit": "A straight line or smooth curve through the middle of plotted points, showing the trend.",
    "mixture": "Two or more substances mixed together but not chemically joined.",
    "outlier": "A result that does not fit the pattern of the other results.",
    "residue": "The solid left behind in the filter paper.",
    "saturated": "A solution in which no more solute will dissolve at that temperature.",
    "soluble": "Able to dissolve in a given solvent.",
    "solubility": "The maximum mass of solute that dissolves in a set amount of solvent (usually 100 g of water) at a set temperature.",
    "solute": "The substance that dissolves.",
    "solution": "A mixture in which a solute is spread evenly through a solvent.",
    "solvent": "The substance that the solute dissolves in.",
    "sublimation": "A change straight from solid to gas.",
    "suspension": "A cloudy mixture of insoluble particles in a liquid that settle over time.",
  },
  sections: [
    {
      id: "4.1", label: "States of matter", accent: "purple",
      blurb: "★★ The three states, the water cycle and changes of state explained with particles.",
      points: ["4.1.1", "4.1.3"],
      render: (p) => <Section41 {...p} />,
    },
    {
      id: "4.2", label: "Density", accent: "purple",
      blurb: "★★ Calculating density with ρ = m / V, including the displacement method.",
      points: ["4.2.3"],
      render: (p) => <Section42 {...p} />,
    },
    {
      id: "4.3", label: "Solubility and investigating", accent: "purple",
      blurb: "★★★ Solution words, measuring solubility, temperature effects, fair tests, tables and graphs.",
      points: ["4.3.1", "4.3.2", "4.3.3", "1.2.6", "1.2.8"],
      render: (p) => <Section43 {...p} />,
    },
    {
      id: "4.4", label: "Separating mixtures", accent: "purple",
      blurb: "★★★ Elements, compounds and mixtures, and the techniques used to separate them.",
      points: ["4.4.1", "4.4.2", "4.4.3", "4.4.4", "4.4.6"],
      render: (p) => <Section44 {...p} />,
    },
  ],
});
