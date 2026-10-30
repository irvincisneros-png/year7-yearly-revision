/* Generated from content.jsx by tools/build.js. Edit the .jsx, not this file. */
"use strict";

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
/* global React, DotPoint, Callout, Figure, Term, MCQ, WrittenQ, QGroup, Interactive,
   Slider, SegToggle, Stat, Reveal, FlipCard, MatchBuckets, Ring, mountTopicApp,
   ExamFocus, Recap, ExamTip, WorkedExample, Practice, SelfCheck, NotebookLink */
var _React = React,
  useState = _React.useState;
var NB = "https://irvincisneros-png.github.io/Year-7/solutions-mixtures/";
var NB_INV = "https://irvincisneros-png.github.io/Year-7/observing-universe/#1.2";

/* ============================================================
   Shared helpers
   ============================================================ */

/* An accurate graph drawn from data. Points are plotted as small crosses,
   like a hand-drawn scatter graph. fit: "linear" = least-squares straight
   line (outliers ignored), "curve" = smooth curve through the points. */
function Graph(_ref) {
  var _ref$w = _ref.w,
    w = _ref$w === void 0 ? 360 : _ref$w,
    _ref$h = _ref.h,
    h = _ref$h === void 0 ? 268 : _ref$h,
    x = _ref.x,
    y = _ref.y,
    xLabel = _ref.xLabel,
    yLabel = _ref.yLabel,
    series = _ref.series,
    aria = _ref.aria,
    extra = _ref.extra;
  var L = 56,
    R = 14,
    T = 12,
    B = 48;
  var pw = w - L - R,
    ph = h - T - B;
  var sx = function sx(v) {
    return L + (v - x.min) / (x.max - x.min) * pw;
  };
  var sy = function sy(v) {
    return T + ph - (v - y.min) / (y.max - y.min) * ph;
  };
  var ticks = function ticks(a) {
    var out = [];
    for (var v = a.min; v <= a.max + 1e-9; v += a.step) out.push(Math.round(v * 1000) / 1000);
    return out;
  };
  var xt = ticks(x),
    yt = ticks(y);
  var linePath = function linePath(s) {
    var pts = s.pts.filter(function (_, i) {
      return !(s.outliers || []).includes(i);
    });
    var n = pts.length;
    var mx = pts.reduce(function (a, p) {
        return a + p[0];
      }, 0) / n,
      my = pts.reduce(function (a, p) {
        return a + p[1];
      }, 0) / n;
    var sxy = 0,
      sxx = 0;
    pts.forEach(function (p) {
      sxy += (p[0] - mx) * (p[1] - my);
      sxx += Math.pow(p[0] - mx, 2);
    });
    var m = sxy / sxx,
      c = my - m * mx;
    var x0 = Math.min.apply(Math, _toConsumableArray(s.pts.map(function (p) {
        return p[0];
      }))),
      x1 = Math.max.apply(Math, _toConsumableArray(s.pts.map(function (p) {
        return p[0];
      })));
    return "M".concat(sx(x0).toFixed(1), ",").concat(sy(m * x0 + c).toFixed(1), " L").concat(sx(x1).toFixed(1), ",").concat(sy(m * x1 + c).toFixed(1));
  };
  var curvePath = function curvePath(s) {
    var P = s.pts.map(function (p) {
      return [sx(p[0]), sy(p[1])];
    });
    var d = "M".concat(P[0][0].toFixed(1), ",").concat(P[0][1].toFixed(1));
    for (var i = 0; i < P.length - 1; i++) {
      var p0 = P[i - 1] || P[i],
        p1 = P[i],
        p2 = P[i + 1],
        p3 = P[i + 2] || P[i + 1];
      var c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      var c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += " C".concat(c1[0].toFixed(1), ",").concat(c1[1].toFixed(1), " ").concat(c2[0].toFixed(1), ",").concat(c2[1].toFixed(1), " ").concat(p2[0].toFixed(1), ",").concat(p2[1].toFixed(1));
    }
    return d;
  };
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 ".concat(w, " ").concat(h),
    width: "100%",
    role: "img",
    "aria-label": aria,
    style: {
      maxWidth: 540,
      display: "block",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("rect", {
    x: L,
    y: T,
    width: pw,
    height: ph,
    fill: "var(--card)"
  }), xt.map(function (v) {
    return /*#__PURE__*/React.createElement("line", {
      key: "gx" + v,
      x1: sx(v),
      x2: sx(v),
      y1: T,
      y2: T + ph,
      stroke: "var(--border)",
      strokeWidth: "1"
    });
  }), yt.map(function (v) {
    return /*#__PURE__*/React.createElement("line", {
      key: "gy" + v,
      x1: L,
      x2: L + pw,
      y1: sy(v),
      y2: sy(v),
      stroke: "var(--border)",
      strokeWidth: "1"
    });
  }), /*#__PURE__*/React.createElement("line", {
    x1: L,
    y1: T + ph,
    x2: L + pw,
    y2: T + ph,
    stroke: "var(--ink)",
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: L,
    y1: T,
    x2: L,
    y2: T + ph,
    stroke: "var(--ink)",
    strokeWidth: "1.6"
  }), xt.map(function (v) {
    return /*#__PURE__*/React.createElement("text", {
      key: "tx" + v,
      x: sx(v),
      y: T + ph + 15,
      textAnchor: "middle",
      fontSize: "11",
      fill: "var(--ink-muted)"
    }, v);
  }), yt.map(function (v) {
    return /*#__PURE__*/React.createElement("text", {
      key: "ty" + v,
      x: L - 6,
      y: sy(v) + 4,
      textAnchor: "end",
      fontSize: "11",
      fill: "var(--ink-muted)"
    }, v);
  }), /*#__PURE__*/React.createElement("text", {
    x: L + pw / 2,
    y: h - 8,
    textAnchor: "middle",
    fontSize: "12",
    fontWeight: "700",
    fill: "var(--ink)"
  }, xLabel), /*#__PURE__*/React.createElement("text", {
    x: 13,
    y: T + ph / 2,
    transform: "rotate(-90 13 ".concat(T + ph / 2, ")"),
    textAnchor: "middle",
    fontSize: "12",
    fontWeight: "700",
    fill: "var(--ink)"
  }, yLabel), series.map(function (s, si) {
    return /*#__PURE__*/React.createElement("g", {
      key: si
    }, s.fit === "linear" && /*#__PURE__*/React.createElement("path", {
      d: linePath(s),
      fill: "none",
      stroke: s.colour || "var(--accent)",
      strokeWidth: "2",
      strokeDasharray: s.dash
    }), s.fit === "curve" && /*#__PURE__*/React.createElement("path", {
      d: curvePath(s),
      fill: "none",
      stroke: s.colour || "var(--accent)",
      strokeWidth: "2",
      strokeDasharray: s.dash
    }), s.pts.map(function (p, i) {
      var cx = sx(p[0]),
        cy = sy(p[1]),
        k = 4;
      return /*#__PURE__*/React.createElement("g", {
        key: i
      }, /*#__PURE__*/React.createElement("line", {
        x1: cx - k,
        y1: cy - k,
        x2: cx + k,
        y2: cy + k,
        stroke: "var(--ink)",
        strokeWidth: "1.8"
      }), /*#__PURE__*/React.createElement("line", {
        x1: cx - k,
        y1: cy + k,
        x2: cx + k,
        y2: cy - k,
        stroke: "var(--ink)",
        strokeWidth: "1.8"
      }), (s.outliers || []).includes(i) && /*#__PURE__*/React.createElement("circle", {
        cx: cx,
        cy: cy,
        r: "10",
        fill: "none",
        stroke: "var(--ink)",
        strokeWidth: "1.4",
        strokeDasharray: "3 2"
      }));
    }), s.label && /*#__PURE__*/React.createElement("text", {
      x: sx(s.labelAt[0]),
      y: sy(s.labelAt[1]),
      textAnchor: s.anchor || "start",
      fontSize: "11.5",
      fontWeight: "700",
      fill: s.labelColour || "var(--ink)"
    }, s.label));
  }), extra && extra(sx, sy));
}

/* Potassium nitrate solubility (g per 100 g water), rounded textbook values */
var KNO3 = [[0, 13], [10, 21], [20, 32], [30, 46], [40, 64], [50, 86], [60, 110]];
var NACL = [[0, 35.7], [10, 35.8], [20, 36.0], [30, 36.3], [40, 36.6], [50, 37.0], [60, 37.3]];
function kno3At(t) {
  for (var i = 0; i < KNO3.length - 1; i++) {
    var _KNO3$i = _slicedToArray(KNO3[i], 2),
      t0 = _KNO3$i[0],
      s0 = _KNO3$i[1],
      _KNO = _slicedToArray(KNO3[i + 1], 2),
      t1 = _KNO[0],
      s1 = _KNO[1];
    if (t >= t0 && t <= t1) return s0 + (t - t0) / (t1 - t0) * (s1 - s0);
  }
  return KNO3[KNO3.length - 1][1];
}
function SolubilityGraph() {
  return /*#__PURE__*/React.createElement(Graph, {
    x: {
      min: 0,
      max: 60,
      step: 10
    },
    y: {
      min: 0,
      max: 120,
      step: 20
    },
    xLabel: "Temperature (\xB0C)",
    yLabel: "Solubility (g per 100 g water)",
    aria: "Solubility curves. Potassium nitrate rises steeply from 13 grams at 0 degrees to 110 grams at 60 degrees. Sodium chloride stays almost flat at about 36 to 37 grams.",
    series: [{
      pts: KNO3,
      fit: "curve",
      label: "potassium nitrate",
      labelAt: [53, 104],
      anchor: "end"
    }, {
      pts: NACL,
      fit: "curve",
      colour: "var(--ink-muted)",
      dash: "6 4",
      label: "sodium chloride",
      labelAt: [60, 44],
      anchor: "end",
      labelColour: "var(--ink-muted)"
    }]
  });
}

/* Bounce height data (original): a tennis ball dropped from different heights */
var BOUNCE = [[20, 11], [40, 23], [60, 32], [80, 58], [100, 55], [120, 66]];
function BounceGraph() {
  return /*#__PURE__*/React.createElement(Graph, {
    x: {
      min: 0,
      max: 140,
      step: 20
    },
    y: {
      min: 0,
      max: 80,
      step: 10
    },
    xLabel: "Drop height (cm)",
    yLabel: "Bounce height (cm)",
    aria: "Scatter graph of bounce height against drop height. Points rise from 11 centimetres at a 20 centimetre drop to 66 centimetres at a 120 centimetre drop. A straight line of best fit slopes up and passes close to the origin. The point at 80 centimetres, 58 centimetres, is circled as an outlier above the line.",
    series: [{
      pts: BOUNCE,
      fit: "linear",
      outliers: [3]
    }],
    extra: function extra(sx, sy) {
      return /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("line", {
        x1: sx(80) + 8,
        y1: sy(58) - 7,
        x2: sx(88),
        y2: sy(66),
        stroke: "var(--ink-muted)",
        strokeWidth: "1"
      }), /*#__PURE__*/React.createElement("text", {
        x: sx(88) + 2,
        y: sy(66) - 3,
        fontSize: "11.5",
        fontWeight: "700",
        fill: "var(--ink)"
      }, "outlier"), /*#__PURE__*/React.createElement("text", {
        x: sx(84),
        y: sy(30),
        fontSize: "11",
        fill: "var(--ink)",
        fontWeight: "700"
      }, "line of best fit"));
    }
  });
}

/* Height of a bean seedling over 12 days (original class-style data, about
   1 cm per day after it pokes through the soil): graphing practice */
var SEEDLING = [[2, 1.0], [4, 3.1], [6, 4.9], [8, 7.1], [10, 9.0], [12, 11.0]];
function SeedlingGraph() {
  return /*#__PURE__*/React.createElement(Graph, {
    x: {
      min: 0,
      max: 14,
      step: 2
    },
    y: {
      min: 0,
      max: 14,
      step: 2
    },
    xLabel: "Time since planting (days)",
    yLabel: "Seedling height (cm)",
    aria: "Scatter graph with a straight line of best fit. The height of the bean seedling rises steadily from 1.0 centimetre on day 2 to 11.0 centimetres on day 12, about 1 centimetre per day.",
    series: [{
      pts: SEEDLING,
      fit: "linear"
    }]
  });
}
var tableWrap = {
  overflowX: "auto",
  margin: "12px 0"
};

/* ============================================================
   Interactive: potassium nitrate in a beaker (4.3.3)
   ============================================================ */
function KNO3Beaker() {
  var _useState = useState(20),
    _useState2 = _slicedToArray(_useState, 2),
    t = _useState2[0],
    setT = _useState2[1];
  var ADD = 50;
  var s = kno3At(t);
  var left = Math.max(0, ADD - s);
  var saturated = left > 0;
  var pile = left / ADD * 34;
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "50 g of potassium nitrate in 100 g of water",
    subtitle: "Change the temperature. Watch how much of the 50 g of potassium nitrate can stay dissolved.",
    takeaway: "The solubility of potassium nitrate rises as the water gets hotter. Below about 32 \xB0C the water cannot hold all 50 g, so the solution is saturated and the extra solid sits on the bottom. Cool a hot solution and crystals come back out."
  }, /*#__PURE__*/React.createElement(Slider, {
    label: "Temperature",
    min: 0,
    max: 60,
    step: 5,
    value: t,
    onChange: setT,
    unit: " \xB0C"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 16,
      alignItems: "center",
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 200 150",
    width: "100%",
    style: {
      maxWidth: 220
    },
    role: "img",
    "aria-label": saturated ? "Beaker at ".concat(t, " degrees with ").concat(Math.round(left), " grams of undissolved solid on the bottom") : "Beaker at ".concat(t, " degrees with all the solid dissolved")
  }, /*#__PURE__*/React.createElement("rect", {
    x: "52",
    y: "44",
    width: "96",
    height: "92",
    fill: "var(--accent)",
    opacity: 0.15 + 0.35 * (Math.min(ADD, s) / ADD)
  }), /*#__PURE__*/React.createElement("path", {
    d: "M46,20 L52,26 L52,136 Q52,142 58,142 L142,142 Q148,142 148,136 L148,26 L154,20",
    fill: "none",
    stroke: "var(--ink)",
    strokeWidth: "2.5"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "52",
    y1: "44",
    x2: "148",
    y2: "44",
    stroke: "var(--ink-muted)",
    strokeWidth: "1"
  }), saturated && /*#__PURE__*/React.createElement("path", {
    d: "M60,141 Q100,".concat(141 - pile * 2, " 140,141 Z"),
    fill: "var(--ink)",
    opacity: "0.75"
  }), /*#__PURE__*/React.createElement("text", {
    x: "100",
    y: "14",
    textAnchor: "middle",
    fontSize: "12",
    fontWeight: "700",
    fill: "var(--ink)"
  }, t, " \xB0C")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "1 1 180px",
      display: "grid",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    value: "".concat(Math.round(s), " g"),
    label: "most that can dissolve in 100 g water"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: saturated ? "".concat(Math.round(left), " g left over") : "All 50 g dissolved",
    label: saturated ? "saturated solution" : "unsaturated solution"
  }))));
}

/* ============================================================
   SECTION 4.1  States of matter
   ============================================================ */
