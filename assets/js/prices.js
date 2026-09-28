/* ==========================================================================
   IIC Oil & Gas — Market prices (homepage strip under the hero)
   --------------------------------------------------------------------------
   Live quotes come from TradingView's free "Tickers" widget, one per
   column, using the same Capital.com symbols as the previous website.

   To change a commodity, edit its `symbol` (TradingView "EXCHANGE:TICKER").
   `name` and `unit` are the labels shown above each live quote.
   ========================================================================== */

window.IIC_PRICES = {
  source: "Indicative CFD prices from Capital.com via TradingView, updated during market hours.",
  items: [
    { name: "WTI Crude Oil",   unit: "USD / bbl",   icon: "drop",  symbol: "CAPITALCOM:USOIL" },
    { name: "Brent Crude Oil", unit: "USD / bbl",   icon: "drop",  symbol: "CAPITALCOM:UKOIL" },
    { name: "Natural Gas",     unit: "USD / MMBtu", icon: "flame", symbol: "CAPITALCOM:NATURALGAS" },
    { name: "Gasoline",        unit: "USD / gal",   icon: "can",   symbol: "CAPITALCOM:GASOLINE" },
    { name: "Heating Oil",     unit: "USD / gal",   icon: "can",   symbol: "CAPITALCOM:HEATINGOIL" }
  ]
};
