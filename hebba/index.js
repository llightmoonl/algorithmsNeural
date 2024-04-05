let learningTools = document.querySelector('.learning__tools');
let tableInput = document.querySelector('.table');
const examplesContainer = document.querySelector('.examples__templates');
const resultLearning = document.querySelector('.result__learning');

let count = 0;
let example__learning = [];

function activation(x, w){
    let s = 0;

    for(let i = 0; i < x.length; i++){
        s += x[i]*w[i];
    }
    return s;
}

function randomValues(min, max){
    return Math.random() * (max - min) + min;
}

function algorithHebba(x, y, w){
    if(y==0){
        for(let i = 0; i<x.length; i++){
            w[i] += x[i];
        }
    }
    else{
        for(let i = 0; i<x.length; i++){
            w[i] -= x[i];
        }
    }
    return w;
}

function checkParityNumber(x, w, number,epochs){
    let i = 0;
    x = x.flat();
    let y = 0;

    while(i<=epochs){
        let s = activation(x, w);

        if(s>=neuron){
            y = 1;
        }
        else {
            y = 0;
        }
    
        if(y==number){
            return w; 
        }
        else{
            w = algorithHebba(x, y, w);
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
            console.log(neuron);
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


let neuron = randomValues(0,1);

let w = Array(15);

for(let i = 0; i < w.length; i++){
    w[i] = randomValues(0, 1);
}

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
        if(event.target.className === "button__even" || event.target.className==="button__odd"){
            if(event.target.className === "button__even"){
                w = checkParityNumber(x, w, 1, 100); 
                resultLearning.textContent = "Число четное";
            }
            if(event.target.className==="button__odd"){
                w = checkParityNumber(x, w, 0, 100);
                resultLearning.textContent = "Число нечетное";
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



