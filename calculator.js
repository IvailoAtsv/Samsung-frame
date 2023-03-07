class Calculator {
    constructor(previous, current) {
        this.previous = previous
        this.current = current
        this.clear()
    }
    clear() {
        this.current = ''
        this.previous = ''
        this.operation = undefined
    }
    delete() {
        this.current = this.current.toString().slice(0, -1)
    }
    addNum(num) {
        if (num === '.' && this.current.includes('.')) return
        this.current = this.current.toString() + num.toString()
    }
    chooseOperation(operation) {
        if (this.current == '') return
        if (this.previous !== '') {
            this.compute()
        }
        this.operation = operation
        this.previous = this.current
        this.current = ''
    }
    compute() {
        let computation;
        const prev = Number(this.previous)
        const current = Number(this.current)
        if (isNaN(prev) || isNaN(current)) return

        switch (this.operation) {
            case '+':
                computation = prev + current
                break;
            case '-':
                computation = prev - current
                break;
            case '*':
                computation = prev * current
                break;
            case '/':
                computation = prev / current
                break;
            default:
                return
        }
        this.current = computation
        this.operation = undefined
        this.previous = ''
    }
    displayNum(num) {
        const stringNum = num.toString()
        const integerDigits = parseFloat(stringNum.split('.')[0])
        const decimalDigits = stringNum.split('.')[1]
        let integerDisplay;
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
    refreshDisplay() {
        currentElem.innerText = this.displayNum(this.current)
        if (this.operation != null) {
            previousElem.innerText = `${this.displayNum(this.previous)} ${this.operation}`

        } else {
            previousElem.innerText = ''
        }
    }
}

const numberBtns = document.querySelectorAll('.number')
const operationBtns = document.querySelectorAll('.operation')
const equalsBtn = document.querySelector('.equals')
const sumBtn = document.querySelector('.sum')
const subtractBtn = document.querySelector('.subtract')
const deleteBtn = document.querySelector('.delete')
const clearBtn = document.querySelector('.clear')
const decimal = document.querySelector('.decimal')
const previousElem = document.querySelector('.previous-operand')
const currentElem = document.querySelector('.current-operand')

const calculator = new Calculator(previousElem, currentElem)
Array.from(numberBtns).forEach(btn => {
    btn.addEventListener('click', () => {

        calculator.addNum(btn.innerText)
        calculator.refreshDisplay()
    })
})
operationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.chooseOperation(btn.textContent)
        calculator.refreshDisplay()
    })
})

equalsBtn.addEventListener('click', () => {
    calculator.compute()
    calculator.refreshDisplay()
})

clearBtn.addEventListener('click', () => {
    calculator.clear()
    calculator.refreshDisplay()
})

deleteBtn.addEventListener('click', () => {
    calculator.delete()
    calculator.refreshDisplay()
})

// const hide = document.querySelector('#hide')
// const line = document.getElementById('line')
// line.addEventListener('click', () => {
// hide.style.display = 'none'
// })