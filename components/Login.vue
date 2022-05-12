<template>
  <div class="login">
    <Nav />
    <div class="container-fluid">
      <div class="container">
        <div class="row">
          <!-- eslint-disable-next-line vue/valid-v-model -->
          <form class="login">
            <h1>Sign In</h1>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address </label>
              <span class="text-danger">*</span>
              <input
                @blur="validate('email')"
                :class="{ 'is-invalid': errors.email }"
                v-model="getData.email"
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
              <p class="invalid-feedback">{{ errors.email }}</p>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <span class="text-danger">*</span>
              <input
                @blur="validate('password')"
                :class="{ 'is-invalid': errors.password }"
                v-model="getData.password"
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
              <p class="invalid-feedback">{{ errors.password }}</p>
            </div>
            <div class="bottom">
              <button
                color="primary"
                v-bind:disabled="validForm()"
                :style="{ cursor: isCursor(), backgroundColor: color }"
                type="submit"
                @click="handleClick"
                class="btn btn-primary"
              >
                Login
              </button>
              <div class="link">
                <NuxtLink to="/forgotpassword">Forgot Password</NuxtLink>
                <NuxtLink to="/register">Create new account</NuxtLink>
              </div>
            </div>
            <p
              :class="{ 'is-invalid': errors.submitErr }"
              class="error close"
              data-dismiss="alert"
              aria-label="close"
            >
              {{ errors.submitErr }}
            </p>
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
    title: "Login Page",
    meta: [
      {
        name: "login",
      },
    ],
  },
  data: () => ({
    data: "login",
    color: "",
    valid: true,
    cursor: "",
    errors: {
      email: "",
      password: "",
      submitErr: "",
    },
    getData: {
      email: "",
      password: "",
    },
  }),

  methods: {
    async handleClick(e) {
      e.preventDefault();
      try {
        const result = await axios.post("http://localhost:4001/login", {
          email: this.getData.email,
          password: this.getData.password,
        });

        localStorage.setItem("token", result.headers.authorization);
        localStorage.setItem("user", JSON.stringify(result.data));
        this.$router.push({ path: "/users" });
      } catch (error) {
        console.log(error);
        return (this.errors.submitErr =
          "Your email or password is incorrect !");
      }
    },
    validForm() {
      if (!this.getData.email || !this.getData.password) {
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
        password: "",
        submitErr: "",
      };
      if (data == "email") {
        if (!this.getData.email) {
          return (this.errors.email = "Email is required");
        }
      }
      if (data == "password") {
        if (!this.getData.password) {
          return (this.errors.password = "Password is required");
        }
      }
    },
  },
};
</script>

<style lang="scss">
body {
  background-color: rgba(156, 157, 162, 0.3);
  height: 100vh;
  #__nuxt {
    height: 100%;
    #__layout {
      height: 100%;
      .login {
        height: 100%;
      }
    }
  }
}

.profile {
  display: flex;
  justify-content: flex-end;
  padding: 10px 10px;
  align-items: center;
  img {
    margin-right: 10px;
    border-radius: 50%;
    height: 35px;
    width: 35px;
  }
}

h1 {
  padding-bottom: 20px;
}
.container-fluid {
  height: 90%;
  .container {
    height: 100%;
  }
}
.row {
  display: flex;
  width: 100%;
  justify-content: center;
  form {
    background-color: #ededee;

    padding: 30px 30px;
    border-radius: 20px;
    width: 50%;
    margin-top: 150px;
    .bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .link {
        display: flex;
        flex-direction: column;
        text-align: end;
      }
    }
  }
  .error {
    display: flex;
    width: 100%;
    justify-content: center;
    color: red;
    font-size: 20px;
    font-weight: bold;
    margin-top: 20px;
  }
}
</style>
