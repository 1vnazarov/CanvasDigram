const canvas = document.getElementById('marksChart');
const ctx = canvas.getContext('2d');
ctx.font = '1rem serif';

const marks = [
    { id: 'twos', count: 0, color: 'red', label: 'Двойки:' },
    { id: 'threes', count: 0, color: '#bf8425', label: 'Тройки:' },
    { id: 'fours', count: 0, color: 'blue', label: 'Четверки:' },
    { id: 'fives', count: 0, color: 'green', label: 'Пятерки:' }
];

const clearChart = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const drawChart = () => {
    clearChart();
    const total = marks.reduce((sum, mark) => {
        mark.count = document.getElementById(mark.id).value;
        return sum + Number(mark.count);
    }, 0);

    if (total == 0) return;
    
    let prevAngle = 0;
    marks.forEach(mark => {
        const koef = mark.count / total;
        if (koef == 0) return;
        const sliceAngle = 2 * Math.PI * koef;
        const percentage = Math.round(koef * 100);
        drawSlice(prevAngle, prevAngle + sliceAngle, mark.color, percentage);
        prevAngle += sliceAngle;
    });
    drawLegend();
}

const drawSlice = (startAngle, endAngle, color, percentage) => {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.moveTo(200, 200);
    ctx.arc(200, 200, 100, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();

    const middleAngle = (startAngle + endAngle) / 2;
    const textX = 200 + Math.cos(middleAngle) * 50;
    const textY = 200 + Math.sin(middleAngle) * 50;
    ctx.fillStyle = 'white';
    ctx.fillText(`${percentage}%`, textX, textY);
}

const drawLegend = () => {
    let legendY = 0;
    marks.forEach(mark => {
        ctx.fillStyle = mark.color;
        ctx.fillRect(300, legendY, 20, 20);
        ctx.fillStyle = 'black';
        ctx.fillText(mark.label.slice(0, -1), 325, legendY + 15);
        legendY += 30;
    });
}

const createForm = () => {
    const form = document.getElementById('marksForm');
    marks.forEach(mark => {
        const label = document.createElement('label');
        label.htmlFor = mark.id;
        label.textContent = mark.label;
        form.appendChild(label);

        const input = document.createElement('input');
        input.type = 'number';
        input.id = mark.id;
        input.name = mark.id;
        input.value = '0';
        input.min = '0';
        form.appendChild(input);
    });
    const buttons = document.createElement('div');
    form.appendChild(buttons);
    buttons.className = 'column';
    const submit = document.createElement('button');
    submit.type = 'button';
    submit.textContent = 'Создать диаграму';
    submit.addEventListener('click', drawChart);
    buttons.appendChild(submit);
    const reset = document.createElement('button');
    reset.type = 'reset';
    reset.textContent = 'Очистить';
    reset.addEventListener('click', clearChart);
    buttons.appendChild(reset);
}
window.onload = createForm;