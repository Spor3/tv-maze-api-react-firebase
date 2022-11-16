import { Container } from "react-bootstrap";
import { useLoaderData, Link, useNavigate } from "react-router-dom";
import CardDetail from "../../components/detailCard/detailCard.component";
import { getShowById, ShowDetailType } from "../../_service/api/index.service";
import { addPrefer, deleteFavorite } from "../../_service/firebase/firebasesDb.service";

export async function loader({ params }: any) {
    return getShowById(params.id);
}
const Detail = () => {
    const data = useLoaderData() as ShowDetailType;
    const navigate = useNavigate()

    const handleAddFavorite = () => {
        
        const { uid } = JSON.parse(localStorage.getItem('user')!);
        addPrefer(uid, data);
    }

    const handleRemoveFavorite = () => {
        
        const { uid } = JSON.parse(localStorage.getItem('user')!);
        deleteFavorite(uid, data);
    }


    return (
        <Container className="d-flex align-items-center h-100">
            <CardDetail data={data} handleAddFavorite={handleAddFavorite} handleRemoveFavorite={handleRemoveFavorite} />
        </Container>);
};

export default Detail