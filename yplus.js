
function fromRe(Re,L,yplus) {
  let Pt = 101325.0
  let Tt = 288.15
  let gamma = 1.4
  let mu = 1.7894e-5
  let Kelvin = 273.15
  let R = 287.074
  let Sutherland = 110.6 / Kelvin
  let Ratio = 1. + 0.5 * (gamma - 1.0)
  let P = Pt / Math.pow( Ratio, (gamma / (gamma - 1.0) ) )
  let T = Tt / Ratio
  let rho = P / R / T
  let temp = T / Kelvin
  let muT = mu * (Sutherland + 1.0) * temp * Math.sqrt(temp) / (Sutherland + temp) / rho
  let V = Re / L * muT
  let yval = y(Re,rho,V,yplus,muT)
  return yval
}

function y(Re,rho,V,yplus,muT) {
  let i = 0
  let ale = log10(Math.exp(1.0))
  let Cf = 0.02
  
  while ( i < 10 ) {
    let fun = 4.15 * Math.sqrt(Cf) * log10(Re * Cf) + 1.7 * Math.sqrt(Cf) - 1.0
    let dfun = ( 4.15 * ale + 0.5 * 4.15 * log10(Re * Cf) + 1.7 / 2.0) / Math.sqrt(Cf)
    let df = fun / dfun

    if( Math.abs(df / Cf) <= Math.exp(-5.0) ) break

    let Cfo = Cf - df
    if( Cfo <= 0.0 )
      Cf = 0.5 * Cf
    else
      Cf = Cfo

    i++
  }

  //Cfo = Math.pow( (1.0 / ( 4.15 * log10(Re * Cf) + 1.7) ), 2.0 )
  let tau = 0.5 * rho * V * V * Cf
  let aus = Math.sqrt( tau / rho )
  return yplus * muT / aus
}

function log10(x) {
  return Math.log(x) / Math.log(10.0)
}

function calc_y()
{

  var res = document.getElementById("re").value
  if (res == "") {
    alert("Re!");
    return false;
  }
  else
  {
    var Re = parseFloat(res)
  }

  var Ls = document.getElementById("L").value
  if (Ls == "") {
    alert("L!");
    return false;
  }
  else
  {
    var L = parseFloat(Ls)
  }

  var ypluss = document.getElementById("yplus").value
  if (ypluss == "") {
    alert("yplus!");
    return false;
  }
  else
  {
    var yplus = parseFloat(ypluss)
  }

  var dY = fromRe(Re,L,yplus)

  document.getElementById("dy").value = dY;
}
