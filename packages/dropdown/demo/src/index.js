import React, {Component} from 'react'
import {render} from 'react-dom'

import Dropdown from '../../src'

const list = [
    {value: 'recommended', label: 'Recommended'},
    {value: 'classic', label: 'Classic'},
    {value: 'most_popular', label: 'Most Popular'},
    {value: 'newbie', label: 'Newbies'}
];

class Demo extends Component {

    state = {
        filterSelected: 'recommended'
    };

    handleChange = (newValue) => {
        this.setState({filterSelected: newValue});

    }

    render() {
        return <div>
            <h1>Dropdown Demo</h1>
            <Dropdown
                source={list}
                value={this.state.filterSelected}
                onChange={this.handleChange}
            />
        </div>
    }
}

render(<Demo/>, document.querySelector('#demo'))
