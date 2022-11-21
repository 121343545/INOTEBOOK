import React, { useContext, useState } from 'react'
import NoteContext from "../context/Notes/NoteContext";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit,faDeleteLeft} from '@fortawesome/free-solid-svg-icons'
const Noteitem = (props) => {
    const context=useContext(NoteContext);
    const {deleteNote}= context;
    const { notes,updateNote } = props;
    return (
        <div className='col-md-3'>


            <div className="card my-3" >

                <div className="card-body">
                    <div className='d-flex'>
                    <h5 className="card-title">{notes.title}<div id="edit" onClick={()=>{updateNote(notes)}}><FontAwesomeIcon className='mx-5  ic' icon={faEdit}></FontAwesomeIcon></div>
                   <div id='delete' onClick={()=>{deleteNote(notes._id)}}> <FontAwesomeIcon className='mx-1 ic' icon={faDeleteLeft} ></FontAwesomeIcon></div></h5>
                    </div>
                    <p className="card-text">{notes.description}</p>
                    
                    

                </div>
            </div>


        </div>


    )
}

export default Noteitem