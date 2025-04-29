export function removeEmptyValues(data) {
    const cleanData = {};

    for (const key in data) {
        let parsed = null;

        try {
            parsed = JSON.parse(data[key]);
        } catch (e) {
            cleanData[key] = data[key]; // Keep as is if it's not a JSON string
            continue;
        }

        if (Array.isArray(parsed)) {
            // Filter out empty values in objects
            const filteredArray = parsed.map(entry => {
                const newEntry = {};
                for (const field in entry) {
                    if (entry[field]) {
                        newEntry[field] = entry[field];
                    }
                }
                return newEntry;
            }).filter(entry => Object.keys(entry).length > 0);

            if (filteredArray.length > 0) {
                cleanData[key] = JSON.stringify(filteredArray);
            }
        } else if (typeof parsed === 'object') {
            const newObj = {};
            for (const field in parsed) {
                if (parsed[field]) {
                    newObj[field] = parsed[field];
                }
            }
            if (Object.keys(newObj).length > 0) {
                cleanData[key] = JSON.stringify(newObj);
            }
        }
    }

    return cleanData;
}

export function flagEmptyKeys(data) {
    const cleanData = {};

    for (const key in data) {
        let parsed = null;

        try {
            parsed = JSON.parse(data[key]);
        } catch (e) {
            cleanData[key] = data[key]; // Keep as is if it's not a JSON string
            continue;
        }

        if (Array.isArray(parsed)) {
            const filteredArray = parsed.map(entry => {
                const newEntry = {};
                for (const field in entry) {
                    if (entry[field]) {
                        newEntry[field] = entry[field];
                    }
                }
                return newEntry;
            }).filter(entry => Object.keys(entry).length > 0);

            cleanData[key] = filteredArray.length > 0 ? JSON.stringify(filteredArray) : false;
        } else if (typeof parsed === 'object') {
            const newObj = {};
            for (const field in parsed) {
                if (parsed[field]) {
                    newObj[field] = parsed[field];
                }
            }
            cleanData[key] = Object.keys(newObj).length > 0 ? JSON.stringify(newObj) : false;
        } else {
            cleanData[key] = false;
        }
    }

    return cleanData;
}