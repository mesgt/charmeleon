module.exports = function(sequelize, DataTypes) {
    var Report = sequelize.define("Report", {
            category: { //from drop down menu??
                type: DataTypes.TEXT,
                allowNull: false,
                len: [1]
            },
            streetAddress: {
                type: DataTypes.TEXT,
                allowNull: false,
                len: [1]
            },
            city: {
                type: DataTypes.TEXT,
                allowNull: false,
                len: [1]
            },
            state: {
                type: DataTypes.TEXT,
                allowNull: false,
                len: [1]
            },
            zip: {
                type: DataTypes.INTEGER,
                allowNull: false,
                len: [1]
            },
            date: {
                type: DataTypes.DATEONLY,
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