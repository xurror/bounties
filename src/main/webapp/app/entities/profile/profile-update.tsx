import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './profile.reducer';
import { IProfile } from 'app/shared/model/profile.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProfileUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProfileUpdate = (props: IProfileUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { profileEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/profile');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...profileEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="bountiesApp.profile.home.createOrEditLabel">
            <Translate contentKey="bountiesApp.profile.home.createOrEditLabel">Create or edit a Profile</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : profileEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="profile-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="profile-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="votesLabel" for="profile-votes">
                  <Translate contentKey="bountiesApp.profile.votes">Votes</Translate>
                </Label>
                <AvField id="profile-votes" type="string" className="form-control" name="votes" />
              </AvGroup>
              <AvGroup>
                <Label id="profilelinkLabel" for="profile-profilelink">
                  <Translate contentKey="bountiesApp.profile.profilelink">Profilelink</Translate>
                </Label>
                <AvField id="profile-profilelink" type="text" name="profilelink" />
              </AvGroup>
              <AvGroup>
                <Label id="aboutLabel" for="profile-about">
                  <Translate contentKey="bountiesApp.profile.about">About</Translate>
                </Label>
                <AvField id="profile-about" type="text" name="about" />
              </AvGroup>
              <AvGroup>
                <Label id="walletaddressLabel" for="profile-walletaddress">
                  <Translate contentKey="bountiesApp.profile.walletaddress">Walletaddress</Translate>
                </Label>
                <AvField id="profile-walletaddress" type="text" name="walletaddress" />
              </AvGroup>
              <AvGroup>
                <Label id="githubEmailLabel" for="profile-githubEmail">
                  <Translate contentKey="bountiesApp.profile.githubEmail">Github Email</Translate>
                </Label>
                <AvField id="profile-githubEmail" type="text" name="githubEmail" />
              </AvGroup>
              <AvGroup>
                <Label id="githubOrgNameLabel" for="profile-githubOrgName">
                  <Translate contentKey="bountiesApp.profile.githubOrgName">Github Org Name</Translate>
                </Label>
                <AvField id="profile-githubOrgName" type="text" name="githubOrgName" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/profile" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  profileEntity: storeState.profile.entity,
  loading: storeState.profile.loading,
  updating: storeState.profile.updating,
  updateSuccess: storeState.profile.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUpdate);
