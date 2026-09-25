// ================================
// AGE CALCULATOR
// ================================

const ageCalculatorBtn =
    document.getElementById("ageCalculatorBtn");

const scientificCalculatorBtn =
    document.getElementById("scientificCalculatorBtn");

const fromDate =
    document.getElementById("fromDate");

const toDate =
    document.getElementById("toDate");

const fromCalendar =
    document.getElementById("fromCalendar");

const toCalendar =
    document.getElementById("toCalendar");

const fromCalendarBtn =
    document.getElementById("fromCalendarBtn");

const toCalendarBtn =
    document.getElementById("toCalendarBtn");

const calculateAgeBtn =
    document.getElementById("calculateAgeBtn");

const ageNumber =
    document.getElementById("ageNumber");

const ageDetails =
    document.getElementById("ageDetails");


// ================================
// NAVIGATION
// ================================

ageCalculatorBtn.addEventListener("click", () => {

    document.getElementById("ageCalculator")
        .scrollIntoView({
            behavior: "smooth"
        });

});


scientificCalculatorBtn.addEventListener("click", () => {

    document.getElementById("scientificCalculator")
        .scrollIntoView({
            behavior: "smooth"
        });

});


// ================================
// YEAR INPUT
// ================================

fromDate.addEventListener("input", () => {

    fromDate.value =
        fromDate.value
            .replace(/\D/g, "")
            .slice(0, 4);

});


toDate.addEventListener("input", () => {

    toDate.value =
        toDate.value
            .replace(/\D/g, "")
            .slice(0, 4);

});


// ================================
// OPEN CALENDAR
// ================================

fromCalendarBtn.addEventListener("click", () => {

    try {

        if (fromCalendar.showPicker) {

            fromCalendar.showPicker();

        } else {

            fromCalendar.click();

        }

    } catch (error) {

        fromCalendar.click();

    }

});


toCalendarBtn.addEventListener("click", () => {

    try {

        if (toCalendar.showPicker) {

            toCalendar.showPicker();

        } else {

            toCalendar.click();

        }

    } catch (error) {

        toCalendar.click();

    }

});


// ================================
// FROM CALENDAR
// ================================

fromCalendar.addEventListener("change", () => {

    if (fromCalendar.value) {

        const year =
            fromCalendar.value.substring(0, 4);

        fromDate.value = year;

    }

});


// ================================
// TO CALENDAR
// ================================

toCalendar.addEventListener("change", () => {

    if (toCalendar.value) {

        const year =
            toCalendar.value.substring(0, 4);

        toDate.value = year;

    }

});


// ================================
// CALCULATE AGE
// ================================

calculateAgeBtn.addEventListener("click", () => {

    const fromYear =
        fromDate.value.trim();

    const toYear =
        toDate.value.trim();


    if (!fromYear || !toYear) {

        ageNumber.innerHTML =
            `0 <span>Years</span>`;

        ageDetails.textContent =
            "Please enter both From and To years.";

        return;

    }


    if (
        !/^\d{4}$/.test(fromYear) ||
        !/^\d{4}$/.test(toYear)
    ) {

        ageNumber.innerHTML =
            `0 <span>Years</span>`;

        ageDetails.textContent =
            "Please enter a valid 4-digit year.";

        return;

    }


    const startYear =
        Number(fromYear);

    const endYear =
        Number(toYear);


    if (startYear > endYear) {

        ageNumber.innerHTML =
            `0 <span>Years</span>`;

        ageDetails.textContent =
            "The From year cannot be later than the To year.";

        return;

    }


    const age =
        endYear - startYear;


    ageNumber.innerHTML =
        `${age} <span>${age === 1 ? "Year" : "Years"}</span>`;

    ageDetails.textContent =
        `${age} ${age === 1 ? "Year" : "Years"} difference`;

});


// ================================
// SCIENTIFIC CALCULATOR
// ================================

const calculatorQuestion =
    document.getElementById("calculatorQuestion");

const calculatorAnswer =
    document.getElementById("calculatorAnswer");

const calculatorButtons =
    document.querySelectorAll(".calculator-buttons button");


let calculatorValue = "0";


// ================================
// UPDATE QUESTION
// ================================

function updateCalculatorQuestion() {

    calculatorQuestion.textContent =
        calculatorValue;

}


// ================================
// CLEAR ANSWER
// ================================

function clearCalculatorAnswer() {

    calculatorAnswer.textContent = "";

}


// ================================
// CALCULATOR BUTTONS
// ================================

calculatorButtons.forEach(button => {

    button.addEventListener("click", () => {

        const value =
            button.textContent.trim();


        // AC

        if (value === "AC") {

            calculatorValue = "0";

            clearCalculatorAnswer();

            updateCalculatorQuestion();

            return;

        }


        // DELETE

        if (value === "DEL") {

            if (calculatorValue.length > 1) {

                calculatorValue =
                    calculatorValue.slice(0, -1);

            } else {

                calculatorValue = "0";

            }

            clearCalculatorAnswer();

            updateCalculatorQuestion();

            return;

        }


        // EQUALS

        if (value === "=") {

            calculateResult();

            return;

        }


        // DECIMAL

        if (value === ".") {

            const currentNumber =
                calculatorValue
                    .split(/[\+\−×÷]/)
                    .pop();

            if (!currentNumber.includes(".")) {

                calculatorValue += ".";

            }

            clearCalculatorAnswer();

            updateCalculatorQuestion();

            return;

        }


        // OPERATORS

        if (
            value === "+" ||
            value === "−" ||
            value === "×" ||
            value === "÷"
        ) {

            const lastCharacter =
                calculatorValue.slice(-1);


            if (
                lastCharacter === "+" ||
                lastCharacter === "−" ||
                lastCharacter === "×" ||
                lastCharacter === "÷"
            ) {

                calculatorValue =
                    calculatorValue.slice(0, -1);

            }


            calculatorValue += value;

            clearCalculatorAnswer();

            updateCalculatorQuestion();

            return;

        }


        // NUMBERS

        if (/^\d$/.test(value)) {

            if (
                calculatorValue === "0" ||
                calculatorValue === "Error"
            ) {

                calculatorValue = value;

            } else {

                calculatorValue += value;

            }

            clearCalculatorAnswer();

            updateCalculatorQuestion();

        }

    });

});


// ================================
// CALCULATE RESULT
// ================================

function calculateResult() {

    try {

        let expression =
            calculatorValue
                .replace(/×/g, "*")
                .replace(/÷/g, "/")
                .replace(/−/g, "-");


        if (
            /[\+\-\*\/]$/.test(expression)
        ) {

            expression =
                expression.slice(0, -1);

        }


        const result =
            Function(
                `"use strict"; return (${expression})`
            )();


        if (!Number.isFinite(result)) {

            calculatorAnswer.textContent =
                "Error";

            return;

        }


        const formattedResult =
            Number(
                result.toFixed(10)
            );


        calculatorQuestion.textContent =
            calculatorValue;


        calculatorAnswer.textContent =
            formattedResult;


    } catch (error) {

        calculatorAnswer.textContent =
            "Error";

    }

}