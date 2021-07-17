import {Dispatch} from "redux";
import { FootballAction,footballActionType,IPlayers,ITeam,MainState } from "../../types/football";
import dataFootbal from "../../data/football.json"


export const getPost = () => {
    return  (dispatch: Dispatch<FootballAction>) => {
      const team:ITeam[] = [...dataFootbal.teams];
      const data:MainState = {
         teams:team
      }
      dispatch({type:footballActionType.GET_PREMIER, payload:data })
    }
}

export const setCompareTeam = (data:ITeam) => {
   return (dispatch:Dispatch<FootballAction>) => {
      dispatch({type:footballActionType.SET_COMPARE_TEAM, payload: data});
   }
}

export const setComparePlayer = (data:IPlayers) => {
   return (dispatch:Dispatch<FootballAction>) => {
      dispatch({type:footballActionType.SET_COMPARE_PLAYER, payload: data});
   }
}

export const deleteElement = (data:IPlayers) => {
   return (dispatch:Dispatch<FootballAction>) => {
       dispatch({ type: footballActionType.DELETE_COMPARE_ELEMENT, payload: data });
   }
}