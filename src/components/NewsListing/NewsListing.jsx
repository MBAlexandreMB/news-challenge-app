import NewsCard from './NewsCard/NewsCard';
import './NewsListing.scss';

const NewsListing = ({ newsList, onSelectNews, isAnyNewsSelected }) => {
    const classSelected = isAnyNewsSelected ? 'selected' : '';

    return (
        <ul className={`news-listing-container ${classSelected}`}>
            {
                newsList.length > 0 &&
                newsList.map(newsInfo => (
                    <li key={newsInfo.url}>
                        <NewsCard key={newsInfo.url} news={newsInfo} onSelectNews={onSelectNews} />
                    </li>
                ))
            }
        </ul>
    );
};
 
export default NewsListing;