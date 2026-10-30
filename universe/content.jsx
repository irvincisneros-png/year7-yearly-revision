/* global React, DotPoint, Callout, Figure, Term, MCQ, WrittenQ, QGroup, Interactive,
   Slider, SegToggle, Stat, Reveal, FlipCard, MatchBuckets, Ring, mountTopicApp,
   ExamFocus, Recap, ExamTip, WorkedExample, Practice, SelfCheck, NotebookLink */
const { useState } = React;

const NB = "https://irvincisneros-png.github.io/Year-7/observing-universe/";

/* ---------------------------------------------------------------------
   Moon drawing helper: the lit part of the Moon as seen from Australia.
   f = fraction of the visible disc that is lit (0 to 1).
   litLeft = true for a waxing Moon seen from the Southern Hemisphere.
   --------------------------------------------------------------------- */
const MOON_LIT = "#f3ead0";
const MOON_DARK = "#3a3f4b";
function moonLitPath(cx, cy, r, f, litLeft) {
  if (f <= 0.002) return null;
  if (f >= 0.998) return `M${cx},${cy - r} A${r},${r} 0 1 1 ${cx},${cy + r} A${r},${r} 0 1 1 ${cx},${cy - r} Z`;
  const rx = (r * Math.abs(1 - 2 * f)).toFixed(2);
  const crescent = f < 0.5;
  const outerSweep = litLeft ? 0 : 1;
  const termSweep = litLeft ? (crescent ? 1 : 0) : (crescent ? 0 : 1);
  return `M${cx},${cy - r} A${r},${r} 0 0 ${outerSweep} ${cx},${cy + r} A${rx},${r} 0 0 ${termSweep} ${cx},${cy - r} Z`;
}
function MoonDisc({ cx, cy, r, f, litLeft }) {
  const d = moonLitPath(cx, cy, r, f, litLeft);
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={MOON_DARK}/>
      {d && <path d={d} fill={MOON_LIT}/>}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--ink-muted)" strokeWidth="1.2"/>
    </g>
  );
}

/* ---------------------------------------------------------------------
   INTERACTIVE: Moon phase slider (view from Australia)
   --------------------------------------------------------------------- */
const CYCLE = 29.5;
function phaseName(day) {
  const d = ((day % CYCLE) + CYCLE) % CYCLE;
  if (d < 1.8 || d > CYCLE - 1.8) return "New Moon";
  if (d < 5.6) return "Waxing crescent";
  if (d < 9.2) return "First quarter";
  if (d < 13) return "Waxing gibbous";
  if (d < 16.6) return "Full Moon";
  if (d < 20.3) return "Waning gibbous";
  if (d < 23.9) return "Last quarter";
  return "Waning crescent";
}
function MoonPhaseSlider() {
  const [day, setDay] = useState(4);
  const theta = (day / CYCLE) * 2 * Math.PI;
  const f = (1 - Math.cos(theta)) / 2;
  const waxing = day <= CYCLE / 2;
  const name = phaseName(day);
  // top-down orbit view: Sun light comes from the left
  const ox = 230, oy = 80, orR = 52;
  const mx = ox - orR * Math.cos(theta), my = oy + orR * Math.sin(theta);
  return (
    <Interactive title="Moon phase explorer" subtitle="Drag the slider to move through one 29.5-day cycle. Left: what you see from Australia. Right: a simple top-down sketch of where the Moon is in its orbit."
      takeaway="Sunlight comes from one direction, but as the Moon orbits, we view its sunlit side from a changing angle. That angle sets the phase. From Australia, a waxing Moon is lit on the left and a waning Moon is lit on the right.">
      <svg viewBox="0 0 340 170" width="100%" style={{ maxWidth: 420, display: "block", margin: "0 auto" }} role="img"
        aria-label={`Day ${day.toFixed(1)} of the lunar cycle: ${name}. About ${Math.round(f * 100)} percent of the Moon's face is lit as seen from Earth.`}>
        {/* view from Australia */}
        <MoonDisc cx={80} cy={78} r={52} f={f} litLeft={waxing}/>
        <text x={80} y={150} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)">{name}</text>
        <text x={80} y={165} textAnchor="middle" fontSize="11" fill="var(--ink-muted)">seen from Australia</text>
        {/* orbit sketch */}
        <text x={170} y={14} fontSize="11" fill="var(--ink-muted)">sunlight →</text>
        <circle cx={ox} cy={oy} r={orR} fill="none" stroke="var(--ink-muted)" strokeDasharray="4,4"/>
        <circle cx={ox} cy={oy} r={11} fill="#4b7bc9" stroke="var(--ink)" strokeWidth="1"/>
        <path d={`M${ox},${oy - 11} A11,11 0 0 1 ${ox},${oy + 11} Z`} fill="#1e2a44"/>
        <text x={ox} y={oy + 26} textAnchor="middle" fontSize="11" fill="var(--ink)">Earth</text>
        <circle cx={mx} cy={my} r={7} fill={MOON_DARK} stroke="var(--ink-muted)"/>
        <path d={`M${mx},${my - 7} A7,7 0 0 0 ${mx},${my + 7} Z`} fill={MOON_LIT}/>
        <text x={ox} y={150} textAnchor="middle" fontSize="11" fill="var(--ink-muted)">orbit seen from above</text>
        <text x={ox} y={165} textAnchor="middle" fontSize="11" fill="var(--ink-muted)">(not to scale)</text>
      </svg>
      <Slider label="Day in the cycle" min={0} max={29.5} step={0.5} value={day} onChange={setDay} fmt={(v) => v.toFixed(1)} unit=" days"/>
    </Interactive>
  );
}

/* =====================================================================
   SECTION 1.1  Nature of science
   ===================================================================== */
