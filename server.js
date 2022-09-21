// server.js
const express=require('express');
const bodyParser=require('body-parser')
const app =express();
const MongoClient=require('mongodb').MongoClient


MongoClient.connect('mongodb+srv://maggiexiong:Tractor5566@cluster0.ly0kdnu.mongodb.net/?retryWrites=true&w=majority', {useUnifiedTopology: true})
	.then(client => {
		console.log('Connected to Database')
		const db=client.db('quote-generator')
		const quotesCollection=db.collection('quotes')
		//Make sure to place body-parser before you CRUD handlers
		app.use(bodyParser.urlencoded({ extended: true }))
		app.get('/', (req, res)=> {
        		const cursor=db.collection('quotes').find()
			console.log(cursor)
			res.sendFile(__dirname+'/index.html')
		})
		//Note: __dirname is the current directory you are in.
		app.post('/quotes', (req, res)=> {
			quotesCollection.insertOne(req.body)
        		.then(result => {
				res.redirect('/')
			})
			.catch(error => console.error(error))
		})
		app.listen(3000, function() {
        		console.log('listening on 3000')
		})
	})
	.catch(error => console.error(error))
