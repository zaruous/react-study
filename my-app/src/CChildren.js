
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from "react";
import Login from "./Login";
import Typography from "@mui/material/Typography";
import {Container} from "@mui/material";


const theme = createTheme();
const CChildren  = ({props})=>{
    const imgSrc = {
        width:"35%"
    }
    return(
        <ThemeProvider  theme={theme}>
            <Container  maxWidth="xl">
            <Typography variant="h3" mb={1}>
                어서 오시게
            </Typography>
                <img src="./images/KakaoTalk_20230215_121440816.jpg" alt="img1" style={imgSrc}  />
            <Login {...props}></Login>
            </Container>
        </ThemeProvider>
    );

}
export default CChildren;

