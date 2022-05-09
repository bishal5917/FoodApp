import { REVIEW_GET_REQUEST, REVIEW_GET_SUCCESS, REVIEW_GET_FAIL }
    from "../Constants/reviewConstants";
import { REVIEW_ADD_REQUEST, REVIEW_ADD_SUCCESS, REVIEW_ADD_FAIL }
    from "../Constants/reviewConstants";
import { REVIEW_DEL_REQUEST, REVIEW_DEL_SUCCESS, REVIEW_DEL_FAIL }
    from "../Constants/reviewConstants";
import axios from 'axios'

export const getReview = (page, foodId) => async (dispatch) => {
    dispatch({ type: REVIEW_GET_REQUEST })
    try {
        const resp = await axios.get(`/reviews?pdid=${foodId}&page=${page}`)
        let sorted = resp.data.data.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })
        dispatch({ type: REVIEW_GET_SUCCESS, payload: sorted })

    } catch (error) {
        dispatch({ type: REVIEW_GET_FAIL, payload: error.message })
    }
}

export const createReview = (hotelId, productId, rating, reviewerId, reviewername, reviewText) => async (dispatch) => {
    dispatch({ type: REVIEW_ADD_REQUEST })
    try {
        const { data } = await axios.post('/reviews/createreview', {
            hotelId, productId, rating, reviewerId, reviewername, reviewText
        })
        dispatch({ type: REVIEW_ADD_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: REVIEW_ADD_FAIL, payload: error.message })
    }
}

export const deleteReview = (rvId, loggedinuserId) => async (dispatch) => {
    dispatch({ type: REVIEW_DEL_REQUEST })
    try {
        await axios.delete('/reviews/delete/' + rvId, {
            data: { userId: loggedinuserId }
        })
        dispatch({ type: REVIEW_DEL_SUCCESS })

    } catch (error) {
        dispatch({ type: REVIEW_DEL_FAIL, payload: error.message })
    }
}