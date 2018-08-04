import produce from "immer";
import {
    GET_MEDIA_START,
    GET_MEDIA_SUCCESS,
    GET_MEDIA_ERROR,
} from "./storeTypes";

const initialState = {
    user: {
        email: "",
        password: "",
    },
    media: [],
}

const loginReducer = (state, action) => {
    produce(state, draft => {
        switch (action.type) {
            case GET_MEDIA_SUCCESS:
                draft.media = action.media
        }
    })
};

export default loginReducer;