function StatesFigure() {
  var solid = [];
  for (var r = 0; r < 4; r++) for (var c = 0; c < 5; c++) solid.push([20 + c * 17, 104 - r * 17]);
  var liquid = [[20, 104], [37, 104], [55, 104], [72, 104], [89, 104], [28, 88], [46, 88], [64, 89], [82, 87], [21, 72], [40, 71], [70, 72], [89, 70], [55, 72]];
  var gas = [[22, 46], [80, 40], [50, 74], [88, 96], [24, 100]];
  var boxes = [["Solid", solid, "Fixed shape", "Fixed volume"], ["Liquid", liquid, "No fixed shape", "Fixed volume"], ["Gas", gas, "No fixed shape", "No fixed volume"]];
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 360 158",
    width: "100%",
    role: "img",
    style: {
      maxWidth: 520
    },
    "aria-label": "Three boxes of identical particles. Solid: particles packed in neat rows. Liquid: particles touching but jumbled, filling the bottom of the box. Gas: a few particles far apart."
  }, boxes.map(function (_ref2, i) {
    var _ref3 = _slicedToArray(_ref2, 4),
      name = _ref3[0],
      pts = _ref3[1],
      a = _ref3[2],
      b = _ref3[3];
    return /*#__PURE__*/React.createElement("g", {
      key: name,
      transform: "translate(".concat(i * 126, ", 0)")
    }, /*#__PURE__*/React.createElement("text", {
      x: "54",
      y: "16",
      textAnchor: "middle",
      fontSize: "13",
      fontWeight: "700",
      fill: "var(--ink)"
    }, name), /*#__PURE__*/React.createElement("rect", {
      x: "0",
      y: "24",
      width: "108",
      height: "92",
      rx: "6",
      fill: "var(--card)",
      stroke: "var(--ink)",
      strokeWidth: "1.5"
    }), pts.map(function (_ref4, k) {
      var _ref5 = _slicedToArray(_ref4, 2),
        x = _ref5[0],
        y = _ref5[1];
      return /*#__PURE__*/React.createElement("circle", {
        key: k,
        cx: x,
        cy: y,
        r: "7.5",
        fill: "var(--accent)",
        stroke: "var(--ink)",
        strokeWidth: "1"
      });
    }), /*#__PURE__*/React.createElement("text", {
      x: "54",
      y: "134",
      textAnchor: "middle",
      fontSize: "11",
      fill: "var(--ink-muted)"
    }, a), /*#__PURE__*/React.createElement("text", {
      x: "54",
      y: "149",
      textAnchor: "middle",
      fontSize: "11",
      fill: "var(--ink-muted)"
    }, b));
  }));
}
function WaterCycleFigure() {
  var box = function box(x, y, l1, l2, key) {
    return /*#__PURE__*/React.createElement("g", {
      key: key
    }, /*#__PURE__*/React.createElement("rect", {
      x: x,
      y: y,
      width: "132",
      height: "48",
      rx: "10",
      fill: "var(--card)",
      stroke: "var(--ink)",
      strokeWidth: "1.5"
    }), /*#__PURE__*/React.createElement("text", {
      x: x + 66,
      y: y + 20,
      textAnchor: "middle",
      fontSize: "11.5",
      fill: "var(--ink)"
    }, l1), /*#__PURE__*/React.createElement("text", {
      x: x + 66,
      y: y + 37,
      textAnchor: "middle",
      fontSize: "11.5",
      fontWeight: "700",
      fill: "var(--ink)"
    }, l2));
  };
  var arr = function arr(x1, y1, x2, y2) {
    return /*#__PURE__*/React.createElement("line", {
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2,
      stroke: "var(--ink)",
      strokeWidth: "1.8",
      markerEnd: "url(#wc-arrow)"
    });
  };
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 360 300",
    width: "100%",
    role: "img",
    style: {
      maxWidth: 480
    },
    "aria-label": "Water cycle as a loop of four boxes. Oceans, rivers and lakes are liquid. Evaporation turns them into water vapour, a gas. Condensation forms clouds of tiny liquid droplets. Precipitation falls as rain, a liquid, or as snow and hail, a solid. Snow and ice melt and run off back into rivers."
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("marker", {
    id: "wc-arrow",
    viewBox: "0 0 10 10",
    refX: "9",
    refY: "5",
    markerWidth: "7",
    markerHeight: "7",
    orient: "auto-start-reverse"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0,0 L10,5 L0,10 z",
    fill: "var(--ink)"
  }))), box(114, 6, "Water vapour in air", "GAS", "t"), box(2, 118, "Oceans, rivers, lakes", "LIQUID", "l"), box(226, 118, "Clouds: tiny droplets", "LIQUID", "r"), box(114, 246, "Snow and ice", "SOLID", "b"), arr(96, 116, 138, 58), /*#__PURE__*/React.createElement("text", {
    x: "104",
    y: "84",
    textAnchor: "end",
    fontSize: "11",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "evaporation"), arr(222, 58, 264, 116), /*#__PURE__*/React.createElement("text", {
    x: "250",
    y: "84",
    fontSize: "11",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "condensation"), arr(264, 168, 222, 244), /*#__PURE__*/React.createElement("text", {
    x: "250",
    y: "200",
    fontSize: "11",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "snow, hail"), /*#__PURE__*/React.createElement("text", {
    x: "250",
    y: "214",
    fontSize: "10.5",
    fill: "var(--ink-muted)"
  }, "(precipitation)"), arr(138, 244, 96, 168), /*#__PURE__*/React.createElement("text", {
    x: "106",
    y: "206",
    textAnchor: "end",
    fontSize: "11",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "melting,"), /*#__PURE__*/React.createElement("text", {
    x: "106",
    y: "220",
    textAnchor: "end",
    fontSize: "10.5",
    fill: "var(--ink-muted)"
  }, "then runoff"), arr(224, 142, 138, 142), /*#__PURE__*/React.createElement("text", {
    x: "181",
    y: "134",
    textAnchor: "middle",
    fontSize: "11",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "rain"), /*#__PURE__*/React.createElement("text", {
    x: "181",
    y: "158",
    textAnchor: "middle",
    fontSize: "10.5",
    fill: "var(--ink-muted)"
  }, "(precipitation)"));
}
function ChangesFigure() {
  var node = function node(x, y, label) {
    return /*#__PURE__*/React.createElement("g", {
      key: label
    }, /*#__PURE__*/React.createElement("rect", {
      x: x,
      y: y,
      width: "100",
      height: "40",
      rx: "10",
      fill: "var(--bg-2)",
      stroke: "var(--ink)",
      strokeWidth: "1.5"
    }), /*#__PURE__*/React.createElement("text", {
      x: x + 50,
      y: y + 25,
      textAnchor: "middle",
      fontSize: "13",
      fontWeight: "700",
      fill: "var(--ink)"
    }, label));
  };
  var heat = function heat(x1, y1, x2, y2) {
    return /*#__PURE__*/React.createElement("line", {
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2,
      stroke: "var(--accent)",
      strokeWidth: "2.4",
      markerEnd: "url(#cs-in)"
    });
  };
  var cool = function cool(x1, y1, x2, y2) {
    return /*#__PURE__*/React.createElement("line", {
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2,
      stroke: "var(--ink-muted)",
      strokeWidth: "2",
      strokeDasharray: "5 3",
      markerEnd: "url(#cs-out)"
    });
  };
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 360 296",
    width: "100%",
    role: "img",
    style: {
      maxWidth: 480
    },
    "aria-label": "Changes of state triangle. Solid to liquid is melting, liquid to solid is freezing. Liquid to gas is evaporation or boiling, gas to liquid is condensation. Solid to gas is sublimation, gas to solid is deposition. Melting, evaporation and sublimation take in energy; freezing, condensation and deposition give energy out."
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("marker", {
    id: "cs-in",
    viewBox: "0 0 10 10",
    refX: "9",
    refY: "5",
    markerWidth: "6",
    markerHeight: "6",
    orient: "auto"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0,0 L10,5 L0,10 z",
    fill: "var(--accent)"
  })), /*#__PURE__*/React.createElement("marker", {
    id: "cs-out",
    viewBox: "0 0 10 10",
    refX: "9",
    refY: "5",
    markerWidth: "6",
    markerHeight: "6",
    orient: "auto"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0,0 L10,5 L0,10 z",
    fill: "var(--ink-muted)"
  }))), node(130, 10, "GAS"), node(10, 200, "SOLID"), node(250, 200, "LIQUID"), heat(112, 212, 246, 212), /*#__PURE__*/React.createElement("text", {
    x: "180",
    y: "205",
    textAnchor: "middle",
    fontSize: "11",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "melting"), cool(248, 230, 114, 230), /*#__PURE__*/React.createElement("text", {
    x: "180",
    y: "248",
    textAnchor: "middle",
    fontSize: "11",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "freezing"), heat(300, 196, 228, 56), /*#__PURE__*/React.createElement("text", {
    x: "270",
    y: "116",
    fontSize: "11",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "evaporation"), /*#__PURE__*/React.createElement("text", {
    x: "270",
    y: "130",
    fontSize: "11",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "or boiling"), cool(210, 58, 282, 196), /*#__PURE__*/React.createElement("text", {
    x: "250",
    y: "160",
    textAnchor: "end",
    fontSize: "11",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "condensation"), heat(50, 196, 128, 48), /*#__PURE__*/React.createElement("text", {
    x: "82",
    y: "116",
    textAnchor: "end",
    fontSize: "11",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "sublimation"), cool(146, 56, 68, 196), /*#__PURE__*/React.createElement("text", {
    x: "106",
    y: "160",
    fontSize: "11",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "deposition"), /*#__PURE__*/React.createElement("line", {
    x1: "40",
    y1: "268",
    x2: "68",
    y2: "268",
    stroke: "var(--accent)",
    strokeWidth: "2.4"
  }), /*#__PURE__*/React.createElement("text", {
    x: "74",
    y: "272",
    fontSize: "11",
    fill: "var(--ink)"
  }, "energy taken in (heating)"), /*#__PURE__*/React.createElement("line", {
    x1: "40",
    y1: "286",
    x2: "68",
    y2: "286",
    stroke: "var(--ink-muted)",
    strokeWidth: "2",
    strokeDasharray: "5 3"
  }), /*#__PURE__*/React.createElement("text", {
    x: "74",
    y: "290",
    fontSize: "11",
    fill: "var(--ink)"
  }, "energy given out (cooling)"));
}
function Section41(_ref6) {
  var progress = _ref6.progress,
    setProgress = _ref6.setProgress;
  var p = {
    progress: progress,
    setProgress: setProgress
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "4.1 States of matter"), /*#__PURE__*/React.createElement("h1", null, "Solids, liquids, gases and changes of state"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Everything is made of particles. The state a substance is in depends on how its particles are arranged and how much energy they have.")), /*#__PURE__*/React.createElement(DotPoint, _extends({
    id: "4.1.1",
    title: "The three states of matter and the water cycle"
  }, p), /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "important"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "The three states of matter are ", /*#__PURE__*/React.createElement(Term, {
    def: "Particles packed tightly in a fixed pattern, vibrating on the spot."
  }, "solid"), ", ", /*#__PURE__*/React.createElement(Term, {
    def: "Particles close together but able to slide past each other."
  }, "liquid"), " and ", /*#__PURE__*/React.createElement(Term, {
    def: "Particles far apart, moving fast in all directions."
  }, "gas"), "."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Solid:"), " fixed shape and fixed volume. ", /*#__PURE__*/React.createElement("strong", null, "Liquid:"), " fixed volume but takes the shape of its container. ", /*#__PURE__*/React.createElement("strong", null, "Gas:"), " no fixed shape or volume; spreads out to fill any container and can be squashed (compressed)."), /*#__PURE__*/React.createElement("li", null, "Water is the only common substance found naturally on Earth in all three states: ice and snow (solid), oceans, rivers and rain (liquid), and water vapour in the air (gas)."), /*#__PURE__*/React.createElement("li", null, "In the water cycle, water keeps changing state: ", /*#__PURE__*/React.createElement("strong", null, "evaporation"), " (liquid \u2192 gas), ", /*#__PURE__*/React.createElement("strong", null, "condensation"), " (gas \u2192 liquid), ", /*#__PURE__*/React.createElement("strong", null, "freezing"), " (liquid \u2192 solid) and ", /*#__PURE__*/React.createElement("strong", null, "melting"), " (solid \u2192 liquid). ", /*#__PURE__*/React.createElement("strong", null, "Precipitation"), " is water falling as rain (liquid) or snow and hail (solid)."), /*#__PURE__*/React.createElement("li", null, "Common mistake: water vapour is invisible. The white \"steam\" you see above a kettle or the clouds in the sky are tiny ", /*#__PURE__*/React.createElement("em", null, "liquid"), " droplets, not gas."))), /*#__PURE__*/React.createElement(Figure, {
    caption: "The same particles in three states. Only the spacing and movement change, never the particles themselves."
  }, /*#__PURE__*/React.createElement(StatesFigure, null)), /*#__PURE__*/React.createElement(Figure, {
    caption: "Water changes state as it moves around the water cycle."
  }, /*#__PURE__*/React.createElement(WaterCycleFigure, null)), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Following water through the seasons",
    problem: "A small lake high in the mountains is frozen solid in winter. By late summer the lake is much lower. Describe the changes of state that happen to the water, naming the state at each stage. (3 marks)",
    steps: ["Start with the state in winter: the frozen lake is ice, which is a solid.", "Spring: the Sun warms the ice and it melts. Melting is a change from solid to liquid water.", "Summer: water at the surface of the lake evaporates into the air. Evaporation is a change from liquid to gas (water vapour), so the lake level drops.", "Check: each mark comes from naming a change AND the states either side of it."],
    answer: "In winter the water is solid ice. In spring the ice melts (solid \u2192 liquid). In summer some of the liquid water evaporates from the surface into the air as water vapour (liquid \u2192 gas), which is why the lake level falls."
  }), /*#__PURE__*/React.createElement(Practice, {
    title: "States of matter and the water cycle"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 1,
    question: "Which state of matter has a fixed volume but takes the shape of its container?",
    options: ["Solid", "Liquid", "Gas", "Both solid and gas"],
    correct: 1,
    explain: "A liquid keeps the same volume but flows to fit its container. A solid keeps its own shape, so it is not the answer, and a gas has no fixed volume at all."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 2,
    question: "Snow falls on a mountain in winter. In spring it ends up in a river, and on a hot day some of the river water goes into the air. What are the states of the water, in order?",
    options: ["Solid → gas → liquid", "Liquid → liquid → gas", "Solid → liquid → gas", "Solid → liquid → liquid"],
    correct: 2,
    explain: "Snow is solid, river water is liquid, and water that goes into the air on a hot day has evaporated into water vapour, a gas. Option D is tempting, but water that 'goes into the air' is no longer a liquid."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 3,
    question: "During a storm, hailstones fall onto a car park. Which state of matter are the hailstones?",
    options: ["Liquid, because all precipitation is liquid", "Gas, because they formed in a cloud", "Solid, because hail is ice", "A mixture of all three states"],
    correct: 2,
    explain: "Hail is lumps of ice, so it is a solid. Precipitation can be liquid (rain) or solid (snow and hail), so 'all precipitation is liquid' is wrong."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 4,
    question: "After rain, a puddle forms in the school playground. By the afternoon it has disappeared. Identify the change of state, and describe where the water went. (2 marks)",
    model: "The water evaporated: it changed from a liquid to a gas (water vapour). The water did not disappear; it moved into the air as invisible water vapour, helped by heat from the Sun and the wind."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "4.1.1",
    items: ["I can describe the shape and volume of solids, liquids and gases.", "I can give an example of water in each state on Earth.", "I can name the changes of state in the water cycle (evaporation, condensation, freezing, melting).", "I can explain why visible 'steam' and clouds are liquid droplets, not gas."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#4.1",
    label: "Learn it in full: 4.1 Properties of Matter"
  })), /*#__PURE__*/React.createElement(DotPoint, _extends({
    id: "4.1.3",
    title: "Changes of state explained with particles"
  }, p), /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "important"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Solid:"), " particles packed closely in a regular pattern, held by strong attractions; they only ", /*#__PURE__*/React.createElement("em", null, "vibrate"), " on the spot. ", /*#__PURE__*/React.createElement("strong", null, "Liquid:"), " particles still touching but can slide and move past each other. ", /*#__PURE__*/React.createElement("strong", null, "Gas:"), " particles far apart, moving fast and randomly in all directions."), /*#__PURE__*/React.createElement("li", null, "Heating gives particles more ", /*#__PURE__*/React.createElement(Term, {
    def: "Energy of movement. Hotter particles have more of it and move faster."
  }, "kinetic energy"), ", so they move faster and spread apart. Cooling does the opposite."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Melting"), " (solid \u2192 liquid): particles vibrate so much they break out of their fixed positions. ", /*#__PURE__*/React.createElement("strong", null, "Freezing"), " is the reverse."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Evaporation"), " happens only at the surface, at any temperature, when the fastest particles escape. ", /*#__PURE__*/React.createElement("strong", null, "Boiling"), " happens throughout the liquid (bubbles form) and only at the boiling point (100 \xB0C for water). ", /*#__PURE__*/React.createElement("strong", null, "Condensation"), " (gas \u2192 liquid): gas particles cool, slow down and come close together."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Term, {
    def: "A change straight from solid to gas, without becoming a liquid."
  }, "Sublimation"), ": solid \u2192 gas directly (dry ice, mothballs). The reverse (gas \u2192 solid) is called deposition, which is how frost forms."), /*#__PURE__*/React.createElement("li", null, "Common mistake: particles do not melt, expand or get bigger. Only their ", /*#__PURE__*/React.createElement("em", null, "spacing"), " and ", /*#__PURE__*/React.createElement("em", null, "movement"), " change. The mass stays the same."))), /*#__PURE__*/React.createElement(Figure, {
    caption: "The six changes of state. Solid coloured arrows take in energy; grey dashed arrows give energy out."
  }, /*#__PURE__*/React.createElement(ChangesFigure, null)), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Explaining with particles",
    problem: "A square of chocolate held in your hand slowly melts. Explain this using particle theory. (3 marks)",
    steps: ["Cause: heat energy moves from your warm hand into the chocolate.", "Effect on particles: the chocolate's particles gain kinetic energy and vibrate faster and harder.", "Link to the change of state: they vibrate enough to overcome the attractions holding them in fixed positions, so they can slide past each other. The solid has become a liquid."],
    answer: "Heat from the hand is transferred to the chocolate. Its particles gain energy and vibrate more strongly, until they break free of their fixed positions and can slide past each other. The chocolate changes from a solid to a liquid (melting)."
  }), /*#__PURE__*/React.createElement(ExamTip, null, "\"Explain\" questions want a chain: ", /*#__PURE__*/React.createElement("strong", null, "cause \u2192 what the particles do \u2192 the change you see"), ". Use the words energy, arrangement and movement. Just naming the change (\"it melts\") usually earns only one mark."), /*#__PURE__*/React.createElement(Practice, {
    title: "Particles and changes of state"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 5,
    question: "When a liquid freezes, what happens to its particles?",
    options: ["They lose energy, slow down and settle into fixed positions", "They shrink and become smaller", "They stop moving completely", "They move further apart"],
    correct: 0,
    explain: "Freezing removes energy, so particles slow until they lock into a fixed pattern. They still vibrate, so 'stop moving completely' is wrong, and particles never change size."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 6,
    question: "A block of dry ice (solid carbon dioxide) on a bench gives off a gas and gets smaller, but no puddle forms. What is this change called?",
    options: ["Evaporation", "Melting", "Condensation", "Sublimation"],
    correct: 3,
    explain: "Dry ice goes straight from solid to gas, which is sublimation. Melting would leave a liquid puddle, and evaporation starts from a liquid."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 7,
    question: "Compare evaporation and boiling. (2 marks)",
    model: "Both are changes from liquid to gas. Evaporation happens only at the surface of the liquid and can happen at any temperature below the boiling point. Boiling happens throughout the whole liquid, with bubbles of gas forming, and only at the boiling point."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 8,
    question: "After a hot shower, the bathroom mirror becomes covered in tiny water droplets. Explain why, using particle theory. (3 marks)",
    model: "The hot shower puts lots of water vapour (gas) into the air, with particles moving fast and far apart. When these particles hit the cold mirror they lose energy and slow down. They come close together and attract each other, forming liquid droplets on the mirror. This is condensation (gas \u2192 liquid)."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "4.1.3",
    items: ["I can describe the arrangement and movement of particles in solids, liquids and gases.", "I can explain melting, freezing, evaporation, boiling and condensation using particles and energy.", "I can compare evaporation and boiling.", "I can give an example of sublimation."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#4.1",
    label: "Learn it in full: 4.1 Properties of Matter"
  })));
}

