import {Player} from './Player'

export class GameStatus{

constructor(
   public self: Player,
   public opponent: Player,
   public game: Player
 ) {  }

}