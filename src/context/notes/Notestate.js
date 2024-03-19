import { useState } from "react";
import NoteContext from "./noteContext";


const auth_token = localStorage.getItem('token')

const NoteState = (props) => {

    const [state, setState] = useState([])
    const [element, setElement] = useState("")
    const [id, setId] = useState("")
    // setElement({title:"", description:"", tag:"deafult"})
    const host = 'http://localhost:5000/'

    const fetchnote = async (method, host, path) => {
        // console.log(`${host}${path}`)

        // console.log(newnote)
        try {
            const response = await fetch(`${host}${path}`, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'auth_token': localStorage.getItem('token')
                }


            });
            const data = await response.json()
            setState(data)
        } catch (error) {
            console.log(error)
        }
    }
    const getnotes = () => {
        // console.log(process.env.REACT_APP_auth_token)
        const path = 'api/notes/fetchallnotes'
        const method = 'GET'
        return fetchnote(method, host, path)
        // .then((response) => {
        //     return response.json()
        // }).then((data) => {
        //     return setState(data)
        // })
    }



    const addnotes = async (element) => {
        const path = 'api/notes/addnotes'
        // console.log(element)
        const method = 'POST'
        const newnote = {
            title: element.title,
            description: element.description,
            tag: element.tag
        }
        const response = await fetch(`${host}${path}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'auth_token': auth_token
            },
            body: JSON.stringify(newnote)


        });
        let note = await response.json()
        // console.log(note)
        // console.log(element.description)
        setState(state.concat(note))

    }


    const editnote = async(element) => {
        const path = `api/notes/updatenotes/${id}`
        const method = 'PUT'

        const newnote = {
            title: element.title,
            description: element.description,
            tag: element.tag
        }
        console.log(id)
        const response = await fetch(`${host}${path}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'auth_token': auth_token
            },
            body: JSON.stringify(newnote)
 

        });
        const note = await response.json()
        setState(state.concat(note))
        // console.log(note)
        
    }

    const deletenote = async(id) => {
        const path = `api/notes/deletenotes/${id}`
        const method = 'DELETE'

        const newnote = state.filter((note) => { return note._id !== id })
        // console.log(newnote)
        console.log(`${host}${path}`)
        const response = await fetch(`${host}${path}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'auth_token': auth_token
            },
            // body: JSON.stringify(newnote)
 

        });
        await response.json()
        setState(newnote)
        // console.log(id)
        // console.log(newnote)
        // setState(newnote)
    }

    return (
        <NoteContext.Provider value={{id, setId, element, setElement,state, getnotes, addnotes, deletenote, editnote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState