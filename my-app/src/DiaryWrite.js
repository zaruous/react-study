import {Button, Container, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import "./DiaryWrite.css"
import {useEffect, useRef, useState} from "react";

function getCurrentDate() {
    // Create a new Date object with the current date and time
    const now = new Date();

    // Get the year, month, and day values from the Date object
    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const day = ('0' + now.getDate()).slice(-2);

    // Concatenate the year, month, and day values into a string with the yyyy-MM-dd format
    const dateString = year + '-' + month + '-' + day;

    // Return the formatted date string
    return dateString;
}

function DiaryWrite(){

    const txtTitle = useRef(null);
    const txtDate = useRef(null);
    const txtContent = useRef(null);
    const [date, setDate] = useState("");

    useEffect(()=>{
        setDate(getCurrentDate());
    });

    const onSaveClick = ()=>{
        console.log(txtTitle.current.value);

        if(!txtTitle.current.value)
        {
            alert("title is empty.");
            return;
        }

        if(!isValidDate(txtDate.current.value))
        {
            alert("invalid date format.");
            return;
        }
    };



    return(
        <Container maxWidth="lg">
            <Box className="diray-container-box" >
                <div style={{display:"flex"}}>
                <TextField
                    variant="outlined"
                    className="diary-write-title"
                    label="Title"

                    inputRef={txtTitle}
                />
                <TextField
                    variant="outlined"
                    className="diary-write-date"
                    label="Date(yyyy-mm-dd)"
                    inputRef={txtDate}
                    value={date}
                    defaultValue={date}
                />
                </div>
                <hr/>
                <TextField
                    className="diary-wirte-content"
                    fullWidth
                    label="Content"
                    multiline
                    rows={20}

                    ariant="standard"
                    inputRef={txtContent}
                />
                <hr/>
                <Button variant={"contained"} onClick={onSaveClick}>저장</Button>
            </Box>
        </Container>
    );
}




function isValidDate(inputText) {
    // Regular expression to match yyyy-MM-dd format
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    if (!regex.test(inputText)) {
        // Input does not match expected format
        return false;
    }

    // Parse input text as a date to check if it is a valid date
    const date = new Date(inputText);
    if (isNaN(date.getTime())) {
        // Input is not a valid date
        return false;
    }

    // Input is valid
    return true;
}

export default DiaryWrite;