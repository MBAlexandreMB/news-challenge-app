import { BORDER_SIZES, ICON_SIZES } from '../contants';
import './Loader.scss';

const Loader = ({size = ICON_SIZES.XL, borderSize = BORDER_SIZES.XL}) => {
    size = size + 'px';
    
    return (
        <div
            className="lds-ring"
            style={{
                width: size,
                height: size,
            }}
        >
            <div
                style={{
                    width: size,
                    height: size,
                    borderWidth: borderSize,
                }}
            ></div>
            <div
                style={{
                width: size,
                height: size,
                borderWidth: borderSize,
            }}
            >
            </div>
            <div
                style={{
                width: size,
                height: size,
                borderWidth: borderSize,
            }}
            >
            </div>
            <div
                style={{
                width: size,
                height: size,
                borderWidth: borderSize,
            }}
            >
            </div>
        </div>
    );
}
 
export default Loader;