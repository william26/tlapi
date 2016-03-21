import pg from 'pg';
import squel from 'squel';

const squelPostgres = squel.useFlavour('postgres');

squelPostgres.cls.DefaultQueryBuilderOptions.replaceSingleQuotes = true;
squelPostgres.cls.DefaultQueryBuilderOptions.singleQuoteReplacement = '"';

module.exports = function (config) {

  const connString = `postgres://${config.dbuser}:${config.dbpassword}@${config.dbhost}/${config.dbname}`;

  return {
    insert: function (table, data) {
      return new Promise(function (resolve, reject) {
        pg.connect(connString, function (err, client, done) {
          if (err) {
            done();
            return reject(err);
          }

          const query = squelPostgres
            .insert()
            .into(table);
          Object
            .keys(data)
            .forEach(key => {
              query.set(`"${key}"`, data[key]);
            });

          query
            .returning('*');
          console.log(query.toString());
          client.query(query.toString(), function (err, result) {
            done();
            if (err) {
              return reject(err);
            }
            resolve(result.rows && result.rows[0]);
          });
        });
      });
    },
    select: function (table, conditions = {exact: {}, like: {}}) {
      return new Promise(function (resolve, reject) {
        pg.connect(connString, function (err, client, done) {
          if (err) {
            done();
            return reject(err);
          }

          const query = squelPostgres
            .select()
            .from(table);

          Object.keys(conditions.exact)
            .forEach(key => {
              query.where(`${key} = ?`, conditions.exact[key]);
            });

          client.query(query.toString(), function (err, result) {
            done();
            if (err) {
              return reject(err);
            }

            resolve(result.rows);
          })
        })
      });
    },
    delete: function (table, id) {
      return new Promise(function (resolve, reject) {
        pg.connect(connString, function (err, client, done) {
          if (err) {
            done();
            return reject(err);
          }

          const query = squelPostgres
            .delete()
            .from(table)
            .where('id = ?', id);
          console.log(query.toString());
          client.query(query.toString(), function (err, result) {
            done();
            if (err) {
              return reject(err);
            }

            resolve();
          });
        });
      });
    }
  };
}
