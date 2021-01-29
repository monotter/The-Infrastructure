var {port,cors,fs,http,bodyparser,app} = require("./Defines.js")
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());
var loopondir = (path)=>{
  var dir = fs.opendirSync(path)
  var dirent
  while ((dirent = dir.readSync()) !== null) {
    if(dirent.isFile() && dirent.name.endsWith(".js")){
      require(path+"/"+dirent.name)
    }
    else if(!dirent.isFile()){
      loopondir(path+"/"+dirent.name)
    }
  }
  dir.closeSync()
}
loopondir("./Methods")
app.use(async (req, res)=>{
  try{
    res.status(404);
    if (req.accepts('html')) {
      res.send({ error: 'Not found' });
      return;
    }
    if (req.accepts('json')) {
      res.send({ error: 'Not found' });
      return;
    }
    res.type('txt').send('Not found');
  }
  catch(err){
    res.status(500).send("Internal Server Error");
  }
});
http.createServer(app).listen(port.http,()=>{
  var TString = ""
  var i = 0;
  app._router.stack.forEach(function(r){
    if (r.route && r.route.path){
      TString += `${(TString == ''?'':(app._router.stack.length-1 == i?' and ':', '))}${r.route.path}<${r.route.stack[0].method}>`
      i++
    }
  })
  console.log(`Api Served on ${port.http} port.\nRoutes are ${TString}\n\nApi is Ready\n`)
})