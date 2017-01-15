import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Game } from '../models/Game';
import {GameRequest} from '../models/GameRequest'
import {GameStatus} from '../models/GameStatus'
import {Player} from '../models/Player'

import {WSMessage} from '../models/WS-Message'
import 'rxjs/add/operator/toPromise';



@Injectable()
export class GameService {

private headers = new Headers({'Content-Type': 'application/json'});

private createGameUrl = 'http://localhost:9000/xl-spaceship/protocol/game/new';
private getGameStatusUrl = 'http://localhost:9000/xl-spaceship/user/game/';

constructor(private http: Http) { }

  /*Send a create a new game request*/
  createGame(message: GameRequest):  Promise<Game> {
    console.log('--- createGame() called ----');
    console.log(JSON.stringify(message));

    return this.http
    .post(this.createGameUrl, JSON.stringify(message), {headers: this.headers})
    .toPromise()
    .then(res =>  new Game(res.json().user_id, res.json().full_name, res.json().game_id, res.json().starting)
    ).catch(this.handleError);
  }

  /**Load game from game_id */
  loadGame(game_id: String): Promise<GameStatus>{

    console.log('--- loadGame() called ----');
    console.log(JSON.stringify(game_id));

    return this.http
    .get(this.getGameStatusUrl+game_id, {headers: this.headers})
    .toPromise()
    .then(res => {

      let self = new Player(res.json().self.user_id, res.json().self.board);
      let opponent = new Player(res.json().opponent.user_id, res.json().opponent.board);
      let nextTurn = new Player(res.json().game.player_turn, null);
      let gameStatus = new GameStatus(self, opponent, nextTurn)

      console.log("game status = " + gameStatus.self.user_id + ":" + gameStatus.self.board);
      return gameStatus;

    }
    ).catch(this.handleError);

  }
  /** Handle error common function */
  handleError(message): void{
    console.log(message);
  }

}
