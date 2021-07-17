import  React,{ useEffect } from 'react';
import { useActions } from "../hook/useAction";

import List from "../List/List";
import Compare from '../Compare/Compare';

import './App.css';

const App: React.FC = () => {
  const { getPost } = useActions();

  useEffect(() => {
    getPost();
  }, [getPost])

  return (
    <div className="App">
      <List />
      <Compare />
    </div>
  );

}

export default App;
