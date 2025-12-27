import { Card, Stack, Typography } from "@mui/material";
import type { Expense } from "../App"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export interface IExpenseListProps {
    expenses: Expense[]
}

export function ExpenseList(props: IExpenseListProps) {

    const expenseRows = props.expenses.map(expense => <tr><td>{expense.name}</td><td>{expense.sum}</td><td>{expense.description}</td></tr>);

    return (
            <Card sx={{marginTop: "24px", padding: "8px"}}>
        <Stack gap={2} sx={{maxWidth: "480px", marginInline: "auto"}}>
            <Stack direction="row" gap={2}>
            <ShoppingCartIcon fontSize="large"></ShoppingCartIcon>
            <Typography variant="h4">Cheltuieli</Typography>
            </Stack>
        
        <table style={{marginTop: "16px"}}>
         <tr>
            <td>Hikerist</td>
            <td>Suma platita</td>
            <td>Descriere</td>
         </tr>
         {expenseRows}
        </table>
        </Stack>
        </Card>
    )
}