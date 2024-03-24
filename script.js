let expenses = [];
let totalIncome = 0;
let totalExpenses = 0;
let incomes = [];
const expenseList = document.getElementById('expense-list');


let myChart;
let data = {
    labels: ['Total Income', 'Total Expense'],
    datasets: [{
        label: 'Income vs Expense',
        backgroundColor: ['#1cc88a', '#e74a3b'],
        // hoverBackgroundColor: "#858796",
        // borderColor: "#858796",
        data: [0,0],
    }],
};



// test

// var ctx = document.getElementById("BarChart");
// var myBarChart = new Chart(ctx, {
//   type: 'bar',
//   data: {
//     labels: ['Total Income', 'Total Expense'],
//     datasets: [{
//       label: ['Incomes', 'Expenses'],
//       backgroundColor: ['#1cc88a', '#e74a3b'],
//     //   hoverBackgroundColor: "#2e59d9",
//     //   borderColor: "#4e73df",
//       data: [0,0],
//     }],
//   },
//   options: {
//     maintainAspectRatio: false,
//     layout: {
//       padding: {
//         left: 10,
//         right: 25,
//         top: 25,
//         bottom: 0
//       }
//     },
//     scales: {
//       xAxes: [{
//         time: {
//           unit: 'month'
//         },
//         gridLines: {
//           display: false,
//           drawBorder: false
//         },
//         ticks: {
//           maxTicksLimit: 6
//         },
//         maxBarThickness: 25,
//       }],
//       yAxes: [{
//         ticks: {
//           min: 0,
//           max: 15000,
//           maxTicksLimit: 5,
//           padding: 10,
//           // Include a dollar sign in the ticks
//           callback: function(value, index, values) {
//             return '$' + number_format(value);
//           }
//         },
//         gridLines: {
//           color: "rgb(234, 236, 244)",
//           zeroLineColor: "rgb(234, 236, 244)",
//           drawBorder: false,
//           borderDash: [2],
//           zeroLineBorderDash: [2]
//         }
//       }],
//     },
//     legend: {
//       display: false
//     },
//     tooltips: {
//       titleMarginBottom: 10,
//       titleFontColor: '#6e707e',
//       titleFontSize: 14,
//       backgroundColor: "rgb(255,255,255)",
//       bodyFontColor: "#858796",
//       borderColor: '#dddfeb',
//       borderWidth: 1,
//       xPadding: 15,
//       yPadding: 15,
//       displayColors: false,
//       caretPadding: 10,
//       callbacks: {
//         label: function(tooltipItem, chart) {
//           var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
//           return datasetLabel + ': $' + number_format(tooltipItem.yLabel);
//         }
//       }
//     },
//   }
// });

// endtest



document.addEventListener('DOMContentLoaded', () => {
    updateChart();
});

function addExpense() {
    const amount = parseFloat(document.getElementById('amount').value);
    const source = document.getElementById('source').value;
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;
    expenseList.innerHTML = '';

    if (isNaN(amount) || source === '' || date === '') {
        alert('Please fill in all fields with valid values.');
        return;
    }

    const expense = {
        amount,
        source,
        category,
        date,
    };

    expenses.push(expense);
    updateExpenseTable("expense");
    updateBalance();
    clearInputFields();

    data.datasets[0].data[1] += expense.amount;
    updateChart();
}

function updateExpenseTable(check) {
    expenseList.innerHTML = '';
    const combinedData = expenses.concat(incomes);
    combinedData.forEach(data => {
        const row = document.createElement('tr');
        if (data.hasOwnProperty('amount')) {
            row.innerHTML = `
                <td>${-data.amount}</td>
                <td>${data.source}</td>
                <td>${data.category}</td>
                <td>${data.date}</td>
            `;
        } else if (data.hasOwnProperty('iAmount')) {
            row.innerHTML = `
                <td>${data.iAmount}</td>
                <td>${data.iSource}</td>
                <td>${data.iCategory}</td>
                <td>${data.iDate}</td>
            `;
        }
        expenseList.appendChild(row);
    });
}

function updateBalance() {
    totalIncome = incomes.reduce((total, income) => {
        return total + income.iAmount 
    }, 0);

    totalExpenses = expenses.reduce((total, expense) => {
        return total + expense.amount
    }, 0);

    const balanceAmount = totalIncome - totalExpenses;

    document.getElementById('totalIncome').innerText = totalIncome;
    document.getElementById('totalExpenses').innerText = totalExpenses;
    document.getElementById('balanceAmount').innerText = balanceAmount;

    

}

function clearInputFields() {
    document.getElementById('amount').value = '';
    document.getElementById('source').value = '';
    document.getElementById('category').value = 'Foods';
    document.getElementById('date').value = '';
}

function clearInputFields_income() {
    document.getElementById('iAmount').value = '';
    document.getElementById('iSource').value = '';
    document.getElementById('iDate').value = '';
}

function addIncome(){
    const iAmount = parseFloat(document.getElementById('iAmount').value);
    const iSource = document.getElementById('iSource').value;
    const iDate = document.getElementById('iDate').value;
    const iCategory = "income"
    expenseList.innerHTML = '';

    if (isNaN(iAmount) || iSource === '' || iDate === '') {
        alert('Please fill in all fields with valid values.');
        return;
    }
    const income = {
        iAmount,
        iSource,
        iDate,
        iCategory
    };

    incomes.push(income);
    updateExpenseTable("income");
    updateBalance();
    clearInputFields_income();

    data.datasets[0].data[0] += income.iAmount;
    updateChart();
}


//
document.addEventListener('DOMContentLoaded', () => {
    updateChart();
});

function updateChart() {
    if (myChart) {
        myChart.destroy();
    }
    myChart = new Chart("BarChart", {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
}
// 

  
