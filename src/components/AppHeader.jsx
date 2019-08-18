import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, Redirect, NavLink } from 'react-router-dom';

const Header = styled.header`
    display: flex;
    flex-direction: row;
    flex-wrap: no-wrap;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    width: 100vw;
    height: 50px;
    position: fixed;
    z-index: 99;
    background: white;
    box-shadow: 1px 1px 2px 1px rgba(0,0,0,0.4);
`;

const Search = styled.input`
    height: 25px;
    width: ${props => props.focused ? '150px' : '100px'};
    min-width: 100px;
    border-radius: 5px;
    padding: 0px 25px;
    border: 2px solid black;
    margin: 0px 10px;
    transition: width 1s;
`;

const MainIcon = styled.div`
    margin: 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: no-wrap;
    justify-content: center;
    align-items: center;
    color: #333;
    opacity: 1;
    transition: opacity 1s;
    &:hover {
        opacity: 0.6;
    }
`;

export default function AppHeader({searching}) {
    const inputRef = useRef(null);
    const [focused, setFocused] = useState(false);
    const [search, setSearch] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        window.location.href = '/search?q=' + search.trim();
      }
    
    return (
        <React.Fragment>
                <Header>
                    <Link to='/'>
                        <MainIcon>
                            <div style={{ margin: '0px 10px' }}>
                                <FontAwesomeIcon 
                                    icon={['far', 'film']} 
                                    style={{ zIndex: 0, position: 'absolute', top: 10}}/>
                                <FontAwesomeIcon 
                                    icon={['far', 'hand-pointer']} 
                                    style={{ zIndex: 1}}/>
                            </div>
                                <h3 style={{
                            fontFamily: 'Graduate'
                        }}>Pick Flicks</h3>
                        </MainIcon>
                    </Link>
                    <NavLink to='/search'>
                        <h5 style={{ fontFamily: 'Graduate' }}>Discover</h5>
                    </NavLink>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'no-wrap',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <FontAwesomeIcon icon={['far', 'search']} />
                        <form onSubmit={handleSubmit}>
                            <Search 
                                type='text'
                                placeholder='search movie' 
                                ref={inputRef}
                                value={search}
                                onFocus={() => { setFocused(true)}} 
                                onBlur={() => { setFocused(false)}}
                                onChange={e => { 
                                    setSearch(e.target.value) 
                                }}
                                focused={focused}/>
                        </form>
                    </div>
                </Header>
        </React.Fragment>
    )
}