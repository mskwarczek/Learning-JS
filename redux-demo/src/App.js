import React from 'react';
import CommentsListContainer from './CommentsListContainer';
import NewCommentContainer from './NewCommentContainer'
import DevTools from './DevTools';

const App = () => {
    return (
        <div className="App">
            <NewCommentContainer /> <br />
            <CommentsListContainer />
            <DevTools />
        </div>
    );
};

export default App;