let learningTools = document.querySelector('.learning__tools');
let tableInput = document.querySelector('.table');
const examplesContainer = document.querySelector('.examples__templates');
const resultLearning = document.querySelector('.result__learning');

let count = 0;
let example__learning = [];
let n = randomValues(0.05, 1);

let d = [[1,0,0], [0,1,0], [0,0,1]];
function activation(x, w){
    let s = Array(3);

    for(let i = 0; i < s.length; i++){
        for(let j = 0; j < x.length; j++){
            console.log(w[i][j]);
            console.log(x[j])

            s[i] += w[i][j]*x[j];
        }
    }

    return s;
}

function randomValues(min, max){
    return Math.random() * (max - min) + min;
}

function algorithDeltaRules(x, epsilon, w){
    dw = Array(3, 15);
    for(let i = 0; i < w.length; i++){ 
        for(j = 0; j < w[i].length; j++){
            if(j === 0){
                dw[i][j] = n*epsilon[i];
            }
            else{
                dw[i][j] = n*epsilon[i]*x[j];
            }
            w[i][j] += dw[i][j];
        }
    }
    return w;
}

function identifyTheLetter(x, w, d, epochs){
    let i = 0;
    x = x.flat();
    let y = [];
    let epsilon = Array(3);

    while(i<=epochs){
        let s = activation(x, w);
        
        for(let i = 0; i < s.length; i++){
            if(s[i]>=0){
                y.push(1)
            }
            else{
                y.push(0)
            }
        }

        for(let i = 0; i < epsilon.length; i++){
            epsilon[i] = d[i] - y[i];
        }

        i++;
    }
    return w; 
}

function examplesTraining(container, x){
    const table = document.createElement("table");
    table.classList.add("example");

    x.map((_, index) => {
        const exampleRow = document.createElement("tr");
        exampleRow.classList.add("example__row");

        x[index].map((value) => {
            const exampleColumn = document.createElement("td"); 
            value ? exampleColumn.classList.add(...["example__column", "example__column__active"]) :
            exampleColumn.classList.add("example__column"); 
            exampleRow.appendChild(exampleColumn);
        }) 
        table.appendChild(exampleRow);
    });

    container.appendChild(table);
}

function clickCompleteTraining(x, w){
    const examples = document.querySelectorAll('.example');

    for(let i = 0; i < examples.length; i++){
        examples[i].addEventListener("click", ()=>{ 
            let s = activation(x[i].flat(), w);

            if(s>=neuron){
                resultLearning.textContent = "Число четное";
            }
            else {
                resultLearning.textContent = "Число нечетное";
            }
        })
    }
}

function saveArray(x){
    let x_value = [];
    for(let i = 0; i < x.length; i++){
        x_value.push([]);
        for(let j = 0; j<x[i].length; j++){
            x_value[i].push(x[i][j]);
        }
    }
    
    return x_value;
}

let w = new Array(3);

for(let i = 0; i < w.length; i++){
    w[i] = new Array(15);
}

for(let i = 0; i < w.length; i++){
    for(let j = 0; j<w[i].length; j++){
        w[i][j] = randomValues(0, 1);
    }
}
console.log(w);
let x = 
[
    [0,0,0],
    [0,0,0],
    [0,0,0],
    [0,0,0],
    [0,0,0],
];

tableInput.addEventListener("click", (event) => {
    if(event.target.nodeName === "TD"){
        if(event.target.classList.toggle("table__column__active")){
            event.target.classList.add('table__column__active');
            x[event.target.parentElement.rowIndex][event.target.cellIndex] = 1;
        }
        else{
            event.target.classList.remove('table__column__active');
            x[event.target.parentElement.rowIndex][event.target.cellIndex] = 0;
        }
    }
})

learningTools.addEventListener("click", (event) => {
    if(event.target.tagName === "BUTTON"){ 
        if(event.target.className === "button__A" || event.target.className==="button__B"){
            if(event.target.className === "button__A"){
                w = identifyTheLetter(x, w, d[0], 100); 
                resultLearning.textContent = "Буква A";
            }
            if(event.target.className==="button__B"){
                w = identifyTheLetter(x, w, d[1], 100);
                resultLearning.textContent = "Буква B";
            }
            if(event.target.className==="button__C"){
                w = identifyTheLetter(x, w, d[2], 100);
                resultLearning.textContent = "Буква C";
            }

            example__learning.push(saveArray(x));
            examplesTraining(examplesContainer, x);
        }

        if(event.target.className === "complete__training"){
            clickCompleteTraining(example__learning, w);
            resultLearning.textContent = "";
        }
    }
})  



