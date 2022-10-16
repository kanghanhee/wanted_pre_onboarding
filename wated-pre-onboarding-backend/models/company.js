module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'company',
    {
      company_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      company_name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      area: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    },
  );
};
