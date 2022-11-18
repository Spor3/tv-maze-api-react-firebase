import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useLoaderData, Link, useNavigate } from "react-router-dom";
import CardDetail from "../../components/detailCard/detailCard.component";
import { getShowById, ShowDetailType } from "../../_service/api/index.service";
import MyNavbar from "../../components/navbar/navbar.component";
import ProtectedRoute from "../../components/protectedPage/protectedPage.component";

export async function loader({ params }: any) {     

    const data = await getShowById(params.id) as ShowDetailType;
    let isFavorite = false; 

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
    const navigate = useNavigate();
    console.log(load)

    return (<ProtectedRoute user={localStorage.getItem('user')}> 
          <MyNavbar user={localStorage.getItem("user")} />
        <Container className="d-flex align-items-center min-h-85 animate-in" style={{animationDelay:'100ms'}}>
          <CardDetail data={load[0]} isFavorite={load[1]}/>
        </Container>
        </ProtectedRoute>);
};

export default Detail