import axios from 'axios';

export default class GlobalService {

    protected urlBack = "https://wwd-api.herokuapp.com/"
    async fetch(path: string) {
        try {
            const res = await axios.get(this.urlBack + path);
            console.log(res);
            
        } catch (error) {
            console.log(error);
            
        }
    }
}