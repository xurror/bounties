import React, { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { getSortState, JhiItemCount } from 'react-jhipster';
import { Link, RouteComponentProps } from 'react-router-dom';

import { createMedia } from '@artsy/fresnel';
import { Category } from 'app/shared/model/enumerations/category.model';
import { Experience } from 'app/shared/model/enumerations/experience.model';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { capitalizeFirst } from 'app/shared/util/string-utils';
import { Button, Divider, Grid, Header, Icon, Input, List, Pagination, Rating, Segment, Table } from 'semantic-ui-react';
import { APP_DATETIME_FORMAT } from 'app/config/constants';

export interface IBountyHomeComponentProps extends RouteComponentProps {
	bountyList: any,
  loading: any,
  links: any,
  totalItems: any,
  updateSuccess: any,
  getSearchEntities: any,
  getEntities: any,
  reset: any,
}

const { MediaContextProvider, Media } = createMedia({
	breakpoints: {
		mobile: 0,
		tablet: 768,
		computer: 1024,
	},
})

export const BountyHomeComponent = (props: IBountyHomeComponentProps) => {
  
	const [search, setSearch] = useState('');
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE), props.location.search)
  );
  const [bountyActivePage, setBountyActivePage] = useState(paginationState.activePage);

  const getAllEntities = () => {
		const pageable = {
			page: paginationState.activePage - 1,
			size: paginationState.itemsPerPage,
			sort: `${paginationState.sort},${paginationState.order}`}
    props.getEntities(pageable);
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sort = params.get('sort');
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p,
    });
  };

  const handlePagination = (event, { activePage }) => {
    setBountyActivePage(activePage);
    setPaginationState({
      ...paginationState,
      activePage
    });
  }


  const startSearching = (event) => {
    const key = event.keyCode || event.which;
    if (key === 13){
      if (search) {
        props.getSearchEntities(search);
      }
    }
  };

  const startSearchingButton = (event) => {
    if (search) {
      alert(search);
      props.getSearchEntities(search);
    }
  };

  const clear = () => {
    setSearch('');
    props.getEntities();
  };

  const handleSearch = event => setSearch(event.target.value);

  const getDifficulty = (experience: Experience) => {
    if (experience === Experience.ADVANCED) {
      return 3
    } else if (experience === Experience.INTERMEDIATE) {
      return 2
    } else if (experience === Experience.BEGINNER) {
      return 1
    } else {
      return 0
    }
  }

  const TableFooter = () => {
    return (
      <Table.Footer id='tableHeaderText' style={{ textAlign: 'center' }} fullWidth>
				<Table.Row>
					<Table.Cell colSpan='5'>
            <Pagination
              size='mini'
              boundaryRange={0}
              activePage={bountyActivePage}
              ellipsisItem={null}
              firstItem={null}
              lastItem={null}
              siblingRange={1}
              // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
              // @ts-ignore: No overload matches this call
              onPageChange={handlePagination}
              totalPages={Math.round(props.totalItems / paginationState.itemsPerPage)}
            />
            <JhiItemCount page={paginationState.activePage} total={props.totalItems} itemsPerPage={paginationState.itemsPerPage} />         
					</Table.Cell>
				</Table.Row>
      </Table.Footer>
    )
  }

  const DesktopBountyTable = () => {
    return (
      props.bountyList.map((bounty, i) => (
        <>	
					{/* <ReactTooltip id={`bounty-tooltip-${bounty.id}`} aria-haspopup='true' type='info'>
						<Header as='h3' content={bounty.summary} />
						<p>{bounty.description !== null ? <i>No description available</i> : bounty.description}</p>
						<div id='standardText'>
							Difficulty: <Rating icon='star' rating={getDifficulty(bounty.experience)} maxRating={3} />
							<br/>
							Category: {bounty.category === Category.FRONT_END && 'Front End' || bounty.category === Category.BACKEND && 'Backend' || bounty.category === Category.THIS && 'This'}
						</div>
					</ReactTooltip> */}

					<Table.Row data-tip data-for={`bounty-tooltip-${bounty.id}`}>
						<Table.Cell>
							<a href={`bounty/${bounty.id}`}>
								<Header as='h4' id='tableContentText'>
									<Header.Content>
										#{bounty.id} - {bounty.summary}
										<Header.Subheader>Created by {bounty.createdBy} {bounty.createdDate === null ? '' : `on ${new Date(bounty.createdDate).toLocaleDateString('en-US', APP_DATETIME_FORMAT)}`}</Header.Subheader>
									</Header.Content>
								</Header>
							</a>
						</Table.Cell>
						<Table.Cell><div id='tableContentText' style={{ textAlign: 'center' }}><b>{capitalizeFirst(bounty.experience)}</b></div></Table.Cell>
						<Table.Cell><div id='tableContentText' style={{ textAlign: 'center' }}><b>{capitalizeFirst(bounty.type)}</b></div></Table.Cell>
						<Table.Cell><div id='tableContentText' style={{ textAlign: 'center' }}><b>{capitalizeFirst(bounty.status)}</b></div></Table.Cell>
						<Table.Cell><div id='tableContentText' style={{ textAlign: 'center' }}><b>
							{new Date(bounty.expiryDate).toLocaleDateString('en-US', APP_DATETIME_FORMAT)}
						</b></div></Table.Cell>
					</Table.Row>
							
        </>
      ))
    )
	}
	
	const MobileBountyTable = () => {
    return (
      props.bountyList.map((bounty, i) => (
        <>
					<Table.Row>
						<Table.Cell>
							<a href={`bounty/${bounty.id}`}>
								<Header as='h4'>
									<Header.Content id='tableHeaderText'>
										#{bounty.id} - {bounty.summary}
										<Header.Subheader>
											<span>
												<List bulleted horizontal size='big'>
													<List.Item>
														Created by {bounty.createdBy}
													</List.Item>
													<List.Item>
														on {bounty.createdDate === null ? '' : `${new Date(bounty.createdDate).toLocaleDateString('en-US', APP_DATETIME_FORMAT)}`}
													</List.Item>
													<List.Item>
														Expires on {new Date(bounty.expiryDate).toLocaleDateString('en-US', APP_DATETIME_FORMAT)}
													</List.Item>
												</List>
											</span>
										</Header.Subheader>
									</Header.Content>									
								</Header>
								<div>

									<p>{bounty.description !== null ? <i>No description available</i> : bounty.description}</p>
									<span><small>Difficulty: <Rating icon='star' rating={getDifficulty(bounty.experience)} maxRating={3} /></small></span>
									<br/>
									<span><small>Category: {bounty.category === Category.FRONT_END && 'Front End' || bounty.category === Category.BACKEND && 'Backend' || bounty.category === Category.THIS && 'This'}</small></span>
									<br/>
									
								</div>
							</a>
						</Table.Cell>
					</Table.Row>
        </>
      ))
    )
  }

	const { bountyList, loading } = props;

  return (
		<div id="contain">
			<MediaContextProvider>
				<Media greaterThan='mobile'>
					<Segment basic vertical style={{ padding: '5em 5em' }}>
						<Grid container stackable verticalAlign='middle'>
							<Grid.Row>
								<Grid.Column width={16}>
									<Segment basic>
										<Grid columns={2} stackable textAlign='center'>
											<Divider vertical>Or</Divider>

											<Grid.Row verticalAlign='middle'>
												<Grid.Column textAlign='center'>
													<Input
														action={
															<button
																className='myButton'
																style={{ borderColor: 'green' }}
																onClick={startSearchingButton}
															>
																Search
															</button>
													}
														icon='search'
														iconPosition='left'
														placeholder='Search bounties...'
														onChange={handleSearch}
														onKeyPress={startSearching}
														value={search}
													/>
												</Grid.Column>
												<Grid.Column textAlign='center'>
													<Link to={`bounty/new`}>
														<button
															className='myButton'
															style={{ borderColor: 'green' }}
															data-tip
														>
															<Icon name='add' />Create New Bounty
														</button>
													</Link>
												</Grid.Column>
											</Grid.Row>
										</Grid>
									</Segment>
									<div>
										<Table style={{ backgroundColor: 'transparent' }} color='black' selectable={bountyList.length > 0}>
											
												<Table.Row>
													<Table.HeaderCell width="9"></Table.HeaderCell>
													<Table.HeaderCell width="1"><div id='tableHeaderText' style={{ textAlign: 'center' }}>Experience</div></Table.HeaderCell>
													<Table.HeaderCell width="1"><div id='tableHeaderText' style={{ textAlign: 'center' }}>Type</div></Table.HeaderCell>
													<Table.HeaderCell width="1"><div id='tableHeaderText' style={{ textAlign: 'center' }}>Status</div></Table.HeaderCell>
													<Table.HeaderCell width="3"><div id='tableHeaderText' style={{ textAlign: 'center' }}>Expires on</div></Table.HeaderCell>
												</Table.Row>

											{bountyList && bountyList.length > 0 ? (
											<>
												<DesktopBountyTable/>
												<TableFooter/>
											</>
											) : (
												!loading && (
													<Table.Body>
														<Table.Row>
															<Table.Cell textAlign="center">
																<Header as='h4' image>
																	<Header.Content>
																		No Bounty found
																	</Header.Content>
																</Header>
															</Table.Cell>
														</Table.Row>
												</Table.Body>
												)
											)}
										</Table>
									</div>
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</Segment>
				</Media>

				<Media at='mobile'>
					<Segment basic vertical>
						<Grid container stackable verticalAlign='middle'>
							<Grid.Row>
								<Grid.Column width={16}>
								
									<Link to={`/bounty/new`}>
										<button
											className='myButton'
											style={{ borderColor: 'green' }}
											data-tip
										>
											<Icon name='add' />Create New Bounty
										</button>
									</Link>
										
									<Table style={{ backgroundColor: 'transparent' }} celled color='black' selectable={bountyList.length > 0}>
										<Table.Header>
											<Table.Row>
												<Table.HeaderCell>
													<Input
														fluid
														action={<Button color='teal' content='search' onClick={startSearchingButton} />}
														icon='search'
														iconPosition='left'
														placeholder='Search bounties...'
														onChange={handleSearch}
														onKeyPress={startSearching}
														value={search}
													/>
												</Table.HeaderCell>
											</Table.Row>
										</Table.Header>

										{bountyList && bountyList.length > 0 ? (
										<>
											<MobileBountyTable/>
											<TableFooter/>
										</>
										) : (
											!loading && (
												<Table.Body>
													<Table.Row>
														<Table.Cell textAlign="center">
															<Header as='h4' image>
																<Header.Content>
																	No Bounty found
																</Header.Content>
															</Header>
														</Table.Cell>
													</Table.Row>
											</Table.Body>
											)
										)}
									</Table>
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</Segment>
				</Media>
			</MediaContextProvider>
		</div>
  );
};

export default BountyHomeComponent;
