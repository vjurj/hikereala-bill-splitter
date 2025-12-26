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
    <>
        <h1>Plati sugerate</h1>
        <table>
            <tr>
                <td>Hikerist platitor</td>
                <td>Hikerist primitor</td>
                <td>Suma</td>
        {settlementRows}
            </tr>
        </table>
    </>
    )
}

function calculateSettlements(balances: BalancePerPerson[]) {
    let allDuesPaid = false;
    let settlements: ISettlement[] = [];

    balances.sort((balanceA, balanceB) => balanceA.balance - balanceB.balance);

    while(!allDuesPaid) {
        const currentHighestPayer = balances[0];
        const currentHighestReceiver = balances[balances.length - 1];

        if (currentHighestPayer.name == currentHighestReceiver.name) {
            allDuesPaid = true;
            break;
        }

         let toSubtract = 0;

        if (currentHighestPayer.balance >= -currentHighestReceiver.balance) {
            toSubtract = currentHighestPayer.balance;
        }
        else {
            toSubtract = currentHighestReceiver.balance;
        }

        const recalculatedBalances: BalancePerPerson[]  = balances.map(newBalance => {
            if (newBalance.name == currentHighestReceiver.name) {
                return {name: newBalance.name, balance: newBalance.balance + toSubtract} as BalancePerPerson; 
            }
            else {
               

                if (newBalance.name == currentHighestPayer.name){
                    settlements.push({sender: currentHighestPayer.name, receiver: currentHighestReceiver.name, sum: -toSubtract})
                    return {name: newBalance.name, balance: newBalance.balance - toSubtract} as BalancePerPerson
                }
                
                if (newBalance.name == currentHighestReceiver.name) {
                    return {name: newBalance.name, balance: newBalance.balance - toSubtract} as BalancePerPerson    
                }

                

                return {name: "", balance: 3} as BalancePerPerson
            }
        })

        return settlements;
    }

    return settlements;
}
