import { useEffect, useState } from "react";
import { ShowDetailType } from "../../_service/api/index.service";
import useFirebaseFavourite from "./useFavourite.hook";

// custom hook
const useIsFavourite = (show:ShowDetailType): [
  isFavorites: boolean,
] => {
  const [ favourites ] = useFirebaseFavourite();
  const [ isFavorites, setIsFavorites ] = useState<boolean>(false);

  useEffect(() => {
    console.log(favourites)
    let boolSearch = false;
    favourites.forEach((element:ShowDetailType) => {
        if(element.id === show.id)
           boolSearch = true;
    });
    setIsFavorites(boolSearch);
  }, [favourites])

  return [ isFavorites ];
};

export default useIsFavourite;