let cells = [];

const rows = 32; // Man könnte das feld auch größer machen
const cols = 32; // aber naja

function countAliveNeighbors(cellInp) {

  cellInp.neighbors = 0;

  cells.forEach(cell => {
    if(cell.x == cellInp.x -1 && cell.y == cellInp.y -1){
      
      if(cell.style.backgroundColor == "black"){
      cellInp.neighbors++;
    }}
    if(cell.x == cellInp.x -1 && cell.y == cellInp.y ){
      
      if(cell.style.backgroundColor == "black"){
      cellInp.neighbors++;
    }}
    if(cell.x == cellInp.x -1 && cell.y == cellInp.y +1){
      
      if(cell.style.backgroundColor == "black"){
      cellInp.neighbors++;
    }}
    if(cell.x == cellInp.x  && cell.y == cellInp.y -1){
      
      if(cell.style.backgroundColor == "black"){
      cellInp.neighbors++;
    }}
    if(cell.x == cellInp.x  && cell.y == cellInp.y +1){
      
      if(cell.style.backgroundColor == "black"){
      cellInp.neighbors++;
    }}
    if(cell.x == cellInp.x +1 && cell.y == cellInp.y -1){
      
      if(cell.style.backgroundColor == "black"){
      cellInp.neighbors++;
    }}
    if(cell.x == cellInp.x +1 && cell.y == cellInp.y ){
      
      if(cell.style.backgroundColor == "black"){
      cellInp.neighbors++;
    }}
    if(cell.x == cellInp.x +1 && cell.y == cellInp.y +1){
      
      if(cell.style.backgroundColor == "black"){
      cellInp.neighbors++;
    }}    
  });

};

function updateGrid(){
  cells.forEach(cell => {
    countAliveNeighbors(cell);
  })
  cells.forEach(cell => {
    if(cell.style.backgroundColor == "black"){
      // alive
      if(cell.neighbors < 2){
        // dies due to isolation
        cell.style.backgroundColor = "white";
      }else if(cell.neighbors > 3){
        // dies due to overpopulation
        cell.style.backgroundColor = "white";
      }
    }else{
      if(cell.neighbors == 3){
        // cell is being born in the next gen.
        cell.style.backgroundColor = "black";
      }
    }
  });
};

function createEmptyGrid(rows, cols) {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        const cell = document.createElement('button');
        cell.className = "cell"
        cell.style.backgroundColor = "white";
        cell.x = i;
        cell.y = j;
        cell.neighbors = 0;
        cell.addEventListener("click", () => {
          if (cell.style.backgroundColor=="white") {
            cell.style.backgroundColor = "black";
          } else {
            cell.style.backgroundColor = "white";
          };
          console.log(cell.x,cell.y);
        }) 
        canvas.appendChild(cell);
        cells.push(cell);
    }
    canvas.appendChild(document.createElement('br'));
};
console.log(cells);
};

let timer;

play.addEventListener("click", () => {
  let swiftnes = parseFloat(swiftness.value);
  if(swiftnes<100) {
    swiftnes = 100;
  };

  timer = setInterval(() => {
    updateGrid()
  }, swiftnes);

})

pause.addEventListener("click", () => {
clearInterval(timer);
})

reload.addEventListener("click", () => {
  document.location.reload();
})

createEmptyGrid(rows, cols);

let rulesSwitch = true;

CellRules.addEventListener("click", () => {

  if (rulesSwitch) {
    CellRules.style.top = "-350px";
    rulesSwitch =!rulesSwitch;
  } else {
    CellRules.style.top = "0px";
    rulesSwitch = !rulesSwitch;
  }
});