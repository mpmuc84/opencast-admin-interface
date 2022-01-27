/**
 * This file contains all redux actions that can be executed on series
 */

// Constants of actions types for fetching series from server
export const LOAD_SERIES_IN_PROGRESS = 'LOAD_SERIES_IN_PROGRESS';
export const LOAD_SERIES_SUCCESS = 'LOAD_SERIES_SUCCESS';
export const LOAD_SERIES_FAILURE = 'LOAD_SERIES_FAILURE';

// Constant of actions types affecting UI
export const SHOW_ACTIONS = 'SHOW_ACTIONS';

// Constants of action types affecting fetching of series metadata from server
export const LOAD_SERIES_METADATA_IN_PROGRESS = 'LOAD_SERIES_METADATA_IN_PROGRESS';
export const LOAD_SERIES_METADATA_SUCCESS = 'LOAD_SERIES_METADATA_SUCCESS';
export const LOAD_SERIES_METADATA_FAILURE = 'LOAD_SERIES_METADATA_FAILURE';

// Constants of action types affecting fetching of series themes from server
export const LOAD_SERIES_THEMES_IN_PROGRESS = 'LOAD_SERIES_THEMES_IN_PROGRESS';
export const LOAD_SERIES_THEMES_SUCCESS = 'LOAD_SERIES_THEMES_SUCCESS';
export const LOAD_SERIES_THEMES_FAILURE = 'LOAD_SERIES_THEMES_FAILURE';

// Actions affecting fetching series from server

export const loadSeriesInProgress = () => ({
    type: LOAD_SERIES_IN_PROGRESS
});

export const loadSeriesSuccess = series => ({
    type: LOAD_SERIES_SUCCESS,
    payload: { series }
});


export const loadSeriesFailure = () => ({
    type: LOAD_SERIES_FAILURE
});

// Actions affecting UI

export const showActions = isShowing => ({
    type: SHOW_ACTIONS,
    payload: { isShowing }
});

// Actions affecting fetching of series metadata from server

export const loadSeriesMetadataInProgress = () => ({
    type: LOAD_SERIES_IN_PROGRESS
});

export const loadSeriesMetadataSuccess = metadata => ({
    type: LOAD_SERIES_METADATA_SUCCESS,
    payload: { metadata }
});

export const loadSeriesMetadataFailure = () => ({
    type: LOAD_SERIES_METADATA_FAILURE
});

// Actions affecting fetching of series themes from server

export const loadSeriesThemesInProgress = () => ({
    type: LOAD_SERIES_THEMES_IN_PROGRESS
});

export const loadSeriesThemesSuccess = themes => ({
    type: LOAD_SERIES_THEMES_SUCCESS,
    payload: { themes }
});

export const loadSeriesThemesFailure = () => ({
    type: LOAD_SERIES_THEMES_FAILURE
});