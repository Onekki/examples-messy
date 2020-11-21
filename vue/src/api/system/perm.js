import remote from '@/api/from/remote'

function LIST_BY_SU () {
  return remote({
    url: '/system/perm/listBySU',
    method: 'post'
  })
}

function LIST_VIEW () {
  return remote({
    url: '/system/perm/listView'
  })
}

export default {
  LIST_BY_SU: LIST_BY_SU,
  LIST_VIEW: LIST_VIEW
}
