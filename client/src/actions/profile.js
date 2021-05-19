import axios from 'axios'
import {setAlert} from './alert'
import {
    CLEAR_PROFILE,
    GET_PROFILE, 
    PROFILE_ERROR,
    UPDATE_PROFILE,
    DELETE_ACCOUNT
} from './types'


// Get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me')

        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })

    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}



//   Create or update profile
export const createProfile = (formData, history, edit = false ) => async dispatch => {
    try {
        const config = {
            headers :{
                'Content-Type':'application/json'
            }
        }

        const res = await axios.post('/api/profile', formData, config)

        dispatch({
            type:GET_PROFILE,
            payload: res.data
        })
        
        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success' ))

        if(!edit) {
            history.push('/dashboard')
        }

    } catch (err) {
        const errors = err.response.data.errors;
           
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }

}

// Add Experience
export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers :{
                'Content-Type':'application/json'
            }
        }
        console.log('yeahhh buddy')
        const res = await axios.put('/api/profile/experience', formData, config)

        dispatch({
            type:UPDATE_PROFILE,
            payload: res.data
        })
        history.push('/dashboard')
        dispatch(setAlert('Experience Added', 'success' ))

     
    } catch (err) {
        console.log(err)
        const errors = err.response.data.errors;
           
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}


// Add Education
export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers :{
                'Content-Type':'application/json'
            }
        }

        const res = await axios.put('/api/profile/education', formData, config)
        

        dispatch({
            type:UPDATE_PROFILE,
            payload: res.data
        })
        
        dispatch(setAlert('Education Added', 'success' ))

        history.push('/dashboard')
    } catch (err) {
        const errors = err.response.data.errors;
           
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}


// Delete Experience
export const deleteExperience = (id, history) => async dispatch => {
    try{
        const res = await axios.delete(`/api/profile/experience/${id}`)

        dispatch({
            type:GET_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Experience Deleted', 'success' ))
        history.push('/dashboard')
    }catch(err) {
        const errors = err.response.data.errors;
           
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
   
}

// Delete Education
export const deleteEducation = (id, history) => async dispatch => {
    try{
        const res = await axios.delete(`/api/profile/education/${id}`)

        dispatch({
            type:GET_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Education Deleted', 'success' ))
        history.push('/dashboard')
    }catch(err) {
        const errors = err.response.data.errors;
           
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
   
}

// Delete profile & user
export const deleteProfile = () => async dispatch => {
    if(window.confirm('Are you sure? This action cannot be undone!')){
        try {
            const res = await axios.delete(`/api/profile`)
    
            dispatch({
                type:CLEAR_PROFILE,
                payload: res.data
            })
            dispatch({
                type:DELETE_ACCOUNT,
                payload: res.data
            })
    
           
            dispatch(setAlert('Account Permenantly  Deleted' ))
        } catch (err) {
    
            dispatch({
                type:PROFILE_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status}
            })
        }
    }
  
}