import { Box, Button, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import OTPInput from 'react-otp-input'
import './OtpSending.css'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { auth } from "./firebase.config";
import { ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import 'firebase/auth';
import { toast } from 'react-toastify'


declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
    confirmationResult: ConfirmationResult | undefined;
  }
}

const Sender = () => {
  const [otp, setOtp] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [phNum, setPhNum] = useState('');

  function onCaptchaVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response: any) => {
          onSignup()
        },
        'expired-callback': () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        }
      });
    }

  }
  function onSignup() {
    onCaptchaVerify();

    const appVerifier = window.recaptchaVerifier;

    if (appVerifier) {
      const formatPh = "+" + phNum;

      signInWithPhoneNumber(auth, formatPh, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          toast.success("OTP send succesfully...")
          setShowOTP(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // Handle the case where window.recaptchaVerifier is undefined
      toast.error("OTP sending failed...")
      console.error('recaptchaVerifier is not defined');
    }
  }
  function onOTPVerify() {
    window.confirmationResult?.confirm(otp)
      .then((res) => {
        console.log(res);
        toast.success("OTP verified successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("OTP verification failed");
        setShowOTP(false);
      });
  }
  
  return (
    <Box width={400} component={Paper} p={3}>
      <>
        <Box id='recaptcha-container'></Box>
        {
          showOTP ?
            <>
              <Typography variant='h5' textAlign='center' fontWeight='bold' gutterBottom>Enter your OTP</Typography>
              <Box display={'flex'} justifyContent={'center'}>
                <OTPInput
                  value={otp}
                  inputType='text'
                  onChange={setOtp}
                  numInputs={6}
                  renderInput={(props: any) => <input {...props} className="customOTPInput" />}
                />
              </Box>
              <Box textAlign={'center'} pt={3}>
                <Button size='small' variant='contained' onClick={onOTPVerify}>Verify OTP</Button>
              </Box>
            </>
            :
            <>
              <Typography variant='h5' fontWeight='bold' gutterBottom>Enter your Mobile Number</Typography>
              <Box display={'flex'} justifyContent={'center'}>
                <PhoneInput
                  country={'in'}
                  value={phNum}
                  onChange={setPhNum}
                />
              </Box>
              <Box pt={3}>
                <Button size='small' variant='contained' onClick={onSignup}>Send OTP</Button>
              </Box>
            </>
        }
      </>
    </Box>
  )
}

export default Sender
