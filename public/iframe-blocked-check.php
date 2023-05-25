<?php

$url = $_GET['url'];
stream_context_set_default(
    array(
        'http' => array(
            'method' => 'HEAD'
        )
    )
);
$headers = get_headers($url, true);

$xFrameOptions = array_key_exists('X-Frame-Options', $headers) ? $headers['X-Frame-Options']
	: (array_key_exists('X-FRAME-OPTIONS', $headers) ? $headers['X-FRAME-OPTIONS']
	: (array_key_exists('x-frame-options', $headers) ? $headers['x-frame-options'] : ''));
$contentSecurityPolicy = array_key_exists('Content-Security-Policy', $headers) ? $headers['Content-Security-Policy']
: (array_key_exists('CONTENT-SECURITY-POLICY', $headers) ? $headers['CONTENT-SECURITY-POLICY']
: (array_key_exists('content-security-policy', $headers) ? $headers['content-security-policy'] : ''));

if (is_array($xFrameOptions)) {
  foreach ($xFrameOptions as $key => $value) {
    if (str_starts_with($key, 'allow-from') || str_starts_with($key, 'deny') || str_starts_with($key, 'sameorigin') || strtolower($value) == 'sameorigin' || strtolower($value) == 'deny') {
      $xFrameOptions = $value;
      break;
    }
  }
  if (is_array($xFrameOptions)) {
    $xFrameOptions = '';
  }
}

$xFrameOptions = strtolower($xFrameOptions);
$contentSecurityPolicy = strtolower($contentSecurityPolicy);

echo $xFrameOptions == 'deny' || $xFrameOptions == 'sameorigin' || str_starts_with($xFrameOptions, 'allow-from') || $contentSecurityPolicy == 'frame-ancestors \'none\'' ? 'true' : 'false';
