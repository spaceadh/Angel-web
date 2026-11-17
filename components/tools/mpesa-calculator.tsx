"use client";

import { useState } from "react";
import {
  MPESA_MAX_TRANSACTION,
  agentWithdrawalFee,
  pochiFee,
  sendMoneyFee,
  tillMerchantFee,
  tillToMobileFee,
  tillToPaybillFee,
} from "@/lib/tools/mpesa";
import { kes, useToolTracking } from "./use-tool-tracking";
import styles from "./tools.module.css";

const QUICK_AMOUNTS = [300, 1_000, 2_500, 5_000, 15_000, 50_000];

function parseAmount(value: string) {
  const number = Number(value.replace(/[^\d.]/g, ""));
  return Number.isFinite(number) ? Math.floor(number) : 0;
}

export function MpesaCalculator() {
  const [raw, setRaw] = useState("2,500");
  const [salesRaw, setSalesRaw] = useState("100");
  const track = useToolTracking("mpesa_charges");

  const amount = parseAmount(raw);
  const sales = Math.min(parseAmount(salesRaw), 100_000);
  const tooBig = amount > MPESA_MAX_TRANSACTION;
  const valid = amount >= 1 && !tooBig;

  const till = valid ? tillMerchantFee(amount) : 0;
  const pochi = valid ? pochiFee(amount) : null;
  const send = valid ? sendMoneyFee(amount) : null;
  const withdraw = valid ? agentWithdrawalFee(amount) : null;
  const toMobile = valid ? tillToMobileFee(amount) : null;
  const toPaybill = valid ? tillToPaybillFee(amount) : null;

  // Cheapest way to get paid, counting what either side pays.
  const options = [
    { key: "till", total: till },
    { key: "pochi", total: pochi ?? Infinity },
    { key: "send", total: send ?? Infinity },
  ];
  const cheapest = options.reduce((a, b) => (b.total < a.total ? b : a)).key;

  const format = (value: number) =>
    value.toLocaleString("en-US", { maximumFractionDigits: 0 });

  return (
    <div className={styles.calc}>
      <div className={styles.inputs}>
        <div className={styles.field}>
          <label htmlFor="mpesa-amount">Amount of one payment</label>
          <div className={styles.moneyInput}>
            <span aria-hidden="true">KSh</span>
            <input
              id="mpesa-amount"
              inputMode="numeric"
              autoComplete="off"
              value={raw}
              onChange={(event) => {
                track();
                setRaw(event.target.value);
              }}
              onBlur={() => amount && setRaw(format(amount))}
              aria-describedby="mpesa-amount-hint"
            />
          </div>
          <p className={styles.hint} id="mpesa-amount-hint">
            One M-Pesa payment can be up to KSh 250,000.
          </p>
          <div className={styles.quick}>
            {QUICK_AMOUNTS.map((value) => (
              <button
                type="button"
                key={value}
                className={styles.chip}
                aria-pressed={amount === value}
                onClick={() => {
                  track();
                  setRaw(format(value));
                }}
              >
                {format(value)}
              </button>
            ))}
          </div>
          {tooBig && (
            <p className={styles.error} role="alert">
              M-Pesa allows up to KSh 250,000 per payment. Split larger amounts.
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="mpesa-sales">Payments like this a month</label>
          <input
            id="mpesa-sales"
            className={styles.numberInput}
            inputMode="numeric"
            autoComplete="off"
            value={salesRaw}
            onChange={(event) => {
              track();
              setSalesRaw(event.target.value);
            }}
          />
          <p className={styles.hint}>
            Used to show what Till fees add up to over a month.
          </p>
        </div>
      </div>

      <div className={styles.results} aria-live="polite">
        {valid ? (
          <>
            <div className={styles.headline}>
              <p>On a Lipa na M-Pesa Till you keep</p>
              <strong>{kes(amount - till)}</strong>
              <p>
                {till === 0 ? (
                  <em>No charge on payments of KSh 500 or less.</em>
                ) : (
                  <>
                    Safaricom keeps <em>{kes(till)}</em> per payment
                    {sales > 0 && (
                      <>
                        , about <em>{kes(Math.round(till * sales))}</em> a month
                        on {format(sales)} payments
                      </>
                    )}
                    .
                  </>
                )}
              </p>
            </div>

            <p className={styles.groupTitle}>Ways a customer can pay you</p>
            <ul className={styles.rows}>
              <li>
                <span>
                  Buy Goods Till
                  {cheapest === "till" && (
                    <b className={styles.best}>Lowest fee</b>
                  )}
                </span>
                <strong>{kes(till)}</strong>
                <small>
                  You pay {till === 0 ? "nothing" : kes(till)}. The customer
                  pays nothing.
                </small>
              </li>
              <li>
                <span>
                  Pochi la Biashara
                  {cheapest === "pochi" && (
                    <b className={styles.best}>Lowest fee</b>
                  )}
                </span>
                <strong>{pochi === null ? "n/a" : kes(pochi)}</strong>
                <small>
                  The customer pays {pochi ? kes(pochi) : "nothing"}. You
                  receive the full {kes(amount)}.
                </small>
              </li>
              <li>
                <span>
                  Send money to your personal line
                  {cheapest === "send" && (
                    <b className={styles.best}>Lowest fee</b>
                  )}
                </span>
                <strong>{send === null ? "n/a" : kes(send)}</strong>
                <small>
                  The customer pays {send ? kes(send) : "nothing"}, and it mixes
                  business money with personal money.
                </small>
              </li>
            </ul>

            <p className={styles.groupTitle}>Moving the money on</p>
            <ul className={styles.rows}>
              <li>
                <span>Withdraw cash at an agent</span>
                <strong>
                  {withdraw === null ? "Min. KSh 50" : kes(withdraw)}
                </strong>
                <small>Charge on a personal M-Pesa line.</small>
              </li>
              <li>
                <span>Till pays a mobile number</span>
                <strong>{toMobile === null ? "n/a" : kes(toMobile)}</strong>
                <small>
                  For paying suppliers, staff or yourself from the Till.
                </small>
              </li>
              <li>
                <span>Till pays a Paybill</span>
                <strong>{toPaybill === null ? "n/a" : kes(toPaybill)}</strong>
                <small>For rent, KPLC, suppliers or a bank Paybill.</small>
              </li>
            </ul>
          </>
        ) : (
          <p className={styles.hint}>Type an amount to see the charges.</p>
        )}
      </div>
    </div>
  );
}
