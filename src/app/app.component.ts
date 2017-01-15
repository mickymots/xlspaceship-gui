import { Component } from '@angular/core';
import {Game} from './models/Game'
import {WSMessage} from './models/WS-Message'

import {Protocol} from './models/Protocol'
import {GameRequest} from './models/GameRequest'
import { GameService } from './services/GameService';

import {GameStatus} from './models/GameStatus'
import {Player} from './models/Player'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GameService]
})

export class AppComponent {
  title = 'Welcome aboard XLSpaceship!';

  selectedGame: any = null;
  games : Game[]
  self: Player;
  opponent: Player;
  nextTurn: Player;
  game : Game;
	gameRequest = new GameRequest("xebialabs-1", "XebiaLabs Opponent", new Protocol("127.0.0.1",9000));


  constructor(private gameService: GameService){    
    this.games = [new Game('','','select game','')];
    this.selectedGame = 'select game';
    this.self = new Player('',null);
    this.opponent = new Player('',null);
    this.nextTurn = new Player('',null);;
  }

 
   
  //handles create game request
  createGame(){
    console.log('Create game');
    let promiseResponse  = this.gameService.createGame(this.gameRequest);
    promiseResponse.then(message => { 
        this.games.push(message);
      });
  }

  //handles load gameRequest
  onselect(){
    console.log(this.selectedGame);
    let promiseResponse  = this.gameService.loadGame(this.selectedGame);
    promiseResponse.then(message => { 
        this.self = message.self;
        this.opponent = message.opponent;
        this.nextTurn = message.game
      });
  }

  //fire salvo

  fireSalvo(){
    console.log("fireSalvo caled");
    
  }


}
