import React from 'react';
import styled from 'styled-components';
import InstallExtensionModal from '../modals/InstallExtensionModal';
import NavBar from '../ui/NavBar';
import Sidebar from '../ui/Sidebar';

interface Props {
  children: any;
  installExtensionOpen?: boolean;
}

const Container = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  min-width: 100%;
  min-height: 100%;
  opacity: 100%;
  background-color: white;
  overflow: scroll;
`;

const ContentContainer = styled.div`
  display: flex;
  height: 600px;
  max-width: 100%;
  margin-right: auto;
  margin-left: auto;
`;

const User: React.FC<Props> = ({ children, installExtensionOpen, ...rest }) => {
  return (
    <>
      {installExtensionOpen && <InstallExtensionModal />}
      <Container>
        <NavBar />
        <ContentContainer>
          <Sidebar />
          {children}
        </ContentContainer>
      </Container>
    </>
  );
};

export default User;
