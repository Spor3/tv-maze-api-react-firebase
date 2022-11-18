
import { getShowsBySearch, ShowDetailType } from "../../_service/api/index.service";
import ProtectedRoute from "../../components/protectedPage/protectedPage.component";
import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { Form, Row, Button, Card, Container, Col } from "react-bootstrap";
import SearchCard from "../../components/detailCard/searchCard.component";
import MyNavbar from '../../components/navbar/navbar.component'

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
            <Form onSubmit={handleOnSubmit}>
                <Form.Group className="mb-3 d-flex" controlId="formBasicEmail">
                    <Form.Control onChange={(e) => { setCurrentSearch(e.target.value) }} type="search" placeholder="Search..." value={currentSearch} />
                    <Button type="submit" disabled={!currentSearch}>
                        Submit
                    </Button>
                </Form.Group>
            </Form>
            <Container>
            <Row>
                {shows.map((e, i) => <SearchCard key={e.id} e={e} i={i} />)}
            </Row>
            </Container>
        </Container>
        </ProtectedRoute>
    )
}