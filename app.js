const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const request = require('request');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

app.get('/', (req, res) => {
   res.render("search"); 
});

app.get('/searchResult', function (req, res) {
    var query= req.query.query;
    console.log(query)
    /// if user enter 2 or 3 word search following query will add + in place of spaces i.e - caption amarica wil become caption+amarica
    var str = query;
    var replaced = str.split(' ').join('+');
    console.log(replaced)



    var url="http://www.omdbapi.com/?apikey=thewdb&s="+replaced;
    console.log(url)
    request(url, (error, response, body)=> {
        // eval(require('locus'))
        if (!error && response.statusCode == 200) {
            var parsedData = JSON.parse(body);
            var ttid= parsedData.Search["0"]["imdbID"];
            var tturl="https://www.imdb.com/title/"+ttid;
            res.render("searchResult", {parsedData:parsedData, query:query, tturl:tturl});
            // console.log(parsedData);
            console.log(parsedData);
            console.log(query)
        }
    });
});

app.listen(3000, () => {
    console.log(`Server started listning on port 3000`);
});
