// Manage Roles (id, name)
const express = require('express')
const helmet = require('helmet')
const knex = require('knex')

const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: './data/lambda.sqlite3',
  },
  useNullAsDefault: true, // needed for sqlite
};
const db = knex(knexConfig)

const server = express()

server.use(helmet())
server.use(express.json())

// cohort endpoints
server.get('/api/cohorts', async (req, res) => {
  // get the cohorts from the database
  try {
    const cohort = await db('cohorts') // all the records from the table
    res.status(200).json(cohort)
  } catch (error) {
    res.status(500).json(error)
  }
})

// list by id
server.get('/api/cohorts/:id', async (req, res) => {
  // get the id from the database
  try {
    const cohortid = await db('cohorts')
      .where({ id: req.params.id })
      .first();
    res.status(200).json(cohortid)
  } catch (error) {
    res.status(500).json(error)
  }
})



server.get("/api/cohorts/:id/students", async (req, res) => {
  try {
    const cohort = await db('cohorts')
      .select("cohorts.id", "students.name")
      .innerJoin("students", "cohorts.id", "students.cohort_id")
      .where({ cohort_id: req.params.id });
    res.status(200).json(cohort)
  } catch (error) {
    res.status(500).json(error)
  }
  });

const errors = {
  '19': 'Another record with that value exists',
}

// 
server.post('/api/cohorts', async (req, res) => {
  try {
    const [id] = await db('cohorts').insert(req.body)

    const role = await db('cohorts')
      .where({ id })
      .first();

    res.status(201).json(role);
  } catch (error) {
    const message = errors[error.errno] || 'We ran into an error'
    res.status(500).json({ message, error })
  }
})
// update 
server.put('/api/cohorts/:id', async (req, res) => {
  try {
    const count = await db('cohorts')
      .where({ id: req.params.id })
      .update(req.body);

    if (count > 0) {
      const role = await db('cohorts')
        .where({ id: req.params.id })
        .first()

      res.status(200).json(role);
    } else {
      res.status(404).json({ message: 'Records not found' })
    }
  } catch (error) {}
})

// remove cohort by id (inactivate the id)
server.delete('/api/cohorts/:id', async (req, res) => {
  try {
    const count = await db('cohorts')
      .where({ id: req.params.id })
      .del();

    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Records not found' })
    }
  } catch (error) {}
})

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\nrunning on ${port}\n`))
