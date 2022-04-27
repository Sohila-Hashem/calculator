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


// helper functions
const reset = (rmTotal = false) => {
    if (rmTotal) {
        total = 0
    }
    currSign.innerText = ''
    multiSignPressIndicator = 0
    secondValue = 0
    firstValue = 0
    console.log('reset');
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
        console.log('current first Value:', firstValue);
        return true
    } else {
        console.log('not a first value case');
        return false
    }
}
/* -----------------------------------------------------------------------------------------------------*/

const checkSign = () => {
    if (currSign.innerText.length && !secondValue) {
        currSign.innerText = ''
        sign = ''
        multiSignPressIndicator--
        console.log('current sign: ', sign);
        return true
    } else {
        console.log('not a sign case');
        return false
    }
}
/* -----------------------------------------------------------------------------------------------------*/

const checkSecondValue = () => {
    if (secondValue && currSign.innerText.length) {
        secondValue = removingTechnique(secondValue)
        console.log('current second Value:', secondValue);
        return true
    } else {
        console.log('not a second value case');
        return false
    }
}
/* -----------------------------------------------------------------------------------------------------*/

const checkTotal = () => {
    if (total && !secondValue && !currSign.innerText.length) {
        removeElementFromResult()
        total = result.innerText
        console.log('current total:', total);
        return true
    } else {
        console.log('not a total case');
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
        console.log('not a total digit case');
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
        console.log('first',1);
        return true
    }

    if (!currSign.innerText.length && firstValue) {
        appendOrAdd(result, e, true)
        firstValue += e.target.innerText
        console.log('first',2);
        return true
    } else {
        console.log('not a first value digit case');
        return false
    }
}
/* -----------------------------------------------------------------------------------------------------*/

const checkSignToAddSecondValue = (e) => {
    if ((currSign.innerText.length && !secondValue && result.innerText !== '.')) {
        appendOrAdd(result, e)
        console.log('second',1);
        secondValue = e.target.innerText
        return true
    }

    if (
        (currSign.innerText.length && secondValue) ||
        (currSign.innerText.length && !secondValue) ||
        (total && !currSign.innerText.length)
    ) {
        appendOrAdd(result, e, true)
        console.log('second',2);
        secondValue += e.target.innerText
        return true
    } else {
        console.log('not a second value digit case');
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
            console.log('second value:',secondValue);
        } else if (currSign.innerText.length) {
            secondValue += e.target.innerText
            console.log('second value:',secondValue);
        } else if (total) {
            total += e.target.innerText
        } else {
            firstValue += e.target.innerText
            console.log('first value:',secondValue);
        }
        result.innerText += e.target.innerText
    }
})
/* -----------------------------------------------------------------------------------------------------*/

const addNumbers = () => {
    for (let i = 0; i < digits.length; i++) {
        digits[i].addEventListener('click', (e) => {
            if (checkTotalToAppendToTotal(e)) {
                console.log('total:', total);
            } else if (checkSignToAddFirstValue(e)) {
                console.log('first value:', firstValue);
            } else if (checkSignToAddSecondValue(e)) {
                console.log('second value:', secondValue);
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
                console.log('sign: ', sign);
                console.log('multi sign press indicator: ', multiSignPressIndicator);
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
                    secondValue ? total += Number(secondValue) :  result.innerText = 'Syntax Error'
                } else {
                    firstValue && secondValue ? total = Number(firstValue) + Number(secondValue) : result.innerText = 'Syntax Error'
                }
            }

            if (sign === '-') {
                if (total) {
                    secondValue ? total -= Number(secondValue) : result.innerText = 'Syntax Error'
                } else {
                    firstValue && secondValue ? total = Number(firstValue) - Number(secondValue) : result.innerText = 'Syntax Error'
                }
            }

            if (sign === '/') {
                if (total) {
                    secondValue ? total /= Number(secondValue) : result.innerText = 'Syntax Error'
                } else {
                    firstValue && secondValue ? total = Number(firstValue) / Number(secondValue) : result.innerText = 'Syntax Error'
                }
            }

            if (sign === '*') {
                if (total) {
                    secondValue ? total *= Number(secondValue) : result.innerText = 'Syntax Error'
                } else {
                    firstValue && secondValue ? total = Number(firstValue) * Number(secondValue) : result.innerText = 'Syntax Error'
                }
            }

            if (sign === '%') {
                if (total) {
                    secondValue ? total %= Number(secondValue) : result.innerText = 'Syntax Error'
                } else {
                    firstValue && secondValue ? total = Number(firstValue) % Number (secondValue) : result.innerText = 'Syntax Error'
                }
            }
            reset()
            result.innerText = total
            console.log('total: ', total);
        }
    })
}

calculateTotal()
/* -----------------------------------------------------------------------------------------------------*/
