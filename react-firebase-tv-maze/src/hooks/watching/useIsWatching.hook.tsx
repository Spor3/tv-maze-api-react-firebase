import { useEffect, useState } from "react";
import { ShowDetailType } from "../../_service/api/index.service";
import useFirebaseWatching from "./useWatching.hook";

// custom hook
const useIsWatching = (show:ShowDetailType): [
  isWatching: boolean,
] => {
  const [ watching ] = useFirebaseWatching();
  const [ isWatching, setIsWatching] = useState<boolean>(false);

  useEffect(() => {
    if(show.id === watching?.id){
        setIsWatching(true)
    }else {
        setIsWatching(false)
    }
  }, [watching])

  return [ isWatching ];
};

export default useIsWatching;