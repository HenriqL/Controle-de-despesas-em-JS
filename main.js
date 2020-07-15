const transactionUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')



const localStorageTransactions = JSON.parse(localStorage
    .getItem('transactions'))
let transactions = localStorage
    .getItem('transactions') !==null ? localStorageTransactions : []

const removeTransaction = ID =>{
    transactions = transactions.filter(transaction => 
        transaction.id !== ID)
        updateLocalStorage()
    init()
}
const addTrasactionIntoDom = transaction =>{
    const operator = transaction.amount <0 ? '-': '+'
    const CSSclass = transaction.amount <0 ? 'minus' : 'plus'
    const amountWithoutOperator = Math.abs(transaction.amount)
    const li = document.createElement('li')
    li.classList.add(CSSclass)
    li.innerHTML = `
    ${transaction.name} <span> ${operator} R$ ${amountWithoutOperator} </span>
    <button class="delete-btn" onClick="removeTransaction(${transaction.id})">x</button>
    `
    transactionUl.append(li)    
}

const updateBalanceValues = () =>{
    const transactionsAmounts = transactions
        .map(transaction => transaction.amount)
    const total = transactionsAmounts
        .reduce((accumulator, transaction) => accumulator + transaction, 0)
        .toFixed(2)
    const income = transactionsAmounts
        .filter(value => value > 0 )
        .reduce((accumulator, value) => accumulator + value, 0)
        .toFixed(2)
    const expense = Math.abs(transactionsAmounts
        .filter(value => value < 0)
        .reduce((accumulator, value) => accumulator + value,0))
        .toFixed(2)
    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`


}
//Atualiza as transações na tela. Fazendo com que as novas sejam exibidas 
const init = () =>{
    transactionUl.innerHTML = ''
    transactions.forEach(addTrasactionIntoDom)
    updateBalanceValues()

}
init()

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}
//Gera um ID aleatorio entre 1 e 1000 
const generateID = () => Math.round(Math.random() *1000)
form.addEventListener('submit', event =>{
    //Impede que o formulario seja enviado, o que faria a pagina regarregar
    event.preventDefault() 
    //Cria os valores que serão inseridos nos inputs
    const transactionName = inputTransactionName.value.trim()
    const transactionAmount = inputTransactionAmount.value.trim()
    //Exibe uma mensagem na tela, caso algum dos campos não tiver sido preenchido
    if( transactionName === '' || transactionAmount === ''){
        alert("Por favor, preencha os campos")
        return
    }
    //Cria toda a estrutura da transação, resgatando o id, name e valor 
    const transaction = {
        id: generateID(),
        name: transactionName,
        amount: Number(transactionAmount)
    }

    transactions.push(transaction)
    init()
    updateLocalStorage()
    //Limpa os inputs, fazendo com que os valores não seja duplicados a cada nova transação 
    inputTransactionName.value = ''
    inputTransactionAmount.value = ''
})















