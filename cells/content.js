/* Generated from content.jsx by tools/build.js. Edit the .jsx, not this file. */
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* global React, DotPoint, Callout, Figure, Term, MCQ, WrittenQ, QGroup, Interactive,
   Slider, SegToggle, Stat, Reveal, FlipCard, MatchBuckets, Ring, mountTopicApp,
   ExamFocus, Recap, ExamTip, WorkedExample, Practice, SelfCheck, NotebookLink */
var _React = React,
  useStateC = _React.useState;
var NB = "https://irvincisneros-png.github.io/Year-7/cells-classification/";

/* ============================================================
   SHARED FIGURE PARTS
   ============================================================ */
var svgText = {
  fontFamily: "var(--font-body)",
  fontSize: 13,
  fill: "var(--ink)"
};
function Leader(_ref) {
  var x1 = _ref.x1,
    y1 = _ref.y1,
    x2 = _ref.x2,
    y2 = _ref.y2;
  return /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("line", {
    x1: x1,
    y1: y1,
    x2: x2,
    y2: y2,
    stroke: "var(--ink-muted)",
    strokeWidth: "1.2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: x2,
    cy: y2,
    r: "2.2",
    fill: "var(--ink)"
  }));
}
function Mito(_ref2) {
  var cx = _ref2.cx,
    cy = _ref2.cy,
    _ref2$rx = _ref2.rx,
    rx = _ref2$rx === void 0 ? 16 : _ref2$rx,
    _ref2$ry = _ref2.ry,
    ry = _ref2$ry === void 0 ? 8 : _ref2$ry,
    _ref2$rot = _ref2.rot,
    rot = _ref2$rot === void 0 ? 0 : _ref2$rot;
  var pts = [];
  var n = 6;
  for (var i = 0; i <= n; i++) {
    var x = cx - rx * 0.7 + i * (rx * 1.4) / n;
    var y = cy + (i % 2 === 0 ? -ry * 0.55 : ry * 0.55);
    pts.push(x.toFixed(1) + "," + y.toFixed(1));
  }
  return /*#__PURE__*/React.createElement("g", {
    transform: "rotate(".concat(rot, " ").concat(cx, " ").concat(cy, ")")
  }, /*#__PURE__*/React.createElement("ellipse", {
    cx: cx,
    cy: cy,
    rx: rx,
    ry: ry,
    fill: "var(--orange)",
    fillOpacity: "0.35",
    stroke: "var(--orange)",
    strokeWidth: "1.4"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: pts.join(" "),
    fill: "none",
    stroke: "var(--orange)",
    strokeWidth: "1.1"
  }));
}
function Chloro(_ref3) {
  var cx = _ref3.cx,
    cy = _ref3.cy,
    _ref3$vertical = _ref3.vertical,
    vertical = _ref3$vertical === void 0 ? false : _ref3$vertical;
  var rx = vertical ? 7 : 13,
    ry = vertical ? 13 : 7;
  var lines = [-6, 0, 6].map(function (d) {
    return vertical ? /*#__PURE__*/React.createElement("line", {
      key: d,
      x1: cx - 3.5,
      y1: cy + d,
      x2: cx + 3.5,
      y2: cy + d,
      stroke: "var(--ink)",
      strokeOpacity: "0.45",
      strokeWidth: "1.3"
    }) : /*#__PURE__*/React.createElement("line", {
      key: d,
      x1: cx + d,
      y1: cy - 3.5,
      x2: cx + d,
      y2: cy + 3.5,
      stroke: "var(--ink)",
      strokeOpacity: "0.45",
      strokeWidth: "1.3"
    });
  });
  return /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("ellipse", {
    cx: cx,
    cy: cy,
    rx: rx,
    ry: ry,
    fill: "var(--green)",
    fillOpacity: "0.55",
    stroke: "var(--green)",
    strokeWidth: "1.4"
  }), lines);
}

