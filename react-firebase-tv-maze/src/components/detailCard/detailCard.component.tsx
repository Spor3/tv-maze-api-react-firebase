import { ShowDetailType } from "../../_service/api/index.service";

type PropsCard = {
    data: ShowDetailType,
    handleAddFavorite:() => void,
    handleRemoveFavorite: () => void
}

const CardDetail = ({ data, handleAddFavorite , handleRemoveFavorite}: PropsCard) => {

    return (
        <article className="postcard dark yellow">
            <div className="postcard__img_link">
                <img className="postcard__img" src={data.image} alt={data.title} />
            </div>
            <div className="postcard__text">
                <h1 className="postcard__title yellow">{data.title}</h1>
                <div className="postcard__bar"></div>
                <div className="postcard__preview-txt">{!!data.summary ? data.summary.replace(/<\/?[\w\s]*>|<.+[\W]>/g, '') : 'Description Not Found'}</div>
                <ul className="postcard__tagbox">
                    <li className="tag__item"><i className="fas fa-tag mr-2"></i>{data.genres.join(',')}</li>
                    <li className="tag__item"><i className="fas fa-clock mr-2"></i>{data.avgRating ? data.avgRating + '/10' : 'Rating Not Found'}</li>
                    <li className="tag__item play yellow">
                        <p onClick={handleAddFavorite} className="m-0"><i className="fas fa-play mr-2"></i>Prefer</p>
                    </li>
                    <li className="tag__item play yellow">
                        <p onClick={handleRemoveFavorite} className="m-0"><i className="fas fa-play mr-2"></i>Prefer</p>
                    </li>
                </ul>
            </div>
        </article>
    )
}

export default CardDetail;