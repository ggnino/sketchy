// function for creating the sketch grid
function createGrid(gridSize) {
  let gridContainer = document.createElement("div");
  gridContainer.setAttribute("id", "sketchyPad-container");

  let grid = [];

  for (let count = 0; count < gridSize; count++) {
    let gridRowContainer = document.createElement("div");
    gridRowContainer.setAttribute("id", `grid-row-${count + 1}`);
    gridRowContainer.setAttribute("class", `grid-row`);

    for (let counter = 0; counter < gridSize; counter++) {
      let gridSquare = document.createElement("div");
      gridSquare.setAttribute("id", "grid " + (counter + 1));
      gridSquare.setAttribute("class", "grid-square");

      gridSquare.addEventListener("mouseenter", () =>
        gridSquareHover(gridSquare)
      );
      gridSquare.addEventListener("click", () => darkenColor(gridSquare));
      gridRowContainer.appendChild(gridSquare);
    }
    grid.push(gridRowContainer);
  }
  gridContainer.append(...grid);
  return gridContainer;
}
// function to darken the grid square
function darkenColor(element) {
  const DARKEN_AMOUNT = 10;
  let color = element.style.backgroundColor;
  color = color.slice(3).replace(/[()]/g, "").split(",");

  for (let c = 0; c < color.length; c++) {
    if (color[c] > 0) color[c] = Number(color[c]) - DARKEN_AMOUNT;
  }

  color = color.join(",");
  color = `rgb(${color})`;
  element.style.backgroundColor = color;
}
// function to handle hover effect of grid square
function gridSquareHover(element) {
  element.style.backgroundColor = `rgb(${randomRGB()})`;
}
// function for randomizing the color
function randomRGB() {
  let color = "";

  for (let count = 1; count <= 3; count++) {
    if (count == 3) color = color + `${Math.floor(Math.random() * 255)}`;
    else color = color + `${Math.floor(Math.random() * 255)},`;
  }

  return color;
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
