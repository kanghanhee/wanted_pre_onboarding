module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'post',
    {
      post_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      position: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      compensation: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      tech: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      company_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'company',
          key: 'company_id',
        },
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    },
  );
};
