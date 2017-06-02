/* @flow */
import { List, Map, fromJS } from 'immutable';

import {
  CHANGESETS_PAGE_FETCHED,
  CHANGESETS_PAGE_CHANGE,
  CHANGESETS_PAGE_LOADING,
  CHANGESETS_PAGE_ERROR,
  FILTERS_SET
} from './changesets_page_actions';

export type ChangesetsPageType = Map<
  'pages' | 'pageIndex' | 'loading' | 'error' | 'filters',
  any
>;

const changesetsInitial: ChangesetsPageType = fromJS({
  pageIndex: 0,
  pages: new List(),
  loading: false,
  error: null
});

export function changesetsPageReducer(
  state: ChangesetsPageType = changesetsInitial,
  action: Object
): ChangesetsPageType {
  switch (action.type) {
    case FILTERS_SET: {
      return state.set('filters', action.filters);
    }
    case CHANGESETS_PAGE_LOADING: {
      return state
        .set('pageIndex', action.pageIndex)
        .set('loading', true)
        .set('error', null);
    }
    case CHANGESETS_PAGE_FETCHED: {
      const pages = state.get('pages').set(action.pageIndex, action.data);
      return state
        .set('pages', pages)
        .set('pageIndex', action.pageIndex)
        .set('loading', false)
        .set('error', null);
    }
    case CHANGESETS_PAGE_CHANGE: {
      const pages = state.get('pages');
      return state
        .set('pageIndex', action.pageIndex)
        .set('loading', false)
        .set('error', null);
    }
    case CHANGESETS_PAGE_ERROR: {
      return state
        .set('pageIndex', action.pageIndex)
        .set('loading', false)
        .set('error', action.error);
    }
    default: {
      return state;
    }
  }
}