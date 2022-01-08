import axios from 'axios';

const http = axios.create({
    baseURL: "https://newsapi.org/v2/",
    headers: {
        "X-Api-Key": process.env.REACT_APP_NEWS_API_KEY,
        "Authorization": process.env.REACT_APP_NEWS_API_KEY,
    },
});

const getNews = (setNews, setNewsError, setIsLoading) => {
    setIsLoading(true);
    http.get('/top-headlines?country=br')
        .then(result => {
            if (result && result.data) {
                setNews(result.data.articles);
            }
        })
        .catch(error => {
            setNewsError(error);
        })
        .finally(() => setIsLoading(false));
};

export { getNews };