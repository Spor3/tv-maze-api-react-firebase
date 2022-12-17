import {  onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { ShowDetailType } from "../../_service/api/index.service";
import { database } from "../../_service/firebase/firebasesDb.service";

// custom hook
const useFirebaseAllWatching = (): [
  allWatching: ShowDetailType[] | undefined,
] => {
  const [ allWatching, setAllWatching] = useState<ShowDetailType[]>([]);

  useEffect(() => {
      const movies = ref(database, "watching/");
      const unsubscribe = onValue(movies, (snapshot) => {
        const arrayData:ShowDetailType[] = [];
        const data = snapshot.val();
        for (const key in data) {
          arrayData.push(data[key]);
        }
        setAllWatching(arrayData);
      });
      return () => {
        unsubscribe()
      }
  }, []);


  return [ allWatching ];
};

export default useFirebaseAllWatching;