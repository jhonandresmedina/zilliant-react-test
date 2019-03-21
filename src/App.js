import '../node_modules/react-md/dist/react-md.deep_orange-blue.min.css';

//@vendor
import React from 'react';

//@components
import Layout from './github/components/Layout';
import Repos from './github/components/Repos';

const App = () => {
    return (
        <Layout>
            <Repos />
        </Layout>
    );
};

export default App;
