const getStringForApi = (data: string) => data.toLowerCase().replaceAll(' ', '_');

const capitalizeFirstLetter = (str: string) => {
    return str[0].toUpperCase() + str.slice(1)
}

export { getStringForApi, capitalizeFirstLetter };
