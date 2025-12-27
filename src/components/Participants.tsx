import { Button, Card, Chip, TextField, Typography } from "@mui/material"
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
        props.onDeleteParticipant(chipToDelete)
    }

    return (
       <Card sx={{marginTop: "24px", padding: "8px"}}>
        <Typography variant="h4" >Hikeristii participanti</Typography>
        <TextField onChange={(event) => setParticipantToAdd(event.target.value)} value={participantToAdd} size="small"></TextField>
        <Button onClick={() => props.onAddParticipant(participantToAdd)}variant="contained">Adauga hikeristul/hikerista</Button>
        <div>
            {props.participantList.map(participant => <Chip sx={{margin: "4px"}} color="info" label={participant} onDelete={() => handleDelete(participant)}></Chip>)}
        </div>
        {/* <Typography>Fiecare isi va primi/plati partea, chiar daca nu a cumparat nimic</Typography> */}
        </Card>
    )
}