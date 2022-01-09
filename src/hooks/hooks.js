import { useState, useEffect, useMemo } from 'react';
import { Scheduler } from '../shared/utils';
import { getNews } from './api';

const useGetNews = (setIsLoading, setNewsLoaded, searchValue) => {
    console.log('useGetNews', searchValue);
    const [news, setNews] = useState([]);
    const [newsError, setNewsError] = useState(null);
    const [triggerLoadMoreNews, setTriggerMoreNews] = useState({});
    const [scheduler] = useState(new Scheduler());
    const getNewsIterator = useMemo(() =>
        getNews(setNews, setNewsError, setIsLoading, setNewsLoaded, scheduler, searchValue),
    [searchValue]);

    useEffect(() => {
        setNewsLoaded(false);
        setNews([]);
    }, [searchValue]);

    useEffect(() => {
        getNewsIterator.next();
    }, [setNews, setNewsError, setIsLoading, triggerLoadMoreNews, getNewsIterator, scheduler, searchValue]);

    const loadMoreNews = () => {
        setTriggerMoreNews({});
    }

    return [news, loadMoreNews, scheduler, newsError];
};

export { useGetNews };