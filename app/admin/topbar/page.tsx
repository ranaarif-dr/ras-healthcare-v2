import React from 'react'
import TopbarCustomizer from '../_components/TopBarCustomizer'
import { getSettings } from '@/actions/settings.actions'

const TopBar = async() => {
const settings = await getSettings()
  return (
    <div>
        <TopbarCustomizer settings={settings} />
    </div>
  )
}

export default TopBar
