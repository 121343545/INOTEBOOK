import React, { useState } from "react";
import noteContext from "./NoteContext";

const NoteState = (props) => {

    const host = "http://localhost:5000"
    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial)
    //Add Note
    const addNote = async (title, description, tag) => {
        //TODO API CALL
        let url = `${host}/api/notes/addnote`
        //Api Call
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.

            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlZThmMGI4NmU1YzQ5NDZkM2I3NWQ1In0sImlhdCI6MTY1OTgwMTM1NX0.NdR38S1oby9mSzl1zTH-LYYavsJGjwq6OWsPP_q3YvI"
            
            },

            body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
        });
        const json= response.json(); // parses JSON response into native JavaScript objects

        //logic to add a note
        console.log("adding a new note");
        const note = {
            "_id": "63074e71318fac99be7ce65a",
            "user": "62ee8f0b86e5c4946d3b75d5",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2022-08-25T10:26:57.324Z",
            "__v": 0
        };
        setNotes(notes.concat(note));
    }

//fetch all note
//Add Note
const fetchNote = async () => {
    //TODO API CALL
    let url = `${host}/api/notes/fetchallnotes`
    //Api Call
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.

        headers: {
            'Content-Type': 'application/json',
            'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlZThmMGI4NmU1YzQ5NDZkM2I3NWQ1In0sImlhdCI6MTY1OTgwMTM1NX0.NdR38S1oby9mSzl1zTH-LYYavsJGjwq6OWsPP_q3YvI"
        
        },

        
    });
    const json= await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);
    setNotes(json);
    
}


    //Delete A Note
    const deleteNote = async(id) => {
    //Api call
    let url = `${host}/api/notes/deletenote/${id}`
        //Api Call
        const response = await fetch(url, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.

            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlZThmMGI4NmU1YzQ5NDZkM2I3NWQ1In0sImlhdCI6MTY1OTgwMTM1NX0.NdR38S1oby9mSzl1zTH-LYYavsJGjwq6OWsPP_q3YvI"
            
            },

            
        });
        const json= response.json(); // parses JSON response into native JavaScript objects






    //logic to delete the node
        console.log("The node delteing with id" + id);

        const newNote2 = notes.filter((notes) => { return notes._id !== id })
        setNotes(newNote2);
    }




    // Edit A Note
    const editNote = async (id, title, description, tag) => {

        let url = `${host}/api/notes/updatenote/${id}`
        //Api Call
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.

            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlZThmMGI4NmU1YzQ5NDZkM2I3NWQ1In0sImlhdCI6MTY1OTgwMTM1NX0.NdR38S1oby9mSzl1zTH-LYYavsJGjwq6OWsPP_q3YvI"
            
            },

            body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
        });
        const json= response.json(); // parses JSON response into native JavaScript objects





        //Logic to edit in client
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }
    }




    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote,fetchNote }}>
            {props.children}
        </noteContext.Provider>
    )

}


export default NoteState;