const display = document.querySelector(".calc-display");
const buttons = document.querySelectorAll(".btn");
let input1 = [];
let input2 = [];
let operand = "";
let answer = "";
//step 1 -> getting input1
let step1 = true;
// step2 -> operand set, receive input2
let step2 = false;



//input formatter - takes inputs and returns numbers for math calculations
inputFormatter = (input) => {
    if(typeof(input) === "number"){
        return input;
    }

    let formattedInput = input.join("");
    return Number(formattedInput);
}

// Define and call upDate Display to set initial value
updateDisplay = (str) => {
    display.innerText = str;
}
updateDisplay("0");

//operation functions
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

clear = () => {
    input1 = [];
    input2 = [];
    step1 = true;
    step2 = false;
    step3 = false;
    updateDisplay(0);

}

toPercent = (a, b) => {
  if(b == ""){
      input1 = a/100;
      return input1;
  }else{
      input2 = b/100;
      return input2;
  }
}

negate = () => {
    if(step1){
        return input1.unshift("-")
    }
}

operate = (a, b, operand) => {
    let result;
    a = inputFormatter(a);
    b = inputFormatter(b); 
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

    if(isNaN(result)) return "Error";

    if(result == 0) return result;

    if(Number.isInteger(result)){
       return parseInt(result) 
    }else{
       return parseFloat(result).toPrecision(8);
    }
}


//seperate buttons into arrays
btnArr = Array.from(buttons);
numberBtns = btnArr.filter(btn => !isNaN(btn.innerText));
functionBtns = btnArr.filter(btn => isNaN(btn.innerText));


//add event listeners to function buttons
functionBtns.map((btn) => {
    btn.addEventListener("click", () => {
      if(btn.id == "equals"){
          answer = operate(input1, input2, operand);
          updateDisplay(answer);
          input1 = answer.toString().split("");
          input2 = [];
          step1 = false;
          step2 = false;
          step3 = true;
          console.log(answer)
      }
      
      if(btn.id === "clear"){
          clear();
      }
      
      if(btn.id === "percent"){
          answer = toPercent(input1, input2)
          updateDisplay(answer);
          console.log(answer)
      }
       
      if(btn.id === "negate"){
          answer = negate()
          display.innerText = answer;
      }
      
      if(btn.id ){
          step1 = false;
          step2 = true;
          operand = btn.id;
          console.log(operand)
      }
    })

     //UI Number Button Events
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
})


// add event listners to number buttons 
numberBtns.sort((a,b) => a.innerText - b.innerText);
numberBtns.map((btn) => {
    btn.addEventListener("click", () =>{
      
      if(step1){
          if(input1.length != 8){
            input1.push(btn.innerText)
            updateDisplay(input1.join(""))
          /*
            if(input1[0] == 0){
              input1.shift();
              input1.push(btn.innerText)
              updateDisplay(input1.join(""))
            }else{
              input1.push(btn.innerText)
              updateDisplay(input1.join(""))  
                }  
                */  
          }
      }
 /*
      if(!step1 && !step2 && step3){
          input2.push(btn.innerText)
          updateDisplay(input2.join(""));
      }

      if(step1 && step2 && !step3){
        input2.push(btn.innerText)
        updateDisplay(input2.join(""))    
      }
      */
     if(step2){
        if(input2.length < 8){
        input2.push(btn.innerText)
        updateDisplay(input2.join("")); 
        }
     }

     console.log(input1)
     console.log(input2)

  } )

    //UI Number Button Events
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
})

