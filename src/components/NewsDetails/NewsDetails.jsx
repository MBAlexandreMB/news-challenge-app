import './NewsDetails.scss';

const NewsDetails = ({ news }) => {
    return ( <p>{news.description}</p> );
}
 
export default NewsDetails;