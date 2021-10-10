export function round(n) {    
  return +(Math.round(n + "e+2")  + "e-2");
}

export function monetize(money) {
  return `$${money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
}