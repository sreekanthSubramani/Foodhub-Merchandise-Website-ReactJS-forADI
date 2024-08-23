    import './Loginpop.css'
    import { useState, useContext, useEffect, useCallback, useMemo } from 'react'
    import { IoIosCloseCircleOutline } from "react-icons/io";
    import { auth,googleProv } from '../FirebaseConfig/FirebaseConfig';
    import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword,updateProfile, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";    
    import toast from 'react-hot-toast';
    import { StoreContext } from '../../Context/StoreContext';
    import VisibilityIcon from '@mui/icons-material/Visibility';
    import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

    


    export default function LoginPopup({setLogin,setRevert}){
        const [fireBaseLogin, setFirebaseLogin] = useState(true)
        const [errorsLogin, setLoginErrors] = useState("")
        const [SignUpErr, setSignUpErr] = useState("")
        const {setIfLoggedIn, setUserMetaData} = useContext(StoreContext)
        const [showPass, setShowPass] = useState(false)


        const [userCred, setUserCred] = useState({
            loginEmail : "",
            loginPassword : ""
        })

        const [signUpEmailState, setSignUpEmailState] = useState({
            signUpName : "",
            signUpEmail : "",
            signUpPassword : ""
        })

        
        const handleLoginCred = (e)=>{
            const {name, value} = e.target
            setUserCred({...userCred, [name] : value})
        }

    

        const handleGmail = async ()=>{
                await signInWithPopup(auth, googleProv)
                await setLogin((prev)=> !prev)
                toast.success(`Logged you in ${auth?.currentUser?.displayName}`, {duration: 6000})
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("userMetaData", JSON.stringify ({
                    metaName : auth?.currentUser?.displayName,
                    metaPic : auth?.currentUser?.photoURL 
                }))
        }

        



        const handleSignUp = async(e)=>{
            const {name, value} = e.target
            setSignUpEmailState({...signUpEmailState, [name]: value}) 
        }

    

        
        const handleLoginEmailandPass = async (e)=>{
                e.preventDefault()
                console.log("clicked")
                if (!userCred.loginEmail || !userCred.loginPassword) {
                    setLoginErrors("Please enter both email and password");
                    return; 
                }

                try{
                            const signInEm = await signInWithEmailAndPassword(auth,userCred.loginEmail, userCred.loginPassword) 
                            toast.success(`Logged you in ${auth?.currentUser?.displayName}`, {duration: 6000} )
                            if(signInEm){
                                await setLogin((prev)=> !prev)
                            }

                            localStorage.setItem("isLoggedIn", "true")
                            localStorage.setItem("userMetaData", JSON.stringify({
                                metaName : auth?.currentUser?.displayName,
                                metaPic : auth?.currentUser?.photoURL
                            }))
                }catch(e){
                    console.error('Error logging in with email and password:', e);
                    
                        switch(e.code){
                            case  `auth/invalid-email` :
                            setLoginErrors("Invalid Email");
                            break;
                            case  `auth/user-not-found` :
                            setLoginErrors("Please create an account by tapping below")
                            break;
                            case  `auth/wrong-password`:
                            setLoginErrors("Invalid Password")
                            break;
                            case  `auth/email-already-in-use` :
                            setLoginErrors("Email already in use")
                            break;
                            case  "auth/too-many-requests":
                            setLoginErrors("Too many requests, To sort this email us to updates@foodhub.com")
                            break;
                            default :
                            setLoginErrors("Some unforeseen errors! Please try again or cannot connect with servers")
                        }
                }
        }
        

      


        if(userCred.loginEmail == undefined){
            setLoginErrors("Please enter the fields")
        }

        const handleCreateUser = async (e) => {
            e.preventDefault();
            
            if (!signUpEmailState.signUpEmail || !signUpEmailState.signUpPassword || !signUpEmailState.signUpName) {
                setSignUpErr("Please enter both email and password & name");
                return;
            }
            try {
            const prof = await createUserWithEmailAndPassword(auth, signUpEmailState.signUpEmail, signUpEmailState.signUpPassword);
            setFirebaseLogin(true)
            await setLogin((prev)=> !prev)
            await updateProfile(prof.user,{
                displayName : signUpEmailState.signUpName
            })
            if(prof){
            toast.success(`Your account is created ${signUpEmailState.signUpName} `, {duration: 6000} )   
            setLogin((prev)=> !prev)
            setLogin(false)
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userMetaData', JSON.stringify({
                metaName: signUpEmailState.signUpName,
                metaPic: auth?.currentUser?.photoURL
            }));
            }
            } catch (e) {
            console.error('Error creating new user:', e);

                switch(e.code){
                    case "auth/email-already-in-use" :
                    setSignUpErr("Email already in use")
                    break;
                    case "auth/invalid-email" :
                    setSignUpErr("Invalid email")
                    break;
                    default :
                    setSignUpErr("Unforeseen Error !! Please try again later")
                }
            }
        };

        const userAuthentication = useCallback(()=>{
            onAuthStateChanged(auth,(user)=>{
                if(user && user.uid){
                    setIfLoggedIn(true)
               
                    setUserMetaData({
                        metaName : auth.currentUser.displayName,
                        metaPic : auth.currentUser.photoURL
                    })
                    setRevert((prev)=> !prev)
                }else{
                    setUserMetaData(null)
                    setIfLoggedIn(false)
                }
            })  
        },[auth])
      

        useEffect(()=>{
                userAuthentication()     
        },[auth])
    

        const handleClosure =()=>{
            if(setLogin){
                setLogin((prev)=> !prev)   
            }else{
                setRevert((prev)=> !prev)
            }
        }

        const resetPassword = async(e)=>{
            e.preventDefault()
            const email = prompt("Enter your email address")
            

            if(email == "" || email == undefined){
                alert("Enter valid email address")    
            }else{
                try{
                    await sendPasswordResetEmail(auth, email)
                    await alert(`Password reset link is now sent to your ${email} email account`)
                }catch(e){
                    alert(`${email} is not registered with us and please create your account`)
                }
            }

        }
        



        return(
            <>
          
            {fireBaseLogin ?
            
            <div className="popup">
                <div className="popupContainer">
                <div className="LoginClose">
                <h3>Login</h3>
                <span className='closure-close' onClick={handleClosure}><IoIosCloseCircleOutline/></span>
                </div>
                <form >
                    <div className='form-login-cred'>
                    <div>
                    <h4> Username :</h4>
                    <input type="email" placeholder='Enter your email address' name="loginEmail" onChange={handleLoginCred} value={userCred.loginEmail} required/>
                    </div>

                    <div>
                        <h4>Password : </h4>
                        <input type={showPass ? "text" : "password"} placeholder='Enter password' name="loginPassword" onChange={handleLoginCred} value={userCred.loginPassword} required/>
                        <div className='showPassword-div'> 
                        {!showPass ? <> 
                        <h5 className="showPasword" onClick={()=>setShowPass(prev=> !prev)}>Show Password</h5>
                        <VisibilityIcon style={{transform : "translate(0px, -4px)"}} />
                        <h5 onClick={resetPassword}>Reset Password</h5>
                        </>
                        : <>
                        <h5 className="showPasword" onClick={()=>setShowPass(prev=> !prev)}>Hide Password</h5>
                        <VisibilityOffIcon style={{transform : "translate(0px, -4px)"}} />
                        <h5 onClick={resetPassword}>Reset Password</h5>
                        </>}
                        
                        </div>
                    </div>
                    <div className='button-logins'>
                    <button type="submit" onClick={handleLoginEmailandPass}>Login</button>
                    <img src="gmail-logo.png" alt="gmail" className="gmail-sign" onClick={handleGmail}/>
                    </div>
                    </div>
                </form>
                {errorsLogin && <p className='error-code'>{errorsLogin}</p>}

                <p className="hover-underline" onClick={()=>setFirebaseLogin((prev)=> !prev)}>Create an account</p>
                </div>

            </div> 
            : 
            <div className="popup">
                <div className="popupContainer">
                <div className="LoginClose">
                <h3>Sign Up</h3>
                <span className='closure-close' onClick={()=>setLogin((prev)=> !prev)}><IoIosCloseCircleOutline/></span>
                </div>
                <form>
                    <div className='form-login-cred'>
                    <div>
                    <h4> Name :</h4>
                    <input type="text" placeholder='Enter your name'  name="signUpName" onChange={handleSignUp} value={signUpEmailState.signUpName}/>
                    </div>

                    <div>
                    <h4> Email :</h4>
                    <input type="email" placeholder='Enter your email address' name="signUpEmail" onChange={handleSignUp}  value={signUpEmailState.signUpEmail}/> 
                    </div>


                    <div>
                        <h4>Password : </h4>
                        <input type="password" placeholder='Enter password' name="signUpPassword"  onChange={handleSignUp} value={signUpEmailState.signUpPassword} />
                    </div>
                    <div >
                    <button type='submit' onClick={handleCreateUser}>Create My Account</button>
                    {SignUpErr && <p className='error-code'>{SignUpErr}</p>}
                    </div>
                    <p className="hover-underline" onClick={()=>setFirebaseLogin((prev)=> !prev)}>Sign in</p>
                    </div>
                </form>
                </div>

            </div> 
                }
        </>
        )}         

        