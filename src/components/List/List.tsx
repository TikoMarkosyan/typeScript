import React,{ useEffect,useState, ReactElement } from 'react';
import {useTypedSelector} from "../hook/useTypedSelector";
import { ITeam } from "../../types/football";

import classNames from 'classnames'; 
import './List.css';

const List: React.FC = () => {
    const list = useTypedSelector(state => state.data.teams);
    const [seariaATeams,setSeariaATeams] = useState<ITeam[]>([]);
    const [premierLeagueTeams,setPremierLeagueTeams] = useState<ITeam[]>([]);

    useEffect(() => {
        if(list != null && Array.isArray(list)){
            const seariaA = list.filter(el => el.ligaName === "Seria A");
            const premierLeague = list.filter(el => el.ligaName === "Premier League");
            setSeariaATeams(seariaA);
            setPremierLeagueTeams(premierLeague);
        }
    },[list])

    const dragOver = (e: React.DragEvent):void => {
        e.stopPropagation();
    }
    // need to end not end
    const toggleTree = (e: any):void => {
      if(e.target.type === "player" || e.target.parentElement.parentElement.childNodes[1] === undefined){
        return;
      }
      e.target.parentElement.parentElement.childNodes[1].classList.toggle("active");
      e.target.childNodes[0].classList.toggle("active");
        
      }
    
    const dragStart = (e: React.DragEvent & { dataTransfer:  DataTransfer,  }  ):void => {
        const target = e.target as HTMLSpanElement;
        let text = target.innerText;
        if(target.getAttribute("title") === "club"){
         text = target.innerText.split("\n")[1];
        }
        const datatransfer = e.dataTransfer;
        datatransfer.dropEffect = "copy";
        datatransfer.effectAllowed = "copy";
        datatransfer.setData('card_id', text+","+target.getAttribute("title"));
    }

    const showLiga = (data:ITeam[]): ReactElement[] => { 
      return data.map((el,index) => {
        return (
          <div key={index} className="margin">
          <ul id="myUL">
          <li><span draggable  onDragStart={dragStart}  
                  onDragOver={dragOver} 
                  onClick={toggleTree}
                  title={"club"}
                  className={classNames({
                    'disabled': el.disabled,
                    'club_title':true,
                    'caret':true
                  })}><span className="arrow club_title">&#8595;</span>{ el.clubName}</span>
             </li> 
             <ul className={classNames({ "nested": true })}>
                {
                  el.players.map((el,index) => {
                    return (
                      <li key={"player "+index} draggable className={classNames({
                          'disabled': el.disabled,
                          'for_li':true,
                        })} 
                          onDragStart={dragStart}  onDragOver={dragOver}>{ el.name}</li>
                      )
                  })
                }         
              </ul>
            </ul>
        </div>
        )
      })
    }

    return (
      <div className="list-box">
        <p className="liga_title">SeariaA</p>
        { showLiga(seariaATeams) }
        <p className="liga_title">Promier League</p>
        { showLiga(premierLeagueTeams) }
      </div>
    );
}

export default List;
  