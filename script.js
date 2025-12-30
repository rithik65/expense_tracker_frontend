const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const type = document.getElementById("type");
const list = document.getElementById("list");

const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const balanceEl = document.getElementById("balance");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

form.addEventListener("submit", e => {
    e.preventDefault();

    let value = Number(amount.value);
    if (type.value === "expense") value = -value;

    transactions.push({
        id: Date.now(),
        text: text.value,
        amount: value
    });

    updateLocalStorage();
    init();

    text.value = "";
    amount.value = "";
});

function updateValues() {
    let income = 0, expense = 0;

    transactions.forEach(t => {
        if (t.amount > 0) income += t.amount;
        else expense += t.amount;
    });

    incomeEl.innerText = `₹${income}`;
    expenseEl.innerText = `₹${Math.abs(expense)}`;
    balanceEl.innerText = `₹${income + expense}`;
}

function addToDOM(t) {
    const li = document.createElement("li");
    li.className = t.amount > 0 ? "income" : "expense";

    li.innerHTML = `
        ${t.text}
        <span>₹${Math.abs(t.amount)}</span>
        <button class="delete" onclick="removeTransaction(${t.id})">Delete</button>
    `;

    list.appendChild(li);
}

function removeTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    updateLocalStorage();
    init();
}

function updateLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function init() {
    list.innerHTML = "";
    transactions.forEach(addToDOM);
    updateValues();
}

init();
