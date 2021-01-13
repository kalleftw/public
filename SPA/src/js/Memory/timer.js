
/**
 * Simple timer
 * Ref:
 * http://www.sitepoint.com/creating-accurate-timers-in-javascript/
 *
 */
class Timer {
  /**
   * @param {Element} elementToUpdate - The element to update visual
   * @constructor
   */
  constructor (elementToUpdate) {
    this.element = elementToUpdate || document.body
  }

  /**
   * Starting the timer method
   * @memberof Timer
   */
  start () {
    const start = new Date().getTime()
    let time = 0
    let elapsed = '0.0'

    function instance () {
      time += 100
      elapsed = Math.floor(time / 100) / 10
      if (Math.round(elapsed) === elapsed) {
        elapsed += '.0'
      }
      this.element.textContent = elapsed
      const diff = (new Date().getTime() - start) - time
      window.clearInterval(this.intervalID)
      this.intervalID = window.setTimeout(instance.bind(this), (100 - diff))
    }
    this.intervalID = window.setTimeout(instance.bind(this), 100)
  }

  /**
   * Method to stop the timer
   * Clears interval
   * @memberof Timer
   */
  timerStop () {
    window.clearInterval(this.intervalID)
  }

  /**
   * Printing method
   * @memberof Timer
   * @returns the time
   */
  print () {
    return 0 + this.timing
  }
}

// Exports
export { Timer }
