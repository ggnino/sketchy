let myToggle = false;
// function for creating the sketch grid
function createGrid(gridSize) {
  let gridContainer = document.createElement("div");
  let grid = [];
  gridContainer.setAttribute("id", "sketchyPad-container");

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
  const toggle = getToggle();

  if (toggle) element.style.backgroundColor = `rgb(${randomRGB()})`;
  else element.style.backgroundColor = "black";
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
// function for changing the grid size when GRID SIZE is clicked
function changeGridSize() {
  let userSize = prompt("Change the grid size(max: 100): ");
  let GRID = document.getElementById("sketchyPad-container");

  while (
    isNaN(Number(userSize)) ||
    Number(userSize) < 1 ||
    Number(userSize) > 100
  ) {
    alert("Only numbers (1-100) are accepted. Try again.");
    userSize = prompt("Change the grid size(max: 100): ");
  }
  GRID = createGrid(userSize);
  GRID.setAttribute("class", "flex");

  const body = document.getElementsByTagName("body")[0];

  body.replaceChild(GRID, body.children[3]);
  document.getElementById("grid-btn").textContent = `GRID SIZE (${userSize})`;
}

function setToggle() {
  const btn = document.getElementById("rgb-btn");
  if (myToggle) {
    myToggle = false;
    btn.setAttribute("class", "grid-btn");
  } else {
    btn.setAttribute("class", "grid-btn myHover");
    myToggle = true;
  }
}
function getToggle() {
  return myToggle;
}

// function for displaying sketch grid
function displayGrid() {
  const body = document.getElementsByTagName("body")[0];
  const heading = document.createElement("h1");
  const btnContainer = document.createElement("div");
  const gridBtn = document.createElement("button");
  const rgbBtn = document.createElement("button");
  const SIZE = 16;
  const GRID = createGrid(SIZE);

  gridBtn.addEventListener("click", changeGridSize);
  rgbBtn.addEventListener("click", setToggle);
  gridBtn.textContent = `GRID SIZE (${SIZE})`;
  rgbBtn.textContent = "RGB";
  heading.textContent = "Sketchy Pad";

  body.setAttribute("class", "flex");
  GRID.setAttribute("class", "flex");
  gridBtn.setAttribute("class", "grid-btn");
  gridBtn.setAttribute("id", "grid-btn");
  rgbBtn.setAttribute("class", "grid-btn");
  rgbBtn.setAttribute("id", "rgb-btn");

  btnContainer.append(gridBtn, rgbBtn);
  body.append(heading, btnContainer, GRID);
}

// display grtd
displayGrid();
