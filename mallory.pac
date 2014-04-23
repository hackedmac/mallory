// proxy auto-config template

var direct = 'DIRECT';
var http_proxy = 'PROXY 127.0.0.1:18087; DIRECT';

var domains =
{
  "twitter.com":  true,
};

// host can override domains
var hosts =
{
  "github.global.ssl.fastly.net": true,
};


function host2domain(host) {
  var dotpos = host.lastIndexOf(".");
  if (dotpos === -1)
    return host;
  // Find the second last dot
  dotpos = host.lastIndexOf(".", dotpos - 1);
  if (dotpos === -1)
    return host;
  return host.substring(dotpos + 1);
};

function FindProxyForURL(url, host) {
  var q = hosts[host];
  if( q === true ) return http_proxy;
  else if( q === false ) return direct;
  
  return domains[host2domain(host)] ? http_proxy : direct;
};