/* ============================================================
   SECTION 4.2  Density
   ============================================================ */
function OverflowFigure() {
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 360 230",
    width: "100%",
    role: "img",
    style: {
      maxWidth: 480
    },
    "aria-label": "An overflow can filled with water up to its spout. An object on a string is lowered fully under the water. The water it pushes out flows down the spout into a measuring cylinder. The volume collected equals the volume of the object."
  }, /*#__PURE__*/React.createElement("rect", {
    x: "22",
    y: "78",
    width: "96",
    height: "120",
    fill: "var(--accent)",
    opacity: "0.22"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M20,50 L20,198 Q20,202 24,202 L116,202 Q120,202 120,198 L120,50",
    fill: "none",
    stroke: "var(--ink)",
    strokeWidth: "2.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M120,72 L168,96",
    stroke: "var(--ink)",
    strokeWidth: "2.5",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M120,82 L166,105",
    stroke: "var(--ink)",
    strokeWidth: "2.5",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M126,79 L164,98",
    stroke: "var(--accent)",
    strokeWidth: "4",
    opacity: "0.6"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "170",
    cy: "114",
    r: "2.6",
    fill: "var(--accent)"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "171",
    cy: "126",
    r: "2.6",
    fill: "var(--accent)"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "70",
    y1: "10",
    x2: "70",
    y2: "132",
    stroke: "var(--ink-muted)",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M56,140 Q60,128 72,130 Q88,132 86,146 Q90,160 74,162 Q56,164 58,152 Q50,146 56,140 Z",
    fill: "var(--ink-muted)",
    stroke: "var(--ink)",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "156",
    y: "168",
    width: "32",
    height: "40",
    fill: "var(--accent)",
    opacity: "0.3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M154,132 L154,208 L190,208 L190,132",
    fill: "none",
    stroke: "var(--ink)",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "146",
    y1: "210",
    x2: "198",
    y2: "210",
    stroke: "var(--ink)",
    strokeWidth: "2.5"
  }), [144, 156, 168, 180, 192].map(function (yy) {
    return /*#__PURE__*/React.createElement("line", {
      key: yy,
      x1: "154",
      y1: yy,
      x2: "162",
      y2: yy,
      stroke: "var(--ink)",
      strokeWidth: "1"
    });
  }), /*#__PURE__*/React.createElement("line", {
    x1: "124",
    y1: "40",
    x2: "114",
    y2: "50",
    stroke: "var(--ink-muted)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("text", {
    x: "126",
    y: "38",
    fontSize: "11.5",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "Overflow can"), /*#__PURE__*/React.createElement("text", {
    x: "70",
    y: "222",
    textAnchor: "middle",
    fontSize: "11",
    fill: "var(--ink)"
  }, "object fully under water"), /*#__PURE__*/React.createElement("text", {
    x: "204",
    y: "140",
    fontSize: "11.5",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "Measuring cylinder"), /*#__PURE__*/React.createElement("line", {
    x1: "192",
    y1: "180",
    x2: "202",
    y2: "180",
    stroke: "var(--ink-muted)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("text", {
    x: "206",
    y: "172",
    fontSize: "11",
    fill: "var(--ink)"
  }, "volume of water"), /*#__PURE__*/React.createElement("text", {
    x: "206",
    y: "186",
    fontSize: "11",
    fill: "var(--ink)"
  }, "pushed out ="), /*#__PURE__*/React.createElement("text", {
    x: "206",
    y: "200",
    fontSize: "11",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "volume of object"));
}
function Section42(_ref7) {
  var progress = _ref7.progress,
    setProgress = _ref7.setProgress;
  var p = {
    progress: progress,
    setProgress: setProgress
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "4.2 Density"), /*#__PURE__*/React.createElement("h1", null, "Calculating density"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Density tells you how much mass is packed into each cubic centimetre of a substance. It decides whether things float or sink.")), /*#__PURE__*/React.createElement(DotPoint, _extends({
    id: "4.2.3",
    title: "Density: \u03C1 = m / V for regular and irregular objects"
  }, p), /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "important"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Term, {
    def: "How much mass is packed into each unit of volume."
  }, "Density"), " = mass \xF7 volume, written ", /*#__PURE__*/React.createElement("strong", null, "\u03C1 = m / V"), " (\u03C1 is the Greek letter rho)."), /*#__PURE__*/React.createElement("li", null, "Units: mass in grams (g), volume in cm\xB3 or mL, so density is in ", /*#__PURE__*/React.createElement("strong", null, "g/cm\xB3"), " (or g/mL). ", /*#__PURE__*/React.createElement("strong", null, "1 mL = 1 cm\xB3"), "."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Regular object"), " (a box shape): measure length, width and height with a ruler, then volume = l \xD7 w \xD7 h."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Irregular object"), " (a key, a toy): use the ", /*#__PURE__*/React.createElement(Term, {
    def: "Finding the volume of an object from the volume of water it pushes aside when fully submerged."
  }, "displacement method"), ". Lower it fully under water in an overflow can and collect the water that spills out in a measuring cylinder, or read the rise in water level in a measuring cylinder. Volume of object = volume of water displaced."), /*#__PURE__*/React.createElement("li", null, "Water has a density of 1.0 g/cm\xB3. Objects with a density less than 1.0 g/cm\xB3 float in water; greater than 1.0 g/cm\xB3 sink."), /*#__PURE__*/React.createElement("li", null, "Common mistake: dividing the wrong way (V \xF7 m). Mass always goes on top."))), /*#__PURE__*/React.createElement(Figure, {
    caption: "The displacement method for an irregular object using an overflow can."
  }, /*#__PURE__*/React.createElement(OverflowFigure, null)), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Density of an irregular object",
    problem: "Mia wants to find the density of a brass door key. Its mass is 34 g. She lowers it into a full overflow can and collects 4 mL of water in a measuring cylinder. Calculate the density of the key. (2 marks)",
    steps: ["Volume: the key pushed out 4 mL of water, and 1 mL = 1 cm³, so V = 4 cm³.", "Formula: ρ = m / V", "Substitute: ρ = 34 g ÷ 4 cm³", "Answer with unit: ρ = 8.5 g/cm³"],
    answer: "\u03C1 = m / V = 34 \xF7 4 = 8.5 g/cm\xB3. This is much more than water (1.0 g/cm\xB3), so the key sinks."
  }), /*#__PURE__*/React.createElement(ExamTip, null, "For every calculation, write three lines: ", /*#__PURE__*/React.createElement("strong", null, "formula \u2192 substitution with units \u2192 answer with unit"), ". You can earn marks for working even if the final number is wrong, and a missing unit often costs a mark."), /*#__PURE__*/React.createElement(Practice, {
    title: "Density calculations"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 9,
    question: "A wooden block measures 10 cm \xD7 5 cm \xD7 2 cm and has a mass of 60 g. What is its density?",
    options: ["0.6 g/cm³", "1.67 g/cm³", "6 g/cm³", "6000 g/cm³"],
    correct: 0,
    explain: "V = 10 \xD7 5 \xD7 2 = 100 cm\xB3, so \u03C1 = 60 \xF7 100 = 0.6 g/cm\xB3. 1.67 g/cm\xB3 comes from dividing volume by mass, which is the wrong way round."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 10,
    question: "A plastic toy dinosaur is lowered into a full overflow can and 15 mL of water flows into the measuring cylinder. What is the volume of the toy?",
    options: ["1.5 cm³", "15 cm³", "150 cm³", "It cannot be worked out without the mass"],
    correct: 1,
    explain: "The volume of water pushed out equals the volume of the toy, and 1 mL = 1 cm\xB3, so it is 15 cm\xB3. You only need the mass if you want the density."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 11,
    question: "A glass marble has a mass of 12.5 g. In an overflow can it displaces 5 mL of water. Calculate its density, and state whether it will float or sink in water. Justify your answer. (3 marks)",
    model: "\u03C1 = m / V = 12.5 g \xF7 5 cm\xB3 = 2.5 g/cm\xB3. The marble will sink, because its density (2.5 g/cm\xB3) is greater than the density of water (1.0 g/cm\xB3)."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 12,
    question: "Which of these objects would float in water (density 1.0 g/cm\xB3)?",
    options: ["Steel nut, 7.9 g/cm³", "Candle wax, 0.9 g/cm³", "Glass bead, 2.5 g/cm³", "Rubber eraser, 1.5 g/cm³"],
    correct: 1,
    explain: "Only the candle wax has a density less than 1.0 g/cm\xB3, so only it floats. The rubber eraser feels light, but 1.5 g/cm\xB3 is greater than water, so it sinks."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "4.2.3",
    items: ["I can calculate density with ρ = m / V and give the unit g/cm³.", "I can find the volume of a regular object with l × w × h.", "I can describe the displacement method for an irregular object.", "I can use 1 mL = 1 cm³ and predict float or sink by comparing with 1.0 g/cm³."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#4.2",
    label: "Learn it in full: 4.2 Properties of Water"
  })));
}

/* ============================================================
   SECTION 4.3  Solubility and investigating
   ============================================================ */
