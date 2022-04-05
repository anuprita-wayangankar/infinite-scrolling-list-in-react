import React from 'react'
import {
    Route,
    BrowserRouter as Router,
    Routes
} from 'react-router-dom';

import Login from './lib/pages/Login/Login.jsx';
import Home from './lib/pages/Home/Home.jsx';
import NotFound from './lib/pages/NotFound/NotFound.jsx';


export default () => {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Login/>}/>
                <Route exact path='/home' element={<Home />} />                
                <Route component={<NotFound />} />
            </Routes>
        </Router>
    )
}
