import React from 'react'
import {
    Route,
    BrowserRouter as Router,
    Routes
} from 'react-router-dom';

import Login from './lib/pages/Login/Login.jsx';
import Home from './lib/pages/Home/Home.jsx';

export default () => {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Login/>}/>
                <Route exact path='/home' element={<Home />} />                
            </Routes>
        </Router>
    )
}
