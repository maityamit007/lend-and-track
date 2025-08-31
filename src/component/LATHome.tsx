import React, { useContext } from 'react'
import Dashboard from './dashboard/Dashboard'
import { BreadcrumbProvider } from '@/context/context';
import History from './history/History';

function LATHome() {
    let { breadCrumbState  } = useContext(BreadcrumbProvider);
    console.log('breadCrumbState', breadCrumbState);
    
    let renderComponent = () => {
        switch (breadCrumbState.currentPage) {
            case 'dashboard':
                return <Dashboard />
            case 'history':
                return <History />
            default:
                return null
        }
    }

    return (
        <div>
            {renderComponent()}
        </div>
    )
}

export default LATHome