const fn = require('./functions')
module.exports = module.exports.default = ({
  bind(tr, binding, vnode) {
    let { sortColumn, defaultSort, sortDirection } = tr.dataset

    Object.assign(tr.dataset, {
      sortDirection: sortDirection || 1,
      sortColumn: sortColumn || defaultSort || null,
      defaultSort: defaultSort || null
    })

    for(let th of tr.children) {
      fn.init(th)
        .addEventListener('click', () => {
          fn.syncDatasets(th)
          fn.syncIcons(th)
          vnode.context[binding.expression] = fn.doSort(th.parentNode, vnode.context[binding.expression])
          let { sortDirection: direction, sortColumn: column } = th.parentNode.dataset
          vnode.context.$emit('table-sorted', { column, direction })

          return true
        })
    }
  }
})