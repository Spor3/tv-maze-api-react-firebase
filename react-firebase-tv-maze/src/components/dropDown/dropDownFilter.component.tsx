import Dropdown from "react-bootstrap/Dropdown";
import { ArrowDown, ArrowUp, StarFill, Star, XCircle } from "react-bootstrap-icons";
import { useState } from "react";

type DropdownFilterProps = {
  handleSortAlphabetic: () => void;
  handleSortAlphabeticReverse: () => void;
  handleSortNumeric: () => void;
  handleSortNumericReverse: () => void;
  handleNoFilter: () => void
};

type ActiveFilter = {
  type:string,
  function: () => void,
  icon: JSX.Element
}

const DropDownFilter = ({
  handleSortAlphabetic,
  handleSortAlphabeticReverse,
  handleSortNumeric,
  handleSortNumericReverse,
  handleNoFilter
}: DropdownFilterProps) => {

  const [ activeFilter, setActiveFilter ] = useState<ActiveFilter | null>();


  const filterMenu = [
    { type: "A-Z", function: handleSortAlphabetic, icon: <ArrowDown /> },
    { type: "Z-A", function: handleSortAlphabeticReverse, icon: <ArrowUp /> },
    { type: "10-0", function: handleSortNumeric, icon: <StarFill /> },
    { type: "0-10", function: handleSortNumericReverse, icon: <Star /> },
    { type: "No Filter", function: handleNoFilter, icon: <XCircle /> },
  ];

  return (
    <Dropdown className="mt-3">
      <Dropdown.Toggle
        id="dropdown-basic"
        className="nav-font py-1 d-flex align-items-center"
      >
       <div className="me-1">Filter{activeFilter?' :':''}</div>{activeFilter?.icon}{activeFilter?.type}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {filterMenu.map((e,i) => (
          <Dropdown.Item
            key={i}
            className="d-flex align-items-center nav-font"
            onClick={() => {e.function(); setActiveFilter(e)}}
          >
            {e.icon}
            <div className="ms-1">{e.type}</div>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropDownFilter;
