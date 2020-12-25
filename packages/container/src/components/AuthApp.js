import { mount } from 'auth/AuthApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default(  { onSignIn } ) => {

    const ref = useRef(null);
    const history = useHistory();

    useEffect( () => {

        const {onParentNavigate} = mount(ref.current, {
            initialPath: history.location.pathname,
            onNavigate: ({pathname: nextPathname}) => {
                //console.log(nextPathname);

                const {pathname} = history.location;

                if (pathname !== nextPathname) {
                    history.push( nextPathname );
                }     
                
            },
            onSignIn,
        });

        history.listen( onParentNavigate );

        // second argument below is a limiter for useEffect.  Empty array
        // means only run-once on initial render
    }, []);

    return <div ref={ref} />;
};
