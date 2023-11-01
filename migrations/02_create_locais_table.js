exports.up = function(knex) {
  return knex.schema.createTable('locais', function(table) {
    table.increments('id').primary();
    table.string('endereco').notNullable();
    table.string('cidade').notNullable();
    table.string('estado').notNullable();
    table.string('pais').notNullable();
    table.string('complemento').notNullable();
    table.integer('usuario_id').unsigned();
    table.foreign('usuario_id').references('usuarios.id');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('locais');
};
