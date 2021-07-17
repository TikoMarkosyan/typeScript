import { MainState, footballActionType,FootballAction, IPlayers, ITeam } from "../../types/football";
import { isNumber } from 'lodash';

const initialState:MainState = {
    teams:[],
    compaier:[]
}

interface ICreatePlayers {
    [index: string]: any;
    Goals:number;
    Appearances:number;
    Tackle:number;
    disabled:boolean;
    name:string;
}

const deepCloneObject = (obj:ITeam[]): ITeam[] => {
    return JSON.parse(JSON.stringify(obj));
}

const averageResultClub = (players:IPlayers[],clubName:string,teamPlayersValues:ICreatePlayers):ICreatePlayers => {
    const team:ICreatePlayers = {...teamPlayersValues};
    players.forEach(el => {
        team.Goals += el.Goals;
        team.Tackle += el.Tackle;
        team.Appearances += el.Appearances;
        team.name = clubName;
    });

    Object.entries(team).forEach(([key, value]) => {
        if(isNumber(value)){
            team[key] = value / players.length
        }
    });

    return team;
}

const teamsDisabled = (teams:ITeam[],name:string,bool:boolean):ITeam[] => {
    return teams.map(el => {
        const player =  el.players.find(item => item.name === name);
        if(player){
            player.disabled = bool;
        }

        return el;
    })
}

const checkCompareIsValid = (compaireTeam:IPlayers[],teamsClub:ITeam[],teamAverageValue:ICreatePlayers,disabled:boolean):MainState => {
    const compaireClone = [...compaireTeam];
    const teams = deepCloneObject(teamsClub);
    if(compaireClone.length < 2 && disabled !== true){
        disabled = true;
        compaireClone.unshift(teamAverageValue);
    }else if(compaireClone.length === 2 && disabled !== true){
        const removeElement = compaireClone.shift();
        teams.forEach(el => {
            if(removeElement !== undefined && el.clubName === removeElement.name){
                el.disabled = false;
            }
          })
        disabled = true;
        compaireClone.unshift(teamAverageValue);
    }

    return  {
        teams:teams,
        compaier:compaireClone
    }  as MainState;
}

export const footballReducer = (state = initialState, action:FootballAction) :MainState => {
    switch (action.type) {
        case footballActionType.GET_PREMIER:
            return {
                ...state,
                teams: action.payload.teams,
            }
        case footballActionType.SET_COMPARE_TEAM:
            const teamsClub = state.teams === undefined ? [] : deepCloneObject(state.teams);
            const compaireTeam =  state.compaier === undefined ? [] : [...state.compaier];
             if(!(compaireTeam.length !== 0 && teamsClub.some(el => el.clubName === compaireTeam[0].name))){
                teamsClub.forEach(el => {
                    el.players.forEach(item => {
                        item.disabled = false;
                    })
                })
                compaireTeam.splice(0,compaireTeam.length);
            }

            const teamPlayersValues = {
                Goals:0,
                Tackle:0,
                Appearances:0,
                name:""
            } as ICreatePlayers;

            const teamAverageValue = averageResultClub(action.payload.players,action.payload.clubName,teamPlayersValues);
            teamsClub.forEach(el => {
                if(el.clubName === action.payload.clubName){
                    el.disabled = true;
                };
            });

           const {teams, compaier} = checkCompareIsValid(compaireTeam, teamsClub, teamAverageValue, action.payload.disabled);
            return {
                teams:teams,
                compaier:compaier
            }  

        case footballActionType.SET_COMPARE_PLAYER: 
            let teamsPlayers = state.teams === undefined ? [] : deepCloneObject(state.teams);
            const compaireTeamPlayers =  state.compaier === undefined ? [] : [...state.compaier];
            if((compaireTeamPlayers.length !== 0 && teamsPlayers.some(el => el.clubName === compaireTeamPlayers[0].name))){
                teamsPlayers.forEach(el => {
                    el.disabled = false;
                })
                compaireTeamPlayers.splice(0,compaireTeamPlayers.length);
            }
            const team = teamsDisabled(teamsPlayers,action.payload.name,true); 
            if(compaireTeamPlayers.length < 2 && action.payload.disabled !== true){
                compaireTeamPlayers.push(action.payload);
            }else if(compaireTeamPlayers.length === 2 && action.payload.disabled !== true){
                const removeElement =  compaireTeamPlayers.shift();
                if(removeElement){
                teamsPlayers = teamsDisabled(team,removeElement.name,false);
                }
                compaireTeamPlayers.unshift(action.payload);
            }
            return {
                teams:teamsPlayers,
                compaier: [...compaireTeamPlayers],
            }

        case footballActionType.DELETE_COMPARE_ELEMENT:  
            const newTeams = state.teams === undefined ? [] : deepCloneObject(state.teams);
            const comporeRemove =  state.compaier === undefined ? [] : [...state.compaier];
            const newcompore = comporeRemove.filter(el => el.name !== action.payload.name);

            newTeams.forEach(el => {
                if(el.clubName === action.payload.name){
                    el.disabled = false;
                    return false
                }
                el.players.forEach(el => {
                    if(el.name === action.payload.name){
                        el.disabled = false;
                        return false
                    }
                })
            });

            return {
                teams:newTeams,
                compaier: [...newcompore],
            };

		default:
			return state;
	}
}