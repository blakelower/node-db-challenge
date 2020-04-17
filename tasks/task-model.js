const db = require("../data/migrations/db-config");

module.exports = {
    findTasks,
    add
}

function findTasks(id){
    return db("projects as p")
    .select(
        "p.name",
        "p.description",
        "t.description",
        "t.notes",
        "t.completed",
        "t.projects_id"
    )
    .join("tasks as t", "t.project_id", "p.id")
    .where({project_id: id});
}

function add(task, id){
    return db("tasks")
    .where({project_id: id})
    .insert(task);
}