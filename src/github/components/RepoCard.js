import React from 'react';
import { Avatar, Card, CardTitle, CardText, List, ListItem } from 'react-md';

const RepoCard = ({ repo, selectRepo }) => {
    return (
        <Card onClick={() => selectRepo(repo.get('id'))}>
            <CardTitle
                title={repo.get('name')}
                subtitle={repo.get('full_name')}
                avatar={<Avatar random> {repo.get('name')[0].toUpperCase()} </Avatar>}
            />
            <CardText>
                <p>{repo.get('description')}</p>
                <List>
                    <ListItem
                        primaryText={repo.get('language') ? repo.get('language') : 'Unknown'}
                        secondaryText='Language'
                    />
                </List>
            </CardText>
        </Card>
    );
};

export default RepoCard;
