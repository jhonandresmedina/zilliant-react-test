//@vendor
import React from 'react';
import { Drawer, List, ListItem, Avatar, FontIcon } from 'react-md';

const Sidebar = ({ user }) => {
    const getAvatarIcon = description => {
        return <Avatar icon={<FontIcon>{description}</FontIcon>} />;
    };

    return user ? (
        <Drawer
            className='sidebar'
            type={Drawer.DrawerTypes.PERSISTENT}
            visible
            onMediaTypeChange={() => {}}
            onVisibilityChange={() => {}}>
            <List>
                <ListItem
                    leftAvatar={getAvatarIcon('favorite')}
                    primaryText='Following'
                    secondaryText={user.get('following')}
                />
                <ListItem
                    leftAvatar={getAvatarIcon('group')}
                    primaryText='Followers'
                    secondaryText={user.get('followers')}
                />
                <ListItem
                    leftAvatar={getAvatarIcon('folder_special')}
                    primaryText='Public Repos'
                    secondaryText={user.get('public_repos')}
                />
                <ListItem
                    leftAvatar={getAvatarIcon('local_activity')}
                    primaryText='Public Gists'
                    secondaryText={user.get('public_gists')}
                />
            </List>
        </Drawer>
    ) : null;
};

export default Sidebar;
