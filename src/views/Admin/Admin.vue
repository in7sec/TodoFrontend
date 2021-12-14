<template>
  <section class="container">
    <h1 class="display-5 font-weight-bold">Admin Panel</h1>
    <button @click="register" class="btn btn-primary" style="margin-top: 15px"> Add new user </button>
      <table class="table table-bordered" style="margin-top: 10px">
        <thead>
        <th> User </th>
        <th> isAdmin </th>
        <th> Actions </th>
        </thead>
        <tbody>
        <tr v-for="user in allUsers" :key="user.id">
          <td> {{ user.name }} </td>
          <td> {{ user.isAdmin }} </td>
          <td>
            <button class="btn btn-primary" style="margin-right: 20px" @click="updateUser(user)"> Edit </button>
            <button class="btn btn-secondary" style="margin-left: 5px" @click="createTodo(user)"> Create task </button>
            <button class="btn btn-secondary" style="margin-left: 5px" v-on:click="isHidden = !isHidden" @click="showTodos(user)"> Show Todos </button>
            <button class="btn btn-danger" style="margin-right: 20px; float:right" @click="delUser(user)"> Delete </button>
          </td>
        </tr>
        </tbody>
      </table>

    <div>
      <table class="table table-bordered" v-if="!isHidden">
        <thead>
        <th> Task </th>
        <th> End-Date </th>
        <th> Status </th>
        </thead>
        <tbody>
        <tr v-for="task in userTodos" :key="task.id">
            <td> {{ task.task }} </td>
            <td> {{ task.date }} </td>
            <td> {{ task.status }} </td>
        </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Admin.vue",

  data() {
    return {
      isHidden: true,
      UserID: null,
    };
  },

  computed:{
    ...mapGetters(["allUsers"]),
    ...mapGetters(["userTodos"]),
  } ,

  created() {
    if (localStorage.getItem("token")) {
      this.fetchAdminData();
    }
  },

  methods: {
    ...mapActions(["fetchAdminData","postRegisterRequest","deleteUser","fetchUserTodo"]),

    register: function() {
      this.$router.push({name: "AdminStore"})
    },

    delUser(user) {
      if(confirm("Do you really want to delete user: "+user.name)) {
        this.deleteUser(user);
      }
    },

    updateUser: function(user){
      this.$router.push({name: "AdminEdit", params:{id: user.id}})
    },

    createTodo(user) {
      this.$router.push({name: "AdminTodo", params:{id: user.id}})
    },

    showTodos(user) {

      if (this.isHidden === true)
      {
        if (this.UserID === user.id)
        {
          this.isHidden= true;
        }
        else {
          this.fetchUserTodo(user.id);
          this.UserID = user.id;
          this.isHidden= false;
        }
      }

      this.fetchUserTodo(user.id);
      this.UserID = user.id;
    }

  },
}
</script>

<style scoped>

</style>