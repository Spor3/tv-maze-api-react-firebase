import { ShowDetailType } from "../../_service/api/index.service";
import { addPrefer, deleteFavorite } from "../../_service/firebase/firebasesDb.service";
import { TagsFill, HandThumbsUp, Bag, BagX } from 'react-bootstrap-icons';
import { useAppSelector } from '../../app/hooks';
import { selectTheme } from '../../features/theme/themeSlice';
import { useState } from "react";

type PropsCard = {
    data: ShowDetailType,
    isFavorite:boolean,
    animationDelay: number
}

const CardDetail = ({ data, isFavorite, animationDelay }: PropsCard) => {

    const theme = useAppSelector(selectTheme);
    const [favoriteChanged, setFavoriteChange] = useState<boolean>(isFavorite); 

    const handleAddFavorite = () => {
        
        const { uid } = JSON.parse(localStorage.getItem('user')!);
        addPrefer(uid, data);
        setFavoriteChange(true)
    }

    const handleRemoveFavorite = () => {
        
        const { uid } = JSON.parse(localStorage.getItem('user')!);
        deleteFavorite(uid, data);
        setFavoriteChange(false)
    }

    return (
        <article className={`${theme == 'dark'?'dark':'ligth'} postcard yellow animate-in`} style={{animationDelay: animationDelay * 200 + 'ms'}}>
            <div className="postcard__img_link">
                <img className="postcard__img" src={data.image?.original} alt={data.title} />
            </div>
            <div className={`${theme == 'ligth'?'t-dark':''} postcard__text`}>
                <h1 className="postcard__title yellow">{data.title}</h1>
                <div className="postcard__bar"></div>
                <div className="postcard__preview-txt">{!!data.summary ? data.summary.replace(/<\/?[\w\s]*>|<.+[\W]>/g, '') : 'Description Not Found'}</div>
                <ul className="postcard__tagbox">
                    <li className="tag__item d-flex align-items-center"><TagsFill className={data.genres ? '':'d-none'} /><>{data.genres?data.genres.join(','):'Genres Not Found'}</></li>
                    <li className="tag__item d-flex align-items-center"><>{data.avgRating ? data.avgRating + '/10' : 'Rating Not Found'}</><HandThumbsUp className={data.avgRating ? '':'d-none'} /></li>
                    <li className={favoriteChanged? "d-none":"tag__item play yellow d-flex align-items-center"}>
                        <p onClick={handleAddFavorite} className="m-0">Add Favorite</p>
                        <Bag />
                    </li>
                    <li className={!favoriteChanged? "d-none":"tag__item play yellow d-flex align-items-center"}>
                        <p onClick={handleRemoveFavorite} className="m-0">Remove Favorite</p>
                        <BagX />
                    </li>
                </ul>
            </div>
        </article>
    )
}

export default CardDetail;