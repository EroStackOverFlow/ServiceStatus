import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Signup = (props) => {
    const data = {
        name: '',
        nachname: '',
        email: '',
        password: ''
    }

    let all_user = [];

    const [loginData, setLoginData] = useState(data);
    const [error, setError] = useState('');
    const templateId = 'template_btuc5d8';
    const serviceId = 'gmail';
    let message_html = 'Your Todo-List account has been created. Follow this link to activate it.';

    const handleChange = e => {
        setLoginData({...loginData, [e.target.id]: e.target.value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        const { name, nachname, email, password, } = loginData;


        if(password.length < 7){
          alert("password too short");
        }
        else{

          axios.get(`https://localhost:8000/api/users`)
              .then(res => {
                    all_user = res.data['hydra:member'] ;
                    console.log(res);
                    console.log(res.data);
                    console.log(all_user);

                    for(let i=0;i < all_user.length;i++){
                        if(email === all_user[i].email){
                            alert("this email is already in use!");
                            return;
                        }
                        else if(i===all_user.length-1 && email !== all_user[i].email )
                          postUser();
                      }

              })
          }
    }

   const postUser = e => {
     axios.post(`https://localhost:8000/api/users`, {name:name,nachname:nachname,email:email,password:password})
     .then(res => {
         CookieService.set('name', name);
         CookieService.set('nachname', nachname);
         CookieService.set('email', email);
         CookieService.set('role', 'user');
         CookieService.set('activ', '0');
         message_html =message_html + '  http://localhost:3000/confirmation/?email='+email;
         sendFeedback(serviceId,templateId, {message: message_html, from_name: 'Todo-List', reply_to: "fw42563@gmail.com"});
         console.log(res);
         console.log(res.data);
     })

    props.history.push('/backend/todolist');

   }


    const sendFeedback = (serviceId,templateId, variables) =>   {
   	  window.emailjs.send(
       	serviceId, templateId,variables
     	).then(res => {
       	console.log('Email successfully sent!')
     	})
     	// Handle errors here however you like, or use a React error boundary
     	.catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
     }


    const { name, nachname, email, password} = loginData;

    const btn = name === '' || nachname === '' || email === '' || password === ''
    ? <button disabled>Signup</button> : <button>Signup</button>

    // gestion erreurs
    const errorMsg = error !== '' && <span>{error.message}</span>;

    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftSignup">
                </div>
                <div className="formBoxRight">
                    <div className="formContent">

                    {errorMsg}

                    <h2>Signup</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="inputBox">
                                <input onChange={handleChange} value={name} type="text" id="name" autoComplete="off" required />
                                <label htmlFor="pseudo">Name</label>
                            </div>

                            <div className="inputBox">
                                <input onChange={handleChange} value={nachname} type="text" id="nachname" autoComplete="off" required />
                                <label htmlFor="pseudo">Nachname</label>
                            </div>

                            <div className="inputBox">
                                <input onChange={handleChange} value={email} type="email" id="email" autoComplete="off" required />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="inputBox">
                                <input onChange={handleChange} value={password} type="password" id="password" autoComplete="off" required />
                                <label htmlFor="password">Password</label>
                            </div>

                            {btn}
                        </form>
                        <div className="linkContainer">
                            <Link className="simpleLink" to="/login"> already have a acount </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
