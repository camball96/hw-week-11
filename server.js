const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const db = require("./develop/db/db.json")

const PORT = process.env.PORT || 3000;





app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));



//HTML Routes
app.get('/notes' , function (req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
app.get('/' , function (req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get('*', function (req,res){
    res.sendFile(path.join(__dirname, './public/index.html'));
});


//API Routes

/*app.get("/api/notes", (req,res) => {
    readFileAs("./develop/db/db.json", "utf8")
    .then(function(data){
        notes = [].concat(JSON.parse(data))
        res.json(notes);
    });
}); */

app.get("/api/notes", (req,res) => {
    let notesJ = fs.readFileSync("./develop/db/db.json");
    let note = JSON.parse(notesJ);
    res.send(note.slice(1));
})




app.listen(PORT, function() {
    console.log("app is listening on PORT: 3000");
});