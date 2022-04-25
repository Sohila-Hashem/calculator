const digits = document.getElementsByClassName('digit')
const operators = document.getElementsByClassName('operation')
const result = document.getElementById('calc-result')
const clearBtn = document.getElementById('C')
const deleteBtn = document.getElementById('delete')
const equalBtn = document.getElementById('equal')
const pointBtn = document.getElementById('point')

let signIndicator = 0
let total = 0
let firstValue;
let sign;
let secondValue;



const clear = () => {
    result.innerText = ''
    signIndicator = 0
    secondValue = 0
    firstValue = 0
    total = 0
}


clearBtn.addEventListener('click', (e) => {
    clear()
})


pointBtn.addEventListener('click', (e) => {
    let resultInterface = result.innerText
    if (!resultInterface.match(/[.]/)) {
        result.innerText += e.target.innerText
        if (signIndicator) {
            secondValue += e.target.innerText
        } else {
            firstValue += e.target.innerText
        }
    }
})

const addNumbers = () => {
    for (let i = 0; i < digits.length; i++) {
        digits[i].addEventListener('click', (e) => {
            if (result.innerText !== '0' && signIndicator === 0) {
                result.innerText += e.target.innerText
                console.log(1);
            }
            if (signIndicator === 1 && !secondValue) {
                result.innerText = e.target.innerText
                console.log(2);
            }
            if (secondValue && signIndicator === 1) {
                result.innerText += e.target.innerText
                console.log(3);
            }
            if (result.innerText === '0') {
                result.innerText = e.target.innerText
                console.log(4);
            }

            if (signIndicator === 0 && !firstValue) {
                firstValue = e.target.innerText
                console.log('numbers taped: ', firstValue);
                console.log(5);
            } else if (signIndicator === 0 && firstValue) {
                firstValue += e.target.innerText
                console.log('numbers taped: ', firstValue);
                console.log(6);
            } else if (signIndicator === 1 && !secondValue) {
                secondValue = e.target.innerText
                console.log('number taped after sign: ', secondValue);
                console.log(7);
            } else {
                secondValue += e.target.innerText
                console.log('number taped after sign: ', secondValue);
                console.log(8);
            }
        })
    }
}

addNumbers()

const chooseSign = () => {
    for (let i = 0; i < operators.length; i++) {
        operators[i].addEventListener('click', (e) => {
            sign = e.target.innerText
            signIndicator++
            console.log('sign: ', sign);
            console.log('sign indicator: ', signIndicator);
        })
    }
}

chooseSign()

const calculateTotal = () => {
    equalBtn.addEventListener('click', (e) => {
        if (signIndicator > 1) {
            clear()
        }

        if (sign === '+') {
            if (total) {
                total += Number(secondValue)
            } else {
                total = Number(firstValue) + Number(secondValue)
            }
        }

        if (sign === '-') {
            if (total) {
                total -= Number(secondValue)
            } else {
                total = Number(firstValue) - Number(secondValue)
            }
        }

        if (sign === '/') {
            if (total) {
                total /= Number(secondValue)
            } else {
                total = Number(firstValue) / Number(secondValue)
            }
        }

        if (sign === '*') {
            if (total) {
                total *= Number(secondValue)
            } else {
                total = Number(firstValue) * Number(secondValue)
            }
        }

        if (sign === '%') {
            if (total) {
                total %= Number(secondValue)
            } else {
                total = Number(firstValue) % Number (secondValue)
            }
        }
        signIndicator = 0
        secondValue = 0
        firstValue = 0
        result.innerText = total
        console.log(total);
    })
}

calculateTotal()