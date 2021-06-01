import PropTypes from 'prop-types';

import Button from "./Button";

const Header = ({ title, showAddForm, showAdd }) => {
    return (
        <header className="header">
            <h1>{ title }</h1>
            <Button
                color={showAdd ? 'red' : 'green'}
                text={showAdd ? 'Close' : 'Add'}
                onClick={showAddForm}
            />
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
