import { app } from "./firebase.config";
import { getDatabase, ref, update, onValue, remove, set } from "firebase/database";
import { ShowDetailType } from '../api/index.service'

const database = getDatabase(app);

export const addPrefer = (uid:string, show:ShowDetailType) => {

    const { id } =  show;
    
    if(typeof show.image.medium === 'undefined')
      show.image.medium = ''

    if(typeof show.image.original === 'undefined')
      show.image.original = ''

   update(ref(database, '/users/' + uid + '/'+ id ), show)

}

export const addWatching = (uid:string, show:ShowDetailType) => {

  const { id } =  show;
  
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

export const takeWatching = (uid:string) => {
    
  const userRef = ref(database, 'watching/' + uid );
  onValue(userRef, (snapshot) => {
const data = snapshot.val();
const watchingStorage = JSON.stringify(data);
localStorage.setItem('watching', watchingStorage)
});
}

export const takeFavorite = (uid:string) => {
    
    const userRef = ref(database, 'users/' + uid );
    onValue(userRef, (snapshot) => {
      const favorites:any = [];
  const data = snapshot.val();
  for (const iterator in data) {
    favorites.push(data[iterator])
  }
  const favoriteStorage = JSON.stringify(favorites);
  localStorage.setItem('favorites', favoriteStorage)
});
}

export const deleteFavorite = (uid:string, show:ShowDetailType) => {
    const { id } = show
    const userRef = ref(database, 'users/' + uid + '/'+ id );

    remove(userRef)
}