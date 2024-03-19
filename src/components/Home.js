// import { Link } from "react-router-dom";
import Savenote from "./Notes/SaveNote";
import { Takenotes } from "./Notes/TakeNotes";
// eslint-disable-next-line
import { useContext, useState, useEffect, useRef } from "react";

import noteContext from "../context/notes/noteContext";

// import UpdateNote from "./Updatenote";



function Home(props) {
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const context = useContext(noteContext)
    // const [id, setId] = useState(context.element._id)

    const { addnotes, element } = context
    function close() {
        const icon = document.getElementsByClassName('save')[0]
        const element_title = document.getElementsByClassName('title')[0]
        const element_note = document.getElementsByClassName('note')[0]
        icon.classList.remove('active')
        element_title.classList.remove('active')

        // console.log(note[1])
        if (element_title.innerText === "" && element_note.innerText === "") {
            return setNote("")
        }

        addnotes(note)



        element_note.innerHTML = ""
        element_title.innerHTML = ""

    }

    function handlechange() {
        const element_title = document.getElementsByClassName('title')[0]
        const element_note = document.getElementsByClassName('note')[0]



        const note_format = {
            title: element_title.textContent,
            description: element_note.innerText.replace(/\r?\n/g,
                '<br />'),
            tag: "default"
        }
        // console.log(note_format)
        setNote({
            ...note, title: note_format.title,
            description: note_format.description,
            tag: note_format.tag
        })

    }

    function toggleChild() {
        const childElement = document.querySelector('.title');
        const icon = document.getElementsByClassName('save')[0]
        childElement.classList.add('active');
        icon.classList.add('active')
    }
    const isMounted = useRef(false);
    useEffect(() =>
        function updatenote() {
            setNote(element)
            //  setId(context.element._id)
            if (isMounted.current) {
                const btn = document.getElementById('mybutton')
                if (btn !== null) {
                    // btn.addEventListener('click', () => {
                        const myPopup = document.getElementById('myPopup')
                        const form1 = document.getElementsByClassName('form1')[0]
                        myPopup.classList.add("show");
                        form1.style.display = 'none'
                    // })
                }
                else{
                    return null
                }
            }
            isMounted.current = true;
        }, [context.element]
    )

    const closePop = () => {
        const myPopup = document.getElementById('myPopup')
        const form1 = document.getElementsByClassName('form1')[0]
        // const 
        myPopup.classList.remove("show");
        form1.style.display = 'flex'
        // console.log(element.id)
        context.editnote(element)
    }


    function edit() {
        // setId(context.element._id)
        const element_title = document.getElementsByClassName('title')[1]
        const element_note = document.getElementsByClassName('note')[1]

        // const box = document.querySelectorAll('.box')
        const note_format = {
            // _id: context.element,
            title: element_title.innerText,
            description: element_note.innerText.replace(/\r?\n/g,
                '<br />'),
            tag: "default"
        }

        // element_note.defaultValue = "hr"


        context.setElement({
            title: note_format.title,
            description: note_format.description,
            tag: note_format.tag
        })
        // isMounted.current = true;
    }

    



    return (
        <>
            <Takenotes display={toggleChild} close={close} onChange={handlechange} />
            <Savenote />
            {/* <UpdateNote click={updatenote} kill={closePop} /> */}
            <div className="container popup" key={element.id} id="myPopup" >
                {/* <img src="./unpin.svg" alt="" /> */}
                <div className="h2"><p>Edit notes</p></div>
                <div role="textbox" spellCheck="true"
                    contentEditable="true" style={{ display: "block" }}
                    dangerouslySetInnerHTML={{__html:element.title}}
                    defaultValue={element.title} onInput={edit}
                    className="title box" on="true"
                />
                <div role="textbox" contentEditable="true"
                    aria-multiline="true" name="description"

                    onInput={edit} style={{ whiteSpace: "pre" }}
                    defaultValue={element.description}
                    dangerouslySetInnerHTML={{__html:element.description}}
                    className="note box" ></div>
                {/* <label htmlFor="note">take a note...</label> */}


                <div className="save edit-btn">
                    <div className="close edit2" id="closePopup" role="button" onClick={closePop} >Save</div>
                </div>
            </div>
        </>
    )
}

export { Home }; 