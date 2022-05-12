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
          <form>
            <h1>User Decentralization</h1>
            <div class="form-group">
              <label for="fullname">Fullname</label>
              <input
                v-model="getData.fullname"
                type="text"
                class="form-control"
                id="fullname"
              />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input
                v-model="getData.email"
                type="email"
                class="form-control"
                id="email"
              />
              <small id="fullname" class="form-email email-muted"
                >We'll never share your email with anyone else.</small
              >
            </div>
            <div class="form-group">
              <label for="role">Role</label>
              <select v-model="getData.role" name="select" id="select">
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="user">User</option>
              </select>
            </div>
            <button @click="handleClick" type="button" class="btn btn-primary">
              Save
            </button>
            <button
              @click="handleCancel"
              type="button"
              class="btn btn-secondary"
            >
              Cancel
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
    title: "Edit Permission Page",
    meta: [
      {
        name: "editpermission",
      },
    ],
  },
  data: () => ({
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
      const fullname = `${dataUser.data.first_name} ${dataUser.data.last_name}`;
      this.getData = dataUser.data;
      this.getData.fullname = fullname;
    } catch (error) {
      console.error(error);
    }
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
        localStorage.clear();
        this.$router.push({ path: "/" });
      } catch (error) {
        this.logout = "You are not logged in !";
      }
    },
    async handleClick() {
      try {
        const token = localStorage.getItem("token");
        const id = this.$router.currentRoute.query.id;
        const permissions = await axios.patch(
          "http://localhost:4001/users/" + id,
          {
            role: this.getData.role,
          },
          {
            headers: {
              authorization: token,
            },
          }
        );
        this.$router.push({ path: "/users" });
      } catch (error) {
        alert("Sorry only admin has this permission !");
        this.$router.push({ path: "/users" });
      }
    },
    handleCancel() {
      this.$router.push({ path: "/users" });
    },
  },
};
</script>

<style lang="scss">
.form-group {
  select {
    width: 100%;
    height: 35px;
  }
}
select {
  padding: 0 10px;
  -webkit-appearance: auto;
  border-style: outset !important;
}
</style>
