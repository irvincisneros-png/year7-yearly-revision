/* global React, DotPoint, Callout, Figure, Term, MCQ, WrittenQ, QGroup, Interactive,
   Slider, SegToggle, Stat, Reveal, FlipCard, MatchBuckets, Ring, mountTopicApp,
   ExamFocus, Recap, ExamTip, WorkedExample, Practice, SelfCheck, NotebookLink */
const { useState } = React;

const NB = "https://irvincisneros-png.github.io/Year-7/forces/";

/* ============================================================
   Shared drawing helpers
   ============================================================ */

/* A straight force arrow with a solid head that ends exactly at (x2, y2). */
function Arrow({ x1, y1, x2, y2, color = "var(--accent-deep)", w = 4, head = 13 }) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const bx = x2 - head * Math.cos(a), by = y2 - head * Math.sin(a);
  const px = Math.sin(a) * head * 0.55, py = -Math.cos(a) * head * 0.55;
  return (
    <g>
      <line x1={x1} y1={y1} x2={bx} y2={by} style={{ stroke: color }} strokeWidth={w} strokeLinecap="round"/>
      <polygon points={`${x2},${y2} ${bx + px},${by + py} ${bx - px},${by - py}`} style={{ fill: color }}/>
    </g>
  );
}

const lbl = { fill: "var(--ink)", fontSize: 15, fontFamily: "var(--font-body)", fontWeight: 600 };
const sub = { fill: "var(--ink-muted)", fontSize: 14, fontFamily: "var(--font-body)" };

/* Force diagram of a crate on a floor, arrows drawn from its centre.
   scale: 0.8 px per newton, so arrow lengths are comparable within one diagram. */
function CrateDiagram({ push, friction, weight, title, note }) {
  const cx = 180, cy = 155, k = 0.8;
  return (
    <svg role="img" aria-label={`Force diagram of a crate: push ${push} N to the right, friction ${friction} N to the left, weight ${weight} N down, support force ${weight} N up. ${title}. ${note}.`}
      width="100%" viewBox="0 0 360 340" style={{ display: "block", maxWidth: 360, margin: "0 auto" }}>
      <line x1="20" y1="200" x2="340" y2="200" style={{ stroke: "var(--ink-muted)" }} strokeWidth="2"/>
      {[30, 60, 90, 120, 240, 270, 300, 330].map(x => (
        <line key={x} x1={x} y1="200" x2={x - 10} y2="212" style={{ stroke: "var(--ink-muted)" }} strokeWidth="1.5"/>
      ))}
      <rect x="135" y="110" width="90" height="90" rx="4" style={{ fill: "var(--accent-soft)", stroke: "var(--ink)" }} strokeWidth="2"/>
      <line x1="135" y1="110" x2="225" y2="200" style={{ stroke: "var(--ink-muted)" }} strokeWidth="1" opacity="0.5"/>
      <line x1="225" y1="110" x2="135" y2="200" style={{ stroke: "var(--ink-muted)" }} strokeWidth="1" opacity="0.5"/>
      <Arrow x1={cx} y1={cy} x2={cx} y2={cy - weight * k}/>
      <Arrow x1={cx} y1={cy} x2={cx} y2={cy + weight * k}/>
      <Arrow x1={cx} y1={cy} x2={cx + push * k} y2={cy} color="var(--blue)"/>
      <Arrow x1={cx} y1={cy} x2={cx - friction * k} y2={cy} color="var(--red)"/>
      <circle cx={cx} cy={cy} r="5" style={{ fill: "var(--ink)" }}/>
      <text x="192" y="52" style={lbl}>Support {weight} N</text>
      <text x="192" y="272" style={lbl}>Weight {weight} N</text>
      <text x="232" y="143" style={lbl}>Push</text>
      <text x="232" y="180" style={lbl}>{push} N</text>
      <text x="128" y="143" textAnchor="end" style={lbl}>Friction</text>
      <text x="128" y="180" textAnchor="end" style={lbl}>{friction} N</text>
      <text x="180" y="308" textAnchor="middle" style={lbl}>{title}</text>
      <text x="180" y="330" textAnchor="middle" style={sub}>{note}</text>
    </svg>
  );
}

function ForceDiagramFigure() {
  return (
    <Figure num="1" caption="Two force diagrams for a crate being pushed to the right across a floor. Each arrow starts at the object, points the way the force acts and is drawn to scale, so a longer arrow means a bigger force. In (a) every pair of opposite forces is equal. In (b) the push is bigger than friction.">
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
        <div style={{ flex: "1 1 280px", maxWidth: 360 }}>
          <CrateDiagram push={120} friction={120} weight={150} title="(a) Balanced: net force = 0 N" note="keeps moving at a steady speed"/>
        </div>
        <div style={{ flex: "1 1 280px", maxWidth: 360 }}>
          <CrateDiagram push={160} friction={120} weight={150} title="(b) Unbalanced: net 40 N right" note="speeds up to the right"/>
        </div>
      </div>
    </Figure>
  );
}

/* Like and unlike charges */
function ChargesFigure() {
  const rows = [
    { y: 0, a: "+", b: "+", text: "Like charges repel", repel: true },
    { y: 105, a: "−", b: "−", text: "Like charges repel", repel: true },
    { y: 210, a: "+", b: "−", text: "Unlike charges attract", repel: false },
  ];
  const ball = (cx, cy, s) => (
    <g>
      <circle cx={cx} cy={cy} r="26" style={{ fill: s === "+" ? "var(--orange-soft)" : "var(--blue-soft)", stroke: s === "+" ? "var(--orange-deep)" : "var(--blue-deep)" }} strokeWidth="2.5"/>
      <text x={cx} y={cy + 9} textAnchor="middle" style={{ fill: "#1b1a17", fontSize: 28, fontWeight: 700, fontFamily: "var(--font-body)" }}>{s}</text>
    </g>
  );
  return (
    <Figure num="2" caption="Charged objects push or pull on each other without touching. Rubbing moves electrons (negative charges) from one material to the other; the protons stay where they are.">
      <svg role="img" aria-label="Three pairs of charged balls. Two positive balls push apart. Two negative balls push apart. A positive and a negative ball pull together." width="100%" viewBox="0 0 360 320" style={{ display: "block", maxWidth: 360, margin: "0 auto" }}>
        {rows.map((r, i) => {
          const cy = r.y + 65;
          return (
            <g key={i}>
              <text x="180" y={r.y + 22} textAnchor="middle" style={lbl}>{r.text}</text>
              {ball(100, cy, r.a)}
              {ball(260, cy, r.b)}
              {r.repel ? (
                <>
                  <Arrow x1={68} y1={cy} x2={22} y2={cy}/>
                  <Arrow x1={292} y1={cy} x2={338} y2={cy}/>
                </>
              ) : (
                <>
                  <Arrow x1={132} y1={cy} x2={172} y2={cy}/>
                  <Arrow x1={228} y1={cy} x2={188} y2={cy}/>
                </>
              )}
            </g>
          );
        })}
      </svg>
    </Figure>
  );
}

