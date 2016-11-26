# v-sortable-data
a vue directive for sorting tables using data attributes

# example

### js
```script
// commonjs
const sortable = require('v-sortable-data')
//browser
const sortable = window.vSortable

new Vue({
  directives: { sortable },
  data: {
    tableData: [
      { name: 'bill', age: 28, dob: new Date('11/1/1988') },
      { name: 'frank', age: 30, dob: new Date('10/13/1986') },
      { name: 'steve', age: 23, dob: new Date('3/12/1993') }
    ]
  }
})
```
### html
```script
<table>
  <thead>
    <tr v-sortable="tableData">
      <th data-column="name">Name</th>
      <th data-column="dob">Birthday</th>
      <th data-column="age">Age</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="person in tableData">
      <td>{{person.name}}</td>
      <td>{{person.dob}}</td>
      <td>{{person.age}}</td>
    </tr>
  </tbody>
 </table>
```
