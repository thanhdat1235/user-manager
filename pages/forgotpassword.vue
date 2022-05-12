<template>
  <div class="login">
    <Nav />
    <div class="container-fluid">
      <div class="container">
        <div class="row">
          <form>
            <h1>Forgot Password</h1>
            <div class="form-group">
              <label for="email">Email address</label>
              <input
                @blur="validate('email')"
                :class="{ 'is-invalid': errors.email }"
                v-model="getEmail.email"
                type="email"
                class="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
              <small id="emailHelp" class="form-text text-muted"
                >We'll never share your email with anyone else.</small
              >
              <span class="invalid-feedback">{{ errors.email }}</span>
            </div>
            <button
              v-bind:disabled="validForm()"
              :style="{ cursor: isCursor(), backgroundColor: color }"
              type="button"
              @click="handleClick"
              class="btn btn-primary"
            >
              Get OTP
            </button>
            <span class="error">{{ errors.submitErr }}</span>
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
    title: "Forgot Password",
    meta: [
      {
        name: "forgotpassword",
      },
    ],
  },
  data: () => ({
    color: "",
    cursor: "",
    valid: true,
    errors: {
      email: "",
      submitErr: "",
    },
    getEmail: {
      email: "",
    },
  }),
  methods: {
    async handleClick() {
      try {
        const emailUser = await axios.put(
          "http://localhost:4001/forgotpassword",
          { email: this.getEmail.email }
        );
        this.$router.push({
          path: "/verifyotp?email=" + this.getEmail.email,
        });
      } catch (error) {
        return (this.errors.submitErr =
          "Your email is incorrect or unknown. Please try again.");
      }
    },
    validForm() {
      if (!this.getEmail.email) {
        return (this.color = "gray"), (this.valid = true);
      } else {
        return (this.color = ""), (this.valid = false);
      }
    },
    isCursor() {
      if (this.valid) {
        return (this.cursor = "not-allowed");
      }
      return (this.cursor = "pointer");
    },
    validate(data) {
      this.errors = {
        email: "",
        submitErr: "",
      };
      if (data == "email") {
        if (!this.getEmail.email) {
          this.errors.email = "Email is required";
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
