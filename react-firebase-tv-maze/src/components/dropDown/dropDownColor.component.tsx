import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectSecondaryColor, changeSecondaryColor } from "../../features/secondaryColor/secondaryColor";

const DropDownMenu = () => {

  const ReduxSecondaryColor = useAppSelector(selectSecondaryColor);
  const dispatch = useAppDispatch();
  const [ color, setColor ] = useState<string>('');
  const secondaryColor = [{theme:"yellow",color:"#bdbb49"},{theme:"red",color:"#bd150b"},{theme:"blue",color:"#0076bd"},{theme:"green",color:"#79dd09"}];

  useEffect(() => {
    secondaryColor.forEach(e => {
      if(e.theme === ReduxSecondaryColor)
        setColor(e.color)
    })
  },[ReduxSecondaryColor])

  return (
    <Dropdown className="me-3">
      <Dropdown.Toggle id="dropdown-basic" className="nav-font py-1 d-flex align-items-center">
      <div className="before-secondary-color me-2" style={{backgroundColor: color}} ></div><div>{ReduxSecondaryColor}</div>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {secondaryColor.map((e, i) => (
          <Dropdown.Item className="d-flex align-items-center nav-font" key={i} onClick={() => dispatch(changeSecondaryColor(e.theme))}><div className="before-secondary-color me-2" style={{backgroundColor: e.color}} ></div><div>{e.theme}</div></Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropDownMenu;
