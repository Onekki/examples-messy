import remote from '@/api/from/remote'

function PAGE_VIEW (queryModel) {
  return remote({
    url: '/blog/article/pageView',
    params: queryModel
  })
}

function SAVE (articleModel) {
  return remote({
    url: '/blog/article/save',
    method: 'post',
    data: articleModel
  })
}

function UPDATE (articleModel) {
  return remote({
    url: '/blog/article/update',
    method: 'post',
    data: articleModel
  })
}

export default {
  PAGE_VIEW: PAGE_VIEW,
  SAVE: SAVE,
  UPDATE: UPDATE
}
