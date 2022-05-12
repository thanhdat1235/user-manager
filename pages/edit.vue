<template>
  <div class="login">
    <Nav />
    <div class="profile">
      <img
        src="https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg"
        alt=""
      />
      <div class="dropdown">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Profile
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="#" @click="handleClickLogout"
            >Logout</a
          >
          <a class="dropdown-item" href="#">Settings</a>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="container">
        <div class="row">
          <form v-on:submit="onSubmit">
            <h1>Update</h1>
            <div class="form-group name">
              <div class="form-name first">
                <label for="first-name">First Name*</label>
                <input
                  @blur="validate('first_name')"
                  v-bind:class="{ 'is-invalid': errors.first_name }"
                  v-model="getData.first_name"
                  type="text"
                  class="form-control"
                  id="first-name"
                  placeholder="Enter first name"
                />
                <span class="invalid-feedback">{{ errors.first_name }}</span>
              </div>
              <div class="form-name">
                <label for="last-name">Last Name*</label>
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
              <label for="address">Address</label>
              <input
                @blur="validate('address')"
                v-bind:class="{ 'is-invalid': errors.address }"
                v-model="getData.address"
                type="address"
                class="form-control"
                id="address"
                placeholder="Enter address"
              />
              <span class="invalid-feedback">{{ errors.address }}</span>
            </div>
            <div class="form-group">
              <select name="select" v-model="getData.gender" id="select">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div class="btn-save-cancel">
              <button
                v-bind:disabled="validForm()"
                :style="{ cursor: isCursor(), backgroundColor: color }"
                type="submit"
                class="btn btn-primary"
              >
                Save
              </button>
              <button type="submit" class="btn btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import Nav from "../components/Nav.vue";
export default {
  head: {
    title: "Edit Page",
    meta: [
      {
        name: "edit",
      },
    ],
  },
  data: () => ({
    valid: true,
    color: "",
    cursor: "",
    errors: {
      first_name: "",
      last_name: "",
      address: "",
      submitErr: "",
    },
    getData: {},
  }),
  async mounted() {
    const token = localStorage.getItem("token");
    try {
      const id = this.$router.currentRoute.query.id;
      const dataUser = await axios.get("http://localhost:4001/users/" + id, {
        headers: {
          authorization: token,
        },
      });
      this.getData = dataUser.data;
    } catch (error) {}
  },
  methods: {
    async handleClickLogout() {
      const token = localStorage.getItem("token");
      try {
        const logout = await axios.post(
          "http://localhost:4001/logout",
          {},
          {
            headers: {
              authorization: token,
            },
          }
        );
        console.log(logout);
        localStorage.clear();
        this.$router.push({ path: "/" });
      } catch (error) {
        this.logout = "You are not logged in !";
      }
    },
    async onSubmit(e) {
      e.preventDefault();
      const token = localStorage.getItem("token");
      try {
        const id = this.$router.currentRoute.query.id;
        const result = await axios.put(
          "http://localhost:4001/users/" + id,
          {
            first_name: this.getData.first_name,
            last_name: this.getData.last_name,
            address: this.getData.address,
            gender: this.getData.gender,
          },
          {
            headers: {
              authorization: token,
            },
          }
        );

        console.log("result", JSON.stringify(result));
        this.$router.push({ path: "/users" });
      } catch (error) {
        return (this.errors.submitErr = "Error send request to user");
      }
    },
    validForm() {
      if (
        !this.getData.first_name ||
        !this.getData.last_name ||
        !this.getData.address
      ) {
        return (this.color = "gray"), (this.valid = true);
      } else return (this.color = "gray"), (this.valid = false);
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
        address: "",
      };
      if (data == "first_name") {
        if (!this.getData.first_name) {
          this.errors.first_name = "First name is required";
        }
      }
      if (data == "last_name") {
        if (!this.getData.last_name) {
          this.errors.last_name = "Last name is required";
        }
      }
      if (data == "address") {
        if (!this.getData.address) {
          this.errors.address = "This entry cannot be left blank";
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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
        padding: 0 10px;
        -webkit-appearance: auto;
        border-style: outset;
        color: white;
        width: 100%;
        height: 30px;
      }
    }
    .btn-save-cancel {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 5%;
    }
  }
}
</style>
