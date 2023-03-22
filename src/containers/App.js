import React, { useState, useEffect } from 'react';
import Cardlist from '../components/CardList';
import Scroll from '../components/Scroll';
import SearchBox from '../components/SearchBox';
import ErrorBoundry from '../components/ErrorBounday';
import './App.css';

function App() {
    const [robots, setRobots] = useState([])
    const [searchfield, setSearchfield] = useState('')
 
useEffect(()=> {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=> response.json())
        .then(users => {setRobots(users)});
},[])  

const onSearchChange = (event) => {
    setSearchfield(event.target.value)
}

const filteredRobots = robots.filter(robot => {
    return robot.name.toLowerCase().includes(searchfield.toLowerCase());
})
console.log(robots, searchfield)
return !robots.length ?
<h1>Loading</h1> :
    (
        <div className='tc'>
            <h1 className='f1'>RoboFriends</h1>
            <SearchBox searchChange={onSearchChange}/>
            <Scroll>
                <ErrorBoundry>
                    <Cardlist robots={filteredRobots} />
                </ErrorBoundry>
            </Scroll>                   
        </div>
    );
}

export default App;
