import React, { useContext, useEffect, useRef,useState } from 'react'
import NoteContext from "../context/Notes/NoteContext";
import Addnote from './Addnote';
import Noteitem from './Noteitem';
const Note1 = () => {
  const context = useContext(NoteContext);
  const { notes, fetchNote } = context;
  
  useEffect(() => {
    fetchNote();
    // eslint-disable-next-line

  }, [])
  const [note,setNotes] = useState({id:"",etitle:"",edescription:"",etag:"default"})
  const {addNote}=context;
  const ref = useRef(null);
  const refClose=useRef(null);
  const updateNote = (currentnote) => {
    console.log("click");

    ref.current.click();
    setNotes({etitle:currentnote.title,edescription:currentnote.discription,etag:currentnote.tag});
  }
    

   const handleClick=(e)=>{
    console.log("updated",note);
    //refClose.current.click();
    e.preventDefault();
    
  }
const onChange=(e)=>{
    setNotes({...notes,[e.target.name]:e.target.value})
}


  return (
    <>
      <Addnote />


      <button ref={ref} type="button" class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div class="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form>
                <div className="mb-3 ">
                  <label htmlFor="title" className="form-label">title</label>
                  <input type="text" className="form-control" id="etitle" value={notes.etitle} name='etitle' aria-describedby="emailHelp" onChange={onChange} />

                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">description</label>
                  <input type="text" className="form-control" id="edescription" name='edescription' onChange={onChange} value={notes.edescription}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">tag</label>
                  <input type="text" className="form-control" id="etag" name='etag' onChange={onChange} value={notes.etag}/>
                </div>

                
              </form>
            </div>
            <div class="modal-footer">
              <button  type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" onClick={handleClick}>Update</button>
            </div>
          </div>
        </div>
      </div>



      <div className='row'>
        <h2>Your Notes</h2>
        {
          notes.map((notes) => {
            return <Noteitem  notes={notes} updateNote={updateNote} />;
          })
        }
      </div>
    </>
  )
}

export default Note1