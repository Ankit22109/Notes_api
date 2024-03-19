import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"


function Sign_up() {
    const [credentials, setCredentials] = useState({name:"", email:"", password:""})
    const navigate = useNavigate()
    const loged = async ()=>{
        // console.log(credentials.email[0])
        try{
        let response = await fetch('http://localhost:5000/api/auth/createuser',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({name:credentials.name[0],  email:credentials.email[0], password:credentials.password[0]})
        });
    
        const token = await response.json()
        // console.log(token.authtoken)
        localStorage.setItem('token', token.authtoken)
    
        navigate('/')
    }catch(error){
        console.log(error.message)
    }
    }
    
    const handleChange = (e)=>{
        setCredentials({...credentials, [e.target.name]:[e.target.value]})
    }
    return (
        
        <form action="" className="auth_form">
            <p>sign up</p>

            <div className="user_email">
                <input type="text" placeholder="Name" onChange={handleChange} value={credentials.name} name="name" />
                <input type="email" id="email" value={credentials.email} className="email" placeholder="Email" name="email" onChange={handleChange} />
            </div>
            <div className="user_pass">
                <input type="password" value={credentials.password} className="password" placeholder="Password" name="password" onChange={handleChange} />
                {/* <span className="show"></span> */}

            </div>


            <div className="sign_btn">
                <button type="button" onClick={loged} className="btn sign_btn">Sign Up</button>
            </div>

            <pre className="or">
                <hr /> Or <hr />
            </pre>
            <div className="Sign_page">
                <Link to="/login">Already have an account?</Link>
            </div>
        </form >

    )
}

export default Sign_up