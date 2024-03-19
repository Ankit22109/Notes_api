import { useContext } from "react"
import noteContext from "../context/notes/noteContext"


function About(){
    const value = useContext(noteContext)
    return(
        <div>
            <h2 style={{textAlign:"center"}}>This is about {value.state.theme}</h2>
        </div>
    )
}

export {About}