module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'apply_post',
    {
      apply_post_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      post_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'post',
          key: 'post_id',
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'user_id',
        },
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    },
  );
};
