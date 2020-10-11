/** @format */

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Dashboard from '../../components/layouts/Dashboard';
import { fetchMyFeed } from '../../api/linkApi';
import LinkCard from '../../components/ui/LinkCard';
import auth from '../../api/auth';

const Body = styled.div`
  margin: 30px 0 0 50px;
  display: flex;
  flex-direction: column;
`;

interface Link {
  linkUrl: string;
  readStatus: boolean;
  recipientId: string;
  senderId: string;
  senderName: string;
  timestamp: string;
  _id: string;
}

const Links = () => {
  const [renderModal, setRenderModal] = useState(false);
  const [myFeed, setMyFeed] = useState();

  useEffect(() => {
    const visited = localStorage.getItem('visited');
    if (!visited) {
      setRenderModal(true);
      localStorage.setItem('visited', '1');
    }

    fetchMyFeed(auth.getAccessToken())
      .then((res) => {
        let data = res as any;
        setMyFeed(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Dashboard installExtensionOpen={renderModal}>
      <Body>
        <h1 className='title'>Browse Your Links</h1>
        {myFeed &&
          myFeed.map((link: Link) => <LinkCard key={link._id} link={link} />)}
      </Body>
    </Dashboard>
  );
};

export default Links;
