import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useRef} from "react";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="/">
                KYJ
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignUp() {

    const txtUserName = useRef(null);
    const txtEmail = useRef(null);
    const txtPassword = useRef(null);
    const txtPassword2 = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();


        if(!txtUserName.current.value )
        {
            alert("이름이 비어있습니다.");
            txtUserName.current.focus();
            return;
        }
        if(!txtEmail.current.value )
        {
            alert("메일 주소가 비어있습니다.");
            txtEmail.current.focus();
            return;
        }
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!txtEmail.current.value.match(regex))
        {
            alert("메일 주소 형식이 올바르지 않습니다.");
            txtEmail.current.focus();
            return;
        }

        if(!txtPassword.current.value )
        {
            alert("비밀번호가 비어있습니다.");
            txtPassword.current.focus();
            return;
        }
        if(!txtPassword2.current.value )
        {
            alert("비밀번호가 비어있습니다.");
            txtPassword2.current.focus();
            return;
        }

        if(txtPassword.current.value !== txtPassword2.current.value){
            alert("비밀번호가 일치하지않습니다.");
            txtPassword2.current.focus();
            return;
        }


        const data = new FormData(event.currentTarget);


        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="txtName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="닉네임"
                                    autoFocus

                                    inputRef={txtUserName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="메일 주소"
                                    name="email"
                                    autoComplete="email"
                                    inputRef={txtEmail}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="txtPassword"
                                    label="비밀번호"
                                    type="password"
                                    id="txtPassword"
                                    autoComplete="new-password"
                                    inputRef={txtPassword}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="txtPassword2"
                                    label="비밀번호 확인"
                                    type="password"
                                    id="txtPassword2"
                                    autoComplete="new-password"
                                    inputRef={txtPassword2}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}