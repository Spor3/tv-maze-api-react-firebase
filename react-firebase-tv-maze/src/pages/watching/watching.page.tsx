import ProtectedRoute from "../../components/protectedPage/protectedPage.component"
import MyNavbar from "../../components/navbar/navbar.component"
import useFirebaseWatching from "../../hooks/watching/useWatching.hook"
import useFirebaseAllWatching from "../../hooks/watching/useWatchingAll.hook";
import { Container } from "react-bootstrap";
import CardDetail from "../../components/detailCard/detailCard.component";
import { ShowDetailType } from "../../_service/api/index.service";
import { useEffect, useState } from "react";

const Watching = () => {

    const [ watching ] = useFirebaseWatching();
    const [ allWatching ] = useFirebaseAllWatching();

    const [ all, setAll ] = useState<any>();

    useEffect(() => {
        setAll(allWatching?.map((e:ShowDetailType,i:number) => <CardDetail key={e.id} data={e} animationDelay={i} />))
    }, [ allWatching])

    return(
        <ProtectedRoute>
            <MyNavbar activeLink="watching" />
            <Container className="d-flex flex-column align-items-center min-h-85">
          {watching?<h2 className="page-title animate-in mb-2">Your Watching</h2>:''}
          {watching?<CardDetail data={watching} animationDelay={1} />:''}
          {allWatching?<h2 className="page-title animate-in mb-2">Other Users Watching</h2>:''}
          {all}
        </Container>


        </ProtectedRoute>
        
    )
}

export default Watching