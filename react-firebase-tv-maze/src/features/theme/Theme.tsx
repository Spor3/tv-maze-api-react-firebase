import React, { useEffect, useState } from 'react';
import { MoonFill, SunFill } from 'react-bootstrap-icons';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {toggleTheme,
  selectTheme
} from './themeSlice';

const Theme = () => {
  const theme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();
  const [ checked, setChecked ] = useState<boolean>(false); //false dark, true ligth

  useEffect(() => {
    if(theme === 'dark')
      setChecked(false)
    else
      setChecked(true)
  },[])

  const handleClick = () => {
    setChecked(!checked);

    dispatch(toggleTheme())
  }

  return (

  <div  className="label cursor" onClick={handleClick}>
   <MoonFill />
   <SunFill />
    <div className={`${checked?'':'checkbox-checked'} ball`}>
    </div>
  </div>

  );
}

export default Theme;
