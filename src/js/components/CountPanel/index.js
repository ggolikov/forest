import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../AC';
import { getReportsCount } from '../../helpers';

class CountPanel extends Component {
    constructor(props) {
        super(props);

        getReportsCount()
            .then((res) => {
                const { registered, limit, used } = res.Result;

                props.setCount(limit - used);
            });
    }

    render() {
        const label = `Ваш баланс: ${this.props.reportsCount}`
        return (
            <div className="forest-plugin-header">
                {label}
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    let { reportsCount } = state;

    return { reportsCount };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const { setReportsCount } = actionCreators;

    return {
        ownProps,
        setCount: (count) => {
            dispatch(setReportsCount(count));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountPanel);
