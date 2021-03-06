import * as React from 'react'
import { Address } from 'web3x-es/address'
import { Row, Section, Header } from '@kmon/ui'
import { Profile } from '@kmon/dapps/dist/containers'
import { t } from '@kmon/dapps/dist/modules/translation/utils'
import { Coordinate } from '../../Coordinate'
import { CoinPopup } from '../../CoinPopup'
import { Props } from './Popup.types'
import './Popup.css'

export default class Popup extends React.PureComponent<Props> {
  render() {
    const { x, y, visible, tile, position } = this.props
    const isEstate = !!tile.estate_id
    return (
      <div
        className={`AtlasPopup ${position} ${tile.owner ? 'has-owner' : 'no-owner'
          }`}
        style={{ top: y, left: x, opacity: visible ? 1 : 0 }}
      >
        <Section className="land-name">
          <Row className="name-row">
            <span className="name">
              {tile.name ||
                (!isEstate ? t('global.parcel') : t('global.estate'))}
            </span>
            <Coordinate className="coordinates" x={tile.x} y={tile.y} />
          </Row>
        </Section>

        <Section className="owner">
          <Header sub>{t('nft_page.owner')}</Header>
          <Profile
            address={tile.owner || Address.ZERO.toString()}
            debounce={500}
          />
        </Section>

        {tile.price ? (
          <Section className="price">
            <Header sub>{t('nft_page.price')}</Header>
            <CoinPopup>{tile.price.toLocaleString()}</CoinPopup>
          </Section>
        ) : null}
      </div>
    )
  }
}
