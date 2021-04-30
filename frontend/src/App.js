import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { PUBLIC_ENDPOINT, PRIVATE_ENDPOINT, AUTH0_DOMAIN } from './Config';

const App = () => {
  const {
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();
  const [message, setMessage] = useState('');

  const handlePublicClick = () => {
    fetch(PUBLIC_ENDPOINT, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Message:', data);
        setMessage(data.message);
      })
      .catch((e) => {
        console.log('error', e);
        setMessage(e.message);
      });
  };

  const handlePrivateClick = async () => {
    console.log('isAuthenticated', isAuthenticated);
    let headers;

    if (isAuthenticated) {
      try {
        const token = await getAccessTokenSilently({
          audience: `https://${AUTH0_DOMAIN}/api/v2/`,
          scope: 'openid profile email',
        });
        console.log('token', token);
        headers = {
          Authorization: `Bearer ${token}`,
        };
      } catch (e) {
        console.log(e);
      }
    }

    fetch(PRIVATE_ENDPOINT, {
      method: 'GET',
      headers,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Message:', data);
        setMessage(data.message);
      })
      .catch((e) => {
        console.log('error', e);
        setMessage(e.message);
      });
  };

  return (
    <div className="container mt-3">
      <div className="p-3">
        <div className="logo">
          <img src="https://i.cloudup.com/StzWWrY34s.png" alt="logo" />
        </div>
        <h2>AWS λ Authorizer Example with Auth0</h2>
      </div>
      <div className="p-3">
        <h3>
          Welcome <span className="nickname">{user && user.nickname}</span>
        </h3>
      </div>

      <div className="p-3">
        <div className="user-actions">
          {!isAuthenticated && (
            <button
              className="btn btn-primary"
              onClick={() => loginWithRedirect()}
            >
              Log in
            </button>
          )}

          {isAuthenticated && (
            <button
              className="btn btn-primary"
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Logout
            </button>
          )}
        </div>
      </div>

      <div className="p-3">
        {message && (
          <div className="shadow-sm p-3 mb-5 bg-white rounded">
            <pre>{message}</pre>
          </div>
        )}
        <div className="api-actions">
          <button
            className="btn btn-secondary btn-lg mr-1"
            onClick={handlePublicClick}
          >
            Call Public API
          </button>
          <button
            className="btn btn-secondary btn-lg  ml-1"
            onClick={handlePrivateClick}
          >
            Call Protected API
          </button>
        </div>
      </div>
      <div className="p-3">
        <div>
          {!isAuthenticated && isLoading && (
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )}
          {isAuthenticated && (
            <div className="card" style={{ width: '18rem' }}>
              <img
                className="card-img-top"
                src={user.picture}
                alt={user.name}
              />
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">{user.email}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="p-3">
        <div className="mx-auto">
          <a
            href="https://github.com/tsamaya/aws-lambda-node-authorizer-auth0"
            target="_blank"
            rel="noreferrer"
          >
            View the source on github
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
