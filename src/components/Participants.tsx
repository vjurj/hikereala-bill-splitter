import { Button, Card, Chip, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react"
import GroupsIcon from '@mui/icons-material/Groups';

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
         <Stack sx={{maxWidth: "480px", marginInline: "auto"}} direction="column" spacing={2} overflow={"auto"} >
        <Stack direction="row" gap={2}>
             <GroupsIcon fontSize="large"></GroupsIcon>
             <Typography variant="h4">Hikeristi participanti</Typography>
        </Stack>
    
        <Stack sx={{justifyContent: "space-between"}} direction="row" spacing={2}>
        <TextField margin="normal"  onChange={(event) => setParticipantToAdd(event.target.value)} value={participantToAdd} size="small"></TextField>
        <Button onClick={() => props.onAddParticipant(participantToAdd)}variant="contained">Adauga</Button>
        </Stack>
        <Stack direction="row" spacing={2}>
        <div>
            {props.participantList.map(participant => <Chip sx={{margin: "4px"}} color="info" label={participant} onDelete={() => handleDelete(participant)}></Chip>)}
        </div>
        </Stack>
        </Stack>
        </Card>
    )
}