exports.seed = function(knex) {
  return knex('users').insert([
    {username: 'Roy', password: 'password'},
    {username: 'Moss', password: 'password'},
    {username: 'Jen', password: 'password'},
    {username: 'Richmond', password: 'password'},
    {username: 'Douglas', password: 'password'},
    ]);
};