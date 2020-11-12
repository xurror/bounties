import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Bounty from './bounty';
import Funding from './funding';
import ErrorBoundary from 'app/shared/error/error-boundary';
import { DesktopHeader, MobileHeader } from 'app/shared/layout/header/header';
import { createMedia } from '@artsy/fresnel';
import { Segment, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';
import { hot } from 'react-hot-loader';
import Footer from 'app/shared/layout/footer/footer';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export interface IRouteProps extends StateProps {match: any}

const { MediaContextProvider, Media } = createMedia({
	breakpoints: {
		mobile: 0,
		tablet: 768,
		computer: 1024,
	},
})

const Routes = (props: IRouteProps) => {
  
  const { match } = props;

  return (
    <MediaContextProvider>
      <ErrorBoundary>
        <MediaContextProvider>
          <Media greaterThan='mobile'>
            <DesktopHeader
              isAuthenticated={props.isAuthenticated}
              isAdmin={props.isAdmin}
              account={props.account}
              isInProduction={props.isInProduction}
              isSwaggerEnabled={props.isSwaggerEnabled}
            />
          </Media>
          <Media at='mobile'>
            <MobileHeader
              isAuthenticated={props.isAuthenticated}
              isAdmin={props.isAdmin}
              account={props.account}
              isInProduction={props.isInProduction}
              isSwaggerEnabled={props.isSwaggerEnabled}
            />
          </Media>
        </MediaContextProvider>
      </ErrorBoundary>
      
            <div id="contain">
              <Switch>
                {/* prettier-ignore */}
                <ErrorBoundaryRoute path={`${match.url}bounty`} component={Bounty} />
                <ErrorBoundaryRoute path={`${match.url}funding`} component={Funding} />
                {/* jhipster-needle-add-route-path - JHipster will add routes here */}
              </Switch>
            </div>
      
      <Footer />
    </MediaContextProvider>
  );
}

const mapStateToProps = ({ authentication, applicationProfile, }: IRootState) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN]),
  isInProduction: applicationProfile.inProduction,
  isSwaggerEnabled: applicationProfile.isSwaggerEnabled,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps, null)(hot(module)(Routes));

// export default Routes;
