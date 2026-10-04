// Make the DIV element draggable:
const draggableWindow = document.querySelector("#drag-1");

dragElement(draggableWindow);
dragElement(document.querySelector("#drag-2"));

function dragElement(elem) {
  const dragHandles = elem.querySelectorAll(".drag-handle");
  let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

  if (dragHandles.length) {
    // if present, the header is where you move the DIV from:
    for (const dragHandle of dragHandles) {
      dragHandle.addEventListener("mousedown", dragMouseDown);
    }
  }

  function dragMouseDown(e) {
    e.preventDefault();

    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;

    document.addEventListener("mouseup", closeDragElement);

    // call a function whenever the cursor moves:
    document.addEventListener("mousemove", elementDrag);
  }

  function elementDrag(e) {
    e.preventDefault();

    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    // set the element's new position:
    Object.assign(elem.style, {
      top: `${elem.offsetTop - pos2}px`,
      left: `${elem.offsetLeft - pos1}px`,
      bottom: "unset",
      right: "unset"
    })
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.removeEventListener("mouseup", closeDragElement);
    document.removeEventListener("mousemove", elementDrag);
  }
}
