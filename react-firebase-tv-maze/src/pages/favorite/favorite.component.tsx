import MyNavbar from "../../components/navbar/navbar.component";
import { takeFavorite } from "../../_service/firebase/firebasesDb.service";

export async function loader() {
    const { uid } = JSON.parse(localStorage.getItem('user')!)
    
    return takeFavorite(uid);
}
const Favorite = () => {

    return (<MyNavbar user={localStorage.getItem('user')} />)

}

export default Favorite;