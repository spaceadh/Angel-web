/**
 * M-PESA tariffs, copied from Safaricom's official charges page:
 * https://www.safaricom.co.ke/main-mpesa/m-pesa-for-you/tariffs-limits/consumer-tariffs-limits
 * ("Last Updated: August 4, 2026", checked 2026-11-17).
 *
 * When Safaricom changes a tariff, update the bands here and `MPESA_CHECKED`.
 * Every amount is in Kenyan shillings.
 */

export const MPESA_SOURCE = {
  title: "M-PESA Charges (consumer and Lipa na M-PESA tariffs)",
  publisher: "Safaricom",
  url: "https://www.safaricom.co.ke/main-mpesa/m-pesa-for-you/tariffs-limits/consumer-tariffs-limits",
  updated: "2026-08-04",
};
export const MPESA_CHECKED = "2026-11-17";
export const MPESA_MAX_TRANSACTION = 250_000;

/** [min, max, fee]; `null` fee means the transaction isn't allowed. */
type Band = readonly [number, number, number | null];

function lookup(bands: readonly Band[], amount: number) {
  const band = bands.find(([min, max]) => amount >= min && amount <= max);
  return band ? band[2] : null;
}

/** Sender's charge for sending to another M-PESA user (or other network). */
const SEND_MONEY: readonly Band[] = [
  [1, 100, 0],
  [101, 500, 7],
  [501, 1_000, 13],
  [1_001, 1_500, 23],
  [1_501, 2_500, 33],
  [2_501, 3_500, 53],
  [3_501, 5_000, 57],
  [5_001, 7_500, 78],
  [7_501, 10_000, 90],
  [10_001, 15_000, 100],
  [15_001, 20_000, 105],
  [20_001, 250_000, 108],
];

/** Charge for withdrawing cash at an M-PESA agent (minimum KSh 50). */
const AGENT_WITHDRAWAL: readonly Band[] = [
  [1, 49, null],
  [50, 100, 11],
  [101, 2_500, 29],
  [2_501, 3_500, 52],
  [3_501, 5_000, 69],
  [5_001, 7_500, 87],
  [7_501, 10_000, 115],
  [10_001, 15_000, 167],
  [15_001, 20_000, 185],
  [20_001, 35_000, 197],
  [35_001, 50_000, 278],
  [50_001, 250_000, 309],
];

/**
 * Customer's charge for paying a Pochi la Biashara. Safaricom labels this
 * table "For 3 Months from 1st August 2026", so it may change.
 */
const POCHI: readonly Band[] = [
  [1, 200, 0],
  [201, 500, 7],
  [501, 1_000, 13],
  [1_001, 1_500, 23],
  [1_501, 2_500, 33],
  [2_501, 250_000, 50],
];

/** Business Till paying out to a mobile number. */
const TILL_TO_MOBILE: readonly Band[] = [
  [1, 100, 0],
  [101, 500, 4],
  [501, 1_000, 7],
  [1_001, 1_500, 12],
  [1_501, 2_500, 17],
  [2_501, 3_500, 27],
  [3_501, 5_000, 29],
  [5_001, 7_500, 39],
  [7_501, 10_000, 45],
  [10_001, 15_000, 50],
  [15_001, 20_000, 53],
  [20_001, 250_000, 54],
];

/** Business Till paying a Paybill. Safaricom lists no charge below KSh 101. */
const TILL_TO_PAYBILL: readonly Band[] = [
  [1, 100, 0],
  [101, 500, 3],
  [501, 1_000, 5],
  [1_001, 1_500, 8],
  [1_501, 2_500, 10],
  [2_501, 3_500, 13],
  [3_501, 5_000, 17],
  [5_001, 7_500, 21],
  [7_501, 10_000, 24],
  [10_001, 15_000, 29],
  [15_001, 20_000, 31],
  [20_001, 25_000, 34],
  [25_001, 30_000, 36],
  [30_001, 35_000, 42],
  [35_001, 40_000, 50],
  [40_001, 45_000, 52],
  [45_001, 250_000, 54],
];

/** What a merchant pays to receive a Buy Goods (Till) payment. */
export function tillMerchantFee(amount: number) {
  if (amount <= 500) return 0;
  if (amount <= 36_363) return Math.round(amount * 0.0055 * 100) / 100;
  return 200;
}

export const sendMoneyFee = (amount: number) => lookup(SEND_MONEY, amount);
export const agentWithdrawalFee = (amount: number) =>
  lookup(AGENT_WITHDRAWAL, amount);
export const pochiFee = (amount: number) => lookup(POCHI, amount);
export const tillToMobileFee = (amount: number) =>
  lookup(TILL_TO_MOBILE, amount);
export const tillToPaybillFee = (amount: number) =>
  lookup(TILL_TO_PAYBILL, amount);
