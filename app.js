var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const{Pool,Client} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '',
    port: 5432,
});

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));


 app.get('/proj', function(req, res1){ 

    pool.query('select * from players', (err, res) => {
            var table = res.rows;
        console.log(res.rows);
        res1.render('index', {
            table: table
      
       }); 
        pool.end();
    });
   
  });


app.listen(4040)
console.log('App is on port 4040');