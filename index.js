;(function () {
  const directive = ({
    bind(tr, binding, vnode) {
      let { sortColumn, defaultSort, sortDirection } = tr.dataset

      Object.assign(tr.dataset, {
        sortDirection: sortDirection || 1,
        sortColumn: sortColumn || defaultSort || null,
        defaultSort: defaultSort || null
      })

      for (let th of tr.children) {
        init(th)
          .addEventListener('click', () => {
            syncDatasets(th)
            syncIcons(th)
            vnode.context[binding.expression] = doSort(th.parentNode, vnode.context[binding.expression])
            let { sortDirection: direction, sortColumn: column } = th.parentNode.dataset
            vnode.context.$emit('table-sorted', { column, direction})

            return true
          })
      }
    }
  })

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = directive
  } else {
    window.vSortable = directive
  }

  function syncDatasets (th) {
    let tr = th.parentNode
    if (tr.dataset.sortColumn === th.dataset.column) {
      tr.dataset.sortDirection = -1 * Number(tr.dataset.sortDirection) || 1
    } else {
      tr.dataset.sortColumn = th.dataset.column
      tr.dataset.sortDirection = 1
    }
  }
  function init (th) {
    th.style.cursor = 'pointer'
    th.classList.add('is-unselectable')
    syncDatasets(th)
    return th
  }
  function createSortIconElement () {
    let itag = document.createElement('i')
    itag.className = 'fa fa-sort'
    return itag
  }
  function syncIcons (el) {
    let tr = el.tagName === 'TR' ? el : el.parentNode
    if (tr.tagName !== 'TR') return false

    let dataset = tr.dataset
    let sortedIconClass = 'i.fa.fa-sort'
    let sortedColumnClass = 'is-sorted'
    for (let col of tr.children) {
      if (col.dataset.column === dataset.sortColumn) {
        col.classList.add(sortedColumnClass)
        if (!col.querySelector(sortedIconClass)) {
          col.prepend(createSortIconElement())
        }
      }else {
        col.classList.remove(sortedColumnClass)
        let itag = col.querySelector(sortedIconClass)
        if (itag) col.removeChild(itag)
      }
    }
  }
  function doSort (tr, array) {
    let dataset = tr.dataset
    if (!dataset.sortColumn) dataset.sortColumn = dataset.defaultSort
    let sortKey = dataset.sortColumn
    let sortDirection = Number(dataset.sortDirection)
    return array.slice(0).sort((a, b) => {
      let aval = parse(a[sortKey])
      let bval = parse(b[sortKey])

      if (sortDirection >= 0) {
        if (aval > bval) return 1
        if (aval < bval) return -1
        else return 0
      } else {
        if (aval > bval) return -1
        if (aval < bval) return 1
        else return 0
      }
    })
  }

  function parse (val) {
    return typeof val === 'string'
      ? val.toUpperCase()
      : val
  }
})()
