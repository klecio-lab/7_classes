exports.up = function(knex) {
  return knex.schema.createTable('eventos', function(table) {
    table.increments('id').primary();
    table.integer('usuario_id').unsigned();
    table.string('nome').notNullable();
    table.double('preco').notNullable();
    table.date('data');
    table.integer('local_id').unsigned();
    table.text('descricao');
    table.integer('capacidade');
    table.string('categoria');
    table.timestamps(true, true);

    table.foreign('usuario_id').references('usuarios.id');
    table.foreign('local_id').references('locais.id');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('eventos');
};
