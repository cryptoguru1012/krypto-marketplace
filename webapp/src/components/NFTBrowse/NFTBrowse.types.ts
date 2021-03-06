import { Dispatch } from 'redux'

import { View } from '../../modules/ui/types'
import { VendorName } from '../../modules/vendor/types'
import { setView, SetViewAction } from '../../modules/ui/actions'
import {
  browseNFTs,
  BrowseNFTsAction,
  fetchNFTsFromRoute,
  FetchNFTsFromRouteAction
} from '../../modules/routing/actions'

export type Props = {
  vendor: VendorName
  view: View
  viewInState?: View // This is used to know when the view prop has been set in the app state
  address?: string
  isMap?: boolean
  isFullscreen?: boolean
  isLoading: boolean
  onSetView: typeof setView
  onFetchNFTsFromRoute: typeof fetchNFTsFromRoute
  onBrowse: typeof browseNFTs
  onlyOnSale?: boolean
  pathname: string
}

export type MapStateProps = Pick<
  Props,
  | 'isMap'
  | 'isLoading'
  | 'onlyOnSale'
  | 'isFullscreen'
  | 'viewInState'
  | 'pathname'
>
export type MapDispatchProps = Pick<
  Props,
  'onSetView' | 'onFetchNFTsFromRoute' | 'onBrowse'
>
export type MapDispatch = Dispatch<
  SetViewAction | FetchNFTsFromRouteAction | BrowseNFTsAction
>
export type OwnProps = Pick<Props, 'vendor' | 'address'>
