<template>
  <section class="container">
    <div class="row justify-content-center">
      <div class="col-lg-5">
          <h1 class="display-4 font-weight-bold"> Register </h1>
          <br>
          <form>
            <div class="form-group">
              <label> Name </label>
              <input type="name" class="form-control" :class="{ 'is-invalid': errors.name }" v-model="details.name" placeholder="Name"/>
              <div class="invalid-feedback" v-if="errors.name">
                {{ errors.name[0] }}
              </div>
            </div>
            <div class="form-group">
              <label> Password </label>
              <input type="password" class="form-control" :class="{ 'is-invalid': errors.password }" v-model="details.password" placeholder="Password"/>
              <div class="invalid-feedback" v-if="errors.password">
                {{ errors.password[0] }}
              </div>
            </div>
            <br>
            <div class="form-group d-flex justify-content-center">
              <button type="button" @click="register" class="btn btn-primary w-25"> Register </button>
            </div>
          </form>
        </div>
      </div>
  </section>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      details: {
        name: null,
        password: null,
      }
    };
  },

  computed: {
    ...mapGetters(["errors"])
  },
  mounted() {
    this.$store.commit("setErrors", {});
  },

  methods: {
    ...mapActions(["sendRegisterRequest", "fetchUserData"]),
    register: function() {
      this.sendRegisterRequest(this.details).then(() => {

        if (!this.errors.name && !this.errors.password) {
          this.$router.push({ name: "User" });
        }

        if (localStorage.getItem("token")) {
          this.fetchUserData();
        }
      });
    }
  },
}
</script>
