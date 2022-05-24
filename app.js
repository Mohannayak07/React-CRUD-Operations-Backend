const express = require("express");
const app=express();
var bodyparser=require("body-parser")
app.use(express.json());
const cors=require('cors');
app.use(cors())
const mongoclient=require('mongodb').MongoClient
//app.use(bodyparser.urlencoded({extended:false}))
app.use(express.urlencoded({ extended: true }));
//app.use(express.static(path.resolve(__dirname, 'public')));
mongoclient.connect("mongodb://localhost:27017",(err,client)=>{
    if(err){
        console.log("Error occured")
    }
    else{
        db=client.db("mydb")
        console.log("DATABASE CONNECTED SUCCESSFULL")
    }
})

app.listen(2000,()=> console.log("server started at port 2000"))
app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/public/index.html")
})
app.get('/emps',(req,res)=>{
    db.collection('student').find().toArray((err,items)=>{
        if(err){
            console.log("unable to display")
        }
        else{
            res.json(items);
            console.log(items);
        }

    })
})
app.get('/emps/:id',(req,res)=>{
    var id=(req.params.id)
    console.log(typeof id);
    db.collection('student').find({_id:id}).toArray((err,items)=>{
        if(err){
            console.log("unable to display")
        }
        else{
            res.json(items);
        }

    })
    
}) 

app.post('/addemp',(req,res)=>{

   // res.json(user);
    //res.write('Inserted Successful')
   // console.log('inserted successful')
    
    db.collection('student').insertOne(req.body)
    console.log("inserted successfull")
    res.redirect('/emps');
    console.log((req.body));
    


    
})

app.delete('/delemp/:id',(req,res)=>{
    var id1=(req.params.id)

    db.collection('student').deleteOne({_id:id1})
    // res.redirect('/emps')
    res.send('deleted..')
    console.log("DELETED SUCCESSFULL")
}) 
app.put('/updemp/:id',(req,res)=>{
    var id2=(req.params.id)
    db.collection('student').updateOne({_id:id2},{$set:{"email":req.body.email}})
    console.log("updated successfull")
    res.send('updated successful..')
})
