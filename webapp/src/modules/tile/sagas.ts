import { takeEvery, call, put } from 'redux-saga/effects'
import { Atlas, AtlasTile } from '@kmon/ui'
import { ATLAS_SERVER_URL } from '../../modules/vendor/decentraland'
import {
  FETCH_TILES_REQUEST,
  FetchTilesRequestAction,
  fetchTilesSuccess,
  fetchTilesFailure
} from './actions'
import {
  ConnectWalletSuccessAction,
  CONNECT_WALLET_SUCCESS
} from '@kmon/dapps/dist/modules/wallet/actions'
import { fetchNFTsRequest } from '../nft/actions'
import { VendorName } from '../vendor'
import { View } from '../ui/types'

export function* tileSaga() {
  yield takeEvery(FETCH_TILES_REQUEST, handleFetchTilesRequest)
  yield takeEvery(CONNECT_WALLET_SUCCESS, handleConnectWalletSuccess)
}

function* handleFetchTilesRequest(_action: FetchTilesRequestAction) {
  try {
    const tiles: Record<string, AtlasTile> = yield call(() =>
      Atlas.fetchTiles(ATLAS_SERVER_URL + '/v1/tiles')
    )
    yield put(fetchTilesSuccess(tiles))
  } catch (error) {
    // @ts-ignore
    yield put(fetchTilesFailure(error.message))
  }
}

function* handleConnectWalletSuccess(action: ConnectWalletSuccessAction) {
  yield put(
    fetchNFTsRequest({
      vendor: VendorName.KRYPTOMON,
      view: View.ATLAS,
      params: {
        first: 1000,
        skip: 0,
        address: action.payload.wallet.address.toLowerCase()
      },
      filters: {
        // isLand: true
      }
    })
  )
}
