import { Container } from "react-bootstrap";
import DropDownFilter from "../../components/dropDown/dropDownFilter.component";
import MyNavbar from "../../components/navbar/navbar.component";
import ProtectedRoute from "../../components/protectedPage/protectedPage.component";
import useFilter from "../../hooks/favourite/useFilter.hook";

const Favorite = () => {

  const [ filterData, handleNoFilter, handleSortAlphabetic, handleSortAlphabeticReverse, handleSortNumeric, handleSortNumericReverse ] = useFilter();

  return (
    <ProtectedRoute>
      <MyNavbar activeLink="favorite"/>
      <Container className="d-flex flex-column align-items-center min-h-85">
        <div className="d-flex align-items-center justify-content-between w-100">
      <h2 className="text-center page-title mt-3 animate-in mx-auto" style={{animationDelay:'600ms'}}>{'Favorite'}</h2>

      <DropDownFilter handleSortAlphabetic={handleSortAlphabetic} handleSortAlphabeticReverse={handleSortAlphabeticReverse} handleSortNumeric={handleSortNumeric} handleSortNumericReverse={handleSortNumericReverse} handleNoFilter={handleNoFilter} />
    </div>
      <Container className="m-5">
        {!!filterData? filterData:'NO Favorite'}
        </Container>
      </Container>
    </ ProtectedRoute>
  );
};

export default Favorite;
