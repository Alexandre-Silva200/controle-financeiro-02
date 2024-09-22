const tbody = document.querySelector("tbody");
const descItem = document.querySelector("#desc");
const amount = document.querySelector("#amount");
const typy = document.querySelector("#type");
const btnNew = document.querySelector("btnNew");

const incomes = document.querySelector(".incomes");
const  expenses = document.querySelector(".expenses");
const total = document.querySelector(".total");

let items;

btnNew.onclick = () => {
    if(descItem.value === "" || amount.value === "" || type === ""){
        return alert("preencha todos os campos!")
    }

    items.push({
        desc: descItem.value,
        amount: math.abs(amount.value).toFixed(2),
        type; type.value,
    });
};

function deleteItem(index) {
    items.splice(index, 1);
    setItensBD();
    loadItens();
}

function insertItem(item, index) {
    let tr = document.createElement("tr");

    tr.innerHTML = `
    <td>${item.amount}</td>
    <td class="columnType>${
        item.type === "Entrada"
        ? '<i class="bi bi-arrow-up-short"></i>'
        : '<i class="bi bi-arrow-down-short"></i>'
    }</td>
    <td class="columnAction>
        <but onclick="deleteItem(${index})"><i class="bi bi-trash3"></i>"</button>
    </td>
    `;

    tbody.appendChild(tr);
}

function loadItens() {
 items = getItensBD();
 tbody.innerHTML = "";
 items.forEach((item, index) => {
    insertItem(item, index);
 });

 getTotals();

 function getTotals() {
    const amountIncomes = items 
        .filter((item) => item.type === "Entrada")
        .map((transaction) => Number(transaction.amount));

        const amountExpenses = items
        .filter((item) => item.type === "Saida")
        .map((transaction) => Number(transaction.amount));

        const totalIncomes = amountIncomes
        .reduce((acc, cur) => acc + cur, 0)
        .toFixed(2);

        const totalExpenses = math.abs(
            amountExpenses.reduce((acc, cur) => acc + cur, 0)
        ).toFixed(2);

        const totalItems = (totalIncomes - totalExpenses).toFixed(2);

        incomes.innerHTML = totalIncomes;
        expenses.innerHTML = totalExpenses;
        total.innerHTML = totalItems;
 }
}

const getItensBD = () => JSON.parse(localStorage.getItem("db_items"))  ?? [];
const setItensBD = () =>
    localStorage.setItem("db_items", JSON.stringify(items));

loadItens();