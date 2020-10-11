/** @format */

import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import auth from '../../api/auth';
import { fetchMyFeed } from '../../api/linkApi';
import Dashboard from '../../components/layouts/Dashboard';
import LinkCard from '../../components/ui/LinkCard';

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

const Feed = () => {
  const [renderModal, setRenderModal] = useState(false);
  const feedQuery = useQuery(
    ['fetchMyFeed', { accessToken: auth.getAccessToken() }],
    fetchMyFeed
  );

  useEffect(() => {
    const visited = localStorage.getItem('visited');
    if (!visited) {
      setRenderModal(true);
      localStorage.setItem('visited', '1');
    }
  }, []);

  const LinkFeed = (res: any) => {
    const data = res as Link[];
    if (data.length < 1) return <h1>Oops. No links yet.</h1>;

    return data.map((link) => <LinkCard key={link._id} link={link} />);
  };

  return (
    <Dashboard installExtensionOpen={renderModal}>
      <Body>
        <h1 className='title'>Browse Your Links</h1>
        <div style={{ margin: '40px 0px', width: '60%' }}>
          {feedQuery.isLoading && <h1>Loading...</h1>}
          {feedQuery.data && LinkFeed(feedQuery.data)}
        </div>
      </Body>
    </Dashboard>
  );
};

export default Feed;
