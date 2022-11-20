import { useLoaderData } from "react-router-dom";
import { Container } from "react-bootstrap";
import MyNavbar from "../../components/navbar/navbar.component";
import CardDetail from "../../components/detailCard/detailCard.component";
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
      <Container className="d-flex flex-column align-items-center min-h-85">
      <h2 className="text-center page-title mt-3 animate-in" style={{animationDelay:'600ms'}}>{'Favorite'}</h2>
      <Container className="m-5">
        {!!favoriteData? favoriteData.map((e:any, i:number) =>{
          return <CardDetail key={e.id} data={e} isFavorite={true} animationDelay={i+3} />
        }):'NO Favorite'}
        </Container>
      </Container>
    </ ProtectedRoute>
  );
};

export default Favorite;
