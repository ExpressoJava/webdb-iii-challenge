
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').truncate()  // change table_name to roles. remove .del() and replaces with .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'webpt3_ray'},
        {name: 'webpt2'},
        {name: 'webpt5'}
      ])
    })
}

// to make this file:
// npx knex seed:make [filename: ex 001-filename]
// then 
// npx knex seed: run  // to inject data into