/* A typical plant cell (e.g. from a leaf). letters=true swaps names for P–V. */
var PLANT_LABELS = [{
  t: "Cell wall",
  y: 30,
  l: [252, 26, 227, 30]
}, {
  t: "Cell membrane",
  y: 62,
  l: [252, 58, 222, 64]
}, {
  t: "Chloroplast",
  y: 94,
  l: [252, 90, 211, 92]
}, {
  t: "Large vacuole",
  y: 126,
  l: [252, 122, 178, 126]
}, {
  t: "Cytoplasm",
  y: 158,
  l: [252, 154, 214, 168]
}, {
  t: "Mitochondrion",
  y: 190,
  l: [252, 186, 209, 186]
}, {
  t: "Nucleus",
  y: 222,
  l: [252, 218, 145, 216]
}];
function PlantCellSVG(_ref4) {
  var _ref4$letters = _ref4.letters,
    letters = _ref4$letters === void 0 ? false : _ref4$letters;
  var aria = letters ? "Diagram of a plant cell with seven structures labelled P to V. P is the thick outer layer. Q is the thin layer just inside it. R is a green oval. S is the large central sac. T is the fluid around the organelles. U is a small sausage-shaped organelle with folds. V is the round structure near the bottom edge." : "Labelled diagram of a typical plant cell: a box-shaped cell with a thick cell wall outside a thin cell membrane, a large central vacuole, green chloroplasts around the edge, mitochondria, cytoplasm and a nucleus pushed to the side by the vacuole.";
  return /*#__PURE__*/React.createElement("svg", {
    role: "img",
    "aria-label": aria,
    width: "100%",
    viewBox: "0 0 360 250",
    style: {
      maxWidth: 520,
      display: "block",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("rect", {
    x: "28",
    y: "18",
    width: "204",
    height: "224",
    rx: "10",
    fill: "var(--amber)",
    fillOpacity: "0.35",
    stroke: "var(--ink)",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "38",
    y: "28",
    width: "184",
    height: "204",
    rx: "6",
    fill: "var(--card)",
    stroke: "var(--ink)",
    strokeWidth: "1.2"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "38",
    y: "28",
    width: "184",
    height: "204",
    rx: "6",
    fill: "var(--accent)",
    fillOpacity: "0.10"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "72",
    y: "62",
    width: "116",
    height: "136",
    rx: "28",
    fill: "var(--blue)",
    fillOpacity: "0.20",
    stroke: "var(--blue)",
    strokeWidth: "1.4"
  }), /*#__PURE__*/React.createElement(Chloro, {
    cx: 100,
    cy: 45
  }), /*#__PURE__*/React.createElement(Chloro, {
    cx: 150,
    cy: 45
  }), /*#__PURE__*/React.createElement(Chloro, {
    cx: 55,
    cy: 100,
    vertical: true
  }), /*#__PURE__*/React.createElement(Chloro, {
    cx: 55,
    cy: 150,
    vertical: true
  }), /*#__PURE__*/React.createElement(Chloro, {
    cx: 85,
    cy: 215
  }), /*#__PURE__*/React.createElement(Chloro, {
    cx: 205,
    cy: 90,
    vertical: true
  }), /*#__PURE__*/React.createElement(Chloro, {
    cx: 205,
    cy: 145,
    vertical: true
  }), /*#__PURE__*/React.createElement(Mito, {
    cx: 198,
    cy: 45,
    rx: 9,
    ry: 4.5
  }), /*#__PURE__*/React.createElement(Mito, {
    cx: 205,
    cy: 186,
    rx: 9,
    ry: 4.5,
    rot: 90
  }), /*#__PURE__*/React.createElement(Mito, {
    cx: 55,
    cy: 204,
    rx: 9,
    ry: 4.5,
    rot: 90
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "130",
    cy: "215",
    r: "15",
    fill: "var(--purple)",
    fillOpacity: "0.30",
    stroke: "var(--purple)",
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "134",
    cy: "213",
    r: "5",
    fill: "var(--purple)",
    fillOpacity: "0.75"
  }), PLANT_LABELS.map(function (L, i) {
    return /*#__PURE__*/React.createElement("g", {
      key: L.t
    }, /*#__PURE__*/React.createElement(Leader, {
      x1: L.l[0],
      y1: L.l[1],
      x2: L.l[2],
      y2: L.l[3]
    }), /*#__PURE__*/React.createElement("text", {
      x: "256",
      y: L.y,
      style: letters ? _objectSpread(_objectSpread({}, svgText), {}, {
        fontWeight: 700,
        fontSize: 15
      }) : svgText
    }, letters ? String.fromCharCode(80 + i) : L.t));
  }));
}

/* A typical animal cell (generic diagram). */
function AnimalCellSVG() {
  var ribos = [[172, 72], [180, 88], [200, 108], [78, 135], [160, 182], [112, 58], [208, 128], [70, 110], [125, 190], [92, 152]];
  return /*#__PURE__*/React.createElement("svg", {
    role: "img",
    "aria-label": "Labelled diagram of a typical animal cell: an irregular rounded shape with a thin cell membrane on the outside, cytoplasm, a central nucleus with a darker nucleolus, sausage-shaped mitochondria and tiny dot-like ribosomes. There is no cell wall, no chloroplasts and no large vacuole.",
    width: "100%",
    viewBox: "0 0 360 240",
    style: {
      maxWidth: 520,
      display: "block",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 140 30 C 196 28, 236 64, 233 118 C 230 172, 196 210, 140 210 C 84 210, 46 176, 46 120 C 46 66, 86 32, 140 30 Z",
    fill: "var(--card)",
    stroke: "var(--ink)",
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 140 30 C 196 28, 236 64, 233 118 C 230 172, 196 210, 140 210 C 84 210, 46 176, 46 120 C 46 66, 86 32, 140 30 Z",
    fill: "var(--accent)",
    fillOpacity: "0.12"
  }), ribos.map(function (_ref5, i) {
    var _ref6 = _slicedToArray(_ref5, 2),
      x = _ref6[0],
      y = _ref6[1];
    return /*#__PURE__*/React.createElement("circle", {
      key: i,
      cx: x,
      cy: y,
      r: "2.3",
      fill: "var(--ink)",
      fillOpacity: "0.7"
    });
  }), /*#__PURE__*/React.createElement(Mito, {
    cx: 195,
    cy: 158,
    rot: -25
  }), /*#__PURE__*/React.createElement(Mito, {
    cx: 85,
    cy: 85,
    rot: 35
  }), /*#__PURE__*/React.createElement(Mito, {
    cx: 98,
    cy: 172,
    rot: 10
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "130",
    cy: "115",
    r: "30",
    fill: "var(--purple)",
    fillOpacity: "0.28",
    stroke: "var(--purple)",
    strokeWidth: "1.8"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "137",
    cy: "110",
    r: "9",
    fill: "var(--purple)",
    fillOpacity: "0.75"
  }), /*#__PURE__*/React.createElement(Leader, {
    x1: 252,
    y1: 36,
    x2: 210,
    y2: 52
  }), /*#__PURE__*/React.createElement("text", {
    x: "256",
    y: "40",
    style: svgText
  }, "Cell membrane"), /*#__PURE__*/React.createElement(Leader, {
    x1: 252,
    y1: 81,
    x2: 158,
    y2: 104
  }), /*#__PURE__*/React.createElement("text", {
    x: "256",
    y: "85",
    style: svgText
  }, "Nucleus"), /*#__PURE__*/React.createElement(Leader, {
    x1: 252,
    y1: 126,
    x2: 215,
    y2: 142
  }), /*#__PURE__*/React.createElement("text", {
    x: "256",
    y: "130",
    style: svgText
  }, "Cytoplasm"), /*#__PURE__*/React.createElement(Leader, {
    x1: 252,
    y1: 171,
    x2: 210,
    y2: 161
  }), /*#__PURE__*/React.createElement("text", {
    x: "256",
    y: "175",
    style: svgText
  }, "Mitochondrion"), /*#__PURE__*/React.createElement(Leader, {
    x1: 252,
    y1: 216,
    x2: 162,
    y2: 184
  }), /*#__PURE__*/React.createElement("text", {
    x: "256",
    y: "220",
    style: svgText
  }, "Ribosomes"));
}

/* ============================================================
   BUSHLAND TREE KEY (3.1.6)
   ============================================================ */
var TREE_KEY = {
  1: {
    a: ["Has flat leaves", 2],
    b: ["No flat leaves; thin, drooping green twigs with tiny leaves in rings around them", "Black she-oak"]
  },
  2: {
    a: ["Each leaf is divided into many tiny leaflets (feathery)", "Black wattle"],
    b: ["Each leaf is a single, undivided blade", 3]
  },
  3: {
    a: ["Leaf edges have sharp, saw-like teeth; old flower spikes become woody cones", "Old man banksia"],
    b: ["Leaf edges are smooth; no woody cones", 4]
  },
  4: {
    a: ["Glossy oval leaves in opposite pairs; fruit is a soft, fleshy berry", "Lilly pilly"],
    b: ["Long, narrow leaves that hang down; fruit is a hard, woody gumnut", 5]
  },
  5: {
    a: ["Smooth, cream bark covered in dark zigzag 'scribble' lines", "Scribbly gum"],
    b: ["Smooth bark with patches of grey, cream and pink (spotted)", "Spotted gum"]
  }
};
function TreeKeyTable() {
  var go = function go(v) {
    return typeof v === "number" ? "Go to " + v : /*#__PURE__*/React.createElement("strong", null, v);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    "aria-label": "Dichotomous key to some native trees of coastal NSW bushland"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    scope: "col"
  }, "Step"), /*#__PURE__*/React.createElement("th", {
    scope: "col"
  }, "Feature"), /*#__PURE__*/React.createElement("th", {
    scope: "col"
  }, "Then\u2026"))), /*#__PURE__*/React.createElement("tbody", null, Object.keys(TREE_KEY).map(function (k) {
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: k
    }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, k, "a"), /*#__PURE__*/React.createElement("td", null, TREE_KEY[k].a[0]), /*#__PURE__*/React.createElement("td", null, go(TREE_KEY[k].a[1]))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, k, "b"), /*#__PURE__*/React.createElement("td", null, TREE_KEY[k].b[0]), /*#__PURE__*/React.createElement("td", null, go(TREE_KEY[k].b[1]))));
  }))));
}
var SPECIMENS = [{
  id: "s1",
  label: "Sample 1",
  desc: "A tall tree. Its long, narrow leaves hang down and have smooth edges. Hard, woody gumnuts. The smooth, cream bark is covered in dark zigzag lines.",
  answer: "Scribbly gum"
}, {
  id: "s2",
  label: "Sample 2",
  desc: "A small tree with flat, glossy, oval leaves in opposite pairs along the twig. The leaf edges are smooth. Bunches of soft pink-purple berries.",
  answer: "Lilly pilly"
}, {
  id: "s3",
  label: "Sample 3",
  desc: "A tree with no flat leaves at all. Its thin, drooping green twigs have tiny leaves in rings around them, so the tree looks like it has pine needles.",
  answer: "Black she-oak"
}];
function TreeKeyWalker() {
  var _useStateC = useStateC("s1"),
    _useStateC2 = _slicedToArray(_useStateC, 2),
    spec = _useStateC2[0],
    setSpec = _useStateC2[1];
  var _useStateC3 = useStateC(1),
    _useStateC4 = _slicedToArray(_useStateC3, 2),
    step = _useStateC4[0],
    setStep = _useStateC4[1];
  var _useStateC5 = useStateC([]),
    _useStateC6 = _slicedToArray(_useStateC5, 2),
    path = _useStateC6[0],
    setPath = _useStateC6[1];
  var _useStateC7 = useStateC(null),
    _useStateC8 = _slicedToArray(_useStateC7, 2),
    result = _useStateC8[0],
    setResult = _useStateC8[1];
  var sp = SPECIMENS.find(function (s) {
    return s.id === spec;
  });
  var reset = function reset() {
    setStep(1);
    setPath([]);
    setResult(null);
  };
  var choose = function choose(side) {
    var _TREE_KEY$step$side = _slicedToArray(TREE_KEY[step][side], 2),
      next = _TREE_KEY$step$side[1];
    var np = [].concat(_toConsumableArray(path), [step + side]);
    setPath(np);
    if (typeof next === "number") setStep(next);else setResult(next);
  };
  var ok = result && result === sp.answer;
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Use the bushland tree key",
    subtitle: "Pick a sample, read its description, then choose a or b at each step.",
    takeaway: "A key only works if you read both choices at every step and match them to what you can actually see. One careless choice early on sends you to the wrong tree."
  }, /*#__PURE__*/React.createElement(SegToggle, {
    options: SPECIMENS.map(function (s) {
      return {
        value: s.id,
        label: s.label
      };
    }),
    value: spec,
    onChange: function onChange(v) {
      setSpec(v);
      reset();
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "12px 0"
    }
  }, /*#__PURE__*/React.createElement("strong", null, sp.label, ":"), " ", sp.desc), !result && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "kicker",
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.75rem",
      color: "var(--ink-muted)",
      marginBottom: 6
    }
  }, "Step ", step), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, ["a", "b"].map(function (side) {
    return /*#__PURE__*/React.createElement("button", {
      key: side,
      type: "button",
      className: "quiz-opt",
      onClick: function onClick() {
        return choose(side);
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        opacity: 0.6,
        minWidth: 22
      }
    }, step, side), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, TREE_KEY[step][side][0]));
  }))), result && /*#__PURE__*/React.createElement("div", {
    className: "quiz-feedback",
    role: "status",
    "aria-live": "polite"
  }, ok ? "Correct. " : "Not quite. ", "You reached ", /*#__PURE__*/React.createElement("strong", null, result), " by the path ", path.join(" → "), ".", !ok && " Re-read the description and check each choice carefully."), path.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "reveal-btn",
    onClick: reset
  }, "Start again")));
}

