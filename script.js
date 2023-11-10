import React from "react";
function myFunction() {
    document.getElementById("f1").submit();
  }

const inputSource = document.getElementById("input-source");
const inputSum = document.getElementById("input-sum");
const inputDate = document.getElementById("input-date");

function addTask(){
  if (inputSource.value === '' || inputSum === '' || inputDate === ''){
    alert("Invalid input")
  }else{
    let li = document.createElement("li");
    li.innerHTML = inputSource.value;
    listContainer.appendChild(li);
  }
}
export default script;

//if sum == 0 gray return 0
//if sum > 0 green return +
//if sum < 0 red return -
