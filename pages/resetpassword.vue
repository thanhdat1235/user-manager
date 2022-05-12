<template>
  <div class="login">
    <Nav />
    <div class="container-fluid">
      <div class="container">
        <div class="row">
          <form>
            <h1>Reset Password</h1>
            <div class="form-group">
              <label for="newPassword">New Password</label>
              <input
                @blur="validate('password')"
                v-bind:class="{ 'is-invalid': errors.password }"
                v-model="getPassword.password"
                type="password"
                class="form-control"
                id="newPassword"
                placeholder="Enter new password"
              />
              <span class="invalid-feedback">{{ errors.password }}</span>
            </div>
            <div class="form-group">
              <label for="confirmPassword">Confirm Password</label>
              <input
                @blur="validate('confirmPassword')"
                v-bind:class="{ 'is-invalid': errors.confirmPassword }"
                v-model="getPassword.confirmPassword"
                type="password"
                class="form-control"
                id="confirmPassword"
                placeholder="Confirm Password"
              />
              <span class="invalid-feedback">{{ errors.confirmPassword }}</span>
            </div>
            <button
              :disabled="validForm()"
              :style="{ cursor: isCursor(), backgroundColor: color }"
              type="button"
              @click="handleClick"
              class="btn btn-primary"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from "axios";
export default {
  head: {
    title: "Reset Password",
    meta: [
      {
        name: "resetpassword",
      },
    ],
  },
  data: () => ({
    cursor: "",
    color: "",
    valid: true,
    errors: {
      password: "",
      confirmPassword: "",
      submitErr: "",
    },
    getPassword: {
      password: "",
      confirmPassword: "",
    },
  }),
  methods: {
    async handleClick() {
      const password = this.getPassword.password;
      const confirmPassword = this.getPassword.confirmPassword;
      const email = this.$router.currentRoute.query.email;
      if (password == confirmPassword) {
        try {
          const newPassword = await axios.post(
            "http://localhost:4001/reset-password/" + email,
            {
              password: password,
            }
          );
          this.$router.push({
            path: "/",
          });
        } catch (error) {
          alert("An error occurred, please try again later !");
          console.error(error);
          this.$router.push({
            path: "/",
          });
        }
      }
    },
    validForm() {
      if (!this.getPassword.password || !this.getPassword.confirmPassword) {
        return (this.color = "gray"), (this.valid = true);
      } else return (this.color = ""), (this.valid = false);
    },
    isCursor() {
      if (this.valid) {
        return (this.cursor = "not-allowed");
      }
      return (this.cursor = "pointer");
    },
    validate(data) {
      this.errors = {
        password: "",
        confirmPassword: "",
        submitErr: "",
      };
      if (data == "password") {
        if (!this.getPassword.password) {
          this.errors.password = "Password is required";
        }
      }
      if (data == "confirmPassword") {
        if (
          this.getPassword.confirmPassword != this.getPassword.password ||
          !this.getPassword.confirmPassword
        ) {
          this.errors.confirmPassword =
            "The password you entered is not the same !";
        }
      }
    },
  },
};
</script>

<style lang="scss">
h1 {
  text-align: center;
}
</style>