/* ============================================================
   SECTION 3.1  CLASSIFICATION
   ============================================================ */
function Section31(_ref7) {
  var progress = _ref7.progress,
    setProgress = _ref7.setProgress;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "3.1 Classification"), /*#__PURE__*/React.createElement("h1", null, "Sorting and naming living things"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "How scientists decide what is alive, how they group and name organisms, and how to use a dichotomous key.")), /*#__PURE__*/React.createElement(DotPoint, {
    id: "3.1.1",
    title: "Characteristics of living things",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "important"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Living things show all seven characteristics, remembered as ", /*#__PURE__*/React.createElement(Term, {
    def: "Movement, Reproduction, Sensitivity, Growth, Respiration, Excretion, Nutrition"
  }, "MRS GREN"), ": ", /*#__PURE__*/React.createElement("strong", null, "M"), "ovement, ", /*#__PURE__*/React.createElement("strong", null, "R"), "eproduction, ", /*#__PURE__*/React.createElement("strong", null, "S"), "ensitivity, ", /*#__PURE__*/React.createElement("strong", null, "G"), "rowth, ", /*#__PURE__*/React.createElement("strong", null, "R"), "espiration, ", /*#__PURE__*/React.createElement("strong", null, "E"), "xcretion, ", /*#__PURE__*/React.createElement("strong", null, "N"), "utrition."), /*#__PURE__*/React.createElement("li", null, "Non-living things can show one or two of these (a fire spreads and uses oxygen), but never all seven."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Term, {
    def: "The chemical process in cells that releases energy from food (glucose)"
  }, "Respiration"), " is ", /*#__PURE__*/React.createElement("em", null, "not"), " breathing. It is a chemical reaction inside cells that releases energy from glucose."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Term, {
    def: "Removing waste substances made by the body's cells, such as carbon dioxide and urea"
  }, "Excretion"), " means removing wastes made by cells (carbon dioxide, urea). Getting rid of undigested food (faeces) is called egestion and is not excretion."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Term, {
    def: "Detecting and responding to changes (stimuli) in the surroundings"
  }, "Sensitivity"), " means detecting and responding to a stimulus (light, touch, heat, sound)."), /*#__PURE__*/React.createElement("li", null, "Plants move too, just slowly: flowers open in the morning and close at night, and the tendrils of climbing plants coil around supports."), /*#__PURE__*/React.createElement("li", null, "\"Dead\" and \"non-living\" are different. A fallen log was once living; a rock never was."))), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Is a bushfire alive?",
    problem: "A bushfire spreads across a hillside, gets bigger, uses up oxygen and gives off carbon dioxide. A student says this means the fire is alive. Explain whether the student is correct. (3 marks)",
    steps: ["Start from the rule: to be living, something must show all seven MRS GREN characteristics.", "Credit what the fire seems to do: it moves, it gets bigger, and it uses oxygen and releases carbon dioxide (which looks like respiration and excretion).", "Find characteristics it does not have. A fire is not made of cells, so it cannot carry out respiration in cells, grow by making new cells, or reproduce to make offspring. It does not detect and respond to stimuli (no sensitivity).", "Finish with a clear judgement linked back to the rule."],
    answer: "The student is not correct. A bushfire seems to show movement and growth, and it uses oxygen and gives off carbon dioxide. However, it is not made of cells, so it cannot reproduce to make offspring or show sensitivity by detecting and responding to stimuli. Because it does not show all seven characteristics of living things, it is non-living."
  }), /*#__PURE__*/React.createElement(ExamTip, null, "\"Explain\" questions want a reason, not just a list. Name the characteristic, say what the object does or does not do, then link it back to the rule that living things must show all seven."), /*#__PURE__*/React.createElement(Practice, {
    title: "Characteristics of living things"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 1,
    question: "Which of these is an example of excretion?",
    options: ["A lizard getting rid of faeces", "A fish releasing ammonia (a waste made by its cells) through its gills", "A seed soaking up water before it sprouts", "A dog panting to cool down"],
    correct: 1,
    explain: "Ammonia is a waste made by the fish's cells, so removing it is excretion. Faeces is the tempting wrong answer: it is undigested food that never entered the body's cells, so getting rid of it is egestion, not excretion."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 2,
    question: "Match each observation to the characteristic of living things it shows. P: a bracket fungus on a fallen log breaks down the rotting wood and absorbs the nutrients. Q: a kangaroo's kidneys remove urea, a waste made by its cells, in its urine. R: a wombat walks out of its burrow and across a paddock to graze.",
    options: ["P nutrition, Q excretion, R movement", "P respiration, Q excretion, R movement", "P nutrition, Q movement, R excretion", "P excretion, Q nutrition, R sensitivity"],
    correct: 0,
    explain: "The fungus takes in nutrients from the wood, which is nutrition. Urea is a waste made by the kangaroo's cells, so removing it is excretion. The wombat changes position, which is movement. 'Respiration' for P is tempting because the fungus uses the nutrients for energy, but the observation describes taking food in, not the energy-releasing reaction inside cells."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 3,
    question: "In biology, what does respiration mean?",
    options: ["Breathing air in and out of the lungs", "A chemical process in cells that releases energy from glucose", "Taking in food for growth", "Getting rid of carbon dioxide through the lungs"],
    correct: 1,
    explain: "Respiration happens inside every living cell, even in plants and bacteria that have no lungs. Breathing is the tempting answer, but breathing only moves air in and out; it is not the energy-releasing reaction."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 4,
    question: "A delivery robot can move along footpaths, detect obstacles with a camera and recharge its battery from a power point. Use the characteristics of living things to explain why the robot is non-living. (3 marks)",
    model: "The robot shows movement, and its camera lets it respond to obstacles, which looks like sensitivity. However, it cannot reproduce to make new robots, it does not grow, and it does not carry out respiration in cells to release energy from food (it uses stored electricity). Living things must show all seven characteristics, so the robot is non-living."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "3.1.1",
    items: ["I can list all seven MRS GREN characteristics from memory.", "I can explain the difference between respiration and breathing.", "I can explain the difference between excretion and egestion.", "I can use MRS GREN to explain why something like fire or a machine is non-living."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#3.1",
    label: "Learn it in full: Classification of living things"
  })), /*#__PURE__*/React.createElement(DotPoint, {
    id: "3.1.3",
    title: "Classification levels and scientific names",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "important"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Living things are sorted into ranks from broadest to most specific: ", /*#__PURE__*/React.createElement("strong", null, "Kingdom \u2192 Phylum \u2192 Class \u2192 Order \u2192 Family \u2192 Genus \u2192 Species"), ". Memory hook: ", /*#__PURE__*/React.createElement("em", null, "Kings Play Chess On Fine Green Silk"), "."), /*#__PURE__*/React.createElement("li", null, "Moving down the ranks, each group holds fewer kinds of organisms, and they share more features, so they are more closely related."), /*#__PURE__*/React.createElement("li", null, "A ", /*#__PURE__*/React.createElement(Term, {
    def: "A group of organisms that can breed together to produce fertile offspring"
  }, "species"), " is a group that can breed together and produce fertile offspring."), /*#__PURE__*/React.createElement("li", null, "The ", /*#__PURE__*/React.createElement(Term, {
    def: "The two-part scientific name of a species: Genus + species"
  }, "binomial name"), " has two parts: ", /*#__PURE__*/React.createElement("strong", null, "Genus"), " (capital first letter) + ", /*#__PURE__*/React.createElement("strong", null, "species"), " (all lower case). Typed, it is in ", /*#__PURE__*/React.createElement("em", null, "italics"), "; handwritten, each word is ", /*#__PURE__*/React.createElement("u", null, "underlined"), ". Example: ", /*#__PURE__*/React.createElement("em", null, "Dacelo novaeguineae"), " (laughing kookaburra)."), /*#__PURE__*/React.createElement("li", null, "Scientific names are the same in every country, while common names change from place to place.")), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    "aria-label": "Classification of the eastern grey kangaroo"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    scope: "col"
  }, "Rank"), /*#__PURE__*/React.createElement("th", {
    scope: "col"
  }, "Eastern grey kangaroo"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Kingdom"), /*#__PURE__*/React.createElement("td", null, "Animalia")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Phylum"), /*#__PURE__*/React.createElement("td", null, "Chordata")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Class"), /*#__PURE__*/React.createElement("td", null, "Mammalia")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Order"), /*#__PURE__*/React.createElement("td", null, "Diprotodontia")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Family"), /*#__PURE__*/React.createElement("td", null, "Macropodidae")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Genus"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("em", null, "Macropus"))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Species"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("em", null, "Macropus giganteus"))))))), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Fixing scientific names",
    problem: /*#__PURE__*/React.createElement("span", null, "A student typed these names in a report: (1) \"the waratah, ", /*#__PURE__*/React.createElement("em", null, "Telopea Speciosissima"), "\" and (2) \"the platypus, ornithorhynchus anatinus\". Identify the errors and write each name correctly."),
    steps: ["Check the genus (first word): it must start with a capital. Telopea is right. ornithorhynchus is wrong: it needs a capital O.", "Check the species (second word): it must be all lower case. Speciosissima is wrong: it needs a lower-case s. anatinus is right.", "Check the formatting: typed names must be in italics. Name 1 is in italics; name 2 is not."],
    answer: /*#__PURE__*/React.createElement("span", null, "(1) ", /*#__PURE__*/React.createElement("em", null, "Telopea speciosissima"), ": the species name should start with a lower-case letter. (2) ", /*#__PURE__*/React.createElement("em", null, "Ornithorhynchus anatinus"), ": the genus needs a capital letter and the whole name must be in italics (or underlined if handwritten).")
  }), /*#__PURE__*/React.createElement(Practice, {
    title: "Classification and scientific names"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 5,
    question: /*#__PURE__*/React.createElement("span", null, "Lemon-scented gum is ", /*#__PURE__*/React.createElement("em", null, "Corymbia citriodora"), " and spotted gum is ", /*#__PURE__*/React.createElement("em", null, "Corymbia maculata"), ". What does the shared first word of their names tell you?"),
    options: ["They are the same species and can breed to produce fertile offspring", "They belong to the same genus, so they are closely related", "They were named by the same scientist", "They have the same common name in every country"],
    correct: 1,
    explain: "The first word of a binomial name is the genus, so both trees are in the genus Corymbia and are closely related. 'Same species' is tempting, but the second words are different (citriodora and maculata), so they are two different species."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 6,
    question: /*#__PURE__*/React.createElement("span", null, "Which two animals are most closely related? Eastern grey kangaroo (", /*#__PURE__*/React.createElement("em", null, "Macropus giganteus"), "), western grey kangaroo (", /*#__PURE__*/React.createElement("em", null, "Macropus fuliginosus"), "), common wombat (", /*#__PURE__*/React.createElement("em", null, "Vombatus ursinus"), "), Tasmanian devil (", /*#__PURE__*/React.createElement("em", null, "Sarcophilus harrisii"), ")."),
    options: ["Eastern grey kangaroo and common wombat", "Eastern grey kangaroo and western grey kangaroo", "Common wombat and Tasmanian devil", "Western grey kangaroo and Tasmanian devil"],
    correct: 1,
    explain: "Both kangaroos share the genus Macropus, the lowest rank listed, so they share the most features. Kangaroos and wombats are in the same order, which is a broader group, so they are less closely related."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 7,
    question: "Two beetles belong to the same family. Which rank must they also share?",
    options: ["Genus", "Species", "Order", "None of the other ranks"],
    correct: 2,
    explain: "Every family sits inside one order, so organisms in the same family are always in the same order (and class, phylum and kingdom). Genus is the tempting answer, but a family can contain many different genera, so they might not share a genus."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 8,
    question: /*#__PURE__*/React.createElement("span", null, "In Australia, \"magpie\" means ", /*#__PURE__*/React.createElement("em", null, "Gymnorhina tibicen"), ". In England, \"magpie\" means ", /*#__PURE__*/React.createElement("em", null, "Pica pica"), ", a bird from a different family. Use this example to explain why scientists use binomial names. (2 marks)"),
    model: "Common names can mean different organisms in different places. The same word 'magpie' is used for two different birds, so scientists could get confused about which animal is being studied. A binomial name is unique to one species and is used by scientists in every country, so everyone knows exactly which organism is meant."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "3.1.3",
    items: ["I can list the seven ranks from kingdom to species in order.", "I can write a scientific name with a capital genus, lower-case species, in italics or underlined.", "I can use shared ranks to decide which organisms are most closely related.", "I can explain why scientific names are better than common names."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#3.1",
    label: "Learn it in full: Binomial naming and the classification hierarchy"
  })), /*#__PURE__*/React.createElement(DotPoint, {
    id: "3.1.6",
    title: "Using dichotomous keys to identify Australian organisms",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "core"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "A ", /*#__PURE__*/React.createElement(Term, {
    def: "An identification tool made of pairs of statements; you choose one statement at each step until you reach a name"
  }, "dichotomous key"), " gives two choices at each step (a ", /*#__PURE__*/React.createElement("em", null, "couplet"), "). Pick the one that matches the organism and follow it to the next step or to a name."), /*#__PURE__*/React.createElement("li", null, "Always read ", /*#__PURE__*/React.createElement("strong", null, "both"), " statements before choosing. One wrong choice leads to the wrong organism."), /*#__PURE__*/React.createElement("li", null, "Good couplets use features you can see, count or measure (leaf edges smooth or toothed, type of fruit, number of wings). They avoid vague words like \"big\", \"pretty\" or \"fast\", and avoid features that change, like behaviour or whether a plant is flowering today."), /*#__PURE__*/React.createElement("li", null, "A key for ", /*#__PURE__*/React.createElement("em", null, "n"), " organisms needs ", /*#__PURE__*/React.createElement("strong", null, /*#__PURE__*/React.createElement("em", null, "n"), " \u2212 1 couplets"), "."), /*#__PURE__*/React.createElement("li", null, "Keys can be written as numbered statements (like the table below) or drawn as a branching diagram.")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "10px 0 4px"
    }
  }, /*#__PURE__*/React.createElement("strong", null, "Key to some native trees of coastal NSW bushland"), " (simplified for this page)"), /*#__PURE__*/React.createElement(TreeKeyTable, null)), /*#__PURE__*/React.createElement(TreeKeyWalker, null), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Identifying a bushland tree",
    problem: "On a bushwalk, a student finds a tree with long, narrow leaves that hang down and have smooth edges. It has hard, woody gumnuts, and its smooth bark has patches of grey, cream and pink. Use the bushland tree key to identify it and show the path you took.",
    steps: ["Step 1: the tree has flat leaves, so choose 1a and go to step 2.", "Step 2: each leaf is a single blade, not divided into tiny leaflets, so choose 2b and go to step 3.", "Step 3: the leaf edges are smooth and there are no woody cones, so choose 3b and go to step 4.", "Step 4: the leaves are long, narrow and hanging, and the fruit is a gumnut, not a berry, so choose 4b and go to step 5.", "Step 5: the bark is patchy grey, cream and pink, not cream with scribbles, so choose 5b."],
    answer: "Path 1a \u2192 2b \u2192 3b \u2192 4b \u2192 5b. The tree is a spotted gum."
  }), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Building a key for eucalypt woodland birds",
    problem: "Construct a dichotomous key to identify four birds seen in a eucalypt woodland: sulphur-crested cockatoo (white with a yellow crest), Australian magpie (black and white, no crest), rainbow lorikeet (green body, blue head, orange-red chest) and laughing kookaburra (brown and cream with a very large bill).",
    steps: ["Count the organisms: 4 birds, so you need 4 − 1 = 3 couplets.", "Find one feature that splits off one bird cleanly: only the cockatoo has a crest. Couplet 1: 1a has a crest → sulphur-crested cockatoo; 1b no crest → go to 2.", "Split the remaining three: only the magpie has feathers that are just black and white. Couplet 2: 2a feathers only black and white → Australian magpie; 2b feathers include other colours → go to 3.", "Split the last two with a clear, visible feature. Couplet 3: 3a bright green body, blue head and orange-red chest → rainbow lorikeet; 3b brown and cream with a very large, thick bill → laughing kookaburra.", "Check: every bird ends up at its own name, and each pair of statements are opposites of the same feature."],
    answer: "1a Has a crest on its head \u2192 sulphur-crested cockatoo. 1b No crest \u2192 go to 2. 2a Feathers only black and white \u2192 Australian magpie. 2b Feathers include other colours \u2192 go to 3. 3a Bright green body, blue head, orange-red chest \u2192 rainbow lorikeet. 3b Brown and cream with a very large, thick bill \u2192 laughing kookaburra."
  }), /*#__PURE__*/React.createElement(ExamTip, null, "For \"identify\" questions, give the organism's name as your answer. If the question says \"show your working\", write the path (for example 1a \u2192 2b \u2192 3a). When you write your own key, make each couplet a pair of opposites about one feature."), /*#__PURE__*/React.createElement(Practice, {
    title: "Dichotomous keys"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 9,
    question: "Using the bushland tree key, identify a tree with flat leaves that are each divided into many tiny, feathery leaflets.",
    options: ["Black she-oak", "Black wattle", "Lilly pilly", "Old man banksia"],
    correct: 1,
    explain: "The path is 1a \u2192 2a, which ends at black wattle. Black she-oak is the tempting answer because it also has tiny leaves, but it has no flat leaves at all, so it leaves the key at 1b."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 10,
    question: "Which couplet would work best in a dichotomous key?",
    options: ["1a Large animal / 1b Small animal", "1a Has two pairs of wings / 1b Has one pair of wings", "1a Moves quickly / 1b Moves slowly", "1a Pretty colours / 1b Dull colours"],
    correct: 1,
    explain: "The number of pairs of wings is a clear feature you can count, so everyone will judge it the same way. 'Large' and 'small' seem reasonable, but different people judge size differently, so they give different results."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 11,
    question: "A student is writing a dichotomous key for 8 different Australian native bees. What is the smallest number of couplets the key needs?",
    options: ["4", "7", "8", "16"],
    correct: 1,
    explain: "Each couplet splits one group into two, so a key for n organisms needs n \u2212 1 couplets: 8 \u2212 1 = 7. Choosing 8 is the common slip, forgetting that the last couplet names two organisms at once."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 12,
    question: "A small tree has flat leaves that are each a single blade with sharp, saw-like teeth along the edges. Its old flower spikes have turned into woody cones. Use the bushland tree key to identify it, and write the path you followed. (2 marks)",
    model: "The plant is an old man banksia. Path: 1a (flat leaves) \u2192 2b (single, undivided leaf blade) \u2192 3a (saw-toothed leaf edges and woody cones)."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 13,
    question: "Construct a dichotomous key to identify these four Australian frogs: green tree frog (large sticky toe pads, smooth skin, plain green back), Peron's tree frog (large sticky toe pads, smooth skin, grey-brown back with small green flecks), striped marsh frog (no toe pads, smooth skin, dark stripes running down its back) and holy cross frog (no toe pads, bumpy skin, yellow back with a cross-shaped pattern of dark spots). (4 marks)",
    model: "1a Large sticky toe pads \u2192 go to 2. 1b No toe pads \u2192 go to 3. 2a Back plain green \u2192 green tree frog. 2b Back grey-brown with small green flecks \u2192 Peron's tree frog. 3a Smooth skin with dark stripes down the back \u2192 striped marsh frog. 3b Bumpy skin with a cross-shaped pattern of dark spots \u2192 holy cross frog. (Three couplets for four frogs; each couplet is a pair of opposite statements about one observable feature, and every frog ends at its own name.)"
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 14,
    question: "Why is 'has yellow flowers' a poor feature to use in a dichotomous key for bushland trees?",
    options: ["Most trees only flower for part of the year, so the feature cannot be seen in every season", "Yellow is too hard a colour to see", "Trees with yellow flowers cannot be identified", "Keys should never mention colours of any kind"],
    correct: 0,
    explain: "A tree may have no flowers at all for most of the year, so a key that relies on flowers fails in those months. Good keys use features that are always there, like leaf shape, leaf edges or bark. 'Never mention colours' goes too far: colours that do not change, such as bark patterns, can be useful."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "3.1.6",
    items: ["I can use a dichotomous key to identify an organism and write the path I took.", "I can explain why both statements in a couplet must be read before choosing.", "I can construct a key for four or five organisms using observable features.", "I can explain why vague words like 'big' or 'fast' make a key unreliable.", "I can work out how many couplets a key needs (n − 1)."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#3.1",
    label: "Learn it in full: Dichotomous keys"
  })));
}

