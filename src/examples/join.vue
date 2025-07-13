<template>
  <div >

  </div>
</template>

<script>
import { leftJoin, rightJoin,innerJoin,fullJoin } from '@/utils/join'
export default {
  components: {
  },
  props: {

  },
  data() {
    return {
    }
  },
  computed: {
  },
  mounted() {
    // 使用示例
    const users = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ];

    const orders = [
      { id: 1,  userId: 1, amount: 100 },
      {  id: 2, userId: 2, amount: 200 },
      { id: 3, userId: 4, amount: 300 },
    ];

    // 测试不同 JOIN 类型的字段冲突处理
    console.log('LEFT JOIN:', leftJoin(users, orders, [{ leftKey: 'id', rightKey: 'userId' }]));
    console.log('RIGHT JOIN:', rightJoin(users, orders, [{ leftKey: 'id', rightKey: 'userId' }]));
    console.log('INNER JOIN:', innerJoin(users, orders, [{ leftKey: 'id', rightKey: 'userId' }]));
    console.log('FULL JOIN:', fullJoin(users, orders, [{ leftKey: 'id', rightKey: 'userId' }]));


    // 多键连接示例
    const employees = [
      { deptId: 1, empId: 101, name: 'Alice' },
      { deptId: 1, empId: 102, name: 'Bob' },
      { deptId: 2, empId: 201, name: 'Charlie' },
    ];

    const salaries = [
      { deptId: 1, empId: 101, salary: 50000 },
      { deptId: 1, empId: 102, salary: 60000 },
      { deptId: 3, empId: 201, salary: 70000 },
    ];

    // 多键连接：按 deptId 和 empId 连接
    console.log('MULTI KEY INNER JOIN:', innerJoin(employees, salaries, [{ leftKey:'deptId', rightKey: 'deptId' }, { leftKey:'empId', rightKey: 'empId' }]));
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
