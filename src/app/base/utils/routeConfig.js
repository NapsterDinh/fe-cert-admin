import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as momment from 'moment'
import configuration from 'configuration';
import { useDispatch } from 'react-redux';
import { updateUser } from 'store/userReducer';

//components
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RouteWithLoader = ({ component: Component, ...rest }) => {
    return (
      <Route {...rest} render={(...props) => (<Component {...props}/>)}/>               
    );
  };

export const RouteWithSidebar = ({ component: Component, ...rest }) => {
    const dispatch =  useDispatch()

    const checkToken = () => {
      //check token is null
      if(configuration.getAPIRequestToken()?.access !== undefined)
      {
        //check toke is expired
        const oldRefreshToken = configuration.getAPIRequestToken().access
        if(oldRefreshToken.expires > momment().unix())
        {
          //refresh token
          return true
        }
      }
      dispatch(updateUser({user: ''}))
      return false
    }

    const configRender = () => {
      if(checkToken()){
        return(
          <Route {...rest} render={props => (
            <>
              <Sidebar />
              <main className="content">
                <Navbar />
                <Component {...props} />
                <Footer/>
              </main>
            </>
          )}
          />
        )
      }
      else{
        return(
          <Redirect from={rest.location.pathname} to={{
            pathname: '/login',
            state: {
              from : rest.location.pathname,
              search: rest.location.search
            }
          }}/>
        )
        
      }
     }

    return (
      <>
        {
          configRender()
        }
      </>
    );
  };


export default RouteWithLoader;