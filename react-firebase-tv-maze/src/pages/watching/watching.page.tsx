import ProtectedRoute from "../../components/protectedPage/protectedPage.component"
import MyNavbar from "../../components/navbar/navbar.component"

const loader = () => {
    const dataMyWatching = JSON.parse(localStorage.getItem('watching') || '{}');

    
}

const Watching = () => {

    return(
        <ProtectedRoute>
            <MyNavbar />

        </ProtectedRoute>
        
    )
}

export default Watching