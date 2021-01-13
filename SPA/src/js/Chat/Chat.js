const template = document.createElement('template')
template.innerHTML = `
<h1 class="tops"><img src = '/././image/chat.jpg' alt="Chat icon"/></h1>


  <div id="container">
    <div class="chat">
    <!-- Div for the chatform -->
    <div class="chatform">
    <!-- Form for chatarea -->
    <form id="chatform">
    <textarea class="messageArea" placeholder="Write message here"></textarea><br>                 
    <textarea class="nickArea" placeholder="Change nickname"></textarea><br>
    <!-- Div for chatform ends -->
    </div>
    <hr>
    <!-- Form ends -->
    </form>
    <!-- Chat div ends -->
    </div>
    
    <!-- Hidden P's to read text -->
    <p class="text"></p>
    <p class="author"></p>
    
  </div>

<!--container end-->


<style>

.nn {
  margin: 0 auto;
  width: 50%;
  text-align: center;
  font-size: 17px;
}

h1 img {
  height: 30px;
  float: left;
  margin-left: -95px;
}

.chatform {
  text-align: center;
  overflow: auto;

}

  .tops {
    top: -10px;
    width: 30px;
  }
  

  #container {
  height: 480px;
  width: 400px;
  margin: auto;
  position: absolute;
  overflow: auto;
  
}

.nick {
  width: 60%;
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

p {
  top: 0px;
  padding-left: 20px;
  width: 60%;
  
}



p.text {
  display: none !important;
    visibility: hidden !important;

}

p.author {
  display: none !important; 
    visibility: hidden !important; 
}
    </style>
`

/**
 * Chat application
 * @chat
 */
class Chat extends window.HTMLElement {
  constructor () {
    /**
     * Opening shadow DOM
     */
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    /**
     * The socket to whom we will connect
     */
    this.socket = null

    /**
     * Username
     */
    this.username = this.username

    /**
     * Nickname
     */
    this.nickname = this.nickname

    /**
     * Selectors for the containers,
     * Chat, nickname and chat container
     */
    this.chat = this.shadowRoot.querySelector('.chat')
    this.nick = this.shadowRoot.querySelector('.nickArea')
    this.container = this.shadowRoot.querySelector('#container')
  }

  /**
   * Method which will execute when DOM gets rendered
   * @memberof Chat
   */
  connectedCallback () {
    this.connect()
    this.changeNickName()
    this.keyDown()
    this.sendEvent()
    this.keyDownNick()
  }

  /**
   * Method which will connect our chat to the web socket.
   * First row will make sure that we don't have to see the heartbeats
   * @memberof Chat
   */
  connect () {
    if (this.socket && this.socket.readyState === 1) {
      return
    }
    this.socket = new window.WebSocket('ws://vhost3.lnu.se:20080/socket/')
  }

  /**
   * Method which we will use to send chat messages,
   * Getting message via parameter
   * Getting username via localStorage
   * @param {String} text the textcontent (message box)
   * @memberof Chat
   */
  send (text) {
    const msg = {
      type: 'message',
      data: text,
      username: window.localStorage.getItem('userName'),
      key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    }
    this.socket.send(JSON.stringify(msg))
    this.shadowRoot.querySelector('.messageArea').value = ''
  }

  /**
   * Taking value of messages and username,
   * Checking if username is our username, to avoid display unneccessary info,
   * Appending messages to our container
   * @param {String} msg String which we will print
   * @memberof Chat
   */
  print (msg) {
    const text = this.shadowRoot.querySelector('.text').textContent = msg.data
    const author = this.shadowRoot.querySelector('.author').textContent = msg.username
    if (this.username !== window.localStorage.getItem('userName')) {
      const pTextHistory = document.createElement('p')
      const pAuthorHistory = document.createElement('p')
      pTextHistory.innerText = text
      pAuthorHistory.innerText = author + ' said:' + '\n' + pTextHistory.innerText
      this.container.appendChild(pAuthorHistory)
    }
  }

  /**
   * Method which will run if there's no nickname in localStorage
   * @memberof Chat
   */
  changeNickName () {
    if (window.localStorage.getItem('userName') === null) {
      this.shadowRoot.querySelector('.chat').style.visibility = 'hidden'
      this.createInputNick()
      this.setKeyDownNick()
    }
  }

  /**
   * Method which will run if "changeNickName"-method gets exectued
   * Creates some text and a messagebox
   * @memberof Chat
   */
  createInputNick () {
    const nn = document.createElement('div')
    nn.setAttribute('class', 'nnDiv')
    const nickText = document.createElement('p')
    const nickInput = document.createElement('textarea')
    nickInput.placeholder = 'Please input your nickname'
    nickText.innerText = 'Please enter a nickname: '
    nn.setAttribute('class', 'nn')
    nn.appendChild(nickText)
    nn.appendChild(nickInput)
    this.container.appendChild(nn)
    this.setNickname = this.shadowRoot.querySelector('.nn')
  }

  /**
 * Events below
 */

  /**
  * Checker for enter key and will send text to chat
  * Checking of text is empty and display text prompting user to enter text
  * @memberof Chat
  */
  keyDown () {
    this.chat.addEventListener('keydown', (event) => {
      if (event.keyCode === 13 && event.target !== this.nick) {
        if (event.target.value === '') {
          event.preventDefault()
          event.target.placeholder = 'Must write something'
          return
        }
        this.send(event.target.value)
        event.target.value = ''
        event.preventDefault()
      }
    })
  }

  /**
   * Checker for enter key and will set the username
   * Checking if nickname is empty and display text prompting user to enter text
   * @memberof Chat
   */
  keyDownNick () {
    this.nick.addEventListener('keydown', (event) => {
      if (event.keyCode === 13) {
        if (event.target.value === '') {
          event.preventDefault()
          event.target.placeholder = 'You need a name'
          return
        }
        window.localStorage.setItem('userName', event.target.value)
        this.shadowRoot.querySelector('.nickArea').value = ''
        event.preventDefault()
      }
    })
  }

  /**
   * Checker for enter key and will set nickname
   * Is attached to changeNickname-method
   * @memberof Chat
   */
  setKeyDownNick () {
    this.setNickname.addEventListener('keydown', (event) => {
      if (event.keyCode === 13) {
        window.localStorage.setItem('userName', event.target.value)
        event.preventDefault()
        this.shadowRoot.querySelector('.chat').style.visibility = 'visible'
        this.shadowRoot.querySelector('.nn').style.display = 'none'
      }
    })
  }

  /**
   * Checking for messages in the chat, parsing and printing them
   * @memberof Chat
   */
  sendEvent () {
    this.socket.addEventListener('message', (e) => {
      const msg = JSON.parse(e.data)
      if (msg.type === 'message') {
        this.print(msg)
      }
    })
  }
}
window.customElements.define('chat-board', Chat)

export { Chat }
