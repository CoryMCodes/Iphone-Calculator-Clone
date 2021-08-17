console.log("test")

add = (a, b) =>{
return a + b
}

console.log("1 + 4 = " + add(1,4))

subtract = (a, b) =>{
    return a - b
    }

console.log("1 - 4 = " + subtract(1,4))

divide = (a, b) => {
    return a / b
} 
console.log("1 / 4 = " + divide(1,4))

multiply = (a, b) => {
    return a * b
} 

console.log("1 * 4 = " + multiply(1,4))

operate = (a, b, operand) => {
    switch (operand){
        case "+":
            return add(a,b);
            
        case "-":
            return subtract(a,b);
            
        case "*":
            return muliply(a,b);
            
        case "/":
           return divide(a,b);
            
        default:
            console.log("operand not recognized");
    }
} 

const display = document.querySelector(".calc-display");
const buttons = document.querySelectorAll(".btn");
btnArr = Array.from(buttons);
numberBtns= btnArr.filter(btn => !isNaN(btn.innerText));
numberBtns.sort((a,b) => a.innerText - b.innerText);
console.log(numberBtns);

numberBtns.map((btn) => {
    btn.addEventListener("click", () =>{
        display.innerText = btn.innerText;
    } )
})