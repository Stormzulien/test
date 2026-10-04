"use strict";

const elemName = "draggable-window";

class DraggableWindow extends HTMLElement {
  constructor() {
    super();
  }

  #initialized = false;
  #timeoutId = null;
  dragHandles = [];

  #pos_1 = 0
  #pos_2 = 0
  #pos_3 = 0
  #pos_4 = 0

  #dragMouseDown = (e) => {
    e.preventDefault();

    // get the mouse cursor position at startup:
    this.#pos_3 = e.clientX;
    this.#pos_4 = e.clientY;

    document.addEventListener("pointerup", this.#closeDragElement);

    // call a function whenever the cursor moves:
    document.addEventListener("pointermove", this.#elementDrag);
  }

  #elementDrag = (e) => {
    e.preventDefault();

    // calculate the new cursor position:
    this.#pos_1 = this.#pos_3 - e.clientX;
    this.#pos_2 = this.#pos_4 - e.clientY;
    this.#pos_3 = e.clientX;
    this.#pos_4 = e.clientY;

    // set the element's new position:
    this.style.cssText += `
      top: ${this.offsetTop - this.#pos_2}px;
      left: ${this.offsetLeft - this.#pos_1}px;
      bottom: unset;
      right: unset;
    `;
  }

  #closeDragElement = () => {
    // stop moving when mouse button is released:
    document.removeEventListener("pointerup", this.#closeDragElement);
    document.removeEventListener("pointermove", this.#elementDrag);
  }

  init() { // Main code
    this.dragHandles = [ ...this.querySelectorAll(".drag-handle") ];

    if (this.dragHandles.length) {
      // if present, the header is where you move the DIV from:
      for (const dragHandle of this.dragHandles) {
        dragHandle.addEventListener("pointerdown", this.#dragMouseDown);
      }
    }


    this.#timeoutId = null; // put at end
  }

  // other stuff

  connectedCallback() {
    if (this.#initialized) return;

    this.#timeoutId = setTimeout(() => {
      this.init();
    }, 0);

    this.#initialized = true;
  }

  disconnectedCallback() {
    if (this.#timeoutId) {
      clearTimeout(this.#timeoutId);
      this.#timeoutId = null;
    }

    for (const dragHandle of this.dragHandles) {
      dragHandle.removeEventListener("pointerdown", this.#dragMouseDown);
    }
  }
}

customElements.define(elemName, DraggableWindow);
