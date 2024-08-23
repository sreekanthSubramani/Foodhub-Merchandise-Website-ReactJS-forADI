import * as React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { blue } from '@mui/material/colors';
import HomeIcon from '@mui/icons-material/Home';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useContext, useMemo } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import { signOut } from 'firebase/auth';
import { auth } from '../FirebaseConfig/FirebaseConfig';
import { useNavigate } from 'react-router-dom';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';



function SimpleDialog(props) {
  const { onClose,  open } = props;

  const handleClose = () => {
    onClose();
  };

  const navigate = useNavigate()

  const navToCart =()=>{
    navigate("/cart")
    return handleClose()
    
  }

  const navtoWallet = ()=>{
    navigate("/wallet")
    return handleClose()
  }



  const handleLogOut = async ()=>{
    try{
    await signOut(auth)
    console.log("Loggin out")
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userMetaData")
    localStorage.removeItem("orderIDP")
    localStorage.removeItem("currentWallet")
    navigate("/")
    window.location.reload()
  }catch(e){
    
    console.log(e.message, "Log out Error")
   }
 
  }


  const {userMetaData}= useContext(StoreContext)
  

 // console.log(userMetaData)


  const memoizedMetaPic = useMemo(() => userMetaData?.metaPic, [userMetaData?.metaPic])



  return (
    
    
    <Dialog onClose={handleClose} open={open}    >
        <div style={{display:"flex", justifyContent : "space-between"}}>
        <div style={{display:"flex", gap: "10px", justifyContent : "flex-start", padding : 20}}>
        <HomeIcon />
        <Typography>My Profile</Typography>
        </div>
        <CloseIcon onClick={handleClose} />
        </div>
        <hr />
      <List style={{width: 400}}>
            <ListItemButton >
              <ListItemAvatar>
             {userMetaData && userMetaData.metaPic ?
             <img src={userMetaData?.metaPic} alt={memoizedMetaPic} style={{width:60,height:60, borderRadius:50}} /> 
             :
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
             }    
              </ListItemAvatar>
              <Typography style={{marginLeft:20}}>{auth?.currentUser?.displayName}</Typography>
            </ListItemButton>
            

            <ListItemButton style={{gap: 30}}>
                <ShoppingCartIcon /> 
              <ListItemText onClick={navToCart}> My Cart </ListItemText>
            </ListItemButton>


            <ListItemButton style={{gap: 30}}>
                <AccountBalanceWalletIcon /> 
              <ListItemText onClick={navtoWallet}> Foodhub Wallet </ListItemText>
            </ListItemButton>


            
            <ListItemButton style={{gap: 30}}>
                <LogoutIcon/> 
              <ListItemText  onClick={handleLogOut}> Logout </ListItemText>
            </ListItemButton>   
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function BasicCard() {
  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };


  return (
    <>
    <div>
        <Button variant="outlined" onClick={handleClickOpen}>
        My Profile
      </Button>
      <SimpleDialog
        open={open}
        onClose={handleClose}

      />
    </div>
    </>
  );
}
