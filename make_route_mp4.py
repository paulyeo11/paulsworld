"""
Xinjiang North Self-Drive Route Animation
Generates: xinjiang_route.mp4
"""

import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import matplotlib.patheffects as pe
from matplotlib.patches import FancyArrowPatch, Circle
import imageio
import io
from PIL import Image

# ── Route data ──────────────────────────────────────────────────────────────
# lon, lat order for plotting (x=lon, y=lat)
STOPS = [
    {"num": "1", "name": "Urumqi",       "lon": 87.62, "lat": 43.82,
     "label": "Urumqi ✈",               "color": "#ff6b6b",  "dist_to_next": ""},
    {"num": "2", "name": "Shihezi",      "lon": 86.03, "lat": 44.30,
     "label": "Shihezi",                "color": "#ffd93d",  "dist_to_next": "~150 km"},
    {"num": "3", "name": "Kanas",        "lon": 87.06, "lat": 48.67,
     "label": "Kanas\nAlpine Lake · 1,340 m", "color": "#74b9ff", "dist_to_next": "680 km"},
    {"num": "4", "name": "Hemu Village", "lon": 86.80, "lat": 48.62,
     "label": "Hemu Village ★",         "color": "#74b9ff",  "dist_to_next": "35 km"},
    {"num": "5", "name": "Burqin",       "lon": 86.88, "lat": 47.70,
     "label": "Burqin",                 "color": "#ffd93d",  "dist_to_next": "180 km"},
    {"num": "6", "name": "Altay",        "lon": 88.12, "lat": 47.87,
     "label": "Altay",                  "color": "#ffd93d",  "dist_to_next": "110 km"},
    {"num": "7", "name": "Wulungu Lake", "lon": 87.45, "lat": 47.20,
     "label": "Wulungu Lake",           "color": "#74b9ff",  "dist_to_next": "100 km"},
    {"num": "",  "name": "Urumqi_end",   "lon": 87.62, "lat": 43.82,
     "label": "",                       "color": "#ff6b6b",  "dist_to_next": "480 km"},
]

# Map bounds (add padding)
LON_MIN, LON_MAX = 84.8, 89.5
LAT_MIN, LAT_MAX = 43.0, 49.5

# ── Colour palette ────────────────────────────────────────────────────────────
BG       = "#0d1b2a"
GRID_C   = "#1e3050"
ROUTE_C  = "#f9c74f"
LAND_C   = "#162032"
WATER_C  = "#1a3a5c"

FPS       = 30
HOLD_SEC  = 1.2     # pause on each stop
DRAW_SEC  = 1.6     # time to draw each leg
INTRO_SEC = 2.0
OUTRO_SEC = 3.0

W, H = 1088, 1920   # portrait 9:16 for mobile (divisible by 16 for codec)


# ── Helpers ───────────────────────────────────────────────────────────────────
def fig_to_rgb(fig):
    buf = io.BytesIO()
    fig.savefig(buf, format='png', dpi=fig.dpi, facecolor=fig.get_facecolor())
    buf.seek(0)
    img = Image.open(buf).convert('RGB')
    return np.array(img)


def lerp(a, b, t):
    return a + (b - a) * t


def ease_inout(t):
    return t * t * (3 - 2 * t)


