export const GET_IS_URL_BLOCKED_FOR_IFRAME_REQUEST = 'GET_IS_URL_BLOCKED_FOR_IFRAME_REQUEST';
export const GET_IS_URL_BLOCKED_FOR_IFRAME_SUCCESS = 'GET_IS_URL_BLOCKED_FOR_IFRAME_SUCCESS';

export interface MaterialFrameState {
  isUrlBlockedForIFrame: { [url: string]: boolean };
}

export interface GetIsUrlBlockedForIFrameRequest {
  type: typeof GET_IS_URL_BLOCKED_FOR_IFRAME_REQUEST;
  url: string;
}

export interface GetIsUrlBlockedForIFrameSuccess {
  type: typeof GET_IS_URL_BLOCKED_FOR_IFRAME_SUCCESS;
  url: string;
  result: boolean;
}

export type MaterialFrameActionsType =
  | GetIsUrlBlockedForIFrameRequest
  | GetIsUrlBlockedForIFrameSuccess;
