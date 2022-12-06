import { ShowDetailType } from "../../_service/api/index.service";
import { addPrefer, addWatching, deleteFavorite, deleteWatching } from "../../_service/firebase/firebasesDb.service";
import { TagsFill, HandThumbsUp, Bag, BagX } from 'react-bootstrap-icons';
import { useAppSelector } from '../../app/hooks';
import { selectTheme } from '../../features/theme/themeSlice';
import { selectSecondaryColor } from "../../features/secondaryColor/secondaryColor";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../hooks/context/UserContext";

type PropsCard = {
    data: ShowDetailType,
    isFavorite:boolean,
    animationDelay: number,
    favoritePage:boolean,
}

const CardDetail = ({ data, isFavorite, animationDelay, favoritePage }: PropsCard) => {

    const theme = useAppSelector(selectTheme);
    const {user}:any = useContext(UserContext);
    const ReduxSecondaryColor = useAppSelector(selectSecondaryColor);
    const [favoriteChanged, setFavoriteChange] = useState<{isFavorite:boolean,isWatching:boolean}>({isFavorite:isFavorite, isWatching:false});
    const [dNone, setDNone] = useState<boolean>(false);

    useEffect(() => {
        const dataWatching = JSON.parse(localStorage.getItem('watching') || '{}')
        if(dataWatching){
        if(dataWatching.id === data.id){
            setFavoriteChange({isFavorite:favoriteChanged.isFavorite,isWatching:true})
        }
    }
    }, [])

    const handleAddWatching = () => {
        const { uid } = user;
        addWatching(uid, data)
        setFavoriteChange({isFavorite:favoriteChanged.isFavorite,isWatching:true})
    }

    const handleRemoveWatching = () => {
        const { uid } = user;
        deleteWatching(uid)
        setFavoriteChange({isFavorite:favoriteChanged.isFavorite, isWatching:false})
    }

    const handleAddFavorite = () => {
        
        const { uid } = user;
        addPrefer(uid, data);
        setFavoriteChange({isFavorite:true, isWatching:favoriteChanged.isWatching})
    }

    const handleRemoveFavorite = () => {

        const { uid } = user;
        deleteFavorite(uid, data);
        if(favoritePage) {
            setDNone(true); 
        }  
        setFavoriteChange({isFavorite:false, isWatching:favoriteChanged.isWatching})
    }

    return (
        <article className={`${theme == 'dark'?'dark':'ligth'} ${dNone?'d-none':''} ${ReduxSecondaryColor} postcard animate-in`} style={{animationDelay: animationDelay * 200 + 'ms'}}>
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
                  {favoritePage?'':<>
                  <li onClick={handleAddWatching} className={favoriteChanged.isWatching?'d-none':`tag__item d-flex align-items-center detail-card-button-size play ${ReduxSecondaryColor}`}>  <p className="my-0 ms-1 cursor">Add To Watching</p></li>
                    <li onClick={handleRemoveWatching} className={!favoriteChanged.isWatching?'d-none':`tag__item d-flex align-items-center detail-card-button-size play ${ReduxSecondaryColor}`}>  <p className="my-0 ms-1 cursor">Remove To Watching</p></li></>}
                    
                    
                    <li onClick={handleAddFavorite} className={favoriteChanged.isFavorite? "d-none":`tag__item play ${ReduxSecondaryColor} d-flex align-items-center detail-card-button-size`}>
                    <Bag className="cursor" />
                        <p className="my-0 ms-1 cursor">Add Favorite</p>
                    </li>
                    
                    <li onClick={handleRemoveFavorite} className={!favoriteChanged.isFavorite? "d-none":`tag__item play ${ReduxSecondaryColor} d-flex align-items-center detail-card-button-size`}>
                    <BagX className="cursor" />
                        <p className="my-0 ms-1 cursor">Remove Favorite</p>
                    </li>
                </ul>
            </div>
        </article>
    )
}

export default CardDetail;