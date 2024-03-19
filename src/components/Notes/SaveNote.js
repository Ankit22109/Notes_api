// import { Home } from './Home'
import Delete from '../icons/delete.svg'
import edit from '../icons/edit.svg'
import noteContext from '../../context/notes/noteContext'
import { useContext, useEffect } from 'react'
import { useNavigate }  from 'react-router-dom'
//eslint-disable-next-line



function Savenote(props) {
    // const { Element } = props
    // console.log(Element)
    const context = useContext(noteContext)
    // eslint-disable-next-line no-unused-vars
    const { state, deletenote, getnotes } = context
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getnotes()
        }
        else {
            navigate('/login')        }

    })




    return (
        <div className="note-container">
            {/* {getnotes()} */}
            {state.map((element) => {
                return (
                    <div style={{ whiteSpace: "pre" }} className="noteItems" key={element._id}>
                        <div className="note-title" dangerouslySetInnerHTML={{ __html: element.title }} />
                        <div style={{ whiteSpace: "pre" }}
                            dangerouslySetInnerHTML={{ __html: element.description }} className="saved-notes" />
                        <div className="icon-container">
                            <img src={Delete} alt="" className="icon delete" onClick={() => { return deletenote(element._id) }} />
                            <img src={edit} id='mybutton' alt="" className='icon edit' onClick={() => {
                                context.setElement(element)
                                context.setId(element._id)
                            }} />
                        </div>
                    </div>
                )
            })}

        </div>
    )
}

export default Savenote