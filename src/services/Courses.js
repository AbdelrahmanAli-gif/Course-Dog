import { getAuthUser } from "./Storage"
import axios from "../api/axios";

const SUBSCRIBED_COURSES_URL = "courses/list-user-courses/";
const ORGANIZATION_COURSES_URL = "courses/list-courses/";
const SUBCOURSES_URL = `courses/sub-courses/`;

const user = getAuthUser();
const config = {
    headers: {
        'Authorization': `Token ${user}`
    }
};

export const getSubscribedCourses = async () => {
    try {
        const response = await axios.get(
            SUBSCRIBED_COURSES_URL,
            config
        );
        return response.data;
    }
    catch (error) {
        console.log(error);
    };
}

export const getOrganizationCourses = async () => {
    try {
        const response = await axios.get(
            ORGANIZATION_COURSES_URL,
            config
        );
        const subscribedCourses = await getSubscribedCourses();
        const result = [];
        for (let i = 0; i < response.data.length; i++) {
            let flag = false;
            for (let j = 0; j < subscribedCourses.length; j++) {
                if (response.data[i].id === subscribedCourses[j].id) {
                    result.push({ ...response.data[i], statusCode: true });
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                result.push({ ...response.data[i], statusCode: false });
            }
        }
        return result;
    }
    catch (error) {
        console.log(error);
    };
}

export const getSubCourses = async (id) => {
    try {
        const response = await axios.get(
            `${SUBCOURSES_URL}${id}/`,
            config
        )
        return response.data;
    }
    catch (error) {
        console.log(error);
    };
}
