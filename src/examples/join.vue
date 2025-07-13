<template>
  <div >

  </div>
</template>

<script>
import { leftJoin, rightJoin,innerJoin,fullJoin, unions } from '@/utils/join'
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
    // console.log('LEFT JOIN:', leftJoin(users, orders, [{ leftKey: 'id', rightKey: 'userId' }]));
    // console.log('RIGHT JOIN:', rightJoin(users, orders, [{ leftKey: 'id', rightKey: 'userId' }]));
    // console.log('INNER JOIN:', innerJoin(users, orders, [{ leftKey: 'id', rightKey: 'userId' }]));
    // console.log('FULL JOIN:', fullJoin(users, orders, [{ leftKey: 'id', rightKey: 'userId' }]));


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
    // console.log('MULTI KEY INNER JOIN:', innerJoin(employees, salaries, [{ leftKey:'deptId', rightKey: 'deptId' }, { leftKey:'empId', rightKey: 'empId' }]));


    // 1. 字段完全一致
    const tableA = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ];
    const tableB = [
      { id: 3, name: 'Carol' },
      { id: 4, name: 'David' }
    ];

    // 2. 字段部分缺失
    const tableC = [
      { id: 5, age: 30 },
      { id: 6, name: 'Eve', age: 22 }
    ];

    // 3. 字段顺序不同
    const tableD = [
      { name: 'Frank', id: 7 },
      { name: 'Grace', id: 8 }
    ];

    // 4. 空表
    const tableE = [];

    // 5. 只有一行的表
    const tableF = [
      { id: 9, name: 'Henry', gender: 'M' }
    ];

    // 合并测试
    const result = unions([tableA, tableB, tableC, tableD, tableE, tableF]);

    console.log(result);
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
