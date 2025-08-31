import React from 'react'
import GlassyTable from '../common/GlassyTable'
import { columns } from './columns'
import { seedData } from '@/utils/globalUtils'

function Dashboard() {
  return (
    <div>
      <GlassyTable 
        columns={columns}
        tableData={seedData}
        />
    </div>
  )
}

export default Dashboard