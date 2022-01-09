import Cross from '../../shared/icons/Cross';
import { ICON_SIZES, NO_IMAGE_URL } from '../../shared/contants';
import { onImageLoadingError } from '../../shared/utils';
import './NewsDetails.scss';

const NewsDetails = ({ news, onClose }) => {
    const { title, description, url, content } = news;
    const urlToImage = news.urlToImage || NO_IMAGE_URL;

    let contentText = null;
    if (content) {
        const contentEndIdx = content.lastIndexOf('…');
        contentText = contentEndIdx !== -1
            ? content.substring(0, contentEndIdx + 1)
            : content;
    }

    return (
        <article className='news-details-container'>
            <figure className='news-image'>
                <button className='close-details-button' onClick={onClose}>
                    <Cross size={ICON_SIZES.S} />
                </button>
                <img
                    src={urlToImage}
                    loading='lazy'
                    onError={onImageLoadingError}
                    alt='' // The API returns no description of the image
                />
            </figure>
            <div className='news-title-content-container'>
                <h1>{title}</h1>
                <h2>{description}</h2>
                <p  className='content'>
                    <span data-test="content">{contentText}</span>
                    <a href={url} target="_blank" rel='noreferrer'>[continue reading]</a>
                </p>
            </div>
        </article>
    );
}
 
export default NewsDetails;