import Dropdown from "react-bootstrap/Dropdown";
import { ArrowDown, ArrowUp, StarFill, Star } from 'react-bootstrap-icons';
import { useState } from "react";

type DropdownFilterProps = {
    handleSortAlphabetic: () => void,
    handleSortAlphabeticReverse: () => void,
    handleSortNumeric: () => void,
    handleSortNumericReverse: () => void,
}

const DropDownFilter = ({handleSortAlphabetic, handleSortAlphabeticReverse, handleSortNumeric, handleSortNumericReverse}:DropdownFilterProps) => {

    const filterMenu = [{type:'A-Z',function:handleSortAlphabetic,icon: <ArrowDown />},{type:'Z-A',function:handleSortAlphabeticReverse,icon: <ArrowUp />},
                        {type:'10-0',function:handleSortNumeric,icon: <StarFill />},{type:'0-10',function:handleSortNumericReverse,icon: <Star />}]

  return (
    <Dropdown className="mt-3">
    <Dropdown.Toggle id="dropdown-basic" className="nav-font py-1 d-flex align-items-center">
    Filter
    </Dropdown.Toggle>

    <Dropdown.Menu>
        {filterMenu.map(e => <Dropdown.Item className="d-flex align-items-center nav-font" onClick={e.function}>{e.icon}<div className="ms-1">{e.type}</div></Dropdown.Item>)}
    </Dropdown.Menu>
  </Dropdown>
  );
};

export default DropDownFilter;
