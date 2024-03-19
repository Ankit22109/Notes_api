// import { useState } from "react";
import noteContext from "../../context/notes/noteContext";
import { useContext } from "react";
// import {unpin} from './delete.svg';
function Takenotes(props) {

    const value = useContext(noteContext)
    

    function handleKeyPress(event) {
        if (event.keyCode === 13) {  // 13 is the key code for "Enter"
            event.preventDefault();    // Prevent the default behavior of "Enter"
            focusNextEditableDiv();     // Function to focus on the next editable div
        }

        const div = document.getElementsByClassName('title')[0];
        if (div.getAttribute('placeholder') === 'Title' ) {
            div.innerText = '';
            value.update("")
        }


    }

    function focusNextEditableDiv() {
        const editableDivs = document.querySelectorAll('.box');
        let found = false;

        for (const div of editableDivs) {
            if (found) {
                div.focus();
                return;
            }

            if (div === document.activeElement) {
                found = true;
            }
        }
    }

    function handleBlur() {
        const div = document.getElementsByClassName('title')[0];
        if (div.getAttribute('placeholder') === '' && div.innerText.length === 1) {
        //   div.innerText = 'Type your text here...';
        value.update('Title', "Take a note...")
        //   div.classList.add('editable-div-placeholder');
        }
      }      
      

      
      // Call the function to move the cursor to the start
   
    return (
        <>
            <form action="" className="form1">
                <div className="container">
                    {/* <img src="./unpin.svg" alt="" /> */}
                    <div role="textbox" spellCheck="true" contentEditable="true" 
                        className="title box" on="true" aria-label="Title" name="title" onClick={props.display} 
                        onKeyDown={handleKeyPress} onBlur={handleBlur} onInput={props.onChange} ></div>
                    <div role="textbox" contentEditable="true"
                        aria-multiline="true" onClick={props.display} name="description"
                        onInput={props.onChange} style={{whiteSpace:"pre"}}
                          aria-label="Take a note..." className="note box"></div>
                    {/* <label htmlFor="note">take a note...</label> */}


                <div className="save">
                    <div className="close" role="button" onClick={props.close}>Save</div>
                </div>
                </div>
            </form>
        </>
    )
}

export { Takenotes }