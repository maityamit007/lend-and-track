import React, { createContext, ReactNode, useMemo, useState } from 'react'
import { Breadcrumb } from './contextInterface';

export let BreadcrumbProvider = createContext({
    breadCrumbState: {} as Breadcrumb,
    setBreadCrumb: (key: string, value: any) => {}
});

function BreadcrumbContext({children}: {children: ReactNode}) {

    let [breadCrumbState, setBreadCrumbState] = useState<Breadcrumb>({
        dashboard: { id: 'dashboard', name: 'Dashboard', link: '/dashboard' },
        history: {},
        currentPage: 'dashboard'
    });

    let setBreadCrumb = (key: string, value: any) => {
        setBreadCrumbState((prevState) => ({
            ...prevState,
            [key]: value
        }));
    }


    let providerObj = useMemo(() => ({
        breadCrumbState,
        setBreadCrumb
    }), [])


    return (
        <BreadcrumbProvider.Provider value={providerObj}>{children}</BreadcrumbProvider.Provider>
    )
}

export default BreadcrumbContext