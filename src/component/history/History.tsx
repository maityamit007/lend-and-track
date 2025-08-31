import React from 'react'
import GlassyTable from '../common/GlassyTable'
import { columns } from './column'
import { historyData } from '@/utils/globalUtils'

function History() {
    return (
        <div>
            <GlassyTable
                tableData={historyData}
                columns={columns} />
        </div>
    )
}

export default History