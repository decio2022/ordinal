"use strict"
// init
let app
let game

function gameLoop(mult) {
  game.ord.n = game.ord.n.plus(getIncrementorProd(true)
    .times(mult)
    .times(game.mtx.doublerTicks > 0 ? 2 : 1)
  )

  game.mtx.doublerTicks = Math.max(0, game.mtx.doublerTicks - (mult * 1000))

  for (const i in game.automators) game.automators[i].tick(mult)
  for (const i in game.multipliers) game.multipliers[i].tick(mult)

  game.autoPower = calcAutoPower(false)
}

function init() {
	game = new Game()

  app = new Vue({
    el: "#app",
    data: {
			game,
			wuantumUpgData,
      toNotation,
      ExpantaNum,
      baseCost: getBaseReductionCost,
      milestones: milestonesCompleted,

      prod: {
        inc: getIncrementorProd,
        mp: getMultPointBoost
      },

      options: {
        yn: x => (x ? "ON" : "OFF")
      },

      oo: (x, b) => new Ordinal(x, b).string(20),

			ppGain,
			wuarkGain,
			calcBankedExpGain,

      scalingify: n => D.pow(10, nD(2).log10().div(getScalingEffect(n - 1))).max(calcScalingCap()),

      nextAutoPower,
      calcAutoPower,
      calcMultPointBoost,
      calcReductionBoost,
      calculateMultPowerSynergy,
      calcScalingCap,
      calcFreeIncrementors,
			calcFreeMultPts,
			calcMultResetCost,
			calculateSynergyCapDelay,
			reverseArithmeticThing,
			calculateRewardAmount,
			freeSynergyLevels,
			freeScalingLevels,
			freeSwisdomLevels,
			calculateTotalMultLevel
    }
  })
  
  load()
	
	setWuantumUpgStuff()
  
  updateTabs()

  setScalingCosts()
  setIncrementorCost()


  // gameloop
  setInterval(() => {
    const newTick = Date.now()
    const timeMult = (newTick - game.lastTick) / 1000
    game.lastTick = newTick

    /* if (timeMult < 100) */ gameLoop(timeMult)
    // else for (let i = 0; i < 1000; i++) gameLoop(timeMult / 1000)
  }, 100)

  // saving
  setInterval(save, 6969)


	// ui
  document.getElementById("app").style.display = "block"
  document.getElementById("preloader").style.display = "none"
}

init()
