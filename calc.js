add = (a, b) =>{
    return a + b;
    }
    
subtract = (a, b) =>{
    return a - b;
    }

divide = (a, b) => {
    if(b == "0"){
        return "Error";
    }else{
        return a / b;  
    }
} 

multiply = (a, b) => {
    return a * b;
} 

operate = (a, b, operand) => {
    let result;
    switch (operand){
        case "add":
          result = add(a,b);
          break;
        case "subtract":
          result = subtract(a,b);
          break
        case "multiply":
          result = multiply(a,b);
          break
        case "divide":
          result = divide(a,b); 
          break
        default:
          console.log(operand);
    }
    //change result to string to check length. if over 9 characters display result in exponential form
    if(result.toString().length > 9){
        return result.toExponential(4);
    }else{
     return result;   
    }
    
}

clearCalc = () => {
    calc.displayValue = "0";
    calc.firstValue = "0";
    calc.secondValue = "0";
    calc.operand = "";
    calc.operandIsSelected = false;
}


updateDisplay = () => {
    const display = document.querySelector(".calc-display");
    display.textContent = calc.displayValue;
}


handleOperatorEvent = (e) => {
  const targetID = e.target.id;
  // if an operator is clicked for the first time in an equation store the disply value as first value and assign operator to calc.
  if(!calc.operandIsSelected){
    calc.operand = targetID;
    calc.firstValue = calc.displayValue;
    calc.displayValue = "0";
    calc.operandIsSelected = true;
  }

  // if the same operator is clicked again the operation repeats using the answer as Value1 and the same Value2;
  else if(calc.operandIsSelected && calc.operand === targetID ){
      calc.secondValue = calc.displayValue;
      const firstValue = Number(calc.firstValue);
      const secondValue = Number(calc.secondValue);
      calc.displayValue = operate(firstValue, secondValue, calc.operand)
      calc.operandIsSelected = false;
  }
  // if a different operator is clicked assign answer to first value, set operand, wait for second input
  else if(calc.operandIsSelected && calc.operand !== targetID){
    calc.firstValue = calc.displayValue;
    calc.operand = targetID;
    calc.displayValue = "0";
  }

 updateDisplay();        
} 

handleNumberEvent = (e) => {
    const numberValue = e.target.innerText;
    //Limit Calculator Inputs to 8 Digits long
    if(calc.displayValue.length < 9){
        //
      if(calc.displayValue === "0"){
        calc.displayValue = numberValue;
      }else if(calc.displayValue !== "0"){
        calc.displayValue += numberValue; 
        }   
    }
    

    updateDisplay();
}

handleFunctionEvent = (e) => {
    const targetID = e.target.id;
    // HANDLE EQUAL
    if(targetID === "equals"){
        // if there is no operand assigned do nothing. 
        if(!calc.operandIsSelected){
            //do nothing
            //else set display value as second value and operate. Send answer to display.
        }else{
            calc.secondValue = calc.displayValue;
            const firstValue = Number(calc.firstValue) 
            const secondValue = Number(calc.secondValue)
            calc.displayValue = operate(firstValue, secondValue, calc.operand);
            calc.operandIsSelected = false;
        }
    } 

    //HANDLE CLEAR
    if(targetID === "clear"){
        calc.clear();
    }

    //HANDLE NEGATE
    if(targetID === "negate"){
        calc.displayValue = (calc.displayValue * -1)
    }

    //HANDLE PERCENTAGE
    if(targetID === "percent"){
        calc.displayValue = (calc.displayValue/100)
    }

    //HANDLE DECIMAL
    // check if display is a string which means it is being edited, if display is type number then it is displaying 
    // an answer and do not want to let the user edit it. 
    if(targetID === "decimal" && typeof(calc.displayValue) === "string"){
        if(calc.displayValue.includes(".")){
            //already has decimal do nothing
        }else{
            //else add a decimal
          calc.displayValue += "."
        }
    }

    updateDisplay();
}
setOperatorEventListeners = () => {
    const buttonContainer = document.querySelector(".button-container");
    return Array.from(buttonContainer.querySelectorAll(".operator")).map(btn => {
        btn.addEventListener("click", e => handleOperatorEvent(e));
        return btn;
    })
}

setNumberEventListeners = () => {
    const buttonContainer = document.querySelector(".button-container");
    return Array.from(buttonContainer.querySelectorAll(".number")).map(btn => {
        btn.addEventListener("click", e => handleNumberEvent(e));
        return btn;
    })
}

setFunctionEventListeners = () => {
    const buttonContainer = document.querySelector(".button-container");
    return Array.from(buttonContainer.querySelectorAll(".function")).map(btn => {
        btn.addEventListener("click", e => handleFunctionEvent(e));
        return btn;
    })
}

setVisualEventListeners = () => {
  const buttonContainer = document.querySelector(".button-container");
  Array.from(buttonContainer.querySelectorAll("button")).map(btn => {
      if(btn.classList.contains("btn--orange")){
        btn.addEventListener("touchstart", () => {
            btn.classList.add("orange-hover")
        })
        btn.addEventListener("mouseenter", () => {
            btn.classList.add("orange-hover")
        })
        btn.addEventListener("touchend", () => {
            btn.classList.remove("orange-hover")
        })
        btn.addEventListener("mouseleave", () => {
            btn.classList.remove("orange-hover")
        })
      }else{
        btn.addEventListener("touchstart", () => {
            btn.classList.add("number-hover")
        })
        btn.addEventListener("mouseenter", () => {
            btn.classList.add("number-hover")
        })
        btn.addEventListener("touchend", () => {
            btn.classList.remove("number-hover")
        })
        btn.addEventListener("mouseleave", () => {
            btn.classList.remove("number-hover")
        })
      }
  })
} 
//Create our Calc object
calc = new Object();
calc = {
    displayValue: "0",
    firstValue: "",
    secondValue: "",
    operand: "",
    operandIsSelected: false,
    clear: clearCalc,
}

updateDisplay();
const operators = setOperatorEventListeners();
const numbers = setNumberEventListeners();
const functions = setFunctionEventListeners();
setVisualEventListeners();


