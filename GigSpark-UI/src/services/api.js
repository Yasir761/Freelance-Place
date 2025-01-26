const BASE_URL = import.meta.env.VITE_BASE_URL

export const User = {
    CREATE_ACCOUNT : BASE_URL + "/user/signup",
    LOGIN_USER : BASE_URL + "/user/login",
    LOGOUT : BASE_URL + "/user/logout",
    PROFILE_IMAGE :(firstName, lastName) => `${BASE_URL}/user/profileImage?firstName=${firstName}&lastName=${lastName}`,
    REFRESH_AUTH_TOKENS : BASE_URL + "/user/regenrate-tokens",
    CHANGE_PASSWORD : BASE_URL + "/user/change-password",
    UPDATE_PROFILE : BASE_URL + "/user/update-profile",
    VIEW_USER_PROFILE : (id) =>  `${BASE_URL}/user/${id}`,
}

export const Category = {
    GET_ALL_CATEGORY : BASE_URL + "/category",
    ADD_NEW_CATEGORY : BASE_URL + "/category/add-new",
    SINGLE_CATEGORY : (id) => `${BASE_URL}/category/${id}`,
}

export const Gig = {
    ALL_GIGS : BASE_URL + "/gig",
    ADD_NEW_GIG : BASE_URL + "/gig/add-new-gig",
    SINGLE_GIG : (id) => `${BASE_URL}/gig/${id}`,
    DELETE_GIG_IMAGE : (id, imageId) =>  `${BASE_URL}/gig/${id}/${imageId}`,
    UPDATE_GIG_SERVICE : (id) =>  `${BASE_URL}/gig/${id}/update-services`,
    UPDATE_GIG_IMAGES : (id, imageId) =>  `${BASE_URL}/gig/${id}/update-images`,
}

export const Payment = {
    GET_MY_ORDERS : BASE_URL + "/orders",
    CREATE_NEW_ORDER: BASE_URL +"/orders/new" ,
    VERIFY_PAYMENT: BASE_URL +"/orders/verify"
}