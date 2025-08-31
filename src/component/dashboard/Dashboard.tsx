import React from 'react'
import GlassyTable from '../common/GlassyTable'
import { columns } from './columns'

function Dashboard() {
  return (
    <div>
      <GlassyTable columns={columns}/>
    </div>
  )
}

export default Dashboard