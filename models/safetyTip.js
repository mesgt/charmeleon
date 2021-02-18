module.exports = function(sequelize, DataTypes) {
        var Tips = sequelize.define("safetyTips", {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            body: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            primaryKey: true
        });

        return Tips;
    }
