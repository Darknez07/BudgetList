//Using Classes
class Budget{
    constructor(budget){
        this.budget = Number(budget);
        this.leftBudget = this.budget;
    }
    TrackBdg(amount){
        return this.leftBudget-= amount;
    }
    addBdg(amount)
    {
        return this.leftBudget+= Number(amount);
    }
}

class HTML{
    insertBudget(amount){
        totalBudget.innerHTML = amount.budget; 
        leftBudget.innerHTML = amount.leftBudget;
    }
    printMessg(message,clname)
    {
        const enterdung = document.createElement('div');
        enterdung.classList.add('text-center','alert',clname);
        enterdung.appendChild(document.createTextNode(message));

        document.querySelector('.primary').insertBefore(enterdung,addExpenseform);
        setTimeout(function(){
            document.querySelector('.primary .alert').remove();
            //addExpenseform.reset();
        },3000);
    }
    addExpenseformtoList(name,amount){
        const expenseList = document.querySelector('#expenses ul');

        //Create Li
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = name+'<span class="badge badge-primary badge-pill"> $'+amount+'</span>';

        //Insert into HTML
        expenseList.appendChild(li);
    }
    trackBudget(amount){
        const left = budget.TrackBdg(amount);
        leftBudget.innerHTML = left;

        if(((budget.budget)/4) > left)
        {
            leftBudget.parentElement.parentElement.classList.remove('alert-success','alert-warning');
            leftBudget.parentElement.parentElement.classList.add('alert-danger');
            html.printMessg('You have spent 75% of budget START SAVING','alert-danger');
        }
        if(((budget.budget)/2) > left)
        {
            leftBudget.parentElement.parentElement.classList.remove('alert-success');
            leftBudget.parentElement.parentElement.classList.add('alert-warning');
            html.printMessg('You must plan the Expenditure now.','alert-warning');
        }
    
    }
    addtoBudget(amount)
    {
        const added = budget.addBdg(amount);
        leftBudget.innerHTML = added;
    }
}
//Variables
const addExpenseform = document.querySelector('#add-expense');
        totalBudget = document.querySelector('span#total');
        leftBudget = document.querySelector('span#left');
let budget,userbudget;
const html = new HTML();
//Event Listener
eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded',function(){
        //How much can you spend in a week
        userbudget = prompt('What\'s your budget for the week.');
        if(userbudget === '0' || userbudget == null || userbudget === '' || isNaN(parseInt(userbudget)))
        {
            window.location.reload();
        }
        else
        {
            budget = new Budget(userbudget);
            html.insertBudget(budget); 
        }
    });

    addExpenseform.addEventListener('submit',function(input){
        input.preventDefault();
        const expense = document.querySelector('#expense').value;
        const amount = document.querySelector('#amount').value;
        const addAmount = document.querySelector('#addition').value;
        console.log(addAmount);
        if((expense === '' || amount === '') && addAmount === '')
        {
            html.printMessg('Error Occured, All values are Required!!! OR Add in the Budget','alert-danger');
        }
        else if(addAmount && (expense === '' || amount === ''))
        {
            html.addtoBudget(addAmount);
            html.printMessg('Increased the Budget','alert-success');
        }
        else if(addAmount && (expense !== '' || amount !== ''))
        {
            html.addtoBudget(addAmount);
            html.printMessg('Increased the Budget','alert-success');
            html.addExpenseformtoList(expense,amount);
            html.trackBudget(amount);
            html.printMessg('Added to List','alert-success');
        }
        else
        {
            html.addExpenseformtoList(expense,amount);
            html.trackBudget(amount);
            html.printMessg('Added to List','alert-success');
        }
    });
}