function Section1({ progress, setProgress }) {
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">1.1 Nature of Science</div>
        <h1>Science is a team effort</h1>
        <p className="lead">Big discoveries are almost never made by one person working alone.</p>
      </div>

      <DotPoint id="1.1.3" title="Why scientific research is collaborative and builds on others' work" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="core"/>
        <Recap>
          <ul>
            <li><strong>Collaborative</strong> means scientists work together and share their methods, data and results with other scientists.</li>
            <li><strong>Why share and work together?</strong> Other scientists can check the work, spot mistakes, repeat it and build on it. Big problems also produce more data than one person could ever collect or analyse.</li>
            <li><strong>Building on others:</strong> scientific knowledge is <Term def="Each new discovery adds to what is already known.">cumulative</Term>. New ideas start from earlier observations, data and methods, and later scientists improve or correct them.</li>
            <li><Term def="Independent experts check a scientist's work before it is published.">Peer review</Term>: experts check methods and conclusions before work is published. Other scientists then try to <Term def="Repeat an investigation to see if they get the same results.">replicate</Term> it. This catches mistakes and makes results more reliable.</li>
            <li>Example: astronomer Edwin Hubble found galaxies moving apart using Henrietta Leavitt's method for measuring star distances and Vesto Slipher's galaxy speed measurements.</li>
            <li><strong>Common mistake:</strong> saying scientists collaborate "to get it done faster" only. Full marks need a reason <em>and</em> what it leads to (e.g. checking each other's work makes results more reliable).</li>
          </ul>
        </Recap>
        <WorkedExample
          title="Explaining why scientists share their data"
          problem={<>While the Human Genome Project (1990 to 2003) was reading the human DNA code, its labs agreed to put every new piece of DNA data online within 24 hours, free for any scientist to use. Explain how sharing data like this helps science. (3 marks)</>}
          steps={[
            "Identify what sharing does: scientists anywhere could see the data as soon as it was produced, instead of waiting years for the project to finish.",
            "Explain the first benefit: other researchers could check the data and find mistakes early, so errors were corrected before others relied on them.",
            "Link to building on work: other scientists used the shared data straight away to search for genes linked to diseases, so new discoveries were built on the project's work much sooner.",
          ]}
          answer="Sharing the data quickly meant scientists everywhere could use it straight away. Other researchers could check it and find mistakes early, which made the final data more reliable. They could also build on it, for example by searching for disease genes, so new discoveries came sooner than if each group had kept its data private."
        />
        <WorkedExample
          title="Showing how a discovery built on earlier work"
          problem={<>In 1953, James Watson and Francis Crick described the double-helix shape of DNA. Describe how their discovery built on the work of other scientists. (3 marks)</>}
          steps={[
            "Name the earlier work: Rosalind Franklin and Raymond Gosling made X-ray images of DNA showing it had a helix (spiral) shape.",
            "Name another source: Erwin Chargaff had measured that DNA always contains equal amounts of the bases A and T, and of C and G.",
            "Link it: Watson and Crick combined this existing evidence into one model. Without the earlier data, they could not have worked out the structure.",
          ]}
          answer="Watson and Crick used Franklin and Gosling's X-ray images, which showed DNA is a helix, and Chargaff's data showing DNA has equal amounts of A and T, and of C and G. They combined this earlier evidence to build their model, so their discovery depended on other scientists' work."
        />
        <ExamTip>
          <p><strong>Explain</strong> means give a reason <em>and</em> show how it leads to the result. A useful pattern for 3 marks: <em>reason</em> → <em>what working together does</em> → <em>why that makes the science better</em>. Always give a specific example if the question asks for one.</p>
        </ExamTip>
        <Practice title="Collaboration and building on others">
          <MCQ num={1} question="Before a new study about bird migration is published in a science journal, it is sent to other experts who check the methods and conclusions. What is this process called?"
            options={["Peer review", "Hypothesis testing", "A controlled experiment", "Data logging"]}
            correct={0}
            explain="Peer review is when independent experts check work before it is published. 'Hypothesis testing' is tempting, but that is what the original scientists do in their investigation, not the checking step before publishing." />
          <MCQ num={2} question="Two Australian doctors claimed that a type of bacteria causes most stomach ulcers. Many scientists at first did not believe them. What was the BEST way for the scientific community to decide if the claim was correct?"
            options={["Ask famous doctors for their opinion", "Wait until the two doctors retired", "Other teams repeat the investigations and see if they get the same results", "Count how many people believe the claim"]}
            correct={2}
            explain="When other teams replicate an investigation and get the same result, the evidence becomes reliable. Asking famous doctors is tempting, but opinions are not evidence. (Barry Marshall and Robin Warren's idea was confirmed this way and won a Nobel Prize in 2005.)" />
          <MCQ num={3} question="Which statement best describes how science builds on the work of others?"
            options={["Each scientist starts again from nothing so that old mistakes are avoided", "New research uses earlier data, methods and ideas, and may improve or correct them", "Once an idea is published, it can never be changed", "Scientists only use ideas from their own country"]}
            correct={1}
            explain="Science is cumulative: new work starts from what is already known and can refine or correct it. 'Never changed once published' is wrong because ideas are updated when new evidence appears." />
          <MCQ num={4} question="A scientist publishes a new method for counting bacteria in drinking water. Three other labs try the method and two of them get very different counts from the same samples. What should happen next?"
            options={["The method should be accepted because it was published first", "The method should be checked and improved before it is relied on, because its results could not be repeated", "The two labs should be ignored because they are in the minority", "The original scientist should stop publishing"]}
            correct={1}
            explain="A method is only reliable if other scientists can repeat it and get similar results. Here most labs could not, so the method needs checking and improving. 'Accepted because it was published first' is wrong: being first is not evidence that something works." />
          <WrittenQ num={5} question="In 1705, Edmond Halley studied written records of bright comets seen in 1531, 1607 and 1682. He predicted the same comet would return in 1758, and it did. Describe how Halley's work built on the work of others. (2 marks)"
            model="Halley used observations of comets recorded by earlier astronomers in 1531, 1607 and 1682. He noticed the gap between them was about 75 to 76 years, so he could predict the next return. Without other people's earlier records he could not have spotted the pattern or made the prediction." />
          <WrittenQ num={6} question="In 1989, two chemists announced that they had produced nuclear energy in a jar of water at room temperature ('cold fusion'). Laboratories around the world tried to repeat their experiment, but almost none could get the same result, and the idea was not accepted. Explain why scientists share their methods and repeat each other's work, using this example. (3 marks)"
            model="Scientists share their methods so that other scientists can repeat (replicate) an experiment and check whether they get the same results. In the cold fusion example, other laboratories followed the published method but could not produce the same energy, which suggested the original result was caused by an error in the measurements. Because the result could not be replicated, it was not accepted, so sharing and repeating work stops mistakes from becoming part of scientific knowledge and makes accepted results more reliable." />
        </Practice>
        <SelfCheck id="1.1.3" items={[
          "I can give two reasons why scientists share their methods and data and check each other's work.",
          "I can explain what peer review is and why it makes results more reliable.",
          "I can describe one example of a discovery that built on earlier scientists' work.",
          "I can write a 3-mark 'explain' answer with a reason, an effect and a link.",
        ]}/>
        <NotebookLink href={NB + "#1.1"} label="Learn it in full: Nature of Science"/>
      </DotPoint>
    </>
  );
}

/* =====================================================================
   SECTION 1.2  Practice of science
   ===================================================================== */
function ScaleFigure() {
  // Semicircular tyre-pressure gauge: 0 to 300 kPa, labelled every 100 kPa, 10 small spaces between labels.
  const cx = 170, cy = 150, R = 112;
  const pt = (v, r) => {
    const a = Math.PI * (1 - v / 300);
    return [cx + r * Math.cos(a), cy - r * Math.sin(a)];
  };
  const ticks = [];
  for (let v = 0; v <= 300; v += 10) {
    const len = v % 100 === 0 ? 18 : v % 50 === 0 ? 13 : 8;
    const [x1, y1] = pt(v, R);
    const [x2, y2] = pt(v, R - len);
    ticks.push(<line key={v} x1={x1.toFixed(1)} y1={y1.toFixed(1)} x2={x2.toFixed(1)} y2={y2.toFixed(1)} stroke="var(--ink)" strokeWidth={v % 100 === 0 ? 2 : 1.1}/>);
  }
  const [px, py] = pt(240, R - 22);
  return (
    <Figure caption="Reading an analog dial. Find the value of one small space first.">
      <svg viewBox="0 0 340 200" width="100%" style={{ maxWidth: 440 }} role="img" aria-label="A semicircular tyre-pressure gauge reading from 0 to 300 kilopascals. Labels are every 100 kilopascals with 10 small spaces between labels, so each space is worth 10 kilopascals. The needle is 4 spaces past 200, so the reading is 240 kilopascals.">
        <path d={`M${cx - R - 8},${cy + 4} L${cx - R - 8},${cy} A${R + 8},${R + 8} 0 0 1 ${cx + R + 8},${cy} L${cx + R + 8},${cy + 4}`} fill="var(--card)" stroke="var(--ink-muted)"/>
        {ticks}
        {[0, 100, 200, 300].map(v => {
          const [x, y] = pt(v, R - 34);
          const dy = v === 0 || v === 300 ? -6 : 5;
          return <text key={v} x={x.toFixed(1)} y={(y + dy).toFixed(1)} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)">{v}</text>;
        })}
        <text x={cx} y={cy - 40} textAnchor="middle" fontSize="11" fill="var(--ink-muted)">tyre pressure (kPa)</text>
        <line x1={cx} y1={cy} x2={px.toFixed(1)} y2={py.toFixed(1)} stroke="var(--accent)" strokeWidth="3" strokeLinecap="round"/>
        <circle cx={cx} cy={cy} r={6} fill="var(--ink)"/>
        <text x={cx} y={174} textAnchor="middle" fontSize="12" fill="var(--ink)">10 spaces between labels: 100 ÷ 10 = 10 kPa per space</text>
        <text x={cx} y={194} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ink)">200 kPa + 4 spaces × 10 kPa = 240 kPa</text>
      </svg>
    </Figure>
  );
}

function OIPFigure() {
  const boxes = [
    { t: "Observation", a: "what you detect", b: "with senses or tools" },
    { t: "Inference", a: "an explanation", b: "of what you saw" },
    { t: "Prediction", a: "what should happen", b: "if it is right" },
  ];
  return (
    <Figure caption="An inference goes beyond what you saw. A testable prediction lets you check the inference.">
      <svg viewBox="0 0 340 92" width="100%" style={{ maxWidth: 460 }} role="img" aria-label="Three boxes linked by arrows: Observation (what you detect with senses or tools), then Inference (an explanation of what you saw), then Testable prediction (what should happen if the inference is right).">
        <defs>
          <marker id="oipArr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="var(--ink-muted)"/></marker>
        </defs>
        {boxes.map((b, i) => (
          <g key={b.t} transform={`translate(${4 + i * 116}, 8)`}>
            <rect width={100} height={76} rx={10} fill="var(--card)" stroke="var(--accent-deep)" strokeWidth="1.5"/>
            <text x={50} y={24} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ink)">{b.t}</text>
            <text x={50} y={46} textAnchor="middle" fontSize="10" fill="var(--ink)">{b.a}</text>
            <text x={50} y={60} textAnchor="middle" fontSize="10" fill="var(--ink)">{b.b}</text>
            {i < 2 && <line x1={102} y1={38} x2={114} y2={38} stroke="var(--ink-muted)" strokeWidth="1.5" markerEnd="url(#oipArr)"/>}
          </g>
        ))}
      </svg>
    </Figure>
  );
}

