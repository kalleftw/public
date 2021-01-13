const template = document.createElement('template')
template.innerHTML = `
<h1 class="tops"><img src = '/././image/calc.jpg' alt="Calc icon"/></h1>

<div id="container">
  <div id="calculator">


    <form>
      <p>How much was your bill?
        <p>
          $ <input id="billamt" type="text" placeholder="Bill Amount">

          <p>How was your service?
            <p>
              <select id="serviceQual">
            <option disabled selected value="0">-- Choose an Option --</option>
            <option value="0.3">30&#37; &#45; Outstanding</option>
            <option value="0.2">20&#37; &#45; Good</option>
            <option value="0.15">15&#37; &#45; It was OK</option>
            <option value="0.1">10&#37; &#45; Bad</option>
            <option value="0.05">5&#37; &#45; Terrible</option>
        </select>

    </form>
    <p>How many people are sharing the bill?</p>
    <input id="peopleamt" type="text" placeholder="Number of People"> people
    <button type="button" id="calculate">Calculate!</button>

  </div>
  <!--calculator end-->
  <div id="totalTip">
    <sup>$</sup><span id="tip">0.00</span>
    <small id="each">each</small>
  </div>
  <!--totalTip end-->

</div>
<!--container end-->


<style>


   #container {
  height: 525px;
  width: 400px;
  margin: auto;
 -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  overflow: auto;
  position: absolute;
  
}

p {
  padding-left: 20px;
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
.tops {
    
    width: 30px;
  }

form input[type="text"] {
  width=90px;
}

input {
  padding-left: 20px;
}

#billamt {
  font-size: 14px;
  color: #2980b9;
  color: #red;
  background-color: #f7f7f7;
  width: 60%;
  padding: 5px 5px 8px 8px;
}

#billamt:focus {
  background: #fff;
  border: 3px solid #2980b9;
  outline: none;
}

#peopleamt {
  width: 60%;
  padding: 5px 5px 8px 8px;
  margin-left: 20px;
  color: #red;
  background-color: #f7f7f7;
  font-size: 14px;
}

.dollarSign {
  display: inline;
}

#serviceQual {
  padding: 13px 13px 20px 20px;
  
  font-size: 25px;
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


button:hover {
  background: #4c2827;
  border-bottom-color: #111;
}

button:active {
  position: relative;
  top: 1px;
}

#totalTip {
  font-size: 30px;
  margin-top: 5px;
  text-align: center;
}

#totalTip:before {
  content: "Tip amount";
  font-size: 20px;
  font-weight: bold;
  display: block;
  text-transform: uppercase;
}

#totalTip sup {
  font-size: 20px;
  top: -18px;
}

#totalTip small {
  font-size: 20px;
  font-weight: bold;
  display: block;
}

h1 img {
  height: 30px;
  float: left;
  margin-left: -95px;
  margin-top: 40px;
}

    </style>
`

/**
 * Calculate tip application
 */
class Tips extends window.HTMLElement {
  constructor () {
    /**
     * Opening shadow DOM
     */
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }

  /**
   * Method which will execute when DOM is rendered
   * Hiding some display-tip stuff in the window before calculation
   * Listening for button click
   * @memberof Tips
   */
  connectedCallback () {
    this.shadowRoot.querySelector('#totalTip').style.display = 'none'
    this.shadowRoot.querySelector('#each').style.display = 'none'

    this.shadowRoot.querySelector('#calculate').addEventListener('click', (e) => {
      this.calculateTip()
    })
  }

  /**
   * Method used to calculate tip,
   * Checking value of: cost-input
   * Checking value of: service quality-input
   * Checking value of: number of people-input
   * @memberof Tips
   */
  calculateTip () {
    const billAmt = this.shadowRoot.querySelector('#billamt').value
    const serviceQual = this.shadowRoot.querySelector('#serviceQual').value
    let numOfPeople = this.shadowRoot.querySelector('#peopleamt').value

    /**
     * Validation, returning nothing if nothing is inserted
     * @memberof Tips
     */
    if (billAmt === '' || serviceQual === 0) {
      return
    }
    // Check to see if this input is empty or less than or equal to 1
    if (numOfPeople === '' || numOfPeople <= 1) {
      numOfPeople = 1
      this.shadowRoot.querySelector('#each').style.display = 'none'
    } else {
      this.shadowRoot.querySelector('#each').style.display = 'block'
    }

    /**
     * Maths
     * Doing the calculation, rouding it and displaying with 2 decimals
     * @memberof Tip
     */
    var total = (billAmt * serviceQual) / numOfPeople

    total = Math.round(total * 100) / 100

    total = total.toFixed(2)

    this.shadowRoot.querySelector('#totalTip').style.display = 'block'
    this.shadowRoot.querySelector('#tip').innerHTML = total
  }
}

window.customElements.define('tip-board', Tips)

export { Tips }
