'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  CurrencyCode,
  CurrencyConfig,
  CURRENCIES,
  BudgetTier,
} from '@/types/pitch';

interface BudgetCalculatorProps {
  tiers: BudgetTier[];
  defaultSelections?: Record<string, number>;
  defaultCurrency?: CurrencyCode;
  onTotalChange?: (total: number, currency: CurrencyConfig) => void;
  showExchangeRates?: boolean;
}

// Exchange rate API (free, no key needed)
const EXCHANGE_RATE_API = 'https://open.er-api.com/v6/latest/GBP';

/**
 * Interactive budget calculator with currency support.
 * Shows service tiers with adjustable day counts and live total.
 */
export function BudgetCalculator({
  tiers,
  defaultSelections = {},
  defaultCurrency = 'GBP',
  onTotalChange,
  showExchangeRates = true,
}: BudgetCalculatorProps) {
  const [selections, setSelections] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    tiers.forEach((tier) => {
      initial[tier.id] = defaultSelections[tier.id] ?? tier.defaultDays;
    });
    return initial;
  });

  const [currency, setCurrency] = useState<CurrencyConfig>({
    code: defaultCurrency,
    symbol: CURRENCIES[defaultCurrency].symbol,
    rate: 1,
    rateDate: new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
  });

  const [rates, setRates] = useState<Record<CurrencyCode, number>>({
    GBP: 1,
    EUR: 1.17,
    USD: 1.27,
    AUD: 1.95,
  });

  const [isLoadingRates, setIsLoadingRates] = useState(false);

  // Fetch exchange rates on mount
  useEffect(() => {
    const fetchRates = async () => {
      setIsLoadingRates(true);
      try {
        const response = await fetch(EXCHANGE_RATE_API);
        const data = await response.json();
        if (data.rates) {
          setRates({
            GBP: 1,
            EUR: data.rates.EUR || 1.17,
            USD: data.rates.USD || 1.27,
            AUD: data.rates.AUD || 1.95,
          });
          setCurrency((prev) => ({
            ...prev,
            rate: data.rates[prev.code] || 1,
            rateDate: new Date().toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            }),
          }));
        }
      } catch (error) {
        console.error('Failed to fetch exchange rates:', error);
      }
      setIsLoadingRates(false);
    };

    fetchRates();
  }, []);

  // Calculate total in selected currency
  const calculateTotal = useCallback(() => {
    const gbpTotal = Object.entries(selections).reduce((sum, [tierId, days]) => {
      const tier = tiers.find((t) => t.id === tierId);
      if (!tier) return sum;
      return sum + tier.baseRate * days;
    }, 0);
    return gbpTotal * currency.rate;
  }, [selections, tiers, currency.rate]);

  const total = calculateTotal();

  // Notify parent of total changes
  useEffect(() => {
    if (onTotalChange) {
      onTotalChange(total, currency);
    }
  }, [total, currency, onTotalChange]);

  // Handle currency change
  const handleCurrencyChange = (code: CurrencyCode) => {
    setCurrency({
      code,
      symbol: CURRENCIES[code].symbol,
      rate: rates[code],
      rateDate: currency.rateDate,
    });
  };

  // Handle day selection change
  const handleDaysChange = (tierId: string, days: number) => {
    const tier = tiers.find((t) => t.id === tierId);
    if (!tier) return;

    const clampedDays = Math.min(Math.max(days, tier.minDays), tier.maxDays);
    setSelections((prev) => ({ ...prev, [tierId]: clampedDays }));
  };

  // Format currency value
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency.code,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 md:p-8">
      {/* Header with Currency Selector */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl">💰</span>
          <h3 className="text-xl font-bold text-white">Investment Calculator</h3>
        </div>

        {/* Currency Selector */}
        <div className="flex items-center gap-2">
          {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
            <button
              key={code}
              onClick={() => handleCurrencyChange(code)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                currency.code === code
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              {CURRENCIES[code].symbol} {code}
            </button>
          ))}
        </div>
      </div>

      {/* Tiers */}
      <div className="space-y-6 mb-8">
        {tiers.map((tier) => {
          const days = selections[tier.id] || tier.defaultDays;
          const tierTotal = tier.baseRate * days * currency.rate;

          return (
            <div
              key={tier.id}
              className={`bg-zinc-800/50 border rounded-xl p-4 transition-all duration-300 ${
                tier.recommended
                  ? 'border-green-500/30'
                  : 'border-white/5'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <h4 className="font-bold text-white">{tier.name}</h4>
                  {tier.recommended && (
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                      Recommended
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-400">
                    {formatCurrency(tierTotal)}
                  </div>
                  <div className="text-xs text-white/40">
                    {formatCurrency(tier.baseRate * currency.rate)}/day
                  </div>
                </div>
              </div>

              <p className="text-white/50 text-sm mb-4">{tier.description}</p>

              {/* Day Slider */}
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={tier.minDays}
                  max={tier.maxDays}
                  value={days}
                  onChange={(e) =>
                    handleDaysChange(tier.id, parseInt(e.target.value))
                  }
                  className="flex-1 h-2 bg-white/10 rounded-full appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-4
                    [&::-webkit-slider-thumb]:h-4
                    [&::-webkit-slider-thumb]:bg-blue-500
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-moz-range-thumb]:w-4
                    [&::-moz-range-thumb]:h-4
                    [&::-moz-range-thumb]:bg-blue-500
                    [&::-moz-range-thumb]:rounded-full
                    [&::-moz-range-thumb]:cursor-pointer
                    [&::-moz-range-thumb]:border-0"
                />
                <div className="flex items-center gap-2 min-w-[100px]">
                  <button
                    onClick={() => handleDaysChange(tier.id, days - 1)}
                    disabled={days <= tier.minDays}
                    className="w-8 h-8 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-white">
                    {days}
                  </span>
                  <button
                    onClick={() => handleDaysChange(tier.id, days + 1)}
                    disabled={days >= tier.maxDays}
                    className="w-8 h-8 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex justify-between mt-2 text-xs text-white/30">
                <span>{tier.minDays} days min</span>
                <span>{tier.maxDays} days max</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total */}
      <div
        className="border-t border-white/10 pt-6"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg text-white/70">Total Investment</span>
          <span
            className="text-3xl font-black text-white transition-all duration-300"
          >
            {formatCurrency(total)}
          </span>
        </div>

        {/* Exchange Rate Note */}
        {showExchangeRates && currency.code !== 'GBP' && (
          <p className="text-xs text-white/40 text-center">
            Rates as of {currency.rateDate}
            {isLoadingRates && ' (updating...)'}
            <br />
            <span className="text-white/30">
              1 GBP = {rates[currency.code].toFixed(2)} {currency.code}
            </span>
          </p>
        )}

        {/* Flexibility Note */}
        <div className="mt-4 bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
          <p className="text-green-400 text-sm">
            <span className="font-semibold">Weekly break clause</span> &bull;{' '}
            Full handover included
          </p>
        </div>
      </div>
    </div>
  );
}
