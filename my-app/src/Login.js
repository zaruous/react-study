
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, {useContext} from "react";
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
import {get as RequestGet , post as RequestPost} from "./api/Request";
import {saveStorage, CONST_KEY_USER_INFO} from "./api/Storage";
import {UserInfo, UserInfoContext} from "./context/UserInfoContext";
const LoginHelper = require("./api/LoginHelper");


const theme = createTheme();

const Login = ({prop}) =>{
    const {userInfo, setUserInfo}= useContext(UserInfoContext);

    /**
     *  화면에 사용자 정보를 보여주기 위한 처리. 데이터를 읽어오고 받아온 데이터를 세팅.
     * @type {(function(*): void)|*}
     */
    const getUserProfile = (token, prop)=>{
        if(!token) return;

        RequestGet("/api-service/oauth/userInfo", {
            "access_token" : token
        }, {
            "Access-Control-Allow-Credentials":true
        }, res =>
        {
            const data = res.data;
            console.log(data);
            saveStorage("data",JSON.stringify(data));



            const changedUserInfo = {};
            changedUserInfo.email = data.kakao_account.email;
            changedUserInfo.profileImage = data.properties.thumbnail_image;
            changedUserInfo.nickName = data.properties.nickname;
            //setUserInfo(changedUserInfo);
            saveStorage(CONST_KEY_USER_INFO, JSON.stringify(changedUserInfo));
            /*
            if(prop)
            {
                if(prop.setProfileImg)
                    prop.setProfileImg(data.properties.thumbnail_image);
                if(prop.setNickname)
                    prop.setNickname(data.properties.nickname);
            }
            else{
                alert("prop is undefined.");
            }
            */
        },err =>{
            console.log(err.message);
        });
    };

    const handleSubmit = (event)=>{
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        RequestPost("/api-service/oauth/login"``, {
             email: data.get('txtEmail')
            ,userPwd : data.get('txtPassword')
        } , {} , (res)=>{
            console.log(res.data);
            alert("ok");
        }, (err)=>{
            alert(err);
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
            name="txtEmail"
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
                name="txtPassword"
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
                type="submit"
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
                    <Link href="/user/SignUp" variant="body2">
                        {"회원가입"}
                    </Link>
                </Grid>
            </Grid>

            <button
                    onClick={callLoginPopupOnClick}
                    type={"submit"}
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