/* Electromagnet circuit */
function ElectromagnetFigure() {
  const turns = [];
  for (let i = 0; i < 10; i++) {
    const x = 98 + i * 13;
    turns.push(<line key={i} x1={x} y1="62" x2={x + 9} y2="108" style={{ stroke: "var(--accent-deep)" }} strokeWidth="3.5" strokeLinecap="round"/>);
  }
  const wire = { stroke: "var(--ink)", fill: "none" };
  return (
    <Figure num="3" caption="A simple electromagnet. When the switch is closed, current flows through the coil and the iron core becomes a strong magnet. Open the switch and the magnetism (almost) disappears.">
      <svg role="img" aria-label="Electromagnet: a coil of insulated wire wrapped around an iron core, connected in a circuit with a battery and a switch. Steel washers hang from the end of the core." width="100%" viewBox="0 0 360 265" style={{ display: "block", maxWidth: 360, margin: "0 auto" }}>
        <text x="160" y="46" textAnchor="middle" style={lbl}>Coil of insulated wire</text>
        <rect x="80" y="72" width="160" height="26" rx="4" style={{ fill: "var(--ink-muted)", stroke: "var(--ink)" }} strokeWidth="1.5" opacity="0.85"/>
        {turns}
        <text x="72" y="91" textAnchor="end" style={lbl}>Iron</text>
        <text x="72" y="110" textAnchor="end" style={lbl}>core</text>
        {/* washers */}
        <ellipse cx="246" cy="106" rx="9" ry="5" style={{ fill: "var(--card)", stroke: "var(--ink)" }} strokeWidth="2"/>
        <ellipse cx="248" cy="118" rx="9" ry="5" style={{ fill: "var(--card)", stroke: "var(--ink)" }} strokeWidth="2"/>
        <ellipse cx="247" cy="130" rx="9" ry="5" style={{ fill: "var(--card)", stroke: "var(--ink)" }} strokeWidth="2"/>
        <text x="262" y="122" style={lbl}>Steel</text>
        <text x="262" y="141" style={lbl}>washers</text>
        {/* circuit */}
        <path d="M98 108 L98 215 L128 215" style={wire} strokeWidth="2.5"/>
        <line x1="128" y1="198" x2="128" y2="232" style={{ stroke: "var(--ink)" }} strokeWidth="2.5"/>
        <line x1="140" y1="206" x2="140" y2="224" style={{ stroke: "var(--ink)" }} strokeWidth="5"/>
        <path d="M140 215 L170 215" style={wire} strokeWidth="2.5"/>
        <circle cx="173" cy="215" r="3.5" style={{ fill: "var(--ink)" }}/>
        <line x1="173" y1="215" x2="203" y2="215" style={{ stroke: "var(--ink)" }} strokeWidth="2.5"/>
        <circle cx="205" cy="215" r="3.5" style={{ fill: "var(--ink)" }}/>
        <path d="M205 215 L227 215 L227 108" style={wire} strokeWidth="2.5"/>
        <text x="134" y="254" textAnchor="middle" style={lbl}>Battery</text>
        <text x="190" y="200" textAnchor="middle" style={sub}>Switch</text>
      </svg>
    </Figure>
  );
}

/* First-class lever */
function LeverFigure() {
  return (
    <Figure num="4" caption="A lever. Pushing down on the long end, far from the fulcrum, lifts a heavy load near the fulcrum with a much smaller effort. The trade-off: the effort end moves a long way while the load moves only a little.">
      <svg role="img" aria-label="A lever: a long bar resting on a triangular fulcrum near the left end. A heavy load sits at the left end, close to the fulcrum. A small effort arrow pushes down at the far right end. The effort distance is much longer than the load distance." width="100%" viewBox="0 0 360 215" style={{ display: "block", maxWidth: 360, margin: "0 auto" }}>
        <rect x="18" y="104" width="326" height="10" rx="3" style={{ fill: "var(--accent)", stroke: "var(--ink)" }} strokeWidth="1.5"/>
        <rect x="22" y="66" width="40" height="38" rx="3" style={{ fill: "var(--ink-muted)", stroke: "var(--ink)" }} strokeWidth="1.5"/>
        <text x="42" y="56" textAnchor="middle" style={lbl}>Load</text>
        <polygon points="80,114 61,150 99,150" style={{ fill: "var(--card)", stroke: "var(--ink)" }} strokeWidth="2"/>
        <line x1="10" y1="150" x2="350" y2="150" style={{ stroke: "var(--ink-muted)" }} strokeWidth="2"/>
        <text x="108" y="140" style={sub}>Fulcrum (pivot)</text>
        <Arrow x1={330} y1={44} x2={330} y2={102} color="var(--blue)"/>
        <text x="320" y="38" textAnchor="end" style={lbl}>Effort</text>
        {/* distance markers */}
        <line x1="42" y1="168" x2="80" y2="168" style={{ stroke: "var(--ink)" }} strokeWidth="1.5"/>
        <line x1="42" y1="162" x2="42" y2="174" style={{ stroke: "var(--ink)" }} strokeWidth="1.5"/>
        <line x1="80" y1="162" x2="80" y2="174" style={{ stroke: "var(--ink)" }} strokeWidth="1.5"/>
        <line x1="80" y1="168" x2="330" y2="168" style={{ stroke: "var(--blue)" }} strokeWidth="1.5" strokeDasharray="5 4"/>
        <line x1="330" y1="162" x2="330" y2="174" style={{ stroke: "var(--blue)" }} strokeWidth="1.5"/>
        <text x="14" y="194" style={sub}>load distance</text>
        <text x="215" y="194" textAnchor="middle" style={sub}>effort distance</text>
      </svg>
    </Figure>
  );
}

/* ============================================================
   Interactive: net force and motion
   ============================================================ */
function NetForceExplorer() {
  const [push, setPush] = useState(130);
  const [fric, setFric] = useState(80);
  const net = push - fric;
  const k = 0.75, cx = 180, cy = 62;
  const verdict = net > 0 ? "speeds up to the right" : net < 0 ? "slows down (and will stop)" : "keeps sliding at a steady speed";
  const netText = net === 0 ? "0 N" : Math.abs(net) + " N " + (net > 0 ? "right" : "left");
  return (
    <Interactive title="Net force explorer" subtitle="A sled is already sliding to the right across snow. Change the forward pull and the friction, then predict what happens to its motion."
      takeaway="Only the net force decides the change in motion. Equal forces mean no change (steady speed or still). A net force forwards speeds the sled up; a net force backwards slows it down.">
      <svg role="img" aria-label={`Sled with a forward pull of ${push} newtons and friction of ${fric} newtons. Net force ${netText}. The sled ${verdict}.`} width="100%" viewBox="0 0 360 130" style={{ display: "block", maxWidth: 480, margin: "0 auto" }}>
        <line x1="10" y1="98" x2="350" y2="98" style={{ stroke: "var(--ink-muted)" }} strokeWidth="2"/>
        <rect x="146" y="36" width="68" height="48" rx="6" style={{ fill: "var(--accent-soft)", stroke: "var(--ink)" }} strokeWidth="2"/>
        <path d="M138 92 L218 92 Q230 92 230 80" style={{ stroke: "var(--ink)", fill: "none" }} strokeWidth="3" strokeLinecap="round"/>
        {push > 0 && <Arrow x1={cx} y1={cy} x2={cx + push * k} y2={cy} color="var(--blue)"/>}
        {fric > 0 && <Arrow x1={cx} y1={cy} x2={cx - fric * k} y2={cy} color="var(--red)"/>}
        <circle cx={cx} cy={cy} r="4.5" style={{ fill: "var(--ink)" }}/>
        <text x="180" y="122" textAnchor="middle" style={sub}>motion: sliding to the right →</text>
      </svg>
      <Slider label="Forward pull" min={0} max={200} step={10} value={push} onChange={setPush} unit=" N"/>
      <Slider label="Friction" min={0} max={200} step={10} value={fric} onChange={setFric} unit=" N"/>
      <div className="row" style={{ gap: 12, flexWrap: "wrap", marginTop: 8 }}>
        <Stat value={netText} label="Net force"/>
        <Stat value={net === 0 ? "Balanced" : "Unbalanced"} label="Forces are"/>
      </div>
      <p style={{ marginTop: 10 }}><strong>Prediction:</strong> the sled {verdict}.</p>
    </Interactive>
  );
}

/* ============================================================
   SECTION 2.1 — Forces and their effects
   ============================================================ */
