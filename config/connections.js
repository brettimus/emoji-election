/**
 * Connections
 * (sails.config.connections)
 *
 * `Connections` are like "saved settings" for your adapters.  What's the difference between
 * a connection and an adapter, you might ask?  An adapter (e.g. `sails-mysql`) is generic--
 * it needs some additional information to work (e.g. your database host, password, user, etc.)
 * A `connection` is that additional information.
 *
 * Each model must have a `connection` property (a string) which is references the name of one
 * of these connections.  If it doesn't, the default `connection` configured in `config/models.js`
 * will be applied.  Of course, a connection can (and usually is) shared by multiple models.
 * .
 * Note: If you're using version control, you should put your passwords/api keys
 * in `config/local.js`, environment variables, or use another strategy.
 * (this is to prevent you inadvertently sensitive credentials up to your repository.)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.connections.html
 */

module.exports.connections = {

  /***************************************************************************
  *                                                                          *
  * Local disk storage for DEVELOPMENT ONLY                                  *
  *                                                                          *
  * Installed by default.                                                    *
  *                                                                          *
  ***************************************************************************/
  localDiskDb: {
    adapter: 'sails-disk'
  },

  /***************************************************************************
  *                                                                          *
  * The local database                                                       *
  *                                                                          *
  *                                                                          *
  ***************************************************************************/
  postgresLocal: {
    adapter: 'sails-postgresql',
    host: 'localhost',
    port: '5432',
    user: '',
    password: '',
    database: 'emoji_for_president_dev'
  },

  /***************************************************************************
  *                                                                          *
  * The development & prod databases                                         *
  *                                                                          *
  *                                                                          *
  ***************************************************************************/
  postgres: {
    adapter: 'sails-postgresql',
    host: process.env.EFP_POSTGRES_HOST,
    port: process.env.EFP_POSTGRES_PORT,
    user: process.env.EFP_POSTGRES_USER,
    password: process.env.EFP_POSTGRES_PW,
    database: process.env.EFP_POSTGRES_DBNAME
  },


  /***************************************************************************
  *                                                                          *
  * More adapters: https://github.com/balderdashy/sails                      *
  *                                                                          *
  ***************************************************************************/

};
