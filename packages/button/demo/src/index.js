import React from 'react'
import {render} from 'react-dom'

import Button from '../../src'

let Demo = React.createClass({
    render() {
        return <div>
            <Button> Join Now </Button>
            <br/>
            <Button disabled={true}> Join Now </Button> <br/>
            <Button href="/faq"> Join Now </Button>
        </div>
    }
});

render(<Demo/>, document.querySelector('#demo'))
