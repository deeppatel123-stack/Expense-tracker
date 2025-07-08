document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById("expense-form")
    const expenseName = document.getElementById("expense-name")
    const expenseAmount = document.getElementById("expense-amount")
    const expenseBtn = document.getElementById("expense-btn")
    const expenseDisplay = document.getElementById("expense-display")
    const totalDisplay = document.getElementById("total")

    let expenses = JSON.parse(localStorage.getItem("expenses")) || []

    displayExpense()

    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const name = expenseName.value
        const amount = parseFloat(expenseAmount.value)
        console.log(name, typeof amount);

        if (name !== "" && !isNaN(amount) && amount > 0) {
            const expenseObj = {
                id: Date.now(),
                name,
                amount
            }

            expenses.push(expenseObj)
            saveExpenseTotal()
            displayExpense()
            updateTotal()
            expenseName.value = ""
            expenseAmount.value = ""
        }
    })

    function displayExpense() {
        expenseDisplay.innerHTML = ""
        expenses.forEach(expense => {
            const expenseDiv = document.createElement("div")
            expenseDiv.innerHTML = ""
            expenseDiv.classList.add("expense-item")

            expenseDiv.innerHTML = `
                <span>${expense.name} - $${expense.amount}</span>
                <button class="delete-btn" data-id="${expense.id}">Delete</button>
        `;
            expenseDisplay.appendChild(expenseDiv)
        })
        updateTotal()
    }

    function calculateTotal() {
        return expenses.reduce((sum, expense) => (sum + expense.amount), 0)
    }

    function saveExpenseTotal() {
        localStorage.setItem("expenses", JSON.stringify(expenses))
    }

    function updateTotal() {
        totalAmount = calculateTotal()
        totalDisplay.textContent = "Total: $" + totalAmount.toFixed(2);
    }

    expenseDisplay.addEventListener("click", (e) => {
        if(e.target.tagName === 'BUTTON') {
            const expenseId = parseInt(e.target.getAttribute("data-id"))
            expenses = expenses.filter(expense => expense.id !== expenseId)
            saveExpenseTotal()
            displayExpense()
            updateTotal()
        }
    })
})