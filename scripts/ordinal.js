"use strict"
class Ordinal {
  constructor(n, b) {
    this.n = new ExpantaNum(n) 
    this.b = b
  }


  string(length) {
		if (this.n.isNaN()) return "NaN"
    if (this.n.lt(this.b)) return this.n.floor().toFixed(0)

    const ordLevel = ExpantaNum.floor(this.n.logBase(this.b))
    const ordArray = []

    for (let i = 0; i < length; i++) {
      ordArray.push({
        lvl: ordLevel.minus(i),
        mul: this.n.div(ExpantaNum.pow(this.b, ordLevel.minus(i))).mod(this.b).floor()
      })

      if (ordLevel.minus(i).lte(0)) break
    }

    const thing = []

    for (const i in ordArray) {
      if (ordArray[i].mul.eq(0)) continue

      const ord = ordArray[i]
      const sup = ord.lvl.lt(this.b) ? ord.lvl.toFixed(0) : new Ordinal(ord.lvl, this.b).string(Math.max(length - i, 1))

      if (ord.mul.neq(0)) thing.push(`${`${ord.lvl.neq(0) ? `&omega;` : ""}<sup>${ord.lvl.lte(1) ? "" : sup}</sup>`}${(ord.mul.eq(1) && ord.lvl.neq(0)) ? "" : ord.mul.toFixed(0)}`)
    }

    return `${thing.join("+")}${ordArray[ordArray.length - 1].lvl.gt(0) ? "..." : ""}`
  }

  get stringWithBase() {
    return `${this.string(20)}&nbsp;[${this.b}]`
  }


  toNumberWithBase(b, length = 20) {
		if (this.n.isNaN()) return nD(10)
    if (this.n.eq(0)) return this.n
    const ordLevel = ExpantaNum.floor(this.n.logBase(this.b))
    const ordArray = []

    for (let i = 0; i < length; i++) {
      ordArray.push({
        lvl: ordLevel.minus(i),
        mul: this.n.div(ExpantaNum.pow(this.b, ordLevel.minus(i))).mod(this.b).floor()
      })

      if (ordLevel.minus(i).lte(0)) break
    }

    let sum = new ExpantaNum(0)

    for (const i in ordArray) {
      const ord = ordArray[i]
      const exp = ord.lvl.lt(this.b) ? ord.lvl : new Ordinal(ord.lvl, this.b).toNumberWithBase(b, Math.max(length - i, 1))

      sum = sum.plus(D.pow(b, exp).times(ord.mul))
    }

    return sum
  }
}

// Oh let's sing my DNA ordinal song
// // Triple zero triple one,
// // Triple two and triple three,
// // three three zero four four one
// // Five five two and six six two
// // Seven seven i eight eight one
// // Nine nine two and ten nine two
// // Eleven nine o and then
// // Tweive ten one please remember
// // Thirteen eleven and two
// // repeat that and there's some more

// // STANZA TWO EVERYBODY

// // Thirteen eleven and one
// // Fourteen twelve two don't be late
// // Fourteen eleven and one
// // Fifteen twelve two almost there
// // Fifteen eleven and one
// // Sixteen twelve and chicken egg
// 0