function Section21({ progress, setProgress }) {
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">2.1 Forces</div>
        <h1>Pushes, pulls and what they do</h1>
        <p className="lead">Classify forces, draw and read force diagrams, work out net force, and calculate weight with F = mg.</p>
      </div>

      {/* ---------------- 2.1.1 ---------------- */}
      <DotPoint id="2.1.1" title="Contact and non-contact forces" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="know"/>
        <Recap>
          <ul>
            <li>A <Term def="A push or a pull on an object. Measured in newtons (N).">force</Term> is a push or a pull. It is measured in <strong>newtons (N)</strong> using a force meter (spring balance).</li>
            <li>Forces can change an object's <strong>speed</strong>, its <strong>direction</strong> or its <strong>shape</strong>.</li>
            <li><Term def="A force that only acts when two objects are touching.">Contact forces</Term> (direct) need the objects to touch: applied push or pull, friction, air resistance, water resistance, tension in a rope, the support (normal) force from a surface, buoyancy (upthrust).</li>
            <li><Term def="A force that acts at a distance, without the objects touching, through a field.">Non-contact forces</Term> (indirect) act at a distance through a field: <strong>gravity</strong>, <strong>magnetic force</strong> and <strong>electrostatic force</strong>.</li>
            <li>Common mistake: air resistance is a <em>contact</em> force. Air particles really do hit the moving object, you just can't see them.</li>
          </ul>
        </Recap>
        <ExamTip>
          When you <strong>classify</strong> a force, name it and give the reason: "contact, because the surfaces touch" or "non-contact, because it acts at a distance through a field". The reason is usually where the second mark is.
        </ExamTip>
        <Practice title="Contact or non-contact?">
          <MCQ num={1} question="Which of these is a non-contact force?"
            options={["Friction between a bike's brake pads and its wheel rim", "A magnet pulling a steel spoon across a table before they touch", "Tension in a rope holding up a swing", "Air resistance on a kite"]}
            correct={1}
            explain="The magnet pulls the spoon from a distance through its magnetic field, so it is non-contact. Air resistance is the tempting wrong choice, but air particles collide with the kite, so it is a contact force." />
          <WrittenQ num={2} question="A diver jumps off a high platform into a pool. Name one contact force and one non-contact force acting on the diver while she is falling through the air, and explain why each is classified that way. (2 marks)"
            model="Gravity (her weight) is a non-contact force, because the Earth pulls her down from a distance without touching her. Air resistance is a contact force, because air particles push on her body as she falls through them." />
        </Practice>
        <SelfCheck id="2.1.1" items={[
          "I can define a force and give its unit (newton, N).",
          "I can list three effects a force can have on an object.",
          "I can sort forces into contact and non-contact, with a reason.",
          "I can name the three non-contact forces: gravity, magnetic and electrostatic.",
        ]}/>
        <NotebookLink href={NB} label="Learn it in full: Forces notebook (types of forces)"/>
      </DotPoint>

      {/* ---------------- 2.1.3 ---------------- */}
      <DotPoint id="2.1.3" title="Force diagrams: balanced and unbalanced forces" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="core"/>
        <Recap>
          <ul>
            <li>A <Term def="A simple drawing of an object with arrows showing every force acting on it.">force diagram</Term> shows the object as a box or dot, with an arrow for every force acting <em>on</em> it.</li>
            <li>Each arrow: starts at the object, points in the direction the force acts, is drawn with <strong>length to scale</strong> (bigger force, longer arrow) and is labelled with its name and size, e.g. "Friction 120 N".</li>
            <li><strong>Balanced forces:</strong> opposite forces are equal, so the <Term def="The overall force on an object once all the forces are combined. Also called the resultant force.">net force</Term> is 0 N. The object stays still <em>or</em> keeps moving at a steady speed in a straight line.</li>
            <li><strong>Unbalanced forces:</strong> the net force is not zero. The object speeds up, slows down or changes direction.</li>
            <li>Usual forces to draw: weight (down), support force (up, from a surface), friction and air or water resistance (opposite to the motion), push or thrust, tension (along a rope), upthrust (up, in a liquid or gas).</li>
            <li>Common mistake: balanced does <strong>not</strong> mean "not moving". A moving object can have balanced forces if its speed is steady.</li>
          </ul>
        </Recap>
        <ForceDiagramFigure/>
        <WorkedExample title="Drawing a force diagram for a hanging lamp"
          problem="A lamp with a weight of 20 N hangs perfectly still from the ceiling on a cord. Draw a force diagram and describe the forces."
          steps={[
            "Pick the object: the lamp. Draw it as a box.",
            "List every force on the lamp: its weight (gravity pulling down) and the tension in the cord (pulling up). Nothing is pushing sideways.",
            "The lamp is not moving, so the forces must be balanced: tension = weight = 20 N.",
            "Draw a 20 N arrow pointing down labelled 'Weight 20 N' and an arrow of the same length pointing up labelled 'Tension 20 N'.",
          ]}
          answer="Two arrows of equal length: weight 20 N down and tension 20 N up. The forces are balanced, so the net force is 0 N and the lamp stays still." />
        <WorkedExample title="Using balanced forces to find a missing force"
          problem="A skydiver with a weight of 700 N is falling at a constant (steady) speed with her parachute closed. What is the air resistance on her? Describe the force diagram."
          steps={[
            "Key clue: constant speed in a straight line means the forces are balanced.",
            "The two vertical forces are weight (down) and air resistance (up, opposite to her motion).",
            "Balanced, so air resistance = weight = 700 N.",
            "Diagram: a 700 N arrow down labelled 'Weight' and an equal-length 700 N arrow up labelled 'Air resistance'.",
          ]}
          answer="Air resistance is 700 N upwards. The arrows are equal and opposite, so the net force is 0 N and her speed stays the same." />
        <ExamTip>
          A <strong>describe</strong> question about a force diagram earns marks for: naming each force, giving its direction, comparing sizes (equal or which is bigger), and stating balanced or unbalanced.
        </ExamTip>
        <Practice title="Force diagrams">
          <MCQ num={3} question="A book rests on a table. Which two forces on the book are balanced?"
            options={["Its weight down and the support force from the table up", "Its weight down and friction", "Gravity and air resistance", "The push from your hand and its weight"]}
            correct={0}
            explain="The book is still, and the only forces on it are its weight pulling down and the table pushing up with an equal support force. Friction is the tempting option, but no one is trying to slide the book, so there is no friction acting on it." />
          <MCQ num={4} question="A swimmer moves through the water at a constant speed. Her arms and legs give a forward force of 40 N. What is the water resistance on her?"
            options={["0 N", "20 N", "40 N", "More than 40 N"]}
            correct={2}
            explain="Constant speed means balanced forces, so water resistance equals the forward force: 40 N. 20 N is the tempting choice if you think the forward force must be bigger to keep moving, but a net force is only needed to change speed." />
          <MCQ num={5} question="On a force diagram, what does the length of each arrow show?"
            options={["The size of the force", "How fast the object is moving", "How far the object will travel", "The mass of the object"]}
            correct={0}
            explain="Arrows are drawn to scale, so a longer arrow means a bigger force. It does not show speed: a still object can have very long arrows if large forces are balanced." />
          <MCQ num={6} question="In which situation are the forces on the object unbalanced?"
            options={["A picture hanging still on a wall", "A lift going up at a steady speed", "An apple falling faster and faster after it drops from a tree", "A bag of shopping sitting on a bench"]}
            correct={2}
            explain="The apple's speed is changing (it is speeding up), so there must be a net force: its weight pulling down is bigger than the air resistance pushing up. The lift is the trap: it is moving, but at a steady speed, so its forces are balanced." />
          <WrittenQ num={7} question="A hot-air balloon floats at a constant height with no wind. Describe the force diagram for the balloon and state whether the forces are balanced. (3 marks)"
            model="There are two forces. The weight of the balloon (gravity) acts downwards and the upthrust (lift) from the surrounding air acts upwards. Because the balloon stays at the same height and is not speeding up or slowing down, the two arrows are equal in length, so the forces are balanced and the net force is 0 N." />
          <WrittenQ num={8} question="Mia says: 'If something is moving, the forces on it must be unbalanced.' Explain whether Mia is correct, using an example. (2 marks)"
            model="Mia is not correct. Balanced forces mean there is no change in motion, so an object can keep moving at a steady speed in a straight line while its forces are balanced. For example, a train cruising at a constant speed has a driving force equal to the friction and air resistance acting against it." />
        </Practice>
        <SelfCheck id="2.1.3" items={[
          "I can draw a force diagram with labelled arrows that start at the object.",
          "I can draw arrow lengths to show which force is bigger.",
          "I can say what balanced forces do to a still object and to a moving object.",
          "I can find a missing force when I know the object's speed is constant.",
        ]}/>
        <NotebookLink href={NB} label="Learn it in full: Forces notebook (force diagrams)"/>
      </DotPoint>

      {/* ---------------- 2.1.4 ---------------- */}
      <DotPoint id="2.1.4" title="Using force diagrams to predict motion" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="core"/>
        <Recap>
          <ul>
            <li><strong>Net force</strong> (resultant force) = all the forces combined.</li>
            <li>Forces in the <strong>same direction</strong>: add them. Forces in <strong>opposite directions</strong>: subtract the smaller from the bigger. The net force points the way of the bigger force.</li>
            <li>Net force = 0 N: no change in motion (stays still, or keeps the same speed and direction).</li>
            <li>Net force in the direction of motion: <strong>speeds up</strong>. Net force against the motion: <strong>slows down</strong>. Net force sideways: <strong>changes direction</strong>.</li>
            <li>A bigger net force causes a bigger change. A heavier (more massive) object needs a bigger net force for the same change.</li>
            <li>Always give a net force as a <strong>size and a direction</strong>, e.g. "50 N to the left".</li>
          </ul>
        </Recap>
        <NetForceExplorer/>
        <WorkedExample title="Net force in a tug-of-war"
          problem="In a tug-of-war, Team A pulls the rope to the left with 620 N and Team B pulls to the right with 540 N. Calculate the net force and predict what happens."
          steps={[
            "The forces act in opposite directions, so subtract: 620 N − 540 N = 80 N.",
            "The net force points the way of the bigger force: to the left.",
            "The forces are unbalanced, so the motion changes: the rope (and Team B) start moving left and speed up towards Team A.",
          ]}
          answer="Net force = 80 N to the left. The rope speeds up towards Team A, so Team A should win unless Team B pulls harder." />
        <WorkedExample title="Predicting the motion of a lift"
          problem="A lift is moving upwards. The cable pulls up with 9000 N and the weight of the lift and passengers is 8000 N. (a) Find the net force. (b) Predict the motion. (c) Later the cable force drops to 8000 N. What happens now?"
          steps={[
            "(a) Opposite directions, so subtract: 9000 N − 8000 N = 1000 N, upwards (the bigger force is up).",
            "(b) The net force is in the same direction as the motion (up), so the lift speeds up as it rises.",
            "(c) Now 8000 N up and 8000 N down: balanced, net force 0 N.",
            "Balanced forces cause no change in motion, so the lift keeps rising at a steady speed. It does not stop.",
          ]}
          answer="(a) 1000 N upwards. (b) It speeds up while going up. (c) Forces are balanced, so it keeps moving up at a constant speed." />
        <ExamTip>
          <strong>Predict</strong> questions want two things: what will happen (speeds up, slows down, steady, changes direction) <em>and</em> why, using the net force. "It slows down because the net force of 20 N acts against its motion" gets full marks; "it slows down" alone usually gets one.
        </ExamTip>
        <Practice title="Net force and motion">
          <MCQ num={9} question="A sled is pulled to the right with a force of 120 N. Friction on it is 45 N to the left. What is the net force?"
            options={["165 N to the right", "75 N to the left", "75 N to the right", "45 N to the right"]}
            correct={2}
            explain="Opposite directions, so subtract: 120 − 45 = 75 N, in the direction of the bigger force (right). 165 N comes from adding, which is only correct when forces point the same way." />
          <MCQ num={10} question="A rocket on its launch pad fires its engines. The thrust is 32 000 N upwards and its weight is 30 000 N. What happens?"
            options={["It stays on the pad because the forces are nearly equal", "It rises and speeds up, with a net force of 2000 N upwards", "It moves downwards into the pad", "It rises at a constant speed"]}
            correct={1}
            explain="Thrust is bigger than weight, so the net force is 32 000 − 30 000 = 2000 N up. An unbalanced force upwards makes the rocket speed up. 'Constant speed' would need balanced forces." />
          <MCQ num={11} question="A loaded shopping trolley is rolling forwards down a slight slope. Ruby grabs the handle and pulls it backwards with a steady 45 N. The forward push from the slope is 15 N and friction is 5 N backwards. What happens to the trolley if Ruby keeps pulling?"
            options={["It keeps rolling forwards at a steady speed", "It speeds up going forwards", "It slows down, stops, and then starts moving backwards towards Ruby", "It instantly jumps backwards towards Ruby"]}
            correct={2}
            explain="Backwards forces: 45 + 5 = 50 N. Forwards: 15 N. Net force = 50 − 15 = 35 N backwards, against the motion, so the trolley slows down. Once it has stopped, the backwards net force keeps acting, so it starts moving backwards. 'Instantly jumps backwards' is tempting, but a force against the motion must first bring the speed down to zero." />
          <MCQ num={12} question="Two friends push a heavy couch that is already sliding across the floor. They push in the same direction with 150 N and 130 N. Friction is 280 N. What happens?"
            options={["It speeds up", "It slows down", "It keeps sliding at a constant speed", "It stops immediately"]}
            correct={2}
            explain="Same direction pushes add: 150 + 130 = 280 N, which equals friction, so the net force is 0 N. Balanced forces mean no change, so the couch keeps sliding at the same speed. 'Stops' is tempting, but balanced forces do not stop a moving object." />
          <WrittenQ num={13} question="A delivery drone is flying forwards. The horizontal forces are a forward thrust of 210 N and air resistance of 140 N. (a) Calculate the net force. (b) Predict how the drone's speed changes. (c) As the drone gets faster, the air resistance grows until it reaches 210 N. Predict and explain what happens to the drone's speed from then on. (4 marks)"
            model="(a) Net force = 210 N − 140 N = 70 N forwards. (b) The forces are unbalanced and the net force is in the direction of motion, so the drone speeds up. (c) When air resistance reaches 210 N, it equals the thrust, so the forces are balanced and the net force is 0 N. Balanced forces cause no change in motion, so the drone keeps flying forwards at a constant speed (it does not stop)." />
          <WrittenQ num={14} question="A ball is thrown straight up into the air. Ignoring air resistance, identify the force acting on the ball as it travels upwards, then predict and explain what happens to its motion. (3 marks)"
            model="The only force is the ball's weight (gravity), acting downwards. This is an unbalanced force acting against the ball's upward motion, so the ball slows down as it rises. It stops for an instant at the top, and then the same downward force makes it speed up as it falls back down." />
        </Practice>
        <SelfCheck id="2.1.4" items={[
          "I can calculate net force when forces act in the same or opposite directions.",
          "I can always give a net force with a size and a direction.",
          "I can predict whether an object speeds up, slows down, keeps steady or changes direction.",
          "I can explain a prediction using the words balanced, unbalanced and net force.",
        ]}/>
        <NotebookLink href={NB} label="Learn it in full: Forces notebook (net force and motion)"/>
      </DotPoint>

      {/* ---------------- 2.1.6 ---------------- */}
      <DotPoint id="2.1.6" title="Electrostatic and gravitational forces" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="know"/>
        <Recap>
          <ul>
            <li><Term def="The push or pull between objects that carry electric charge.">Electrostatic force</Term> acts between charged objects. Rubbing two materials together transfers <strong>electrons</strong> (negative charges) from one to the other.</li>
            <li>The object that <strong>gains</strong> electrons becomes <strong>negative</strong>; the one that <strong>loses</strong> electrons becomes <strong>positive</strong>. Protons do not move.</li>
            <li><strong>Like charges repel</strong> (+ and +, − and −). <strong>Unlike charges attract</strong> (+ and −). A charged object can also attract small uncharged (neutral) things, like a rubbed plastic ruler bending a thin stream of tap water.</li>
            <li><Term def="The force of attraction between any two objects that have mass.">Gravitational force</Term> acts between <strong>all</strong> objects with mass and only ever <strong>attracts</strong>. It is stronger for bigger masses and weaker when the objects are further apart.</li>
            <li>Earth's gravity gives you your weight. The Sun's gravity keeps the planets in orbit; Earth's gravity keeps the Moon in orbit.</li>
            <li>Both are non-contact forces. Key difference: electrostatic force can attract <em>or</em> repel; gravity only attracts.</li>
          </ul>
        </Recap>
        <ChargesFigure/>
        <Practice title="Charges and gravity">
          <MCQ num={15} question="A plastic rod is rubbed with a woollen cloth and becomes negatively charged. What happened?"
            options={["The rod gained electrons from the cloth", "The rod gained protons from the cloth", "The rod lost electrons to the cloth", "The cloth gained electrons from the rod"]}
            correct={0}
            explain="Only electrons move when materials are rubbed. Electrons are negative, so the rod became negative by gaining electrons (and the cloth became positive). 'Gained protons' is wrong because protons stay inside the atoms." />
          <WrittenQ num={16} question="Compare electrostatic force and gravitational force. Give one similarity and one difference. (2 marks)"
            model="Similarity: both are non-contact forces that act at a distance and get weaker as the objects move further apart. Difference: electrostatic force can attract or repel (like charges repel, unlike attract), but gravitational force always attracts." />
        </Practice>
        <SelfCheck id="2.1.6" items={[
          "I can explain how rubbing makes an object positive or negative.",
          "I can state the rule: like charges repel, unlike charges attract.",
          "I can describe what affects the size of the gravitational force.",
          "I can compare electrostatic and gravitational forces.",
        ]}/>
        <NotebookLink href={NB} label="Learn it in full: Forces notebook (non-contact forces)"/>
      </DotPoint>

      {/* ---------------- 2.1.8 ---------------- */}
      <DotPoint id="2.1.8" title="Weight force, mass and F = mg" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="core"/>
        <Recap>
          <ul>
            <li><Term def="The amount of matter in an object. Measured in kilograms (kg). It is the same everywhere.">Mass</Term> is the amount of matter in an object. Unit: <strong>kilogram (kg)</strong>. It is the <strong>same everywhere</strong> in the universe. Measured with a balance or scales.</li>
            <li><Term def="The gravitational force pulling an object towards a planet or moon. Measured in newtons (N).">Weight</Term> is the force of gravity on that mass. Unit: <strong>newton (N)</strong>. It <strong>changes</strong> with the strength of gravity. Measured with a force meter.</li>
            <li><strong>W = m × g</strong> (also written F = mg): weight (N) = mass (kg) × gravitational field strength (N/kg).</li>
            <li>On Earth, <strong>g = 9.8 N/kg</strong>. This page uses 9.8 N/kg. Some schools and textbooks round it to 10 N/kg, so always use the value the question gives you.</li>
            <li>Mass must be in kilograms: divide grams by 1000 first (e.g. 250 g = 0.25 kg).</li>
            <li>Common mistake: in everyday talk people say "I weigh 50 kg". In science that is your <strong>mass</strong>; your weight is 50 × 9.8 = 490 N.</li>
          </ul>
          <div style={{ overflowX: "auto" }}>
            <table>
              <thead><tr><th></th><th>Mass</th><th>Weight</th></tr></thead>
              <tbody>
                <tr><td>What it is</td><td>Amount of matter</td><td>Force of gravity on the mass</td></tr>
                <tr><td>Unit</td><td>kilogram (kg)</td><td>newton (N)</td></tr>
                <tr><td>Measured with</td><td>Balance / scales</td><td>Force meter (spring balance)</td></tr>
                <tr><td>On the Moon</td><td>Stays the same</td><td>Smaller</td></tr>
              </tbody>
            </table>
          </div>
        </Recap>
        <WorkedExample title="Weight of a bag of potting mix"
          problem="A bag of potting mix has a mass of 25 kg. Calculate its weight on Earth (g = 9.8 N/kg)."
          steps={[
            "Formula: W = m × g",
            "Substitute: W = 25 kg × 9.8 N/kg",
            "Calculate: W = 245 N",
          ]}
          answer="The weight of the bag is 245 N (its mass is still 25 kg)." />
        <WorkedExample title="Weight when the mass is in grams"
          problem="An apple has a mass of 150 g. Calculate its weight on Earth (g = 9.8 N/kg)."
          steps={[
            "Convert grams to kilograms: 150 g ÷ 1000 = 0.150 kg.",
            "Formula: W = m × g",
            "Substitute: W = 0.150 kg × 9.8 N/kg",
            "Calculate: W = 1.47 N",
          ]}
          answer="The apple's weight is 1.47 N (about 1.5 N). Forgetting to convert would give 1470 N, which is far too big for an apple." />
        <ExamTip>
          For any <strong>calculate</strong> question, write three lines: the formula, the numbers substituted in (with units), and the answer <strong>with its unit</strong>. Marks are often given for each line, so show them even if you can do it in your head.
        </ExamTip>
        <Practice title="Mass, weight and F = mg (use g = 9.8 N/kg)">
          <MCQ num={17} question="What is the correct unit for weight?"
            options={["Newton (N)", "Kilogram (kg)", "Newton per kilogram (N/kg)", "Gram (g)"]}
            correct={0}
            explain="Weight is a force, and all forces are measured in newtons. Kilograms are tempting because of everyday speech, but kg is the unit of mass. N/kg is the unit of g." />
          <MCQ num={18} question="A dog has a mass of 40 kg. What is its weight on Earth?"
            options={["392 N", "40 N", "4.08 N", "49.8 N"]}
            correct={0}
            explain="W = m × g = 40 × 9.8 = 392 N. 4.08 comes from dividing instead of multiplying, and 49.8 comes from adding 40 + 9.8." />
          <MCQ num={19} question="A rock climber hangs still on a rope at an indoor climbing gym. A force meter clipped into the rope shows that her weight is 539 N (g = 9.8 N/kg). What is her MASS?"
            options={["55 kg", "5282.2 kg", "539 kg", "55 N"]}
            correct={0}
            explain="Mass from weight: m = W ÷ g = 539 ÷ 9.8 = 55 kg. 5282.2 kg comes from multiplying 539 × 9.8 instead of dividing. '55 N' has the right number but the wrong unit: mass is measured in kilograms, and newtons are for forces such as weight." />
          <MCQ num={20} question="A bottle of water has a mass of 500 g. What is its weight on Earth?"
            options={["4.9 N", "4900 N", "490 N", "0.49 N"]}
            correct={0}
            explain="Convert first: 500 g = 0.5 kg. W = 0.5 × 9.8 = 4.9 N. 4900 N is what you get if you forget to convert grams to kilograms." />
          <WrittenQ num={21} question="Explain the difference between mass and weight. In your answer, include the unit of each and how each is measured. (3 marks)"
            model="Mass is the amount of matter in an object. It is measured in kilograms (kg) using a balance, and it is the same everywhere. Weight is the force of gravity acting on that mass. It is measured in newtons (N) using a force meter, and it changes depending on the strength of gravity, so the same object weighs less on the Moon than on Earth." />
          <WrittenQ num={22} question="Calculate the weight on Earth of a student with a mass of 62 kg. Show your working. (2 marks)"
            model="W = m × g = 62 kg × 9.8 N/kg = 607.6 N. The student's weight is 607.6 N (about 608 N)." />
        </Practice>
        <SelfCheck id="2.1.8" items={[
          "I can explain the difference between mass and weight.",
          "I can give the units: mass in kg, weight in N, g in N/kg.",
          "I can calculate weight using W = m × g with g = 9.8 N/kg.",
          "I can convert grams to kilograms before calculating.",
        ]}/>
        <NotebookLink href={NB} label="Learn it in full: Forces notebook (mass and weight)"/>
      </DotPoint>

      {/* ---------------- 2.1.9 ---------------- */}
      <DotPoint id="2.1.9" title="F = mg calculations, including other planets and moons" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="important"/>
        <Recap>
          <ul>
            <li>Rearrange W = m × g to find any unknown: <strong>m = W ÷ g</strong> and <strong>g = W ÷ m</strong>.</li>
            <li>Memory trick: cover the one you want in the triangle <strong>W</strong> on top, <strong>m × g</strong> underneath.</li>
            <li>The value of g depends on the planet or moon (its mass and size). Your mass is the same on each; only your weight changes.</li>
            <li>Steps every time: write the formula, substitute with units, give the answer with the correct unit (N for weight, kg for mass, N/kg for g).</li>
          </ul>
          <div style={{ overflowX: "auto" }}>
            <table>
              <thead><tr><th>Place</th><th>g (N/kg)</th><th>Compared with Earth</th></tr></thead>
              <tbody>
                <tr><td>Earth</td><td>9.8</td><td>—</td></tr>
                <tr><td>Moon</td><td>1.6</td><td>about 1/6</td></tr>
                <tr><td>Venus</td><td>8.9</td><td>a bit less</td></tr>
                <tr><td>Saturn</td><td>10.4</td><td>a bit more</td></tr>
                <tr><td>Jupiter</td><td>24.8</td><td>about 2.5 times</td></tr>
              </tbody>
            </table>
          </div>
        </Recap>
        <WorkedExample title="Weight on Jupiter and mass from weight on Venus"
          problem="(a) A camera has a mass of 2.0 kg. Calculate its weight on Jupiter (g = 24.8 N/kg). (b) On Venus (g = 8.9 N/kg) a toolbox weighs 178 N. Calculate its mass."
          steps={[
            "(a) Formula: W = m × g",
            "(a) Substitute: W = 2.0 kg × 24.8 N/kg = 49.6 N",
            "(b) Rearrange to find mass: m = W ÷ g",
            "(b) Substitute: m = 178 N ÷ 8.9 N/kg = 20 kg",
          ]}
          answer="(a) 49.6 N. (b) 20 kg. Check (b): 20 kg × 8.9 N/kg = 178 N, so the answer works. On Earth the same toolbox would still be 20 kg, but would weigh 196 N." />
        <Practice title="Solving for unknowns">
          <MCQ num={23} question="An object weighs 98 N on Earth (g = 9.8 N/kg). What is its mass?"
            options={["10 kg", "98 kg", "960.4 kg", "0.1 kg"]}
            correct={0}
            explain="m = W ÷ g = 98 ÷ 9.8 = 10 kg. 960.4 kg comes from multiplying 98 × 9.8, which treats the weight as if it were a mass." />
          <MCQ num={24} question="A 6.0 kg rock sample weighs 53.4 N on a planet. Using the table of g values, which planet is it on?"
            options={["The Moon", "Saturn", "Venus", "Jupiter"]}
            correct={2}
            explain="g = W ÷ m = 53.4 ÷ 6.0 = 8.9 N/kg, which matches Venus. It is close to Earth's 9.8 N/kg, so a weight a little under 6 × 9.8 = 58.8 N makes sense. Saturn is the tempting wrong answer because its g is also close to Earth's, but it would give 6.0 × 10.4 = 62.4 N, which is more than the Earth weight, not less." />
          <WrittenQ num={25} question="At a science museum, Zara (mass 52 kg) stands on a 'What would I weigh?' screen. It works out her weight from her mass, and one setting shows 'Your weight here: 1289.6 N'. (a) Calculate Zara's weight on Earth (g = 9.8 N/kg). (b) Calculate the value of g the screen used, and use the table to identify which place it was set to. (c) Explain why the screen uses 52 kg for her mass on every setting. (4 marks)"
            model="(a) W = m × g = 52 kg × 9.8 N/kg = 509.6 N. (b) g = W ÷ m = 1289.6 N ÷ 52 kg = 24.8 N/kg, which matches Jupiter in the table. (c) Mass is the amount of matter in Zara's body, and that does not depend on where she is. Only weight, the force of gravity on her mass, changes from place to place, because g is different, so the screen keeps her mass at 52 kg and multiplies it by a different g." />
          <WrittenQ num={26} question="Jack says: 'If I went to Jupiter, my mass would increase because gravity is stronger there.' Evaluate Jack's statement. (2 marks)"
            model="Jack is incorrect. Mass is the amount of matter in his body, which does not change by moving to another planet. What would increase is his weight, because Jupiter's g (24.8 N/kg) is about 2.5 times Earth's (9.8 N/kg), so his weight would be about 2.5 times bigger." />
        </Practice>
        <SelfCheck id="2.1.9" items={[
          "I can rearrange W = m × g to find m or g.",
          "I can calculate weight on another planet or moon from its g value.",
          "I can work out which planet an object is on from its mass and weight.",
          "I can explain why mass stays the same but weight changes between planets.",
        ]}/>
        <NotebookLink href={NB} label="Learn it in full: Forces notebook (weight on other worlds)"/>
      </DotPoint>
    </>
  );
}

