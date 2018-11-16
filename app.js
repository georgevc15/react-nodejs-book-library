var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser'); //foloseste passport pentru parsarea cookeiurilor necesare pentru sesiune
var passport = require('passport');
var session = require('express-session'); //sesiunile ce tin ce frameworkul express care vor fi folosite de passport ca sa puna informatiile user, password etc
var cors = require('cors');

var LocalStrategy = require('passport-local').Strategy;

var app = express();

var port = process.env.PORT || 5000;

app.use(cors());

var nav = [{
    Link:'/Books', 
    Text: 'Books'
    }, {
    Link:'/Authors',
    Text: 'Authors'
    }];
    

var adminNav = [{
    Link: '/admin/manage-books',
    Text: 'Manage books'
    },
    {
     Link: '/admin/manage-authors',
     Text: 'Manage authors'   
    }
];



var bookRouter = require('./src/routes/booksRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(adminNav);
var authRouter = require('./src/routes/authRoutes')(nav);
var authorsRouter = require('./src/routes/authorsRoutes')(nav);
var searchRouter = require('./src/routes/searchRoutes')(nav);


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true })); // parse application/x-www-form-urlencoded 
app.use(bodyParser.json()); // parse application/json 


//autentificare
app.use(cookieParser());
app.use(session({
    secret: 'library',
    resave: false,
    saveUninitialized: false,
    cookie: {  }
}));

app.use(passport.initialize());
app.use(passport.session());
//require('./src/config/passport')(app);
//end autentificare


app.set('views','./src/views');
app.set('view engine', 'ejs');



app.use('/Books', bookRouter);
app.use('/admin', adminRouter);
app.use('/Auth', authRouter);
app.use('/Authors', authorsRouter);
app.use('/search', searchRouter);
//app.use('/Authors', passport.authenticationMiddleware(), authorsRouter);


app.get('/', function(req, res) {
    res.render('index', {
    	title: 'Homepage', 
    	nav: nav
    	});
});


//authentification 'module'
var mongodb = require('mongodb').MongoClient;
    
    passport.serializeUser(function(user, done) {
        console.log('Serialize user called');
        console.log(user);
        done(null, user); //user.id
    });
    
    passport.deserializeUser(function(user, done) {
        //mongo find by id daca vrem sa verificam din baza de date
        console.log('Deserialize user called.');
        done(null, user);
    });

    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    
    function(username, password, done) {
    //console.log('local strategy called with: '+ username + 'and password: ' + password);
         var url = '';
            if(port === 5000) { 
                url = 'mongodb://localhost/libraryApp';
            } else {
                url = 'mongodb://book_usr:book_pass@ds161475.mlab.com:61475/book-store';
            }

            mongodb.connect(url, function(err, db) {
                var collection = db.collection('users');
                collection.findOne({
                    username: username
                }, 
                    function(err, results) {
                      //console.log('results.password este: '+ results.password);
                      //console.log(results);
                        if(results.password === password) { 
                            var user = results;
                            done(null, user);
                         } else {
                            //done('Bad password', null);
                            done(null, false, {message: 'Bad password'});
                         }  
                    }
                );
             });
    }));
 //end authenthification

app.listen(port, function(err) {
    console.log('Server running on port ' + port);
});