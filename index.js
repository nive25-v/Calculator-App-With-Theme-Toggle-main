//jshint esversion:6

//for theme
const range = document.getElementById("range");
const body = document.querySelector("body");
const nums = document.querySelectorAll(".numpad div");

//for calculator
const numbers = document.querySelectorAll("[data-number]");
const operators = document.querySelectorAll("[data-operator]");
const del = document.querySelector(".del");
const reset = document.querySelector(".reset");
const equals = document.querySelector(".equal-to");
const display = document.querySelector(".display");


//logic for theme
range.onchange = function() {
  switch (this.value) {
    case "1":
      body.classList.remove(...body.classList);
      break;

    case "2":
      body.classList.remove(...body.classList);
      body.classList.add("theme-2");
      break;
    case "3":
      body.classList.remove(...body.classList);
      body.classList.add("theme-3");
      break;
    default:
      console.log(this.value);
  }
};

nums.forEach((num) => {
  num.addEventListener("click", function(){
    num.style.top="2px";
    setTimeout(function(){
      num.style.top=0;
    }, 100);
  });
});


//logic for calculation
let prevValue = "";
let currentValue = "";
let operater = "";

function append(number) {
  return currentValue + number;
}

function numberWithCommas(x) {
  return parseFloat(x).toLocaleString('en-US', {maximumFractionDigits:3});
}

function clear() {
  prevValue = "";
  currentValue = "";
  operater = "";
}

function checkOperater(evt){
  if(operater!=="" && operater !== String(evt)){
    operater=String(evt);
    display.innerText = numberWithCommas(prevValue) + String(evt);
  }
}

function compute() {
  switch (operater) {
    case "+":
      result = parseFloat(prevValue) + parseFloat(currentValue);
      display.innerText = numberWithCommas(result);
      clear();
      prevValue = result;
      break;
    case "-":
      result = parseFloat(prevValue) - parseFloat(currentValue);
      display.innerText = numberWithCommas(result);
      clear();
      prevValue = result;
      break;
    case "/":
      result = parseFloat(prevValue) / parseFloat(currentValue);
      display.innerText = numberWithCommas(result);
      clear();
      prevValue = result;
      break;
    case "x":
      result = parseFloat(prevValue) * parseFloat(currentValue);
      display.innerText = numberWithCommas(result);
      clear();
      prevValue = result;
      break;
    default:
    console.log(operater);

  }
}

numbers.forEach((number) => {
  number.addEventListener("click", function() {
    if (this.innerText === "." && currentValue.includes(".")) return;
    currentValue = append(this.innerText);
    display.innerText = numberWithCommas(currentValue);
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", function() {
    if(currentValue==="" && operater!==""){
      checkOperater(this.innerText);
    }

    if (currentValue === "") return;

    if (prevValue !== "") {
      compute();
      operater = String(this.innerText);
      display.innerText = numberWithCommas(prevValue) + operater;
      currentValue = "";
    } else {
      checkOperater();
      operater = String(this.innerText);
      display.innerText = numberWithCommas(currentValue) + operater;
      prevValue = currentValue;
      currentValue = "";
    }
  });
});

equals.addEventListener("click", function() {
  if (currentValue === "") {
    display.innerText = numberWithCommas(prevValue);
  } else {
    compute();
  }
});

reset.addEventListener("click", function() {
  clear();
  display.innerText = "";
});

del.addEventListener("click", function() {
  if (currentValue === "") return;
  currentValue = currentValue.slice(0, -1);
  display.innerText = numberWithCommas(currentValue);
});