/* ============================================================
   SECTION 3.2  CELLS
   ============================================================ */
function Section32(_ref8) {
  var progress = _ref8.progress,
    setProgress = _ref8.setProgress;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "3.2 Cells"), /*#__PURE__*/React.createElement("h1", null, "Plant and animal cells"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "The parts of plant and animal cells, what each part does, and how cells work together in tissues, organs and systems.")), /*#__PURE__*/React.createElement(DotPoint, {
    id: "3.2.2",
    title: "Cell structures found in both plant and animal cells",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "core"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Every plant cell and every animal cell has: a ", /*#__PURE__*/React.createElement(Term, {
    def: "Thin, flexible outer layer of every cell that controls what goes in and out"
  }, "cell membrane"), ", ", /*#__PURE__*/React.createElement(Term, {
    def: "Jelly-like fluid that fills the cell; many chemical reactions happen here"
  }, "cytoplasm"), ", a ", /*#__PURE__*/React.createElement(Term, {
    def: "Control centre of the cell; contains DNA"
  }, "nucleus"), " and ", /*#__PURE__*/React.createElement(Term, {
    def: "Organelles where respiration releases energy from glucose"
  }, "mitochondria"), ". Both also have tiny ", /*#__PURE__*/React.createElement("strong", null, "ribosomes"), " that make proteins."), /*#__PURE__*/React.createElement("li", null, "Plant and animal cells keep their DNA inside a nucleus with its own membrane."), /*#__PURE__*/React.createElement("li", null, "Common mistake: plant cells ", /*#__PURE__*/React.createElement("em", null, "do"), " have mitochondria. Chloroplasts make food; mitochondria release energy from it. Plants need both."), /*#__PURE__*/React.createElement("li", null, "Textbook diagrams are flat slices. Real cells are 3D, and the parts float in the cytoplasm."), /*#__PURE__*/React.createElement("li", null, "Singular and plural: one ", /*#__PURE__*/React.createElement("em", null, "mitochondrion"), ", many ", /*#__PURE__*/React.createElement("em", null, "mitochondria"), "."))), /*#__PURE__*/React.createElement(Figure, {
    num: "1",
    caption: "A typical animal cell. It has a cell membrane, cytoplasm, a nucleus and mitochondria, but no cell wall, chloroplasts or large vacuole."
  }, /*#__PURE__*/React.createElement(AnimalCellSVG, null)), /*#__PURE__*/React.createElement(Figure, {
    num: "2",
    caption: "A typical plant cell from a leaf. It has the same four shared structures as the animal cell, plus a cell wall, chloroplasts and a large central vacuole."
  }, /*#__PURE__*/React.createElement(PlantCellSVG, null)), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Spotting the shared structures",
    problem: "Compare Figures 1 and 2. Name the structures that appear in both the animal cell and the plant cell.",
    steps: ["List every labelled part of the animal cell: cell membrane, cytoplasm, nucleus, mitochondria, ribosomes.", "Check each one against the plant cell. Cell membrane: yes (just inside the cell wall). Cytoplasm: yes. Nucleus: yes (pushed to the edge by the vacuole). Mitochondria: yes.", "Ribosomes are too small to show on Figure 2, but plant cells have them too.", "Cell wall, chloroplasts and a large vacuole appear only in the plant cell, so leave them out."],
    answer: "Cell membrane, cytoplasm, nucleus and mitochondria (and ribosomes) are found in both."
  }), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Why do plant cells need mitochondria?",
    problem: "A student says, 'Plant cells have chloroplasts for energy, so they do not need mitochondria.' Explain why the student is wrong. (2 marks)",
    steps: ["Say what chloroplasts actually do: they carry out photosynthesis, which makes glucose (food) using light energy.", "Say what mitochondria do: they carry out respiration, which releases the energy stored in glucose so the cell can use it.", "Link the two: making food is not the same as releasing its energy. The plant needs both steps, and respiration goes on day and night, even in the dark when there is no photosynthesis."],
    answer: "The student is wrong. Chloroplasts only make glucose by photosynthesis. Mitochondria are needed to release the energy stored in that glucose by respiration, which plant cells do all the time, day and night. So plant cells need both chloroplasts and mitochondria."
  }), /*#__PURE__*/React.createElement(Practice, {
    title: "Shared cell structures"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 15,
    question: "Which structure is found in both plant and animal cells?",
    options: ["Cell wall", "Chloroplast", "Mitochondrion", "Large central vacuole"],
    correct: 2,
    explain: "Both plant and animal cells release energy by respiration, so both have mitochondria. Chloroplasts are the tempting answer, but animal cells do not photosynthesise and have no chloroplasts."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 16,
    question: "Which list contains ONLY structures found in every plant cell and every animal cell?",
    options: ["Nucleus, cell wall, cytoplasm", "Cell membrane, chloroplast, mitochondrion", "Nucleus, cytoplasm, cell membrane", "Vacuole, nucleus, cell wall"],
    correct: 2,
    explain: "The nucleus, cytoplasm and cell membrane are in both cell types. Each of the other lists includes a structure that animal cells do not have: the cell wall, chloroplasts, or a large vacuole."
  }), /*#__PURE__*/React.createElement(Figure, {
    num: "3",
    caption: "A plant cell with seven structures labelled P to V (used in questions 17 and 27)."
  }, /*#__PURE__*/React.createElement(PlantCellSVG, {
    letters: true
  })), /*#__PURE__*/React.createElement(MCQ, {
    num: 17,
    question: "Look at Figure 3. Structure U releases energy from glucose. Which option names U correctly and says where else it is found?",
    options: ["U is a chloroplast; it is found only in plant cells", "U is a mitochondrion; it is found in animal cells too", "U is the nucleus; it is found in animal cells too", "U is a mitochondrion; it is found only in plant cells"],
    correct: 1,
    explain: "Releasing energy from glucose is respiration, which happens in mitochondria, and every animal cell needs this too. The chloroplast option is tempting because chloroplasts deal with energy, but they capture light energy to MAKE glucose; they do not release energy from it."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 18,
    question: "Which statement about the nucleus is correct?",
    options: ["Only animal cells have a nucleus", "Only plant cells have a nucleus", "Plant and animal cells both have a nucleus that contains DNA", "The nucleus is found outside the cell membrane"],
    correct: 2,
    explain: "Plant and animal cells both keep their DNA inside a nucleus. Some students think the vacuole replaces the nucleus in plant cells, but it only pushes the nucleus to the side of the cell."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 19,
    question: "Name THREE structures found in both plant and animal cells. (3 marks)",
    model: "Any three of: cell membrane, cytoplasm, nucleus, mitochondria (ribosomes are also accepted). One mark for each correct structure."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 20,
    question: "A leaf cell and a skin cell both contain cytoplasm. Describe what cytoplasm is and explain why both cells need it. (2 marks)",
    model: "Cytoplasm is the jelly-like fluid, mostly water, that fills the cell inside the cell membrane. Both cells need it because it holds the organelles in place and is where many of the cell's chemical reactions happen."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "3.2.2",
    items: ["I can name the four structures found in both plant and animal cells.", "I can find these structures on a plant cell diagram and an animal cell diagram.", "I can explain why plant cells need mitochondria as well as chloroplasts."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#3.2",
    label: "Learn it in full: Cell structures common to plant and animal cells"
  })), /*#__PURE__*/React.createElement(DotPoint, {
    id: "3.2.3",
    title: "What each cell structure does",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "important"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Cell membrane:"), " thin, flexible barrier around the cell. Controls what enters and leaves (water, oxygen and glucose in; carbon dioxide and wastes out)."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Cytoplasm:"), " jelly-like fluid, mostly water. Holds the organelles; many chemical reactions happen here."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Nucleus:"), " control centre. Contains ", /*#__PURE__*/React.createElement(Term, {
    def: "The chemical that carries the genetic instructions for building and running a cell"
  }, "DNA"), ", the instructions for how the cell grows, works and divides."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Mitochondria:"), " where ", /*#__PURE__*/React.createElement("em", null, "respiration"), " happens: glucose + oxygen \u2192 carbon dioxide + water + energy."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Chloroplasts"), " (plants only): where ", /*#__PURE__*/React.createElement("em", null, "photosynthesis"), " happens. Green ", /*#__PURE__*/React.createElement(Term, {
    def: "The green pigment in chloroplasts that absorbs light energy"
  }, "chlorophyll"), " absorbs light: carbon dioxide + water \u2192 glucose + oxygen."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Cell wall"), " (plants only): stiff layer made of cellulose, outside the membrane. Supports the cell, gives it a fixed shape and stops it bursting when it takes in water."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Large vacuole"), " (plants only): stores water, sugars and salts (cell sap). When full, it pushes against the cell wall and keeps the cell firm."))), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Cause, effect, link",
    problem: "A leaf cell contains many chloroplasts, but a root cell from the same plant contains none. Explain this difference. (3 marks)",
    steps: ["Cause: say what chloroplasts do. They carry out photosynthesis, which needs light.", "Effect: leaf cells are near the surface and receive lots of sunlight; root cells are underground in the dark.", "Link: chloroplasts in a root cell would be useless because there is no light to photosynthesise, so the root cell does not have them. Root cells get glucose from the leaves instead."],
    answer: "Chloroplasts are where photosynthesis happens, and photosynthesis needs light. Leaf cells receive plenty of sunlight, so they have many chloroplasts to make glucose. Root cells are underground where there is no light, so chloroplasts would not work there; root cells receive glucose made in the leaves instead."
  }), /*#__PURE__*/React.createElement(Practice, {
    title: "Functions of cell structures"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 21,
    question: "A poison stops the mitochondria in a cell from working. Which job would the cell no longer be able to do?",
    options: ["Make glucose using light", "Release energy from glucose", "Control what enters the cell", "Store water and salts"],
    correct: 1,
    explain: "Mitochondria carry out respiration, which releases energy from glucose. Making glucose with light is the tempting choice, but that is photosynthesis, which happens in chloroplasts."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 22,
    question: "Which cell would you expect to contain the MOST mitochondria?",
    options: ["A cell storing fat under the skin", "A cell in the flight muscle of a bird", "A cell in the outer layer of an onion bulb", "A cell in the dead outer layer of human skin"],
    correct: 1,
    explain: "Flight muscles use huge amounts of energy, and mitochondria release that energy by respiration, so these cells are packed with mitochondria. Fat storage cells are tempting because fat holds energy, but storing energy uses very little of it."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 23,
    question: "A plant cell is placed in pure water and takes in a lot of water. Which structure stops it from bursting?",
    options: ["Cell membrane", "Nucleus", "Cell wall", "Chloroplast"],
    correct: 2,
    explain: "The stiff cellulose cell wall pushes back as the cell swells, so the cell becomes firm instead of bursting. The cell membrane is too thin and flexible to stop this on its own. Animal cells have no wall, which is why they can burst."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 24,
    question: "A potted plant is left in the hot sun without water and its leaves droop. After it is watered, the leaves stand up again within a few hours. Explain this using the functions of the vacuole and the cell wall. (3 marks)",
    model: "Without water, the large vacuoles in the plant's cells lose water and shrink, so they no longer push against the cell walls. The cells become soft and floppy, so the leaves droop. After watering, the vacuoles fill with water again and press outwards against the stiff cell walls, making each cell firm. The firm cells support the leaves, so they stand up again."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "3.2.3",
    items: ["I can state the job of the cell membrane, cytoplasm, nucleus and mitochondria.", "I can state the job of the cell wall, chloroplasts and vacuole in plant cells.", "I can predict what happens to a cell if one of its structures stops working.", "I can use cause, effect, link to explain a structure's job."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#3.2",
    label: "Learn it in full: Functions of key cell structures"
  })), /*#__PURE__*/React.createElement(DotPoint, {
    id: "3.2.4",
    title: "Comparing plant and animal cells",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "core"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    "aria-label": "Comparison of plant and animal cells"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    scope: "col"
  }, "Feature"), /*#__PURE__*/React.createElement("th", {
    scope: "col"
  }, "Plant cell"), /*#__PURE__*/React.createElement("th", {
    scope: "col"
  }, "Animal cell"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Cell membrane"), /*#__PURE__*/React.createElement("td", null, "Yes"), /*#__PURE__*/React.createElement("td", null, "Yes")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Cytoplasm"), /*#__PURE__*/React.createElement("td", null, "Yes"), /*#__PURE__*/React.createElement("td", null, "Yes")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Nucleus"), /*#__PURE__*/React.createElement("td", null, "Yes"), /*#__PURE__*/React.createElement("td", null, "Yes")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Mitochondria"), /*#__PURE__*/React.createElement("td", null, "Yes"), /*#__PURE__*/React.createElement("td", null, "Yes")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Cell wall"), /*#__PURE__*/React.createElement("td", null, "Yes (cellulose)"), /*#__PURE__*/React.createElement("td", null, "No")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Chloroplasts"), /*#__PURE__*/React.createElement("td", null, "Yes, in green parts (not in roots)"), /*#__PURE__*/React.createElement("td", null, "No")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Vacuole"), /*#__PURE__*/React.createElement("td", null, "One large, permanent central vacuole"), /*#__PURE__*/React.createElement("td", null, "None, or only small temporary ones")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Shape"), /*#__PURE__*/React.createElement("td", null, "Fixed, often box-like"), /*#__PURE__*/React.createElement("td", null, "Irregular, often rounded"))))), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "\"Compare\" means give similarities ", /*#__PURE__*/React.createElement("strong", null, "and"), " differences. Use linking words: \"Both\u2026 \", \"\u2026whereas\u2026\"."), /*#__PURE__*/React.createElement("li", null, "The best single sign of a plant cell is a ", /*#__PURE__*/React.createElement("strong", null, "cell wall"), ". Not every plant cell has chloroplasts (root cells and onion bulb cells do not), so \"no chloroplasts\" does not prove a cell is from an animal."), /*#__PURE__*/React.createElement("li", null, "Plant cells have a fixed shape because of the stiff cell wall; animal cells only have a flexible membrane, so their shape can change."))), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Comparing two real cells with a Venn diagram",
    problem: "Compare a cell from an onion bulb with a cell from a human liver. (4 marks)",
    steps: ["Plan for 4 marks: two similarities and two differences. Sort the structures of each cell into a quick Venn diagram first.", "Overlap (both cells): nucleus, cell membrane, cytoplasm, mitochondria.", "Onion bulb cell only: cell wall, large central vacuole. Careful: an onion bulb grows underground, so its cells have NO chloroplasts. Do not list chloroplasts as a difference here.", "Liver cell only: nothing extra from our list, but it has an irregular shape because it has no cell wall.", "Write each difference as one sentence about both cells, joined by 'whereas'."],
    answer: "Both cells have a nucleus containing DNA, and both have a cell membrane, cytoplasm and mitochondria. However, the onion bulb cell has a stiff cellulose cell wall that gives it a fixed, box-like shape, whereas the liver cell has no cell wall and a more irregular shape. The onion cell also has a large central vacuole, whereas the liver cell has none. Neither cell has chloroplasts, because the onion bulb grows underground."
  }), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Plant or animal?",
    problem: "Under a microscope, cell X has a cell wall, a large vacuole and a nucleus, but no chloroplasts. Cell Y has an irregular shape, a nucleus and many mitochondria, but no cell wall. Classify each cell and justify your answer.",
    steps: ["Look for the deciding feature first: a cell wall. Cell X has one, cell Y does not.", "Check the other clues. Cell X also has a large vacuole (plant feature). Cell Y has an irregular shape (animal feature).", "Deal with the trap: cell X has no chloroplasts, but some plant cells (like root cells) do not have them, so this does not make X an animal cell."],
    answer: "Cell X is a plant cell because it has a cell wall and a large vacuole; it probably comes from a part of the plant that gets no light, such as a root. Cell Y is an animal cell because it has no cell wall and an irregular shape."
  }), /*#__PURE__*/React.createElement(ExamTip, null, "\"Compare\" questions lose marks when students write two separate lists. Write each difference as one sentence that mentions both cells, joined by \"whereas\"."), /*#__PURE__*/React.createElement(Practice, {
    title: "Comparing plant and animal cells"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 25,
    question: "A cell has a cell membrane, a nucleus, a cell wall and a large vacuole, but no chloroplasts. What is it most likely to be?",
    options: ["An animal cell", "A plant cell from a leaf", "A plant cell from a root", "An animal cell from a muscle"],
    correct: 2,
    explain: "The cell wall and large vacuole show it is a plant cell, and the missing chloroplasts suggest a part of the plant that gets no light, such as a root. 'Animal cell' is tempting because there are no chloroplasts, but animal cells never have a cell wall."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 26,
    question: "Why do plant cells usually have a regular, box-like shape while animal cells are irregular?",
    options: ["Plant cells have a stiff cell wall; animal cells only have a flexible membrane", "Plant cells have more mitochondria", "Animal cells have no nucleus to control their shape", "Chloroplasts hold plant cells in shape"],
    correct: 0,
    explain: "The cellulose cell wall is stiff and holds the plant cell in a fixed shape. Animal cells have only a flexible membrane, so their shape can change. Both cell types have a nucleus and mitochondria, so those cannot explain the difference."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 27,
    question: "Look at Figure 3 (in 3.2.2). Which labelled structures would NOT be found in an animal cell?",
    options: ["Q, T and U", "P, R and S", "R only", "P and V"],
    correct: 1,
    explain: "P is the cell wall, R is a chloroplast and S is the large vacuole, and all three are found only in plant cells. Choosing R only misses the cell wall and vacuole, which animal cells also lack."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 28,
    question: "Compare a eucalyptus leaf cell with a human muscle cell. Give two similarities and two differences. (4 marks)",
    model: "Similarities: both cells have a nucleus that contains DNA, and both have mitochondria to release energy by respiration (both also have a cell membrane and cytoplasm). Differences: the eucalyptus leaf cell has a cellulose cell wall, whereas the muscle cell has no cell wall. The leaf cell has chloroplasts to photosynthesise and a large vacuole, whereas the muscle cell has no chloroplasts and no large vacuole."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 29,
    question: "Explain why animal cells do not need chloroplasts. (2 marks)",
    model: "Chloroplasts are used for photosynthesis, which makes glucose using light energy. Animals do not make their own food this way; they get glucose by eating other organisms, so their cells do not need chloroplasts."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 30,
    question: "A Venn diagram has one circle for 'plant cell' and one for 'animal cell'. Where should 'mitochondria' go?",
    options: ["In the plant cell circle only", "In the animal cell circle only", "In the overlap between the two circles", "Outside both circles"],
    correct: 2,
    explain: "Both plant and animal cells have mitochondria, so they belong in the overlap. 'Animal cell only' is a common mistake that comes from thinking chloroplasts do the same job in plants."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "3.2.4",
    items: ["I can sort cell structures into a Venn diagram: plant only, both, animal only.", "I can write a comparison using 'both' and 'whereas'.", "I can decide whether a cell is from a plant or an animal from a description or diagram.", "I can explain why a cell with no chloroplasts could still be a plant cell."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#3.2",
    label: "Learn it in full: Comparing plant and animal cells"
  })), /*#__PURE__*/React.createElement(DotPoint, {
    id: "3.2.9",
    title: "Specialised cells, tissues, organs and systems",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "important"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "In multicellular organisms, cells are ", /*#__PURE__*/React.createElement(Term, {
    def: "Having a special shape or structure that suits one particular job"
  }, "specialised"), ": their shape and structure suit one job. Examples: red blood cells (no nucleus, disc shape, carry oxygen), nerve cells (long fibres carry messages), root hair cells (long thin extension absorbs water), palisade leaf cells (packed with chloroplasts)."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Tissue:"), " a group of similar cells working together to do one job (e.g. muscle tissue, xylem tissue)."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Organ:"), " different tissues working together to do a bigger job (e.g. heart, stomach, leaf, root)."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "System:"), " several organs working together (e.g. digestive system; in plants, the root system and shoot system)."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Organism:"), " all the systems working together make one living thing."), /*#__PURE__*/React.createElement("li", null, "Chain to remember: ", /*#__PURE__*/React.createElement("strong", null, "cell \u2192 tissue \u2192 organ \u2192 system \u2192 organism"), ". Single-celled organisms (like bacteria) do every job in one cell, so they have no tissues or organs."))), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Tissue or organ?",
    problem: "Explain why the stomach is called an organ and not a tissue. (2 marks)",
    steps: ["Recall the definitions: a tissue is made of one type of similar cell; an organ is made of several different tissues.", "Apply them to the stomach: its wall contains muscle tissue (to churn food), lining tissue that releases digestive juices, and nerve tissue.", "Link: because several different tissues work together to do one bigger job (digesting food), the stomach is an organ."],
    answer: "A tissue is a group of similar cells doing one job, but the stomach is made of several different tissues, such as muscle tissue and lining tissue, working together to digest food. Because it contains different tissues working together, the stomach is an organ."
  }), /*#__PURE__*/React.createElement(Practice, {
    title: "Levels of organisation"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 31,
    question: "Xylem in a plant stem is made of many similar, long, hollow cells joined end to end. Together they carry water from the roots to the leaves. Which level of organisation is xylem?",
    options: ["A cell", "A tissue", "An organ", "A system"],
    correct: 1,
    explain: "Xylem is a group of similar cells working together to do one job (carrying water), so it is a tissue. 'Organ' is tempting because xylem runs through the whole stem, but an organ such as the stem or leaf is made of several different tissues working together."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 32,
    question: "A root hair cell has a long, thin extension that grows out between soil particles. How does this help the cell do its job?",
    options: ["It holds the plant firmly in the ground", "It gives a large surface area for absorbing water and minerals", "It lets the cell photosynthesise underground", "It protects the root from insects"],
    correct: 1,
    explain: "The long extension greatly increases the surface area in contact with the soil, so the cell can absorb more water and minerals. Anchoring is tempting, but that is the job of the whole root system, not the fine root hairs."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 33,
    question: "Nerve cells carry messages around the body. Describe one way a nerve cell is specialised and explain how it helps the cell do its job. (2 marks)",
    model: "A nerve cell has a very long, thin fibre (and can be over a metre long in humans). This lets it carry electrical messages long distances around the body quickly, for example from the spinal cord to the toes. (Also accepted: branched endings that connect to many other cells, so messages can pass between them.)"
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 34,
    question: "Use the digestive system as an example to describe the difference between a tissue, an organ and a system. (3 marks)",
    model: "A tissue is a group of similar cells doing one job, such as the muscle tissue that squeezes food along. An organ is made of different tissues working together, such as the stomach, which has muscle tissue and lining tissue to digest food. A system is a group of organs working together, such as the digestive system, which includes the mouth, stomach and intestines working together to break down food."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "3.2.9",
    items: ["I can define cell, tissue, organ and system and give an example of each.", "I can explain how the structure of a specialised cell helps it do its job.", "I can explain why an organ is not just a tissue.", "I can give plant examples as well as animal examples."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#3.2",
    label: "Learn it in full: Cells in tissues and organs"
  })));
}

