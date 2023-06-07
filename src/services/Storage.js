/* save obj to the local storage */
export const setAuthUser = (data) => {
    localStorage.setItem("authToken", JSON.stringify(data));
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