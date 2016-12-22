import _ from 'lodash'

function join(b, p) {
  if ( b == null || b.length < 1 ) return p
  if ( p == null ) return b
  if ( p[0] == '/' ) return b + p
  else return b + '/' + p
}

function toQueryString(obj) {
  if ( obj == null ) return ''
  var enc = encodeURIComponent

  return _.chain(Object.keys(obj)).map(function(k) {
    if ( obj[k] == null || obj[k].length < 1 ) return null
    return `${enc(k)}=${enc(obj[k])}`
  }).compact().value().join('&')
}

let defaults = {
  token: null,
  base: null,
  errorHandler: null
}

class HttpError extends Error {
  constructor(res) {
    var msg = 'Bad response: HTTP ' + res.status
    super(msg)
    this.message = msg
    this.name = 'HttpError'
    this.response = res
    this.status = res.status
  }
}

function go(method, endpoint, params) {
  var path = join(defaults.base, endpoint)

  var opts = {
    method: method.toUpperCase(),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  if ( defaults.token )
    opts.headers.access_token = defaults.token

  if ( opts.method == 'GET' || opts.method == 'DELETE' ) {
    if ( params != null ) path += '?' + toQueryString(params)
  } else {
    if ( params != null ) opts.body = JSON.stringify(params)
  }

  return fetch(path, opts).then(function(res) {
    if ( !res.ok ) throw new HttpError(res)
    return res.json()
  }).catch(function(err) {
    if ( defaults.errorHandler ) defaults.errorHandler(err)
    else console.log(err)
  })
}

class Model {
  static setDefaults(defs) {
    console.log('setting defaults', defs)
    defaults = defs
  }

  constructor(endpoint, idProp) {
    this.endpoint = endpoint
    this.idProp = idProp || 'id'
  }

  findById(id) { return go('get', join(this.endpoint, id) ) }

  findAll(params) { return go('get', this.endpoint, params) }

  save(body) {
    var id = body[this.idProp]
    if ( id == null ) return go('post', this.endpoint, body)
    else return go('put', join(this.endpoint, id), body)
  }

  delete(objOrId) {
    if ( objOrId == null ) throw new Error('Missing id')
    var id = objOrId[this.idProp] || objOrId
    return go('delete', join(this.endpoint, id))
  }

  patch(id, body) {
    var where = {}
    where[this.idProp] = id
    return go('patch', this.endpoint, {where: where, set: body})
  }
}

export { HttpError, Model }
