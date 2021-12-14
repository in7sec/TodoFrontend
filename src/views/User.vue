<template>
  <section class="container">
    <h1 class="display-5 font-weight-bold">To Do list</h1>
      <table class="table table-bordered" style="margin-top: 15px">
        <thead>
        <th> Task </th>
        <th> End-Date </th>
        <th> Status </th>
        <th> Action </th>
        </thead>
        <tbody>
        <tr v-for="task in allTasks" :key="task.id">
          <td> {{ task.task }} </td>
          <td> {{ task.date }} </td>
          <td> {{ task.status }} </td>
          <td> <button @click="onClick(task)" class="btn btn-primary"> Change status </button> </td>
        </tr>
        </tbody>
      </table>
  </section>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {

  computed:{
    ...mapGetters(["allTasks"]),
  },

  created() {
    if (localStorage.getItem("token")) {
      this.fetchTaskData();
    }
  },

  methods: {
    ...mapActions(["fetchTaskData", "updateTaskStatus"]),

    onClick(task) {

      let updateTodo = {
        id: task.id,
        status: task.status
      };

      switch(task.status) {
        case "to do":
          updateTodo = {
            id: task.id,
            status: task.status = "in progress"
          }
          break;
          case "in progress":
            updateTodo = {
              id: task.id,
              status: task.status = "done"
            }
            break;
            case "done":
              updateTodo = {
                id: task.id,
                status: task.status = "to do"
              }
              break;
      }

      this.updateTaskStatus(updateTodo);
      }
    }
}
</script>