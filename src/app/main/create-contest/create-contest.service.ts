import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {HelperService} from '../../core/helper.service';
import {TokenInterceptor} from './../../core/auth/auth-interceptors';
import {HandleErrorService} from '../../core/handle-error.service';

@Injectable()
export class CreateContestService {

  constructor(private httpClient: HttpClient,
              private helperService: HelperService,
              private handleError: HandleErrorService) {
  }

  getMatchups(param) {
    let params: HttpParams = new HttpParams();
    params = params.append('status', param.status);
    return this.httpClient.get(`${this.helperService.resolveAPI()}/contests`, { params: params })
    .pipe(
      catchError(this.handleError.handleError)
    )    
  }

  createContest(data) {
    let body = {
      slate_id: data.slate_id,
      match_type: data.match_type,
      entry_fee: data.entry_fee,
      user_player_id: data.user_player_id
    }   
    if(data.match_type === 'tier_ranking') {
      body['tier'] = data.tier;
    } else if(data.match_type === 'set_opponent') {
      body['opp_player_id'] = data.opp_player_id;
    }
    return this.httpClient.post(`${this.helperService.resolveAPI()}/contests`, body)
    .pipe(
      catchError(this.handleError.handleError)
    )  
  }

  getFantasyPlayers(param) {
    let params: HttpParams = new HttpParams();
    params = params.append('slate_id', param.slateId?param.slateId:'Sun-Mon_2017_1_REG');
    params = params.append('position', param.position?param.position:'K');
    if(param.tier) {
      params = params.append('tier', param.tier);
    }
    return this.httpClient.get(`${this.helperService.resolveAPI()}/fantasyPlayers`, { params: params })
    .pipe(
      catchError(this.handleError.handleError)
    )  
  }

  setGameFilterValues(players, gameFilterValues) {
    players.forEach(element => {
      let index = gameFilterValues?gameFilterValues.findIndex(x => x.id === element.game_id):-1;
      if(index === -1) {
        element.game.name = element.game.homeTeam + ' @ ' + element.game.awayTeam;
        element.game.selected = true;
        gameFilterValues.push(element.game);
      }
    });
  }

}
