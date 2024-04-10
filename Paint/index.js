const ctx = myCanvas.getContext("2d");

let color = "#000000";
let thickness = 1;

let isDrawing = false;
let startPoint = { x: 0, y: 0 };

let settings = [
    true,  // line
    false, // pencil
    false, // box
    false, // circle
    false, // eraser
];

let drawnElements = []; // Store drawn elements separately

colorpicker.addEventListener("input", (e) => {
    color = colorpicker.value;
});

lines.addEventListener("click", () => {
    settings = [true, false, false, false, false];
});

pencil.addEventListener("click", () => {
    settings = [false, true, false, false, false];
});

eraser.addEventListener("click", () => {
    settings = [false, false, false, false, true];
});

thick.addEventListener("input", () => {
    thickness = thick.value;
});

myCanvas.addEventListener("mousedown", (e) => {
    startPoint = { x: e.offsetX, y: e.offsetY };
    if (settings[1] === true || settings[4] === true) {
        isDrawing = true;
        if (settings[4] === true) {
            color = '#FFFFFF'; // Set color to white for eraser
        }
        drawnElements.push({ type: settings[1] === true ? 'pencil' : 'eraser', points: [startPoint], color: color, thickness: thickness });
    }
});

myCanvas.addEventListener("mousemove", (e) => {
    if (!isDrawing) {
        return;
    }
    if (settings[1] === true || settings[4] === true) { // Pencil or eraser mode
        const currentPoint = { x: e.offsetX, y: e.offsetY };
        drawnElements[drawnElements.length - 1].points.push(currentPoint); // Update the points for the current line
        drawElements(drawnElements); // Redraw canvas with stored elements
        startPoint = currentPoint;
    }
});

myCanvas.addEventListener("mouseup", (e) => {
    if (settings[1] === true || settings[4] === true) {
        isDrawing = false;
    }
    if (settings[0] === true) { // Line mode
        const endPoint = { x: e.offsetX, y: e.offsetY };
        drawnElements.push({ type: 'line', start: startPoint, end: endPoint, color: color, thickness: thickness });
        drawElements(drawnElements); // Redraw canvas with stored elements
    }
});

function drawElements(elements) {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height); // Clear canvas
    elements.forEach(element => {
        ctx.beginPath();
        if (element.type === 'line') {
            ctx.moveTo(element.start.x, element.start.y);
            ctx.lineTo(element.end.x, element.end.y);
        } else if (element.type === 'pencil' || element.type === 'eraser') {
            const points = element.points;
            if (points.length > 0) {
                ctx.moveTo(points[0].x, points[0].y);
                for (let i = 1; i < points.length; i++) {
                    ctx.lineTo(points[i].x, points[i].y);
                }
            }
        }
        ctx.lineWidth = element.thickness;
        ctx.strokeStyle = element.color;
        ctx.stroke();
    });
}
