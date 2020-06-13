var express    = require('express');
var mysql      = require('mysql');
//var dbconfig   = require('./config/database.js');
//var connection = mysql.createConnection(dbconfig);
var login = require('./routes/loginroutes');

var app = express();

// configuration =========================
app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.send('Root');
});

app.get('/users', (req, res) => {
  connection.query('SELECT * FROM USER', (error, rows) => {
    if (error) throw error;
    console.log('User info is: ', rows);
    res.send(rows);
  });
});

app.get('/markers',(req,res) => {
    connection.query('SELECT * FROM POST WHERE STATUS = 0',(error,rows) => {
          if (error) throw error;
          console.log('Recruiting post : ', rows);
          res.send(rows);
    })
})

// to handle cross domain request
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var router = express.Router();

// route to handle user registration
router.post('/register', login.register);
router.post('/login', login.login)
app.use('/api', router);

app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});
