// Migrations have 2 parts:

//1. what changes are to be applied to the database
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', function(tbl) {
    // by default it will create : primary key called id, integer, & auto-increment
    tbl.increments()
    tbl
      .string('name', 128)
      .notNullable() // check under "Chainable" section @ knexjs.org for chainable
      .unique()
    
    tbl.timestamps(true, true)


  })
}

// 2. how can i undo the changes 
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cohorts')
};
