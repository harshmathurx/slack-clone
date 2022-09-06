
import { AccessTime, HelpOutline, Search } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDocument } from 'react-firebase-hooks/firestore'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { selectRoomId } from '../features/appSlice'
import { auth, db } from '../firebase'

const Header = () => {
  const [user] = useAuthState(auth);
  const roomId = useSelector(selectRoomId);
  const [roomDetails] = useDocument(
    roomId && db.collection("rooms").doc(roomId)
  );


  return (
    <HeaderContainer>
      <HeaderLeft>
        <HeaderAvatar
        src={user?.photoURL}
        alt={user?.displayName}
        onClick={() => auth.signOut()}
        />
        <AccessTime />
      </HeaderLeft>
      <HeaderSearch>
        <Search />
        <input
          placeholder={`Search ${roomId && roomDetails ? roomDetails?.data().name : "channel"
            }`}
        />
      </HeaderSearch>
      <HeaderRight>
        <HelpOutline />
      </HeaderRight>
    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background-color: var(--slack-color);
  color: white;
`;

const HeaderLeft = styled.div`
  display: flex;
  flex: 0.3;
  align-items: center;
  margin-left: 20px;
  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 30px;
  }
`;

const HeaderSearch = styled.div`
  flex: 0.4;
  opacity: 1;
  border-radius: 6px;
  background-color: #421f44;
  text-align: center;
  display: flex;
  padding: 0 50px;
  color: gray;
  border: 1px solid gray;
  > input {
    background-color: transparent;
    border: none;
    text-align: center;
    min-width: 30vw;
    outline: none;
    color: white;
  }
`;

const HeaderAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  align-items: flex-end;
  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 20px;
  }
`;