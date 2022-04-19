const plusBtns = document.querySelectorAll('.plus');
const minusBtns = document.querySelectorAll('.minus');

const inputG = document.querySelector('#good');
const inputOK = document.querySelector('#ok');
const inputB = document.querySelector('#bad');
const inputO = document.querySelector('#other');
const inputT = document.querySelector('#total');
const inputR = document.querySelector('#rat');

const ratio = document.querySelector('.ratio');

const refresh = document.querySelector('#refresh');
const copy = document.querySelector('#copy');
const notif = document.querySelector('#notification');

let a, b, c, d;

const handleValueChange = () => {
    inputT.value = parseInt(inputG.value) + parseInt(inputB.value) + parseInt(inputOK.value) + parseInt(inputO.value);
    a = 100 * parseInt(inputG.value) / parseInt(inputT.value);
    b = 100 * parseInt(inputOK.value) / parseInt(inputT.value);
    c = 100 * parseInt(inputB.value) / parseInt(inputT.value);
    d = 100 * parseInt(inputO.value) / parseInt(inputT.value);
    let coloredOutput = `
    <div id="rat-numbers">
        <span class="c-good">
            ${a.toFixed(2)}%
        </span>
        |
        <span class="c-ok">
            ${b.toFixed(2)}%
        </span>
        |
        <span class="c-bad">
            ${c.toFixed(2)}%
        </span>
        |
        <span class="c-other">
            ${d.toFixed(2)}%
        </span>
    </div>
    <div id="rat-bar">
        <div id="bar-good" style="height: ${a}%"></div>
        |
        <div id="bar-ok" style="height: ${b}%"></div>
        |
        <div id="bar-bad" style="height: ${c}%"></div>
        |
        <div id="bar-other" style="height: ${d}%"></div>
    </div>
    `;
    inputR.innerHTML = inputT.value === '0' ? '-' : coloredOutput;

    if (parseInt(inputT.value) === 0) {
        ratio.classList.remove('active');
    } else {
        ratio.classList.add('active');
    }

    localStorage.setItem('COUNTIT3-good', inputG.value);
    localStorage.setItem('COUNTIT3-ok', inputOK.value);
    localStorage.setItem('COUNTIT3-bad', inputB.value);
    localStorage.setItem('COUNTIT3-other', inputO.value);
    localStorage.setItem('COUNTIT3-total', inputT.value);
}

const showNotification = (msg) => {
    notif.classList.add('show');
    notif.innerHTML = msg;
    setTimeout(() => {
        notif.classList.remove('show');
    }, 2000);
}


inputG.value = localStorage.getItem('COUNTIT3-good') || 0;
inputOK.value = localStorage.getItem('COUNTIT3-ok') || 0;
inputB.value = localStorage.getItem('COUNTIT3-bad') || 0;
inputO.value = localStorage.getItem('COUNTIT3-other') || 0;
inputT.value = localStorage.getItem('COUNTIT3-total') || 0;
handleValueChange();

plusBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        let input = btn.parentElement.parentElement.querySelector('input');
        input.value = parseInt(input.value) + 1;
        handleValueChange();
    });
});

minusBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        let input = btn.parentElement.parentElement.querySelector('input');
        if (parseInt(input.value) > 0) {
            input.value = parseInt(input.value) - 1;
            handleValueChange();
        }
    });
});

document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', handleValueChange);
});

refresh.addEventListener('click', () => {
    inputG.value = 0;
    inputOK.value = 0;
    inputB.value = 0;
    inputO.value = 0;
    inputT.value = 0;
    inputR.innerHTML = '';
    handleValueChange();
})

// copy the text from inputR to clipboard on click
copy.addEventListener('click', () => {
    navigator.clipboard.writeText(`Total: ${inputT.value} | Good: ${inputG.value} (${a.toFixed(2)}%) | OK: ${inputOK.value} (${b.toFixed(2)}%) | Bad: ${inputB.value} (${c.toFixed(2)}%) | Other: ${inputO.value} (${d.toFixed(2)}%)`);
    showNotification('<i class="fas fa-check-circle"></i>&nbsp;&nbsp;Data copied to clipboard!');
});