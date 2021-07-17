export interface ITeam {
    clubName:string,
    disabled:boolean,
    ligaName:string,
    players:IPlayers[],
}

export interface IPlayers {
    Goals:number,
    Appearances:number,
    Tackle:number,
    disabled:boolean,
    name:string
}

export interface MainState  {
    teams?: ITeam[],
    compaier?: IPlayers[],
}

export enum  footballActionType {
    GET_PREMIER = "GET_PREMIER",
    SET_COMPARE_TEAM = "SET_COMPARE_TEAM",
    SET_COMPARE_PLAYER = "SET_COMPARE_PLAYER",
    DELETE_COMPARE_ELEMENT = "DELETE_COMPARE_ELEMENT"
}

interface FetchFootballDataAction {
    type: footballActionType.GET_PREMIER;
    payload: MainState;
}

interface FootballCompaireAddAction {
    type: footballActionType.SET_COMPARE_TEAM;
    payload: ITeam;
}
interface FootballPlayerAddAction {
    type: footballActionType.SET_COMPARE_PLAYER;
    payload: IPlayers;
}

interface FootballCompaireDeleteAction {
    type: footballActionType.DELETE_COMPARE_ELEMENT;
    payload: IPlayers;
}


export type FootballAction = FetchFootballDataAction | FootballCompaireAddAction | FootballCompaireDeleteAction | FootballPlayerAddAction;