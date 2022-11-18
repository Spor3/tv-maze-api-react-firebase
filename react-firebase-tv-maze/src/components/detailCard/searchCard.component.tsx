import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ShowDetailType } from "../../_service/api/index.service";
import { Star, StarFill } from 'react-bootstrap-icons';
import { addPrefer, deleteFavorite } from "../../_service/firebase/firebasesDb.service";

type PropsCard =  {
    e:ShowDetailType,
    i:number
}

const SearchCard = ({e,i}:PropsCard) => {

    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    useEffect(() => {
        const storage = JSON.parse(localStorage.getItem('favorites') || '');
        storage.forEach((element:ShowDetailType) => {
            if(element.id === e.id)
                setIsFavorite(true);
        });
    },[])

     const handleAddFavorite = () => {
        
        const { uid } = JSON.parse(localStorage.getItem('user')!);
        addPrefer(uid, e);
        setIsFavorite(true)
    }

    const handleRemoveFavorite = () => {
        
        const { uid } = JSON.parse(localStorage.getItem('user')!);
        deleteFavorite(uid, e);
        setIsFavorite(false)
    } 

  return (
    <Col className="d-flex justify-content-center mb-4">
        <Card
          style={{ width: "18rem", animationDelay: 100 * i + "ms" }}
          className="animate-left-in"
        >
          <Link to={"/search/" + e.id}>
          <Card.Img variant="top" src={e.image?.medium} />
          </Link>
          <Card.Body>
            <Card.Title>{e.title} {isFavorite? <StarFill className="cursor" onClick={handleRemoveFavorite} />: <Star className="cursor" onClick={handleAddFavorite} />} </Card.Title>
            <Card.Text>{e.type}</Card.Text>
          </Card.Body>
        </Card>
    </Col>
  );
};

export default SearchCard;