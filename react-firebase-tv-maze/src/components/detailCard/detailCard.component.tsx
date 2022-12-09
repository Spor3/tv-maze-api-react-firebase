import { ShowDetailType } from "../../_service/api/index.service";
import { TagsFill, HandThumbsUp, Bag, BagX } from 'react-bootstrap-icons';
import { useAppSelector } from '../../app/hooks';
import { selectTheme } from '../../features/theme/themeSlice';
import { selectSecondaryColor } from "../../features/secondaryColor/secondaryColor";
import useIsFavourite from "../../hooks/favourite/useIsFavourite.hook";
import useFirebaseFavourite from "../../hooks/favourite/useFavourite.hook";

type PropsCard = {
    data: ShowDetailType,
    animationDelay: number,
}

const CardDetail = ({ data, animationDelay }: PropsCard) => {

    const theme = useAppSelector(selectTheme);
    const ReduxSecondaryColor = useAppSelector(selectSecondaryColor);
    const [ isFavorite ] = useIsFavourite(data)
    const [ , addFavorite, removeFavorite ] = useFirebaseFavourite()

    return (
        <article className={`${theme == 'dark'?'dark':'ligth'} ${ReduxSecondaryColor} postcard animate-in`} style={{animationDelay: animationDelay * 200 + 'ms'}}>
            <div className="postcard__img_link">
                <img className="postcard__img" src={data.image?.original} alt='Image Not Found' />
            </div>
            <div className={`${theme == 'ligth'?'t-dark':''} postcard__text`}>
                <h1 className={`postcard__title ${ReduxSecondaryColor}`}>{data.title?data.title:'Title Not Found'}</h1>
                <div className="postcard__bar"></div>
                <div className="postcard__preview-txt">{!!data.summary ? data.summary.replace(/<\/?[\w\s]*>|<.+[\W]>/g, '') : 'Description Not Found'}</div>
                <ul className="postcard__tagbox">
                    <li className="tag__item d-flex align-items-center detail-card-button-size"><TagsFill className={data.genres ? '':'d-none'} /><p className="my-0 ms-1">{data.genres?data.genres.join(','):'Genres Not Found'}</p></li>
                    <li className="tag__item d-flex align-items-center detail-card-button-size"><HandThumbsUp className={data.avgRating ? '':'d-none'} /><p className="my-0 ms-1">{data.avgRating ? data.avgRating + '/10' : 'Rating Not Found'}</p></li>
                       
                    <li onClick={ () => addFavorite(data)} className={isFavorite? "d-none":`tag__item play ${ReduxSecondaryColor} d-flex align-items-center detail-card-button-size`}>
                    <Bag className="cursor" />
                        <p className="my-0 ms-1 cursor">Add Favorite</p>
                    </li>
                    
                    <li onClick={ () => removeFavorite(data)} className={!isFavorite? "d-none":`tag__item play ${ReduxSecondaryColor} d-flex align-items-center detail-card-button-size`}>
                    <BagX className="cursor" />
                        <p className="my-0 ms-1 cursor">Remove Favorite</p>
                    </li>
                </ul>
            </div>
        </article>
    )
}

export default CardDetail;