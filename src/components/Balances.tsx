import { Card, Typography } from "@mui/material";
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
        <Card sx={{marginTop: "24px", width: "100%", padding: "8px"}}>
            <Typography variant="h4">Solduri (pozitiv = de primit, negativ = de platit)</Typography>
        <table style={{maxWidth: "960px", marginInline: "auto", marginTop: "16px"}}>
               <tr>
            <td>Hikerist</td>
            <td>Sold</td>
         </tr>
       {calculatedBalances.map(calculatedBalance => {
        if (calculatedBalance.balance < 0) {
            return  <tr><td>{calculatedBalance.name}</td><td className="negative-balance">{calculatedBalance.balance}</td></tr>
        }
        else {
              return <tr><td>{calculatedBalance.name}</td><td className="positive-balance">{calculatedBalance.balance}</td></tr>
        }
})}
        </table>
        </Card>
    )
}