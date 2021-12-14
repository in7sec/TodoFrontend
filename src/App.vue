<template>
    <ul>
      <li class="nav-item" v-if="Object.keys(user).length === 0">
        <router-link to="/login">Login</router-link>
      </li>
      <li class="nav-item" v-if="Object.keys(user).length === 0">
        <router-link to="/register">Register</router-link>
      </li>
      <li class="nav-item" v-if="Object.keys(user).length > 0">
        <router-link to="/user">To Do List</router-link>
      </li>
      <li class="nav-item" v-if="Object.keys(user).length > 0 && user.isAdmin === true">
        <router-link to="/admin">Admin Panel</router-link>
      </li>
      <li class="nav-item" style="float:right" v-if="Object.keys(user).length > 0">
        <router-link @click="logout" to="/">Logout</router-link>
      </li>
    </ul>

  <div class="container p">
    <router-view/>
  </div>

</template>

<script>
import {mapActions,mapGetters} from "vuex";
import axios from "axios";

export default {
  computed: {
    ...mapGetters(["user"]),
  },
  created() {
    let token = JSON.parse( localStorage.getItem('token') );
    if( token ){
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }
    if (localStorage.getItem("token")) {
      this.fetchUserData();
    }
  },
  methods: {
    ...mapActions(["sendLogoutRequest", "fetchUserData"]),

    logout() {
      this.sendLogoutRequest();
      this.$router.push({ name: "Login" });
    }
  }
}
</script>

<style>
ul {
  list-style-type: none;
  margin: 0;
  padding: 9px;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  margin-left: 15px;
  padding: 14px 16px;
  text-decoration: none;
}

/* Change the link color to #111 (black) on hover */
li a:hover {
  background-color: #111;
  text-decoration: none;
}

.p {
  margin-top: 50px;
}


</style>
