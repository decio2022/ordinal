"use strict"
function updateTabs() {
	document.documentElement.style.setProperty("--tabAmount", 
		Math.max(1 + game.prestiges.gte(1) + (game.baseReductions.gte(10) && !game.options.hideMicrotransactions) + 
			calcAutoPower(true).gt(0) + (milestonesCompleted() >= 11),
			game.wuantums.gt(0) ? 6 - game.options.hideMicrotransactions : 1
		)
	)
}

function toNotation(n, p = 5, p2 = 5, idk = 1e6) { // eslint-disable-line
  if (n.eq(0)) return n.toFixed(p)
  if (n.lt(0.1)) return "<0.1"
  if (n.lt(idk)) return n.toFixed(p)
  if (n.isInfinite()) return "Infinite"

  const e = n.logBase(10).floor()
	const m = n.div(D.pow(10, e)).toFixed(p2)
	
	const c = e.gte(1e6)

  return `${c ? "" : m}e${c ? toNotation(e, p, p2) : e}`
}

// its in ui because i dont know where else to put it
function milestonesCompleted() {
  const reducs = game.baseReductions

  return reducs.gte(2) + reducs.gte(4) + reducs.gte(5) + reducs.gte(7) + reducs.gte(8) + reducs.gte(10) + reducs.gte(13) + reducs.gte(14) +
		reducs.gte(16) + reducs.gte(18) + reducs.gte(21) + reducs.gte(25) + reducs.gte(28) + reducs.gte(30) + reducs.gte(44) + reducs.gte(57) +
		reducs.gte(68) + reducs.gte(74) + reducs.gte(81) + reducs.gte(90)
}
