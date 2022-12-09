import { app } from "./firebase.config";
import { getDatabase, ref, update, onValue, remove, set } from "firebase/database";
import { ShowDetailType } from '../api/index.service'

export const database = getDatabase(app);

export const addPrefer = (uid:string, show:ShowDetailType) => {

    const { id } =  show;
    
    if(typeof show.image.medium === 'undefined')
      show.image.medium = ''

    if(typeof show.image.original === 'undefined')
      show.image.original = ''

   update(ref(database, '/users/' + uid + '/'+ id ), show)

}

export const addWatching = (uid:string, show:ShowDetailType) => {
  
  if(typeof show.image.medium === 'undefined')
    show.image.medium = ''

  if(typeof show.image.original === 'undefined')
    show.image.original = ''

 set(ref(database, '/watching/' + uid ), show)

}

export const deleteWatching = (uid:string) => {
  const userRef = ref(database, 'watching/' + uid );

  remove(userRef)
}

export const deleteFavorite = (uid:string, show:ShowDetailType) => {
    const { id } = show
    const userRef = ref(database, 'users/' + uid + '/'+ id );

    remove(userRef)
}