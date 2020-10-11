import React from 'react';
import {
  MdContactMail,
  MdHome,
  MdPalette,
  MdPeople,
  MdFileDownload,
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px 0px;
  max-width: 200px;
  width: 100%;
  min-height: 100vh;
  border-right: 1px solid rgba(72, 72, 72, 0.2);
  margin-left: 2.5rem;
`;

// TODO: Add selected button styling

const SidebarOption = styled.div`
  display: flex;
  justify-content: flex-start;
  cursor: pointer;
  width: 90%;
  margin: 0 auto 20px 0;
  text-align: center;
  background-color: rgba(72, 72, 72, 0.05);
  padding: 15px 0;
  border-radius: 40px;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 10px;
    opacity: 0.9;
    background-color: rgba(255, 163, 163, 0.15);
  }
  &:active {
    opacity: 0.6;
  }
`;

const SidebarLabel = styled.div`
  font-size: 20px;
  font-weight: 400;
  color: black;
`;

const Icon = styled.div`
  margin: 0 15px;
`;

interface Props {}

interface SidebarOptions {
  title: string;
  path?: string;
  icon?: JSX.Element;
}

const options: SidebarOptions[] = [
  {
    title: 'Feed',
    path: '/feed',
    icon: <MdHome size={25} />,
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: <MdPalette size={25} />,
  },
  {
    title: 'Chatbot',
    path: '/chatbot',
    icon: <MdContactMail size={25} />,
  },
  {
    title: 'Friends',
    path: '/friends',
    icon: <MdPeople size={25} />,
  },
  {
    title: 'Extension',
    path: '/',
    icon: <MdFileDownload size={25} />,
  },
];

const Sidebar: React.FC<Props> = (props) => {
  return (
    <SidebarContainer>
      {options.map((option) => (
        <Link
          to={option.path || '/'}
          key={option.title + option.path}
          style={{ color: 'gray' }}
        >
          <SidebarOption>
            <Icon>{option.icon}</Icon>
            <SidebarLabel>{option.title}</SidebarLabel>
          </SidebarOption>
        </Link>
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;
