var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var port = process.env.PORT || 5000;

var bookController = function(bookService, nav) {
	
	var middlewareSecureRoute = function(req, res, next) {
		/*if(!req.user){
			res.redirect('/');
		}*/
		next();
	};

	var getIndex = function(req, res) {

	var url = '';
	if(port === 5000) {	
		url = 'mongodb://localhost/libraryApp';
	} else {
		url = 'mongodb://book_usr:book_pass@ds161475.mlab.com:61475/book-store';
	}	
		mongodb.connect(url, function(err, db) {
			var collection = db.collection('books');
			
			collection.find({}).toArray(
				
				function(err, results) {
					
					/*if(results) {
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
							  					message: 'No vailable books'
						    		});
							}*/
							
						 res.status(201).json({
							message: "Book list fetched successfully",
							post: results
					});
			});

		});
	};

	var getById = function(req, res) {
		var receivedId = new ObjectId(req.params.id);
		
	var url = '';
	if(port === 5000) {	
		url = 'mongodb://localhost/libraryApp';
	} else {
		url = 'mongodb://book_usr:book_pass@ds161475.mlab.com:61475/book-store';
	}	
		

		mongodb.connect(url, function(err, db) {
			var collection = db.collection('books');
			
			collection.findOne({
					_id: receivedId
				},
				function(err, results) {
							res.status(201).json({
							message: "Book fetched successfully",
							book: results
						});
					/*
					if(results.bookId) {
						
						bookService.getBookById(results.bookId,
								function(err, book) {
									results.book = book;
									res.render('bookView', {
			    					title: 'Book details', 
			    					nav: nav,
				  					book: results,
				  					apiImg: 'yes'
				    			  });
							});

								} else {
									res.render('bookView', {
			    					title: 'Book details', 
			    					nav: nav,
				  					book: results,
				  					apiImg: 'no'
				    			  });
								}	
						*/		
				});
			});
		};

	return {
		getIndex: getIndex,
		getById: getById,
		middlewareSecureRoute: middlewareSecureRoute
	};
};


module.exports = bookController;