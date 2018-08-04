// @flow
import { pixabayAPIKey } from "../../constants";
import {
    GET_MEDIA_START,
    GET_MEDIA_SUCCESS,
    GET_MEDIA_ERROR,
} from "./storeTypes";

// Action Creators
export const getMediaStart = () => {
    return {
        type: GET_MEDIA_START,
    }
}

export const getMediaSuccess = (media) => {
    return {
        type: GET_MEDIA_SUCCESS,
        media,
    }
};

export const getMediaError = () => {
    return {
        type: GET_MEDIA_ERROR,
    }
};

// Methods
export const getImages = (categories) => {
    const pixabayURL = `https://pixabay.com/api/?key=${pixabayAPIKey}`;

    // store.dispatch(getMediaStart());

    for (let elem of categories) {
        fetchMedia(`${pixabayURL}&q=${elem}`, elem);
    }
}

export const fetchMedia = (url, category) =>
    fetch(url)
        .then(response => response.json())
        .then(val => {
            // store.dispatch(getMediaSuccess(val))
            const oldImages = JSON.parse(localStorage.getItem("images"));
            let images = oldImages;
            
            if (!images) {
                images = {};
            }

            const newImages = val.hits.reduce((obj, item) => {
                obj[item.id] = item;
                return obj;
            }, {});

            images[category] = newImages;

            localStorage.setItem("images", JSON.stringify({ ...images }));
        })
        .catch(error => Promise.reject(`${error.message}`));
