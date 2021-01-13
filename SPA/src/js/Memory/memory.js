import { Timer } from './timer.js'
const template = document.createElement('template')
template.innerHTML = `
<h1 class="tops"><img src = '/././image/game.jpg' alt="Game icon"/></h1>
<div id ="diffContainer"></div>
<div id ="timerContainer"></div>
<div id ="memoryContainer">
  
<template>
                <a href="#"><img src = '/././image/0.png' alt="Mem brick"/></a>
</template>
</div>


<!--container end-->


<style>
#chat {
  overflow: hidden;
}
  .removed {
  visibility: hidden;
}  
.winner {
  font-weight: bold;
  font-size: xx-large;
}
  #memoryContainer img {
    width: 100px;
  }
  button {
  text-transform: uppercase;
  font-weight: bold;
  display: block;
  margin: 30px auto;
  background: #AD133A;
  border-radius: 5px;
  width: 200px;
  height: 50px;
  font-size: 17px;
  color: white;
}

  .tops {
    top: -10px;
    width: 30px;

  }

    #memoryContainer {
  height: 525px;
  width: 450px;
  margin: 25px auto;
  position: absolute;
}

  h1 {
  
  color: black;
  top: -52px;
  position: absolute;
  padding: 10px 100px;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: normal;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  cursor: move;
  
}

h1 img {
  height: 30px;
  float: left;
  margin-left: -95px;
}

#timerContainer {
  color: green;
  text-align: center;
  font-size: 30px;
}

.winner {
  font-size: 30px;
}

</style>
`

class Memory extends window.HTMLElement {
  constructor (rows, cols) {
    super()
    /**
     * Opening shadowDOM
     */
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    /**
     * The number of rows
     * @type {Int}
     */
    this.rows = rows
    /**
     * The number of columns
     * @type {Int}
     */
    this.cols = cols
    /**
     * Decide if this is first turn
     * @type {Boolean}
     */
    this.turn1 = this.turn1

    /**
     * Decide if this is second turn
     * @type {Boolean}
     */
    this.turn2 = this.turn2

    /**
     * The last tile which you clicked
     */
    this.lastTile = null

    /**
     * Number of pairs
     * @type {Int}}
     */
    this.pairs = 0

    /**
     * Number of tries
     * @type {Int}
     */
    this.tries = 0

    /**
     * Selectors,
     * Container = the container in which the memory lives
     */
    this.container = this.shadowRoot.querySelector('#memoryContainer')
    /**
     * The container in which the timer lives
     */
    this.timerContainer = this.shadowRoot.querySelector('#timerContainer')

    /**
     * The container in which the difficulty selector lives
     */
    this.diffContainer = this.shadowRoot.querySelector('#diffContainer')
  }

  /**
   * Method which runs when the game is started
   */
  connectedCallback () {
    this.renderDifficulty()
    this.clicker()
  }

  /**
 * Function to render the board
 * @param {*} rows number of rows to render
 * @param {*} cols number of columns to render
 * @memberof Memory
 */
  renderBoard (rows, cols) {
    this.startTimer()
    // Assigning the board to the tiles variable, to set its class
    this.tiles = this.populateBoard(this.rows, this.cols)

    // Looping through everything, creating one tile per loop and assigning its class
    for (let i = 0; i < (rows * cols); i++) {
      const aTag = document.createElement('a')
      aTag.setAttribute('href', '#')

      const tile = document.createElement('img')
      tile.setAttribute('src', './image/0.png')
      tile.setAttribute('alt', 'a memory tile')
      tile.setAttribute('class', this.tiles[i])

      aTag.appendChild(tile)
      this.container.appendChild(aTag)

      // If two or four tiles in a row, create a
      if ((i + 1) % cols === 0) {
        this.container.appendChild(document.createElement('br'))
      }
    }

    this.populateBoard(rows, cols)
  }

