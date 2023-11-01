exports.up = function(knex) {
    return knex.schema.createTable('ingressos', function(table) {
      table.increments('id').primary();
      table.integer('usuario_id').unsigned();
      table.foreign('usuario_id').references('usuarios.id');
      table.integer('evento_id').unsigned();
      table.foreign('evento_id').references('eventos.id');
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('ingressos');
  };  