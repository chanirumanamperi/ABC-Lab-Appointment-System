import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import Swal from 'sweetalert2';
import axios from 'axios';
import Config from '../../../Config';
import { TextField, Button, CircularProgress, Box, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function LoginComponent() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // New state

  const config = new Config();
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

  const audittraceCollectionRef = collection(db, "audittrace");

  const randomID = Math.floor(Math.random() * 1000000);

  const currentTime = new Date().toISOString();

  useEffect(() => {
    document.title = 'NestNet | SignIn';
  }, []);

  const handleLogin = async () => {
    setLoading(true);

    try {
      const response = await axios.post(config.baseUrl +'api/v1/login', {
        username: name,
        password: password,
      });
      console.log(response.data);
      console.log(response.data.data.token)
      console.log(response.data.data.userData.username)
      console.log(response.data.data.userData.userRole)
      sessionStorage.setItem('token', response.data.data.token)
      sessionStorage.setItem('fullName', response.data.data.userData.username)
      sessionStorage.setItem('systemid', response.data.data.userData.systemid)
      sessionStorage.setItem('userType', response.data.data.userData.userRole)
      sessionStorage.setItem('authStatus', 'true')
      // navigate('/admin', { replace: true });

      if (response.data.data.userData.flag===true) {
        sessionStorage.setItem('fullName', response.data.data.userData.username)
        sessionStorage.setItem('userType', response.data.data.userData.userRole)
        sessionStorage.setItem('email', response.data.data.userData.email)
        sessionStorage.setItem('name', response.data.data.userData.username)
        console.log("aaa"+response.data.data.userData.userRole);
        if(response.data.data.userData.userRole === "PATIENT"){
          console.log("PATIENT")
          navigate('/patient');
        }else if(response.data.data.userData.userRole === "DOCTOR"){
          navigate('/doctor');
        }else if(response.data.data.userData.userRole === "TECHNICIAN"){
          navigate('/technician');
        }else{
          navigate('/admin');
        }
      }else {
        Swal.fire({
          icon: 'error',
          title: 'Verification Needed',
          text: 'You need to verify your account. Please check your email.',
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Username or password invalid.',
      })
    }finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleForgotPassword = async () => {
    // const auth = getAuth();
    // try {
    //   await sendPasswordResetEmail(auth, email);
    //   Swal.fire('Success', 'Password reset email sent!', 'success');
    // } catch (error) {
    //   Swal.fire('Error', error.message, 'error');
    // }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <TextField 
        label="User Name" 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        disabled={loading}
        fullWidth
      />
      <TextField 
        label="Password" 
        type={showPassword ? "text" : "password"}  
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        disabled={loading}
        fullWidth
        sx={{ mt: 2, mb: 3 }}
        InputProps={{  
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleLogin} 
        disabled={loading}
        fullWidth
      >
        {loading ? <CircularProgress size={24} /> : 'Login'}
      </Button>
      <Button 
        variant="text" 
        color="secondary" 
        onClick={handleForgotPassword} 
        disabled={loading || !name}
        fullWidth
        sx={{ mt: 2 }}
      >
        Forgot Password?
      </Button>
    </Box>
  );
}