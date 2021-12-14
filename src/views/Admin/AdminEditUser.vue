<template>
  <button class="btn btn-primary" @click="$router.go(-1)"> Cancel </button>
  <div v-for="user in allUsers" :key="user.id">
    <div v-if="user.id == this.$route.params.id">
      <div class="col-lg-6">
        <form style="margin-top:30px">
          <div>
            <label> Name </label>
            <input type="text" class="form-control" :class="{ 'is-invalid': errors.name }" v-model="user.name" />
            <div class="invalid-feedback" v-if="errors.name">
              {{ errors.name[0] }}
            </div>
          </div>
          <br>
          <div class="form-group d-flex">
            <button type="button" @click="update(user)" class="btn btn-primary w-25" > Update </button>
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
      editUser: {
        id: null,
        name: null
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
    ...mapActions(["fetchAdminData","editUserData"]),

    update(user){
      this.editUser.id = user.id
      this.editUser.name = user.name
      this.editUserData(user).then(() => {
        if (!this.errors.name) {
          this.$router.push({ name: "Admin" })
        }
      });
    }
  },
}
</script>