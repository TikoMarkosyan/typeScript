import React from 'react';
import Button from '@material-ui/core/Button';

import {useTypedSelector} from "../hook/useTypedSelector";
import {useActions} from "../hook/useAction";
import { IPlayers } from "../../types/football";

import classNames from 'classnames'; 

import "./Compare.css";

const Compare: React.FC = () => {
    const { setCompareTeam,deleteElement,setComparePlayer } = useActions();
    const list = useTypedSelector(state => state.data.teams);
    const compair = useTypedSelector(state => state.data.compaier);

    const drop = (e: React.DragEvent & { dataTransfer:  DataTransfer,  }  ):void => {
        e.preventDefault();
        const str = e.dataTransfer.getData('card_id');
        const [name,playerOrNot] = str.split(",");

        if(playerOrNot === "club") {
            list?.forEach(el =>  {
                if(el.clubName === name){
                    setCompareTeam(el);
                }     
            })  
        }

        list?.forEach(el => {
            const player = el.players.find(item => item.name === name);
            if(player){
                setComparePlayer(player);
            }
        })
    }

    const removeElement = (element:IPlayers):void => {
        deleteElement(element);
    } 

    const dragOver = (e: React.DragEvent):void => {
        e.preventDefault();
    }
    
    return(
        <div className="box_size" id="box" onDrop={(e)=>{drop(e)}} onDragOver={dragOver}>
          <div className="right_left">
            {
             compair !== undefined  && compair.map((el,index) => {
                const compaireIndex = compair.length === 1 ? el : compair[1-index];
                return (
                  <div className={"players_info module-border-wrap"} key={index}>
                      <Button id={"button"} color="primary" onClick={() => { removeElement(el) }}>X</Button>
                      <p>{el.name}</p>
                      <p className="for_P">Goals :<span className={classNames({
                                                'bad': el.Goals < compaireIndex.Goals,
                                                'good':el.Goals > compaireIndex.Goals,
                                                'normal':true,
                                              })}>{ el.Goals}</span>
                      </p>
                      <p className="for_P">Appearances : <span className={classNames({
                                                'bad': el.Appearances < compaireIndex.Appearances,
                                                'good':el.Appearances > compaireIndex.Appearances,
                                                'normal':true,
                                              })}>{el.Appearances}</span>
                      </p>
                      <p className="for_P">Tackle : <span className={classNames({'bad': el.Tackle < compaireIndex.Tackle,
                                                'good':el.Tackle > compaireIndex.Tackle,
                                                'normal':true,
                                              })}>{el.Tackle}</span>
                      </p>
                  </div>
                )
              })
            }
          </div>
  </div>
    )
}

export default Compare;