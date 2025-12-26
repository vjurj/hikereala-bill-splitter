import type { Expense } from "../App"

export interface IBalancesProps {
    expenses: Expense[],
    onSetBalances: any
}

export interface BalancePerPerson {
    name: string,
    balance: number
}

export function calculateBalances(expenses: Expense[]) {
    let totalSum = 0;
    let balances: BalancePerPerson[] = [];

    for (const expense of expenses) {
        const foundBalance = balances.find(balance => balance.name == expense.name);

        if (!foundBalance) {
            balances.push({name: expense.name, balance: expense.sum})
        }
        else {
            const newBalance: BalancePerPerson = {name: foundBalance.name, balance: foundBalance.balance + expense.sum};
            
            const updatedBalances = balances.map(balance => {
                if (balance.name == expense.name) {
                    return newBalance;
                }
                else {
                    return balance;
                }
            })

            balances = updatedBalances;
        }
       
        totalSum += expense.sum;
    }

    const sumPerPerson = totalSum / balances.length;

   const updatedBalances = balances.map(balance => {
    const newBalance: BalancePerPerson = {name: balance.name, balance: balance.balance - sumPerPerson};
    return newBalance;
});

    return updatedBalances;
}

export function Balances(props: IBalancesProps) {

    const calculatedBalances = calculateBalances(props.expenses);

    // props.onSetBalances(calculatedBalances);

    return(
        <>
        <h1>Solduri (pozitiv = de primit, negativ = de platit)</h1>
        <table>
               <tr>
            <td>Hikerist</td>
            <td>Suma platita</td>
            <td>Sold</td>
         </tr>
       {calculatedBalances.map(calculatedBalance => {
        if (calculatedBalance.balance < 0) {
            return  <p style={{color: "red"}}>{calculatedBalance.name} : {calculatedBalance.balance}</p>
        }
        else {
              return <p style={{color: "green"}}>{calculatedBalance.name} : {calculatedBalance.balance}</p>
        }
})}
        </table>
        </>
    )
}