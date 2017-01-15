import {Protocol} from './Protocol'
export class GameRequest{

constructor(
   public user_id: string,
   public full_name: string,
   public spaceship_protocol: Protocol
 ) {  }

}