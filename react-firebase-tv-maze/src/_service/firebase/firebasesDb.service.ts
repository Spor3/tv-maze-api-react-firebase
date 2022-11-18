import { app } from "./firebase.config";
import { getDatabase, ref, update, onValue, remove } from "firebase/database";
import { ShowDetailType } from '../api/index.service'

const database = getDatabase(app);

export const addPrefer = (uid:string, show:ShowDetailType) => {

    const { id } =  show;


   update(ref(database, '/users/' + uid + '/'+ id ), show)

}

export const takeFavorite = (uid:string) => {
    
    const userRef = ref(database, 'users/' + uid );
    onValue(userRef, (snapshot) => {
      const favorites:any = [];
  const data = snapshot.val();
  console.log(data)
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