import {  onValue, ref } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import { UserContext } from '../context/UserContext'
import { ShowDetailType } from "../../_service/api/index.service";
import { database, addPrefer, deleteFavorite } from "../../_service/firebase/firebasesDb.service";

// custom hook
const useFirebaseFavourite = (): [
  favorites: ShowDetailType[],
  addFavorite: (show:ShowDetailType) => void,
  removeFavorite: (show:ShowDetailType) => void
] => {
  const [favourites, setFavourite] = useState<ShowDetailType[]>([]);
  const { user }:any = useContext(UserContext);

  // on user change, refresh favourites
  useEffect(() => {
    if (user) {
      const movies = ref(database, "users/" + user.uid);
     const unsubscribe =  onValue(movies, (snapshot) => {
        const arrayData = [];
        const data = snapshot.val();
        for (const key in data) {
          arrayData.push(data[key]);
        }
        setFavourite(arrayData);
      });
      
      return () => {
        unsubscribe()
      }
    }
  }, [user]);

  const addFavorite = (show:ShowDetailType) => {
    const { uid } = user;
    addPrefer(uid, show);
  }

  const removeFavorite = (show:ShowDetailType) => {
    const { uid } = user;
    deleteFavorite(uid, show);
  }



  return [favourites, addFavorite, removeFavorite];
};

export default useFirebaseFavourite;