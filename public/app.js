const digits = document.getElementsByClassName('digit')
const operators = document.getElementsByClassName('operation')
const result = document.getElementById('calc-result')
const clearBtn = document.getElementById('C')
const deleteBtn = document.getElementById('delete')
const equalBtn = document.getElementById('equal')
const pointBtn = document.getElementById('point')
const currSign = document.getElementById('current-sign')
const negativeSign = document.getElementById('negative')

// helper variables
let total;
let sign;
let firstValue = 0;
let secondValue = 0;
let finalExpression = []
let multiSignPressIndicator = 0

// helper functions
/* -----------------------------------------------------------------------------------------------------*/

const displayErrorMessage = () => {
    result.innerText = 'Syntax Error'
}
/* -----------------------------------------------------------------------------------------------------*/

const appendOrSet = (element, e, append = false) => {
    if (append) {
        element.innerText += e.target.innerText
    } else {
        element.innerText = e.target.innerText
    }
}
/* -----------------------------------------------------------------------------------------------------*/

const reset = (rmTotal = false) => {
    if (rmTotal) {
        total = 0
    }
    secondValue = 0
    currSign.innerText = ''
    sign = ''
    firstValue = 0
}
/* -----------------------------------------------------------------------------------------------------*/

const checkPointCases = (e) => {
    if (!secondValue && sign) {
        secondValue += e.target.innerText
    } else if (sign) {
        secondValue += e.target.innerText
    } else if (!total || total === 0) {
        firstValue += e.target.innerText
    } else {
        return false
    }
    return true
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

const removeFromResult = () => {
    result.innerText = removingTechnique(result, true)
}
/* -----------------------------------------------------------------------------------------------------*/

const checkFirstValue = () => {
    if (firstValue && !sign) {
        firstValue = removingTechnique(firstValue)
        return true
    } else {
        return false
    }
}
/* -----------------------------------------------------------------------------------------------------*/

const checkSign = () => {
    if (sign && !secondValue) {
        currSign.innerText = ''
        multiSignPressIndicator--
        return true
    } else {
        return false
    }
}
/* -----------------------------------------------------------------------------------------------------*/

const checkSecondValue = () => {
    if (secondValue && sign) {
        secondValue = removingTechnique(secondValue)
        return true
    } else {
        return false
    }
}
/* -----------------------------------------------------------------------------------------------------*/

const checkIfTotalToReset = () => {
    if (total && !sign && !secondValue) {
        result.innerText = '0'
        return true
    } else {
        return false
    }
}
/* -----------------------------------------------------------------------------------------------------*/

const checkIfEverythingIsEmpty = () => {
    if (!result.innerText.length && !secondValue && !firstValue  && !total && !sign) {
        result.innerText = '0'
        reset(true)
    }
}
/* -----------------------------------------------------------------------------------------------------*/

const checkSignToAddFirstValue = (e) => {
    if (
        (
            !firstValue ||
            result.innerText === 'Syntax Error' ||
            result.innerText === total ||
            firstValue === '0'
        ) && !sign
    ) {
        appendOrSet(result, e)
        firstValue = e.target.innerText
        return true
    }

    if (firstValue && !secondValue && !sign) {
        appendOrSet(result, e, true)
        firstValue += e.target.innerText
        return true
    } else {
        return false
    }
}
/* -----------------------------------------------------------------------------------------------------*/

const checkSignToAddSecondValue = (e) => {
    if ((sign && !secondValue && result.innerText !== '.')) {
        appendOrSet(result, e)
        secondValue = e.target.innerText
        finalExpression[1] = Number(secondValue) || 0
        return true
    }

    if (secondValue) {
        appendOrSet(result, e, true)
        secondValue += e.target.innerText
        finalExpression[1] = Number(secondValue) || 0
        return true
    } else {
        return false
    }
}
/* -----------------------------------------------------------------------------------------------------*/

const addNegativeSign = (e) => {
    if (!sign && !secondValue && !firstValue&& firstValue[0] !== '-') {
        firstValue = '-'
    } else if ((firstValue && sign) || (total && sign)) {
        secondValue = '-'
    } else {
        return false
    }
    result.innerText = '-'
    return true
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
    if (!checkSign() && result.innerText !== 'Syntax Error' && !total) {
        checkFirstValue()
        checkSecondValue()
        removeFromResult()
    } else if (checkIfTotalToReset()) {
        reset(true)
    } else if (checkSign()) {
        sign = ''
        return
    }
    checkIfEverythingIsEmpty()
})
/* -----------------------------------------------------------------------------------------------------*/

pointBtn.addEventListener('click', (e) => {
    let resultInterface = result.innerText
    if (
        resultInterface !== 'Syntax Error' &&
        resultInterface !== total &&
        !resultInterface.match(/[.]/)
    ) {
        if(checkPointCases(e)) appendOrSet(result, e, true)
    }
})
/* -----------------------------------------------------------------------------------------------------*/

negativeSign.addEventListener('click', (e) => {
    addNegativeSign()
})
/* -----------------------------------------------------------------------------------------------------*/

const addNumbers = () => {
    for (let i = 0; i < digits.length; i++) {
        digits[i].addEventListener('click', (e) => {
            if (checkSignToAddFirstValue(e)) {
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
                finalExpression[0] = sign || false
            }
        })
    }
}

chooseSign()
/* -----------------------------------------------------------------------------------------------------*/

const calcBasedOnSign = () => {
    secondValue = Number(secondValue)
    firstValue = Number(firstValue)
    if ((total || total === 0) && !firstValue) {
        switch (finalExpression[0]) {
            case '+':
                total += (secondValue || finalExpression[1])
                break
            case '-':
                total -= (secondValue || finalExpression[1])
                break
            case '*':
                total *= (secondValue || finalExpression[1])
                break
            case '/':
                total /= (secondValue || finalExpression[1])
                break
        }
    } else {
        switch (sign) {
            case '+':
                total = (firstValue || displayErrorMessage()) + (secondValue || displayErrorMessage())
                break
            case '-':
                total = (firstValue || displayErrorMessage()) - (secondValue || displayErrorMessage())
                break
            case '*':
                total = (firstValue || displayErrorMessage()) * (secondValue || displayErrorMessage())
                break
            case '/':
                total = (firstValue || displayErrorMessage()) / (secondValue || displayErrorMessage())
                break
        }
    }
}

const calculateTotal = () => {
    equalBtn.addEventListener('click', (e) => {
        if (finalExpression.length) {
            calcBasedOnSign()
            result.innerText !== 'Syntax Error'? result.innerText = total : true
        } else {
            result.innerText = '0'
        }
        reset()
    })
}

calculateTotal()
/* -----------------------------------------------------------------------------------------------------*/