import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useGetNews } from '../../hooks';
import { ICON_SIZES, BORDER_SIZES } from '../../shared/contants';
import Loader from '../../shared/icons/Loader';

import NewsCard from './NewsCard/NewsCard';
import './NewsListing.scss';

const NewsListing = ({ isAnyNewsSelected, isLoading, onSelectNews, setIsLoading, onNewsLoaded }) => {
    const [search, setSearch] = useState('');
    const [searchInputValue, setSearchInputValue] = useState('');
    const [newsList, loadMoreNews, scheduleASearch] = useGetNews(setIsLoading, onNewsLoaded, search);
    const classSelected = isAnyNewsSelected ? 'selected' : '';

    const onSearchInputChange = event => {
        const { value } = event.target;
        setSearchInputValue(value);

        scheduleASearch.start(1000, () => {
            setSearch(value);
        });
    }

    const { ref, inView } = useInView({
        threshold: 0.99,
        delay: 200,
    });

    useEffect(() => inView && loadMoreNews(), [inView]);

    return (
        <section className={`news-listing-container ${classSelected}`}>
            <input
                data-test="search-input"
                type="text"
                className='search-input'
                value={searchInputValue}
                placeholder='Search'
                onChange={onSearchInputChange}
            />
            <ul data-test="news-list" className={`news-listing-ul ${classSelected}`}>
                {
                    newsList.length > 0 &&
                    newsList.map((newsInfo, newsIdx) => {
                        const lastItem = newsList.length === newsIdx + 1;
                        return (
                            <li key={newsInfo.url} ref={lastItem ? ref : null}>
                                <NewsCard
                                    key={newsInfo.url}
                                    news={newsInfo}
                                    onSelectNews={onSelectNews}
                                />
                            </li>
                        )
                    })
                }
                { isLoading && <li className='cards-loading news-card-container'><Loader size={ICON_SIZES.L} borderSize={BORDER_SIZES.M} /></li> }
            </ul>
        </section>
    );
};
 
export default NewsListing;