const digits = document.getElementsByClassName('digit')
const operators = document.getElementsByClassName('operation')
const result = document.getElementById('calc-result')
const clearBtn = document.getElementById('C')
const deleteBtn = document.getElementById('delete')
const equalBtn = document.getElementById('equal')
const pointBtn = document.getElementById('point')
const currSign = document.getElementById('current-sign')

// helper variables
let multiSignPressIndicator = 0
let total = 0
let firstValue;
let sign;
let secondValue;

/* -----------------------------------------------------------------------------------------------------*/
// helper functions
const reset = (rmTotal = false) => {
    if (rmTotal) {
        total = 0
    }
    currSign.innerText = ''
    multiSignPressIndicator = 0
    secondValue = 0
    firstValue = 0
}
/* -----------------------------------------------------------------------------------------------------*/
const removingTechnique = (element, domElement = false) => {
    let newElement;
    if (domElement) {
        newElement = Array.from(element.innerText).splice(0, element.innerText.length - 1).join('')
    } else {
        let elementArr = Array.from((element).toString())
        newElement = elementArr.splice(0, elementArr.length - 1).join('')
    }
    return newElement
}
/* -----------------------------------------------------------------------------------------------------*/

const removeElementFromResult = () => {
    result.innerText = removingTechnique(result, true)
}
/* -----------------------------------------------------------------------------------------------------*/

const checkFirstValue = () => {
    if (firstValue && !currSign.innerText.length) {
        firstValue = removingTechnique(firstValue)
        return true
    } else {
        return false
    }
}
/* -----------------------------------------------------------------------------------------------------*/

const checkSign = () => {
    if (currSign.innerText.length && !secondValue) {
        currSign.innerText = ''
        sign = ''
        multiSignPressIndicator--
        return true
    } else {
        return false
    }
}
/* -----------------------------------------------------------------------------------------------------*/

const checkSecondValue = () => {
    if (secondValue && currSign.innerText.length) {
        secondValue = removingTechnique(secondValue)
        return true
    } else {
        return false
    }
}
/* -----------------------------------------------------------------------------------------------------*/

const checkTotal = () => {
    if (total && !secondValue && !currSign.innerText.length) {
        removeElementFromResult()
        total = result.innerText
        return true
    } else {
        return false
    }
}
/* -----------------------------------------------------------------------------------------------------*/

const appendOrAdd = (element, e, append = false) => {
    if (append) {
        return element.innerText += e.target.innerText
    } else {
        return element.innerText = e.target.innerText
    }
}
/* -----------------------------------------------------------------------------------------------------*/

const checkTotalToAppendToTotal = (e) => {
    if (total && !secondValue && !currSign.innerText.length ) {
        total.toString()
        total += e.target.innerText
        appendOrAdd(result, e, true)
        return true
    } else {
        return false
    }
}
/* -----------------------------------------------------------------------------------------------------*/

const checkSignToAddFirstValue = (e) => {
    if (
        (!currSign.innerText.length && !firstValue) ||
        result.innerText === 'Syntax Error'
    ) {
        appendOrAdd(result, e)
        firstValue = e.target.innerText
        return true
    }

    if (!currSign.innerText.length && firstValue) {
        appendOrAdd(result, e, true)
        firstValue += e.target.innerText
        return true
    } else {
        return false
    }
}
/* -----------------------------------------------------------------------------------------------------*/

const checkSignToAddSecondValue = (e) => {
    if ((currSign.innerText.length && !secondValue && result.innerText !== '.')) {
        appendOrAdd(result, e)
        secondValue = e.target.innerText
        return true
    }

    if (
        (currSign.innerText.length && secondValue) ||
        (currSign.innerText.length && !secondValue) ||
        (total && !currSign.innerText.length)
    ) {
        appendOrAdd(result, e, true)
        secondValue += e.target.innerText
        return true
    } else {
        return false
    }
}
/* -----------------------------------------------------------------------------------------------------*/
//                                        END OF HELPER FUNCTIONS
/* -----------------------------------------------------------------------------------------------------*/

clearBtn.addEventListener('click', (e) => {
    reset(true)
    result.innerText = '0'
})
/* -----------------------------------------------------------------------------------------------------*/

deleteBtn.addEventListener('click', (e) => {
    try {
        if (!checkSign() && result.innerText !== 'Syntax Error') {
            if (checkTotal()) {
                return
            } else {
                checkFirstValue()
                checkSecondValue()
                removeElementFromResult()
            }
        } else {
            checkSign()
        }

        if (!result.innerText.length && !secondValue && !firstValue && !total) {
            reset(true)
            result.innerText = '0'
        }
    }catch (e) {
        console.log(`${e.name}:`, e.message);
    }

})
/* -----------------------------------------------------------------------------------------------------*/

pointBtn.addEventListener('click', (e) => {
    let resultInterface = result.innerText
    if (
        result.innerText !== 'Syntax Error' &&
        !resultInterface.match(/[.]/) &&
        (total).toString().length > 0
    ) {
        if (!secondValue && currSign.innerText.length) {
            secondValue = e.target.innerText
        } else if (currSign.innerText.length) {
            secondValue += e.target.innerText
        } else if (total) {
            total += e.target.innerText
        } else {
            firstValue += e.target.innerText
        }
        result.innerText += e.target.innerText
    }
})
/* -----------------------------------------------------------------------------------------------------*/

const addNumbers = () => {
    for (let i = 0; i < digits.length; i++) {
        digits[i].addEventListener('click', (e) => {
            if (checkTotalToAppendToTotal(e)) {
                return
            } else if (checkSignToAddFirstValue(e)) {
                return
            } else if (checkSignToAddSecondValue(e)) {
                return
            }
        })
    }
}

addNumbers()
/* -----------------------------------------------------------------------------------------------------*/

const chooseSign = () => {
    for (let i = 0; i < operators.length; i++) {
        operators[i].addEventListener('click', (e) => {
            if (result.innerText !== 'Syntax Error') {
                currSign.innerText = e.target.innerText
                sign = e.target.innerText
                multiSignPressIndicator++
            }
        })
    }
}

chooseSign()
/* -----------------------------------------------------------------------------------------------------*/

const calculateTotal = () => {
    equalBtn.addEventListener('click', (e) => {
        if (multiSignPressIndicator > 1) {
            reset(true)
            result.innerText = 'Syntax Error'
        } else {
            total = Number(total)
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
            reset()
            result.innerText = total
        }
    })
}

calculateTotal()
/* -----------------------------------------------------------------------------------------------------*/
