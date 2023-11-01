exports.up = function(knex) {
  return knex.schema.createTable('patrocinadores', function(table) {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.integer('evento_id').unsigned();
    table.foreign('evento_id').references('eventos.id');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('patrocinadores');
};