function Section2({ progress, setProgress }) {
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">1.2 Practice of Science</div>
        <h1>Measuring and thinking like a scientist</h1>
        <p className="lead">Choosing the right instrument, reading it properly, and knowing the difference between what you see and what you work out.</p>
      </div>

      <DotPoint id="1.2.2" title="Analog and digital measuring devices: range, sensitivity and accuracy" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="important"/>
        <Recap>
          <ul>
            <li><Term def="Shows a reading with a pointer or a level against a scale.">Analog</Term> devices show the reading on a scale (ruler, kitchen dial, stopwatch with hands). <Term def="Shows the reading as numbers on a screen.">Digital</Term> devices show numbers on a screen (digital scales, digital stopwatch).</li>
            <li><strong>Range</strong>: the smallest to largest value the device can measure (e.g. 0 to 500 g).</li>
            <li><strong>Sensitivity</strong>: the smallest change the device can detect (e.g. a ruler marked in mm detects 1 mm changes).</li>
            <li><strong>Accuracy</strong>: how close a reading is to the true value. A device can be sensitive but inaccurate if it is not zeroed or calibrated.</li>
            <li><strong>Reading a scale</strong>: (1) take two labelled marks, (2) count the spaces between them, (3) divide the difference by the number of spaces to get the value of one space. Read with your eye level with the mark to avoid <Term def="An error caused by looking at a scale from an angle instead of straight on.">parallax error</Term>.</li>
            <li>Digital devices avoid reading errors, but they still need checking (flat batteries, not zeroed). Always write the <strong>unit</strong>.</li>
          </ul>
        </Recap>
        <ScaleFigure/>
        <WorkedExample
          title="Reading a dial and choosing a device"
          problem={<>An analog kitchen scale is labelled every 100 g, with 4 small spaces between each label. The pointer is 2 small spaces past the 300 g label. (a) What is the reading? (b) A recipe needs exactly 15 g of yeast. Is this scale sensitive enough? Explain.</>}
          steps={[
            "Value of one space: 100 g ÷ 4 spaces = 25 g per space.",
            "Reading: 300 g + 2 × 25 g = 350 g.",
            "Sensitivity: the smallest change this scale shows is 25 g, which is bigger than 15 g.",
            "So it cannot measure 15 g accurately. A digital scale reading to 1 g would be a better choice.",
          ]}
          answer="(a) 350 g. (b) No. Each space is 25 g, so the scale is not sensitive enough to measure 15 g. A digital scale that reads to 1 g should be used."
        />
        <ExamTip>
          <p>If a question asks you to <strong>read a scale</strong>, write down the value of one space before your answer. It earns working marks even if you misread the pointer.</p>
        </ExamTip>
        <Practice title="Measuring devices">
          <MCQ num={7} question="A ruler is labelled every 1 cm with 10 small spaces between each label. A pencil ends 4 small spaces past the 7 cm mark. How long is the pencil?"
            options={["7.4 cm", "7.04 cm", "11 cm", "74 cm"]}
            correct={0}
            explain="Each small space is 1 cm ÷ 10 = 0.1 cm (1 mm). So 7 cm + 4 × 0.1 cm = 7.4 cm (74 mm). 7.04 cm is tempting, but that would mean each space was only 0.01 cm." />
          <MCQ num={8} question="Mia needs to weigh a 2 kg bag of potatoes. She has an analog scale with a range of 0 to 500 g that is marked every 5 g. What is the main problem?"
            options={["The scale is not sensitive enough", "The scale is digital", "The mass is outside the scale's range", "The scale gives readings in grams"]}
            correct={2}
            explain="2 kg = 2000 g, which is larger than the maximum of 500 g, so it is outside the range. Sensitivity is not the problem here: 5 g steps are fine for a 2 kg bag." />
          <MCQ num={9} question="A digital bathroom scale shows 0.8 kg when nobody is standing on it. Lucas then stands on it and it reads 45.8 kg. Which statement is correct?"
            options={["The reading is accurate because it is digital", "The scale is not zeroed, so the reading is not accurate; Lucas's true mass is about 45.0 kg", "The scale is not sensitive enough to weigh a person", "The scale's range is too small"]}
            correct={1}
            explain="A device that does not read zero with nothing on it has a zero error, so every reading is 0.8 kg too high: 45.8 − 0.8 = 45.0 kg. Being digital does not guarantee accuracy." />
          <WrittenQ num={10} question="Compare an analog stopwatch (with hands) and a digital stopwatch that reads to 0.01 s for timing a 100 m race. Refer to sensitivity and accuracy. (3 marks)"
            model="The digital stopwatch is more sensitive because it shows changes of 0.01 s, while an analog stopwatch with hands can usually only be read to about 0.1 to 0.2 s. The digital stopwatch also avoids errors from reading a scale at an angle (parallax), so its readings are likely to be closer to the true time. However, both are affected by the person's reaction time when pressing start and stop, so neither is perfectly accurate." />
        </Practice>
        <SelfCheck id="1.2.2" items={[
          "I can define range, sensitivity and accuracy.",
          "I can work out the value of one small space on any scale and read it.",
          "I can choose a suitable device for a measurement and explain why.",
          "I can explain why a digital reading is not always accurate.",
        ]}/>
        <NotebookLink href={NB + "#1.2"} label="Learn it in full: Practice of Science"/>
      </DotPoint>

      <DotPoint id="1.2.4" title="Using observations to make inferences and testable predictions" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="important"/>
        <Recap>
          <ul>
            <li>An <Term def="Something you detect directly with your senses or an instrument.">observation</Term> is what you actually see, hear, measure or detect. It is a fact you could record.</li>
            <li>An <Term def="An explanation or conclusion worked out from observations.">inference</Term> is an explanation you work out from observations. It goes beyond what you saw and could be wrong.</li>
            <li>A <Term def="A statement of what should happen if an inference is correct, which can be checked.">testable prediction</Term> says what you would expect to observe next if your inference is correct, in a way that can be checked.</li>
            <li>Good predictions are specific ("if…, then…") and can be shown wrong. If the prediction fails, the inference must be changed.</li>
            <li><strong>Common mistake:</strong> writing an inference as if it were an observation, e.g. "I observed that a meteorite made the crater." You observed the crater; the meteorite is an inference.</li>
          </ul>
        </Recap>
        <OIPFigure/>
        <WorkedExample
          title="From observation to prediction"
          problem={<>Photos from orbiting spacecraft show long, winding channels on the surface of Mars that look like dry riverbeds. Write an observation, an inference and a testable prediction.</>}
          steps={[
            "Observation (only what is seen): Mars has long, winding channels on its surface.",
            "Inference (an explanation): liquid water probably flowed on Mars long ago and carved the channels.",
            "Testable prediction (if…then…): if water once flowed there, then rocks in and near the channels should contain minerals and rounded pebbles that only form in water.",
            "How it is tested: a rover can drill and analyse rocks in a channel. (Rovers have found such minerals, supporting the inference.)",
          ]}
          answer="Observation: winding channels on Mars. Inference: water once flowed and carved them. Prediction: rocks in the channels will contain minerals and rounded pebbles that form in water, which a rover can check."
        />
        <Practice title="Observation, inference, prediction">
          <WrittenQ num={11} question="Grace writes these notes after looking at Saturn through a school telescope: (A) 'Saturn looks pale yellow.' (B) 'The rings are made of ice.' (C) 'There is a dark gap in the rings.' (D) 'Saturn must be very cold because it is far from the Sun.' Sort the notes into observations and inferences, and give a reason for one of the inferences. (2 marks)"
            model="Observations: A and C, because Grace could see the colour and the gap directly through the telescope. Inferences: B and D. For example, D is an inference because she cannot measure Saturn's temperature through a telescope; she has worked it out from the idea that places far from the Sun get less sunlight." />
          <MCQ num={12} question="Zoe infers that the snails in her garden only come out when it is dark. Which is the best TESTABLE prediction based on her inference?"
            options={["Snails are interesting animals", "If I count snails in the same garden bed every hour for one day, I will see more snails at night than in the daytime", "Snails probably dislike the Sun", "Snails might come out sometimes"]}
            correct={1}
            explain="A testable prediction is specific and can be checked by measuring something, and this one says exactly what to count and when. 'Snails probably dislike the Sun' is tempting, but it is another inference, not something you can directly check." />
          <MCQ num={13} question="In the 'Observations' column of his results table, Kai wrote: 'The bread went mouldy because the cupboard was warm.' What is the best way to fix his entry?"
            options={["Leave it, because it describes what happened to the bread", "Keep only 'green, fuzzy spots grew on the bread' as the observation, and move the 'because' part to his conclusion as an inference", "Replace it with 'The bread was probably old'", "Move the whole sentence to the 'Prediction' column"]}
            correct={1}
            explain="The spots can be seen, so they belong in the observations. The reason (a warm cupboard) is an explanation Kai worked out, so it is an inference and belongs in his conclusion. Leaving it in is tempting because it does describe the bread, but it mixes an inference into an observation." />
          <WrittenQ num={14} question="Every evening for two weeks, Noah sees that the tail of a comet points away from the Sun, no matter which way the comet is moving. Write one inference and one testable prediction based on this observation. (2 marks)"
            model="Inference: something coming from the Sun (such as sunlight or a stream of particles) pushes the comet's dust and gas away from the Sun. Testable prediction: if this is correct, then when the comet moves around the Sun and starts travelling away from it, its tail will still point away from the Sun, ahead of the comet." />
        </Practice>
        <SelfCheck id="1.2.4" items={[
          "I can tell the difference between an observation and an inference.",
          "I can write a testable prediction using 'if… then…'.",
          "I can explain what scientists do if a prediction turns out to be wrong.",
        ]}/>
        <NotebookLink href={NB + "#1.2"} label="Learn it in full: Practice of Science"/>
      </DotPoint>
    </>
  );
}

