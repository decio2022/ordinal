"use strict"
function prestige() {
  game.prestigePoints = game.prestigePoints.plus(ppGain())
  game.prestiges = game.prestiges.plus(1)

  game.ord = new Ordinal(nD(0), 1000 - game.baseReductions)

  game.mtx.doubleIncs = false

  updateTabs()
}

function getBaseReductionCost(n) {
  if (game.ord.b >= 1000) return nD(1000)
  if (game.ord.b <= 4) return nD(Infinity) // you cant reduce the base any further
}

function reduceBase(idk = nD(1)) {
	if (idk.lt(1)) return
  const cost = getBaseReductionCost(game.baseReductions)

  if (game.prestigePoints.gte(cost)) {
    game.baseReductions = game.baseReductions.plus(1)

    game.ord = new Ordinal(0, 1000 - game.baseReductions)
    game.prestigePoints = nD(0)

    for (const i in game.scaling) {
      const s = game.scaling[i]

      s.amount = nD(0)
      s.cost = nD(10).pow((i - 0) + 1)
    }

    game.incrementors.amount = nD((milestonesCompleted() >= 5) - 0)

    game.multiplierPoints = nD(0)
    game.mpCost = nD(1e10)

		game.mtx.doubleIncs = false

    setScalingCosts()
    setIncrementorCost()
  }

  updateTabs()
}

function calcMultResetCost() {
	/* if (game.multiplierReset.times.lt(5))*/ return nD(3000).times(D.pow(1.12, game.multiplierReset.times))
	
	// return nD(3000).times(D.pow(1.12, 5)).pow(D.pow(1.1, game.multiplierReset.times.minus(5)))
	// just gonna remove scaling for now
}

function resetMults() {
	if (calculateTotalMultLevel().gte(calcMultResetCost())) {
		for (const i in game.multipliers) {
			game.multipliers[i].exp = nD(game.bankedExp)
			game.multipliers[i].blevel = nD(0)
		}

		game.multiplierReset.times = game.multiplierReset.times.plus(1)
	}
}

function ppGain() {
	let thing = game.ord.toNumberWithBase(ppGainBase())

	const scaLevel = game.multipliers.scaling.level

	if (scaLevel.gte(2000)) thing = thing.pow(scaLevel.minus(2000).pow(0.3).times(0.025).plus(1))

	return thing
}

function wuantum(idkwhattoname = true) {
	if (idkwhattoname) {
		game.wuantums = game.wuantums.plus(1)
		game.wuarks = game.wuarks.plus(wuarkGain())
		game.bankedExp = game.bankedExp.plus(calcBankedExpGain())
	}

  game.baseReductions = nD(0)

  game.ord = new Ordinal(0, 100 - game.baseReductions)
  game.prestigePoints = nD(0)

  for (const i in game.scaling) {
      const s = game.scaling[i]

      s.amount = nD(0)
      s.cost = nD(10).pow((i - 0) + 1)
	}
		
	for (const i in game.multipliers) {
			game.multipliers[i].exp = nD(game.bankedExp)
			game.multipliers[i].blevel = nD(0)
			game.multipliers[i].points = nD(0)
	}

	for (const i in game.automators) game.automators[i].points = nD(0)
	game.autoPower = nD(0)

	game.multiplierReset.times = nD(0)

  game.incrementors.amount = nD((milestonesCompleted() >= 5) - 0)

	game.multiplierPoints = nD(0)
	game.bestMp = nD(0)
  game.multiplierPower = nD(0)
  game.mpCost = nD(1e10)

  game.mtx.doubleIncs = false

  setScalingCosts()
	setIncrementorCost()
	
	updateTabs()
}

function wuarkGain() {
	return D.pow(1.3, game.prestigePoints.plus(1).log10().plus(1).log10().minus(11)).floor()
}

function calcBankedExpGain() {
	let product = nD(1)

	for (const i in game.multipliers) product = product.times(game.multipliers[i].level.plus(1))

	return product
}

function ppGainBase() {
	return 100 + game.wuantumUpgrades.upgrades[11].have * 5
}
