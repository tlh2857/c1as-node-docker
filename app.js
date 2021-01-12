const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');
require('trend_app_protect');

const app = express();

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

app.get('/', function(req,res){
    res
    res.sendFile(__dirname + "/index.html",
    {statusCode: 200,
        headers: {
          'Content-Type': 'text/html',
        }
    })
})

app.post('/fileupload', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "userFile") to retrieve the uploaded file
            let userFile = req.files.userFile;

            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            userFile.mv('./uploads/' + userFile.name);

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: userFile.name,
                    mimetype: userFile.mimetype,
                    size: userFile.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/formupload', async (req, res) => {
    let evaluation = eval(req.body.name);
    try {      
                res.send({
                status: true,
                message: evaluation
            });
        } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(3000,'0.0.0.0',() =>
  console.log(`App is listening on port 3000.`)
);