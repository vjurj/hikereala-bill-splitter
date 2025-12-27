import { Card, Stack, Typography } from "@mui/material";
import type { Expense } from "../App"
import PaymentsIcon from '@mui/icons-material/Payments';

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

    return(
        <Card sx={{marginTop: "24px", padding: "8px"}}>
           <Stack gap={2} sx={{maxWidth: "480px", marginInline: "auto"}}>
            <Stack direction="row" gap={2}>
            <PaymentsIcon fontSize="large"></PaymentsIcon>
            <Typography variant="h4">Solduri (pozitiv = de primit, negativ = de platit)</Typography>
        </Stack>
        <table style={{maxWidth: "960px", marginTop: "16px"}}>
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
        </Stack>
        </Card>
    )
}