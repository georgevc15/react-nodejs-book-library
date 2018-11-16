var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var port = process.env.PORT || 5000;

var authorsController =  function(nav) {

	var getIndex = function(req, res) {
		
		var url = '';
		if(port === 5000) {	
			url = 'mongodb://localhost/libraryApp';
		} else {
			url = 'mongodb://book_usr:book_pass@ds161475.mlab.com:61475/book-store';
		}	

		mongodb.connect(url, function(err, db) {
			var collection = db.collection('authors');

			collection.find({}).toArray(
				
				function(err, results) {
					res.render('authorsListView', {
							title: 'Authors',
							nav: nav,
							authors: results
					});

				});	
			});
	};

	
var getAuthor = function(req, res) {
		
		//res.send('I am inside the autors detail route: '+ test);
		var receivedId = new ObjectId(req.params.id);
		var url = '';
		if(port === 5000) {	
			url = 'mongodb://localhost/libraryApp';
		} else {
			url = 'mongodb://book_usr:book_pass@ds161475.mlab.com:61475/book-store';
		}	
		
		mongodb.connect(url, function(err, db)	{
			var collection = db.collection('authors');

			collection.findOne({_id: receivedId},
					function(err, results) {
						//console.log(results);
						res.render('authorView', {
							title: 'Author details',
							nav: nav,
							author: results
						});
				 });
		 	});
	};


var booksBelongingToAnAuthor = function(req,res) {
	 	
		var receivedId = req.params.id;
	 	var url = '';
		if(port === 5000) {	
			url = 'mongodb://localhost/libraryApp';
		} else {
			url = 'mongodb://book_usr:book_pass@ds161475.mlab.com:61475/book-store';
		}	


				mongodb.connect(url, function(err, db) {
					var collection = db.collection('books');
					collection.find({author:receivedId}).toArray(
						
					  function(err, results) {
						if (results.length !== 0) {	
							res.render('bookListView', {
			    					title: 'Available books', 
			    					nav: nav,
				  					books: results,
				  					message: ''
			    			});
			    		} else {
						res.render('bookListView', {
			    					title: 'Available books', 
			    					nav: nav,
				  					books: results,
				  					message: 'There are no books written by this author'
			    			});
			    		}

					});
			});
	};


	return {
		getIndex : getIndex,
		getAuthor: getAuthor,
		booksBelongingToAnAuthor : booksBelongingToAnAuthor 
	};

};

module.exports =  authorsController;