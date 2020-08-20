/** @format */

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchMetadata } from '../../api/linkApi';

interface Link {
  linkUrl: string;
  readStatus: boolean;
  recipientId: string;
  senderId: string;
  senderName: string;
  timestamp: string;
  _id: string;
}

interface Metadata {
  url: string;
  domain: string;
  title: string;
  img: string;
  description: string;
  favicon: string;
}
const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  border-radius: 30px;
  width: 350px;
  height: 350px;
  margin: 0 auto 20px auto;

  background-color: rgba(72, 72, 72, 0.05);
  box-shadow: 0px 2px 40px 0px rgba(0, 0, 0, 0.3); /*rgba(0, 0, 0, 0.15) 0px 3px 10px;*/
  padding: 20px 0;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 10px;
    opacity: 0.9;
    background-color: rgba(72, 72, 72, 0.1);
  }
  &:active {
    opacity: 0.6;
  }
`;

const MetaImage = styled.img`
  height: 100px;
  border-radius: 15px;
  margin: 10px auto;
`;

const MetaDesc = styled.p`
  margin: 10px auto;
  padding: 0 5px;
  -webkit-line-clamp: 3;
`;

function LinkCard({ link }: { link: Link }) {
  const [preview, setPreview] = useState<Metadata | null>();

  useEffect(() => {
    fetchMetadata(link.linkUrl)
      .then((res) => {
        const data = res as Metadata;
        setPreview(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      {preview ? (
        <LinkContainer onClick={() => window.open(preview.url)}>
          <MetaImage src={preview.img} />
          <h1>{preview.title}</h1>
          <a href={preview.url}>{preview.url}</a>
          <MetaDesc>{preview.description}</MetaDesc>
        </LinkContainer>
      ) : (
        <h1>Loading {link.linkUrl}...</h1>
      )}
    </div>
  );
}

export default LinkCard;
