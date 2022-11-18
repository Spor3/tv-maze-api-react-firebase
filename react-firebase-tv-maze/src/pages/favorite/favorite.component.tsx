import { useLoaderData } from "react-router-dom";
import { Container } from "react-bootstrap";
import MyNavbar from "../../components/navbar/navbar.component";
import CardDetail from "../../components/detailCard/detailCard.component";
import { takeFavorite } from "../../_service/firebase/firebasesDb.service";
import { ShowDetailType } from "../../_service/api/index.service";
import ProtectedRoute from "../../components/protectedPage/protectedPage.component";

export async function loader() {
  const favoriteData = JSON.parse(localStorage.getItem("favorites") || "");

  return favoriteData;
}
const Favorite = () => {
  const favoriteData:any = useLoaderData();

  return (
    <ProtectedRoute user={localStorage.getItem('user')}>
      <MyNavbar user={localStorage.getItem("user")} activeLink="favorite"/>
      <Container className="d-flex flex-column align-items-center">
        {!!favoriteData? favoriteData.map((e:any) =>{
          return <CardDetail key={e.id} data={e} isFavorite={true} />
        }):'NO Favorite'}
      </Container>
    </ ProtectedRoute>
  );
};

export default Favorite;
