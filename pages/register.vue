<template>
  <div class="login">
    <Nav />
    <div class="container-fluid">
      <div class="container">
        <div class="row">
          <form>
            <h1>User Registration</h1>
            <div class="form-group name">
              <div class="form-name first">
                <label for="first-name">First Name</label>
                <span class="text-danger">*</span>
                <input
                  type="text"
                  @blur="validate('first_name')"
                  v-bind:class="{ 'is-invalid': errors.first_name }"
                  v-model="getData.first_name"
                  class="form-control"
                  id="first-name"
                  placeholder="Enter first name"
                />
                <span class="invalid-feedback">{{ errors.first_name }}</span>
              </div>
              <div class="form-name">
                <label for="last-name">Last Name</label>
                <span class="text-danger">*</span>
                <input
                  @blur="validate('last_name')"
                  v-bind:class="{ 'is-invalid': errors.last_name }"
                  v-model="getData.last_name"
                  type="text"
                  class="form-control"
                  id="last-name"
                  placeholder="Enter last name"
                />
                <span class="invalid-feedback">{{ errors.last_name }}</span>
              </div>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <span class="text-danger">*</span>
              <input
                @blur="validate('email')"
                v-bind:class="{ 'is-invalid': errors.email }"
                v-model="getData.email"
                type="email"
                class="form-control"
                id="email"
                placeholder="Enter email"
              />
              <span class="invalid-feedback">{{ errors.email }}</span>
            </div>
            <div class="form-group">
              <label for="address">Address</label>
              <input
                v-model="getData.address"
                type="address"
                class="form-control"
                id="address"
                placeholder="Enter address"
              />
            </div>
            <div class="form-group name">
              <div class="form-name first">
                <label for="password">Password</label>
                <span class="text-danger">*</span>
                <input
                  @blur="validate('password')"
                  v-bind:class="{ 'is-invalid': errors.password }"
                  v-model="getData.password"
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="Enter password"
                />
                <span class="invalid-feedback">{{ errors.password }}</span>
              </div>
              <div class="form-name">
                <label for="cf-password">Confirm Password</label>
                <span class="text-danger">*</span>
                <input
                  @blur="validate('confirmPassword')"
                  v-bind:class="{ 'is-invalid': errors.confirmPassword }"
                  v-model="getData.confirmPassword"
                  type="password"
                  class="form-control"
                  id="cf-password"
                  placeholder="Confirm password"
                />
                <span class="invalid-feedback">{{
                  errors.confirmPassword
                }}</span>
              </div>
            </div>
            <div class="form-group">
              <select
                name="select"
                id="select"
                default="male"
                v-model="getData.selected"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div class="footer-form">
              <button
                v-bind:disabled="validForm()"
                :style="{ cursor: isCursor(), backgroundColor: color }"
                type="submit"
                @click="onSubmit"
                class="btn btn-primary"
              >
                Register
              </button>
              <NuxtLink to="/">Back to login page</NuxtLink>
            </div>
            {{ errors.errRegistered }}
          </form>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from "axios";
const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export default {
  head: {
    title: "Register Page",
    meta: [
      {
        name: "RegisterPage",
      },
    ],
  },
  data: () => ({
    valid: true,
    cursor: "",
    isShow: false,
    color: "",
    errors: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmPassword: "",
      errRegistered: "",
    },
    getData: {
      first_name: "",
      last_name: "",
      email: "",
      address: "",
      password: "",
      confirmPassword: "",
      selected: "male",
    },
  }),
  methods: {
    async onSubmit(e) {
      try {
        e.preventDefault();
        const result = await axios.post("http://localhost:4001/register", {
          first_name: this.getData.first_name.trim(),
          last_name: this.getData.last_name.trim(),
          email: this.getData.email.trim(),
          address: this.getData.address.trim(),
          password: this.getData.password.trim(),
          gender: this.getData.selected.trim().toString(),
        });
        this.$router.push({ path: "/" });
      } catch (error) {
        this.errRegistered = JSON.stringify(error);
        console.log(
          "Error:-----------------------------------",
          this.errRegistered
        );
        console.error(error);
      }
    },
    validForm() {
      if (
        !this.getData.first_name ||
        !this.getData.last_name ||
        !this.getData.email ||
        !this.getData.password ||
        !this.getData.confirmPassword ||
        this.getData.password != this.getData.confirmPassword
      ) {
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
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirmPassword: "",
      };

      if (data == "first_name") {
        if (!this.getData.first_name) {
          this.errors.first_name = "First name is required";
        }
      }
      if (data == "last_name") {
        if (this.getData.last_name == "") {
          this.errors.last_name = "Last name is required";
        }
      }
      if (data == "email") {
        if (!this.getData.email.match(emailFormat)) {
          this.errors.email = "You have entered an invalid email address!";
        }
      }
      if (data == "password") {
        if (!this.getData.password) {
          this.errors.password = "Password is required";
        } else if (this.getData.password.length < 8) {
          this.errors.password = "Password must contain 8 characters";
        }
      }
      if (data == "confirmPassword") {
        if (this.getData.confirmPassword !== this.getData.password) {
          this.errors.confirmPassword =
            "Password and confirm password are not matched!";
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
select {
  padding: 0 10px;
  -webkit-appearance: auto;
  border-style: outset !important;
  -webkit-appearance: auto;
}
.row {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  form {
    width: 50%;
    h1 {
      text-align: center;
    }
    .name {
      display: flex;
      width: 100%;
      .form-name {
        width: 47.5%;
      }
      .first {
        margin-right: 5%;
      }
    }
    .form-group {
      select {
        width: 100%;
        height: 30px;
      }
    }
    .footer-form {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
