import React, { useContext } from 'react'
import Dashboard from './dashboard/Dashboard'
import { BreadcrumbProvider } from '@/context/context';
import History from './history/History';
import { Breadcrumb } from './common/BreadCrumb';

function LATHome() {
    let { breadCrumbState } = useContext(BreadcrumbProvider);
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
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
            <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-[28rem] w-[28rem] rounded-full bg-cyan-400/20 blur-3xl" />
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-soft-light"
                style={{
                    backgroundImage:
                        'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" viewBox="0 0 140 140"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="2"/></filter><rect width="100%" height="100%" filter="url(%23n)" opacity="0.35"/></svg>\')',
                }}
            />

            <div className="mx-auto max-w-6xl px-4 py-16">
                <div
                    //   initial={{ opacity: 0, y: 20 }}
                    //   animate={{ opacity: 1, y: 0 }}
                    //   transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mb-8 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between"
                >
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white drop-shadow-sm">
                            Lend And Track
                        </h1>
                        <div className="mt-4 text-slate-300/90">
                        <Breadcrumb items={['Dashboard', 'History']} />
                        </div>

                    </div>

                </div>
                {renderComponent()}
            </div>
        </div>
    )
}

export default LATHome