function SolutionFigure() {
  var solvent = [[18, 40], [44, 34], [70, 42], [30, 62], [58, 60], [80, 66], [16, 86], [42, 84], [68, 88], [28, 106], [54, 108], [80, 104]];
  var solute = [[33, 100], [45, 100], [57, 100], [39, 89], [51, 89]];
  var spread = [[30, 48], [62, 74], [22, 96], [76, 52], [50, 104]];
  var sq = function sq(x, y, k) {
    return /*#__PURE__*/React.createElement("rect", {
      key: k,
      x: x - 5,
      y: y - 5,
      width: "10",
      height: "10",
      fill: "var(--accent)",
      stroke: "var(--ink)",
      strokeWidth: "1"
    });
  };
  var ci = function ci(x, y, k) {
    return /*#__PURE__*/React.createElement("circle", {
      key: k,
      cx: x,
      cy: y,
      r: "5",
      fill: "var(--card)",
      stroke: "var(--ink-muted)",
      strokeWidth: "1.4"
    });
  };
  var panel = function panel(x, label1, label2, children) {
    return /*#__PURE__*/React.createElement("g", {
      transform: "translate(".concat(x, ",0)")
    }, /*#__PURE__*/React.createElement("rect", {
      x: "0",
      y: "20",
      width: "96",
      height: "100",
      rx: "6",
      fill: "none",
      stroke: "var(--ink)",
      strokeWidth: "1.5"
    }), children, /*#__PURE__*/React.createElement("text", {
      x: "48",
      y: "138",
      textAnchor: "middle",
      fontSize: "12",
      fontWeight: "700",
      fill: "var(--ink)"
    }, label1), /*#__PURE__*/React.createElement("text", {
      x: "48",
      y: "153",
      textAnchor: "middle",
      fontSize: "11",
      fill: "var(--ink-muted)"
    }, label2));
  };
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 360 160",
    width: "100%",
    role: "img",
    style: {
      maxWidth: 480
    },
    "aria-label": "Solute plus solvent makes a solution. The solute is a clump of square particles. The solvent is many round particles. In the solution the square solute particles are spread evenly between the solvent particles."
  }, panel(0, "Solute", "e.g. sugar", solute.map(function (_ref8, k) {
    var _ref9 = _slicedToArray(_ref8, 2),
      x = _ref9[0],
      y = _ref9[1];
    return sq(x, y, k);
  })), /*#__PURE__*/React.createElement("text", {
    x: "114",
    y: "76",
    textAnchor: "middle",
    fontSize: "22",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "+"), panel(132, "Solvent", "e.g. water", solvent.map(function (_ref0, k) {
    var _ref1 = _slicedToArray(_ref0, 2),
      x = _ref1[0],
      y = _ref1[1];
    return ci(x, y, k);
  })), /*#__PURE__*/React.createElement("text", {
    x: "246",
    y: "76",
    textAnchor: "middle",
    fontSize: "22",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "\u2192"), panel(264, "Solution", "sugar water", [].concat(_toConsumableArray(solvent.map(function (_ref10, k) {
    var _ref11 = _slicedToArray(_ref10, 2),
      x = _ref11[0],
      y = _ref11[1];
    return ci(x, y, "c" + k);
  })), _toConsumableArray(spread.map(function (_ref12, k) {
    var _ref13 = _slicedToArray(_ref12, 2),
      x = _ref13[0],
      y = _ref13[1];
    return sq(x, y, "s" + k);
  })))));
}
function Section43(_ref14) {
  var progress = _ref14.progress,
    setProgress = _ref14.setProgress;
  var p = {
    progress: progress,
    setProgress: setProgress
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "4.3 Solubility and investigating"), /*#__PURE__*/React.createElement("h1", null, "Solutions, solubility and fair tests"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "This section joins the chemistry of dissolving with the skills of running an investigation and graphing the results. Both are worth a lot of marks.")), /*#__PURE__*/React.createElement(DotPoint, _extends({
    id: "4.3.1",
    title: "Solution words: solute, solvent, solubility and more"
  }, p), /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "important"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Term, {
    def: "The substance that dissolves."
  }, "Solute"), ": the substance that dissolves (e.g. sugar). ", /*#__PURE__*/React.createElement(Term, {
    def: "The substance that does the dissolving, usually a liquid such as water."
  }, "Solvent"), ": the substance it dissolves in (usually water). ", /*#__PURE__*/React.createElement(Term, {
    def: "A mixture in which a solute is spread evenly through a solvent."
  }, "Solution"), ": solute + solvent mixed evenly. A solution is see-through (it may still be coloured)."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Soluble"), ": can dissolve in a solvent (sugar in water). ", /*#__PURE__*/React.createElement("strong", null, "Insoluble"), ": cannot dissolve (sand in water)."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Term, {
    def: "The maximum mass of a solute that dissolves in a set amount of solvent at a set temperature."
  }, "Solubility"), ": the ", /*#__PURE__*/React.createElement("em", null, "maximum"), " mass of solute that will dissolve in a set amount of solvent (usually 100 g of water) at a set temperature."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Term, {
    def: "A cloudy mixture of tiny insoluble particles spread through a liquid; they settle over time."
  }, "Suspension"), ": insoluble particles spread through a liquid. It looks cloudy, the particles settle if left to stand, and filtering removes them."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Saturated"), ": no more solute will dissolve at that temperature; extra solid stays at the bottom. ", /*#__PURE__*/React.createElement("strong", null, "Dilute"), ": a small amount of solute in the solvent. ", /*#__PURE__*/React.createElement("strong", null, "Concentrated"), ": a large amount of solute in the solvent."), /*#__PURE__*/React.createElement("li", null, "Common mistake: dissolving is not melting. The sugar does not turn into a liquid; its particles spread out between the water particles."))), /*#__PURE__*/React.createElement(Figure, {
    caption: "When a solute dissolves, its particles spread evenly between the solvent particles to make a solution."
  }, /*#__PURE__*/React.createElement(SolutionFigure, null)), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Using the right words",
    problem: "Ella makes lime cordial by stirring 40 mL of cordial syrup into 200 mL of water. Her brother says it is too strong, so she adds another 200 mL of water. Identify the solute, solvent and solution, and describe what happened to the concentration. (3 marks)",
    steps: ["Solute: the cordial syrup (it is what dissolves).", "Solvent: the water (it does the dissolving). Solution: the lime drink, because the syrup is spread evenly through the water.", "Concentration: the same amount of solute is now spread through more water, so the drink became more dilute (less concentrated)."],
    answer: "Solute = cordial syrup, solvent = water, solution = the lime drink. Adding water made the solution more dilute: the same amount of solute is in a larger volume."
  }), /*#__PURE__*/React.createElement(Practice, {
    title: "Solution words"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 13,
    question: "Instant coffee granules are stirred into hot water until they disappear. The coffee granules are the\u2026",
    options: ["solvent", "solute", "suspension", "solution"],
    correct: 1,
    explain: "The granules dissolve, so they are the solute. The hot water is the solvent, and the finished drink is the solution."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 14,
    question: "Liquid A is blue, and a torch beam shines straight through it. Liquid B is muddy brown creek water with gritty bits; the torch beam is blocked, and when B is poured through filter paper a layer of brown silt and sand is left on the paper. Which describes the two liquids?",
    options: ["A is a solution; B is a suspension", "A is a suspension; B is a solution", "A and B are both solutions", "A is a pure substance; B is a solution"],
    correct: 0,
    explain: "A solution can be coloured but is see-through, and filtering cannot remove a dissolved solute, so A is a solution. B is cloudy and filter paper traps its solid particles, so they are undissolved: B is a suspension. Calling A a suspension because it is coloured is the trap; colour is not the same as cloudiness."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 15,
    question: "Jack keeps stirring sugar into a glass of iced tea. Eventually some sugar stays on the bottom, no matter how long he stirs. The iced tea is now\u2026",
    options: ["saturated", "dilute", "insoluble", "a suspension"],
    correct: 0,
    explain: "When no more solute will dissolve at that temperature, the solution is saturated. Sugar is still soluble; the water simply cannot hold any more."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 16,
    question: "Two cups of blackcurrant drink are made. Cup A: 20 mL of syrup + 180 mL of water. Cup B: 60 mL of syrup + 140 mL of water. Which cup is more concentrated? Explain. (2 marks)",
    model: "Cup B is more concentrated. Both cups hold 200 mL in total, but Cup B has three times as much solute (60 mL of syrup compared with 20 mL), so there is more solute in the same volume of solution."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "4.3.1",
    items: ["I can define solute, solvent and solution and identify each in an everyday example.", "I can explain the difference between soluble and insoluble.", "I can tell a solution from a suspension.", "I can use saturated, dilute and concentrated correctly."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#4.3",
    label: "Learn it in full: 4.3 Solutions"
  })), /*#__PURE__*/React.createElement(DotPoint, _extends({
    id: "4.3.2",
    title: "Measuring solubility in a practical investigation"
  }, p), /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "core"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Solubility is usually given in ", /*#__PURE__*/React.createElement("strong", null, "grams of solute per 100 g of water"), " (or per 100 mL; 100 mL of water has a mass of about 100 g)."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Method:"), " measure a set volume of water (e.g. 50 mL) with a measuring cylinder, keep it at a set temperature, then add the solute in small weighed amounts, stirring after each one. Stop when some solid will not dissolve: the solution is saturated. Total mass added before that point = mass dissolved."), /*#__PURE__*/React.createElement("li", null, "An easy way to weigh it: weigh the solute before you start and the leftover solute at the end. Mass dissolved = start mass \u2212 leftover mass."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Scale up to 100:"), " if 50 mL dissolves 16 g, then 100 mL dissolves 32 g, so the solubility is 32 g per 100 mL."), /*#__PURE__*/React.createElement("li", null, "Repeat each measurement (at least three trials) and calculate the average, so the result is more reliable."), /*#__PURE__*/React.createElement("li", null, "Results tables: the variable you change goes in the first column; units go in the column headings, not in every cell.")), /*#__PURE__*/React.createElement("div", {
    style: tableWrap
  }, /*#__PURE__*/React.createElement("table", {
    className: "data-table",
    style: {
      fontSize: "0.88rem"
    }
  }, /*#__PURE__*/React.createElement("caption", {
    style: {
      captionSide: "top",
      textAlign: "left",
      fontWeight: 700,
      marginBottom: 6
    }
  }, "Table 1. Solubility of some substances in water at 20 \xB0C"), /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Substance"), /*#__PURE__*/React.createElement("th", null, "Solubility (g per 100 g water)"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Sugar (sucrose)"), /*#__PURE__*/React.createElement("td", null, "about 200")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Potassium nitrate"), /*#__PURE__*/React.createElement("td", null, "about 32")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Baking soda (sodium hydrogen carbonate)"), /*#__PURE__*/React.createElement("td", null, "about 10")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Sand"), /*#__PURE__*/React.createElement("td", null, "0 (insoluble)")))))), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Calculating solubility from results",
    problem: "Noah weighs out 30.0 g of potassium nitrate. He adds it bit by bit to 50 mL of water at 20 \xB0C, stirring each time, until no more will dissolve. 14.0 g is left in the weighing boat. Calculate the solubility in g per 100 mL. (2 marks)",
    steps: ["Mass dissolved = start mass − leftover mass = 30.0 g − 14.0 g = 16.0 g.", "This dissolved in 50 mL. 100 mL is twice as much water, so multiply by 2.", "Solubility = 16.0 g × 2 = 32 g per 100 mL."],
    answer: "32 g per 100 mL of water at 20 \xB0C."
  }), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Writing a full-mark method",
    problem: "Write a method to measure the solubility of baking soda in water at room temperature. (4 marks)",
    steps: ["Use numbered steps and name the equipment with amounts: '1. Use a measuring cylinder to pour 50 mL of water into a beaker.'", "Say how you add the solute and measure it: '2. Weigh 10.0 g of baking soda on an electronic balance. 3. Add one spatula at a time, stirring until it dissolves.'", "Say how you know when to stop: '4. Stop when some solid stays undissolved after one minute of stirring. 5. Weigh the baking soda that is left over.'", "Show how you get the answer and make it reliable: '6. Mass dissolved = 10.0 g − leftover mass; multiply by 2 for g per 100 mL. 7. Repeat three times with fresh water at the same temperature and average.'"],
    answer: "A full-mark method has numbered steps, equipment with quantities, a clear end point (solid stays undissolved), a calculation, controlled variables (same volume and temperature of water) and repeats with an average."
  }), /*#__PURE__*/React.createElement(ExamTip, null, "\"Describe a method\" questions are marked on whether someone else could repeat your experiment exactly. Include quantities (50 mL, 10.0 g), the equipment, what you measure, and how many times you repeat it."), /*#__PURE__*/React.createElement(Practice, {
    title: "Measuring solubility"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 17,
    question: "During a solubility experiment, how can you tell that the solution has become saturated?",
    options: ["The solution turns colourless", "Some solid stays undissolved even after thorough stirring", "The beaker feels warm", "The solute starts to melt"],
    correct: 1,
    explain: "Saturated means the water cannot dissolve any more, so extra solid is left over however long you stir. A colour change or a temperature change is not the sign to look for."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 18,
    question: "25 mL of water at 20 \xB0C dissolves 2.5 g of baking soda before it becomes saturated. What is the solubility in g per 100 mL?",
    options: ["2.5 g per 100 mL", "10 g per 100 mL", "62.5 g per 100 mL", "100 g per 100 mL"],
    correct: 1,
    explain: "100 mL is 4 times 25 mL, so 2.5 g \xD7 4 = 10 g per 100 mL. 62.5 comes from multiplying 25 by 2.5, which mixes up the volume and the mass."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 19,
    question: "In a different practical, Mila uses a stopwatch to time how long a pendulum takes to make 10 complete swings. She does this three times and calculates the average time. Why does she repeat it?",
    options: ["To make the test fair", "To change the independent variable", "To make the result more reliable", "To make the pendulum swing faster"],
    correct: 2,
    explain: "Each timing has small random errors (for example, pressing the stopwatch a little early or late), and averaging several trials reduces their effect, so the result is more reliable. 'To make the test fair' is tempting, but a fair test is about controlling variables, which is a different idea."
  }), /*#__PURE__*/React.createElement("div", {
    style: tableWrap
  }, /*#__PURE__*/React.createElement("table", {
    className: "data-table",
    style: {
      fontSize: "0.88rem"
    }
  }, /*#__PURE__*/React.createElement("caption", {
    style: {
      captionSide: "top",
      textAlign: "left",
      fontWeight: 700,
      marginBottom: 6
    }
  }, "Table 2. Mass of potassium nitrate dissolved in 50 mL of water at 20 \xB0C"), /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Trial"), /*#__PURE__*/React.createElement("th", null, "1"), /*#__PURE__*/React.createElement("th", null, "2"), /*#__PURE__*/React.createElement("th", null, "3"), /*#__PURE__*/React.createElement("th", null, "Average"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Mass dissolved (g)"), /*#__PURE__*/React.createElement("td", null, "15.6"), /*#__PURE__*/React.createElement("td", null, "16.4"), /*#__PURE__*/React.createElement("td", null, "16.0"), /*#__PURE__*/React.createElement("td", null, "?"))))), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 20,
    question: "Use Table 2. Calculate the average mass dissolved, then the solubility of potassium nitrate in g per 100 mL. Show your working. (2 marks)",
    model: "Average = (15.6 + 16.4 + 16.0) \xF7 3 = 48.0 \xF7 3 = 16.0 g. This dissolved in 50 mL, so the solubility = 16.0 \xD7 2 = 32 g per 100 mL of water."
  }), /*#__PURE__*/React.createElement("div", {
    style: tableWrap
  }, /*#__PURE__*/React.createElement("table", {
    className: "data-table",
    style: {
      fontSize: "0.88rem"
    }
  }, /*#__PURE__*/React.createElement("caption", {
    style: {
      captionSide: "top",
      textAlign: "left",
      fontWeight: 700,
      marginBottom: 6
    }
  }, "Table 3. Ava's results"), /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Salt dissolved"), /*#__PURE__*/React.createElement("th", null, "Water used"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "18 g"), /*#__PURE__*/React.createElement("td", null, "50 mL")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "7 g"), /*#__PURE__*/React.createElement("td", null, "20 mL")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "29 g"), /*#__PURE__*/React.createElement("td", null, "80 mL"))))), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 21,
    question: "Ava changed the volume of water and measured how much salt dissolved in it. Identify THREE ways she could improve the layout of Table 3. (3 marks)",
    model: "1. Put the independent variable (volume of water) in the first column and the dependent variable (mass of salt dissolved) in the second. 2. Put the units in the column headings, e.g. 'Volume of water (mL)' and 'Mass of salt dissolved (g)', instead of in every cell. 3. List the volumes in order (20, 50, 80 mL). She could also add columns for repeat trials and an average, and give the table a more descriptive title."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 22,
    question: "Describe a method to compare the solubility of sugar and potassium nitrate in water at room temperature. Name TWO variables you would control. (4 marks)",
    model: "1. Measure 50 mL of water into each of two beakers with a measuring cylinder. 2. Weigh a known mass of each solute on a balance. 3. Add one solute to each beaker a spatula at a time, stirring until each addition dissolves. 4. Stop when solid stays undissolved after a minute of stirring, then weigh the leftover solute. 5. Mass dissolved = start mass \u2212 leftover; multiply by 2 for g per 100 mL. 6. Repeat three times and average. Controlled variables: the volume of water (50 mL) and the temperature of the water (also the stirring time)."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "4.3.2",
    items: ["I can describe a method to measure solubility, including how I know the solution is saturated.", "I can calculate mass dissolved and scale it to g per 100 mL.", "I can calculate an average from repeat trials.", "I can set out a results table with the independent variable first and units in the headings."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#4.3",
    label: "Learn it in full: 4.3 Solutions"
  })), /*#__PURE__*/React.createElement(DotPoint, _extends({
    id: "4.3.3",
    title: "How temperature affects solubility"
  }, p), /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "core"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "For ", /*#__PURE__*/React.createElement("strong", null, "most solids"), ", solubility ", /*#__PURE__*/React.createElement("strong", null, "increases"), " as the temperature of the water increases. Hot water can hold more dissolved solid."), /*#__PURE__*/React.createElement("li", null, "The size of the effect varies: potassium nitrate becomes far more soluble when heated, while sodium chloride (table salt) barely changes."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Gases are the opposite"), ": they are ", /*#__PURE__*/React.createElement("em", null, "less"), " soluble in warm water. A warm soft drink loses its fizz faster, and warm water holds less dissolved oxygen for fish."), /*#__PURE__*/React.createElement("li", null, "If a hot saturated solution is cooled, the solubility falls, so some solute comes out of solution as solid ", /*#__PURE__*/React.createElement("strong", null, "crystals"), "."), /*#__PURE__*/React.createElement("li", null, "Do not mix up ", /*#__PURE__*/React.createElement("em", null, "how fast"), " something dissolves (rate) with ", /*#__PURE__*/React.createElement("em", null, "how much"), " can dissolve (solubility). Hot water does both for most solids, but they are measured differently."), /*#__PURE__*/React.createElement("li", null, "A graph of solubility against temperature is called a ", /*#__PURE__*/React.createElement(Term, {
    def: "A graph showing how the solubility of a substance changes with temperature."
  }, "solubility curve"), "."))), /*#__PURE__*/React.createElement(Figure, {
    num: "1",
    caption: "Solubility curves for potassium nitrate and sodium chloride (rounded data)."
  }, /*#__PURE__*/React.createElement(SolubilityGraph, null)), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Reading a solubility curve",
    problem: "Use Figure 1. (a) What mass of potassium nitrate dissolves in 100 g of water at 50 \xB0C? (b) A saturated solution at 50 \xB0C is cooled to 20 \xB0C. What mass of crystals forms? (3 marks)",
    steps: ["(a) Find 50 °C on the x-axis, go straight up to the potassium nitrate curve, then straight across to the y-axis: 86 g.", "(b) Do the same at 20 °C: 32 g. Only 32 g can stay dissolved at 20 °C.", "Crystals formed = mass dissolved at 50 °C − mass that can stay dissolved at 20 °C = 86 g − 32 g = 54 g."],
    answer: "(a) 86 g per 100 g of water. (b) 86 \u2212 32 = 54 g of potassium nitrate crystallises out."
  }), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Explaining a gas example",
    problem: "Explain why a bottle of soft drink left in a hot car goes flat more quickly than one kept in the fridge. (2 marks)",
    steps: ["Identify the solute: the fizz is carbon dioxide gas dissolved in the drink.", "State the rule: gases are less soluble at higher temperatures.", "Link: in the hot car, less carbon dioxide can stay dissolved, so more escapes as bubbles when the bottle is opened and the drink goes flat."],
    answer: "Soft drink contains dissolved carbon dioxide. Gases are less soluble in warm liquids, so in the hot car less carbon dioxide can stay dissolved. It comes out as bubbles and escapes, so the drink goes flat faster."
  }), /*#__PURE__*/React.createElement(ExamTip, null, "When you read a value from a curve, rule light pencil lines up from the x-axis to the curve and across to the y-axis, then give the value with its unit. For \"how much crystallises\" questions, read two values and subtract."), /*#__PURE__*/React.createElement(KNO3Beaker, null), /*#__PURE__*/React.createElement(Practice, {
    title: "Temperature and solubility"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 23,
    question: "Use Figure 1. At about what temperature do potassium nitrate and sodium chloride have the same solubility?",
    options: ["About 10 °C", "About 23 °C", "About 36 °C", "They never have the same solubility"],
    correct: 1,
    explain: "The two curves cross where both are about 36 g per 100 g of water, which is at about 23 \xB0C (between the 20 \xB0C and 30 \xB0C grid lines). 36 \xB0C is the trap: 36 is the solubility reading on the y-axis, not the temperature."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 24,
    question: "Using Figure 1, at what temperature does about 64 g of potassium nitrate dissolve in 100 g of water?",
    options: ["20 °C", "30 °C", "40 °C", "50 °C"],
    correct: 2,
    explain: "Go across from 64 g on the y-axis to the curve, then down: 40 \xB0C. At 50 \xB0C it would be about 86 g."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 25,
    question: "Fish in a shallow pond can struggle to breathe on very hot days. Which is the best explanation?",
    options: ["Warm water holds less dissolved oxygen", "Warm water holds more dissolved oxygen, which is harmful", "Oxygen turns into a solid in warm water", "The water becomes saturated with salt"],
    correct: 0,
    explain: "Gases, such as oxygen, are less soluble in warm water, so a hot pond holds less oxygen for the fish. Option B gets the rule for gases backwards."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 26,
    question: "To make rock candy, lots of sugar is dissolved in very hot water. A string is hung in the solution and it is left to cool. Explain why sugar crystals grow on the string. (3 marks)",
    model: "Sugar is more soluble in hot water, so a lot of sugar can dissolve. As the solution cools, the solubility of sugar decreases, so the water can no longer hold all of the dissolved sugar. The extra sugar comes out of solution as solid crystals, which form and grow on the string."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 27,
    question: "50 g of potassium nitrate is added to 100 g of water at 20 \xB0C and stirred. The beaker is then heated to 50 \xB0C. Use Figure 1 to predict what you would see at each temperature. (2 marks)",
    model: "At 20 \xB0C only about 32 g can dissolve, so about 18 g of solid stays on the bottom (a saturated solution). At 50 \xB0C the solubility is about 86 g, which is more than 50 g, so all of the potassium nitrate dissolves."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 28,
    question: "Liam says: 'Icing sugar dissolves faster than a sugar cube, so icing sugar must be more soluble.' Which is the best response?",
    options: ["He is correct; faster always means more soluble", "Dissolving faster is about rate; both are the same substance (sucrose), so the maximum mass that can dissolve in a set amount of water at one temperature is the same", "Icing sugar is insoluble, so it cannot dissolve at all", "He should compare the colour of the two solutions instead"],
    correct: 1,
    explain: "Tiny icing sugar grains have more surface touching the water, so they dissolve faster, but rate (how fast) and solubility (how much) are different measurements. Solubility depends on the substance, the solvent and the temperature, not on the size of the pieces. 'Faster means more soluble' is the trap."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "4.3.3",
    items: ["I can state how temperature affects the solubility of most solids and of gases.", "I can read values from a solubility curve.", "I can explain why crystals form when a hot saturated solution cools.", "I can tell the difference between rate of dissolving and solubility."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#4.3",
    label: "Learn it in full: 4.3 Solutions"
  })), /*#__PURE__*/React.createElement(DotPoint, _extends({
    id: "1.2.6",
    title: "Following a method safely: variables and fair tests"
  }, p), /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "core"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Follow the method:"), " read the whole method first, do the steps in order, measure carefully, and record results as you go."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Safety:"), " wear safety glasses when heating or using chemicals; tie back long hair; stand up when heating; use a heatproof mat; never point a heated test tube at anyone; tell your teacher about spills or breakages straight away; wash your hands after the practical."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Risk assessment:"), " for each ", /*#__PURE__*/React.createElement("em", null, "hazard"), " (something that could cause harm), state the ", /*#__PURE__*/React.createElement("em", null, "risk"), " (what could happen) and the ", /*#__PURE__*/React.createElement("em", null, "control"), " (what you do to make it safer)."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Term, {
    def: "The one variable you deliberately change."
  }, "Independent variable"), " (IV): the one thing you change. ", /*#__PURE__*/React.createElement(Term, {
    def: "The variable you measure; it may depend on the independent variable."
  }, "Dependent variable"), " (DV): the thing you measure. ", /*#__PURE__*/React.createElement(Term, {
    def: "Variables kept the same so they cannot affect the result."
  }, "Controlled variables"), " (CV): everything else you keep the same."), /*#__PURE__*/React.createElement("li", null, "A ", /*#__PURE__*/React.createElement("strong", null, "fair test"), " changes only the independent variable, so any change in the dependent variable must be caused by it. Remember: change one, measure one, keep the rest the same."))), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Identifying variables",
    problem: "Investigation: 'Does stirring speed affect how long 5 g of copper sulfate crystals take to dissolve in 100 mL of water?' The class uses a magnetic stirrer set to slow, medium and fast. Identify the independent, dependent and two controlled variables. (3 marks)",
    steps: ["IV = what is changed on purpose: the stirring speed (slow, medium, fast).", "DV = what is measured: the time taken for all the crystals to dissolve (in seconds, with a stopwatch).", "CVs = what must stay the same: the mass of copper sulfate (5 g), the volume of water (100 mL), the water temperature, and the size of the crystals."],
    answer: "IV: stirring speed. DV: time for the copper sulfate to dissolve (s). CVs: mass of copper sulfate, volume of water (also water temperature and crystal size)."
  }), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "A risk assessment row",
    problem: "The class heats water on a hot plate and then dissolves copper sulfate in it. Copper sulfate is harmful if swallowed and irritates the eyes. Complete a risk assessment for TWO hazards. (4 marks)",
    steps: ["Hazard 1: the hot plate and hot water. Risk: burns or scalds. Control: do not touch the plate; use tongs or a heatproof glove to move the hot beaker; let it cool before tipping out.", "Hazard 2: copper sulfate. Risk: eye irritation or poisoning if swallowed. Control: wear safety glasses; never taste chemicals; wash hands after the practical."],
    answer: "Each row needs all three parts: hazard \u2192 risk \u2192 control. A control must actually reduce the risk ('be careful' is too vague to earn the mark)."
  }), /*#__PURE__*/React.createElement(ExamTip, null, "Name variables precisely, with what is measured. \"Temperature\" is vague; \"the temperature of the water (\xB0C)\" earns the mark. For the DV, say how it is measured, e.g. \"the mass dissolved, measured with a balance\"."), /*#__PURE__*/React.createElement(Practice, {
    title: "Variables, fair tests and safety"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 29,
    question: "Zoe tests whether the size of sugar crystals (sugar cubes, normal sugar, icing sugar) affects how long they take to dissolve in water. What is the independent variable?",
    options: ["The time taken to dissolve", "The size of the sugar crystals", "The volume of water", "The temperature of the water"],
    correct: 1,
    explain: "Zoe deliberately changes the crystal size, so that is the IV. The time taken is what she measures, which makes it the dependent variable."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 30,
    question: "In Zoe's investigation, which of these should be controlled?",
    options: ["The size of the sugar crystals", "The time taken to dissolve", "The mass of sugar, and the volume and temperature of the water", "Nothing, as long as she repeats the test"],
    correct: 2,
    explain: "Everything except the IV must stay the same, including the mass of sugar and the volume and temperature of the water. Repeating improves reliability but does not make an uncontrolled test fair."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 31,
    question: "Which is the safest way to heat water in a beaker with a Bunsen burner?",
    options: ["Lean over the beaker to check whether it is boiling", "Wear safety glasses, tie back long hair and stand while heating", "Carry the hot beaker to the sink with bare hands", "Leave the burner on a blue flame while you fetch more water"],
    correct: 1,
    explain: "Glasses protect your eyes from splashes, tied-back hair cannot catch fire, and standing lets you step away quickly. A lit burner should never be left unattended."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 32,
    question: "Explain why only one variable should be changed in a fair test. (2 marks)",
    model: "If only the independent variable is changed and all others are controlled, then any change in the dependent variable must have been caused by the independent variable. If two variables were changed, you could not tell which one caused the result."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 33,
    question: "Hamish wants to find out whether the type of liquid (water, vinegar or cooking oil) affects how much sugar dissolves in it. Identify the independent variable, the dependent variable and one controlled variable. (3 marks)",
    model: "Independent variable: the type of liquid (water, vinegar, cooking oil). Dependent variable: the mass of sugar that dissolves (in grams). Controlled variable: the volume of each liquid (e.g. 50 mL); others are the temperature of the liquid and the amount of stirring."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 34,
    question: "Sofia wants to know whether stirring makes sugar dissolve faster. She stirs a sugar cube in one glass of water and leaves a spoonful of caster sugar unstirred in another, then times how long each takes to dissolve. Explain why this is not a fair test and how she could fix it. (2 marks)",
    model: "It is not fair because she changed two variables: stirring and the size of the sugar pieces (a cube compared with fine caster sugar). She could not tell which one caused any difference in time. She should use the same type and mass of sugar in both glasses, so only the stirring changes."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "1.2.6",
    items: ["I can identify the independent, dependent and controlled variables in an investigation.", "I can explain what makes a test fair.", "I can write a risk assessment with hazard, risk and control.", "I can list safety rules for heating and using chemicals."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB_INV,
    label: "Learn it in full: 1.2 Working scientifically"
  })), /*#__PURE__*/React.createElement(DotPoint, _extends({
    id: "1.2.8",
    title: "Tables, graphs, trends and conclusions"
  }, p), /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "core"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Tables:"), " independent variable in the first column, dependent variable next; units in the headings; repeat trials and an average column; a title."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Which graph?"), " If the independent variable is a number that can take any value (temperature, time, mass), draw a ", /*#__PURE__*/React.createElement("strong", null, "scatter (line) graph"), ". If it is in categories (types of liquid, brands), draw a ", /*#__PURE__*/React.createElement("strong", null, "column (bar) graph"), "."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Graph checklist:"), " a title (\"dependent variable vs independent variable\"); independent variable on the x-axis, dependent variable on the y-axis; both axes labelled with units; ", /*#__PURE__*/React.createElement("strong", null, "even scales"), " that use most of the grid; points plotted accurately as small crosses."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Line of best fit:"), " a single straight line or smooth curve through the middle of the points, with about the same number of points above and below. Never join the dots."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Outlier:"), " a result that does not fit the pattern. Circle it, ignore it when drawing the line and averaging, and repeat that measurement if you can."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Trend:"), " \"As [IV] increases, [DV] increases / decreases\", backed up with numbers. ", /*#__PURE__*/React.createElement("strong", null, "Conclusion:"), " answers the aim in one or two sentences, using the data as evidence."))), /*#__PURE__*/React.createElement(Figure, {
    num: "2",
    caption: "Bounce height of a tennis ball dropped from different heights onto a concrete floor (Josh's class results)."
  }, /*#__PURE__*/React.createElement(BounceGraph, null)), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Choosing a scale",
    problem: "Josh's highest bounce is 66 cm. His graph paper has 14 big squares going up the y-axis. Choose a sensible scale for the y-axis. (1 mark)",
    steps: ["Find the range to fit: from 0 up to at least 66 cm.", "Divide by the squares available: 66 ÷ 14 ≈ 4.7 cm per square. Round up to an easy step: 5 cm per square.", "Check: 14 squares × 5 cm = 70 cm, which fits 66 cm and uses most of the grid. Number the axis 0, 5, 10 … 70 evenly."],
    answer: "5 cm per big square (0 to 70 cm). Steps of 1, 2, 5, 10, 20, 50 \u2026 are easy to plot; steps like 3 or 7 are not."
  }), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Describing a trend and drawing a conclusion",
    problem: "Use Figure 2 to describe the trend, identify the outlier and write a conclusion for the aim 'to find out how the drop height affects the bounce height of a tennis ball'. (3 marks)",
    steps: ["Trend in words: as the drop height increases, the bounce height increases.", "Evidence: it rises from 11 cm for a 20 cm drop to 66 cm for a 120 cm drop, close to a straight line through the origin. Each bounce is a little over half the drop height.", "Outlier: the result for the 80 cm drop (58 cm) is well above the line of best fit (which gives about 44 cm), so it was ignored. It should be repeated.", "Conclusion that answers the aim: the higher the ball is dropped from, the higher it bounces."],
    answer: "As the drop height increases from 20 cm to 120 cm, the bounce height increases from 11 cm to 66 cm, about half the drop height each time. The 80 cm result (58 cm) is an outlier. Conclusion: the greater the drop height, the greater the bounce height."
  }), /*#__PURE__*/React.createElement(ExamTip, {
    title: "Habits for neat graphs"
  }, "Use a sharp pencil so mistakes can be rubbed out. Before you plot anything, check that your scale makes the data fill more than half of the grid. After plotting, read each point back off the axes to check it is in the right place. If the points follow a curve, draw one smooth curve freehand rather than forcing a ruled line through them."), /*#__PURE__*/React.createElement(Practice, {
    title: "Tables and graphs"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 35,
    question: "In an investigation of how the length of a pendulum affects the time it takes to make 10 swings, which variable goes on the x-axis?",
    options: ["The time for 10 swings", "The length of the pendulum", "The mass of the pendulum bob", "Whichever has the bigger numbers"],
    correct: 1,
    explain: "The independent variable (what you change) goes on the x-axis, so the length of the pendulum. The time for 10 swings is the dependent variable and goes on the y-axis. The mass of the bob is a controlled variable."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 36,
    question: "A class measures how much sugar dissolves in four different liquids: water, milk, vinegar and cooking oil. Which type of graph should they draw?",
    options: ["A scatter graph with a line of best fit", "A column (bar) graph", "A pie chart", "A line graph joining the dots"],
    correct: 1,
    explain: "The independent variable is in categories (types of liquid), so a column graph is correct. A line of best fit only makes sense when the x-axis is a number scale."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 37,
    question: "Kai numbers his y-axis 0, 10, 20, 50, 100. What is the main problem with his graph?",
    options: ["The scale is not even", "The axis should start at 10", "The numbers should go on the x-axis", "Nothing is wrong"],
    correct: 0,
    explain: "Each grid line must stand for the same amount. Jumping from 20 to 50 to 100 squashes the pattern and makes the trend look wrong."
  }), /*#__PURE__*/React.createElement(Figure, {
    num: "3",
    caption: "Height of a bean seedling measured every two days after planting (Mei's class results)."
  }, /*#__PURE__*/React.createElement(SeedlingGraph, null)), /*#__PURE__*/React.createElement(MCQ, {
    num: 38,
    question: "Use Figure 3. What is the best estimate of the seedling's height on day 7?",
    options: ["About 4 cm", "About 6 cm", "About 7 cm", "About 9 cm"],
    correct: 1,
    explain: "Day 7 is halfway between day 6 (about 5.0 cm on the line) and day 8 (about 7.0 cm), so reading from the line gives about 6 cm. 7 cm is tempting because it matches the day number, but it is the height on day 8, not day 7."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 39,
    question: "Use Figure 3. (a) Extend the line of best fit to predict the seedling's height on day 14. (b) Describe the trend, and use the data to calculate how fast the seedling grew in cm per day. (3 marks)",
    model: "(a) About 13 cm (the line rises by about 2 cm every 2 days, so 11.0 cm on day 12 + 2 cm \u2248 13 cm on day 14). (b) As the time since planting increases, the seedling's height increases. The points lie close to a straight line, so it grew at a steady rate. From day 2 (1.0 cm) to day 12 (11.0 cm) it grew 10.0 cm in 10 days, so the growth rate is 10.0 \xF7 10 = 1.0 cm per day. (The line does not pass through the origin because the shoot only pokes above the soil after about a day.)"
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 40,
    question: "A paper helicopter was dropped from the same 2.0 m height four times. The fall times were 4.1 s, 4.3 s, 5.8 s and 4.2 s. Identify the outlier, state what should be done with it, and calculate the average. (3 marks)",
    model: "The outlier is 5.8 s, because it is much higher than the other three results. It should be left out of the average (and the trial repeated if possible). Average = (4.1 + 4.3 + 4.2) \xF7 3 = 12.6 \xF7 3 = 4.2 s."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "1.2.8",
    items: ["I can set out a results table with units in the headings.", "I can choose between a scatter graph and a column graph.", "I can draw a graph with a title, labelled axes with units, even scales and a line of best fit.", "I can identify an outlier and leave it out of an average.", "I can describe a trend with data and write a conclusion that answers the aim."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB_INV,
    label: "Learn it in full: 1.2 Working scientifically"
  })));
}

