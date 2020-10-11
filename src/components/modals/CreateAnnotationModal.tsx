import React, { useState } from 'react';
import styled from 'styled-components';
import { Field, FieldAttributes, Form, Formik } from 'formik';
import BarLoader from 'react-spinners/BarLoader';
import { fetchMetadata } from '../../api/linkApi';
import { fetchMe } from '../../api/userApi';
import { createLink } from '../../api/libraryApi';
import auth from '../../api/auth';

interface AnnotateParams {
  link: string;
}

// Hacky, eventually replace
interface User {
  data: any;
}

interface Metadata {
  url: string;
  domain: string;
  title: string;
  img: string;
  description: string;
  favicon: string;
}

const initialValues = {
  link: '',
};

const Button = styled.button`
  width: 30%;
`;

const LoaderContainer = styled.div`
  margin-top: 10px;
`;

const FieldWrapper = ({
  children,
  icon,
}: {
  children: FieldAttributes<any>;
  icon?: string;
}) => {
  if (!icon) return children;

  return (
    <div className='field'>
      <p className='control has-icons-left has-icons-right'>
        {children}
        <span className='icon is-small is-left'>
          <i className={`fas ${icon}`}></i>
        </span>
      </p>
    </div>
  );
};

const CreateAnnotationModal: React.FC<any> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [domain, setDomain] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [img, setImg] = useState<string>();
  const [link, setLink] = useState<string>();
  const [showMetadata, setShowMetadata] = useState(false);
  const handleSubmit = async (values: AnnotateParams) => {
    console.log('populate metadata');
    fetchMetadata(values.link)
      .then((res) => {
        const data = res as Metadata;
        setDomain(data.domain);
        setTitle(data.title);
        setImg(data.img);
        setLink(values.link);
        setShowMetadata(true);
      })
      .catch((err) => console.error(err));

    //setIsLoading(false);
  };
  const addLink = async (title: string, link: string) => {
    fetchMe('fetchMe', {
      accessToken: auth.getAccessToken(),
    })
      .then(async (res) => {
        const user = res as User;
        // Create Library
        const newLibrary = await createLink(user.data._id, title, link);
        const tempLibrary = props.libraries.concat(newLibrary);
        props.setLibraries(tempLibrary);
      })
      .catch((err) => console.error(err));
    props.setShow(false);
  };

  const handleAnnotate = async () => {
    if (link) {
      props.fetchContent(link);
    }
  };

  return (
    <>
      {props.show && (
        <div className='modal is-active'>
          <div className='modal-background'></div>
          <div className='modal-card'>
            <header className='modal-card-head'>
              <p className='modal-card-title'>
                Annotate an interesting link 😍
              </p>
              <button
                className='delete'
                aria-label='close'
                onClick={() => props.setShow(false)}
              ></button>
            </header>
            <section className='modal-card-body'>
              <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form>
                  <FieldWrapper icon='fa-link'>
                    <Field
                      name='link'
                      className='input'
                      type='link'
                      placeholder='https://hackmit.org/'
                    />
                  </FieldWrapper>
                  <Button
                    className='button is-primary is-light is-outlined'
                    onClick={() => setIsLoading(true)}
                    type='submit'
                  >
                    <span className='icon'>
                      <i className='fas fa-file-import'></i>
                    </span>
                    <span>Fetch content</span>
                  </Button>
                </Form>
              </Formik>
              <LoaderContainer>
                <BarLoader width={180} color={'#00947e'} loading={isLoading} />
              </LoaderContainer>
              {showMetadata && (
                <>
                  <p>{domain}</p>
                  <p>{title}</p>
                </>
              )}
            </section>
            <footer className='modal-card-foot'>
              <button
                className='button is-primary is-light is-outlined'
                onClick={() => {
                  handleAnnotate();
                  addLink(title || 'To fix', img || '');
                }}
              >
                Annotate
              </button>
              <button
                className='button is-success is-light'
                onClick={() => {
                  addLink(title || 'To fix', img || '');
                  props.setShow(false);
                }}
              >
                Skip Annotation
              </button>
              <button className='button' onClick={() => props.setShow(false)}>
                Cancel
              </button>
            </footer>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateAnnotationModal;
