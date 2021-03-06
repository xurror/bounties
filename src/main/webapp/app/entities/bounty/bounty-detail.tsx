/* eslint-disable react/jsx-key */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { IRootState } from 'app/shared/reducers';
import { getEntity as getFunding, updateEntity as updateFunding, createEntity as createFunding, reset as resetFunding } from 'app/entities/funding/funding.reducer';
import { addFunds, removeFunds, getEntity, getSearchEntities, getEntities } from './bounty.reducer';
import { createMedia } from '@artsy/fresnel';
import { AUTHORITIES } from 'app/config/constants';
import { hasAnyAuthority } from 'app/shared/auth/private-route';

import HorizontalNav2 from 'app/components/horizontal-navs/HorizontalNav2';
import StructureContainer from 'app/components/__structures/StructureContainer';
import StructureDiv from 'app/components/__structures/StructureDiv';
import BountyDetails from 'app/components/bounty-details/BountyDetails';
import { Divider } from '@material-ui/core';
import Comments from 'app/components/comments/comments';
import Footer1 from 'app/components/footers/Footerer1';

export interface IBountyDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {};

const { MediaContextProvider, Media } = createMedia({
	breakpoints: {
		mobile: 0,
		tablet: 768,
		computer: 1024,
	},
});

export const BountyDetail = (props: IBountyDetailProps) => {

  const { isAuthenticated } = props;

  return (
    <React.Fragment>
      <StructureDiv
        bucket1={[
          <HorizontalNav2 content={null} />,

          <StructureContainer
            bucket1={[
              <BountyDetails content={null} />,

              <Divider />,

              <Comments content={null} />,
            ]}
          />,

          <Footer1 content={null} />,
        ]}
      />
    </React.Fragment>
  );
};

const mapStateToProps = ({ authentication, bounty, funding }: IRootState) => ({
  bountyEntity: bounty.entity,
  bountyList: bounty.entities,
  loading: bounty.loading,
  fundingUpdating: funding.updating,
  isAuthenticated: authentication.isAuthenticated,
  account: authentication.account
});

const mapDispatchToProps = {
  getEntity,
  getEntities,
  getSearchEntities,

  addFunds,
  removeFunds,

  getFunding,
  resetFunding,
  updateFunding,
  createFunding,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BountyDetail);
