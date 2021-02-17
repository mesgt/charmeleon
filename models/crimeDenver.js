module.exports = function(sequelize, DataTypes) {
    var CrimeDenver = sequelize.define("CrimeDenver", {
            offense_type_id: { 
                type: DataTypes.TEXT,
                allowNull: true,
            },
            offense_category_id: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            first_occurrence_date: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            incident_address: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            geo_x: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            geo_y:{
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            geo_lon: {
                type: DataTypes.DECIMAL(23, 7),
                allowNull: false,
            },
            geo_lat: {
                type: DataTypes.DECIMAL(23, 7),
                allowNull: false,
            },
        },

    );

    return CrimeDenver;
};