/**
 * Renders ```chart fenced blocks in blog Markdown into responsive, on-brand
 * HTML charts. Charts are data, not images: crisp at any size, readable by
 * search engines and screen readers, and easy for a writer (or an automated
 * job) to produce. Spec reference: content/blog/_EDITORIAL.md → "Charts".
 */

type Format = { prefix?: string; suffix?: string; decimals?: number };

type CategoryDatum = {
  label: string;
  value: number;
  /** Text shown instead of the formatted value. */
  display?: string;
  highlight?: boolean;
};

type Series = { name: string; values: Array<number | null> };

export type ChartSpec =
  | {
      type: "bar" | "column";
      title: string;
      subtitle?: string;
      source: string;
      note?: string;
      format?: Format;
      data: CategoryDatum[];
    }
  | {
      type: "line";
      title: string;
      subtitle?: string;
      source: string;
      note?: string;
      format?: Format;
      labels: string[];
      series: Series[];
      /** Lines may start above zero; bars and columns always start at zero. */
      yMin?: number;
      yMax?: number;
    };

type CategorySpec = Extract<ChartSpec, { data: CategoryDatum[] }>;
type LineSpec = Extract<ChartSpec, { type: "line" }>;

const seriesColors = ["#2563ff", "#101b1b", "#16b88a", "#ff5a5f"];

