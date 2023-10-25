import RingCentral from '@rc-ex/core';
import WebSocketExtension from '@rc-ex/ws';
import waitFor from 'wait-for-async';

const rc = new RingCentral({
  server: process.env.RINGCENTRAL_SERVER_URL,
  clientId: process.env.RINGCENTRAL_CLIENT_ID,
  clientSecret: process.env.RINGCENTRAL_CLIENT_SECRET,
});

const webSocketExtension = new WebSocketExtension();

const main = async () => {
  await rc.authorize({ jwt: process.env.RINGCENTRAL_JWT_TOKEN! });
  await rc.installExtension(webSocketExtension);
  await webSocketExtension.subscribe(['/restapi/v1.0/account/~/extension/~/telephony/sessions'], (event) => {
    console.log(JSON.stringify(event, null, 2));
  });
  await waitFor({ interval: 100000000 });
};
main();