/* =====================================================================
   SECTION 1.3  Space science
   ===================================================================== */
function ModelsFigure() {
  const orbit = (cx, cy, r) => <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--ink-muted)" strokeWidth="1" strokeDasharray="3,3"/>;
  const label = (x, y, t, anchor = "middle") => <text x={x} y={y} textAnchor={anchor} fontSize="10" fill="var(--ink)">{t}</text>;
  return (
    <Figure caption="Left: the old Earth-centred model. Right: the Sun-centred model we use today (inner planets only, not to scale).">
      <svg viewBox="0 0 340 196" width="100%" style={{ maxWidth: 460 }} role="img" aria-label="Two models side by side. The geocentric model has Earth in the centre with the Moon, the Sun and Mars orbiting it. The heliocentric model has the Sun in the centre with Mercury, Venus, Earth and Mars orbiting it, and the Moon orbiting Earth.">
        {/* geocentric */}
        <text x={85} y={14} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ink)">Geocentric</text>
        {orbit(85, 100, 22)}{orbit(85, 100, 46)}{orbit(85, 100, 70)}
        <circle cx={85} cy={100} r={9} fill="#4b7bc9" stroke="var(--ink)"/>
        {label(85, 124, "Earth")}
        <circle cx={107} cy={100} r={4} fill="#c9c4b5" stroke="var(--ink)"/>
        {label(113, 92, "Moon", "start")}
        <circle cx={52} cy={67} r={11} fill="#f7b731" stroke="#b7791f"/>
        {label(52, 89, "Sun")}
        <circle cx={85} cy={30} r={5} fill="#c0533a" stroke="var(--ink)"/>
        {label(96, 34, "Mars", "start")}
        {/* heliocentric */}
        <text x={255} y={14} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ink)">Heliocentric</text>
        {orbit(255, 100, 20)}{orbit(255, 100, 36)}{orbit(255, 100, 54)}{orbit(255, 100, 74)}
        <circle cx={255} cy={100} r={11} fill="#f7b731" stroke="#b7791f"/>
        <circle cx={275} cy={100} r={3} fill="#9a9488" stroke="var(--ink)"/>
        <circle cx={230} cy={74} r={4} fill="#e0b56a" stroke="var(--ink)"/>
        {label(222, 71, "Venus", "end")}
        <circle cx={255} cy={154} r={6} fill="#4b7bc9" stroke="var(--ink)"/>
        <circle cx={266} cy={160} r={2.5} fill="#c9c4b5" stroke="var(--ink)"/>
        {label(255, 172, "Earth + Moon")}
        <circle cx={305} cy={47} r={5} fill="#c0533a" stroke="var(--ink)"/>
        {label(312, 42, "Mars", "start")}
        {label(255, 124, "Sun")}
        <text x={170} y={192} textAnchor="middle" fontSize="10" fontStyle="italic" fill="var(--ink-muted)">Mercury is the small dot closest to the Sun.</text>
      </svg>
    </Figure>
  );
}

function SunAngleFigure() {
  return (
    <Figure caption="The same beam of sunlight covers a small area when the Sun is high (summer) and a large area when the Sun is low (winter).">
      <svg viewBox="0 0 340 170" width="100%" style={{ maxWidth: 460 }} role="img" aria-label="Two panels. Summer: sunlight arrives steeply and the beam lands on a short stretch of ground, so energy is concentrated. Winter: the same width of beam arrives at a low angle and spreads over a much longer stretch of ground, so each square metre gets less energy.">
        {/* summer: steep beam */}
        <text x={80} y={14} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ink)">Summer: Sun high</text>
        <polygon points="62,24 98,24 98,128 62,128" fill="#f7b731" opacity="0.45"/>
        {[66, 80, 94].map(x => <line key={x} x1={x} y1={26} x2={x} y2={124} stroke="#d99e1e" strokeWidth="2"/>)}
        <line x1={10} y1={130} x2={150} y2={130} stroke="var(--ink)" strokeWidth="2"/>
        <line x1={62} y1={138} x2={98} y2={138} stroke="var(--accent-deep)" strokeWidth="3"/>
        <text x={80} y={154} textAnchor="middle" fontSize="11" fill="var(--ink)">small area</text>
        <text x={80} y={167} textAnchor="middle" fontSize="11" fill="var(--ink)">more heating</text>
        {/* winter: low beam, same width 36 measured perpendicular */}
        <text x={255} y={14} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ink)">Winter: Sun low</text>
        <polygon points="185.6,104.6 200.8,72 325,130 240,130" fill="#f7b731" opacity="0.45"/>
        <line x1={185.6} y1={104.6} x2={240} y2={130} stroke="#d99e1e" strokeWidth="2"/>
        <line x1={193.2} y1={88.3} x2={282.5} y2={130} stroke="#d99e1e" strokeWidth="2"/>
        <line x1={200.8} y1={72} x2={325} y2={130} stroke="#d99e1e" strokeWidth="2"/>
        <line x1={180} y1={130} x2={334} y2={130} stroke="var(--ink)" strokeWidth="2"/>
        <line x1={240} y1={138} x2={325} y2={138} stroke="var(--accent-deep)" strokeWidth="3"/>
        <text x={282} y={154} textAnchor="middle" fontSize="11" fill="var(--ink)">large area</text>
        <text x={282} y={167} textAnchor="middle" fontSize="11" fill="var(--ink)">less heating</text>
      </svg>
    </Figure>
  );
}

function TidesFigure() {
  return (
    <Figure caption="The Moon's gravity makes two bulges of ocean water. Places in a bulge have high tide (not to scale).">
      <svg viewBox="0 0 340 170" width="100%" style={{ maxWidth: 440 }} role="img" aria-label="Earth seen from above with an oval of ocean water stretched along the line towards the Moon. The two ends of the oval, nearest to and furthest from the Moon, are high tide. The sides at right angles are low tide. The Moon is shown to the right.">
        <ellipse cx={120} cy={85} rx={92} ry={56} fill="#7fb3e6" opacity="0.55" stroke="#4b7bc9"/>
        <circle cx={120} cy={85} r={50} fill="#4f8a52" stroke="var(--ink)"/>
        <text x={120} y={89} textAnchor="middle" fontSize="12" fontWeight="700" fill="#ffffff">Earth</text>
        <text x={210} y={30} textAnchor="middle" fontSize="11" fill="var(--ink)">high tide</text>
        <text x={30} y={30} textAnchor="middle" fontSize="11" fill="var(--ink)">high tide</text>
        <line x1={30} y1={36} x2={31} y2={76} stroke="var(--ink-muted)"/>
        <line x1={210} y1={36} x2={209} y2={76} stroke="var(--ink-muted)"/>
        <text x={120} y={22} textAnchor="middle" fontSize="11" fill="var(--ink)">low tide</text>
        <text x={120} y={158} textAnchor="middle" fontSize="11" fill="var(--ink)">low tide</text>
        <circle cx={305} cy={85} r={14} fill="#c9c4b5" stroke="var(--ink)"/>
        <text x={305} y={114} textAnchor="middle" fontSize="11" fill="var(--ink)">Moon</text>
        <line x1={232} y1={85} x2={286} y2={85} stroke="var(--ink-muted)" strokeDasharray="4,3"/>
        <text x={259} y={78} textAnchor="middle" fontSize="10" fill="var(--ink-muted)">gravity</text>
      </svg>
    </Figure>
  );
}

