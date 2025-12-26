import { useState } from 'react'
import './App.css'
import { Participants } from './components/Participants'
import { ExpenseAdder } from './components/ExpenseAdder'
import { ExpenseList } from './components/ExpenseList'
import { Balances, type BalancePerPerson } from './components/Balances'
import { Settlements } from './components/Settlements'
import { Footer } from './components/Footer'

export interface Expense {
  name: string,
  sum: number,
  description: string
}

function App() {

  const [participants, setParticipants] = useState<string[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [balances, setBalances] = useState<BalancePerPerson[]>([])

  function onAddParticipant(participant: string) {
   setParticipants([...participants, participant])
    console.log("Added participant " + participant);
  }

  function onDeleteParticipant(participant: string) {
    const currentParticipants = participants.filter(tempParticipant => tempParticipant != participant);
    setParticipants(currentParticipants);
  }

  function onAddExpense(expensePerson: string, expenseSum: string, expenseDescription: string) {
    setExpenses([...expenses, {name: expensePerson, sum: Number(expenseSum), description: expenseDescription}]);
  }

   function onSetBalances(calculatedBalances: BalancePerPerson[]) {
    setBalances([...calculatedBalances]);
  }

  return (
    <>
    <h1>Bine ati venit la HBS (Hikereala bill splitter) !</h1>
    <Participants onAddParticipant={onAddParticipant} participantList={participants} onDeleteParticipant={onDeleteParticipant}/>
    <ExpenseAdder participantList={participants} onAddExpense={onAddExpense}/>
    <ExpenseList expenses={expenses}/>
    <Balances expenses={expenses} onSetBalances={onSetBalances}/>
    <Settlements expenses={expenses}/>
    <Footer/>
     </>
  )
}

export default App
