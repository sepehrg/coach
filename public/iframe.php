<?php

header('X-Frame-Options: SAMEORIGIN');
$url = $_GET['url'];
$base_url = parse_url($url, PHP_URL_SCHEME).'://'.parse_url($url, PHP_URL_HOST);
$site = file_get_contents($url);
$site = str_replace('</head>', '<base href="'.$base_url.'"></head>', $site);
$site = str_replace('"/assets/', '"'.$base_url.'/assets/', $site);
$site = str_replace('"/_assets/', '"'.$base_url.'/_assets/', $site);
$site = str_replace('"/_next/', '"'.$base_url.'/_next/', $site);
echo $site;