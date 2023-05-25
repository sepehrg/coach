const workerFetch = ({ method = 'GET', url = '', data = {}, token, label, value, eventName }) => {
  fetch(url, {
    method, // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      Accept: 'application/json, multipart/form-data',
      'Access-Control-Allow-Origin': '*',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      Authorization: `Bearer ${token}`,
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  })
    .then(({ data }) => {
      const newData = { ...data, label, value };
      self.postMessage({ cmd: eventName, success: true, data: newData });
    })
    .catch((error) => {
      self.postMessage({ cmd: eventName, success: false, data: error });
    });
};

onmessage = function (e) {
  // settimer

  // send request to get ido properties
  workerFetch({
    method: 'get',
    url: 'https://educoach-be.staging.educoachapp.de/study-card-sets/library/overview',
    token: e.data[0],
    label: e.data[1],
    value: e.data[2],
    eventName: 'webworker_request',
  });

  // console.log('Message received from main script')
  // let workerResult = 'Result: ' + e.data[0]
  // let workerResult = data
  // console.log('Posting message back to main script')
  // postMessage(workerResult)

  // also do here timeouts etc. or create separate workers later
};
