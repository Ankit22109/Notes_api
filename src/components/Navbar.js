import { Link, useNavigate } from "react-router-dom"
// import { useContext } from "react";

function Navbar(props) {
    const navigate = useNavigate()
    const logout = ()=>{
        localStorage.clear()
        navigate('/login')
    }
    // const value = useContext(noteContext)
    return (
        <nav className={`navbar bg-${props.theme}`}>
            <div className="nav-title"><Link to="/">{props.title}</Link></div>
            <div className="navbar-nav">
                <ul className="nav">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                        <div className="switch-container">
                            <label className="switch">
                                <input type="checkbox" className='checkbox' onClick={props.onClick} />
                                <span className="slider round"></span>
                            </label>Dark
                        </div>
                        {/* <Link to="/about" className="nav-link">About</Link> */}
                    </li>
                    </ul>
                        <div className="btn-container">
                    {!localStorage.getItem('token') ?
                    <>
                            <Link to={"/sign_up"} className="nav-link btn">Sign Up</Link>
                            <Link to={"/login"} className="nav-link btn">Login</Link>
                            </>
                            : <Link onClick={logout} className="btn nav-link">Log out</Link>}
                            </div>

                {/* <div className="contain"> */}
                {/* <label className="profile"></label> */}
                {/* </div> */}

            </div>
        </nav>
    )
}

export { Navbar }