/* ============================================================
   SECTION 2.2 — Electromagnets
   ============================================================ */
function Section22({ progress, setProgress }) {
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">2.2 Magnetism</div>
        <h1>Electromagnets</h1>
        <p className="lead">How to build an electromagnet, how to make it stronger, and how to test that fairly.</p>
      </div>

      <DotPoint id="2.2.4" title="Electromagnets: building one and comparing strength" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="important"/>
        <Recap>
          <ul>
            <li>An <Term def="A magnet made by passing an electric current through a coil of wire, usually wrapped around an iron core. It can be switched on and off.">electromagnet</Term> is a coil of <strong>insulated wire</strong> wrapped around an <strong>iron core</strong>, connected to a <strong>power supply</strong> (battery) and a <strong>switch</strong>.</li>
            <li>An electric current flowing through the coil makes a magnetic field. Switch it off and the magnetism (almost) disappears. This on/off control is its big advantage over a permanent magnet.</li>
            <li>Make it <strong>stronger</strong> by: more <strong>turns</strong> of wire in the coil, a bigger <strong>current</strong> (a higher-voltage power supply), and using a <strong>soft iron core</strong> (much stronger than no core, or a core of wood, plastic or aluminium).</li>
            <li>Measure strength by counting how many small steel objects (washers, pins) it holds, or how far away it can move a compass needle.</li>
            <li>Fair test: change one <Term def="The variable you deliberately change in an experiment.">independent variable</Term>, measure the <Term def="The variable you measure to see the effect of the change.">dependent variable</Term>, and keep all other <Term def="Variables kept the same so the test is fair.">controlled variables</Term> the same. Repeat trials and average.</li>
            <li>Uses: scrapyard cranes, electric door locks, electric bells, speakers, MRI machines. Safety: a large current makes the coil hot, so only switch on for short bursts.</li>
          </ul>
        </Recap>
        <ElectromagnetFigure/>
        <WorkedExample title="Planning a fair test on number of turns"
          problem="Plan a fair test to find out whether the number of turns in the coil affects the strength of an electromagnet."
          steps={[
            "Independent variable (what you change): the number of turns, e.g. 10, 20, 30 and 40 turns.",
            "Dependent variable (what you measure): the strength, measured as the number of steel washers the electromagnet holds.",
            "Controlled variables (keep the same): the same battery (same current), the same iron rod as the core, the same type and thickness of wire, the same size washers, and the same time switched on.",
            "Reliability: do three trials for each number of turns and calculate the average number of washers.",
            "Hypothesis: if the number of turns increases, then the electromagnet will hold more washers, because more turns make a stronger magnetic field.",
          ]}
          answer="Change only the number of turns, measure washers held, keep the battery, core, wire, washers and time the same, and repeat three times to average." />
        <ExamTip>
          In <strong>identify the variables</strong> questions, be specific. "The battery" is vague; "the same battery, so the current is the same" earns the mark. Name the dependent variable as something you can actually measure (number of washers held), not just "strength".
        </ExamTip>
        <Practice title="Electromagnets and fair tests">
          <MCQ num={27} question="Priya tests the same electromagnet three times. It holds 12 steel washers in trial 1, 12 in trial 2 and only 4 in trial 3. Afterwards she notices the battery is warm and going flat. What should she do with her results?"
            options={["Average all three trials: (12 + 12 + 4) ÷ 3 ≈ 9 washers", "Treat trial 3 as an outlier, fix the cause (use a fresh battery) and repeat that trial before averaging", "Use only trial 3, because it was the most recent", "Delete all three trials and give up on the investigation"]}
            correct={1}
            explain="Trial 3 is far from the others and has a likely cause (a flat battery gives less current, so a weaker electromagnet). It should be repeated with the cause fixed. Averaging all three is tempting, but including an outlier drags the average down to about 9, which does not represent the electromagnet fairly." />
          <MCQ num={28} question="Ella tests how the current affects the strength of an electromagnet by weighing the mass of iron filings it lifts out of a dish. What is her independent variable?"
            options={["The number of turns of wire", "The current", "The mass of iron filings lifted", "The type of core"]}
            correct={1}
            explain="The independent variable is the one she deliberately changes: the current. The mass of iron filings is what she measures, so that is the dependent variable, not the independent one." />
          <div style={{ overflowX: "auto", margin: "12px 0" }}>
            <table style={{ width: "auto" }}>
              <caption style={{ captionSide: "top", textAlign: "left", fontWeight: 700, marginBottom: 6 }}>Table 1. Effect of current on the strength of an electromagnet (average of three trials)</caption>
              <thead><tr><th>Current (A)</th><th>Washers held</th></tr></thead>
              <tbody>
                <tr><td>0.5</td><td>3</td></tr>
                <tr><td>1.0</td><td>7</td></tr>
                <tr><td>1.5</td><td>10</td></tr>
                <tr><td>2.0</td><td>14</td></tr>
              </tbody>
            </table>
          </div>
          <WrittenQ num={29} question="A student changed the current through an electromagnet and counted the steel washers it held (Table 1). (a) Describe the trend in the results. (b) Identify two variables that should have been controlled. (3 marks)"
            model="(a) As the current increases, the number of washers held increases (from 3 washers at 0.5 A to 14 washers at 2.0 A), so a bigger current makes a stronger electromagnet. (b) Two controlled variables: the number of turns in the coil, and the material and size of the core (for example the same iron rod). Others would also be correct, such as the size of the washers." />
          <WrittenQ num={30} question="Explain why a scrapyard crane uses an electromagnet rather than a permanent magnet to move old cars. (2 marks)"
            model="An electromagnet can be switched on to pick up the steel car and then switched off to drop it in the right place, which a permanent magnet cannot do. Its strength can also be increased by increasing the current, so it can lift very heavy objects." />
        </Practice>
        <SelfCheck id="2.2.4" items={[
          "I can draw and label an electromagnet: coil, iron core, battery, switch.",
          "I can state three ways to make an electromagnet stronger.",
          "I can identify the independent, dependent and controlled variables in an electromagnet test.",
          "I can describe a trend in a table of results.",
        ]}/>
        <NotebookLink href={NB} label="Learn it in full: Forces notebook (electromagnets)"/>
      </DotPoint>
    </>
  );
}

