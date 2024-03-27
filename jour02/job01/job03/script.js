
const button = document.getElementById("button");
const p = document.getElementById("count");
var counter = 0
button.addEventListener("click",function addOne ()  {
    counter ++;
p.textContent = `Click count: ${counter}`;
});
