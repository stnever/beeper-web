import {Model, HttpError} from './Model'

const Source  = new Model('api/sources')
const Beep    = new Model('api/beeps')
const Tag     = new Model('api/tags')
const Account = new Model('api/accounts', 'code')

export {
  Model, HttpError, Source, Beep, Tag, Account
}
