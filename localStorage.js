"use strict";

const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];

/** Function to handle adding item to menu */
function addItem(evt) {
  evt.preventDefault();
  const text = (this.querySelector('[name=item]')).value;
  const item = {
    text,
    isChecked: false,
  };

  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items)); // can only put strings in localStorage
  this.reset();  // reset form
}

/** Handles updating the DOM */
function populateList(items = [], itemsList) {
  itemsList.innerHTML = items.map((item, i) => { // Need to change to innerText, potential security issue?
    return `
    <li>
    <input type="checkbox" data-index=${i} id="item${i}" ${item.isChecked ? 'checked' : ''}/>
    <label for="item${i}">${item.text}</label>
    </li>
    `;
  }).join('');
}

/** Handles checking */
function toggleChecked(evt) {
  if (!evt.target.matches('input')) return; // skip this unless it's an input
  const index = evt.target.dataset.index;
  items[index].isChecked = !items[index].isChecked; // flip value
  localStorage.setItem('items', JSON.stringify(items)); // can only put strings in localStorage
  populateList(items, itemsList);
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleChecked);
populateList(items, itemsList);
