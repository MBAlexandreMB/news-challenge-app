import axios from 'axios';

const http = axios.create({
    baseURL: "https://newsapi.org/v2/",
    headers: {
        "X-Api-Key": process.env.REACT_APP_NEWS_API_KEY,
    },
});

function* getNews(setNews, setNewsError, setIsLoading, setNewsLoaded, scheduler, searchValue) {
    let pageCounter = 0;
    while (true) {
        if (scheduler.isLastScheduled(scheduler.timestamp)) {
            pageCounter++;
            setIsLoading(true);
            const getNewsPromise = searchValue ? getSearchedNews(searchValue, pageCounter) : getTopHeadlines();
            
            getNewsPromise
            .then(result => {
                if (result && result.data) {
                    setNewsLoaded(true);
                    setNews(previousNews => [...previousNews, ...result.data.articles]);
                }
            })
            .catch(error => {
                setNewsError(error);
            })
            .finally(() => setIsLoading(false));
        }
        yield;
    }
}

const getTopHeadlines = () => http.get('/top-headlines?country=us');

const getSearchedNews = (searchValue, page) =>
    http.get(`/everything?q="${searchValue}"&pageSize=10&page=${page}`);

export { getNews };