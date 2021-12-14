<template>
  <button class="btn btn-primary" @click="$router.go(-1)"> Cancel </button>
  <div v-for="user in allUsers" :key="user.id">
    <div v-if="user.id == this.$route.params.id">
      <div class="col-lg-6">
        <form style="margin-top:30px">
          <div>
            <label> Todo </label>
            <input type="text" v-model="user.name" class="form-control" :class="{ 'is-invalid': errors.description }" />
            <div class="invalid-feedback" v-if="errors.description">
              {{ errors.description[0] }}
            </div>
          </div>
          <div>
            <label> Date </label>
            <input type="date" v-model="createTask.date" class="form-control" :class="{ 'is-invalid': errors.date }" />
            <div class="invalid-feedback" v-if="errors.date">
              {{ errors.date[0] }}
            </div>
          </div>
          <br>
          <div class="form-group d-flex">
            <button type="button" @click="createTodo(user)" class="btn btn-primary w-25"> Add new ToDo </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      createTask: {
        id: null,
        description: null,
        date:  new Date().toISOString().slice(0, 10)
      },
    }
  },

  computed:{
    ...mapGetters(["allUsers", "errors"]),
  },

  mounted() {
    this.$store.commit("setErrors", {});
  },

  methods: {
    ...mapActions(["fetchAdminData","postTodo"]),

    createTodo(user) {
      this.createTask.id = user.id
      this.createTask.description = user.name
      this.postTodo(this.createTask).then(() => {
        if (!this.errors.description && !this.errors.date) {
          this.$router.push({ name: "Admin" })
        }
      });
    }
  },
}
</script>