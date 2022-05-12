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
          {{
            userInfo
              ? `${userInfo.first_name} ${userInfo.last_name} : ${userInfo.role}`
              : "Profile"
          }}
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="#" @click="handleClickLogout"
            >Logout</a
          >
          <a class="dropdown-item" href="#">Settings</a>
        </div>
      </div>
    </div>
    <h1 class="container user-page">User Manager</h1>
    <div class="container user">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Username</th>
            <th scope="col">Fullname</th>
            <th scope="col">Created Date</th>
            <th scope="col">Role</th>
            <th scope="col">Gender</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ user.email }}</td>
            <td>{{ user.first_name + " " + user.last_name }}</td>
            <td>{{ convertDate(user.created_at) }}</td>
            <td>{{ user.role }}</td>
            <td>{{ user.gender }}</td>
            <td>
              <button
                type="button"
                class="btn-primary"
                @click="handleClick(user._id)"
              >
                Edit</button
              ><button
                type="button"
                :disabled="show"
                :style="{ cursor: cursor, backgroundColor: color }"
                class="btn-warning"
                @click="handleEdit(user._id)"
              >
                Edit Permissions</button
              ><button
                :disabled="show"
                :style="{ cursor: cursor, backgroundColor: color }"
                class="btn-danger"
                type="submit"
                @click="handleDelete(user._id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <footer>
      <Footer />
    </footer>
  </div>
</template>

<script>
import axios from "axios";
import { formatDate } from "../src/utilts/dateUtilts";
export default {
  head: {
    title: "User Manager",
    meta: [
      {
        name: "users",
      },
    ],
  },
  data: () => ({
    show: false,
    cursor: "",
    color: "",
    users: null,
    userInfo: null,
  }),
  async mounted() {
    // set userInfo
    this.userInfo = JSON.parse(localStorage.getItem("user"));
    if (this.userInfo.role == "admin") {
      this.show = false;
      this.cursor = "pointer";
      this.color = "";
    } else {
      this.show = true;
      this.cursor = "not-allowed";
      this.color = "gray";
    }
    const token = localStorage.getItem("token");
    try {
      const getUser = axios.get("http://localhost:4001/users", {
        headers: {
          authorization: token,
        },
      });
      const allUsers = (await getUser).data;
      this.users = allUsers;
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    convertDate(createdDate) {
      return formatDate(new Date(createdDate));
    },
    async handleClick(_id) {
      try {
        this.$router.push({ path: "/edit?id=" + _id });
      } catch (error) {}
    },

    handleEdit(_id) {
      try {
        this.$router.push({ path: "/editpermission?id=" + _id });
      } catch (error) {}
    },

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

    handleDelete(_id) {
      const token = localStorage.getItem("token");
      const id = _id;
      try {
        axios.delete("http://localhost:4001/users/" + id, {
          headers: {
            authorization: token,
          },
        });
        this.$router.push({ path: "/users" });
      } catch (error) {
        alert("You do not have permission to access this feature !");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
body {
  background-color: #15133c !important;
}

.user {
  height: 78%;
}

footer {
  padding: 0 15px;
}
.btn-primary {
  background-color: #52a6ff;
  border-color: #007bff;
  padding: 4px;
  border-radius: 4px;
  margin-right: 10px;
}

.btn-warning {
  background-color: #87680a;
  border-color: #a38a3f;
  padding: 4px;
  border-radius: 4px;
  margin-right: 10px;
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
  padding: 4px;
  border-radius: 4px;
}

.user-page {
  padding-top: 40px;
  padding-bottom: 20px;
}
thead {
  background-color: #dddddd;
}
tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