# ── Build one frame ───────────────────────────────────────────────────────────
def build_frame(visible_stops, partial_seg, partial_t, show_title=True, show_legend=True):
    """
    visible_stops : list of stop dicts fully drawn so far
    partial_seg   : (stop_a, stop_b) currently drawing, or None
    partial_t     : 0..1 progress of partial segment
    """
    dpi = 96
    fig = plt.figure(figsize=(W / dpi, H / dpi), dpi=dpi, facecolor=BG)
    ax = fig.add_axes([0.05, 0.10, 0.90, 0.78])
    ax.set_facecolor(BG)
    ax.set_xlim(LON_MIN, LON_MAX)
    ax.set_ylim(LAT_MIN, LAT_MAX)
    ax.set_aspect('equal')
    ax.axis('off')

    # ── subtle grid ──
    for lon in np.arange(85, 90, 1):
        ax.axvline(lon, color=GRID_C, lw=0.5, alpha=0.4, zorder=1)
    for lat in np.arange(43, 50, 1):
        ax.axhline(lat, color=GRID_C, lw=0.5, alpha=0.4, zorder=1)

    # ── terrain blobs (rough Altai mountains & lakes) ──
    # Altai range sketch (top)
    mountain_lons = np.linspace(85.5, 89.0, 200)
    mountain_lats = 48.0 + 0.6 * np.sin(np.linspace(0, 8 * np.pi, 200)) + \
                    0.25 * np.sin(np.linspace(0, 22 * np.pi, 200))
    ax.fill_between(mountain_lons, mountain_lats, LAT_MAX, color="#0e2235", alpha=0.7, zorder=2)
    ax.plot(mountain_lons, mountain_lats, color="#1e3a55", lw=1.2, alpha=0.5, zorder=3)

    # Wulungu Lake blob
    from matplotlib.patches import Ellipse
    wl = Ellipse((87.42, 47.22), width=0.5, height=0.22,
                  facecolor=WATER_C, edgecolor="#2a5a8a", lw=1, alpha=0.8, zorder=3)
    ax.add_patch(wl)

    # Kanas Lake small blob
    kl = Ellipse((87.08, 48.68), width=0.12, height=0.22,
                  facecolor=WATER_C, edgecolor="#2a5a8a", lw=1, alpha=0.8, zorder=3)
    ax.add_patch(kl)

    # ── Drawn route legs ──
    all_drawn = list(visible_stops)
    for i in range(len(all_drawn) - 1):
        a, b = all_drawn[i], all_drawn[i + 1]
        ax.plot([a['lon'], b['lon']], [a['lat'], b['lat']],
                color=ROUTE_C, lw=2.5, ls='--', dashes=(6, 4),
                alpha=0.85, zorder=6,
                path_effects=[pe.Stroke(linewidth=4, foreground='#7a5c00', alpha=0.4),
                               pe.Normal()])
        # distance label at midpoint
        mx = (a['lon'] + b['lon']) / 2 + 0.08
        my = (a['lat'] + b['lat']) / 2
        dist = a.get('dist_to_next', '')
        if dist:
            ax.text(mx, my, dist, color='#c8a800', fontsize=8,
                    ha='left', va='center', zorder=10,
                    fontfamily='monospace',
                    path_effects=[pe.withStroke(linewidth=2, foreground=BG)])

    # ── Partial (animating) leg ──
    if partial_seg and partial_t > 0:
        a, b = partial_seg
        ex = lerp(a['lon'], b['lon'], partial_t)
        ey = lerp(a['lat'], b['lat'], partial_t)
        ax.plot([a['lon'], ex], [a['lat'], ey],
                color=ROUTE_C, lw=2.5, ls='--', dashes=(6, 4), alpha=0.85, zorder=6,
                path_effects=[pe.Stroke(linewidth=4, foreground='#7a5c00', alpha=0.4),
                               pe.Normal()])
        # animated plane dot
        ax.plot(ex, ey, 'o', color='white', ms=6, zorder=12,
                path_effects=[pe.withStroke(linewidth=3, foreground=ROUTE_C)])

    # ── Stop markers ──
    for s in visible_stops:
        # glow ring
        for radius, alpha in [(0.20, 0.12), (0.14, 0.22), (0.08, 0.40)]:
            circ = Circle((s['lon'], s['lat']), radius,
                          facecolor=s['color'], edgecolor='none',
                          alpha=alpha, transform=ax.transData, zorder=7)
            ax.add_patch(circ)
        # solid dot
        ax.plot(s['lon'], s['lat'], 'o',
                color=s['color'], ms=9, zorder=9,
                path_effects=[pe.withStroke(linewidth=3, foreground=BG)])

        # number badge
        if s['num']:
            ax.text(s['lon'], s['lat'], s['num'],
                    color='white', fontsize=7.5, fontweight='bold',
                    ha='center', va='center', zorder=11)

        # name label
        if s['label']:
            offset_x = 0.15
            offset_y = 0.10
            # avoid off-screen labels
            if s['lon'] < LON_MIN + 0.6:
                offset_x = 0.15
            ax.text(s['lon'] + offset_x, s['lat'] + offset_y, s['label'],
                    color='white', fontsize=9.5, fontweight='bold',
                    ha='left', va='bottom', zorder=11, linespacing=1.3,
                    path_effects=[pe.withStroke(linewidth=2.5, foreground=BG)])

    # ── Title block ──
    if show_title:
        fig.text(0.5, 0.925, "XINJIANG NORTH", color='white',
                 fontsize=28, fontweight='bold', ha='center', va='center',
                 path_effects=[pe.withStroke(linewidth=3, foreground='#1a3a5c')])
        fig.text(0.5, 0.905, "Self-Drive Route  ·  Sep 2026",
                 color='#f9c74f', fontsize=14, ha='center', va='center')

    # ── Legend ──
    if show_legend:
        lx, ly = 0.06, 0.11
        dot_colors = {'Start / End': '#ff6b6b', 'City': '#ffd93d', 'Lake / Village': '#74b9ff'}
        for i, (label, col) in enumerate(dot_colors.items()):
            fig.text(lx + 0.04, ly - i * 0.018, '●', color=col, fontsize=10,
                     ha='center', va='center')
            fig.text(lx + 0.07, ly - i * 0.018, label, color='#aaaaaa',
                     fontsize=8.5, ha='left', va='center')
        # dashed line legend
        fig.text(lx + 0.04, ly - 3 * 0.018, '╌╌', color=ROUTE_C, fontsize=11,
                 ha='center', va='center')
        fig.text(lx + 0.07, ly - 3 * 0.018, 'Route', color='#aaaaaa',
                 fontsize=8.5, ha='left', va='center')
        fig.text(0.5, 0.065, "Total  ~1,815 km",
                 color='#f9c74f', fontsize=13, fontweight='bold',
                 ha='center', va='center')

    # ── Footer ──
    fig.text(0.5, 0.040, "Paul's World  ·  Xinjiang North Trip  ·  Sep 2026",
             color='#556677', fontsize=9.5, ha='center', va='center')

    fig.tight_layout(rect=[0, 0.05, 1, 0.95])
    frame = fig_to_rgb(fig)
    plt.close(fig)
    return frame


