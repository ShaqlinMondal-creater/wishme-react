export const GST_PERCENT = 18
export const GST_RATE = GST_PERCENT / 100

export type InclusiveTaxSplit = {
  base: number
  tax: number
  total: number
}

export function splitInclusiveGst(total: number, percent = GST_PERCENT): InclusiveTaxSplit {
  const totalPaise = Math.max(0, Math.round(total * 100))
  const basePaise = Math.floor((totalPaise * 100) / (100 + percent))
  const taxPaise = totalPaise - basePaise

  return {
    base: basePaise / 100,
    tax: taxPaise / 100,
    total: totalPaise / 100,
  }
}

export function formatRupees(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}
