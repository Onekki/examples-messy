import remote from '@/api/from/remote'

function LIST_VIEW () {
  return remote({
    url: '/system/role/listView'
  })
}

function SAVE (roleModel) {
  return remote({
    url: '/system/role/save',
    method: 'post',
    data: roleModel
  })
}

function UPDATE (roleModel) {
  return remote({
    url: '/system/role/update',
    method: 'post',
    data: roleModel
  })
}

function REMOVE (id) {
  return remote({
    url: '/system/role/remove',
    params: {
      'id': id
    }
  })
}

export default {
  LIST_VIEW: LIST_VIEW,
  SAVE: SAVE,
  UPDATE: UPDATE,
  REMOVE: REMOVE
}
