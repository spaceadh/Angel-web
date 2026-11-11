/**
 * USD → KSh conversion for showing shilling amounts next to USD prices.
 *
 * Prices are fixed in dollars (lib/pricing.ts). The shilling figure follows
 * the market: the rate is fetched once a day from open.er-api.com (free, no
 * key) and cached by Next.js. If the fetch fails, the fallback below is used.
 */

/** CBK mean rate, 15 Oct 2026. Only used when the live rate can't be fetched. */
export const FALLBACK_USD_KES = 129.81;

export interface FxRate {
  rate: number;
  /** ISO date the rate is from. */
  date: string;
  live: boolean;
}

export async function getUsdKesRate(): Promise<FxRate> {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD", {
      next: { revalidate: 60 * 60 * 24 },
    });
    if (!res.ok) throw new Error(`FX ${res.status}`);
    const data = (await res.json()) as {
      result?: string;
      rates?: Record<string, number>;
      time_last_update_unix?: number;
    };
    const rate = data.rates?.KES;
    // Sanity range: reject anything that can't be a real KES rate.
    if (data.result !== "success" || !rate || rate < 50 || rate > 500) {
      throw new Error("FX: no usable KES rate");
    }
    const date = new Date(
      (data.time_last_update_unix ?? Date.now() / 1000) * 1000,
    )
      .toISOString()
      .slice(0, 10);
    return { rate, date, live: true };
  } catch (err) {
    console.warn("Using fallback USD/KES rate:", err);
    return { rate: FALLBACK_USD_KES, date: "2026-10-15", live: false };
  }
}

/** "KSh 32,500", rounded to the nearest 100 shillings. */
export function formatKes(usd: number, rate: number) {
  const kes = Math.round((usd * rate) / 100) * 100;
  return `KSh ${kes.toLocaleString("en-US")}`;
}
