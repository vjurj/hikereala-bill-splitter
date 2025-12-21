import type { Expense } from "../App"

export interface IExpenseListProps {
    expenses: Expense[]
}

export function ExpenseList(props: IExpenseListProps) {

    const expenseRows = props.expenses.map(expense => <tr><td>{expense.name}</td><td>{expense.sum}</td><td>{expense.description}</td></tr>);

    return (
        <>
        <h1>Expenses</h1>
        <table>
         <tr>
            <td>Hikerist</td>
            <td>Suma platita</td>
            <td>Descriere</td>
         </tr>
         {expenseRows}
        </table>
        </>
    )
}