const express = require('express');
const app = express();
const morgan = require('morgan');
var db = require("./db.js")
var bodyParser = require('body-parser')

app.set('port', process.env.PORT || 3000) 
// create application/json parser
var jsonParser = bodyParser.json()
 
app.use(morgan('tiny'));

app.get('/', (req, res, next) => {
	res.send('<h1>Hello world<h1>');
})

app.get("/api/clients", (req, res, next) => {
    var sql = "select * from clients"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        return res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.post("/api/clients",  jsonParser, (req, res, next) => {
	const { id, companyName, credits } = req.body;

	if (!id || !companyName || !credits)
		res.status(400).json({"error": `id, companyName and credits required`});
	
    var sql = `INSERT INTO clients (id, companyName, credits) VALUES("${id}", "${companyName}", "${credits}")`
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        return res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.patch("/api/clients/:id",  jsonParser, (req, res, next) => {
	const updates = [];
	let setStr = "SET ";

	Object.keys(req.body).forEach(key => {
		updates.push({
			name : key,
			value : req.body[key]
		})
	})
	updates.forEach(entry => {
		setStr += `${entry.name} = "${entry.value}",`
	})
	setStr = setStr.slice(0, -1);
    var sql = `UPDATE clients ${setStr} WHERE id = ${req.params.id}`
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        return res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.get("/api/jobs", (req, res, next) => {
    var sql = "select * from job"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        return res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.post("/api/jobs",  jsonParser, (req, res, next) => {
	const { id, parttimer, cost, clientId} = req.body;

	if (!id || !parttimer || !cost || !clientId)
		res.status(400).json({"error": `id,  parttimer, cost, clientId required`});
	
    var sql = `INSERT INTO job (id, parttimer, cost, clientId) VALUES("${id}", "${parttimer}", "${cost}", "${clientId}")`
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        return res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.patch("/api/jobs/:id",  jsonParser, (req, res, next) => {
	const updates = [];
	let setStr = "SET ";

	Object.keys(req.body).forEach(key => {
		updates.push({
			name : key,
			value : req.body[key]
		})
	})
	updates.forEach(entry => {
		setStr += `${entry.name} = "${entry.value}",`
	})
	setStr = setStr.slice(0, -1);
    var sql = `UPDATE job ${setStr} WHERE id = ${req.params.id}`
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        return res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.listen(app.get('port'), () => {
	console.info(`Server listen on port ${app.get('port')}`);
})