/* ============================================================
   SECTION 4.4  Separating mixtures
   ============================================================ */
function ParticleTypesFigure() {
  var A = function A(x, y, k) {
    var r = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 7;
    return /*#__PURE__*/React.createElement("circle", {
      key: k,
      cx: x,
      cy: y,
      r: r,
      fill: "var(--accent)",
      stroke: "var(--ink)",
      strokeWidth: "1"
    });
  };
  var B = function B(x, y, k) {
    var r = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 5;
    return /*#__PURE__*/React.createElement("circle", {
      key: k,
      cx: x,
      cy: y,
      r: r,
      fill: "var(--card)",
      stroke: "var(--ink)",
      strokeWidth: "1.2"
    });
  };
  var element1 = [[18, 40], [36, 40], [54, 40], [72, 40], [27, 56], [45, 56], [63, 56], [18, 72], [36, 72], [54, 72], [72, 72]].map(function (_ref15, k) {
    var _ref16 = _slicedToArray(_ref15, 2),
      x = _ref16[0],
      y = _ref16[1];
    return A(x, y, k);
  });
  var pair = function pair(x, y, k) {
    return /*#__PURE__*/React.createElement("g", {
      key: k
    }, A(x, y, "a", 6), A(x + 11, y, "b", 6));
  };
  var element2 = [[14, 38], [52, 34], [24, 64], [56, 70], [40, 50]].map(function (_ref17, k) {
    var _ref18 = _slicedToArray(_ref17, 2),
      x = _ref18[0],
      y = _ref18[1];
    return pair(x, y, k);
  });
  var water = function water(x, y, k) {
    return /*#__PURE__*/React.createElement("g", {
      key: k
    }, A(x, y, "o", 7), B(x - 9, y + 6, "h1"), B(x + 9, y + 6, "h2"));
  };
  var compound = [[24, 36], [62, 40], [40, 64], [70, 72], [18, 76]].map(function (_ref19, k) {
    var _ref20 = _slicedToArray(_ref19, 2),
      x = _ref20[0],
      y = _ref20[1];
    return water(x, y, k);
  });
  var mixture = [pair(14, 36, "m1"), pair(54, 70, "m2"), pair(58, 30, "m3"), water(28, 66, "m4"), water(46, 46, "m5"), B(76, 50, "m6", 6), B(18, 52, "m7", 6)];
  var panel = function panel(x, l1, l2, kids) {
    return /*#__PURE__*/React.createElement("g", {
      transform: "translate(".concat(x, ",0)")
    }, /*#__PURE__*/React.createElement("rect", {
      x: "0",
      y: "16",
      width: "84",
      height: "76",
      rx: "6",
      fill: "none",
      stroke: "var(--ink)",
      strokeWidth: "1.4"
    }), kids, /*#__PURE__*/React.createElement("text", {
      x: "42",
      y: "108",
      textAnchor: "middle",
      fontSize: "11.5",
      fontWeight: "700",
      fill: "var(--ink)"
    }, l1), /*#__PURE__*/React.createElement("text", {
      x: "42",
      y: "122",
      textAnchor: "middle",
      fontSize: "10.5",
      fill: "var(--ink-muted)"
    }, l2));
  };
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 360 128",
    width: "100%",
    role: "img",
    style: {
      maxWidth: 520
    },
    "aria-label": "Four particle pictures. Element made of single atoms all the same kind. Element made of molecules, each two identical atoms joined. Compound: every molecule is one large atom joined to two small atoms of a different kind. Mixture: different kinds of particles mixed together but not joined."
  }, panel(0, "Element", "single atoms", element1), panel(92, "Element", "molecules", element2), panel(184, "Compound", "different atoms joined", compound), panel(276, "Mixture", "not joined", mixture));
}
function ClassifyTree() {
  var box = function box(cx, y, w, t1, t2, strong, k) {
    return /*#__PURE__*/React.createElement("g", {
      key: k
    }, /*#__PURE__*/React.createElement("rect", {
      x: cx - w / 2,
      y: y,
      width: w,
      height: t2 ? 40 : 28,
      rx: "8",
      fill: strong ? "var(--bg-2)" : "var(--card)",
      stroke: "var(--ink)",
      strokeWidth: "1.4"
    }), /*#__PURE__*/React.createElement("text", {
      x: cx,
      y: y + 18,
      textAnchor: "middle",
      fontSize: t2 ? "10.5" : "11.5",
      fontWeight: "700",
      fill: "var(--ink)"
    }, t1), t2 && /*#__PURE__*/React.createElement("text", {
      x: cx,
      y: y + 33,
      textAnchor: "middle",
      fontSize: "10",
      fill: "var(--ink-muted)"
    }, t2));
  };
  var ln = function ln(x1, y1, x2, y2, k) {
    return /*#__PURE__*/React.createElement("line", {
      key: k,
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2,
      stroke: "var(--ink)",
      strokeWidth: "1.4"
    });
  };
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 360 194",
    width: "100%",
    role: "img",
    style: {
      maxWidth: 520
    },
    "aria-label": "Classification tree. Matter divides into pure substances and mixtures. Pure substances are elements, such as copper and oxygen, or compounds, such as water and carbon dioxide. Mixtures are homogeneous, the same throughout, such as air and cordial, or heterogeneous, with parts you can see, such as soil and fruit salad."
  }, ln(180, 34, 90, 62, 1), ln(180, 34, 270, 62, 2), ln(90, 90, 46, 118, 3), ln(90, 90, 136, 118, 4), ln(270, 90, 226, 118, 5), ln(270, 90, 316, 118, 6), box(180, 6, 90, "Matter", null, true, "a"), box(90, 62, 120, "Pure substance", null, true, "b"), box(270, 62, 100, "Mixture", null, true, "c"), box(46, 118, 84, "Element", "copper, oxygen", false, "d"), box(136, 118, 84, "Compound", "water, CO₂", false, "e"), box(226, 118, 84, "Homogeneous", "air, cordial", false, "f"), box(316, 118, 84, "Heterogeneous", "soil, fruit salad", false, "g"), /*#__PURE__*/React.createElement("text", {
    x: "180",
    y: "174",
    textAnchor: "middle",
    fontSize: "10.5",
    fill: "var(--ink-muted)"
  }, "Homogeneous: the same all the way through."), /*#__PURE__*/React.createElement("text", {
    x: "180",
    y: "189",
    textAnchor: "middle",
    fontSize: "10.5",
    fill: "var(--ink-muted)"
  }, "Heterogeneous: you can see the different parts."));
}
function FiltrationFigure() {
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 360 236",
    width: "100%",
    role: "img",
    style: {
      maxWidth: 440
    },
    "aria-label": "Filtration. A mixture is poured into a funnel lined with filter paper. The insoluble solid, called the residue, stays in the paper. The liquid that passes through into the flask below is the filtrate."
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("marker", {
    id: "fl-arr",
    viewBox: "0 0 10 10",
    refX: "9",
    refY: "5",
    markerWidth: "6",
    markerHeight: "6",
    orient: "auto"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0,0 L10,5 L0,10 z",
    fill: "var(--ink)"
  }))), /*#__PURE__*/React.createElement("path", {
    d: "M80,44 L200,44 L146,118 L146,166 L134,166 L134,118 Z",
    fill: "none",
    stroke: "var(--ink)",
    strokeWidth: "2.2",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M90,48 L140,114 L190,48",
    fill: "none",
    stroke: "var(--ink-muted)",
    strokeWidth: "1.6",
    strokeDasharray: "4 3"
  }), [[132, 100], [140, 106], [148, 100], [136, 92], [144, 92], [140, 98], [128, 94], [152, 94]].map(function (_ref21, k) {
    var _ref22 = _slicedToArray(_ref21, 2),
      x = _ref22[0],
      y = _ref22[1];
    return /*#__PURE__*/React.createElement("circle", {
      key: k,
      cx: x,
      cy: y,
      r: "3",
      fill: "var(--ink)",
      opacity: "0.7"
    });
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "140",
    cy: "176",
    r: "2.5",
    fill: "var(--accent)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M128,160 L128,184 L94,224 L186,224 L152,184 L152,160",
    fill: "none",
    stroke: "var(--ink)",
    strokeWidth: "2.2",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M104,212 L176,212 L186,224 L94,224 Z",
    fill: "var(--accent)",
    opacity: "0.3"
  }), /*#__PURE__*/React.createElement("text", {
    x: "8",
    y: "20",
    fontSize: "11.5",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "Mixture poured in"), /*#__PURE__*/React.createElement("line", {
    x1: "70",
    y1: "26",
    x2: "112",
    y2: "40",
    stroke: "var(--ink)",
    strokeWidth: "1.4",
    markerEnd: "url(#fl-arr)"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "186",
    y1: "56",
    x2: "214",
    y2: "56",
    stroke: "var(--ink-muted)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("text", {
    x: "218",
    y: "60",
    fontSize: "11.5",
    fill: "var(--ink)"
  }, "Filter paper"), /*#__PURE__*/React.createElement("line", {
    x1: "154",
    y1: "98",
    x2: "214",
    y2: "98",
    stroke: "var(--ink-muted)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("text", {
    x: "218",
    y: "96",
    fontSize: "11.5",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "Residue"), /*#__PURE__*/React.createElement("text", {
    x: "218",
    y: "110",
    fontSize: "10.5",
    fill: "var(--ink-muted)"
  }, "(solid stays in paper)"), /*#__PURE__*/React.createElement("line", {
    x1: "148",
    y1: "140",
    x2: "214",
    y2: "140",
    stroke: "var(--ink-muted)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("text", {
    x: "218",
    y: "144",
    fontSize: "11.5",
    fill: "var(--ink)"
  }, "Funnel"), /*#__PURE__*/React.createElement("line", {
    x1: "178",
    y1: "216",
    x2: "214",
    y2: "196",
    stroke: "var(--ink-muted)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("text", {
    x: "218",
    y: "194",
    fontSize: "11.5",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "Filtrate"), /*#__PURE__*/React.createElement("text", {
    x: "218",
    y: "208",
    fontSize: "10.5",
    fill: "var(--ink-muted)"
  }, "(liquid passes through)"));
}
function DistillationFigure() {
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 360 238",
    width: "100%",
    role: "img",
    style: {
      maxWidth: 520
    },
    "aria-label": "Simple distillation. A flask of mixture is heated. Vapour rises past a thermometer and into a sloping condenser cooled by cold water that enters at the lower end and leaves at the upper end. The vapour condenses and the pure liquid, the distillate, drips into a beaker."
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("marker", {
    id: "ds-arr",
    viewBox: "0 0 10 10",
    refX: "9",
    refY: "5",
    markerWidth: "6",
    markerHeight: "6",
    orient: "auto"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0,0 L10,5 L0,10 z",
    fill: "var(--ink)"
  }))), /*#__PURE__*/React.createElement("path", {
    d: "M30,150 A34,34 0 0 0 90,150 Z",
    fill: "var(--accent)",
    opacity: "0.3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "60",
    cy: "140",
    r: "34",
    fill: "none",
    stroke: "var(--ink)",
    strokeWidth: "2.2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M52,108 L52,70 M68,108 L68,70",
    stroke: "var(--ink)",
    strokeWidth: "2.2"
  }), /*#__PURE__*/React.createElement("text", {
    x: "60",
    y: "164",
    textAnchor: "middle",
    fontSize: "10.5",
    fill: "var(--ink)"
  }, "mixture"), /*#__PURE__*/React.createElement("line", {
    x1: "60",
    y1: "30",
    x2: "60",
    y2: "80",
    stroke: "var(--ink)",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "60",
    cy: "83",
    r: "3.5",
    fill: "var(--ink)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "70",
    y: "30",
    fontSize: "11",
    fill: "var(--ink)"
  }, "thermometer"), /*#__PURE__*/React.createElement("path", {
    d: "M50,200 Q46,188 54,180 Q56,190 60,184 Q64,190 66,180 Q74,188 70,200 Z",
    fill: "var(--accent)",
    opacity: "0.85"
  }), /*#__PURE__*/React.createElement("text", {
    x: "60",
    y: "218",
    textAnchor: "middle",
    fontSize: "11.5",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "Heat"), /*#__PURE__*/React.createElement("polygon", {
    points: "114.1,80.7 274.1,138.7 265.9,161.3 105.9,103.3",
    fill: "var(--accent)",
    fillOpacity: "0.14",
    stroke: "var(--ink)",
    strokeWidth: "1.8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M68,80 L285,157",
    stroke: "var(--ink)",
    strokeWidth: "2",
    fill: "none"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "250",
    y1: "182",
    x2: "250",
    y2: "158",
    stroke: "var(--ink)",
    strokeWidth: "1.6",
    markerEnd: "url(#ds-arr)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "244",
    y: "192",
    textAnchor: "end",
    fontSize: "11",
    fill: "var(--ink)"
  }, "cold water in"), /*#__PURE__*/React.createElement("line", {
    x1: "130",
    y1: "86",
    x2: "130",
    y2: "62",
    stroke: "var(--ink)",
    strokeWidth: "1.6",
    markerEnd: "url(#ds-arr)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "136",
    y: "66",
    fontSize: "11",
    fill: "var(--ink)"
  }, "water out"), /*#__PURE__*/React.createElement("text", {
    x: "196",
    y: "98",
    fontSize: "11.5",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "Condenser"), /*#__PURE__*/React.createElement("circle", {
    cx: "287",
    cy: "166",
    r: "2.5",
    fill: "var(--accent)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M278,176 L278,222 L328,222 L328,176",
    fill: "none",
    stroke: "var(--ink)",
    strokeWidth: "2.2"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "279",
    y: "204",
    width: "48",
    height: "17",
    fill: "var(--accent)",
    opacity: "0.3"
  }), /*#__PURE__*/React.createElement("text", {
    x: "303",
    y: "236",
    textAnchor: "middle",
    fontSize: "11.5",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "Distillate"));
}
function ChromatogramFigure() {
  var lanes = [["Note", [[130, "#2563eb"], [95, "#ca8a04"], [55, "#db2777"]]], ["Pen A", [[130, "#2563eb"], [55, "#db2777"]]], ["Pen B", [[130, "#2563eb"], [95, "#ca8a04"], [55, "#db2777"]]], ["Pen C", [[130, "#2563eb"], [75, "#7c3aed"]]]];
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 360 196",
    width: "100%",
    role: "img",
    style: {
      maxWidth: 480
    },
    "aria-label": "Chromatogram with four lanes. The note ink separates into blue, yellow and pink spots. Pen A shows blue and pink only. Pen B shows blue, yellow and pink at the same heights as the note. Pen C shows blue and purple."
  }, /*#__PURE__*/React.createElement("rect", {
    x: "12",
    y: "8",
    width: "336",
    height: "166",
    rx: "4",
    fill: "var(--card)",
    stroke: "var(--ink)",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "30",
    x2: "348",
    y2: "30",
    stroke: "var(--ink-muted)",
    strokeWidth: "1.2",
    strokeDasharray: "5 4"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "158",
    x2: "348",
    y2: "158",
    stroke: "var(--ink)",
    strokeWidth: "1.2",
    strokeDasharray: "2 3"
  }), /*#__PURE__*/React.createElement("text", {
    x: "344",
    y: "24",
    textAnchor: "end",
    fontSize: "10.5",
    fill: "var(--ink-muted)"
  }, "solvent front"), /*#__PURE__*/React.createElement("text", {
    x: "344",
    y: "170",
    textAnchor: "end",
    fontSize: "10.5",
    fill: "var(--ink-muted)"
  }, "pencil start line"), lanes.map(function (_ref23, i) {
    var _ref24 = _slicedToArray(_ref23, 2),
      name = _ref24[0],
      spots = _ref24[1];
    var x = 52 + i * 66;
    return /*#__PURE__*/React.createElement("g", {
      key: name
    }, spots.map(function (_ref25, k) {
      var _ref26 = _slicedToArray(_ref25, 2),
        y = _ref26[0],
        c = _ref26[1];
      return /*#__PURE__*/React.createElement("ellipse", {
        key: k,
        cx: x,
        cy: y,
        rx: "9",
        ry: "7",
        fill: c,
        opacity: "0.85"
      });
    }), /*#__PURE__*/React.createElement("text", {
      x: x,
      y: "190",
      textAnchor: "middle",
      fontSize: "11.5",
      fontWeight: "700",
      fill: "var(--ink)"
    }, name));
  }));
}
function ColumnFigure() {
  var fr = [[40, "Refinery gases (LPG)"], [76, "Petrol"], [112, "Kerosene (jet fuel)"], [148, "Diesel"], [184, "Lubricating oil"]];
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 360 262",
    width: "100%",
    role: "img",
    style: {
      maxWidth: 480
    },
    "aria-label": "Fractionating column. Heated crude oil vapour enters near the bottom. The column is hot at the bottom, about 350 degrees, and cool at the top, about 25 degrees. From top to bottom the fractions collected are refinery gases, petrol, kerosene, diesel, lubricating oil and bitumen."
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("marker", {
    id: "fc-arr",
    viewBox: "0 0 10 10",
    refX: "9",
    refY: "5",
    markerWidth: "6",
    markerHeight: "6",
    orient: "auto"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0,0 L10,5 L0,10 z",
    fill: "var(--ink)"
  }))), /*#__PURE__*/React.createElement("rect", {
    x: "120",
    y: "18",
    width: "70",
    height: "208",
    rx: "6",
    fill: "var(--accent)",
    fillOpacity: "0.12",
    stroke: "var(--ink)",
    strokeWidth: "2"
  }), [58, 94, 130, 166, 202].map(function (y) {
    return /*#__PURE__*/React.createElement("line", {
      key: y,
      x1: "120",
      y1: y,
      x2: "190",
      y2: y,
      stroke: "var(--ink-muted)",
      strokeWidth: "1.2",
      strokeDasharray: "4 3"
    });
  }), fr.map(function (_ref27) {
    var _ref28 = _slicedToArray(_ref27, 2),
      y = _ref28[0],
      l = _ref28[1];
    return /*#__PURE__*/React.createElement("g", {
      key: l
    }, /*#__PURE__*/React.createElement("line", {
      x1: "190",
      y1: y,
      x2: "210",
      y2: y,
      stroke: "var(--ink)",
      strokeWidth: "1.6",
      markerEnd: "url(#fc-arr)"
    }), /*#__PURE__*/React.createElement("text", {
      x: "214",
      y: y + 4,
      fontSize: "11",
      fill: "var(--ink)"
    }, l));
  }), /*#__PURE__*/React.createElement("line", {
    x1: "155",
    y1: "226",
    x2: "155",
    y2: "244",
    stroke: "var(--ink)",
    strokeWidth: "1.6",
    markerEnd: "url(#fc-arr)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "164",
    y: "250",
    fontSize: "11",
    fill: "var(--ink)"
  }, "Bitumen (roads)"), /*#__PURE__*/React.createElement("text", {
    x: "110",
    y: "32",
    textAnchor: "end",
    fontSize: "11",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "Cooler"), /*#__PURE__*/React.createElement("text", {
    x: "110",
    y: "46",
    textAnchor: "end",
    fontSize: "10.5",
    fill: "var(--ink-muted)"
  }, "about 25 \xB0C"), /*#__PURE__*/React.createElement("text", {
    x: "110",
    y: "166",
    textAnchor: "end",
    fontSize: "11",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "Hotter"), /*#__PURE__*/React.createElement("text", {
    x: "110",
    y: "180",
    textAnchor: "end",
    fontSize: "10.5",
    fill: "var(--ink-muted)"
  }, "about 350 \xB0C"), /*#__PURE__*/React.createElement("line", {
    x1: "20",
    y1: "214",
    x2: "118",
    y2: "214",
    stroke: "var(--ink)",
    strokeWidth: "1.8",
    markerEnd: "url(#fc-arr)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "8",
    y: "206",
    fontSize: "11",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "Hot crude oil in"), /*#__PURE__*/React.createElement("line", {
    x1: "96",
    y1: "150",
    x2: "96",
    y2: "60",
    stroke: "var(--ink-muted)",
    strokeWidth: "1.4",
    markerEnd: "url(#fc-arr)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "88",
    y: "110",
    textAnchor: "end",
    fontSize: "10.5",
    fill: "var(--ink-muted)"
  }, "vapour"), /*#__PURE__*/React.createElement("text", {
    x: "88",
    y: "123",
    textAnchor: "end",
    fontSize: "10.5",
    fill: "var(--ink-muted)"
  }, "rises"));
}
function Section44(_ref29) {
  var progress = _ref29.progress,
    setProgress = _ref29.setProgress;
  var p = {
    progress: progress,
    setProgress: setProgress
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "4.4 Separating mixtures"), /*#__PURE__*/React.createElement("h1", null, "Pure substances, mixtures and separation"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Mixtures can be separated because their parts keep their own physical properties. Choosing a technique is all about matching it to a property.")), /*#__PURE__*/React.createElement(DotPoint, _extends({
    id: "4.4.1",
    title: "Atoms, elements, compounds and mixtures"
  }, p), /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "know"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "An ", /*#__PURE__*/React.createElement(Term, {
    def: "The smallest particle of an element."
  }, "atom"), " is the smallest particle of an element. A ", /*#__PURE__*/React.createElement(Term, {
    def: "Two or more atoms chemically joined together."
  }, "molecule"), " is two or more atoms joined together."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Element:"), " made of only one type of atom (e.g. copper, oxygen). All elements are listed on the periodic table."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Compound:"), " two or more ", /*#__PURE__*/React.createElement("em", null, "different"), " types of atom chemically joined in a fixed ratio (e.g. water, H\u2082O; carbon dioxide, CO\u2082). It has new properties, and can only be split up by a chemical reaction."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Mixture:"), " two or more substances mixed together but ", /*#__PURE__*/React.createElement("em", null, "not"), " chemically joined. Each part keeps its own properties, the amounts can vary, and the parts can be separated by physical methods."))), /*#__PURE__*/React.createElement(Figure, {
    caption: "Particle pictures of elements, a compound and a mixture."
  }, /*#__PURE__*/React.createElement(ParticleTypesFigure, null)), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Compound or mixture?",
    problem: "Explain why carbon dioxide is a compound but air is a mixture. (2 marks)",
    steps: ["Carbon dioxide: every particle has carbon and oxygen atoms chemically joined in a fixed ratio (CO₂), so it is a compound.", "Air: nitrogen, oxygen, carbon dioxide and other gases are mixed but not joined to each other, and the amounts can vary, so it is a mixture."],
    answer: "Carbon dioxide is a compound because carbon and oxygen atoms are chemically joined in a fixed ratio. Air is a mixture because its gases are only mixed together, not chemically joined."
  }), /*#__PURE__*/React.createElement(Practice, {
    title: "Elements, compounds and mixtures"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 41,
    question: "Which of these is a compound?",
    options: ["Oxygen", "Copper", "Water", "Air"],
    correct: 2,
    explain: "Water is made of hydrogen and oxygen atoms chemically joined (H\u2082O). Air contains oxygen and water vapour, but they are not joined, so air is a mixture."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 42,
    question: "Iron filings and sulfur powder are stirred together, and a magnet can pull the iron out. After the mixture is heated strongly, a new black solid forms that is not attracted to a magnet. Explain which is the mixture and which is the compound. (2 marks)",
    model: "Before heating it is a mixture: the iron and sulfur are not joined and the iron keeps its magnetic property, so a magnet separates it. After heating, the iron and sulfur atoms have chemically joined to form a compound (iron sulfide) with new properties, so it is no longer magnetic and cannot be separated with a magnet."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "4.4.1",
    items: ["I can define atom, element, compound and mixture.", "I can explain the difference between a compound and a mixture.", "I can give examples of each."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#4.4",
    label: "Learn it in full: 4.4 Separating Mixtures"
  })), /*#__PURE__*/React.createElement(DotPoint, _extends({
    id: "4.4.2",
    title: "Classifying matter: pure substances and mixtures"
  }, p), /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "know"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "A ", /*#__PURE__*/React.createElement(Term, {
    def: "A substance made of only one kind of particle: an element or a compound."
  }, "pure substance"), " contains only one kind of particle. Elements and compounds are pure substances. They have a fixed melting and boiling point."), /*#__PURE__*/React.createElement("li", null, "A ", /*#__PURE__*/React.createElement("strong", null, "mixture"), " contains two or more kinds of particle. ", /*#__PURE__*/React.createElement("strong", null, "Homogeneous"), " mixtures look the same all the way through (air, cordial). ", /*#__PURE__*/React.createElement("strong", null, "Heterogeneous"), " mixtures have parts you can see (soil, fruit salad)."), /*#__PURE__*/React.createElement("li", null, "Watch out: \"pure\" on a label (pure orange juice, pure spring water) means nothing added. To a scientist these are still mixtures."))), /*#__PURE__*/React.createElement(Figure, {
    caption: "Classifying matter."
  }, /*#__PURE__*/React.createElement(ClassifyTree, null)), /*#__PURE__*/React.createElement(Practice, {
    title: "Classifying matter"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 43,
    question: "Which of these is a pure substance?",
    options: ["Orange juice", "Copper wire", "Milk", "Air"],
    correct: 1,
    explain: "Copper wire is made of only copper atoms, so it is a pure element. Orange juice is sold as 'pure', but it contains water, sugars and many other substances, so it is a mixture."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 44,
    question: "A bottle is labelled '100% pure spring water'. Explain why a scientist would say this water is not a pure substance. (2 marks)",
    model: "A pure substance contains only one kind of particle. Spring water contains dissolved minerals (and gases) as well as water particles, so it is a mixture, not a pure substance. The label only means nothing has been added."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "4.4.2",
    items: ["I can classify a substance as an element, compound or mixture.", "I can explain the difference between homogeneous and heterogeneous mixtures.", "I can explain why everyday 'pure' products are usually mixtures."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#4.4",
    label: "Learn it in full: 4.4 Separating Mixtures"
  })), /*#__PURE__*/React.createElement(DotPoint, _extends({
    id: "4.4.3",
    title: "Using physical properties to separate mixtures"
  }, p), /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "core"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 0
    }
  }, "The parts of a mixture are not joined, so you can separate them using a ", /*#__PURE__*/React.createElement("strong", null, "physical property"), " that is different for each part."), /*#__PURE__*/React.createElement("div", {
    style: tableWrap
  }, /*#__PURE__*/React.createElement("table", {
    className: "data-table",
    style: {
      fontSize: "0.88rem"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Property that differs"), /*#__PURE__*/React.createElement("th", null, "Technique"), /*#__PURE__*/React.createElement("th", null, "Example"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Particle size"), /*#__PURE__*/React.createElement("td", null, "Sieving; filtration"), /*#__PURE__*/React.createElement("td", null, "Gravel from sand; sand from water")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Solubility"), /*#__PURE__*/React.createElement("td", null, "Dissolve one part, then filter; chromatography"), /*#__PURE__*/React.createElement("td", null, "Sugar from sand; dyes in ink")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Boiling point"), /*#__PURE__*/React.createElement("td", null, "Evaporation, crystallisation; distillation"), /*#__PURE__*/React.createElement("td", null, "Crystals from a solution; ethanol from water")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Magnetism"), /*#__PURE__*/React.createElement("td", null, "Magnetic separation"), /*#__PURE__*/React.createElement("td", null, "Steel cans from aluminium cans")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Density"), /*#__PURE__*/React.createElement("td", null, "Decanting, separating funnel, settling, flotation"), /*#__PURE__*/React.createElement("td", null, "Oil from water; gold panning"))))), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Mixtures with three or more parts need several steps. Plan the order: usually remove the magnetic part or the big pieces first, then dissolve, filter and evaporate."), /*#__PURE__*/React.createElement("li", null, "Filtration cannot remove a dissolved solute: dissolved particles are small enough to pass through the holes in filter paper."))), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Separating a three-part mixture",
    problem: "Describe how to separate a mixture of sand, iron filings and sugar, naming the property used in each step. (4 marks)",
    steps: ["Step 1, magnetism: run a magnet (wrapped in plastic) through the dry mixture. Only the iron filings are attracted, so they are removed.", "Step 2, solubility: add warm water and stir. The sugar dissolves; the sand is insoluble.", "Step 3, particle size: filter the mixture. The sand is the residue in the filter paper; the sugar solution passes through as the filtrate.", "Step 4, boiling point: gently heat the filtrate to evaporate some of the water, then leave it to cool so sugar crystals form (crystallisation)."],
    answer: "Magnet (magnetism) \u2192 dissolve in water (solubility) \u2192 filter out the sand (particle size) \u2192 evaporate water from the filtrate and crystallise the sugar (boiling point)."
  }), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Matching technique to property",
    problem: "Choose a technique to separate (a) cooking oil from water and (b) ethanol (boils at 78 \xB0C) from water (boils at 100 \xB0C). Name the property each one uses. (4 marks)",
    steps: ["(a) Oil and water do not mix, and oil is less dense, so it floats on top. Use a separating funnel (or decant): drain off the water from the bottom. Property: density.", "(b) Ethanol and water mix completely, so they cannot be decanted. Ethanol has a lower boiling point, so heat the mixture: ethanol boils off first and is condensed and collected. Technique: distillation. Property: boiling point."],
    answer: "(a) Separating funnel or decanting, using density. (b) Distillation, using boiling point."
  }), /*#__PURE__*/React.createElement(ExamTip, null, "In separation questions, marks usually come in pairs: ", /*#__PURE__*/React.createElement("strong", null, "name the technique AND the property it uses"), ", and say which part ends up where (residue, filtrate, distillate)."), /*#__PURE__*/React.createElement(Practice, {
    title: "Properties for separating"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 45,
    question: "At a recycling centre, a large electromagnet lifts steel cans away from aluminium cans. Which property is being used?",
    options: ["Density", "Magnetism", "Boiling point", "Solubility"],
    correct: 1,
    explain: "Steel contains iron, which is attracted to a magnet; aluminium is not. Density is a different property, used for things like floating and settling."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 46,
    question: "A landscaper separates large pebbles from fine sand by shaking them in a sieve. Which property does this use?",
    options: ["Particle size", "Solubility", "Magnetism", "Boiling point"],
    correct: 0,
    explain: "A sieve lets small particles through its holes and holds back big ones, so it separates by particle size."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 47,
    question: "Why can filtration NOT separate dissolved sugar from water?",
    options: ["Sugar is magnetic", "Dissolved sugar particles are small enough to pass through the filter paper", "Sugar is denser than water", "Filter paper reacts with sugar"],
    correct: 1,
    explain: "When sugar dissolves, it breaks up into tiny particles spread through the water, and they pass through the pores in the paper. To get the sugar back you need evaporation or crystallisation."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 48,
    question: "Ethanol (boils at 78 \xB0C) and water (boils at 100 \xB0C) can be separated by distillation because they have different\u2026",
    options: ["densities", "particle sizes", "boiling points", "magnetic properties"],
    correct: 2,
    explain: "Distillation works because one liquid boils off before the other. Ethanol and water do have different densities, but they mix completely, so density cannot be used to separate them."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 49,
    question: "A bucket contains a mixture of gravel, sawdust and water. Describe how you could separate all three parts, naming the property used at each step. (3 marks)",
    model: "1. Sawdust is less dense than water, so it floats: skim or scoop it off the surface (density). 2. Gravel is denser and sinks to the bottom, so carefully pour (decant) the water off the gravel (density). 3. Any gravel left with water can be poured through a sieve, which holds back the large gravel pieces and lets the water through (particle size)."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 50,
    question: "Gold prospectors 'pan' for gold by swirling creek sand and water in a shallow pan. The sand washes out over the edge, and tiny flakes of gold are left behind. Explain which property makes this work. (2 marks)",
    model: "Panning separates by density. Gold is much denser than sand, so the gold flakes sink to the bottom of the pan and stay there, while the lighter sand is carried over the edge by the swirling water."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "4.4.3",
    items: ["I can match each separation technique to the physical property it uses.", "I can plan the steps to separate a mixture of three substances.", "I can explain why filtration does not remove a dissolved solute.", "I can choose between decanting and distillation for two liquids."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#4.4",
    label: "Learn it in full: 4.4 Separating Mixtures"
  })), /*#__PURE__*/React.createElement(DotPoint, _extends({
    id: "4.4.4",
    title: "Common separation techniques"
  }, p), /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "important"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Sieving:"), " separates solids of different particle sizes. ", /*#__PURE__*/React.createElement("strong", null, "Decanting:"), " carefully pouring off a liquid, leaving a heavier solid or liquid behind."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Filtration:"), " separates an insoluble solid from a liquid. The solid caught in the paper is the ", /*#__PURE__*/React.createElement(Term, {
    def: "The solid left behind in the filter paper."
  }, "residue"), "; the liquid that passes through is the ", /*#__PURE__*/React.createElement(Term, {
    def: "The liquid that passes through the filter paper."
  }, "filtrate"), "."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Evaporation:"), " heat a solution until all the solvent has gone, leaving the solid. ", /*#__PURE__*/React.createElement("strong", null, "Crystallisation:"), " evaporate only some of the solvent, then let it cool slowly so larger crystals form."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Distillation:"), " heat the mixture; the liquid with the lower boiling point turns to vapour, which is cooled in a condenser and collected as the ", /*#__PURE__*/React.createElement(Term, {
    def: "The liquid collected after distillation."
  }, "distillate"), ". Use it when you want to keep the liquid."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Magnetic separation:"), " a magnet removes iron, steel, nickel or cobalt. ", /*#__PURE__*/React.createElement("strong", null, "Chromatography:"), " separates dyes in a mixture as a solvent soaks up paper; each dye travels a different distance."))), /*#__PURE__*/React.createElement(Figure, {
    caption: "Filtration separates an insoluble solid from a liquid."
  }, /*#__PURE__*/React.createElement(FiltrationFigure, null)), /*#__PURE__*/React.createElement(Figure, {
    caption: "Simple distillation. Cold water enters the condenser at the lower end."
  }, /*#__PURE__*/React.createElement(DistillationFigure, null)), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Reading a chromatogram",
    problem: "A note was found written in black marker. Ink from the note and from three pens was spotted on a pencil line and the paper was stood in water. Use the chromatogram below to decide which pen wrote the note. Explain your answer. (2 marks)",
    steps: ["Look at the note: its ink separated into three dyes (blue, yellow and pink spots).", "Compare each pen: Pen A is missing the yellow dye; Pen C has a purple dye the note does not have.", "Pen B has the same three spots, at the same heights, as the note."],
    answer: "Pen B. Its ink separated into the same three dyes, travelling the same distances, as the ink from the note. Pens A and C have a different set of dyes."
  }), /*#__PURE__*/React.createElement(Figure, {
    caption: "Chromatogram of the note and three pens."
  }, /*#__PURE__*/React.createElement(ChromatogramFigure, null)), /*#__PURE__*/React.createElement(Practice, {
    title: "Separation techniques"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 51,
    question: "Muddy creek water is poured through filter paper. What is the clear water that drips through called?",
    options: ["The residue", "The filtrate", "The distillate", "The solute"],
    correct: 1,
    explain: "The liquid that passes through filter paper is the filtrate. The mud caught in the paper is the residue."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 52,
    question: "In paper chromatography, why is the start line drawn in pencil rather than in pen?",
    options: ["Pencil is easier to see", "Pencil does not dissolve in the solvent, so it will not run up the paper", "Pen would make the solvent move faster", "Pencil absorbs the dyes"],
    correct: 1,
    explain: "Graphite in pencil is insoluble, so it stays put. Ink from a pen would dissolve and separate into its own spots, which would confuse the results."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 53,
    question: "Which technique is best for separating a dry mixture of rice grains and flour?",
    options: ["Filtration", "Sieving", "Distillation", "Chromatography"],
    correct: 1,
    explain: "Both are dry solids with very different particle sizes, so a sieve holds back the rice and lets the flour through. Filtration is for separating an insoluble solid from a liquid."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 54,
    question: "Two groups start with the same alum solution. Group A heats theirs strongly until all of the water has gone. Group B heats theirs gently to remove only some of the water, then leaves it on a windowsill to cool slowly for three days. Compare the solids the two groups end up with, and explain why Group B's method gives larger crystals. (3 marks)",
    model: "Group A used evaporation to dryness, so they get a crust of tiny crystals (almost a powder) stuck to the basin, and some may spit out or be overheated. Group B used crystallisation, so they get fewer, much larger, well-shaped crystals. As Group B's solution cools slowly, the solubility of alum falls gradually, so only a little solid comes out of solution at a time. The particles have time to join on to a few crystals that are already growing, in an orderly pattern, so those crystals get bigger. In Group A the water leaves quickly and many tiny crystals form all at once."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "4.4.4",
    items: ["I can describe filtration, evaporation, crystallisation, distillation, decanting, sieving, magnetic separation and chromatography.", "I can label residue, filtrate and distillate on a diagram.", "I can explain the difference between evaporation and crystallisation.", "I can read a chromatogram to match an unknown ink."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#4.4",
    label: "Learn it in full: 4.4 Separating Mixtures"
  })), /*#__PURE__*/React.createElement(DotPoint, _extends({
    id: "4.4.6",
    title: "An industrial separation technique"
  }, p), /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "know"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Fractional distillation of crude oil:"), " crude oil is a mixture of many substances. It is heated until most of it becomes vapour, which rises up a tall column that is hot at the bottom and cool at the top."), /*#__PURE__*/React.createElement("li", null, "Each substance condenses at the level where the column temperature falls below its boiling point. Substances with ", /*#__PURE__*/React.createElement("strong", null, "low boiling points"), " (gases, petrol) rise to the ", /*#__PURE__*/React.createElement("strong", null, "top"), "; substances with high boiling points (lubricating oil, bitumen) are collected near the bottom. Each group collected is called a ", /*#__PURE__*/React.createElement(Term, {
    def: "A group of substances with similar boiling points collected together."
  }, "fraction"), "."), /*#__PURE__*/React.createElement("li", null, "Other industrial examples: ", /*#__PURE__*/React.createElement("strong", null, "wastewater treatment"), " (screens sieve out rubbish, settling tanks let solids sink, sand filters, then bacteria break down waste); ", /*#__PURE__*/React.createElement("strong", null, "mineral flotation"), " (crushed ore is mixed with water and bubbles; the valuable mineral sticks to the bubbles and floats off); ", /*#__PURE__*/React.createElement("strong", null, "desalination by reverse osmosis"), " (water is pushed at high pressure through a membrane that holds back the dissolved salts)."))), /*#__PURE__*/React.createElement(Figure, {
    caption: "Fractional distillation of crude oil."
  }, /*#__PURE__*/React.createElement(ColumnFigure, null)), /*#__PURE__*/React.createElement(Practice, {
    title: "Industrial separation"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 55,
    question: "In a fractionating column, where are the fractions with the LOWEST boiling points collected?",
    options: ["At the bottom, where it is hottest", "In the middle", "At the top, where it is coolest", "They do not separate"],
    correct: 2,
    explain: "Low-boiling-point substances stay as gas the longest, so they rise to the cool top before condensing. Bitumen, with a very high boiling point, is collected at the bottom."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 56,
    question: "Name TWO separation techniques used at a wastewater treatment plant and state what each one removes. (2 marks)",
    model: "1. Screening (a type of sieving): metal screens remove large objects such as rags, plastic and sticks. 2. Settling (sedimentation): in large tanks, heavy solids sink to the bottom as sludge and the water above is drawn off. (Filtration through sand and gravel removes fine particles.)"
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "4.4.6",
    items: ["I can describe how fractional distillation separates crude oil using boiling points.", "I can name a fraction collected at the top and at the bottom of the column.", "I can describe one other industrial separation, such as wastewater treatment."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#4.4",
    label: "Learn it in full: 4.4 Separating Mixtures"
  })));
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
    "suspension": "A cloudy mixture of insoluble particles in a liquid that settle over time."
  },
  sections: [{
    id: "4.1",
    label: "States of matter",
    accent: "purple",
    blurb: "★★ The three states, the water cycle and changes of state explained with particles.",
    points: ["4.1.1", "4.1.3"],
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section41, p);
    }
  }, {
    id: "4.2",
    label: "Density",
    accent: "purple",
    blurb: "★★ Calculating density with ρ = m / V, including the displacement method.",
    points: ["4.2.3"],
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section42, p);
    }
  }, {
    id: "4.3",
    label: "Solubility and investigating",
    accent: "purple",
    blurb: "★★★ Solution words, measuring solubility, temperature effects, fair tests, tables and graphs.",
    points: ["4.3.1", "4.3.2", "4.3.3", "1.2.6", "1.2.8"],
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section43, p);
    }
  }, {
    id: "4.4",
    label: "Separating mixtures",
    accent: "purple",
    blurb: "★★★ Elements, compounds and mixtures, and the techniques used to separate them.",
    points: ["4.4.1", "4.4.2", "4.4.3", "4.4.4", "4.4.6"],
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section44, p);
    }
  }]
});
