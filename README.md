# middleware-health

This package adds a `/health` endpoint that can be used for status checks and lists some request metrics:

```json
{
  "status": 200,
  "friendlyName": "OK",
  "environment": "production",
  "uptime": 80374,
  "requests": 208,
  "responseTime": 0.001
}
```

## Installation

```sh
npm i @includable/middleware-health
```

## Usage

```js
const express = require('express')
const health = require('@includable/middleware-health')

app.use(health())

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ${port}!`)
})
```
