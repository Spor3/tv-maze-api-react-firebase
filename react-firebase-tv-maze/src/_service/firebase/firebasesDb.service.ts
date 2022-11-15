import { app } from "./firebase.config";
import { getDatabase, ref, update } from "firebase/database";
import { ShowDetailType } from '../api/index.service'

const database = getDatabase(app);

export const addPrefer = (uid:string, show:ShowDetailType) => {

    const { id } =  show;


   update(ref(database, '/users/' + uid + '/'+ id ), show)

}