
import { getShowsBySearch, ShowDetailType } from "../../_service/api/index.service";
import ProtectedRoute from "../../components/protectedPage/protectedPage.component";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Form, Row, Button, Container } from "react-bootstrap";
import SearchCard from "../../components/detailCard/searchCard.component";
import MyNavbar from '../../components/navbar/navbar.component';
import { Search as SearchIcon } from 'react-bootstrap-icons';

export default function Search() {

    const [searchParam, setSearchParam] = useSearchParams({ search: '' });
    const [currentSearch, setCurrentSearch] = useState<string>('');
    const [isloading, setIsLoading] = useState<boolean>(false);
    const [shows, setShows] = useState<ShowDetailType[]>([]);

    const handleOnSubmit = (event: any) => {

        event.preventDefault();
        event.stopPropagation();

        setIsLoading(true)

        setSearchParam({ search: currentSearch })

        getShowsBySearch(currentSearch).then(res => {
            setShows(res)
            setIsLoading(false)
            console.log(shows)
        })
    }

    useEffect(() => {
        setIsLoading(true)
        getShowsBySearch(searchParam.get('search')||'').then(res => {
            setShows(res)
            setIsLoading(false)
        })
    }, []) 

    return (
        <ProtectedRoute user={localStorage.getItem('user')}> 
    <MyNavbar user={localStorage.getItem('user')} activeLink="search" />
        <Container className="min-h-85">
            <h2 className="text-center page-title mt-3 animate-in" style={{animationDelay:'600ms'}}>{ 'Search for Movies or Tv Series'}</h2>
            <Form onSubmit={handleOnSubmit} className="d-flex justify-content-center mt-4 animate-in" style={{animationDelay:'600ms'}}>
                <Form.Group className="mb-3 d-flex search-group" controlId="formBasicEmail">
                    <Form.Control onChange={(e) => { setCurrentSearch(e.target.value) }} type="search" placeholder="Search..." value={currentSearch} />
                    <Button type="submit" className="search-button ms-3 d-flex align-items-center" disabled={!currentSearch}>
                        Search <SearchIcon className="ms-2" />
                    </Button>
                </Form.Group>
            </Form>
            <Container className="mt-4">
            <Row>
                {shows.map((e, i) => <SearchCard key={e.id} e={e} i={i} />)}
            </Row>
            </Container>
        </Container>
        </ProtectedRoute>
    )
}