/* ============================================================
   SECTION 2.3 — Simple machines
   ============================================================ */
function Section23({ progress, setProgress }) {
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">2.3 Simple machines</div>
        <h1>Making work easier</h1>
        <p className="lead">Levers, pulleys, ramps and wheels change the size or direction of the force you need, but there is always a trade-off.</p>
      </div>

      {/* ---------------- 2.3.3 ---------------- */}
      <DotPoint id="2.3.3" title="Simple machines change the force needed" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="core"/>
        <Recap>
          <ul>
            <li>A <Term def="A device that changes the size or direction of a force, making a job easier.">simple machine</Term> changes the <strong>size</strong> or the <strong>direction</strong> of a force. The six types: lever, pulley, inclined plane (ramp), wheel and axle, wedge and screw.</li>
            <li><strong>Lever:</strong> a rigid bar that turns about a pivot called the <Term def="The pivot point that a lever turns around.">fulcrum</Term>. The <Term def="The force you apply to a machine.">effort</Term> is the force you apply; the <Term def="The force (often a weight) that the machine moves or overcomes.">load</Term> is the force being moved.</li>
            <li>The <strong>further the effort is from the fulcrum</strong>, the smaller the effort needed. A balanced lever follows: <strong>effort × effort distance = load × load distance</strong>.</li>
            <li><strong>The trade-off:</strong> you use less force, but you must move the effort through a <strong>greater distance</strong>. A machine never gives you extra energy for free.</li>
            <li><strong>Pulleys:</strong> one fixed pulley only changes the <em>direction</em> (pull down to lift up; effort = load). With more rope sections holding up the load, the effort is shared: 2 supporting ropes halve the effort, but you pull twice as much rope.</li>
            <li><strong>Ramp:</strong> a longer, gentler ramp needs a smaller push, but over a longer distance. <strong>Wheel and axle:</strong> turning the big wheel turns the axle with a bigger force (door knob, steering wheel, screwdriver handle).</li>
          </ul>
          <div style={{ overflowX: "auto" }}>
            <table>
              <thead><tr><th>Lever class</th><th>In the middle</th><th>Examples</th></tr></thead>
              <tbody>
                <tr><td>First class</td><td>Fulcrum</td><td>Seesaw, scissors, crowbar</td></tr>
                <tr><td>Second class</td><td>Load</td><td>Bottle opener, nutcracker</td></tr>
                <tr><td>Third class</td><td>Effort</td><td>Tweezers, fishing rod, your forearm</td></tr>
              </tbody>
            </table>
          </div>
        </Recap>
        <LeverFigure/>
        <WorkedExample title="Lever: finding the effort"
          problem="A crowbar is used to lift a rock with a weight of 600 N. The rock is 0.2 m from the fulcrum and the effort is applied 1.2 m from the fulcrum. Calculate the effort needed."
          steps={[
            "Rule: effort × effort distance = load × load distance",
            "Substitute: effort × 1.2 m = 600 N × 0.2 m",
            "Work out the right side: 600 × 0.2 = 120, so effort × 1.2 = 120",
            "Divide: effort = 120 ÷ 1.2 = 100 N",
            "Trade-off: the effort distance is 6 times the load distance, so the hand moves 6 times as far as the rock lifts.",
          ]}
          answer="An effort of 100 N lifts the 600 N rock: six times less force, but the effort end moves six times further." />
        <WorkedExample title="Pulley system: force and distance"
          problem="A builder lifts a 400 N bag of sand using a pulley system with 2 rope sections supporting the load. (a) What effort is needed (ignore friction and the pulleys' weight)? (b) How much rope must be pulled to lift the bag 3 m?"
          steps={[
            "(a) The 2 supporting rope sections share the load equally: effort = 400 N ÷ 2 = 200 N.",
            "(b) Each supporting section must shorten by 3 m, so the builder pulls 2 × 3 m = 6 m of rope.",
          ]}
          answer="(a) 200 N. (b) 6 m of rope. Half the force, but twice the distance." />
        <ExamTip>
          When you <strong>explain</strong> how a simple machine helps, use the words <em>effort</em>, <em>load</em> and <em>distance</em> (and <em>fulcrum</em> for levers), and mention the trade-off. "It makes it easier" alone earns little.
        </ExamTip>
        <Practice title="Levers, pulleys and trade-offs">
          <MCQ num={31} question="On a lever, what is the fulcrum?"
            options={["The pivot point the lever turns around", "The force you apply", "The object being lifted", "The longest part of the bar"]}
            correct={0}
            explain="The fulcrum is the pivot. The force you apply is the effort, and the object being moved is the load: these two are often mixed up with the fulcrum." />
          <MCQ num={32} question="A single fixed pulley sits at the top of a flagpole. What is its main advantage?"
            options={["It halves the force needed to raise the flag", "It changes the direction of the force, so you can pull down to raise the flag", "It means you need less rope", "It doubles your pulling force"]}
            correct={1}
            explain="A single fixed pulley does not reduce the force (effort = load); it lets you pull down, which is easier and more convenient, to lift the flag up. Halving the force needs two supporting rope sections." />
          <MCQ num={33} question="On a seesaw, a child with a weight of 300 N sits 2.0 m from the pivot. How far from the pivot, on the other side, must a 400 N child sit to balance it?"
            options={["1.5 m", "2.7 m", "2.0 m", "1.33 m"]}
            correct={0}
            explain="300 N × 2.0 m = 600, and 600 ÷ 400 N = 1.5 m. The heavier child must sit closer to the pivot. 2.7 m puts the heavier child further out, which would tip the seesaw their way." />
          <MCQ num={34} question="Which statement about simple machines is correct?"
            options={["They reduce both the force needed and the distance moved", "They can reduce the force needed, but the effort must move a greater distance", "They create extra energy", "They only ever change the direction of a force"]}
            correct={1}
            explain="Machines trade force for distance: less force, more distance. They cannot reduce both, and they never create energy. Some machines do only change direction (a single fixed pulley), but not all of them." />
          <WrittenQ num={35} question="At a stage show, a crew member uses a steel bar resting on a block as a lever to raise the edge of a heavy speaker box so a trolley can slide under it. The box pushes down with a load of 1200 N at 0.25 m from the block (the fulcrum). (a) She pushes down 1.5 m from the fulcrum. Calculate the effort needed. (b) She can only push with 150 N. How far from the fulcrum must she push? (c) State the trade-off of pushing further out. (4 marks)"
            model="(a) effort × effort distance = load × load distance, so effort × 1.5 m = 1200 N × 0.25 m = 300. Effort = 300 ÷ 1.5 = 200 N. (b) 150 N × distance = 300, so distance = 300 ÷ 150 = 2.0 m from the fulcrum. (c) Pushing further from the fulcrum needs less force, but her end of the bar must move through a greater distance to lift the box the same height." />
          <WrittenQ num={36} question="A mechanic lifts an 800 N engine using a pulley system with 4 rope sections supporting the engine. Calculate the effort needed (ignore friction) and explain the trade-off involved. (3 marks)"
            model="The load is shared between 4 supporting rope sections, so the effort = 800 N ÷ 4 = 200 N. The trade-off is distance: to lift the engine 1 m, each of the 4 sections must shorten by 1 m, so the mechanic must pull 4 m of rope. Less force is needed, but over a greater distance." />
        </Practice>
        <SelfCheck id="2.3.3" items={[
          "I can label the effort, load and fulcrum on a lever.",
          "I can use effort × effort distance = load × load distance.",
          "I can work out the effort and rope pulled for a pulley system.",
          "I can explain the force–distance trade-off for any simple machine.",
        ]}/>
        <NotebookLink href={NB} label="Learn it in full: Forces notebook (simple machines)"/>
      </DotPoint>

      {/* ---------------- 2.3.5 ---------------- */}
      <DotPoint id="2.3.5" title="Simple machines solving everyday problems" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="know"/>
        <Recap>
          <ul>
            <li>Every simple machine solves a problem by changing a force. Match the job to the machine and say how it helps.</li>
            <li>The <strong>woomera</strong> (spear-thrower) has been used by many Aboriginal peoples for thousands of years. ("Woomera" is a Dharug word from the Sydney area; other language groups have their own names for it.) It works as a lever that makes the thrower's arm effectively longer, so the end holding the spear moves faster and launches the spear further.</li>
          </ul>
          <div style={{ overflowX: "auto" }}>
            <table>
              <thead><tr><th>Everyday problem</th><th>Machine</th><th>How it helps</th></tr></thead>
              <tbody>
                <tr><td>Opening a bottle cap</td><td>Lever (2nd class)</td><td>Small effort on a long handle makes a big force on the cap</td></tr>
                <tr><td>Cutting card</td><td>Levers (scissors)</td><td>Card near the pivot gets the biggest cutting force</td></tr>
                <tr><td>Turning a tap or door knob</td><td>Wheel and axle</td><td>Turning the wide handle turns the narrow spindle with more force</td></tr>
                <tr><td>Raising a flag or blinds</td><td>Pulley</td><td>Pull down to lift up</td></tr>
                <tr><td>Wheelchair access to a building</td><td>Ramp (inclined plane)</td><td>Smaller force over a longer distance instead of a step</td></tr>
                <tr><td>Splitting firewood</td><td>Wedge (axe)</td><td>Turns a downward force into a sideways force that pushes wood apart</td></tr>
                <tr><td>Holding a jar lid tight</td><td>Screw (thread)</td><td>A long spiral lets a small turning force make a tight seal</td></tr>
              </tbody>
            </table>
          </div>
        </Recap>
        <Practice title="Machines in everyday life">
          <MCQ num={37} question="The handle of a garden tap makes a stiff tap easier to turn. Which simple machine is it?"
            options={["Wheel and axle", "Pulley", "Wedge", "Inclined plane"]}
            correct={0}
            explain="The wide handle (the wheel) turns the narrow spindle (the axle), increasing the turning force. A pulley needs a rope or belt, which a tap does not have." />
          <WrittenQ num={38} question="Explain why a longer spanner makes it easier to undo a very tight nut. (2 marks)"
            model="A spanner is a lever with the nut as the pivot (fulcrum). A longer spanner lets you apply the effort further from the pivot, so the same push gives a bigger turning effect on the nut, meaning less effort is needed. The trade-off is that your hand moves through a bigger distance." />
        </Practice>
        <SelfCheck id="2.3.5" items={[
          "I can name the simple machine in everyday tools such as taps, scissors and bottle openers.",
          "I can explain how a chosen machine makes a job easier.",
          "I can describe how a woomera acts as a lever.",
        ]}/>
        <NotebookLink href={NB} label="Learn it in full: Forces notebook (machines in everyday life)"/>
      </DotPoint>
    </>
  );
}

