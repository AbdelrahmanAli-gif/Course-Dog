/* save obj to the local storage */
export const setAuthUser = (token) => {
    localStorage.setItem("authToken", JSON.stringify(token));
};

/* gets object from the local storage */
export const getAuthUser = () => {
    if (localStorage.getItem("authToken")) {
        return JSON.parse(localStorage.getItem("authToken"));
    }
};

export const removeAuthUser = () => {
    if (localStorage.getItem("authToken")) {
        localStorage.removeItem("authToken");
    }
};

export const setAuthGroup = (group) => {
    localStorage.setItem("group", JSON.stringify(group));
}

export const getAuthGroup = () => {
    if (localStorage.getItem('group')) {
        return JSON.parse(localStorage.getItem('group'));
    }
}

export const removeAuthGroup = () => {
    localStorage.removeItem('group');
}

export const setAuthOrg = (org) => {
    localStorage.setItem("org", JSON.stringify(org));
}

export const getAuthOrg = () => {
    if (localStorage.getItem('org')) {
        return JSON.parse(localStorage.getItem('org'));
    }
}

export const removeAuthOrg = () => {
    localStorage.removeItem('org');
}