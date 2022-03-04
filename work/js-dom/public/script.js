"use strict";

(function () {
  const allItems = [
    {
      name: "Chair",
      quantity: 2,
    },
    {
      name: "Table",
      quantity: 1,
    },
    {
      name: "Lamp",
      quantity: 1,
    },
    {
      name: "Book",
      quantity: 3,
    },
  ];

  const listEl = document.querySelector("#all-inventory .stock");
  const inputEl = document.querySelector("#all-inventory input");
  const buttonEl = document.querySelector("#all-inventory .add");

  addAbilityToAddItems();
  addAbilityToIncreaseQuantity();
  addAbilityToDecreaseQuantity();
  addAbilityToDeleteItems();
  disableButtonIfNoInput();

  render(allItems);

  function render(items) {
    const html = items
      .map((item, index) => {
        if (item.quantity > 0) {
          return `
            <li>
              <button class="decrease" data-index="${index}" id="${item.name}" enabled> - </button>
              <span data-index="${index}"> ${item.name} : ${item.quantity} </span>
              <button class="increase" data-index="${index}"> + </button>
              <button class="delete" data-index="${index}">X</botton>
            </li>
          `;
        } else {
          return `
            <li>
              <button class="decrease" data-index="${index}" id="${item.name}" disabled> - </button>
              <span data-index="${index}"> ${item.name} : ${item.quantity} </span>
              <button class="increase" data-index="${index}"> + </button>
              <button class="delete" data-index="${index}">X</button>
            </li>
          `;
        }
      })
      .join("");

    listEl.innerHTML = html;
    buttonEl.disabled = !inputEl.value;
  }

  function addAbilityToAddItems() {
    buttonEl.addEventListener("click", (e) => {
      const newItem = {
        name: inputEl.value,
        quantity: 0,
      };

      allItems.push(newItem);
      inputEl.value = "";
      render(allItems);
    });
  }

  function addAbilityToIncreaseQuantity() {
    listEl.addEventListener("click", (e) => {
      if (e.target.classList.contains("increase")) {
        const index = e.target.dataset.index;
        allItems[index].quantity++;
        render(allItems);
      } else {
        return;
      }
    });
  }

  function addAbilityToDecreaseQuantity() {
    {
      listEl.addEventListener("click", (e) => {
        if (e.target.classList.contains("decrease")) {
          const index = e.target.dataset.index;
          allItems[index].quantity--;
          render(allItems);
        } else {
          return;
        }
      });
    }
  }

  function addAbilityToDeleteItems() {
    listEl.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete")) {
        const index = e.target.dataset.index;
        allItems.splice(index, 1);
        render(allItems);
      } else {
        return;
      }
    });
  }

  function disableButtonIfNoInput() {
    inputEl.addEventListener("input", () => {
      if (!inputEl.value) {
        buttonEl.disabled = true;
      } else {
        buttonEl.disabled = false;
      }
    });
  }
})();
