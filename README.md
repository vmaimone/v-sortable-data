# v-sortable-data
a vue directive for sorting tables using data attributes


# example

### js
```script
const sortable = require('v-sortable-data')
new Vue({
  directives: { sortable },
  data: {
    tableData: [
      { name: 'bill', age: 27, dob: new Date('11/1/1988') },
      { name: 'bob', age: 29, dob: new Date('11/1/1986') }
    ]
  }
})
```
### html
```script
<thead>
  <tr v-sortable="tableData">
    <th data-column="name">Name</th>
    <th data-column="db">Birthday</th>
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
```
