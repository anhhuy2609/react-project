import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import config from '~/config';
import Menu, { MenuItem } from './Menu';
import {
    ExploreActiveIcon,
    ExploreIcon,
    HomeActiveIcon,
    HomeIcon,
    LiveActiveIcon,
    LiveIcon,
    UserGroupActiveIcon,
    UserGroupIcon,
} from '~/components/Icons';
import FollowingAccounts from '~/components/FollowingAccounts';
import { useEffect, useState } from 'react';
import * as userService from '~/services/userService';

const cx = classNames.bind(styles);

function Sidebar() {
    const [followingUsers, setFollowingUsers] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const data = await userService.getFollowing({page: 1, perPage: 5});
                setFollowingUsers(data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchApi()
    }, []);

    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="For you" to={config.routes.home} activeIcon={<HomeActiveIcon />} icon={<HomeIcon />} />
                <MenuItem
                    title="Following"
                    to={config.routes.following}
                    activeIcon={<UserGroupActiveIcon />}
                    icon={<UserGroupIcon />}
                    />
                <MenuItem
                    title="Explore"
                    to={config.routes.explore}
                    activeIcon={<ExploreActiveIcon />}
                    icon={<ExploreIcon />}
                />
                <MenuItem title="LIVE" to={config.routes.live} activeIcon={<LiveActiveIcon />} icon={<LiveIcon />} />
            </Menu>
            <hr />
            <FollowingAccounts label="Following accounts" data ={followingUsers} />
        </aside>
    );
}

export default Sidebar;
