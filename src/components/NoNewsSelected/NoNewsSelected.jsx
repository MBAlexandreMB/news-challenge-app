import { Fragment } from 'react';

import Loader from '../../shared/icons/Loader';
import './NoNewsSelected.scss';

const NoNewsSelected = ({isLoading}) => {
    return (
        <section className='no-news-container'>
            { isLoading
            ? <Loader />
            : (
                <Fragment>
                    <figure className="no-news-image">
                        <img src={process.env.PUBLIC_URL + '/images/newspaper.png'} alt='Newspaper' />
                    </figure>
                    <h1>Select something on the left list</h1>
                </Fragment>
            )}
        </section>
    );
}
 
export default NoNewsSelected;