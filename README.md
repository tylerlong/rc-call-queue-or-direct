# RingCentral call queue or direct?

When I get a phone call, how can I tell that it's from the call queue or a direct call?



## Subscription

```ts
await webSocketExtension.subscribe(['/restapi/v1.0/account/~/extension/~/telephony/sessions'], (event) => {
  console.log(JSON.stringify(event, null, 2));
});
```


## direct call notification

```json
{
  "uuid": "8145589842362645277",
  "event": "/restapi/v1.0/account/809646016/extension/62264425016/telephony/sessions",
  "timestamp": "2023-10-25T16:30:54.399Z",
  "subscriptionId": "8b15306f-0386-4f40-a560-0264a28a7225",
  "ownerId": "62264425016",
  "body": {
    "sequence": 3,
    "sessionId": "1160265700016",
    "telephonySessionId": "s-a0d17930c96bdz18b67acb764z37759330000",
    "serverId": "10.13.23.147.TAM",
    "eventTime": "2023-10-25T16:30:54.361Z",
    "parties": [
      {
        "accountId": "809646016",
        "extensionId": "62264425016",
        "id": "p-a0d17930c96bdz18b67acb764z37759330000-2",
        "direction": "Inbound",
        "to": {
          "phoneNumber": "+16504223279",
          "name": "Test User",
          "extensionId": "62264425016"
        },
        "from": {
          "phoneNumber": "+16504888888"
        },
        "status": {
          "code": "Setup",
          "rcc": false
        },
        "park": {},
        "missedCall": false,
        "standAlone": false,
        "muted": false
      }
    ],
    "origin": {
      "type": "Call"
    }
  }
}
```


## call queue call notification

```json
{
  "uuid": "902644045286934626",
  "event": "/restapi/v1.0/account/809646016/extension/62264425016/telephony/sessions",
  "timestamp": "2023-10-25T16:34:04.373Z",
  "subscriptionId": "72ec1f81-4864-40b4-951b-48f343897027",
  "ownerId": "62264425016",
  "body": {
    "sequence": 7,
    "sessionId": "1160271560016",
    "telephonySessionId": "s-a0d17e3226ac5z18b67af8d17z38176bd0000",
    "serverId": "10.13.23.227.TAM",
    "eventTime": "2023-10-25T16:34:04.300Z",
    "parties": [
      {
        "accountId": "809646016",
        "extensionId": "62264425016",
        "id": "p-a0d17e3226ac5z18b67af8d17z38176bd0000-3",
        "direction": "Inbound",
        "to": {
          "phoneNumber": "+12092271475",
          "name": "Tyler's call queue",
          "extensionId": "62282928016"
        },
        "from": {
          "phoneNumber": "+16504888888",
          "name": "Tyler's call queue - WIRELESS CALLER"
        },
        "status": {
          "code": "Proceeding",
          "rcc": false
        },
        "queueCall": true,
        "park": {},
        "missedCall": false,
        "standAlone": false,
        "muted": false,
        "uiCallInfo": {
          "primary": {
            "type": "QueueName",
            "value": "Tyler's call queue"
          },
          "additional": {
            "type": "CallerIdName",
            "value": "WIRELESS CALLER"
          }
        }
      }
    ],
    "origin": {
      "type": "Call"
    }
  }
}
```

## conclusion

You may check `body.parties[0].to.extensionId` to see if it's a call queue call or a direct call. If it's a call queue call, the value is the call queue extension id. If it's a direct call, the value is the callee's extension id.
