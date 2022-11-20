import { Container } from "react-bootstrap";
import { useLoaderData, useNavigate } from "react-router-dom";
import CardDetail from "../../components/detailCard/detailCard.component";
import { getShowById, ShowDetailType } from "../../_service/api/index.service";
import MyNavbar from "../../components/navbar/navbar.component";
import ProtectedRoute from "../../components/protectedPage/protectedPage.component";
import { ArrowLeft } from 'react-bootstrap-icons';

export async function loader({ params }: any) {     

    const data = await getShowById(params.id) as ShowDetailType;
    let isFavorite = false; 
    console.log(data)
    const storage = JSON.parse(localStorage.getItem('favorites')!);
      if(data !== null){
         storage.forEach((e:ShowDetailType) =>{        
            if(e.id === data.id){
                isFavorite = true
            }
         })  
        }   

    return [data, isFavorite];
}
const Detail = () => {
    const load:any = useLoaderData();
    const showData = load[0];
    const isFavorite = load[1];
    const navigate = useNavigate();

    return (
    <ProtectedRoute user={localStorage.getItem('user')}> 
          <MyNavbar user={localStorage.getItem("user")} />
        <Container className="d-flex flex-column align-items-center min-h-85">
          <div className="d-flex align-items-center mt-5 justify-content-between w-100"><ArrowLeft className="page-title cursor animate-in" onClick={() => navigate(-1)}/><h2 className="mb-0 page-title me-2 animate-in">{showData.title.toUpperCase()}</h2></div>
          <div className="my-auto">
          <CardDetail data={showData} isFavorite={isFavorite} animationDelay={1}/>
          </div>
        </Container>
        </ProtectedRoute>);
};

export default Detail