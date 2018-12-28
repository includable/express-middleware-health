/*
 * Copyright 2018 Includable
 * Created by Thomas Schoffelen
 */

const stats = {responses: [], requests: 0}

const avg = (array) => {
  let sum = 0
  for (let i = array.length - 1; i >= 0; i--) {
    sum = sum + parseInt(array[i], 10)
  }
  return Math.round(array.length ? sum / array.length : 0)
}

module.exports = () => {
  return (req, res, next) => {
    if (req.url === '/health') {
      res.json({
        status: 200,
        friendlyName: 'OK',
        environment: process.env.NODE_ENV || 'dev',
        uptime: Math.round(process.uptime()),
        requests: stats.requests,
        responseTime: avg(stats.responses) / 1000
      })
      return
    }

    const startAt = process.hrtime()
    res.on('finish', () => {
      const diff = process.hrtime(startAt)
      const time = diff[0] * 1e3 + diff[1] * 1e-6
      if (stats.responses.length >= 100) {
        stats.responses.shift()
      }
      stats.responses.push(time)
      stats.requests++
    })
    return next()
  }
}
