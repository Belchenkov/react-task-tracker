import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import Button from "./Button";

const Header = ({ title, showAddForm, showAdd }) => {
    const location = useLocation();

    return (
        <header className="header">
            <h1>{ title }</h1>
            { location.pathname === '/' && (
                <Button
                    color={showAdd ? 'red' : 'green'}
                    text={showAdd ? 'Close' : 'Add'}
                    onClick={showAddForm}
                />)
            }
        </header>
    );
};

Header.defaultProps = {
    title: 'Task Tracker'
};

Header.propTypes = {
    title: PropTypes.string
};

export default Header;
