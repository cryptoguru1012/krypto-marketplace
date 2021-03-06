import React from 'react'
import { Header } from '@kmon/ui'
import { t } from '@kmon/dapps/dist/modules/translation/utils'
import { Props } from './Description.types'
import './Description.css'

const Description = (props: Props) => {
  return props.text ? (
    <div className="Description">
      <Header sub>{t('nft_page.description')}</Header>
      <div className="description-text">{props.text}</div>
    </div>
  ) : null
}

export default React.memo(Description)