function PhasesFigure() {
  const phases = [
    { n: "New", f: 0, left: true },
    { n: "Waxing crescent", f: 0.2, left: true },
    { n: "First quarter", f: 0.5, left: true },
    { n: "Waxing gibbous", f: 0.8, left: true },
    { n: "Full", f: 1, left: true },
    { n: "Waning gibbous", f: 0.8, left: false },
    { n: "Last quarter", f: 0.5, left: false },
    { n: "Waning crescent", f: 0.2, left: false },
  ];
  return (
    <Figure caption="The Moon's phases in order, as seen from Australia. One full cycle takes about 29.5 days.">
      <svg viewBox="0 0 340 196" width="100%" style={{ maxWidth: 460 }} role="img" aria-label="Eight Moon phases in two rows as seen from the Southern Hemisphere. Top row: new Moon (dark), waxing crescent lit on the left, first quarter with the left half lit, waxing gibbous mostly lit on the left. Bottom row: full Moon, waning gibbous mostly lit on the right, last quarter with the right half lit, waning crescent lit on the right.">
        {phases.map((p, i) => {
          const col = i % 4, row = Math.floor(i / 4);
          const cx = 42 + col * 85, cy = 34 + row * 96;
          const words = p.n.split(" ");
          return (
            <g key={p.n}>
              <MoonDisc cx={cx} cy={cy} r={24} f={p.f} litLeft={p.left}/>
              <text x={cx} y={cy + 40} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--ink)">{words[0]}</text>
              {words[1] && <text x={cx} y={cy + 53} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--ink)">{words[1]}</text>}
            </g>
          );
        })}
      </svg>
    </Figure>
  );
}

function EclipseFigure() {
  return (
    <Figure caption="Eclipses happen when the Sun, Earth and Moon line up exactly. Here each line-up is drawn top to bottom, with sunlight coming down from the Sun (not to scale).">
      <svg viewBox="0 0 360 300" width="100%" style={{ maxWidth: 420 }} role="img" aria-label="Two vertical line-ups with the Sun at the top. Solar eclipse at new Moon: Sun at the top, Moon in the middle, Earth at the bottom; the Moon's narrow shadow reaches only a small part of Earth. Lunar eclipse at full Moon: Sun at the top, Earth in the middle, Moon at the bottom; Earth's wide shadow covers the whole Moon.">
        <line x1={180} y1={8} x2={180} y2={292} stroke="var(--ink-muted)" strokeDasharray="3 4" opacity="0.5"/>
        {/* solar: Sun / Moon / Earth */}
        <text x={90} y={16} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ink)">Solar eclipse</text>
        <text x={90} y={30} textAnchor="middle" fontSize="11" fill="var(--ink-muted)">(new Moon)</text>
        <circle cx={90} cy={66} r={24} fill="#f7b731" stroke="#b7791f"/>
        <text x={122} y={70} fontSize="11" fill="var(--ink)">Sun</text>
        <polygon points="84,150 96,150 92,232 88,232" fill="var(--ink-muted)" opacity="0.55"/>
        <circle cx={90} cy={150} r={6} fill="#c9c4b5" stroke="var(--ink)"/>
        <text x={102} y={154} fontSize="11" fill="var(--ink)">Moon</text>
        <text x={80} y={196} textAnchor="end" fontSize="10" fill="var(--ink-muted)"><tspan x={80}>Moon's</tspan><tspan x={80} dy="12">shadow</tspan></text>
        <circle cx={90} cy={250} r={18} fill="#4b7bc9" stroke="var(--ink)"/>
        <circle cx={90} cy={234} r={2.5} fill="#1b2a44"/>
        <text x={90} y={286} textAnchor="middle" fontSize="11" fill="var(--ink)">Earth</text>
        {/* lunar: Sun / Earth / Moon */}
        <text x={270} y={16} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ink)">Lunar eclipse</text>
        <text x={270} y={30} textAnchor="middle" fontSize="11" fill="var(--ink-muted)">(full Moon)</text>
        <circle cx={270} cy={66} r={24} fill="#f7b731" stroke="#b7791f"/>
        <text x={302} y={70} fontSize="11" fill="var(--ink)">Sun</text>
        <polygon points="254,150 286,150 280,262 260,262" fill="var(--ink-muted)" opacity="0.55"/>
        <circle cx={270} cy={150} r={16} fill="#4b7bc9" stroke="var(--ink)"/>
        <text x={292} y={154} fontSize="11" fill="var(--ink)">Earth</text>
        <text x={290} y={196} fontSize="10" fill="var(--ink-muted)"><tspan x={290}>Earth's</tspan><tspan x={290} dy="12">shadow</tspan></text>
        <circle cx={270} cy={245} r={6} fill="#b5503a" stroke="var(--ink)"/>
        <text x={270} y={286} textAnchor="middle" fontSize="11" fill="var(--ink)">Moon</text>
      </svg>
    </Figure>
  );
}

