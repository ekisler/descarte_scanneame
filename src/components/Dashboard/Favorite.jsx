import { React, useEffect } from 'react'
import { getFavorites, getUsers } from '../../Redux/Actions';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Card/Card';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from '../Loading/Loading';

function Favorite() {
    const dispatch = useDispatch();

    const userFavorite = useSelector(state => state.favorite)
    const users = useSelector(state => state.allUsers)

    const { user } = useAuth0();

    useEffect(() => {
        dispatch(getUsers())
        dispatch(getFavorites())
    }, [dispatch])

    
    if (user === undefined && userFavorite) {
        return <Loading />
    }

    return (
        <div>
            <div>{userFavorite && userFavorite.map(e => {
                if (e.users[0].mail === user.email) {
                    return (<div>
                        <Card key={e.id}
                            id={e.id}
                            image={e.cars[0].image}
                            descriptionShort={e.cars[0].descriptionShort}
                            price={e.cars[0].price}
                            kilometres={e.cars[0].kilometres}
                            transmition={e.cars[0].transmition}
                            year={e.cars[0].year} 
                            prem={e.cars[0].premium}/>
                    </div>)
                }
            })}
            </div>
        </div>
    )
}

export default Favorite