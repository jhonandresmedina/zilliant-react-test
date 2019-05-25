//@vendor
import React from 'react';
import { Paper, Button, DataTable, TableRow, TableColumn, TableBody } from 'react-md';
import { Map } from 'immutable';

const RepoDetail = ({ repo, unselectRepo }) => {
    const children = [];
    repo.forEach((value, key) => {
        const element =
            typeof value !== 'object' && !Map.isMap(value) ? (
                <TableRow key={key}>
                    <TableColumn>{key.toUpperCase()}</TableColumn>
                    <TableColumn>
                        {key.endsWith('url') ? (
                            <a href={value}>{value}</a>
                        ) : value !== null ? (
                            value.toString()
                        ) : (
                            'None'
                        )}
                    </TableColumn>
                </TableRow>
            ) : null;
        children.push(element);
    });

    return (
        <div style={{ paddingTop: '20px', paddingRight: '20px', width: '100%' }}>
            <Button onClick={unselectRepo} style={{ marginBottom: '20px' }} mini floating>
                arrow_back
            </Button>
            <Paper style={{ padding: '20px' }}>
                <h2>{repo.get('name')}</h2>
                <DataTable plain>
                    <TableBody>{children}</TableBody>
                </DataTable>
            </Paper>
        </div>
    );
};

export default RepoDetail;
