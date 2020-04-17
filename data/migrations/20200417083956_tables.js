exports.up = function(knex) {
    return knex.schema
      .createTable("projects", tbl => {
        tbl.increments();
        tbl.string("name").notNullable();
        tbl.string("description");
        tbl
          .boolean("completed")
          .notNullable()
          .defaultTo(true);
      })
      .createTable("resources", tbl => {
        tbl.increments();
        tbl.string("name").notNullable();
        tbl.string("description");
      })
      .createTable("tasks", tbl => {
        tbl.increments();
        tbl.string("description").notNullable();
        tbl.string("notes");
        tbl
          .boolean("completed")
          .notNullable()
          .defaultTo(false);
        // foreign key
        tbl
          .integer("project_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("projects")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
      })
      .createTable("project_resources", tbl => {
        tbl.increments();
        // foreign key
        tbl
          .integer("project_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("projects")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
        // foreign key
        tbl
          .integer("resource_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("resources")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists("projects")
      .dropTableIfExists("resources")
      .dropTableIfExists("tasks")
      .dropTableIfExists("project_resources");
  };