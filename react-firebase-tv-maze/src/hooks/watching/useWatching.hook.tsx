import {  onValue, ref } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import { UserContext } from '../context/UserContext'
import { ShowDetailType } from "../../_service/api/index.service";
import { database, addWatching as add, deleteWatching } from "../../_service/firebase/firebasesDb.service";

// custom hook
const useFirebaseWatching = (): [
  watching: ShowDetailType | undefined,
  addWatching: (show:ShowDetailType) => void,
  removeWatching: () => void
] => { 
  const [watching, setWatching] = useState<ShowDetailType>();
  const { user }:any = useContext(UserContext);

  // on user change, refresh favourites
  useEffect(() => {
    if (user) {
      const movies = ref(database, "watching/" + user.uid);
      onValue(movies, (snapshot) => {
        const data = snapshot.val();
        setWatching(data);
      });
    }
  }, [user]);

  const addWatching = (show:ShowDetailType) => {
    const { uid } = user;
    add(uid, show);
  }

  const removeWatching = () => {
    const { uid } = user;
    deleteWatching(uid);
  }



  return [ watching, addWatching, removeWatching];
};

export default useFirebaseWatching;