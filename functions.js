exports.syncDatasets = function syncDatasets(th) {
  let tr = th.parentNode
  if (tr.dataset.sortColumn === th.dataset.column) {
    tr.dataset.sortDirection = -1*Number(tr.dataset.sortDirection) || 1
  } else {
    tr.dataset.sortColumn = th.dataset.column
    tr.dataset.sortDirection = 1
  }
}

exports.init = function init(th) {
  th.style.cursor = 'pointer'
  th.classList.add('is-unselectable')
  exports.syncDatasets(th)
  return th
}

exports.createSortIconElement = function createSortIconElement() {
  let itag = document.createElement('i')
  itag.className = 'fa fa-sort'
  return itag
}

exports.syncIcons = function syncIcons(el) {
  let tr = el.tagName === 'TR' ? el : el.parentNode
  if (tr.tagName !== 'TR') return false

  let dataset = tr.dataset
  let sortedIconClass = 'i.fa.fa-sort'
  let sortedColumnClass = 'is-sorted'
  for (let col of tr.children) {
    if (col.dataset.column === dataset.sortColumn) {
      col.classList.add(sortedColumnClass)
      if (!col.querySelector(sortedIconClass)) {
        col.prepend(exports.createSortIconElement())
      }
    }
    else {
      col.classList.remove(sortedColumnClass)
      let itag = col.querySelector(sortedIconClass)
      if(itag) col.removeChild(itag)
    }

  }
}

exports.doSort = function doSort(tr, array) {
  let dataset = tr.dataset
  if(!dataset.sortColumn) dataset.sortColumn = dataset.defaultSort
  let sortKey = dataset.sortColumn
  let sortDirection = Number(dataset.sortDirection)
  return array.slice(0).sort((a, b) => {
    let aval = typeof a[sortKey] === 'string' ? a[sortKey].toUpperCase() : a[sortKey]
    let bval = typeof b[sortKey] === 'string' ? b[sortKey].toUpperCase() : b[sortKey]
    if (sortDirection >= 0) {
      if(aval > bval) return 1
      if(aval < bval) return -1
      else return 0

    } else {
      if(aval > bval) return -1
      if(aval < bval) return 1
      else return 0
    }
  })
}