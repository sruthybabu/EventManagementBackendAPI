const Express=require("express")
const Bodyparser=require("body-parser")
const Mongoose=require("mongoose")
const req = require("express/lib/request")
const res = require("express/lib/response")



var app=Express()
app.use(Bodyparser.urlencoded({extended:true}))
app.use(Bodyparser.json())
app.use((req, res, next) => { 
    res.setHeader("Access-Control-Allow-Origin", "*");  
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"   ); 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS"   ); 
    next(); });

var eventModel=Mongoose.model("events",

new Mongoose.Schema({
    eventName:String,
    date:String,
    venue:String,
    organiser:String,
    contactNo:String

}
)

)
Mongoose.connect("mongodb+srv://sruthybabu:sruthy4599@cluster0.bip6a.mongodb.net/EventDb")




app.post("/api/eventadd",(req,res)=>{
    var getEventname=req.body.eventName 
    var getDate=req.body.date 
    var getVenue=req.body.venue 
    var getOrganiser=req.body.organiser 
    var getContactno=req.body.contactNo 
    data={"eventName":getEventname,"date":getDate,"venue":getVenue,"organiser":getOrganiser,"contactNo":getContactno}

    let myevent=new eventModel(data)
    myevent.save((error,data)=>{
        if(error)
        {
            res.send({"status":"error","data":error})
        }
        else
        {
            res.send({"status":"success","data":data})
        }
    })
   
})
app.get("/api/eventview",(req,res)=>{
    eventModel.find(
        (error,data)=>{
            if(error)
            {
                res.send({"status":"error"})
            }
            else
            {
                res.send(data)
            }
        }
    )
})



app.listen(5001,()=>{
    console.log("Server Running")
})