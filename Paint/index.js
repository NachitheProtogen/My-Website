const ctx = myCanvas.getContext("2d");

let color = "#000000";
let thickness = 1;

let isDrawing = false;
let startPoint = { x: 0, y: 0 };

let settings = [
    false,  // line
    true, // pencil
    false, // box
    false, // circle
    false, // eraser
];

let colors = [
    {name:"red", value:"#FF0000"},
    {name:"blue", value:"#0000FF"},
    {name:"green", value:"#008000"},
    {name:"greenyellow", value:"#adff2f"},
    {name:"yellow", value:"#FFFF00"},
    {name:"orange", value:"#ffa500"},
    {name:"purple", value:"#800080"},
    {name:"pink", value:"#ff69b4"},
    {name:"black", value:"#000000"},
    {name:"white", value:"#FFFFFF"},
];

let drawnElements = []; // Store drawn elements separately

colorpicker.addEventListener("input", (e) => {
    color = colorpicker.value;
});

lines.addEventListener("click", () => {
    settings = [true, false, false, false, false];
    color = precol;
    colorpicker.value = precol
    thickness = prethic;
    thick.value = prethic
});

pencil.addEventListener("click", () => {
    settings = [false, true, false, false, false];
    color = precol;
    colorpicker.value = precol
    thickness = prethic;
    thick.value = prethic;
});

let precol = color;
let prethic = thickness;

eraser.addEventListener("click", () => {
    settings = [false, false, false, false, true];
    precol = color;
    prethic = thickness;

    colorpicker.value = "#FFFFFF";
    thickness = 20;
    thick.value = 20;
});

square.addEventListener("click", () => {
    settings = [false,false,true,false,false];
    color = precol;
    colorpicker.value = precol;
    thickness = prethic;
    thick.value = prethic;
})

circle.addEventListener("click", () => {
    settings = [false,false,false,true,false];
    color = precol;
    colorpicker.value = precol;
    thickness = prethic;
    thick.value = prethic;
})

thick.addEventListener("input", () => {
    thickness = thick.value;
});

let piccount = 1;

function picsize(IncOrDec) {
    switch (piccount) {
        case 0:
            if (IncOrDec==="+") {
                myCanvas.width = 500;
                myCanvas.height = 500;
                piccount = 1;
            } else if(IncOrDec==="-"){
                return;
            }
            break;
        case 1:
            if (IncOrDec==="+") {
                myCanvas.width = 800;
                myCanvas.height = 600; 
                piccount = 2;
            } else if(IncOrDec==="-"){
                myCanvas.width = 300;
                myCanvas,height = 300;
                piccount = 0;
            }
            break;
        case 2:
            if (IncOrDec==="+") {
                myCanvas.width = 1000;
                myCanvas.height = 800;
                piccount = 3;
            } else if(IncOrDec==="-"){
                myCanvas.width = 500;
                myCanvas.height = 500;
                piccount = 1;
            }
            break;
        case 3:
            if (IncOrDec==="+") {
                return;
            } else if(IncOrDec==="-"){
                myCanvas.width = 800;
                myCanvas. height = 600;
                piccount = 2;
            }
            break;
    }
}

incpic.addEventListener("click", () => {
    picsize("+")
    drawElements(drawnElements);
})

decpic.addEventListener("click", () => {
    picsize("-")
    drawElements(drawnElements);
})

clear.addEventListener("click", () => {
    drawnElements = [];
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    piccount = 0
    picsize("+");
});

downloadbtn.addEventListener("click", () => {
    downloadcanvasimg();
})

function downloadcanvasimg() {
    let image = myCanvas.toDataURL("image/png")
    let link = document.createElement('a');
    link.download = 'canvas_image.png'; // Set the download attribute with desired file name
    link.href = image;

    canvasdiv.appendChild(link);

    link.click();

    canvasdiv.removeChild(link);
};

myCanvas.addEventListener("mousedown", (e) => {
    startPoint = { x: e.offsetX, y: e.offsetY };
    if (settings[1] === true || settings[4] === true) {
        isDrawing = true;
        if (settings[4] === true) {
            color = '#FFFFFF'; // Set color to white for eraser
        }
        drawnElements.push({ type: settings[1] === true ? 'pencil' : 'eraser', points: [startPoint], color: color, thickness: thickness });
    }
    if (settings[2] === true){
        drawnElements.push({ type: settings[2] , points: [startPoint], color: color, thickness: thickness });
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
    if (settings[2] === true) {
        const endPoint = {x: e.offsetX, y: e.offsetY};
        drawnElements.push({ type: "box", start: startPoint, end: endPoint, color: color, thickness: thickness });
        drawElements(drawnElements);
    }
});

myCanvas.addEventListener("touchstart", (e) => {
    e.preventDefault(); // Prevent default touch behavior (like scrolling)
    startPoint = { x: e.touches[0].clientX - myCanvas.getBoundingClientRect().left, y: e.touches[0].clientY - myCanvas.getBoundingClientRect().top };
    if (settings[1] === true || settings[4] === true) {
        isDrawing = true;
        if (settings[4] === true) {
            color = '#FFFFFF'; // Set color to white for eraser
        }
        drawnElements.push({ type: settings[1] === true ? 'pencil' : 'eraser', points: [startPoint], color: color, thickness: thickness });
    }
});

myCanvas.addEventListener("touchmove", (e) => {
    e.preventDefault(); // Prevent default touch behavior (like scrolling)
    if (!isDrawing) {
        return;
    }
    if (settings[1] === true || settings[4] === true) { // Pencil or eraser mode
        const currentPoint = { x: e.touches[0].clientX - myCanvas.getBoundingClientRect().left, y: e.touches[0].clientY - myCanvas.getBoundingClientRect().top };
        drawnElements[drawnElements.length - 1].points.push(currentPoint); // Update the points for the current line
        drawElements(drawnElements); // Redraw canvas with stored elements
        startPoint = currentPoint;
    }
});

myCanvas.addEventListener("touchend", (e) => {
    if (settings[1] === true || settings[4] === true) {
        isDrawing = false;
    }
    // No touch-specific functionality needed for drawing lines
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
        } else if (element.type === "box") {
            ctx.rect(element.start.x, element.start.y, element.end.x - element.start.x, element.end.y - element.start.y);
        }
        ctx.lineWidth = element.thickness;
        ctx.strokeStyle = element.color;
        ctx.stroke();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    colors.forEach( function(colorfun) {
        let btn = document.createElement("button");
        btn.id = colorfun.name;
        btn.className = "button";
        btn.style = `background-color: ${colorfun.value}; height: 15px;`;
        btn.value = colorfun.value;
        btn.addEventListener("click", () => {
            colorpicker.value = btn.value;
            color = btn.value;
            precol = btn.value;
        });
        
        colordiv.appendChild(btn);
    })
})
