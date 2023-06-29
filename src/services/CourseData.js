import { getAuthUser } from "./Storage";
import axios from "../api/axios";

const COURSE_MATERIALS_URL = `materials/upload-material/`;
const COURSE_ANNOUNCEMENTS_URL = `announcements/manage-announcements/`;
const SUBCOURSE_MATERIALS_URL = `materials/sub-courses/`;
const SUBCOURSE_ANNOUNCEMENTS_URL = `announcements/sub-courses/`;

const user = getAuthUser();
const config = {
    headers: {
        'Authorization': `Token ${user}`
    }
};

export const getCourseMaterials = async (id) => {

    try {
        const response = await axios.get(
            `${COURSE_MATERIALS_URL}${id}/`,
            config
        );
        return {
            name: response.data.course.name,
            data: response.data.materials.reverse(),
            admin: response.data.is_course_admin,
            error: {
                errorState: false,
                errorMsg: ""
            }
        };
    }
    catch (error) {
        return {
            error: {
                errorState: true,
                errorMsg: error.message
            }
        };
    };
}

export const getCourseAnnouncements = async (id) => {

    try {
        const response = await axios.get(
            `${COURSE_ANNOUNCEMENTS_URL}${id}/`,
            config
        );
        return {
            name: response.data.course.name,
            data: response.data.announcements.reverse(),
            admin: response.data.is_course_admin,
            error: {
                errorState: false,
                errorMsg: ""
            }
        };
    }
    catch(error){
        return {
            error: {
                errorState: true,
                errorMsg: error.message
            }
        };
    };
}

export const getSubCourseMaterials = async (id, subId) => {

    try {
        const response = await axios.get(
            `${SUBCOURSE_MATERIALS_URL}${id}/${subId}`,
            config
        );
        return {
            name: response.data.course.name,
            data: response.data.materials.reverse(),
            admin: response.data.is_course_admin,
            error: {
                errorState: false,
                errorMsg: ""
            }
        };
    }
    catch(error){
        return {
            error: {
                errorState: true,
                errorMsg: error.message
            }
        };
    };
}

export const getSubCourseAnnouncements = async (id, subId) => {

    try {
        const response = await axios.get(
            `${SUBCOURSE_ANNOUNCEMENTS_URL}${id}/${subId}`,
            config
        );
        return {
            name: response.data.course.name,
            data: response.data.announcements.reverse(),
            admin: response.data.is_course_admin,
            error: {
                errorState: false,
                errorMsg: ""
            }
        };
    }
    catch(error){
        return {
            error: {
                errorState: true,
                errorMsg: error.message
            }
        };
    };
}