/* ============================================================
   Mount
   ============================================================ */
mountTopicApp({
  year: 7,
  topicTitle: "Forces",
  branch: "physics",
  heroImage: "img/hero.webp",
  strand: "Yearly Exam Revision · Stage 4",
  accent: "orange",
  storageKey: "y7.rev-forces",
  hubHref: "../",
  intro: "Revise the forces part of your Yearly Exam: contact and non-contact forces, force diagrams and net force, mass versus weight with F = mg, electromagnets, and how simple machines make jobs easier. Each dot point has a quick recap, worked examples and practice questions with model answers.",
  glossary: {
    "force": "A push or a pull on an object, measured in newtons (N).",
    "newton (N)": "The unit of force.",
    "contact force": "A force that only acts when objects touch, e.g. friction, tension, air resistance.",
    "non-contact force": "A force that acts at a distance through a field: gravity, magnetic and electrostatic forces.",
    "friction": "A contact force that opposes the motion of surfaces sliding over each other.",
    "air resistance": "A contact force from air particles that opposes the motion of an object moving through air.",
    "support force": "The upward push from a surface on an object resting on it (also called the normal force).",
    "tension": "The pulling force in a stretched rope, string or cable.",
    "upthrust": "The upward force from a liquid or gas on an object in it (buoyancy).",
    "force diagram": "A drawing of an object with labelled arrows showing the size and direction of every force acting on it.",
    "balanced forces": "Forces that cancel out, giving a net force of 0 N; no change in motion.",
    "unbalanced forces": "Forces that do not cancel out; the object speeds up, slows down or changes direction.",
    "net force": "The overall (resultant) force on an object once all forces are combined, given with size and direction.",
    "electrostatic force": "The attraction or repulsion between charged objects. Like charges repel; unlike charges attract.",
    "electron": "A tiny negatively charged particle that can be transferred between materials by rubbing.",
    "gravitational force": "The attractive force between any two objects with mass.",
    "mass": "The amount of matter in an object, measured in kilograms (kg). It is the same everywhere.",
    "weight": "The force of gravity on an object's mass, measured in newtons (N). W = m × g.",
    "gravitational field strength (g)": "The weight force on each kilogram of mass, in N/kg. On Earth g = 9.8 N/kg.",
    "electromagnet": "A coil of insulated wire around an iron core that becomes a magnet when current flows; it can be switched on and off.",
    "independent variable": "The variable you change in an experiment.",
    "dependent variable": "The variable you measure in an experiment.",
    "controlled variable": "A variable kept the same so the test is fair.",
    "simple machine": "A device that changes the size or direction of a force: lever, pulley, inclined plane, wheel and axle, wedge, screw.",
    "lever": "A rigid bar that turns about a fulcrum.",
    "fulcrum": "The pivot point that a lever turns around.",
    "effort": "The force applied to a machine.",
    "load": "The force (often a weight) that a machine moves or overcomes.",
    "pulley": "A wheel with a rope over it, used to change the direction of a force or share a load.",
    "inclined plane": "A ramp: a sloping surface that lets a smaller force move a load over a longer distance.",
    "wheel and axle": "A large wheel fixed to a smaller axle, so turning the wheel turns the axle with a bigger force.",
  },
  sections: [
    {
      id: "2.1",
      label: "Forces and motion",
      accent: "orange",
      blurb: "★★★ Force diagrams, net force, and weight with F = mg. Plus contact vs non-contact and electrostatic vs gravitational forces.",
      points: ["2.1.1", "2.1.3", "2.1.4", "2.1.6", "2.1.8", "2.1.9"],
      render: (p) => <Section21 {...p}/>,
    },
    {
      id: "2.2",
      label: "Electromagnets",
      accent: "amber",
      blurb: "★★ How an electromagnet is built, what makes it stronger, and how to test it fairly.",
      points: ["2.2.4"],
      render: (p) => <Section22 {...p}/>,
    },
    {
      id: "2.3",
      label: "Simple machines",
      accent: "orange",
      blurb: "★★★ Levers, pulleys, ramps and wheels: effort, load, fulcrum and the force–distance trade-off.",
      points: ["2.3.3", "2.3.5"],
      render: (p) => <Section23 {...p}/>,
    },
  ],
});