function Section3({ progress, setProgress }) {
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">1.3 Space Science</div>
        <h1>The Sun, Earth and Moon</h1>
        <p className="lead">How our model of the solar system changed, and how the positions of the Sun, Earth and Moon explain what we see in the sky.</p>
      </div>

      <DotPoint id="1.3.1" title="Historical and current models of the solar system" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="important"/>
        <Recap>
          <ul>
            <li>A scientific <Term def="A simplified representation that helps explain or predict how something works.">model</Term> is a simplified way of showing how something works. Models are kept while they fit the evidence and are <strong>changed or rejected</strong> when new evidence does not fit.</li>
            <li><Term def="Earth-centred model: the Sun, Moon, planets and stars all orbit Earth.">Geocentric model</Term> (Ptolemy, about 150 CE): Earth at the centre, everything orbits it. It matched everyday experience (the sky seems to turn around us), but needed extra small circles called <Term def="Small circles added to planets' paths in the geocentric model to explain why planets sometimes seem to move backwards.">epicycles</Term> to explain planets that sometimes appear to move backwards.</li>
            <li><Term def="Sun-centred model: Earth and the other planets orbit the Sun.">Heliocentric model</Term> (Copernicus, 1543): the Sun at the centre, Earth is a planet that orbits it and spins on its axis.</li>
            <li><strong>New evidence from telescopes</strong> (Galileo, 1610): moons orbiting Jupiter showed not everything orbits Earth; Venus shows a full set of phases, which only works if Venus orbits the Sun.</li>
            <li>Today's model: eight planets orbit the Sun in slightly oval paths, held by gravity. Even this keeps changing: in 2006 Pluto was reclassified as a dwarf planet after similar-sized objects were found beyond Neptune.</li>
          </ul>
        </Recap>
        <ModelsFigure/>
        <WorkedExample
          title="How evidence led to a model being rejected"
          problem={<>Explain how Galileo's observation of the phases of Venus was evidence against the geocentric model. (3 marks)</>}
          steps={[
            "State the observation: through a telescope, Galileo saw Venus go through a full set of phases, from crescent to nearly full, and change size.",
            "Link to the model: in the geocentric model Venus stays between Earth and the Sun, so we would only ever see its mostly dark side (crescent or new phases).",
            "Draw the conclusion: a full set of phases only happens if Venus sometimes goes behind the Sun, which means Venus orbits the Sun. The geocentric model could not explain this, so the evidence supported the heliocentric model.",
          ]}
          answer="Galileo saw Venus show a full set of phases. In the geocentric model Venus could only appear as a crescent, so this observation did not fit. A full set of phases means Venus orbits the Sun, supporting the heliocentric model and helping lead to the geocentric model being rejected."
        />
        <Practice title="Models of the solar system">
          <MCQ num={15} question="Why did the geocentric model seem sensible to people for a very long time?"
            options={["It was based on telescope observations", "From the ground, the Sun, Moon and stars appear to move across the sky around a still Earth", "It explained the phases of Venus", "It placed the Sun at the centre"]}
            correct={1}
            explain="Without telescopes, people saw the sky appear to move while Earth felt still. 'Based on telescope observations' is wrong: the model is about 1,500 years older than the telescope, and telescope evidence helped overturn it." />
          <MCQ num={16} question="In 2006, astronomers reclassified Pluto from a planet to a dwarf planet. What does this show about scientific models?"
            options={["Scientists make mistakes, so models cannot be trusted", "Models are changed when new evidence is found", "Pluto has moved further from the Sun", "Models only change when a famous scientist says so"]}
            correct={1}
            explain="New evidence (many other icy objects of similar size were found beyond Neptune) meant the model of what counts as a planet was updated. This is a strength of science, not a reason to distrust it." />
          <MCQ num={17} question="Which observation would be hardest to explain using the geocentric model?"
            options={["The Sun rises in the east", "Stars appear to move across the night sky", "Four moons orbiting Jupiter", "The Moon crosses the sky each night"]}
            correct={2}
            explain="The geocentric model said everything orbits Earth, so moons circling Jupiter did not fit. The Sun rising and stars moving are easily explained by both models, because both describe what we see from the ground." />
          <WrittenQ num={18} question="Using an example, describe how a scientific model of the solar system has been modified or rejected because of new evidence. (3 marks)"
            model="The geocentric model put Earth at the centre with everything orbiting it. When Galileo used a telescope in 1610, he saw moons orbiting Jupiter, which showed that not everything orbits Earth. Because this new evidence did not fit, the geocentric model was eventually rejected and replaced by the heliocentric model, with the Sun at the centre and Earth orbiting it." />
        </Practice>
        <SelfCheck id="1.3.1" items={[
          "I can describe the geocentric and heliocentric models.",
          "I can name two observations by Galileo that did not fit the geocentric model.",
          "I can explain why scientists change or reject a model.",
          "I can give a recent example of the solar system model being updated.",
        ]}/>
        <NotebookLink href={NB + "#1.3"} label="Learn it in full: Space Science"/>
      </DotPoint>

      <DotPoint id="1.3.2" title="Day and night, the year, seasons and tides" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="core"/>
        <Recap>
          <ul>
            <li><strong>Day and night</strong>: Earth <Term def="Spins on its own axis.">rotates</Term> on its axis once about every 24 hours. The half facing the Sun has day; the other half has night. Earth spins west to east, so the Sun appears to rise in the east and set in the west.</li>
            <li><strong>A year</strong>: Earth <Term def="Travels in an orbit around another object.">revolves</Term> (orbits) around the Sun about once every 365¼ days. The extra quarter day is why we have a leap year every four years.</li>
            <li><strong>Seasons</strong>: Earth's axis is tilted about 23.5°. When the Southern Hemisphere tilts towards the Sun (December to February) we get summer: the Sun is higher, its light is more concentrated, and days are longer. When it tilts away (June to August) we get winter. The Northern Hemisphere always has the opposite season.</li>
            <li><strong>Common mistake:</strong> seasons are NOT caused by Earth's distance from the Sun. Earth is actually closest to the Sun in early January, during our summer and the Northern Hemisphere's winter.</li>
            <li><strong>Tides</strong>: the Moon's gravity pulls the oceans into two bulges, one facing the Moon and one on the opposite side. As Earth rotates, most coasts get two high and two low tides about every 24 hours 50 minutes, so each high tide is about 12 hours 25 minutes after the last.</li>
            <li><Term def="Tides with the biggest difference between high and low; happen at new and full Moon when the Sun and Moon line up.">Spring tides</Term> (biggest range) happen at new and full Moon, when the Sun and Moon line up. <Term def="Tides with the smallest difference between high and low; happen at first and last quarter Moon.">Neap tides</Term> (smallest range) happen at quarter Moons, when the Sun and Moon pull at right angles.</li>
          </ul>
        </Recap>
        <SunAngleFigure/>
        <TidesFigure/>
        <WorkedExample
          title="Explaining opposite seasons"
          problem={<>In July, it is summer in Japan but winter in Australia. Explain why. (3 marks)</>}
          steps={[
            "Cause: Earth's axis is tilted about 23.5°, and the tilt stays pointing the same way in space as Earth orbits the Sun.",
            "Effect in July: the Northern Hemisphere (Japan) is tilted towards the Sun and the Southern Hemisphere (Australia) is tilted away.",
            "Link to temperature: Japan gets more direct, concentrated sunlight and longer days, so it heats up more (summer). Australia gets sunlight at a lower angle, spread over a larger area, and shorter days, so it is colder (winter).",
          ]}
          answer="Because Earth's axis is tilted, in July the Northern Hemisphere leans towards the Sun and the Southern Hemisphere leans away. Japan receives more direct, concentrated sunlight for more hours each day, so it has summer. Australia receives weaker, spread-out sunlight for fewer hours, so it has winter."
        />
        <WorkedExample
          title="Predicting tide times"
          problem={<>Ethan is going fishing. On Saturday, high tide at his local beach is at 6:10 am. Predict the time of the next two high tides.</>}
          steps={[
            "High tides are about 12 hours 25 minutes apart.",
            "6:10 am + 12 h = 6:10 pm; + 25 min = 6:35 pm on Saturday.",
            "6:35 pm + 12 h = 6:35 am; + 25 min = 7:00 am on Sunday.",
            "Check: two high tides take about 24 h 50 min, and 6:10 am + 24 h 50 min = 7:00 am the next day. ✓",
          ]}
          answer="About 6:35 pm on Saturday and about 7:00 am on Sunday. High tides arrive roughly 50 minutes later each day."
        />
        <ExamTip>
          <p>For seasons questions, examiners look for three ideas: <strong>tilt</strong>, <strong>angle of sunlight</strong> (concentrated or spread out) and <strong>day length</strong>. If you mention distance from the Sun as the cause, you will lose marks.</p>
        </ExamTip>
        <Practice title="Day, night, seasons and tides">
          <MCQ num={19} question="Imagine Earth spun on its axis more slowly, once every 48 hours, but still took the same time to orbit the Sun. What would change?"
            options={["Each day and each night would last about 24 hours", "The year would last about twice as long", "The seasons would stop happening", "Tides would stop happening"]}
            correct={0}
            explain="Day and night come from Earth's spin. One spin in 48 hours means each place spends about 24 hours facing the Sun and 24 hours facing away. The year is tempting, but it depends on Earth's orbit around the Sun, which has not changed." />
          <MCQ num={20} question="The Sun rises in Sydney about two hours before it rises in Perth. Why?"
            options={["Perth is further from the Sun", "Earth spins from west to east, so places further east turn into sunlight first", "The Sun moves from east to west across Australia", "Perth is in a different hemisphere"]}
            correct={1}
            explain="Earth rotates towards the east, so Sydney (in the east) turns to face the Sun before Perth. The Sun only appears to move across the sky; it is Earth that is turning." />
          <MCQ num={21} question="Earth is closest to the Sun in early January. What does this tell us about the cause of the seasons?"
            options={["Distance is the main cause of seasons, so January is summer everywhere", "Distance is not the main cause, because January is winter in the Northern Hemisphere", "The Sun is hotter in January", "The tilt of Earth changes in January"]}
            correct={1}
            explain="If distance caused seasons, the whole Earth would have summer in January. But the Northern Hemisphere has winter then, so tilt, not distance, causes seasons. Earth's tilt stays about the same all year." />
          <MCQ num={22} question="Spring tides have the largest difference between high and low tide. When do they happen?"
            options={["Only in spring (September to November)", "At first quarter and last quarter Moon", "At new Moon and full Moon", "Only during a solar eclipse"]}
            correct={2}
            explain="At new and full Moon, the Sun and Moon line up, so their pulls add together, making the biggest tides. 'Only in spring' is the trap: the name has nothing to do with the season. Quarter Moons give neap tides." />
          <MCQ num={23} question="Which place would have the SMALLEST change in day length between summer and winter?"
            options={["A town near the equator", "Hobart, Tasmania", "A research base in Antarctica", "A town in the far north of Canada"]}
            correct={0}
            explain="Near the equator, the tilt makes very little difference, so days are about 12 hours long all year. Places closer to the poles, like Antarctica, have the biggest changes, with months of nearly constant daylight or darkness." />
          <WrittenQ num={24} question="Explain why it is usually hotter in Australia in December than in June. (3 marks)"
            model="Earth's axis is tilted about 23.5°. In December the Southern Hemisphere is tilted towards the Sun, so the Sun is higher in the sky and its light hits the ground more directly, concentrating its energy on a smaller area. Days are also longer, so the ground is heated for more hours. In June the Southern Hemisphere is tilted away, so sunlight is spread over a larger area and days are shorter, making it colder." />
          <WrittenQ num={25} question="Describe the difference between spring tides and neap tides, and the positions of the Sun and Moon that cause each. (3 marks)"
            model="Spring tides have the largest difference between high and low tide. They happen at new Moon and full Moon, when the Sun, Earth and Moon are in a line, so the Sun's and Moon's pulls combine. Neap tides have the smallest difference. They happen at first and last quarter Moon, when the Sun and Moon are at right angles to each other as seen from Earth, so their pulls partly cancel." />
        </Practice>
        <SelfCheck id="1.3.2" items={[
          "I can explain day and night using Earth's rotation.",
          "I can explain the seasons using tilt, angle of sunlight and day length.",
          "I can explain why distance from the Sun does not cause the seasons.",
          "I can explain why there are two high tides a day and predict tide times.",
          "I can say when spring and neap tides happen.",
        ]}/>
        <NotebookLink href={NB + "#1.3"} label="Learn it in full: Space Science"/>
      </DotPoint>

      <DotPoint id="1.3.3" title="Models of lunar phases and solar and lunar eclipses" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="core"/>
        <Recap>
          <ul>
            <li>The Moon makes no light of its own. We see it because it <strong>reflects sunlight</strong>.</li>
            <li>As the Moon orbits Earth (about 29.5 days from one new Moon to the next), the <strong>angle</strong> between the Sun, Earth and Moon changes. From Earth we look at the Moon's sunlit side from a different direction each night: from behind it (new Moon), side-on (quarter Moons) or straight on (full Moon). These changing shapes are the <Term def="The changing shapes of the lit part of the Moon seen from Earth.">phases</Term>: new → waxing crescent → first quarter → waxing gibbous → full → waning gibbous → last quarter → waning crescent.</li>
            <li><strong>Waxing</strong> = lit part growing; <strong>waning</strong> = shrinking. From Australia, a waxing Moon is lit on the <strong>left</strong> and a waning Moon on the <strong>right</strong> (the opposite of the Northern Hemisphere).</li>
            <li><Term def="The Moon passes between the Sun and Earth and its shadow falls on Earth.">Solar eclipse</Term>: Sun → Moon → Earth in a line. Only at <strong>new Moon</strong>. The Moon's shadow is small, so a total eclipse is seen only from a narrow strip of Earth. Never look at the Sun directly.</li>
            <li><Term def="Earth passes between the Sun and the Moon and Earth's shadow falls on the Moon.">Lunar eclipse</Term>: Sun → Earth → Moon in a line. Only at <strong>full Moon</strong>. Anyone on the night side of Earth can see it. The Moon often turns red-orange because Earth's atmosphere bends red light into the shadow.</li>
            <li>Eclipses do not happen every month because the Moon's orbit is tilted about 5° to Earth's orbit, so the three bodies rarely line up exactly.</li>
          </ul>
        </Recap>
        <PhasesFigure/>
        <EclipseFigure/>
        <MoonPhaseSlider/>
        <WorkedExample
          title="Predicting phases and eclipses"
          problem={<>Tonight, Sienna sees a first quarter Moon from her home in Wollongong. (a) What phase will she see in about one week? (b) Could there be a lunar eclipse in the next two weeks? Explain.</>}
          steps={[
            "A full cycle is about 29.5 days, so each main phase is about 7.4 days (one week) apart.",
            "The order after first quarter is waxing gibbous, then full Moon. So in about one week it will be full Moon.",
            "A lunar eclipse needs Sun → Earth → Moon in a line, which only happens at full Moon.",
            "Full Moon is coming in about a week, so an eclipse is possible then, but only if the Moon is exactly lined up (its orbit is tilted 5°, so most full Moons miss Earth's shadow).",
          ]}
          answer="(a) A full Moon. (b) Possibly, around the full Moon in about one week, because lunar eclipses can only happen at full Moon. It will only occur if the Sun, Earth and Moon line up exactly, which does not happen at most full Moons."
        />
        <WorkedExample
          title="Comparing who can see an eclipse"
          problem={<>Explain why a total solar eclipse can only be seen from a small part of Earth, but a total lunar eclipse can be seen from about half of Earth. (3 marks)</>}
          steps={[
            "Solar eclipse: the Moon is much smaller than Earth, so the darkest part of its shadow (the umbra) covers only a small area of Earth's surface.",
            "Only people inside that small shadow see a total eclipse; it sweeps along a narrow path as Earth rotates.",
            "Lunar eclipse: Earth's shadow is large enough to cover the whole Moon, so anyone who can see the Moon (everyone on the night side of Earth) sees the eclipse.",
          ]}
          answer="In a solar eclipse, the Moon's shadow on Earth is small because the Moon is smaller than Earth, so only people in that narrow shadow see a total eclipse. In a lunar eclipse, Earth's large shadow covers the whole Moon, so everyone on the night side of Earth who can see the Moon can see the eclipse."
        />
        <ExamTip>
          <p>Link eclipses to phases every time: <strong>solar = new Moon</strong> (Moon in the middle), <strong>lunar = full Moon</strong> (Earth in the middle). The name tells you what gets darkened: in a <em>lunar</em> eclipse the Moon goes dark.</p>
        </ExamTip>
        <Practice title="Phases and eclipses">
          <MCQ num={26} question="The Moon is in its waxing gibbous phase. Which phase comes next?"
            options={["First quarter", "Full Moon", "Waning gibbous", "New Moon"]}
            correct={1}
            explain="Waxing means growing, so after waxing gibbous the lit part keeps growing until the Moon is full. Waning gibbous comes after full Moon, not before it." />
          <MCQ num={27} question="Liam lives in Brisbane. He sees the Moon with exactly its LEFT half lit. Which phase is it?"
            options={["First quarter", "Last quarter", "Waxing crescent", "Full Moon"]}
            correct={0}
            explain="From Australia, a waxing Moon is lit on the left, and half lit means a quarter phase, so it is first quarter. Last quarter is tempting, but that is lit on the right from the Southern Hemisphere (it is the other way round in the Northern Hemisphere)." />
          <MCQ num={28} question="During which phase of the Moon can a solar eclipse happen?"
            options={["Full Moon", "First quarter", "New Moon", "Waning gibbous"]}
            correct={2}
            explain="A solar eclipse needs the Moon between the Sun and Earth, which is the new Moon position. Full Moon is the tempting answer, but at full Moon Earth is in the middle, which is when a lunar eclipse can happen." />
          <MCQ num={29} question="We always see the same side of the Moon from Earth. Why?"
            options={["The Moon does not rotate at all", "The Moon rotates once in the same time it takes to orbit Earth once", "The far side of the Moon is always dark", "Earth's shadow hides the far side"]}
            correct={1}
            explain="The Moon spins once on its axis for every orbit (about 27 days), so the same face always points towards Earth. 'Far side always dark' is a common myth: the far side gets sunlight too, for example at new Moon." />
          <MCQ num={30} question="Why is it dangerous to look straight at the Sun during a partial solar eclipse?"
            options={["The Moon reflects extra light into your eyes", "Part of the Sun is still uncovered, and its light can permanently damage your eyes", "The eclipse makes the Sun hotter", "It is only dangerous at night"]}
            correct={1}
            explain="Even a thin uncovered part of the Sun is bright enough to damage the retina. Use proper eclipse glasses or a pinhole projector. The Moon does not add light, and the Sun's temperature does not change." />
          <WrittenQ num={31} question="Ava says, 'A lunar eclipse is when the Moon blocks the Sun.' Correct her statement, and explain why the Moon often looks red-orange during a total lunar eclipse. (3 marks)"
            model="Ava has described a solar eclipse. A lunar eclipse happens at full Moon when Earth passes between the Sun and the Moon, so Earth's shadow falls on the Moon. The Moon looks red-orange because Earth's atmosphere bends some sunlight into the shadow, and mostly red light gets through (the same reason sunsets are red), so this red light reaches the Moon." />
          <WrittenQ num={32} question="Describe how you could use a lamp, a small ball on a stick and your own head to model the phases of the Moon. (2 marks)"
            model="The lamp is the Sun and my head is Earth. I hold the ball (the Moon) at arm's length and turn slowly in a circle. As the ball moves around my head, I look at its lamp-lit side from a changing angle: when it is between me and the lamp it looks dark (new Moon), and when it is on the far side from the lamp it looks fully lit (full Moon)." />
        </Practice>
        <SelfCheck id="1.3.3" items={[
          "I can name the eight phases of the Moon in order.",
          "I can explain why the Moon has phases using sunlight and the Moon's orbit.",
          "I can say which side of the Moon is lit when it is waxing or waning, as seen from Australia.",
          "I can describe the line-up and Moon phase for a solar and a lunar eclipse.",
          "I can explain why eclipses do not happen every month.",
        ]}/>
        <NotebookLink href={NB + "#1.3"} label="Learn it in full: Space Science"/>
      </DotPoint>
    </>
  );
}

