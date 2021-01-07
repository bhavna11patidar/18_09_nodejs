const username=require('./appConfig').username;
const password=require('./appConfig').password;
const dbName=require('./appConfig').dbname;
module.exports={
    googleClientID:'@@@',
    googleClientSecret:'@@@',
    mongoDBUri:`mongodb+srv://${username}:${password}@cluster0.ceilt.mongodb.net/${dbName}?retryWrites=true&w=majority`
}