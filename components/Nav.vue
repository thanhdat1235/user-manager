<template>
  <div class="nav">
    <div class="container-fluid">
      <div class="logo">
        <img
          src="https://www.idsolutions.com.vn/wp-content/uploads/2019/12/IDS-Logo-Official-01-01-e1620376342418.png"
          alt="logo"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "navbar",
  data: () => ({
    errors: {
      logout: "",
    },
  }),
};
</script>

<style lang="scss">
.nav {
  background-color: #ededee;
  .container-fluid {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo {
      img {
        width: 200px;
        height: 70px;
      }
    }
    .logout {
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;
    }
    .menu {
      select {
        option {
          a {
            color: white;
            font-size: 25px;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>