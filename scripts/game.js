"use strict"
class Game {
  constructor() {
    // ord
    this.ord = new Ordinal(0, 1000)

    // prestige
    this.prestigePoints = nD(0)
    this.prestiges = nD(0)

    // incrementors
    this.incrementors = {
      amount: nD(0),
      cost: nD(10)
    }

    // base prestige
    this.baseReductions = nD(0) // it decimal time, baybee

    // scaling
    this.scaling = [{
      amount: nD(0),
      cost: nD(10)
    }, {
      amount: nD(0),
      cost: nD(100)
    }, {
      amount: nD(0),
      cost: nD(1000)
    }, {
      amount: nD(0),
      cost: nD(10000)
    }]

    // multipliers
    this.multiplierPoints = nD(0)
    this.bestMp = nD(0)
    this.mpCost = nD(1e10)

    this.multiplierPower = nD(0)
    this.multipliers = {
      synergy: new Multiplier(nD(1.1), nD(10), freeSynergyLevels),
      scaling: new Multiplier(nD(1.2), nD(100), freeScalingLevels),
      swisdom: new Multiplier(nD(10), nD(1e16), freeSwisdomLevels)
		}
		
		this.multiplierReset = {
			times: nD(0)
		}

		// wuantum
		this.wuarks = nD(0)
		this.wuantums = nD(0)
		this.bankedExp = nD(0)

		this.wuantumUpgrades = {
			factor: nD(1),
			upgrades: {
				11: new WuantumUpg(),
				12: new WuantumUpg(),
				13: new WuantumUpg(),
				14: new WuantumUpg()
			}
		}

    // automation
    this.automators = {
			multPts: new Automator(nD(1e8), maxMultiplierPoints),
      scaling: new Automator(nD(15), maxAllScalings),
			incrementor: new Automator(nD(10), maxIncrementors),
			
      reduction: new Automator(nD(100), reduceBase),
			
      splitexp: new Automator(nD(1e6), distributeExp)
    }
    this.autoPower = nD(0)

    // microtransactions
    this.mtx = {
      money: 0,
      doublerTicks: 0,
      doubleIncs: false
    }


    // timers
    this.lastTick = Date.now()

    // ui
    this.tab = 0

    // options
    this.options = {
			disableMaxWhenReductable: false,
			hideMicrotransactions: false
    }
  }
}
