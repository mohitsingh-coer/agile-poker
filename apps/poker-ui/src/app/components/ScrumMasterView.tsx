import { useUser } from '../context/UserContext';
import { addTable, exportDataAsObject, exportDataWithoutMethods, PokerCache } from '../data/data';
import { socket } from '../socket';
import React, { useState, useEffect } from 'react';
import { Estimate, Table } from '../model/Estimate';
import { useNavigate } from 'react-router-dom';

const ScrumMasterView = () => {
  const { user } = useUser();
  const [tableName, setTableName] = useState<string>('');
  const [pokerCache, setPokerCache] = useState<PokerCache>(() => exportDataAsObject());
  const navigate = useNavigate();
  useEffect(() => {
  if (!user?.name || user.name === "" || !user?.role) {
    navigate('/');
  }
  }, [user, navigate]);
 
  const handleCreateTable = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (addTable(tableName, user.name)) {
      const newCache = exportDataAsObject(); 
      socket.emit('dataChanged', newCache);
      setPokerCache(newCache);
      console.log('Table added successfully');
    } else {
      console.log('Table already exists');
    }
  };

  const isNameInComplete = (): boolean | undefined => {
    if (tableName && tableName.length > 4) {
      return false;
    }
    return true;
  };

  function handleReset(event: React.MouseEvent<HTMLButtonElement>): void {
    localStorage.removeItem('pokerCache');
    const newCache = exportDataAsObject()
    setPokerCache(newCache);
    console.log('Cache reset successfully');
    socket.emit('dataChanged', newCache);
  }

  function handleReload(event: React.MouseEvent<HTMLButtonElement>): void {
    const newCache = exportDataAsObject()
    setPokerCache(newCache);
    socket.emit('dataChanged', newCache);
  }

  return (
    <div className="home__container">
      <div className="scrum-master-view">
        <h1>Scrum Master View</h1>
        <p>Welcome, {user.name}!</p>
        <p>Your role is: {user.role}</p>
        <p>You are in the Scrum Master view.</p>
      </div>
      <div>
        <button onClick={handleReset}>Reset Cache</button>
        <button onClick={handleReload}>Reload from Storage</button>
      </div>
      <div>
        {pokerCache?.tables.map((element, index) => (
          <React.Fragment key={element.name}>
            <div className='message'>
            <div>tableName = {element.name}</div>
            <div>tableOwner = {element.owner}</div>
            <div>
              tableEstimates =
              {element.table.map((estimate, index) => (
                <div key={estimate.user} className='chat__users'>
                  {estimate.user} : {estimate.storyPoint}
                </div>
              ))}
            </div>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div>
        <input
          type="text"
          minLength={6}
          name="tableName"
          id="tableName"
          className="username__input"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
        />
        <button disabled={isNameInComplete()} onClick={handleCreateTable}>
          Create Table
        </button>
      </div>
    </div>
  );
};


const handleEstimatesAdded = (tableName: string, estimateData: Estimate) => {
  // Create a proper Estimate instance from the received data
    const pokerCache = exportDataAsObject()
    const estimate = new Estimate(estimateData.user, estimateData.storyPoint);
    console.log(estimate);

    const updatedTables = pokerCache.tables.map((element) => {
      if (element.name === tableName) {
        // add estimates to table
        const table = new Table(element.name, element.owner, element.table)
        table.addEstimate(estimate);
        return table
      }
      return element;
    });
    console.log(updatedTables);
    localStorage.setItem('pokerCache', JSON.stringify(pokerCache));
    socket.emit('dataChanged', exportDataWithoutMethods());
};
console.log("about to listen to estimatesAdded");
socket.on('estimatesAdded', handleEstimatesAdded);

export default ScrumMasterView;
