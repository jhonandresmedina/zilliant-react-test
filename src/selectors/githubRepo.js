const getRepoById = state => {
    const repos = state.immGithub.get('repos');
    const repoId = state.immGithub.get('selectedRepo');

    if (repoId) {
        return repos.find(repo => repo.get('id') === repoId);
    } else {
        return repos;
    }
};

export { getRepoById };
