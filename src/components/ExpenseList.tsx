import { Card, Typography } from "@mui/material";
import type { Expense } from "../App"

export interface IExpenseListProps {
    expenses: Expense[]
}

export function ExpenseList(props: IExpenseListProps) {

    const expenseRows = props.expenses.map(expense => <tr><td>{expense.name}</td><td>{expense.sum}</td><td>{expense.description}</td></tr>);

    return (
            <Card sx={{marginTop: "24px", width: "100%", padding: "8px"}}>
        <Typography variant="h4">Cheltuieli</Typography>
        <table style={{maxWidth: "960px", marginInline: "auto", marginTop: "16px"}}>
         <tr>
            <td>Hikerist</td>
            <td>Suma platita</td>
            <td>Descriere</td>
         </tr>
         {expenseRows}
        </table>
        </Card>
    )
}