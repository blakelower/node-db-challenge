const db = require("../data/migrations/db-config");

module.exports = {
    findProjects,
    findById,
    add,
    remove,
    addTask
}

function findProjects(){
    return db("projects");
}

function findById(id){
    return db("projects").where({id})
}

function add(project){
    return db("projects").insert(project)
}

function remove(id){
    return db("projects")
    .where({id})
    .del();
}

function addTask(taskData, project_id){
    return db('task').insert({...taskData, project_id:project_id})
}