/* =============================================================================
 *  data.js  —  THE SINGLE SOURCE OF TRUTH for Paul's Life / Health Dashboard
 * =============================================================================
 *
 *  HOW TO UPDATE THIS FILE (monthly, ~2 minutes, no other file needs editing):
 *
 *  1. STEPS — once a month, open Apple Health, read your average steps/day for
 *     the month, and fill in the matching entry inside `steps.monthly` below.
 *     Replace the `null` with your number. Example:
 *         { month: "2026-06", label: "Jun 2026", avg: null }
 *     becomes
 *         { month: "2026-06", label: "Jun 2026", avg: 9210 }
 *     The big STEPS goal card recalculates its progress from the LATEST month
 *     that has a real number (not null). If every month is null it falls back
 *     to the baseline.
 *
 *  2. WEIGHT — after a Sunday morning weigh-in, fill in the matching entry in
 *     `weight.monthly`. Replace the `null` with your kg reading. Example:
 *         { date: "2026-06-29", label: "Jun 2026", kg: null }
 *     becomes
 *         { date: "2026-06-29", label: "Jun 2026", kg: 65.2 }
 *     The WEIGHT goal card recalculates progress from the LATEST kg reading.
 *
 *  3. CHANGING A GOAL — edit the `goal`, `deadline`, `start`, or `baseline`
 *     values inside the `steps` / `weight` objects. "Days remaining" is
 *     computed automatically at runtime from today's date, so you never touch
 *     dates anywhere else.
 *
 *  4. HABITS — edit the `habits` array to add/remove/rename habits. The
 *     "done today" checkmarks are stored in your browser (localStorage), not
 *     here, so they persist between visits without editing this file.
 *
 *  Dates use ISO format: YYYY-MM-DD. Numbers are plain numbers (no quotes).
 *  Use `null` for "not recorded yet".
 * =============================================================================
 */

const DASHBOARD_DATA = {

  // ---- Owner / header ----
  owner: "Paul",
  tagline: "Life & Health Dashboard",

  // ---------------------------------------------------------------------------
  //  GOAL 1 — STEPS
  // ---------------------------------------------------------------------------
  steps: {
    icon: "🚶",
    title: "Steps",
    unit: "steps/day",
    goal: 10000,                 // target average steps per day
    baseline: 8926,              // starting average (Jun 2025–Jun 2026, Apple Health)
    deadline: "2026-11-29",      // reach the goal by this date
    note: "Averaging fewer steps this year than last — this goal reverses that trend.",

    // Monthly average steps/day. Fill `avg` each month (null = not recorded).
    // Progress on the goal card is read from the LATEST non-null month.
    monthly: [
      { month: "2026-05", label: "May 2026", avg: 8926 },   // baseline
      { month: "2026-06", label: "Jun 2026", avg: null },
      { month: "2026-07", label: "Jul 2026", avg: null },
      { month: "2026-08", label: "Aug 2026", avg: null },
      { month: "2026-09", label: "Sep 2026", avg: null },
      { month: "2026-10", label: "Oct 2026", avg: null },
      { month: "2026-11", label: "Nov 2026", avg: null },
    ],
  },

  // ---------------------------------------------------------------------------
  //  GOAL 2 — WEIGHT
  // ---------------------------------------------------------------------------
  weight: {
    icon: "⚖️",
    title: "Weight",
    unit: "kg",
    goal: 63.0,                  // target weight in kg
    start: 66.0,                 // starting weight on the start date
    startDate: "2026-05-29",     // when the weight journey began
    deadline: "2026-08-29",      // reach the goal by this date
    note: "Lose 3 kg at roughly 1 kg/month. Weigh in every Sunday 8am.",

    // Sunday morning weigh-ins. Fill `kg` each month (null = not recorded).
    // Progress on the goal card is read from the LATEST non-null reading.
    monthly: [
      { date: "2026-05-29", label: "May 2026", kg: 66.0 },  // baseline
      { date: "2026-06-29", label: "Jun 2026", kg: null },
      { date: "2026-07-29", label: "Jul 2026", kg: null },
      { date: "2026-08-29", label: "Aug 2026", kg: null },
    ],
  },

  // ---------------------------------------------------------------------------
  //  HABITS  (status: all "building")
  //  `id` must stay stable — it's the key used for localStorage checkmarks.
  // ---------------------------------------------------------------------------
  habits: [
    {
      id: "steps-10k",
      label: "Walk 10k+ steps",
      detail: "Daily — supports the Steps goal",
      cadence: "daily",
      status: "building",
    },
    {
      id: "weigh-in",
      label: "Weekly weigh-in",
      detail: "Sunday 8:00am (morning) — supports the Weight goal",
      cadence: "weekly",
      status: "building",
    },
    {
      id: "longwalk-sg",
      label: "LongwalkSG community walk",
      detail: "2× / month — Saturday mornings only",
      cadence: "twice-monthly",
      status: "building",
    },
    {
      id: "church",
      label: "Attend church",
      detail: "Every Sunday 10:00am",
      cadence: "weekly",
      status: "building",
    },
  ],

  // ---------------------------------------------------------------------------
  //  LIFE PILLARS
  // ---------------------------------------------------------------------------
  pillars: [
    {
      icon: "🫀",
      title: "Health",
      blurb: "Two goals + the step & weigh-in habits.",
    },
    {
      icon: "✝️",
      title: "Faith",
      blurb: "Weekly church, Sunday 10:00am.",
      milestone: {
        label: "Baptized / became a Christian",
        date: "2026-04-29",      // anniversary observed each 29 April
      },
    },
  ],

};

// Expose to other scripts (app.js reads window.DASHBOARD_DATA).
window.DASHBOARD_DATA = DASHBOARD_DATA;