# ── Intro frame ───────────────────────────────────────────────────────────────
def intro_frame(alpha_t):
    dpi = 96
    fig = plt.figure(figsize=(W / dpi, H / dpi), dpi=dpi, facecolor=BG)
    ax = fig.add_axes([0, 0, 1, 1])
    ax.set_facecolor(BG)
    ax.axis('off')
    ax.set_xlim(0, 1); ax.set_ylim(0, 1)

    a = ease_inout(alpha_t)
    fig.text(0.5, 0.56, "XINJIANG NORTH", color=(1, 1, 1, a),
             fontsize=36, fontweight='bold', ha='center', va='center')
    fig.text(0.5, 0.50, "Self-Drive Adventure", color=(0.98, 0.78, 0.31, a),
             fontsize=20, ha='center', va='center')
    fig.text(0.5, 0.45, "September 2026", color=(0.6, 0.7, 0.8, a),
             fontsize=14, ha='center', va='center')
    fig.text(0.5, 0.36, "Paul's World", color=(0.33, 0.4, 0.47, a),
             fontsize=12, ha='center', va='center')

    frame = fig_to_rgb(fig)
    plt.close(fig)
    return frame


# ── Outro: full route with glow ───────────────────────────────────────────────
def outro_frame(t):
    frame = build_frame(STOPS, None, 0, show_title=True, show_legend=True)
    return frame


# ── Main render loop ──────────────────────────────────────────────────────────
def render_frames():
    frames = []

    # INTRO
    n_intro = int(INTRO_SEC * FPS)
    for i in range(n_intro):
        t = i / max(n_intro - 1, 1)
        frames.append(intro_frame(t))
    print(f"  Intro: {len(frames)} frames")

    # BUILD ROUTE stop by stop
    visible = [STOPS[0]]          # start with Urumqi visible
    hold_frames = int(HOLD_SEC * FPS)
    draw_frames = int(DRAW_SEC * FPS)

    # Hold on start
    for _ in range(hold_frames):
        frames.append(build_frame(visible, None, 0))

    for seg_i in range(1, len(STOPS)):
        a = STOPS[seg_i - 1]
        b = STOPS[seg_i]

        # Animate drawing the leg
        for i in range(draw_frames):
            t = ease_inout(i / max(draw_frames - 1, 1))
            frames.append(build_frame(visible, (a, b), t))

        # Stop arrives
        visible.append(b)
        for _ in range(hold_frames):
            frames.append(build_frame(visible, None, 0))

        print(f"  Segment {seg_i}/{len(STOPS)-1} done — total frames: {len(frames)}")

    # OUTRO hold
    n_outro = int(OUTRO_SEC * FPS)
    for _ in range(n_outro):
        frames.append(outro_frame(1.0))
    print(f"  Outro added — total frames: {len(frames)}")

    return frames


# ── Export ────────────────────────────────────────────────────────────────────
def main():
    output = "/home/user/paulsworld/xinjiang_route.mp4"
    print("Rendering frames…")
    frames = render_frames()
    print(f"Total frames: {len(frames)}  ({len(frames)/FPS:.1f}s)")

    print("Writing MP4…")
    writer = imageio.get_writer(output, fps=FPS, codec='libx264',
                                quality=8, pixelformat='yuv420p',
                                output_params=['-crf', '20', '-preset', 'slow'])
    for i, frame in enumerate(frames):
        writer.append_data(frame)
        if i % 50 == 0:
            print(f"  frame {i}/{len(frames)}")
    writer.close()
    print(f"Done → {output}")


if __name__ == '__main__':
    main()
