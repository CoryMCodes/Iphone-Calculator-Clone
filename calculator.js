const display = document.querySelector(".calc-display");
const buttons = document.querySelectorAll(".btn");
const clearButton = document.querySelector("#clear");
const negativeButton= document.querySelector("#negative-toggle");
const percentButton = document.querySelector("#percent");
const addButton = document.querySelector("#add");
const subtractButton = document.querySelector("#subtract");
const divideButton = document.querySelector("#divide");
const mulitplyButton = document.querySelector("#multiply");

let a = "0";
let b = "";
let operand = "";
let answer = 0; 

//operation functions
add = (a, b) =>{
    console.log("add runs" + a + b)
return parseInt(a + b);
}

subtract = (a, b) =>{
    return a - b;
    }

divide = (a, b) => {
    return a / b;
} 

multiply = (a, b) => {
    return a * b;
} 

clear = () => {
    a = "0";
    b = "";
    operand = "";
    display.innerText = "0"
}


operate = (a, b, operand) => {
    switch (operand){
        case "add":
          answer = add(a,b);
          break;
        case "subtract":
          answer = subtract(a,b);
          break;
        case "multiply":
          answer = multiply(a,b);
          break;
        case "divide":
          answer = divide(a,b); 
          break;
        default:
            console.log(operand);
    }
    operand = "";
    console.log(answer)
    return answer;
} 



btnArr = Array.from(buttons);

//seperate buttons into arrays
numberBtns = btnArr.filter(btn => !isNaN(btn.innerText));
functionBtns = btnArr.filter(btn => isNaN(btn.innerText));
console.log(functionBtns)

//add event lisnters to function buttons
functionBtns.map((btn) => {
    btn.addEventListener("click", () => {
        console.log(btn.id)
      if(btn.id == "equals"){
          a = parseInt(a);
          b = parseInt(b);
          display.innerText = operate(a, b, operand);
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
})


