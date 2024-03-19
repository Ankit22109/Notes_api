import { Link, useNavigate } from "react-router-dom"
import '../../auth.css'
import { useState } from "react"
function Login() {
    const [credentials, setCredentials] = useState({email:"", password:""})
    const navigate = useNavigate();
    if(localStorage.getItem('token')){
        navigate('/')
    }
    const loged = async ()=>{
        
        try{
        let response = await fetch('http://localhost:5000/api/auth/login',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({email:credentials.email[0], password:credentials.password[0]})
        });

        const token = await response.json()
        // console.log(token.authtoken)
        // console.log(token)
        localStorage.setItem('token', token.authtoken)

        navigate('/')
    }catch(error){
        console.log(error.message)
        // console.log(token)
    }
    }

    const handleChange = (e)=>{
        // console.log(e)

        // console.log(credentials)
        setCredentials({...credentials, [e.target.name]:[e.target.value]})
    }


    return (

        <form action="" className="auth_form">
            <p>Login</p>
            <div className="user_email">
                <input type="email" id="email" value={credentials.email} className="email" placeholder="Email" name="email" onChange={handleChange}/>
            </div>
            <div className="user_pass">
                <input type="password" value={credentials.password} className="password" placeholder="Password" name="password" onChange={handleChange} />
                {/* <span className="show"></span> */}

            </div>

            
            <div className="sign_btn">
                <button type="button" onClick={loged} className="btn sign_btn">login</button>
            </div>
            
            <pre className="or">
                <hr /> Or <hr />
                </pre>
                    <div className="Sign_page">
                        <Link to="/sign_up">Create Link new account?</Link>
                    </div>
                </form>
    )
}

export default Login