  /**
   * Method to turn the brick and check if it's a match,
   * Checking if game is over
   * @param {*} index - the clicked bricks class name
   * @param {*} img - the clicked bricks image
   * @memberof Memory
   */
  turnBrick (index, img) {
    // If second click
    if (this.turn2) { return }
    // Assign clicked brick a tile
    img.src = 'image/' + index + '.png'

    // First brick is clicked
    if (!this.turn1) {
      // Storing image info in this.turn1
      this.turn1 = img

      // Setting lastTile to tile, to remember
      this.lastTile = index
    } else {
      if (img === this.turn1) { return }

      this.tries += 1
      // Second brick is clicked
      this.turn2 = img

      // Found a pair
      if (index === this.lastTile) {
        this.pairs += 1

        // Checking if the number of pairs is equal to half of cols*rows
        // Stops timer and appends a winning message
        if (this.pairs === (this.cols * this.rows) / 2) {
          this.timer.timerStop()
          const winner = document.createElement('h1')
          winner.setAttribute('class', 'winner')
          winner.innerText = 'OH MY GOD YOU WON, IT TOOK ' + this.tries + ' TRIES!!!!! The time was: ' + this.timerContainer.innerText + ' seconds which is not so impressive, to be honest.'
          this.container.appendChild(winner)
          this.timerContainer.innerText = ''
        }

        // Removes the visibility of the brick
        window.setTimeout(() => {
          this.turn1.parentNode.classList.add('removed')
          this.turn2.parentNode.classList.add('removed')

          // Resets turns
          this.turn1 = null
          this.turn2 = null
        }, 300)
      } else {
        // Turning back
        window.setTimeout(() => {
          this.turn1.src = '/image/0.png'
          this.turn2.src = '/image/0.png'
          this.turn1 = null
          this.turn2 = null
        }, 500)
      }
    }
  }

  /**
   * Function to shuffle the bricks
   * @param {*} rows number of rows from rendering method
   * @param {*} cols number of columns from rendering method
   * @memberof Memory
   * @returns shuffled array
   */
  populateBoard (rows, cols) {
    const arr = []

    for (let i = 1; i <= (rows * cols) / 2; i++) {
      arr.push(i)
      arr.push(i)
    }

    // Fisher-Yates
    for (let i = arr.length - 1; i > 0; i--) {
      const h = Math.floor(Math.random() * (i + 1))
      const temp = arr[i]
      arr[i] = arr[h]
      arr[h] = temp
    }
    return arr
  }

  /**
   * Eventlistener method that targets clicks
   * Calling turnBrick with the class and the image
   * @memberof Memory
   */
  clicker () {
    this.container.addEventListener('click', (e) => {
      const img = e.target.nodeName === 'IMG' ? e.target : e.target.firstElementChild
      if (img.nodeName !== 'IMG') return
      this.index = img.getAttribute('class')
      this.turnBrick(this.index, img)
    })
  }

  /**
   * Method which starts the timer
   * @memberof Memory
   */
  startTimer () {
    this.timer = new Timer(this.shadowRoot.querySelector('#timerContainer'))
    this.timer.start()
  }

  /**
   * Method that creates and reders two buttons to set difficulty
   * @memberof Memory
   */
  renderDifficulty () {
    const divfordiiff = document.createElement('div')
    divfordiiff.setAttribute('class', 'diff')
    this.diffContainer.appendChild(divfordiiff)

    const twoxtwo = document.createElement('button')
    twoxtwo.setAttribute('class', '2x2')
    twoxtwo.innerText = '2x2'
    divfordiiff.appendChild(twoxtwo)

    const fourxfour = document.createElement('button')
    fourxfour.setAttribute('class', '4x4')
    fourxfour.innerText = '4x4'
    divfordiiff.appendChild(fourxfour)
    this.choseDifficulty()
  }

  /**
   * Listening method, listens after clicks on the button,
   * Sets rows and cols to desired difficulty
   * Calls renderBoard method with rows and cols
   * @memberof Memory
   */
  choseDifficulty () {
    this.shadowRoot.querySelector('#diffContainer').addEventListener('click', (e) => {
      if (e.target.className === '2x2') {
        this.rows = 2
        this.cols = 2
      } else {
        this.rows = 4
        this.cols = 4
      }
      this.destroy()
      this.renderBoard(this.rows, this.cols)
    })
  }

  /**
   * Method which removes the buttons when the game starts
   * @memberof Memory
   */
  destroy () {
    const el = this.shadowRoot.querySelector('#diffContainer')
    el.parentNode.removeChild(el)
  }
}

window.customElements.define('memory-board', Memory)

export { Memory }
