import { NO_IMAGE_URL } from '../../shared/contants';
import { onImageLoadingError } from '../../shared/utils';
import './NewsDetails.scss';

const NewsDetails = ({ news }) => {
    const { title, description, url, content } = news;
    const urlToImage = news.urlToImage || NO_IMAGE_URL;

    let contentText = null;
    if (content) {
        const contentEndIdx = content.indexOf('…') + 2;
        contentText = content.substring(0, contentEndIdx);
    }

    return (
        <article className='news-details-container'>
            <div className='news-title-image-container'>
                <figure className='news-image'>
                    <img
                        src={urlToImage}
                        loading='lazy'
                        onError={onImageLoadingError}
                        alt=''
                    />
                </figure>
                <div>
                    <h2>{title}</h2>
                    <h4>{description}</h4>
                </div>
            </div>
            <section>
                {contentText}
                <a href={url} target="_blank" rel='noreferrer'>[continue reading]</a>
            </section>
        </article>
    );
}
 
export default NewsDetails;