const formatFloat = f => {
  var m = Math.pow(10, 2)
  let res = Math.round(f * m, 10) / m
  return Math.round(res)
}

export {
  formatFloat
}
