
import { getShowsBySearch, ShowType } from "../../_service/api/index.service";
import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { Form, Row, Button, Card, Container, Col } from "react-bootstrap";
import MyNavbar from '../../components/navbar/navbar.component'

export default function Search() {

    const [searchParam, setSearchParam] = useSearchParams({ search: '' });
    const [currentSearch, setCurrentSearch] = useState<string>('');
    const [isloading, setIsLoading] = useState<boolean>(false);
    const [shows, setShows] = useState<ShowType[]>([]);

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

    return (<>
    <MyNavbar user={localStorage.getItem('user')} />
        <Container>
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
                {shows.map(e => {
                    return (
                        <Col key={e.id} className="d-flex justify-content-center mb-4">
                            <Link to={'/search/' + e.id}>
                            <Card style={{ width: '18rem' }} >
                                <Card.Img variant="top" src={e.image} />
                                <Card.Body>
                                    <Card.Title>{e.title}</Card.Title>
                                    <Card.Text>{e.type}</Card.Text>
                                </Card.Body>
                            </Card>
                            </Link>
                        </Col>
                    )
                })}
            </Row>
            </Container>
        </Container>
        </>

    )
}