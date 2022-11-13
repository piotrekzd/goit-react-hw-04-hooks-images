import axios from "axios";

const API_KEY = '29677253-331af6074919a5bc21fef774b';

export const fetchImg = async (query, page) => {
    const response = await axios.get
        (`https://pixabay.com/api/?key=${API_KEY}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=12&safesearch=true`);
    // console.log(response.data);
    return response.data.hits.map(image => {
        return {
            id: image.id,
            webformatURL: image.webformatURL,
            largeImageURL: image.largeImageURL,
            tags: image.tags
        };
    });
};