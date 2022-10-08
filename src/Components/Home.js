import React from 'react'
import BusItems from './BusItems'
import SearchBus from './SearchBus'

export default function Home() {
  return (
    <div>
      <SearchBus />
      <BusItems/>
    </div>
  )
}
