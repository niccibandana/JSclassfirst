var express = require('express');
var router = express.Router();

/* GET home page.*/
router.get('/', function(req, res) {
    res.render('index', { title: 'To Do List for Good Photos' });
});
/* GET New TASK page. */
router.get('/addtask', function(req, res) {
    res.render('addtask', { title: 'Add A New Task' });
});

/* GET TaskTracker page. */
router.get('/tasks', function(req, res) {
    res.render('tasks', { title: 'Task Tracker App !' });
});

module.exports = router;



 // POST to Add Task Service //
 router.post('/addtask', function(req, res) {

    // Set our internal DB variable
    var db = req.db;
    // Get our form values. These rely on the "name" attributes
    var taskName = req.body.taskname;
    var taskDesc = req.body.taskdesc;
    var completed = req.body.completed;
    var assigned = req.body.assign;

    // Set our collection
    var collection = db.get('usercollection');
    // Submit to the DB
    collection.insert({
        "task" : taskName,
        "description" : taskDesc,
        "completed": completed,
        "assigned": assigned
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("tasklist");
        }
    });
  });

  
      
 
  
  
  

/* GET tasklist page. */
router.get('/tasklist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('tasklist', {
            "tasklist" : docs
        });

    });
});