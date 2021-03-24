import React,{ useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Login = (props) => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [btn, setBtn] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (password.length > 5 && email !== '') {
            setBtn(true)
        } else if (btn) {
            setBtn(false)
        }
    }, [password, email, btn])

    let all_user = [];

    const handleSubmit = e => {
        e.preventDefault();

        axios.get(`https://localhost:8000/api/users`)
            .then(res => {
                  all_user = res.data['hydra:member'] ;

                  for(let i=0;i < all_user.length;i++){
                      if(email === all_user[i].email){
                         if(password === all_user[i].password){
                             if(all_user[i].role === 'admin') {
                                 props.history.push('/backend/Service_list');
                                 return;
                             }
                             else{
                                 alert('you are not admin');
                             }

                         }
                         else {
                           alert("wrong password");
                           return;
                         }
                      }
                      else if(i===all_user.length-1 && email !== all_user[i].email )
                       alert("no user account for "+email)
                  }
            })

    }


    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftLogin">
                </div>
                <div className="formBoxRight">
                    <div className="formContent">

                        {error !== '' && <span>{error.message}</span>}

                        <h2>Login</h2>
                        <form onSubmit={handleSubmit}>

                            <div className="inputBox">
                                <input onChange={e => setEmail(e.target.value)} value={email} type="email" autoComplete="off" required />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="inputBox">
                                <input onChange={e => setPassword(e.target.value)} value={password} type="password" autoComplete="off" required />
                                <label htmlFor="password">password</label>
                            </div>

                            {btn ? <button>login</button> : <button disabled>Connexion</button> }

                        </form>
                        <div className="linkContainer">
                            <Link className="simpleLink" to="/signup">new here? Signup!</Link>
                            <br />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
