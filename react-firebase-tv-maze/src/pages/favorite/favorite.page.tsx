import { useLoaderData } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ShowDetailType } from '../../_service/api/index.service'
import DropDownFilter from "../../components/dropDown/dropDownFilter.component";
import MyNavbar from "../../components/navbar/navbar.component";
import CardDetail from "../../components/detailCard/detailCard.component";
import ProtectedRoute from "../../components/protectedPage/protectedPage.component";
import { useEffect, useState } from "react";

export async function loader() {
  const favoriteData:ShowDetailType = JSON.parse(localStorage.getItem("favorites") || "");

  return favoriteData;
}
const Favorite = () => {
  const [favoriteData , setFavoriteData] = useState<any>(useLoaderData());
  const [filterData, setFilterData] = useState<any>();
  

  useEffect(() => {
    setFilterData(favoriteData.map((e:any, i:number) =>{
      return <CardDetail key={e.id} data={e} isFavorite={true} animationDelay={i+3} favoritePage={true} />
    }))
  }, [])

  const handleSortAlphabetic = () => {
       setFilterData(favoriteData.sort((a:ShowDetailType, b:ShowDetailType) => a.title.localeCompare(b.title)).map((e:any, i:number) =>{
        return <CardDetail key={e.id} data={e} isFavorite={true} animationDelay={1} favoritePage={true} />
      }));
  }

  const handleSortAlphabeticReverse = () => {
    setFilterData(favoriteData.sort((a:ShowDetailType, b:ShowDetailType) => a.title.localeCompare(b.title)).reverse().map((e:any, i:number) =>{
     return <CardDetail key={e.id} data={e} isFavorite={true} animationDelay={1} favoritePage={true} />
   }));
  }

   const handleSortNumericReverse = () => {
    setFilterData(favoriteData.filter((e:ShowDetailType) => !!e.avgRating).sort((a:ShowDetailType, b:ShowDetailType) => {  
      if(a.avgRating! > b.avgRating!)
        return 1
      else if(a.avgRating! < b.avgRating!)
        return -1
      else
        return 0
    }).map((e:any, i:number) =>{
     return <CardDetail key={e.id} data={e} isFavorite={true} animationDelay={1} favoritePage={true} />
   }));
  }

  const handleSortNumeric = () => {
    setFilterData(favoriteData.filter((e:ShowDetailType) => !!e.avgRating).sort((a:ShowDetailType, b:ShowDetailType) => {  
      if(a.avgRating! < b.avgRating!)
        return 1
      else if(a.avgRating! > b.avgRating!)
        return -1
      else
        return 0
    }).map((e:any, i:number) =>{
     return <CardDetail key={e.id} data={e} isFavorite={true} animationDelay={1} favoritePage={true} />
   }));
  }

  return (
    <ProtectedRoute>
      <MyNavbar activeLink="favorite"/>
      <Container className="d-flex flex-column align-items-center min-h-85">
        <div className="d-flex align-items-center justify-content-between w-100">
      <h2 className="text-center page-title mt-3 animate-in mx-auto" style={{animationDelay:'600ms'}}>{'Favorite'}</h2>

      <DropDownFilter handleSortAlphabetic={handleSortAlphabetic} handleSortAlphabeticReverse={handleSortAlphabeticReverse} handleSortNumeric={handleSortNumeric} handleSortNumericReverse={handleSortNumericReverse} />
    </div>
      <Container className="m-5">
        {!!favoriteData? filterData:'NO Favorite'}
        </Container>
      </Container>
    </ ProtectedRoute>
  );
};

export default Favorite;
