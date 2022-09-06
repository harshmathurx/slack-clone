import React from 'react'
import styled from 'styled-components';
import { FiberManualRecord, InsertComment, Inbox, Drafts, BookmarkBorder, PeopleAlt, Apps, FileCopy, ExpandLess, ExpandMore, Add, Create } from "@mui/icons-material"
import SidebarOption from './SidebarOption';
import {useCollection} from "react-firebase-hooks/firestore";
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
const Sidebar
  = () => {

    const [channels] = useCollection(db.collection("rooms"));
    const [user] = useAuthState(auth);

    
    return (
      <SidebarContainer>
        <SidebarHeader>
          <SidebarInfo>
            <h2>SpaceX HQ</h2>
            <h3>
              <FiberManualRecord />
              {user.displayName}
            </h3>
          </SidebarInfo>
          <Create />
        </SidebarHeader>

        <SidebarOption Icon={InsertComment} title="Threads" />
        <SidebarOption Icon={Inbox} title="Mentions" />
        <SidebarOption Icon={Drafts} title="Saved items" />
        <SidebarOption Icon={BookmarkBorder} title="Channel browser" />
        <SidebarOption Icon={PeopleAlt} title="People" />
        <SidebarOption Icon={Apps} title="Apps" />
        <SidebarOption Icon={FileCopy} title="File browser" />
        <SidebarOption Icon={ExpandLess} title="Show less" />
        <hr />

        <SidebarOption Icon={ExpandMore} title="Channels" />
        <hr />
        <SidebarOption Icon={Add} addChannelOption title="Add Channel" />

        {channels?.docs.map((doc) => (
          <SidebarOption key={doc.id} id={doc.id} title={doc.data().name} />
        ))}
      </SidebarContainer>
    )
  }

export default Sidebar


const SidebarContainer = styled.div`
  color: white;
  background-color: var(--slack-color);
  flex: 0.3;
  border-top: 1px solid #49274b;
  max-width: 260px;
  margin-top: 60px;
  overflow-y: scroll;
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  /*scrollbar-width: none;  Firefox */
  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }
  > hr {
    height: 1px;
    border: 0;
    background-color: #49474b;
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #49274b;
  padding: 13px;
  > .MuiSvgIcon-root {
    padding: 8px;
    color: #49274b;
    font-size: 18px;
    background-color: white;
    border-radius: 999px;
  }
`;

const SidebarInfo = styled.div`
  flex: 1;
  > h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
  }
  > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;
  }
  > h3 > .MuiSvgIcon-root {
    font-size: 14px;
    margin-top: 1px;
    margin-right: 2px;
    color: green;
  }
`;