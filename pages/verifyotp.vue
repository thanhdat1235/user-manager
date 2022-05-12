<template>
  <div class="login">
    <Nav />
    <div class="container-fluid">
      <div class="container">
        <div class="row">
          <form>
            <h1>Confirm OTP</h1>
            <div class="form-group">
              <label for="otp">OTP Code</label>
              <input
                v-model="getOTPCode.OTP"
                type="text"
                class="form-control"
                id="otp"
                placeholder="Enter your otp code"
              />
            </div>
            <button
              :disabled="validForm()"
              :style="{ cursor: isCursor(), backgroundColor: color }"
              type="button"
              @click="handleClick"
              class="btn btn-primary"
            >
              Confirm
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
    title: "Verify Token",
    meta: [
      {
        name: "verifyotp",
      },
    ],
  },
  data: () => ({
    cursor: "",
    valid: true,
    color: "",
    errors: {
      OTP: "",
      message: "",
    },
    getOTPCode: {
      OTP: "",
    },
  }),
  methods: {
    async handleClick() {
      try {
        const email = this.$router.currentRoute.query.email;
        await axios.post("http://localhost:4001/verify-otp/" + email, {
          OTP: this.getOTPCode.OTP,
        });
        this.$router.push({
          path: "/resetpassword?email=" + email,
        });
      } catch (error) {
        alert("Your OTP is incorrect, please try again !");
        console.error(error);
      }
    },
    validForm() {
      if (!this.getOTPCode.OTP) {
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
      if (data == "OTP") {
        if (!this.getOTPCode.OTP) {
          this.errors.OTP = "OTP is required";
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
