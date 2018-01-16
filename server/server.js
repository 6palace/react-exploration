const app = require('express')();
const bodyParser = require("body-parser");

/*
listItem format:
{
  status: <backlog, started, finished>
  message: <*>
}
*/


//Express body parser
app.use(bodyParser.json());

var listItems = [
    {
      status: "backlog",
      message: "message1"
    },{
      status: "started",
      message: "message2"
    },{
      status: "finished",
      message: "message3"
    }
];
app.get('/items', (req, res) => {
  if(req.query.type) {
    console.log("getting items", req.query);
    res.send(listItems.filter((x) => x.state === req.query.type));
  } else {
    console.log("getting items", req.query);
    res.send(listItems);
  }
});

app.post('/items', (req, res) => {
  console.log(req.body);
  if(req.body.status && req.body.message){
    listItems.push(req.body);
    res.status(200).send(req.body);
  } else {
    res.status(400).send({
      error: "invalid todo item."
    });
  }
});

app.listen(4000, () => {
  console.log("listening on 4000");
});
