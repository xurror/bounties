import 'react-toastify/dist/ReactToastify.css';
import 'semantic-ui-css/semantic.min.css'
import './app.scss';

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import { getSession } from 'app/shared/reducers/authentication';

import ErrorBoundary from 'app/shared/error/error-boundary';
import AppRoutes from 'app/routes';

const baseHref = document.querySelector('base').getAttribute('href').replace(/\/$/, '');

export const App = (props: DispatchProps) => {
  useEffect(() => {
    props.getSession();
  }, []);

  return (
    <Router basename={baseHref}>
      <svg viewBox="0 0 600 400" width="0" height="0" xmlns="http://www.w3.org/2000/svg">
        <filter id="wavy2">
          <feTurbulence x="0" y="0" baseFrequency="0.02" numOctaves="5" seed="1" />
          <feDisplacementMap in="SourceGraphic" scale="20" />
        </filter>
      </svg>
      <main>
        <div id="parchment" className={'oldie-filter'}></div>
            <ErrorBoundary>
              <AppRoutes />
            </ErrorBoundary>
        
      </main>
    </Router>
  );
};

const mapDispatchToProps = { getSession };
 
type DispatchProps = typeof mapDispatchToProps

export default connect(null, mapDispatchToProps)(hot(module)(App));
null