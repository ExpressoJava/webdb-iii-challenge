exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Phillip', cohort_id: 1},
        {name: 'Joshua', cohort_id: 2},
        {name: 'Dan', cohort_id: 3},
        {name: 'Kelly', cohort_id: 4},
        {name: 'Alex', cohort_id: 5},
        {name: 'Jesse', cohort_id: 6},
        {name: 'Andrew', cohort_id: 7},
        {name: 'Bao', cohort_id: 8}
      ]);
    });
};