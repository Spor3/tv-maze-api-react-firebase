import { ShowDetailType } from "../../_service/api/index.service";
import { addPrefer, deleteFavorite } from "../../_service/firebase/firebasesDb.service";
import { TagsFill, HandThumbsUp, Bag, BagX } from 'react-bootstrap-icons';
import { useAppSelector } from '../../app/hooks';
import { selectTheme } from '../../features/theme/themeSlice';
import { useState } from "react";

type PropsCard = {
    data: ShowDetailType,
    isFavorite:boolean,
    animationDelay: number,
    favoritePage:boolean
}

const CardDetail = ({ data, isFavorite, animationDelay, favoritePage }: PropsCard) => {

    const theme = useAppSelector(selectTheme);
    const [favoriteChanged, setFavoriteChange] = useState<boolean>(isFavorite);
    const [deleteCard, setDeleteCard ] = useState<boolean>(false);
    const [dNone, setDNone] = useState<boolean>(false);

    const handleAddFavorite = () => {
        
        const { uid } = JSON.parse(localStorage.getItem('user')!);
        addPrefer(uid, data);
        setFavoriteChange(true)
    }

    const handleRemoveFavorite = () => {

        const { uid } = JSON.parse(localStorage.getItem('user')!);
        deleteFavorite(uid, data);
        if(favoritePage) {
            setDeleteCard(true)
             setTimeout(() => {
                setDNone(true)
            },1100) 
        }  
        setFavoriteChange(false)
    }

    return (
        <article className={`${theme == 'dark'?'dark':'ligth'} ${deleteCard?'animate-out':''} ${dNone?'d-none':''} postcard yellow animate-in`} style={{animationDelay: animationDelay * 200 + 'ms'}}>
            <div className="postcard__img_link">
                <img className="postcard__img" src={data.image?.original} alt='Image Not Found' />
            </div>
            <div className={`${theme == 'ligth'?'t-dark':''} postcard__text`}>
                <h1 className="postcard__title yellow">{data.title?data.title:'Title Not Found'}</h1>
                <div className="postcard__bar"></div>
                <div className="postcard__preview-txt">{!!data.summary ? data.summary.replace(/<\/?[\w\s]*>|<.+[\W]>/g, '') : 'Description Not Found'}</div>
                <ul className="postcard__tagbox">
                    <li className="tag__item d-flex align-items-center detail-card-button-size"><TagsFill className={data.genres ? '':'d-none'} /><p className="my-0 ms-1">{data.genres?data.genres.join(','):'Genres Not Found'}</p></li>
                    <li className="tag__item d-flex align-items-center detail-card-button-size"><HandThumbsUp className={data.avgRating ? '':'d-none'} /><p className="my-0 ms-1">{data.avgRating ? data.avgRating + '/10' : 'Rating Not Found'}</p></li>
                    <li className={favoriteChanged? "d-none":"tag__item play yellow d-flex align-items-center detail-card-button-size"}>
                    <Bag className="cursor" />
                        <p onClick={handleAddFavorite} className="my-0 ms-1 cursor">Add Favorite</p>
                    </li>
                    <li className={!favoriteChanged? "d-none":"tag__item play yellow d-flex align-items-center detail-card-button-size"}>
                    <BagX className="cursor" />
                        <p onClick={handleRemoveFavorite} className="my-0 ms-1 cursor">Remove Favorite</p>
                    </li>
                </ul>
            </div>
        </article>
    )
}

export default CardDetail;