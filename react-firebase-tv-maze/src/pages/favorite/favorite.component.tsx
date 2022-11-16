import { useLoaderData } from "react-router-dom";
import MyNavbar from "../../components/navbar/navbar.component";
import { takeFavorite } from "../../_service/firebase/firebasesDb.service";

export async function loader() {
    const favoriteData = JSON.parse(localStorage.getItem('favorites') || '');
    
    return favoriteData;
}
const Favorite = () => {
    const favoriteData = useLoaderData();

    return (<MyNavbar user={localStorage.getItem('user')} />)

}

export default Favorite;