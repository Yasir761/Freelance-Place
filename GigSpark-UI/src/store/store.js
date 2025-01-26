
import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../slices/user.slice.js'
import categoryReducer from '../slices/category.slice.js'
import gigReducer from '../slices/gig.slice.js'
import showLoginFormReducer from '../slices/showLoginForm.slice.js'
import formStepReducer from '../slices/formSteps.js'

export const store = configureStore({
    reducer:{
        showAuthForm:showLoginFormReducer,
        user: userReducer,
        category: categoryReducer,
        gig: gigReducer,
        currentFormStep :formStepReducer
    }
})