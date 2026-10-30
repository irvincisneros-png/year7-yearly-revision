/* Generated from revision.jsx by tools/build.js. Edit the .jsx, not this file. */
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
var _React = React,
  useStateR = _React.useState,
  useContextR = _React.useContext;
var TIERS = {
  core: {
    stars: "★★★",
    label: "High value",
    text: "This idea carries a lot of marks. Know it well and practise it until it feels easy."
  },
  important: {
    stars: "★★",
    label: "Important",
    text: "Expect to be asked about this. Make sure you can explain it in your own words."
  },
  know: {
    stars: "★",
    label: "Know it",
    text: "Worth a mark or so. Learn the key facts."
  }
};
function ExamFocus(_ref) {
  var _ref$tier = _ref.tier,
    tier = _ref$tier === void 0 ? "important" : _ref$tier,
    children = _ref.children;
  var t = TIERS[tier] || TIERS.important;
  return /*#__PURE__*/React.createElement("div", {
    className: "exam-focus tier-" + tier,
    role: "note",
    "aria-label": "Exam focus: " + t.label
  }, /*#__PURE__*/React.createElement("span", {
    className: "ef-stars",
    "aria-hidden": "true"
  }, t.stars), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, t.label, "."), " ", children || t.text));
}
function Recap(_ref2) {
  var _ref2$title = _ref2.title,
    title = _ref2$title === void 0 ? "Recap: what you need to know" : _ref2$title,
    children = _ref2.children;
  return /*#__PURE__*/React.createElement("div", {
    className: "callout key recap"
  }, /*#__PURE__*/React.createElement("h4", null, title), children);
}
function ExamTip(_ref3) {
  var _ref3$title = _ref3.title,
    title = _ref3$title === void 0 ? "Exam technique" : _ref3$title,
    children = _ref3.children;
  return /*#__PURE__*/React.createElement("div", {
    className: "callout tip"
  }, /*#__PURE__*/React.createElement("h4", null, title), children);
}

/* steps: array of strings or nodes, revealed one at a time */
function WorkedExample(_ref4) {
  var title = _ref4.title,
    problem = _ref4.problem,
    _ref4$steps = _ref4.steps,
    steps = _ref4$steps === void 0 ? [] : _ref4$steps,
    answer = _ref4.answer;
  var _useStateR = useStateR(0),
    _useStateR2 = _slicedToArray(_useStateR, 2),
    shown = _useStateR2[0],
    setShown = _useStateR2[1];
  var all = shown >= steps.length;
  return /*#__PURE__*/React.createElement("div", {
    className: "worked"
  }, /*#__PURE__*/React.createElement("div", {
    className: "worked-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, "Worked example"), title && /*#__PURE__*/React.createElement("h4", null, title)), /*#__PURE__*/React.createElement("div", {
    className: "worked-problem"
  }, problem), shown > 0 && /*#__PURE__*/React.createElement("ol", {
    className: "worked-steps"
  }, steps.slice(0, shown).map(function (s, i) {
    return /*#__PURE__*/React.createElement("li", {
      key: i
    }, s);
  })), all && answer && /*#__PURE__*/React.createElement("div", {
    className: "worked-answer"
  }, /*#__PURE__*/React.createElement("strong", null, "Answer. "), answer), /*#__PURE__*/React.createElement("div", {
    className: "worked-actions"
  }, !all && /*#__PURE__*/React.createElement("button", {
    className: "reveal-btn",
    onClick: function onClick() {
      return setShown(function (n) {
        return n + 1;
      });
    }
  }, shown === 0 ? "Show the first step" : "Next step"), !all && steps.length > 1 && /*#__PURE__*/React.createElement("button", {
    className: "reveal-btn",
    onClick: function onClick() {
      return setShown(steps.length);
    }
  }, "Show all working"), shown > 0 && /*#__PURE__*/React.createElement("button", {
    className: "reveal-btn",
    onClick: function onClick() {
      return setShown(0);
    }
  }, "Hide working")));
}
function Practice(_ref5) {
  var _ref5$title = _ref5.title,
    title = _ref5$title === void 0 ? "Practice questions" : _ref5$title,
    children = _ref5.children;
  return /*#__PURE__*/React.createElement("div", {
    className: "q-group practice"
  }, /*#__PURE__*/React.createElement("div", {
    className: "q-group-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, "Practice"), /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: 0
    }
  }, title)), children);
}

/* id must be unique on the page; ticks are saved under the topic's storage key */
function SelfCheck(_ref6) {
  var id = _ref6.id,
    _ref6$items = _ref6.items,
    items = _ref6$items === void 0 ? [] : _ref6$items;
  var _useContextR = useContextR(TopicContext),
    skey = _useContextR.skey;
  var _useLocalStorage = useLocalStorage((skey || "rev") + ".selfcheck." + id, {}),
    _useLocalStorage2 = _slicedToArray(_useLocalStorage, 2),
    ticks = _useLocalStorage2[0],
    setTicks = _useLocalStorage2[1];
  var n = items.filter(function (_, i) {
    return ticks[i];
  }).length;
  return /*#__PURE__*/React.createElement("div", {
    className: "selfcheck"
  }, /*#__PURE__*/React.createElement("div", {
    className: "q-group-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, "Self-check"), /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: 0
    }
  }, "Can you do these? ", /*#__PURE__*/React.createElement("span", {
    className: "muted",
    style: {
      fontWeight: 500,
      fontSize: "0.85rem"
    }
  }, "(", n, " of ", items.length, ")"))), /*#__PURE__*/React.createElement("ul", null, items.map(function (it, i) {
    return /*#__PURE__*/React.createElement("li", {
      key: i
    }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      checked: !!ticks[i],
      onChange: function onChange() {
        return setTicks(function (t) {
          return _objectSpread(_objectSpread({}, t), {}, _defineProperty({}, i, !t[i]));
        });
      }
    }), /*#__PURE__*/React.createElement("span", null, it)));
  })), items.length > 0 && n === items.length && /*#__PURE__*/React.createElement("p", {
    className: "selfcheck-done"
  }, "Nice. If you could do all of these without notes, you are ready for this part of the exam."));
}
function NotebookLink(_ref7) {
  var href = _ref7.href,
    _ref7$label = _ref7.label,
    label = _ref7$label === void 0 ? "Learn it in full in the notebook" : _ref7$label;
  return /*#__PURE__*/React.createElement("a", {
    className: "nb-link",
    href: href,
    target: "_blank",
    rel: "noopener"
  }, /*#__PURE__*/React.createElement(IconBook, {
    size: 16
  }), /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement(IconArrow, {
    size: 14,
    sw: 2.5
  }));
}
Object.assign(window, {
  ExamFocus: ExamFocus,
  Recap: Recap,
  ExamTip: ExamTip,
  WorkedExample: WorkedExample,
  Practice: Practice,
  SelfCheck: SelfCheck,
  NotebookLink: NotebookLink
});