/* =====================================================================
   SECTION 1.5  A recent advancement
   ===================================================================== */
function Section5({ progress, setProgress }) {
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">1.5 Observing the Universe: In Context</div>
        <h1>New windows on the universe</h1>
        <p className="lead">New technology keeps showing us parts of the universe we could never see before.</p>
      </div>

      <DotPoint id="1.5.1" title="A recent advancement that increased our knowledge of the Universe" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="know">Worth a mark or so. Know one advancement well: what it is, what it found, and why it matters.</ExamFocus>
        <Recap>
          <ul>
            <li><strong>Gravitational waves</strong> (first detected in 2015 by the LIGO detectors in the USA): ripples in space caused by two black holes merging. They were predicted by Albert Einstein about 100 years earlier and give a new way to study the universe without using light.</li>
            <li><strong>Exoplanets</strong>: planets orbiting other stars. The first around a Sun-like star was found in 1995; now more than 5,000 are confirmed, many found by space telescopes that detect a star dimming as a planet passes in front.</li>
            <li><strong>First image of a black hole</strong> (released 2019): the Event Horizon Telescope linked radio dishes around the world so they worked like one Earth-sized dish. It showed a dark shadow surrounded by a ring of glowing gas in the galaxy M87, matching what Einstein's theory predicted.</li>
            <li><strong>Parker Solar Probe</strong> (launched 2018): in December 2024 it flew about 6 million km from the Sun's surface, closer than any spacecraft before, and measured the solar wind where it begins.</li>
            <li>For any advancement, learn: <em>what the technology is</em>, <em>what it discovered</em>, and <em>how it changed what we know</em>.</li>
          </ul>
        </Recap>
        <ExamTip>
          <p>A <strong>describe</strong> question about an advancement usually earns marks for: naming it, saying what it detects or does, and giving a specific new piece of knowledge it produced.</p>
        </ExamTip>
        <Practice title="Recent advancements">
          <MCQ num={33} question="In 2015, scientists first detected gravitational waves. Why was this an important advancement?"
            options={["It proved that the Moon causes tides", "It confirmed a prediction made about 100 years earlier and gave scientists a new way to study events like black holes merging", "It allowed astronauts to travel to Mars", "It showed that Earth is the centre of the universe"]}
            correct={1}
            explain="Einstein predicted gravitational waves in 1916, and detecting them confirmed his prediction and let scientists 'hear' black holes merging, which give off no light. The other options are unrelated to gravitational waves." />
          <WrittenQ num={34} question="Describe one recent advancement in science or technology that has increased our knowledge of the Universe. (3 marks)"
            model="Since the 1990s, scientists have used sensitive telescopes to discover exoplanets, which are planets orbiting other stars. Space telescopes measure tiny dips in a star's brightness when a planet passes in front of it. More than 5,000 exoplanets have now been confirmed, showing that planets are very common in our galaxy and that some are rocky planets at a distance from their star where liquid water could exist." />
        </Practice>
        <SelfCheck id="1.5.1" items={[
          "I can name one recent advancement in space science and describe what it does.",
          "I can give one specific discovery that this advancement made.",
          "I can explain how it increased our knowledge of the Universe.",
        ]}/>
        <NotebookLink href={NB + "#1.5"} label="Learn it in full: Observing the Universe in context"/>
      </DotPoint>
    </>
  );
}

