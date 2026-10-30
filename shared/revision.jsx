/* Revision building blocks shared by every topic page.
   Loaded after kit.js and before content.js:
     <link rel="stylesheet" href="../../shared/revision.css"/>
     <script src="../../shared/revision.js"></script>

   Every dot point on a revision page follows the same pattern:
     <ExamFocus tier="core"/>        how much this idea matters in the Yearly Exam
     <Recap>…</Recap>                the must-know ideas, short
     <WorkedExample …/>              a solved example, revealed step by step
     <Practice title="…">            original practice questions (kit MCQ / WrittenQ)
     <SelfCheck id="…" items={…}/>   "I can…" checklist, saved on this device
     <NotebookLink href="…"/>        where to learn it in full                     */
const { useState: useStateR, useContext: useContextR } = React;

const TIERS = {
  core:      { stars: "★★★", label: "High value", text: "This idea carries a lot of marks. Know it well and practise it until it feels easy." },
  important: { stars: "★★",  label: "Important",  text: "Expect to be asked about this. Make sure you can explain it in your own words." },
  know:      { stars: "★",   label: "Know it",    text: "Worth a mark or so. Learn the key facts." },
};

function ExamFocus({ tier = "important", children }) {
  const t = TIERS[tier] || TIERS.important;
  return (
    <div className={"exam-focus tier-" + tier} role="note" aria-label={"Exam focus: " + t.label}>
      <span className="ef-stars" aria-hidden="true">{t.stars}</span>
      <div><strong>{t.label}.</strong> {children || t.text}</div>
    </div>
  );
}

function Recap({ title = "Recap: what you need to know", children }) {
  return <div className="callout key recap"><h4>{title}</h4>{children}</div>;
}

function ExamTip({ title = "Exam technique", children }) {
  return <div className="callout tip"><h4>{title}</h4>{children}</div>;
}

/* steps: array of strings or nodes, revealed one at a time */
function WorkedExample({ title, problem, steps = [], answer }) {
  const [shown, setShown] = useStateR(0);
  const all = shown >= steps.length;
  return (
    <div className="worked">
      <div className="worked-head"><span className="kicker">Worked example</span>{title && <h4>{title}</h4>}</div>
      <div className="worked-problem">{problem}</div>
      {shown > 0 && (
        <ol className="worked-steps">
          {steps.slice(0, shown).map((s, i) => <li key={i}>{s}</li>)}
        </ol>
      )}
      {all && answer && <div className="worked-answer"><strong>Answer. </strong>{answer}</div>}
      <div className="worked-actions">
        {!all && <button className="reveal-btn" onClick={() => setShown(n => n + 1)}>{shown === 0 ? "Show the first step" : "Next step"}</button>}
        {!all && steps.length > 1 && <button className="reveal-btn" onClick={() => setShown(steps.length)}>Show all working</button>}
        {shown > 0 && <button className="reveal-btn" onClick={() => setShown(0)}>Hide working</button>}
      </div>
    </div>
  );
}

function Practice({ title = "Practice questions", children }) {
  return (
    <div className="q-group practice">
      <div className="q-group-title"><span className="kicker">Practice</span><h4 style={{ margin: 0 }}>{title}</h4></div>
      {children}
    </div>
  );
}

/* id must be unique on the page; ticks are saved under the topic's storage key */
function SelfCheck({ id, items = [] }) {
  const { skey } = useContextR(TopicContext);
  const [ticks, setTicks] = useLocalStorage((skey || "rev") + ".selfcheck." + id, {});
  const n = items.filter((_, i) => ticks[i]).length;
  return (
    <div className="selfcheck">
      <div className="q-group-title"><span className="kicker">Self-check</span><h4 style={{ margin: 0 }}>Can you do these? <span className="muted" style={{ fontWeight: 500, fontSize: "0.85rem" }}>({n} of {items.length})</span></h4></div>
      <ul>
        {items.map((it, i) => (
          <li key={i}>
            <label>
              <input type="checkbox" checked={!!ticks[i]} onChange={() => setTicks(t => ({ ...t, [i]: !t[i] }))}/>
              <span>{it}</span>
            </label>
          </li>
        ))}
      </ul>
      {items.length > 0 && n === items.length && <p className="selfcheck-done">Nice. If you could do all of these without notes, you are ready for this part of the exam.</p>}
    </div>
  );
}

function NotebookLink({ href, label = "Learn it in full in the notebook" }) {
  return (
    <a className="nb-link" href={href} target="_blank" rel="noopener">
      <IconBook size={16}/><span>{label}</span><IconArrow size={14} sw={2.5}/>
    </a>
  );
}

Object.assign(window, { ExamFocus, Recap, ExamTip, WorkedExample, Practice, SelfCheck, NotebookLink });
