import NewsCard from './NewsCard/NewsCard';
import './NewsListing.scss';

const NewsListing = ({ newsList, onSelectNews, isAnyNewsSelected }) => {
    return (
        <div className={`news-listing-container ${isAnyNewsSelected ? 'selected' : ''}`}>
            {
                newsList.length > 0 &&
                newsList.map(newsInfo =>  <NewsCard key={newsInfo.url} news={newsInfo} onSelectNews={onSelectNews} />)
            }
        </div>
    );
};
 
export default NewsListing;