/* =====================================================================
   MOUNT
   ===================================================================== */
mountTopicApp({
  year: 7,
  topicTitle: "Observing the Universe",
  branch: "physics",
  heroImage: "img/hero.webp",
  strand: "Yearly Exam Revision · Stage 4",
  accent: "blue",
  storageKey: "y7.rev-universe",
  hubHref: "../",
  intro: "Revise the key ideas from Observing the Universe: how scientists work together, how to read measuring devices, the difference between observations and inferences, how our model of the solar system changed, and how the Sun, Earth and Moon cause day and night, seasons, tides, phases and eclipses. Each dot point has a short recap, worked examples and practice questions with model answers.",
  glossary: {
    "collaboration": "Scientists working together, often across different fields and countries.",
    "peer review": "Independent experts checking a scientist's work before it is published.",
    "replicate": "Repeat an investigation to check that the same results are obtained.",
    "analog device": "A measuring device that shows a reading with a pointer or level against a scale.",
    "digital device": "A measuring device that shows the reading as numbers on a screen.",
    "range": "The smallest to largest values a device can measure.",
    "sensitivity": "The smallest change a measuring device can detect.",
    "accuracy": "How close a measurement is to the true value.",
    "parallax error": "A reading error caused by looking at a scale from an angle instead of straight on.",
    "observation": "Something detected directly with the senses or an instrument.",
    "inference": "An explanation or conclusion worked out from observations.",
    "testable prediction": "A statement of what should happen if an inference is correct, which can be checked.",
    "model": "A simplified representation that helps explain or predict how something works.",
    "geocentric model": "An Earth-centred model in which the Sun, Moon, planets and stars orbit Earth.",
    "heliocentric model": "A Sun-centred model in which Earth and the other planets orbit the Sun.",
    "rotation": "Earth spinning on its axis, about once every 24 hours, causing day and night.",
    "revolution": "Earth travelling in its orbit around the Sun, about once every 365¼ days.",
    "axial tilt": "The 23.5° lean of Earth's axis, which causes the seasons.",
    "spring tide": "A tide with the largest range, at new and full Moon.",
    "neap tide": "A tide with the smallest range, at first and last quarter Moon.",
    "lunar phase": "The shape of the lit part of the Moon seen from Earth, changing over about 29.5 days.",
    "waxing": "The lit part of the Moon getting bigger each night.",
    "waning": "The lit part of the Moon getting smaller each night.",
    "solar eclipse": "The Moon passes between the Sun and Earth, and its shadow falls on Earth (at new Moon).",
    "lunar eclipse": "Earth passes between the Sun and the Moon, and Earth's shadow falls on the Moon (at full Moon).",
    "umbra": "The darkest central part of a shadow, where all the light is blocked.",
    "gravitational waves": "Ripples in space caused by huge events such as black holes merging.",
    "exoplanet": "A planet that orbits a star other than the Sun.",
  },
  sections: [
    {
      id: "1.1",
      label: "Nature of Science",
      accent: "blue",
      blurb: "★★★ Why science is a team effort and how new discoveries build on earlier work.",
      points: ["1.1.3"],
      render: (p) => <Section1 {...p}/>,
    },
    {
      id: "1.2",
      label: "Practice of Science",
      accent: "teal",
      blurb: "★★ Reading analog and digital devices, and turning observations into inferences and predictions.",
      points: ["1.2.2", "1.2.4"],
      render: (p) => <Section2 {...p}/>,
    },
    {
      id: "1.3",
      label: "Space Science",
      accent: "blue",
      blurb: "★★★ Solar system models, day and night, seasons, tides, Moon phases and eclipses.",
      points: ["1.3.1", "1.3.2", "1.3.3"],
      render: (p) => <Section3 {...p}/>,
    },
    {
      id: "1.5",
      label: "In Context",
      accent: "teal",
      blurb: "★ A recent advancement that changed what we know about the Universe.",
      points: ["1.5.1"],
      render: (p) => <Section5 {...p}/>,
    },
  ],
});
