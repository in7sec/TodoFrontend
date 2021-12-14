<template>

  <button class="btn btn-primary" @click="$router.go(-1)"> Cancel </button>
  <div class="col-lg-6">
    <form style="margin-top:30px">
        <label> Name </label>
        <input type="text" class="form-control" :class="{ 'is-invalid': errors.name }" v-model="details.name" placeholder="Name"/>
        <div class="invalid-feedback" v-if="errors.name">
          {{ errors.name[0] }}
        </div>
      <div>
        <label> Password </label>
        <input type="password" class="form-control" :class="{ 'is-invalid': errors.password }" v-model="details.password" placeholder="Password"/>
        <div class="invalid-feedback" v-if="errors.password">
          {{ errors.password[0] }}
        </div>
      </div>
      <br>
      <div class="form-group d-flex">
        <button type="button" @click="register" class="btn btn-primary w-25" id="register"> Register </button>
      </div>
    </form>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      details: {
        name: null,
        password: null
      },
    }
  },

  computed: {
    ...mapGetters(["errors"])
  },
  mounted() {
    this.$store.commit("setErrors", {});
  },

  methods: {
    ...mapActions(["postRegisterRequest"]),

    register: function() {
      this.postRegisterRequest(this.details).then(() => {
        if (!this.errors.name && !this.errors.password) {
          this.$router.push({ name: "Admin" })
        }
      })

    }

  },
}
</script>