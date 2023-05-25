import {
  GET_IS_URL_BLOCKED_FOR_IFRAME_REQUEST,
  GET_IS_URL_BLOCKED_FOR_IFRAME_SUCCESS,
  MaterialFrameActionsType,
} from './material-frame.types';

export const getIsUrlBlockedForIFrame = (url: string): MaterialFrameActionsType => ({
  type: GET_IS_URL_BLOCKED_FOR_IFRAME_REQUEST,
  url,
});

export const getIsUrlBlockedForIFrameSuccess = (
  url: string,
  result: boolean,
): MaterialFrameActionsType => ({
  type: GET_IS_URL_BLOCKED_FOR_IFRAME_SUCCESS,
  url,
  result,
});
