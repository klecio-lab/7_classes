exports.up = function(knex) {
    return knex.schema.createTable('usuarios', function (table) {
      table.increments();
      table.string('nome').notNullable();
      table.string('email').notNullable();
      table.string('senha').notNullable();
      table.string('data_nascimento').nullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('usuarios');
  };  