module.exports = {
  type: 'mongodb',
  host: 'localhost',
  port: 27017,
  database: 'gbt-db',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};
