import { Button, Chip, TextField } from "@mui/material"
import { useState } from "react"

export interface IParticipantsProps {
    participantList: any[]
    onAddParticipant: any,
    onDeleteParticipant: any
}
export function Participants(
    props: IParticipantsProps
) {
    const [participantToAdd, setParticipantToAdd] = useState<string>();

    function handleDelete(chipToDelete: any) {
        alert("deleted " + chipToDelete);
        props.onDeleteParticipant(chipToDelete)
    }

    return (
        <>
        <h1>Hikeristii participanti</h1>
        <TextField onChange={(event) => setParticipantToAdd(event.target.value)} value={participantToAdd} size="small"></TextField>
        <Button onClick={() => props.onAddParticipant(participantToAdd)}variant="contained">Adauga hikeristul/hikerista</Button>
        <div>
            {props.participantList.map(participant => <Chip label={participant} onDelete={() => handleDelete(participant)}></Chip>)}
        </div>
        <p>Fiecare isi va primi/plati partea, chiar daca nu a cumparat nimic</p>
        </>
    )
}