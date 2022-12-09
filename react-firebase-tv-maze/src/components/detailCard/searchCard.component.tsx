import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ShowDetailType } from "../../_service/api/index.service";
import { Star, StarFill } from 'react-bootstrap-icons';
import useIsFavourite from "../../hooks/favourite/useIsFavourite.hook";
import useFirebaseFavourite from "../../hooks/favourite/useFavourite.hook";

type PropsCard =  {
    e:ShowDetailType,
    i:number
}

const SearchCard = ({e,i}:PropsCard) => {

    const [ ,addFavorite, removeFavorite] = useFirebaseFavourite();
    const [ isFavorites ] = useIsFavourite(e);

  return (
    <Col className="d-flex justify-content-center mb-4">
        <Card
          style={{ width: "18rem", animationDelay: 25 * i + "ms" }}
          className="animate-in"
        >
          <Link to={"/search/" + e.id} className="overflow-hidden">
          <Card.Img variant="top" src={e.image?.medium} alt='Image Not Found' />
          </Link>
          <Link to={"/search/" + e.id}>
          <Card.Body>
            <Card.Title>{e.title?e.title:'TTitle Not Found'}</Card.Title>
            <Card.Text>{e.type?e.type:'Type Not Found'}</Card.Text>
          </Card.Body>
          </Link>
          {isFavorites? <StarFill className="cursor" onClick={() => removeFavorite(e)} />: <Star className="cursor" onClick={() => addFavorite(e)} />}
        </Card>
    </Col>
  );
};

export default SearchCard;
