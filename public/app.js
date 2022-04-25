const digits = document.getElementsByClassName('digit')
const operators = document.getElementsByClassName('operation')
const result = document.getElementById('calc-result')
const clearBtn = document.getElementById('C')
const deleteBtn = document.getElementById('delete')
const equalBtn = document.getElementById('equal')
const pointBtn = document.getElementById('point')
const currSign = document.getElementById('current-sign')

let signIndicator = 0
let total = 0
let firstValue;
let sign;
let secondValue;



const clear = () => {
    result.innerText = '0'
    currSign.innerText = ''
    signIndicator = 0
    secondValue = 0
    firstValue = 0
    total = 0
}


clearBtn.addEventListener('click', (e) => {
    clear()
})

deleteBtn.addEventListener('click', (e) => {
    try {
        if (signIndicator && !secondValue) {
            sign = [...sign].splice(1,1).join('')
            signIndicator = 0
            currSign.innerText = ''
            console.log('current sign: ', sign);
        } else {
            if (signIndicator) {
                secondValue = [...secondValue].splice(0, secondValue.length - 1).join('')
                console.log(secondValue);
            } else {
                firstValue = [...firstValue].splice(0, firstValue.length - 1).join('')
                console.log(firstValue);
            }
            let resultToArray = [...result.innerHTML]
            let resultWithDeletedElement = resultToArray.splice(0, resultToArray.length - 1)
            result.innerText = resultWithDeletedElement.join('')
        }

        if (!result.innerText.length) {
            result.innerText = '0'
        }
    }catch (e) {
        console.log(`${e.name}:`, e.message);
    }

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
            if (result.innerText !== '0' && result.innerText !== 'Syntax Error' && signIndicator === 0) {
                result.innerText += e.target.innerText
            }
            if (signIndicator === 1 && !secondValue) {
                result.innerText = e.target.innerText
            }
            if (secondValue && signIndicator === 1) {
                result.innerText += e.target.innerText
            }
            if (result.innerText === '0' || result.innerText === 'Syntax Error' || (total && signIndicator === 0)) {
                result.innerText = e.target.innerText
            }

            if (signIndicator === 0 && !firstValue) {
                firstValue = e.target.innerText
                console.log('numbers taped: ', firstValue);
            } else if (signIndicator === 0 && firstValue) {
                firstValue += e.target.innerText
                console.log('numbers taped: ', firstValue);
            } else if (signIndicator === 1 && !secondValue) {
                secondValue = e.target.innerText
                console.log('number taped after sign: ', secondValue);
            } else {
                secondValue += e.target.innerText
                console.log('number taped after sign: ', secondValue);
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
            currSign.innerText = e.target.innerText
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
            result.innerText = 'Syntax Error'
        } else {
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
            result.innerText = total
        }
        signIndicator = 0
        secondValue = 0
        firstValue = 0
        currSign.innerText = ''
        console.log('total: ', total);
    })
}

calculateTotal()