let totalAmount = 0;
const expenses = [];
let expenseNames = [];
let expenseAmounts = [];
let expenseChart;
let accountBalance = 0;

function updateBalance() {
    const balanceElement = document.getElementById('accountBalance');
    if (balanceElement) {
        balanceElement.textContent = accountBalance.toFixed(2);
    }
}

function deposit() {
    const amountInput = document.getElementById('amount');
    if (!amountInput) return; 

    const amount = parseFloat(amountInput.value);
    if (!isNaN(amount) && amount > 0) {
        accountBalance += amount;
        updateBalance();
        document.getElementById('balanceForm').reset(); } else {
        alert("Please enter a valid amount.");
    }
}

function withdraw() {
    const amountInput = document.getElementById('amount');
    if (!amountInput) return; 
    const amount = parseFloat(amountInput.value);
    if (!isNaN(amount) && amount > 0) {
        if (amount <= accountBalance) {
            accountBalance -= amount;
            updateBalance();
            document.getElementById('balanceForm').reset(); } else {
            alert("Insufficient funds.");
        }
    } else {
        alert("Please enter a valid amount.");
    }
}

const depositBtn = document.getElementById('depositBtn');
if (depositBtn) {
    depositBtn.addEventListener('click', deposit);
}

const withdrawBtn = document.getElementById('withdrawBtn');
if (withdrawBtn) {
    withdrawBtn.addEventListener('click', withdraw);
}

function updateChart() {
    const ctx = document.getElementById('expenseChart').getContext('2d');
    if (!expenseChart) {
        expenseChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: expenseNames,
                datasets: [{
                    label: 'Expenses',
                    data: expenseAmounts,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true
            }
        });
    } else {
        expenseChart.data.labels = expenseNames;
        expenseChart.data.datasets[0].data = expenseAmounts;
        expenseChart.update();
    }
}

function addExpense() {
    const nameInput = document.getElementById('expenseName');
    const amountInput = document.getElementById('expenseAmount');
    if (!nameInput || !amountInput) return; 
    const name = nameInput.value.trim().charAt(0).toUpperCase() + nameInput.value.trim().slice(1).toLowerCase();
    const amount = parseFloat(amountInput.value);
    if (name && !isNaN(amount) && amount > 0) {
        if (accountBalance - amount >= 0) {
            const existingExpense = expenses.find(expense => expense.name === name);

            if (existingExpense) {
                existingExpense.amount += amount;

                const existingExpenseIndex = expenseNames.indexOf(name);
                if (existingExpenseIndex !== -1) {
                    expenseAmounts[existingExpenseIndex] += amount;
                }
            } else {
                expenses.push({ name, amount });
                expenseNames.push(name);
                expenseAmounts.push(amount);
            }

            totalAmount += amount;
            accountBalance -= amount;
            updateBalance();
            document.getElementById('totalAmount').textContent = totalAmount.toFixed(2);

            renderExpenseList();
            updateChart();
            document.getElementById('expenseForm').reset();
        } else {
            alert('Insufficient Balance for this expense');
        }
    } else {
        alert('Please enter a valid name and a positive amount.');
    }
}

function renderExpenseList() {
    const expenseList = document.getElementById('expenseList');
    if (expenseList) {
        expenseList.innerHTML = '';
        expenses.forEach(expense => {
            const listItem = document.createElement('li');
            listItem.textContent = `${expense.name}: $${expense.amount.toFixed(2)}`;
            expenseList.appendChild(listItem);
        });
    }
}

const addExpenseBtn = document.getElementById('addExpenseBtn');
if (addExpenseBtn) {
    addExpenseBtn.addEventListener('click', addExpense);
}