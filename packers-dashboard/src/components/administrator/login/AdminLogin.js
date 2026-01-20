import React, { useState } from 'react';
import { Avatar, Box, Button,CssBaseline, Grid, Paper, TextField, Typography } from '@mui/material';
import { Link } from '@mui/material';
import { Lock } from '@mui/icons-material';
import { postData } from '../../../services/ServerServices';
import { useNavigate } from 'react-router';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Gmart Pvt Ltd
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function AdminLogin() {
    const navigate = useNavigate();
    const initialState = 
    {
        "userid": "",
        "password":"",
        "status":"Approved"
    }
      
    const [formData,setFormData]=useState(initialState);
    const {userid,password} = formData;
    const [error,setError] = useState({});
    
    const handleChange= (key,value) => {
        setFormData((prev)=>({...prev,[key]:value}))
    }

    const handleError=(key,message)=>{
        setError((prev)=>({...prev,[key]:message}))
    }

    const validateAll=()=>{
        let isValid = true;
        if(!userid){
            isValid = false;
            handleError("userid","Please enter a valid user id");
        }
        if(!password){
            isValid=false;
            handleError("password","Please enter a correct password");
        }
        return isValid;
    }
    const handleLogin= async()=>{
        if(validateAll()){
            const payload={
                "userid": userid,
                "password":password,
              }
              try {
                alert("now checking credentials!");
                const response = await postData("company/auth-login",payload);
                // console.log("id",response.data.data[0].companyid)
                // console.log("status",response.status)
                const companyid = response.data.data[0].companyid;
                navigate("/dashboard",{state:{"companyid":companyid}});
              }
              catch(err) {
                alert("error");
                console.log("error while logging in, inside catch block: ",err)
              }

        }else{
            alert("check all inputs")
        }
    }

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://picsum.photos/800/600)', // Fetch random placeholder images
          backgroundRepeat: 'no-repeat',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            margin: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <Lock />
          </Avatar>
          <Typography component="h1" variant="h5">
            Company Log in
          </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="userid"
              label="Email / Mobile"
              name="userid"
              autoComplete="userid"
              autoFocus
              value={userid}
              onChange={(event)=>handleChange("userid",event.target.value)}
              error={error.userid}
              helperText={error.userid}
              onFocus={()=>handleError("userid","")}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(event)=>{handleChange("password",event.target.value)}}
              error={error.password}
              helperText={error.password}
              onFocus={()=>handleError("password","")}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Sign In
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </Box>
      </Grid>
    </Grid>
  );
}