/* ============================================================
   APP
   ============================================================ */
mountTopicApp({
  year: 7,
  topicTitle: "Classification and Cells",
  branch: "biology",
  heroImage: "img/hero.webp",
  strand: "Yearly Exam Revision · Stage 4",
  accent: "green",
  storageKey: "y7.rev-cells",
  hubHref: "../",
  intro: "Revise how scientists decide what is living, how they sort and name organisms, and how to use a dichotomous key. Then review the parts of plant and animal cells, what each part does, and how cells build tissues, organs and systems. Each dot point has a quick recap, a worked example, practice questions and a self-check.",
  glossary: {
    "MRS GREN": "Memory hook for the seven characteristics of living things: Movement, Reproduction, Sensitivity, Growth, Respiration, Excretion, Nutrition.",
    "respiration": "The chemical process in cells (in the mitochondria) that releases energy from glucose. Not the same as breathing.",
    "excretion": "Removing waste substances made by cells, such as carbon dioxide and urea.",
    "egestion": "Getting rid of undigested food (faeces). Not the same as excretion.",
    "sensitivity": "Detecting and responding to changes (stimuli) in the surroundings.",
    "classification": "Sorting living things into groups based on the features they share.",
    "species": "A group of organisms that can breed together to produce fertile offspring.",
    "genus": "The rank above species; a group of closely related species. Written with a capital first letter.",
    "binomial name": "The two-part scientific name of a species: Genus + species, e.g. Macropus giganteus. Italics when typed, underlined when handwritten.",
    "dichotomous key": "An identification tool made of pairs of statements (couplets); you choose one at each step until you reach a name.",
    "couplet": "A pair of opposite statements at one step of a dichotomous key.",
    "cell": "The smallest unit of life; all living things are made of one or more cells.",
    "cell membrane": "Thin, flexible outer layer of every cell that controls what enters and leaves.",
    "cytoplasm": "Jelly-like fluid inside the cell where many chemical reactions happen.",
    "nucleus": "The control centre of the cell; contains DNA.",
    "DNA": "The chemical that carries the genetic instructions for a cell.",
    "mitochondria": "Organelles where respiration releases energy from glucose (singular: mitochondrion).",
    "chloroplast": "Green organelle in plant cells where photosynthesis happens; contains chlorophyll.",
    "cell wall": "Stiff layer of cellulose outside the membrane of plant cells; gives support and shape.",
    "vacuole": "Sac that stores water, sugars and salts; plant cells have one large central vacuole.",
    "photosynthesis": "Process in chloroplasts: carbon dioxide + water → glucose + oxygen, using light energy.",
    "specialised cell": "A cell with a shape or structure suited to one particular job.",
    "tissue": "A group of similar cells working together to do one job.",
    "organ": "A structure made of different tissues working together to do a bigger job.",
    "system": "A group of organs working together, e.g. the digestive system."
  },
  sections: [{
    id: "3.1",
    label: "Classification",
    accent: "green",
    blurb: "★★★ Using dichotomous keys, plus the characteristics of living things and writing scientific names.",
    points: ["3.1.1", "3.1.3", "3.1.6"],
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section31, p);
    }
  }, {
    id: "3.2",
    label: "Cells",
    accent: "green",
    blurb: "★★★ Plant and animal cell structures and how they compare, plus what each part does and how cells build organs.",
    points: ["3.2.2", "3.2.3", "3.2.4", "3.2.9"],
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section32, p);
    }
  }]
});
