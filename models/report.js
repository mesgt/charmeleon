module.exports = function(sequelize, DataTypes) {
    var Report = sequelize.define("Report", {
            crime: { //from drop down menu??
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    len: [1]
                }
            },
            location: { //geo data??
                type: DataTypes.TEXT,
                allowNull: false,
                len: [1]
            },
            date: { //geo data??
                type: DataTypes.TEXT,
                allowNull: false,
                len: [1]
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
                len: [1]
            },
        },

    );

    return Report;
};