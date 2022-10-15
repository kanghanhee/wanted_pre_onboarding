const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
db.sequelize = sequelize;
db.Sequelize = Sequelize;

/** db 정의 */
db.user = require('./user')(sequelize, Sequelize);
db.company = require('./company')(sequelize, Sequelize);
db.post = require('./post')(sequelize, Sequelize);
db.applyPost = require('./applyPost')(sequelize, Sequelize);

/** 1 : N  company : post */
db.company.hasMany(db.post, { onDelete: 'cascade', foreignKey: 'company_id', sourceKey: 'company_id' });
db.post.belongsTo(db.company, { foreignKey: 'company_id', targetKey: 'company_id' });

/** N : M  user : post */
db.user.belongsToMany(db.post, { through: 'apply_post', as: 'applied', foreignKey: 'user_id' });
db.post.belongsToMany(db.user, { through: 'apply_post', as: 'applier', foreignKey: 'post_id' });

module.exports = db;
