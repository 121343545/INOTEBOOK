import React, { useContext, useState } from 'react'
import NoteContext from "../context/Notes/NoteContext";

const Addnote = () => {
    const context=useContext(NoteContext);
    const {addNote}=context;
    const handleClick=(e)=>{
      e.preventDefault();
      addNote(notes.title,notes.description,notes.tag);
    }
const onChange=(e)=>{
      setNotes({...notes,[e.target.name]:e.target.value})
}

const [notes, setNotes] = useState({title:"",description:"",tag:"default"})
  return (
    <div className='container my-3'>
    <h2>Add a New Note</h2>
    <form>
<div className="mb-3 ">
<label htmlFor="title" className="form-label">title</label>
<input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange} />

</div>
<div className="mb-3">
<label htmlFor="description" className="form-label">description</label>
<input type="text" className="form-control" id="description" name='description' onChange={onChange}/>
</div>
<div className="mb-3">
<label htmlFor="tag" className="form-label">tag</label>
<input type="text" className="form-control" id="tag" name='tag' onChange={onChange}/>
</div>

<button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
</form>
</div>

  )
}

export default Addnote