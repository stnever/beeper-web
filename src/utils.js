import _ from 'lodash'
import moment from 'moment'

export function isSame(a, b) {
  return moment(a).utcOffset('-03:00')
    .isSame(moment(b).utcOffset('-03:00'), 'day');
}

export function groupByDay(items) {
  items = items || []
  var result = []
  items.forEach(function(i) {
    var last = _.last(result);
    if ( last == null || !isSame(i.timestamp, last.timestamp) ) {
      last = {timestamp: i.timestamp, items: [i]}
      result.push(last);
    } else {
      last.items.push(i)
    }
  })
  return result;
}

export function s2a(s) {
  if ( s == null ) return null
  if ( _.isArray(s) ) return s
  if ( s.trim().length < 1 ) return null
  return s.split(',').map( p => p.trim() )
}
