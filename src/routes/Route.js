import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../contexts/auth';

export default function RouteWrapper({
    component: Component,
    isPrivate,
    ...rest
}){
    const { signed, loading } = useContext(AuthContext);

    if(loading){
        return(
            <div>Carregando</div>
        )
    }

    if(!signed && isPrivate) {
        return <Redirect to="/"/>
    }

    if(signed && !isPrivate) {
        return <Redirect to="/vacas" />
    }
    return(
        <Route
            {...rest}
            render={ props => (
                <Component {...props}/>
            )}
        />
    )
}