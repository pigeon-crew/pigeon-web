import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Dashboard from '../../components/layouts/Dashboard';

const Body = styled.div`
  margin: 30px 0 0 50px;
  display: flex;
  flex-direction: column;
`;

const ConnectBot = () => {
  return (
    <Dashboard installExtensionOpen={false}>
      <Body>
        <h3 className='title is-3'>Meet Someone New</h3>
        <div style={{ marginTop: '20px' }}>
          <input
            className='input'
            placeholder='Type your message here...'
            style={{
              display: 'inline-block',
              width: '43vw',
              marginRight: '20px',
            }}
          ></input>
          <button className='button is-info'>Send</button>
        </div>
      </Body>
    </Dashboard>
  );
};

export default ConnectBot;
