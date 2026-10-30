# Year 7 Yearly Exam Revision · WHS Junior Science

Revision site for the Year 7 Science Yearly Exam (NSW syllabus).
Live: https://irvincisneros-png.github.io/year7-yearly-revision/

Each topic page has, for every syllabus dot point: an exam-focus rating (★★★ high value, ★★ important, ★ know it),
a short recap, worked examples revealed step by step, practice questions with model answers,
a self-check list and a link to the matching section of the full Year 7 notebook.

All practice questions and worked examples were written for this site. None are taken from a school exam paper.

## Layout
- `index.html` — year hub (`mountYearHub`)
- one folder per topic: `index.html` + `content.jsx` (source) → `content.js` (generated) + `img/hero.webp`
- `shared/` — the Junior Science React kit (same as the Year 7–10 notebooks) plus `revision.jsx` / `revision.css`
  (ExamFocus, Recap, ExamTip, WorkedExample, Practice, SelfCheck, NotebookLink)

## Editing
Edit the `.jsx` files, then run `node tools/build.js` and commit the generated `.js` too.
CI runs `node tools/build.js --check` and fails if a `.js` file is stale.
Progress and answers are saved in the browser's localStorage under `y7.rev-*` keys.
