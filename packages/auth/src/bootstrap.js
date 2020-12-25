import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

console.log('Inside auth bootstrap.js');
// Mount function to start up the app

const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath } ) => {

   // use defaultHistory only when in dev mode, otherwise
   // we will use the memory history within the marketing application    
   const history = defaultHistory || createMemoryHistory({
       initialEntries: [ initialPath ]
   });

   if ( onNavigate ) {
        history.listen(onNavigate);
   }

   ReactDOM.render( <App onSignIn={onSignIn} history={history} />, el );

return {
    onParentNavigate({pathname: nextPathname}) {
        //console.log('Container just navigated');

        const { pathname } = history.location;

        console.log(nextPathname);      

        if ( pathname !== nextPathname ) {
            history.push(nextPathname);
        }

    }
};

};

// If we are in development and in isolation,
// call mount immediately

if ( process.env.NODE_ENV === 'development' ) {
    const devRoot = document.querySelector('#_auth-dev-root');
    if ( devRoot ) {
        mount(devRoot, { defaultHistory: createBrowserHistory() });
    }
}

// We are running through container
// and we should export the mount function

export { mount };