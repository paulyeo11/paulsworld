/* =============================================================================
 *  app.js — Life / Health Dashboard logic
 *  Vanilla JS. Reads DASHBOARD_DATA from data.js. No external dependencies.
 *  Habit checkmarks persist in localStorage (keyed per day).
 * ========================================================================== */

(function () {
  "use strict";

  const D = window.DASHBOARD_DATA;
  if (!D) {
    document.body.innerHTML = "<p style='padding:24px'>data.js failed to load.</p>";
    return;
  }

  // ---- Date helpers --------------------------------------------------------
  const MS_DAY = 86400000;

  function parseDate(iso) {
    // Parse as local midnight to avoid timezone drift on file:// .
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d);
  }
  function todayMidnight() {
    const n = new Date();
    return new Date(n.getFullYear(), n.getMonth(), n.getDate());
  }
  function daysBetween(from, to) {
    return Math.round((to.getTime() - from.getTime()) / MS_DAY);
  }
  function fmtDate(iso) {
    return parseDate(iso).toLocaleDateString(undefined, {
      year: "numeric", month: "short", day: "numeric",
    });
  }
  function todayKey() {
    const t = todayMidnight();
    const mm = String(t.getMonth() + 1).padStart(2, "0");
    const dd = String(t.getDate()).padStart(2, "0");
    return `${t.getFullYear()}-${mm}-${dd}`;
  }

  function clampPct(p) { return Math.max(0, Math.min(100, p)); }

  function latestValue(arr, key) {
    // Returns last entry whose `key` is not null, else null.
    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i][key] !== null && arr[i][key] !== undefined) return arr[i][key];
    }
    return null;
  }

  // ---- Header --------------------------------------------------------------
  document.getElementById("owner-name").textContent = D.owner;
  document.getElementById("tagline").textContent = D.tagline;
  document.getElementById("today-date").textContent =
    todayMidnight().toLocaleDateString(undefined, {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    });

  // ---- Days-remaining text -------------------------------------------------
  function daysRemainingNode(deadlineIso) {
    const days = daysBetween(todayMidnight(), parseDate(deadlineIso));
    const span = document.createElement("span");
    span.className = "days";
    if (days > 0) {
      span.textContent = `${days} day${days === 1 ? "" : "s"} left`;
    } else if (days === 0) {
      span.textContent = "due today";
    } else {
      span.textContent = `${Math.abs(days)} day${days === -1 ? "" : "s"} overdue`;
      span.classList.add("overdue");
    }
    return span;
  }

  // ---- GOAL: Steps ---------------------------------------------------------
  function renderSteps() {
    const s = D.steps;
    const current = latestValue(s.monthly, "avg");
    const value = current === null ? s.baseline : current;
    const pct = clampPct((value / s.goal) * 100);

    document.getElementById("steps-from").textContent =
      Math.round(value).toLocaleString();
    document.getElementById("steps-to").textContent =
      s.goal.toLocaleString();
    document.getElementById("steps-unit").textContent = s.unit;
    document.getElementById("steps-note").textContent = s.note;

    const bar = document.getElementById("steps-progress");
    bar.style.setProperty("--pct", pct + "%");
    bar.setAttribute("aria-valuenow", Math.round(pct));
    bar.setAttribute("aria-valuetext",
      `${Math.round(value).toLocaleString()} of ${s.goal.toLocaleString()} ${s.unit}, ${Math.round(pct)} percent`);

    document.getElementById("steps-pct").textContent = Math.round(pct) + "%";
    document.getElementById("steps-deadline-date").textContent = fmtDate(s.deadline);
    document.getElementById("steps-days").replaceWith(
      Object.assign(daysRemainingNode(s.deadline), { id: "steps-days" }));
  }

  // ---- GOAL: Weight --------------------------------------------------------
  function renderWeight() {
    const w = D.weight;
    const current = latestValue(w.monthly, "kg");
    const value = current === null ? w.start : current;

    // Progress = how far from start toward goal (losing weight).
    const totalDrop = w.start - w.goal;          // e.g. 66 - 63 = 3
    const doneDrop  = w.start - value;           // e.g. 66 - 66 = 0
    const pct = totalDrop <= 0 ? 0 : clampPct((doneDrop / totalDrop) * 100);

    document.getElementById("weight-from").textContent = w.start.toFixed(1);
    document.getElementById("weight-to").textContent = w.goal.toFixed(1);
    document.getElementById("weight-unit").textContent = w.unit;
    document.getElementById("weight-current").textContent = value.toFixed(1);
    document.getElementById("weight-note").textContent = w.note;

    const bar = document.getElementById("weight-progress");
    bar.style.setProperty("--pct", pct + "%");
    bar.setAttribute("aria-valuenow", Math.round(pct));
    bar.setAttribute("aria-valuetext",
      `Currently ${value.toFixed(1)} ${w.unit}, target ${w.goal.toFixed(1)} ${w.unit}, ${Math.round(pct)} percent of the way`);

    document.getElementById("weight-pct").textContent = Math.round(pct) + "%";
    document.getElementById("weight-deadline-date").textContent = fmtDate(w.deadline);
    document.getElementById("weight-days").replaceWith(
      Object.assign(daysRemainingNode(w.deadline), { id: "weight-days" }));
  }

  // ---- HABITS (localStorage-backed, per-day) -------------------------------
  const LS_KEY = "paulsworld.lifeDashboard.habits";

  function loadHabitState() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) { return {}; }
  }
  function saveHabitState(state) {
    try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (e) {}
  }

  function renderHabits() {
    const list = document.getElementById("habit-list");
    const state = loadHabitState();
    const dayKey = todayKey();
    const todayState = state[dayKey] || {};

    list.innerHTML = "";

    D.habits.forEach(function (h) {
      const li = document.createElement("li");
      li.className = "habit";
      const done = !!todayState[h.id];
      if (done) li.classList.add("done");

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "habit-check";
      btn.setAttribute("aria-pressed", done ? "true" : "false");
      btn.setAttribute("aria-label",
        (done ? "Mark not done today: " : "Mark done today: ") + h.label);
      btn.textContent = "✓";

      const body = document.createElement("div");
      body.className = "habit-body";

      const label = document.createElement("div");
      label.className = "label";
      label.textContent = h.label;

      const detail = document.createElement("div");
      detail.className = "detail";
      detail.textContent = h.detail;

      const tags = document.createElement("div");
      tags.className = "habit-tags";
      const statusTag = document.createElement("span");
      statusTag.className = "tag building";
      statusTag.textContent = h.status;
      tags.appendChild(statusTag);

      // Streak placeholder: count consecutive prior days marked done.
      const streak = streakFor(state, h.id) + (done ? 1 : 0);
      if (streak > 0) {
        const streakTag = document.createElement("span");
        streakTag.className = "tag streak";
        streakTag.textContent = "🔥 " + streak + "-day streak";
        tags.appendChild(streakTag);
      }

      body.appendChild(label);
      body.appendChild(detail);
      body.appendChild(tags);

      li.appendChild(btn);
      li.appendChild(body);
      list.appendChild(li);

      btn.addEventListener("click", function () {
        const st = loadHabitState();
        const dk = todayKey();
        st[dk] = st[dk] || {};
        st[dk][h.id] = !st[dk][h.id];
        saveHabitState(st);
        renderHabits(); // re-render to refresh streaks + styling
      });
    });
  }

  // Count consecutive days BEFORE today that this habit was done.
  function streakFor(state, id) {
    let count = 0;
    const cursor = todayMidnight();
    cursor.setDate(cursor.getDate() - 1); // start yesterday
    for (let i = 0; i < 365; i++) {
      const mm = String(cursor.getMonth() + 1).padStart(2, "0");
      const dd = String(cursor.getDate()).padStart(2, "0");
      const key = `${cursor.getFullYear()}-${mm}-${dd}`;
      if (state[key] && state[key][id]) {
        count++;
        cursor.setDate(cursor.getDate() - 1);
      } else {
        break;
      }
    }
    return count;
  }

  // ---- CHARTS (hand-rolled SVG line chart) ---------------------------------
  /*
   * Generic line chart with a horizontal target reference line.
   * series: array of {label, value|null}. Renders only the points with data,
   * connecting consecutive ones; gaps (null) are skipped gracefully.
   */
  function buildLineChart(opts) {
    const W = 360, H = 200;
    const padL = 44, padR = 14, padT = 16, padB = 34;
    const innerW = W - padL - padR;
    const innerH = H - padT - padB;

    const values = opts.series.map(s => s.value);
    const known = values.filter(v => v !== null && v !== undefined);

    // y-domain includes target and all known values, with a little padding.
    let lo = Math.min(opts.target, ...known);
    let hi = Math.max(opts.target, ...known);
    if (known.length === 0) { lo = Math.min(lo, opts.target); hi = Math.max(hi, opts.target); }
    if (lo === hi) { lo -= 1; hi += 1; }
    const span = hi - lo;
    lo -= span * 0.12;
    hi += span * 0.12;

    const n = opts.series.length;
    const xOf = i => padL + (n === 1 ? innerW / 2 : (innerW * i) / (n - 1));
    const yOf = v => padT + innerH - ((v - lo) / (hi - lo)) * innerH;

    const NS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", opts.ariaLabel);

    function add(tag, attrs, text) {
      const el = document.createElementNS(NS, tag);
      for (const k in attrs) el.setAttribute(k, attrs[k]);
      if (text != null) el.textContent = text;
      svg.appendChild(el);
      return el;
    }

    // Axis baseline
    add("line", { x1: padL, y1: padT, x2: padL, y2: padT + innerH,
      stroke: "#313856", "stroke-width": 1 });
    add("line", { x1: padL, y1: padT + innerH, x2: padL + innerW, y2: padT + innerH,
      stroke: "#313856", "stroke-width": 1 });

    // Y gridlines / labels (lo, target, hi)
    [lo, opts.target, hi].forEach(function (gv) {
      const y = yOf(gv);
      add("line", { x1: padL, y1: y, x2: padL + innerW, y2: y,
        stroke: "#262c47", "stroke-width": 1 });
      add("text", { x: padL - 6, y: y + 4, "text-anchor": "end",
        fill: "#aab2cf", "font-size": 10 }, opts.fmtY(gv));
    });

    // Target reference line (emphasized)
    const ty = yOf(opts.target);
    add("line", { x1: padL, y1: ty, x2: padL + innerW, y2: ty,
      stroke: "#3ddc97", "stroke-width": 1.5, "stroke-dasharray": "5 4" });

    // X labels
    opts.series.forEach(function (s, i) {
      add("text", { x: xOf(i), y: H - 12, "text-anchor": "middle",
        fill: "#aab2cf", "font-size": 9 }, s.label.split(" ")[0]);
    });

    // Data line — connect consecutive known points
    let prev = null;
    opts.series.forEach(function (s, i) {
      if (s.value === null || s.value === undefined) { prev = null; return; }
      const cx = xOf(i), cy = yOf(s.value);
      if (prev) {
        add("line", { x1: prev.x, y1: prev.y, x2: cx, y2: cy,
          stroke: opts.color, "stroke-width": 2.5,
          "stroke-linecap": "round" });
      }
      prev = { x: cx, y: cy };
    });

    // Data points + value labels
    opts.series.forEach(function (s, i) {
      if (s.value === null || s.value === undefined) return;
      const cx = xOf(i), cy = yOf(s.value);
      add("circle", { cx, cy, r: 4, fill: opts.color,
        stroke: "#0f1220", "stroke-width": 2 });
      add("text", { x: cx, y: cy - 9, "text-anchor": "middle",
        fill: "#eef1fb", "font-size": 9 }, opts.fmtPoint(s.value));
    });

    return svg;
  }

  function renderCharts() {
    // Steps chart
    const stepsSeries = D.steps.monthly.map(m => ({ label: m.label, value: m.avg }));
    const stepsChart = buildLineChart({
      series: stepsSeries,
      target: D.steps.goal,
      color: "#5b8cff",
      ariaLabel: "Steps per day by month with a target line at " +
        D.steps.goal.toLocaleString() + " steps.",
      fmtY: v => Math.round(v).toLocaleString(),
      fmtPoint: v => Math.round(v / 1000) + "k",
    });
    document.getElementById("steps-chart").appendChild(stepsChart);

    // Weight chart
    const weightSeries = D.weight.monthly.map(m => ({ label: m.label, value: m.kg }));
    const weightChart = buildLineChart({
      series: weightSeries,
      target: D.weight.goal,
      color: "#ffb454",
      ariaLabel: "Weight in kilograms by month with a target line at " +
        D.weight.goal.toFixed(1) + " kg.",
      fmtY: v => v.toFixed(1),
      fmtPoint: v => v.toFixed(1),
    });
    document.getElementById("weight-chart").appendChild(weightChart);
  }

  // ---- PILLARS -------------------------------------------------------------
  function renderPillars() {
    const wrap = document.getElementById("pillars");
    wrap.innerHTML = "";
    D.pillars.forEach(function (p) {
      const card = document.createElement("article");
      card.className = "card pillar";

      const icon = document.createElement("div");
      icon.className = "icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = p.icon;

      const body = document.createElement("div");
      const h3 = document.createElement("h3");
      h3.textContent = p.title;
      const blurb = document.createElement("p");
      blurb.textContent = p.blurb;
      body.appendChild(h3);
      body.appendChild(blurb);

      if (p.milestone) {
        const m = document.createElement("p");
        m.className = "milestone";
        const yearsTxt = anniversaryText(p.milestone.date);
        const strong = document.createElement("strong");
        strong.textContent = p.milestone.label + " ";
        m.appendChild(strong);
        m.appendChild(document.createTextNode("on " + fmtDate(p.milestone.date) +
          ". " + yearsTxt));
        body.appendChild(m);
      }

      card.appendChild(icon);
      card.appendChild(body);
      wrap.appendChild(card);
    });
  }

  function anniversaryText(iso) {
    const start = parseDate(iso);
    const today = todayMidnight();
    // Next anniversary (this year or next).
    let next = new Date(today.getFullYear(), start.getMonth(), start.getDate());
    if (next < today) next = new Date(today.getFullYear() + 1, start.getMonth(), start.getDate());
    const days = daysBetween(today, next);
    if (days === 0) return "Anniversary is today! 🎉";
    return `Next anniversary in ${days} day${days === 1 ? "" : "s"}.`;
  }

  // ---- Boot ---------------------------------------------------------------
  renderSteps();
  renderWeight();
  renderHabits();
  renderCharts();
  renderPillars();
})();
