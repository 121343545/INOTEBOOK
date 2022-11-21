const express = require('express');
var fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
const router = express.Router();


//route1:fetch all the notes using Get: "/api/auth/fetchallnotes". login req
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);    
    } catch (error) {
        console.log(error.message);
       res.status(500).send("some error occured"); 
    }
    
})


//route2:Add a note using Post: "/api/notes/addnote". login req
router.post('/addnote', fetchuser, [

    body('title', 'you enter wrong email').isLength({ min: 5 }),
    body('description', 'Please enter at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
try {
    const { title, description, tag } = req.body;
    //if there are errors ,return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const note = new Notes({
        title, description, tag, user: req.user.id
    })
    const savenote=await note.save();
    res.json(savenote);
} catch (error) {
    
}
    
})
//route3:update a note using Put: "/api/notes/addnote". login req

router.put('/updatenote/:id', fetchuser, async (req, res) => {

    const {title,description,tag}=req.body;
    // create new note object
    const newNote={};
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};
//find the note to  be updated and update
let note= await Notes.findById(req.params.id);
if(!note){
   return res.status(404).send("not found");
}

if(note.user.toString()!== req.user.id){
   return res.status(401).send("not allowed");
}

note =await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
res.json({note});



})


//route4:Delete a note using Delete: "/api/notes/addnote". login req

router.delete('/deletenote/:id', fetchuser, async (req, res) => {

const {title,description,tag}=req.body;
    try {
          //find the note to  be updated and update
let note= await Notes.findById(req.params.id);
if(!note){
   return res.status(404).send("not found");
}

//Allow deletion if the user own this note
if(note.user.toString()!== req.user.id){
   return res.status(401).send("not allowed");
}

note =await Notes.findByIdAndDelete(req.params.id);
res.json( {"success":"The node deleted"} )
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");       
    }



})





module.exports = router;