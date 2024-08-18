import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import {Link} from 'react-router-dom'
import { useContext, useEffect } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import WidgetsSharpIcon from '@mui/icons-material/WidgetsSharp';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import {useParams} from 'react-router-dom'


function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function IconBreadcrumbs() {

    const { breadCrumbName, setBreadCrumbName } = useContext(StoreContext)
  
    const {id} = useParams()

  useEffect(()=>{
    setBreadCrumbName(id)
  },[id])


    
    return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          to="/"
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          to="/products"
        >
          <WidgetsSharpIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Product
        </Link>
        <Typography
          sx={{ display: 'flex', alignItems: 'center' }}
          color="text.primary"
        >
          <LabelImportantIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          {breadCrumbName}
        </Typography>
      </Breadcrumbs>
    </div>
  );
}