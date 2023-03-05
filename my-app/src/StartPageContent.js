
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, {useCallback, useContext} from "react";
import Login from "./Login";
import Typography from "@mui/material/Typography";
import {Container} from "@mui/material";
import {UserInfoContext} from "./context/UserInfoContext";
import {getStorage, CONST_KEY_USER_INFO} from "./api/Storage";

const theme = createTheme();
const StartPageContent  = ({prop})=>{

    const imgSrc = {
        width:"35%"
    }
    const isLogin = useCallback(()=>{
        const storageUserInfo = getStorage(CONST_KEY_USER_INFO);
        if(!storageUserInfo) return false;
        const userInfo = JSON.parse(storageUserInfo);
        const ret = (userInfo ? userInfo.email : false);
        return ret;
    }, []);


    return(
        <ThemeProvider  theme={theme}>
            <Container  maxWidth="xl">
            <Typography variant="h3" mb={1}>
                자네 왔는가?
            </Typography>
                <img src="./images/KakaoTalk_20230215_121440816.jpg" alt="img1" style={imgSrc}  />
            {(!isLogin() && <Login prop={{...prop}}></Login>)}
            </Container>
            <Typography variant="h5" mb={1}>
                어서 오시게.
            </Typography>
        </ThemeProvider>
    );

}
export default StartPageContent;

