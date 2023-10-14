// function for creating the sketch grid
function createGrid(gridSize) {
  let gridContainer = document.createElement("div");
  gridContainer.setAttribute("id", "sketchyPad-container");

  let grid = [];

  for (let count = 0; count < gridSize; count++) {
    let gridRowContainer = document.createElement("div");
    gridRowContainer.setAttribute("id", `grid-row-${count + 1}`);

    for (let counter = 0; counter < gridSize; counter++) {
      let gridSquare = document.createElement("div");
      gridSquare.setAttribute("id", "grid " + (counter + 1));
      gridSquare.setAttribute("class", "grid-square");
      gridSquare.addEventListener("mouseenter", () => {
        console.log("Hovered!");
        gridSquare.style.backgroundColor = "red";
      });
      gridRowContainer.appendChild(gridSquare);
    }
    grid.push(gridRowContainer);
  }
  gridContainer.append(...grid);
  return gridContainer;
}
// function for displaying sketch grid
function displayGrid() {
  const body = document.getElementsByTagName("body")[0];
  const heading = document.createElement("h1");
  const SIZE = 16;
  const GRID = createGrid(SIZE);

  heading.textContent = "Sketchy Pad";

  body.append(heading, GRID);
}

// display grtd
displayGrid();
