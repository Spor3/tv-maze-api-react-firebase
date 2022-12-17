import { useEffect, useState } from "react";
import { ShowDetailType } from "../../_service/api/index.service";
import CardDetail from "../../components/detailCard/detailCard.component";
import useFirebaseFavourite from "./useFavourite.hook";


const useFilter = ():[
    filterData:JSX.Element[],
    handleNoFilter: () => void,
    handleSortAlphabetic: () => void,
    handleSortAlphabeticReverse: () => void,
    handleSortNumeric: () => void,
    handleSortNumericReverse: () => void
] => {
    const [ favourites ] = useFirebaseFavourite();
    const [ filterData, setFilterData ] = useState<JSX.Element[]>([]);

    useEffect(() => {
        setFilterData(favourites.map((e,i) => <CardDetail key={e.id} data={e} animationDelay={i} />));
    },[favourites])

    const handleNoFilter = () => {
        setFilterData(favourites.map((e,i) => <CardDetail key={e.id} data={e} animationDelay={i} />))
      }
    
      const handleSortAlphabetic = () => {
           setFilterData(favourites.sort((a:ShowDetailType, b:ShowDetailType) => a.title.localeCompare(b.title)).map((e,i) => <CardDetail key={e.id} data={e} animationDelay={i} />));
      }
    
      const handleSortAlphabeticReverse = () => {
        setFilterData(favourites.sort((a:ShowDetailType, b:ShowDetailType) => a.title.localeCompare(b.title)).reverse().map((e,i) => <CardDetail key={e.id} data={e} animationDelay={i} />))
      }
    
       const handleSortNumericReverse = () => {
        setFilterData(favourites.filter((e:ShowDetailType) => !!e.avgRating).sort((a:ShowDetailType, b:ShowDetailType) => {  
          if(a.avgRating! > b.avgRating!)
            return 1
          else if(a.avgRating! < b.avgRating!)
            return -1
          else
            return 0
        }).map((e,i) => <CardDetail key={e.id} data={e} animationDelay={i} />))
      }
    
      const handleSortNumeric = () => {
        setFilterData(favourites.filter((e:ShowDetailType) => !!e.avgRating).sort((a:ShowDetailType, b:ShowDetailType) => {  
          if(a.avgRating! < b.avgRating!)
            return 1
          else if(a.avgRating! > b.avgRating!)
            return -1
          else
            return 0
        }).map((e,i) => <CardDetail key={e.id} data={e} animationDelay={i} />))
      }

      return[ filterData, handleNoFilter, handleSortAlphabetic, handleSortAlphabeticReverse, handleSortNumeric, handleSortNumericReverse ];
}

export default useFilter;