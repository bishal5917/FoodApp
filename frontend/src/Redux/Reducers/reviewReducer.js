import { REVIEW_GET_REQUEST, REVIEW_GET_SUCCESS, REVIEW_GET_FAIL }
  from "../Constants/reviewConstants";
import { REVIEW_ADD_REQUEST, REVIEW_ADD_SUCCESS, REVIEW_ADD_FAIL }
  from "../Constants/reviewConstants";
import { REVIEW_DEL_REQUEST, REVIEW_DEL_SUCCESS, REVIEW_DEL_FAIL }
  from "../Constants/reviewConstants";

const initialreviewstate = {
  loading: false,
  fetched: false,
  reviews: [],
  error: null
}
export const reviewReducer = (state = { initialreviewstate }, action) => {
  switch (action.type) {
    case REVIEW_GET_REQUEST:
      return {
        ...state, loading: true
      }
    case REVIEW_GET_SUCCESS:
      return {
        ...state, loading: false, fetched: true, reviews: action.payload
      }
    case REVIEW_GET_FAIL:
      return {
        ...state, loading: false, error: action.payload.error.message
      }
    default:
      return state;
  }
};

export const reviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case REVIEW_ADD_REQUEST:
      return { loading: true };
    case REVIEW_ADD_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case REVIEW_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const reviewDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case REVIEW_DEL_REQUEST:
      return { loading: true };
    case REVIEW_DEL_SUCCESS:
      return { loading: false, success: true };
    case REVIEW_DEL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};