//skaičiuotuvo klasė

class Calculator {
    // abu div elementus iš output
    constructor(previousOperandTextElement, currentOperandTextElement) {
        //sukuriam kintamuosiuos elementams
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        // iš karto priskiriama clear f-cija, kad skaičiuotuvas turėtų dault reikšmes.
        this.clear()
    }

    // f-cija div elementams iš output ištrinti
    clear() {
        this.currentOperand = 0
        this.previousOperand = 0
        //bet kuriam pasirinktam matematiniam veiksmui priskiria "undifined"
        this.operation = undefined
    }

    //f-cija ištrinti vieną skaičių iš current-operand div elemento
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    //f-cija kuri prideda skaičių prie curent-operand div elemento
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    //f-cija pasirinkti matematinį veiksmą
    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    //f-cija atliekanti matematinį veiksmą
    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    //perkelia suvestą skaičių/matematinį veiksmą iš curent į previous operand div elemantą
    updateDisplay() {
        this.currentOperandTextElement.innerText =
            this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}

//pasiimam visus mygtukus
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
//pasiimam output laukus
const previousOperandTextElement = document.querySelector('[data-previuos-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

// maujas skaičiuotuvas
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

// skaičių mygtukai, kiekvienam iš jų paspaudus div elementą,
//calculator kintamajam vykdoma f-cija appendNumber, kuri prideda paspausta skaičių
//prie curent-operand div content'o. Kadangi f-cija appendNumber reikalauja kintamojo 'number',
//jį gauname iš paspausto 
numberButtons.forEach(div => {
    div.addEventListener('click', () => {
        calculator.appendNumber(div.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(div => {
    div.addEventListener('click', () => {
        calculator.chooseOperation(div.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', div => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', div => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', div => {
    calculator.delete()
    calculator.updateDisplay()
})