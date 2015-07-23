/**
 * Local environment settings
 *
 * DO NOT PUT SENSITIVE INFO IN HERE (yet)
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the local             *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  models: {
    connection: 'postgresLocal',
    migrate: 'alter',
  },

};
