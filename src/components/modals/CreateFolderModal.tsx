import { Field, FieldAttributes, Form, Formik } from 'formik';
import React from 'react';
import auth from '../../api/auth';
import { createLibrary } from '../../api/libraryApi';
import { fetchMe } from '../../api/userApi';

interface AnnotateParams {
  folderName: string;
}

// Hacky, eventually replace
interface User {
  data: any;
}

const initialValues = {
  folderName: '',
};

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

const CreateFolderModal: React.FC<any> = (props) => {
  const handleSubmit = async (values: AnnotateParams) => {
    fetchMe('fetchMe', {
      accessToken: auth.getAccessToken(),
    })
      .then(async (res) => {
        const user = res as User;
        // Create Library
        const newLibrary = await createLibrary(
          user.data._id,
          values.folderName
        );
        const tempLibrary = props.libraries.concat(newLibrary);
        props.setLibraries(tempLibrary);
      })
      .catch((err) => console.error(err));
    props.setShow(false);
  };
  return (
    <>
      {props.show && (
        <div className='modal is-active'>
          <div className='modal-background'></div>
          <div className='modal-card'>
            <header className='modal-card-head'>
              <p className='modal-card-title'>
                Group annotations under shared themes
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
                  <FieldWrapper icon='fas fa-folder-plus'>
                    <Field
                      name='folderName'
                      className='input'
                      type='folderName'
                      placeholder='Vote 🙏'
                    />
                  </FieldWrapper>
                  <button
                    type='submit'
                    className='button is-primary is-light is-outlined'
                  >
                    Create folder
                  </button>
                </Form>
              </Formik>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateFolderModal;