function escape(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatValue(value: number, format: Format = {}) {
  const text = value.toLocaleString("en-KE", {
    minimumFractionDigits: format.decimals ?? 0,
    maximumFractionDigits: format.decimals ?? 0,
  });
  return `${format.prefix ?? ""}${text}${format.suffix ?? ""}`;
}

/** Rounds an axis maximum up to a tidy number (e.g. 52.3 → 60, 117 → 120). */
function niceCeil(value: number) {
  if (value <= 0) return 1;
  const exponent = Math.floor(Math.log10(value));
  const base = 10 ** exponent;
  const step =
    [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10].find((s) => s * base >= value) ??
    10;
  return step * base;
}

function niceFloor(value: number) {
  if (value <= 0) return 0;
  const exponent = Math.floor(Math.log10(value));
  const base = 10 ** exponent;
  return Math.floor(value / base) * base;
}

function pct(value: number, min: number, max: number) {
  return (((value - min) / (max - min)) * 100).toFixed(2);
}

function header(spec: ChartSpec) {
  return `<figcaption class="chart-head"><strong class="chart-title">${escape(spec.title)}</strong>${
    spec.subtitle
      ? `<span class="chart-subtitle">${escape(spec.subtitle)}</span>`
      : ""
  }</figcaption>`;
}

function footer(spec: ChartSpec, table: string) {
  return `<p class="chart-source">Source: ${escape(spec.source)}${
    spec.note ? ` <span>${escape(spec.note)}</span>` : ""
  }</p><details class="chart-data"><summary>View the data</summary>${table}</details>`;
}

function categoryTable(spec: CategorySpec) {
  const rows = spec.data
    .map(
      (d) =>
        `<tr><th scope="row">${escape(d.label)}</th><td>${escape(d.display ?? formatValue(d.value, spec.format))}</td></tr>`,
    )
    .join("");
  return `<table><thead><tr><th scope="col">Item</th><th scope="col">Value</th></tr></thead><tbody>${rows}</tbody></table>`;
}

function renderBar(spec: CategorySpec) {
  const max = niceCeil(Math.max(...spec.data.map((d) => d.value)));
  // Bars scale within the track minus room for the longest value label,
  // so the label never spills out of the chart.
  const labelChars = Math.max(
    ...spec.data.map(
      (d) => (d.display ?? formatValue(d.value, spec.format)).length,
    ),
  );
  const rows = spec.data
    .map(
      (d) => `<div class="chart-row${d.highlight ? " is-highlight" : ""}">
<span class="chart-label">${escape(d.label)}</span>
<span class="chart-track"><span class="chart-fill" style="--w:${(d.value / max).toFixed(4)}"></span><span class="chart-value">${escape(d.display ?? formatValue(d.value, spec.format))}</span></span>
</div>`,
    )
    .join("");
  return `<figure class="chart chart-bar" aria-label="${escape(spec.title)}">${header(spec)}<div class="chart-rows" aria-hidden="true" style="--label:${labelChars + 2}ch">${rows}</div><p class="chart-axis" aria-hidden="true">Scale: 0 to ${escape(formatValue(max, spec.format))}</p>${footer(spec, categoryTable(spec))}</figure>`;
}

function renderColumn(spec: CategorySpec) {
  const max = niceCeil(Math.max(...spec.data.map((d) => d.value)));
  const columns = spec.data
    .map(
      (d) => `<div class="chart-col${d.highlight ? " is-highlight" : ""}">
<span class="chart-col-value">${escape(d.display ?? formatValue(d.value, spec.format))}</span>
<span class="chart-col-fill" style="height:${pct(d.value, 0, max)}%"></span>
<span class="chart-col-label">${escape(d.label)}</span>
</div>`,
    )
    .join("");
  return `<figure class="chart chart-column" aria-label="${escape(spec.title)}">${header(spec)}<div class="chart-cols" aria-hidden="true" style="--count:${spec.data.length}">${columns}</div>${footer(spec, categoryTable(spec))}</figure>`;
}

function renderLine(spec: LineSpec) {
  const values = spec.series.flatMap((s) =>
    s.values.filter((v): v is number => v !== null),
  );
  const rawMin = Math.min(...values);
  const rawMax = Math.max(...values);
  const min = spec.yMin ?? niceFloor(rawMin - (rawMax - rawMin) * 0.15);
  const max = spec.yMax ?? niceCeil(rawMax + (rawMax - rawMin) * 0.1);
  const lastIndex = spec.labels.length - 1;
  const x = (i: number) => (lastIndex === 0 ? 50 : (i / lastIndex) * 100);
  const y = (v: number) => 100 - Number(pct(v, min, max));

  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => min + (max - min) * t);
  const grid = ticks
    .map(
      (t) =>
        `<span class="chart-grid" style="bottom:${pct(t, min, max)}%"><span>${escape(formatValue(t, { ...spec.format, decimals: (max - min) / 4 >= 2 ? 0 : (spec.format?.decimals ?? 0) }))}</span></span>`,
    )
    .join("");

  const lines = spec.series
    .map((s, si) => {
      const points = s.values
        .map((v, i) =>
          v === null ? null : `${x(i).toFixed(2)},${y(v).toFixed(2)}`,
        )
        .filter(Boolean)
        .join(" ");
      return `<polyline points="${points}" fill="none" stroke="${seriesColors[si % seriesColors.length]}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke" />`;
    })
    .join("");

  const endLabels = spec.series
    .map((s, si) => {
      let index = s.values.length - 1;
      while (index >= 0 && s.values[index] === null) index--;
      if (index < 0) return "";
      const v = s.values[index] as number;
      return `<span class="chart-point" style="left:${x(index).toFixed(2)}%;top:${y(v).toFixed(2)}%;--c:${seriesColors[si % seriesColors.length]}"><span>${escape(formatValue(v, spec.format))}</span></span>`;
    })
    .join("");

  // Show every label when there are few, otherwise first, middle and last.
  const shown =
    spec.labels.length <= 7
      ? spec.labels.map((_, i) => i)
      : [0, Math.floor(lastIndex / 2), lastIndex];
  const xLabels = shown
    .map(
      (i) =>
        `<span style="left:${x(i).toFixed(2)}%">${escape(spec.labels[i])}</span>`,
    )
    .join("");

  const legend =
    spec.series.length > 1
      ? `<ul class="chart-legend">${spec.series
          .map(
            (s, si) =>
              `<li style="--c:${seriesColors[si % seriesColors.length]}">${escape(s.name)}</li>`,
          )
          .join("")}</ul>`
      : "";

  const head = `<tr><th scope="col">Period</th>${spec.series.map((s) => `<th scope="col">${escape(s.name)}</th>`).join("")}</tr>`;
  const body = spec.labels
    .map(
      (label, i) =>
        `<tr><th scope="row">${escape(label)}</th>${spec.series
          .map(
            (s) =>
              `<td>${s.values[i] === null ? "–" : escape(formatValue(s.values[i] as number, spec.format))}</td>`,
          )
          .join("")}</tr>`,
    )
    .join("");
  const table = `<table><thead>${head}</thead><tbody>${body}</tbody></table>`;

  return `<figure class="chart chart-line" aria-label="${escape(spec.title)}">${header(spec)}${legend}<div class="chart-plot" aria-hidden="true">${grid}<svg viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">${lines}</svg>${endLabels}</div><div class="chart-xlabels" aria-hidden="true">${xLabels}</div>${footer(spec, table)}</figure>`;
}

function validate(spec: ChartSpec) {
  if (!spec.title || !spec.source) {
    throw new Error("chart: `title` and `source` are required");
  }
  if (spec.type === "line") {
    if (!spec.labels?.length || !spec.series?.length) {
      throw new Error(
        `chart "${spec.title}": line charts need labels and series`,
      );
    }
    for (const s of spec.series) {
      if (s.values.length !== spec.labels.length) {
        throw new Error(
          `chart "${spec.title}": series "${s.name}" has ${s.values.length} values for ${spec.labels.length} labels`,
        );
      }
    }
  } else if (!spec.data?.length) {
    throw new Error(`chart "${spec.title}": data is empty`);
  } else if (spec.data.some((d) => d.value < 0)) {
    throw new Error(`chart "${spec.title}": bar/column values must be ≥ 0`);
  }
}

export function parseChart(source: string): ChartSpec {
  const spec = JSON.parse(source) as ChartSpec;
  validate(spec);
  return spec;
}

export function renderChart(source: string) {
  const spec = parseChart(source);
  if (spec.type === "bar") return renderBar(spec);
  if (spec.type === "column") return renderColumn(spec);
  if (spec.type === "line") return renderLine(spec);
  throw new Error(`chart: unknown type "${(spec as { type: string }).type}"`);
}
