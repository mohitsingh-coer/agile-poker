import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { PokerCache } from '../data/data';
import { socket } from '../socket';
import { Estimate, StoryPoints } from '../model/Estimate';
import { useNavigate } from 'react-router-dom';

type T_StoryPoints = keyof typeof StoryPoints;

const EngineerView = () => {
  const { user } = useUser();
  const [pokerCache, setPokerCache] = useState<PokerCache>();
  const navigate = useNavigate();
  useEffect(() => {
  if (!user?.name || user.name === "" || !user?.role) {
    navigate('/');
  }
  }, [user, navigate]);

  const story_points: T_StoryPoints[] = Object.keys(
    StoryPoints
  ) as T_StoryPoints[];

  useEffect(() => {
    const handleMasterDataChanged = (data: PokerCache) => {
      const hydratedCache = PokerCache.fromJSON(data);
      setPokerCache(hydratedCache);
      console.log(JSON.stringify(data) + '\n');
    };

    socket.on('masterDataChanged', handleMasterDataChanged);

    // Cleanup function to remove listener when component unmounts
    return () => {
      socket.off('masterDataChanged', handleMasterDataChanged);
    };
  }, []); // Empty dependency array means this runs once on mount

  function addEstimate(value: string, name: string): void {
    if (!pokerCache) return;
    const updatedTables = pokerCache.tables.map((element) => {
      if (element.name === name) {
        const storyPoints = StoryPoints[value as T_StoryPoints];
        element.addEstimate(new Estimate(user.name, storyPoints));
        console.log('Estimate added successfully');
      }
      return element;
    });
    const updatedCache = new PokerCache(updatedTables);
    setPokerCache(updatedCache);
    socket.emit(
      'estimatesAdded',
      name,
      new Estimate(user.name, StoryPoints[value as T_StoryPoints])
    );
  }

  return (
    <div className="home__container">
      <h1>Engineer View</h1>
      <p>Welcome, {user.name}!</p>
      <p>Your role is: {user.role}</p>
      <p>You are in the Engineer view.</p>

      {pokerCache?.tables.map((element, index) => (
        <React.Fragment key={index}>
          <label htmlFor='estimateSelect'>{element.name}</label>
          <select
            id="estimateSelect"
            className="select select-bordered"
            onChange={(e) => addEstimate(e.target.value, element.name)}
          >
            <option value="">Select story points</option>
            {story_points.map((sp) => (
              <option key={sp} value={sp}>
                {StoryPoints[sp]}
              </option>
            ))}
          </select>
        </React.Fragment>
      ))}
    </div>
  );
};

export default EngineerView;
