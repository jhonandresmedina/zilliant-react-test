//@vendor
import React, { Component } from 'react';
import { CircularProgress, Snackbar } from 'react-md';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//@actions
import { fetchUserRequest, fetchReposRequest, dismissError } from '../../actions/githubActions';

//@components
import TopBar from '../components/TopBar';
import Sidebar from './Sidebar';

class Layout extends Component {
    constructor(props) {
        super(props);

        this.updateAll = this.updateAll.bind(this);
    }

    componentDidMount() {
        const { fetchUserRequest, immGithub } = this.props;
        const lastSuccessfulUserFetch = immGithub.get('lastSuccessfulUserFetch');
        const now = new Date();

        if (!lastSuccessfulUserFetch) {
            fetchUserRequest();
        } else if ((now - lastSuccessfulUserFetch) / 1000 > 300) {
            fetchUserRequest();
        }
    }

    updateAll() {
        const { fetchUserRequest, fetchReposRequest } = this.props;
        fetchUserRequest();
        fetchReposRequest();
    }

    render() {
        const { children, dismissError, immGithub } = this.props;
        const user = immGithub.get('user');
        const isFetchingUser = immGithub.get('isFetchingUser');
        const errorMessage = immGithub.get('errorMsg');
        const toasts = errorMessage ? [{ text: errorMessage }] : [];

        return (
            <div>
                {isFetchingUser || !user ? (
                    <CircularProgress id='main-progress' />
                ) : (
                    <div>
                        <TopBar user={user} updateAll={this.updateAll} />
                        <div className='main-container'>
                            <Sidebar user={user} />
                            {children}
                        </div>
                    </div>
                )}
                <Snackbar id='error-snackbar' toasts={toasts} onDismiss={dismissError} />
            </div>
        );
    }
}

Layout.propTypes = {
    immGithub: PropTypes.object.isRequired,
    fetchUserRequest: PropTypes.func.isRequired,
    fetchReposRequest: PropTypes.func.isRequired,
};

export default connect(
    state => ({
        immGithub: state.immGithub,
    }),
    {
        fetchUserRequest,
        fetchReposRequest,
        dismissError,
    },
)(Layout);
