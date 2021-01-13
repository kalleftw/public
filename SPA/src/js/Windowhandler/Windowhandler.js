import { Chat } from '../Chat/Chat.js'

const template = document.createElement('template')
template.innerHTML = `
<div class="container">
  <h1 class="mover">
  <span class="dot" style="background:#ED594A;"></span>
 </h1>
 
</div>

<!--container end-->
<style>

  .dot {
  top: -52px;
  margin-left: 250px;
  height: 12px;
  width: 12px;
  border-radius: 50%;
  display: inline-block;
  cursor: pointer;
}
 .container {
  height: 525px;
  width: 400px;
  margin: 100px auto;
  background: #f7f7f7;
  border: 1px groove #f7f7f7;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  position: absolute;
  touch-action: none;


  
}
.mover {
  position: relative;
  background: #AD133A;
  color: white;
  margin: 0;
  padding: 10px 100px;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: normal;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  cursor: move;
  height: 25px;
}



  
}
    </style>
`

/**
 * Window handler application
 * @Window
 */
let zIndex = 0
class Window extends window.HTMLElement {
  constructor () {
    /**
     * Opening shadow DOM
     */
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    /**
     * pos1 - pos4 will be used to find out coordinates of the mouse,
     * and will serve as a calculator, to move windows
     * @memberof Window
     */
    this.pos1 = this.pos1
    this.pos2 = this.pos2
    this.pos3 = this.pos3
    this.pos4 = this.pos4

    /**
     * Selectors, one for the moving H1 and one for the container
     * @memberof Window
     */
    this.mover = this.shadowRoot.querySelector('.mover')
    this.cont = this.shadowRoot.querySelector('.container')
  }

  /**
   * Method whom will be executed when DOM renders,
   * @memberof Chat
   * @memberof Window
   */
  connectedCallback () {
    const chat = new Chat()
    chat.connect()
    this.dragElement(this.cont)
    this.closeWindow()
  }

  /**
   * Method which will initiate our "moving" window
   * @param {*} event Getting event parameter from dragElement in the constructor, which is the whole container
   * @memberof Window
   */
  dragElement (event) {
    this.mover.addEventListener('mousedown', (e) => {
      this.sender(event)
      this.zIndex()
    })
  }

  /**
   * Method which instansiates the move
   * @param {*} event will check for mouse down
   * @memberof Window
   */
  elementDrag (event) {
    event = event || window.event
    this.moveWindow(event.clientX, event.clientY)
  }

  /**
   * Method which will actually move the window in the DOM
   * @param {*} x the x-coordinate, coming from event.clientX
   * @param {*} y  the y-coordinate, coming from event.clientY
   * @memberof Window
   */
  moveWindow (x, y) {
    this.pos1 = this.pos3 - x
    this.pos2 = this.pos4 - y
    this.pos3 = x
    this.pos4 = y
    this.style.top = this.offsetTop - this.pos2 + 'px'
    this.style.left = this.offsetLeft - this.pos1 + 'px'
  }

  /**
   * Method which drops the window on mouseup,
   * setting it to null.
   * @memberof Window
   */
  closeDragElement () {
    document.onmouseup = null
    document.onmousemove = null
  }

  /**
   * Method which sets the X and Y-coordiates to pos
   * @param {*} event adds mousedown
   * binds elementDrag to "this"
   * @memberof Window
   */
  sender (event) {
    event = event || window.event
    this.pos3 = event.clientX
    this.pos4 = event.clientY

    document.onmouseup = this.closeDragElement
    document.onmousemove = this.elementDrag.bind(this)
  }

  /**
   * Spawners for different windows
   */

  /**
    * Selects chat ID, creates a new window, appending it to the DOM,
    * Creates a chat board, appending it to the window
    * @memberof Window
    */
  spawnChatWindow () {
    document.querySelector('#chat').addEventListener('click', (e) => {
      const window = document.createElement('window-board')
      document.body.appendChild(window)

      const chatBoard = document.createElement('chat-board')
      window.shadowRoot.firstElementChild.appendChild(chatBoard)
    })
  }

  /**
    * Selects Memory ID, creates a new window, appending it to the DOM,
    * Creates a chat board, appending it to the window
    * @memberof Window
    */
  spawnMemory () {
    document.querySelector('#memory').addEventListener('click', (e) => {
      const window = document.createElement('window-board')
      window.setAttribute('class', 'wind')
      document.body.appendChild(window)

      const memoryBoard = document.createElement('memory-board')
      window.shadowRoot.firstElementChild.appendChild(memoryBoard)
    })
  }

  /**
    * Selects Tip ID, creates a new window, appending it to the DOM,
    * Creates a chat board, appending it to the window
    * @memberof Window
    */
  spawnTipper () {
    document.querySelector('#tip').addEventListener('click', (e) => {
      const window = document.createElement('window-board')
      document.body.appendChild(window)

      const tipBoard = document.createElement('tip-board')
      window.shadowRoot.firstElementChild.appendChild(tipBoard)
    })
  }

  /**
   * Method to close the window
   * @memberof Window
   */
  closeWindow () {
    this.shadowRoot.querySelector('.dot').addEventListener('click', (e) => {
      e.preventDefault()
      this.remove()
    })
  }

  /**
   * Method which increment the global zIndex-variable and attaches it to clicked window
   * @memberof Window
   */
  zIndex () {
    this.cont.addEventListener('pointerdown', (e) => {
      this.cont.focus()
      this.cont.style.zIndex = zIndex++
    })
  }
}

window.customElements.define('window-board', Window)

export { Window }
