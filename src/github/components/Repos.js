//@vendor
import React, { Component } from 'react';
import { CircularProgress } from 'react-md';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//@actions
import {
    fetchReposRequest,
    selectRepo,
    resetSelectedRepo as unselectRepo,
} from '../../actions/githubActions';

//@components
import RepoList from './RepoList';
import RepoDetail from './RepoDetail';

//@selectors
import { getRepoById } from '../../selectors/githubRepo';

export class Repos extends Component {
    componentDidMount() {
        const { fetchReposRequest, immGithub } = this.props;
        const lastSuccessfulReposFetch = immGithub.get('lastSuccessfulReposFetch');

        const now = new Date();
        if (!lastSuccessfulReposFetch) {
            fetchReposRequest();
        } else if ((now - lastSuccessfulReposFetch) / 1000 > 300) {
            fetchReposRequest();
        }
    }

    render() {
        const { immGithub, repos, selectRepo, unselectRepo } = this.props;
        const isFetchingRepos = immGithub.get('isFetchingRepos');
        const selectedRepo = immGithub.get('selectedRepo');

        return isFetchingRepos ? (
            <CircularProgress id='repos-progress' />
        ) : selectedRepo ? (
            <RepoDetail repo={repos} unselectRepo={unselectRepo} />
        ) : (
            <RepoList repos={repos} selectRepo={selectRepo} />
        );
    }
}

Repos.propTypes = {
    immGithub: PropTypes.object.isRequired,
    fetchReposRequest: PropTypes.func.isRequired,
    selectRepo: PropTypes.func.isRequired,
    unselectRepo: PropTypes.func.isRequired,
    repos: PropTypes.object.isRequired,
};

export default connect(
    state => ({
        immGithub: state.immGithub,
        repos: getRepoById(state),
    }),
    {
        fetchReposRequest,
        selectRepo,
        unselectRepo,
    },
)(Repos);
