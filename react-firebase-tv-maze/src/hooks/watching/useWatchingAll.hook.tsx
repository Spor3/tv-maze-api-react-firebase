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
    const arrayData:ShowDetailType[] = [];
      const movies = ref(database, "watching/");
      onValue(movies, (snapshot) => {
        const data = snapshot.val();
        for (const key in data) {
          arrayData.push(data[key]);
        }
        setAllWatching(arrayData);
      });
  }, []);


  return [ allWatching ];
};

export default useFirebaseAllWatching;