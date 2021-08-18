const display = document.querySelector(".calc-display");
const buttons = document.querySelectorAll(".btn");
let a = "0";
let b = "";
let operand = "";
let answer = "";
display.innerText = "0";

//operation functions
add = (a, b) =>{
return a + b;
}

subtract = (a, b) =>{
    return a - b;
    }

divide = (a, b) => {
    if(b == "0"){
        return "Error"
    }else{
        return a / b;  
    }
} 

multiply = (a, b) => {
    return a * b;
} 

clear = () => {
    a = "0";
    b = "";
    operand = "";
    answer = "";
    display.innerText = "0"
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
        if(isNaN(result)){
            return "Error"
        }else{
            return parseFloat(result).toFixed(2);
        }
} 



btnArr = Array.from(buttons);

//seperate buttons into arrays
numberBtns = btnArr.filter(btn => !isNaN(btn.innerText));
functionBtns = btnArr.filter(btn => isNaN(btn.innerText));

//add event listeners to function buttons
functionBtns.map((btn) => {
    btn.addEventListener("click", () => {
      if(btn.id == "equals" && a !== "" && b !== "" && operand !== ""){
          a = parseInt(a);
          b = parseInt(b);
          display.innerText = operate(a, b, operand);
          answer = operate(a, b, operand);
          a = answer;
          b = "";
          operand = "";
      }else if(btn.id === "clear"){
          clear()
      }else{
          operand = btn.id;
      }
    })
})

// add event listners to number buttons 
numberBtns.sort((a,b) => a.innerText - b.innerText);
numberBtns.map((btn) => {
    btn.addEventListener("click", () =>{
        display.innerText = btn.innerText;
        if(operand === ""){
           a = btn.innerText  
        }else{
            b = btn.innerText
        }
          console.log("a = "+a)
          console.log("b = "+b)      
    } )

    btn.addEventListener("touchstart", () => {
        btn.classList.add("number-hover")
    })
    btn.addEventListener("touchend", () => {
        btn.classList.remove("number-hover")
    })
})


