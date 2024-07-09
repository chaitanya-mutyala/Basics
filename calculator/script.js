const buttons = document.querySelectorAll("p");
const line1 = document.querySelector("#line1");
const line2 = document.querySelector("#line2");
let prev = '';
let curr = '';
let operand = '';
let num = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '00', '.'];
let operandlist = ['+', '-', '*', '/', '%'];

function updatedisplay(ans) {
    line2.innerText = `= ${ans}`;
    line2.style.color = "#fff";
    line2.style.fontSize = '2.25rem';
}

function display(ans) {
    line2.innerText = ans;
    line2.style.color = '#a09595c0';
    line2.style.fontSize = '1.6rem';
}

function delete1() {
    line1.innerText = line1.innerText.slice(0, -1);
    curr = curr.slice(0, -1);
}

function clear() {
    line1.innerText = '';
    curr = '';
    line2.innerText = '';
    prev = '';
    operand = '';
}

function calculate() {
    let result;
    switch (operand) {
        case '+':
            result = Number(prev) + Number(curr);
            break;
        case '-':
            result = Number(prev) - Number(curr);
            break;
        case '*':
            result = Number(prev) * Number(curr);
            break;
        case '/':
            result = Number(prev) / Number(curr);
            break;
        case '%':
            result = Number(prev) % Number(curr);
            break;
        default:
            result = Number(curr);  
    }
    return result;
}

for (let k of buttons) {
    k.addEventListener("click", () => {
        let val = k.getAttribute("value");
        if (num.includes(val)) {
            curr += val;
            line1.innerHTML += `<span style="font-size: 0.8rem;">${val}</span>`;
            if (operand !== '') {
                let tempResult = calculate();
                display(tempResult);
            } else {
                display(curr);
            }
        }
        if (operandlist.includes(val)) {
            if (prev === '') {
                prev = curr;
            } else if (curr !== '') {
                prev = calculate();
            }
            operand = val;
            curr = '';
            line1.innerHTML += `<span style="font-size: 1rem;">${val}</span>`;
        }
        if (val === 'equals') {
            if (prev !== '' && curr !== '') {
                prev = calculate();
                updatedisplay(prev);
                
                curr = ''; 
                line1.innerHTML = `<span style="font-size: 0.8rem;">${prev}</span>`;
            }
        }
        if (val === 'delete') {
            delete1();
        }
        if (val === 'clear') {
            clear();
        }
    });
}
