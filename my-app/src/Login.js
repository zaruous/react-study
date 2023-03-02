
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from "react";
import {
    Box,
    Button,
    Checkbox,
    Container,
    CssBaseline,
    FormControlLabel,
    Grid,
    Link,
    TextField
} from "@mui/material";
import {get} from "./api/Request";
import {saveStorage} from "./api/Storage";
const LoginHelper = require("./api/LoginHelper");

const theme = createTheme();

const Login = ({prop}) =>{

    /**
     *  화면에 사용자 정보를 보여주기 위한 처리. 데이터를 읽어오고 받아온 데이터를 세팅.
     * @type {(function(*): void)|*}
     */
    const getUserProfile = (token, prop)=>{
        if(!token) return;

        get("/api-service/oauth/userInfo", {
            "access_token" : token
        }, {
            "Access-Control-Allow-Credentials":true
        }, res =>
        {
            const data = res.data;
            console.log(data);
            saveStorage("data",JSON.stringify(data));

            if(prop.setProfileImg)
                prop.setProfileImg(data.properties.thumbnail_image);
            if(prop.setNickname)
                prop.setNickname(data.properties.nickname);
            //saveStorage("access_token", "");
        },err =>{
            console.log(err.message);
            //setStatus(`${err.message}`);

        });
    };

    const handleSubmit = (event)=>{
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    const callLoginPopupOnClick = () => {
        LoginHelper.kakaoLogin((accessToken)=>{
            getUserProfile(accessToken, prop);
            // window.location.href="./";
        });
    };

    return(
    <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

            <TextField
            margin="normal"
            required
            id="txtEmail"
            label="Email Address"
            autoComplete="email"
            autoFocus
            fullWidth
            >
            </TextField>
            <TextField
                margin="normal"
                required
                fullWidth
                id="txtPassword"
                label="Password"

            ></TextField>
            <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="ID 기억"
            />
            <Button
                margin="normal"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >로그인
            </Button>
            <Grid container
            justifyContent="space-between"
            >
                <Grid item >
                    <Link href="#" variant="body2">
                        비번찾기
                    </Link>
                </Grid>
                <Grid item >
                    <Link href="#" variant="body2">
                        {"회원가입"}
                    </Link>
                </Grid>
            </Grid>

            <button onClick={callLoginPopupOnClick}
                    style={btnLoginStyle}></button>
            </Box>
            </Box>
        </Container>
    </ThemeProvider>
 );
}

/*카카오 로그인 버튼 스타일 */
const btnLoginStyle = {
    backgroundImage: 'url(./images/kakao_login_medium_narrow.png)',
    width: '222px',
    height: '48px',
    border: 'none',
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    cursor: 'pointer',
    outline: 'none',
    marginTop: '10px',
    marginBottom: '10px',
};

export default Login;