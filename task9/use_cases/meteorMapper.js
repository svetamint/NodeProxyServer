import getMeteorData from '../repository/meteorsClient.js'

const getMeteorDto = async (startDate, endDate, wereDangerousMeteors, count) => {
    const meteorData = await getMeteorData(startDate, endDate);
    const meteorDtoList = [];
    Object.values(meteorData).forEach((value) => {
        value.forEach(asteroid => {
            meteorDtoList.push({
                id: asteroid.id,
                name: asteroid.name,
                diameter: asteroid.estimated_diameter?.meters?.estimated_diameter_max || null,
                is_potentially_hazardous_asteroid: asteroid.is_potentially_hazardous_asteroid,
                close_approach_date_full: asteroid.close_approach_data?.[0]?.close_approach_date_full || null,
                relative_velocity: asteroid.close_approach_data?.[0]?.relative_velocity.kilometers_per_second || null
            });
        });
    });

    const responseData = {meteorData: meteorDtoList};

    if (wereDangerousMeteors) {
        responseData.wereDangerousMeteors = meteorDtoList.some(meteor => meteor.is_potentially_hazardous_asteroid);
    }

    if (count) {
        responseData.count = meteorDtoList.length;
    }
    return responseData;

}

export default getMeteorDto;

