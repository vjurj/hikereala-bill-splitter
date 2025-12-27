import { Card, Typography } from "@mui/material";
import type { Expense } from "../App";
import { calculateBalances, type BalancePerPerson } from "./Balances"

export interface ISettlementsProps {
    expenses: Expense[]
}

export interface ISettlement {
    sender: string,
    receiver: string,
    sum: number
}

export function Settlements(props: ISettlementsProps) {
    const balances = calculateBalances(props.expenses);

    let settlements: ISettlement[];

    if (balances.length == 0) {
        settlements = []
    }
    else {
       settlements = calculateSettlements(balances);
    }

    const settlementRows = settlements.map(settlement => {return <tr><td>{settlement.sender}</td><td>{settlement.receiver}</td><td>{settlement.sum}</td></tr>}); 
    
    
    return (
    <Card sx={{marginTop: "24px", padding: "8px"}}>
        <Typography variant="h4">Plati sugerate</Typography>
            <table style={{maxWidth: "960px", marginInline: "auto", marginTop: "16px"}}>
            <tr>
                <td>Hikerist platitor</td>
                <td>Hikerist primitor</td>
                <td>Suma</td>
            </tr>
            {settlementRows}
        </table>
    </Card>
    )
}

function calculateSettlements(balances: BalancePerPerson[]) {
    let settlements: ISettlement[] = [];

    balances.sort((balanceA, balanceB) => balanceA.balance - balanceB.balance);

    const debtors = balances.filter(balance => balance.balance < 0);
    const creditors = balances.filter(balance => balance.balance > 0);

      let i = 0, j = 0;

      while (i < debtors.length && j < creditors.length) {
        let debtor = debtors[i];
        let creditor = creditors[j];
        let debtorAmount = -debtor.balance;
        let creditorAmount = creditor.balance;

        const payment = Math.min(-debtor.balance, creditor.balance);
        if (payment >= 0.01) {
          settlements.push({ sender: debtor.name, receiver: creditor.name, sum: payment } as ISettlement);
          debtorAmount = debtorAmount - payment;
          creditorAmount = creditorAmount - payment;
        }

        if (debtorAmount == 0 ) {
            i++;        
        }
        else { 
            debtors[i].balance = debtorAmount;
        }

          if (creditorAmount == 0 ) {
            j++;        
        }
        else { 
            creditors[j].balance = creditorAmount;
        }
        
      }

    return settlements;
}
