import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';
import { auth } from '../components/FirebaseConfig/FirebaseConfig';
import { useEffect, useState } from 'react';

function dateRepModule(date){
    const day = date.getDate().toString().padStart(2,"0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear().toString().slice(2)
    return `${day}/${month}/${year}`
}


function futureDates(){
    const today = new Date()

    const within3Days = new Date(today)
    within3Days.setDate(today.getDate() + 3)

    const within5Days = new Date(today)
    within5Days.setDate(today.getDate() + 5)

    return{
        within3Days : dateRepModule(within3Days),
        within5Days : dateRepModule(within5Days)
    }
}


const theNext3Days = futureDates().within3Days
const theNext5Days = futureDates().within5Days
console.log(theNext3Days, theNext5Days)




const steps = [
  {
    label: 'Order Received',
    description: `In the next 24 - 72 Hours, you may expect the Order to be shipped`
  },
  {
    label: 'Order Shipped',
    description: 
    <><li>Your Order is packed safely & shipped from our end.</li>
    <li>Estimated Time of Arrival : <br/> <span style={{color : "red"}}>{theNext3Days}</span> to <span style={{color : "red"}}>{theNext5Days}</span> </li>
    <li>For the shipment status please use </li><a style={{color:"blue"}}href='https://track.dpd.co.uk/' target='/blank'> DPD Portal - Order Tracker</a>
    </>              
},
  {
    label: 'Order in Transit',
    description: <li> Check your email for more info <span style={{color: "blue"}}>{auth?.currentUser?.email}</span></li>
  },
];

export default function VerticalLinearStepper({orderIdStep}) {
  const [activeStep, setActiveStep] = React.useState(0);
  


  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prevActiveStep) => {
        if (prevActiveStep < steps.length - 1) {
          return prevActiveStep + 1;
        } else {
          clearInterval(interval); 
          return prevActiveStep;
        }
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
          </Box>
  );
}
