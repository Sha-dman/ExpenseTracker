import {auth, provider} from '../../config/fireback-config';
import {signInWithPopup} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';
import './styles.css'
export const Auth = () => {

const navigate = useNavigate();


const signInWithGoogle = async() => {
   const res = await signInWithPopup(auth, provider);
   console.log(res);
   const authInfo = {
    userID : res.user.uid,
    name : res.user.displayName,
    profphoto : res.user.photoURL,
    isAuth : true
   };
   localStorage.setItem("Auth", JSON.stringify(authInfo));
   navigate("/expense-tracker")
}

    return (
    <div className='container-login'>
        <img src="./img/image" alt="" />
    <div className="login-page">
        <p>Sign in with Google to continue</p>
        <button className="login-btn" onClick={signInWithGoogle}>Sign in</button>
    </div>
    </div>
    );
}