<template>
  <div id="app">
    <div class="station_name_container">
      <span class="station_name">{{ display_infomation.station_name }}</span>
      <img class="station_name_bg" src="./assets/station_bg.png" />
    </div>
    <div class="next_infomation_container">
      <div class="line_info">
        <span>{{ display_infomation.line_name }}</span>
      </div>
      <div class="next_text">
        <span>次の出発時間は</span>
      </div>
      <div class="next_depert_time">
        <span>{{ display_infomation.dept_time }}</span>
      </div>
    </div>
    <div class="stop_btn_container">
      <div
        v-if="!btn_push_is"
        class="btn_element"
        @click="stop_btn_push()"
      ></div>
      <img
        v-if="btn_push_is"
        class="btn_image"
        src="./assets/stop_btn_deactive.png"
        alt=""
      />
      <img v-else class="btn_image" src="./assets/stop_btn_active.png" alt="" />
    </div>
    <div class="bottom_menu_container">
      <div class="station_selector" @click="setting_modal_togle(true)">
        <span>駅・線を変える</span>
      </div>
    </div>
    <div v-if="setting_modal_is" class="setting_modal">
      <div class="test_btn" @click="test_get_bus_db()"></div>
      <div class="setting_container">
        <span class="setting_title">駅を選択</span>
        <select
          name="station"
          id="station-select"
          v-model="setting_selection.station"
          v-on:change="setting_line_set()"
        >
          <option
            v-for="station in station_infomation_lists"
            :key="station.key"
            :value="station.station_name"
          >
            {{ station.station_name }}
          </option>
        </select>
        <span class="setting_title">線を選択</span>
        <select name="line" id="line-select" v-model="setting_selection.line">
          <option
            v-for="line in setting_line_list"
            :key="line.key"
            :value="line.line_name"
          >
            {{ line.line_name }}
          </option>
        </select>
        <div class="setting_decide_btn" @click="setting_modal_togle(false)">
          <span>駅・線を決定</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  components: {},
  data() {
    return {
      longitude: 35.494337,
      latitude: 134.226079,
      display_infomation: {
        station_name: "",
        line_name: "",
        dept_time: "",
        time_table: [],
      },
      btn_push_is: false,
      station_infomation_lists: [
        {
          station_name: "鳥取駅",
          route_line_list: [
            {
              line_name: "39 鳥取砂丘線",
              time_table: [
                "9:10",
                "9:40",
                "10:50",
                "11:30",
                "12:30",
                "13:00",
                "14:10",
                "14:40",
                "15:50",
                "16:20",
                "17:30",
                "18:00",
              ],
            },
            {
              line_name: "30 大森中央病院線",
              time_table: ["8:20", "12:40"],
            },
            {
              line_name: "61.62.63 雲山市立病院線",
              time_table: [
                "8:30",
                "9:25",
                "9:55",
                "10:25",
                "11:00",
                "11:25",
                "12:00",
                "13:05",
                "13:25",
                "14:00",
                "14:25",
                "15:30",
                "16:05",
                "16:25",
                "17:20",
                "17:25",
                "18:10",
                "18:15",
                "18:25",
                "18:45",
                "19:05",
                "19:15",
                "19:40",
                "20:15",
              ],
            },
          ],
        },
        {
          station_name: "鳥取大学 鳥取キャンパス",
          route_line_list: [
            {
              line_name: "ハッカソン１",
              time_table: ["7:57", "9:57", "11:57", "13:57", "15:57", "17:57"],
            },
            {
              line_name: "ハッカソン２",
              time_table: ["7:57", "9:57", "11:57", "13:57", "15:57", "17:57"],
            },
            {
              line_name: "ハッカソン２",
              time_table: ["7:57", "9:57", "11:57", "13:57", "15:57", "17:57"],
            },
          ],
        },
      ],
      setting_modal_is: false,
      setting_line_list: [],
      setting_selection: {
        station: "",
        line: "",
      },
    };
  },
  methods: {
    stop_btn_push() {
      // パラメータを含む URL
      const apiUrl =
        "https://script.google.com/macros/s/AKfycbwrLeUEKQb40Akt9fTnguTA5c2LGcFPcZD0mXffLIZlE1ZGLfsA7M8GFCQZORRYZfcH/exec";
      // パラメータオブジェクト
      const params = {
        station: this.display_infomation.station_name,
        latitude: this.latitude,
        longitude: this.longitude,
      };
      // HTTP GET リクエストを行う
      axios
        .get(apiUrl, { params })
        .then((response) => {
          // レスポンスが成功した場合の処理
          let responseData = response.data;
          console.log(responseData);
          this.btn_push_is = !this.btn_push_is;
        })
        .catch((error) => {
          // エラーが発生した場合の処理
          console.error("エラー:", error);
        });
      this.btn_push_is = !this.btn_push_is;
    },
    set_latest_dept_time() {
      this.display_infomation.dept_time = this.display_infomation.time_table[0];
      let base_time = new Date();
      for (let table_elem_time of this.display_infomation.time_table) {
        let now_hour = base_time.getHours();
        let now_min = base_time.getMinutes();
        let table_hour = table_elem_time.split(":")[0];
        let table_min = table_elem_time.split(":")[1];
        if (table_hour == now_hour) {
          if (table_min > now_min) {
            this.display_infomation.dept_time = table_elem_time;
            break;
          }
        } else if (table_hour > now_hour) {
          this.display_infomation.dept_time = table_elem_time;
          break;
        }
      }
    },
    setting_modal_togle(state) {
      this.setting_modal_is = state;
      if (state == false) {
        this.display_infomation.station_name = this.setting_selection.station;
        this.display_infomation.line_name = this.setting_selection.line;
        for (let line_elem of this.setting_line_list) {
          if (line_elem.line_name == this.setting_selection.line) {
            this.display_infomation.time_table = line_elem.time_table;
            break;
          }
        }
        this.set_latest_dept_time();
      }
    },
    setting_line_set() {
      for (let station_elem of this.station_infomation_lists) {
        if (station_elem.station_name == this.setting_selection.station) {
          this.setting_line_list = station_elem.route_line_list;
          this.setting_selection.line =
            station_elem.route_line_list[0].line_name;
          break;
        }
      }
    },
    initialize_data() {
      this.display_infomation.station_name =
        this.station_infomation_lists[0].station_name;
      this.display_infomation.line_name =
        this.station_infomation_lists[0].route_line_list[0].line_name;
      this.display_infomation.time_table =
        this.station_infomation_lists[0].route_line_list[0].time_table;
      this.setting_line_list = this.station_infomation_lists[0].route_line_list;
      this.setting_selection.station =
        this.station_infomation_lists[0].station_name;
      this.setting_selection.line =
        this.station_infomation_lists[0].route_line_list[0].line_name;
    },
    test_get_bus_db() {
      console.log("test");
      // パラメータを含む URL
      const apiUrl =
        "https://script.google.com/macros/s/AKfycbwrLeUEKQb40Akt9fTnguTA5c2LGcFPcZD0mXffLIZlE1ZGLfsA7M8GFCQZORRYZfcH/exec";
      // パラメータオブジェクト
      const params = {
        station: this.display_infomation.station_name,
        latitude: 999,
        longitude: 999,
      };
      // HTTP GET リクエストを行う
      axios
        .get(apiUrl, { params })
        .then((response) => {
          // レスポンスが成功した場合の処理
          let responseData = response.data;
          console.log(responseData);
        })
        .catch((error) => {
          // エラーが発生した場合の処理
          console.error("エラー:", error);
        });
    },
  },
  created: function () {
    this.initialize_data();
    this.set_latest_dept_time();
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log(pos.coords.latitude);
        console.log(pos.coords.longitude);
        this.latitude = pos.coords.latitude;
        this.longitude = pos.coords.longitude;
      },
      (err) => {
        console.log(err);
      }
    );
  },
};
</script>

<style lang="scss">
@import url("@/assets/reset.css");
@import url("https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c&display=swap");
#app {
  font-family: "M PLUS Rounded 1c", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  background-image: url("@/assets/BG.png");
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}
.station_name_container {
  width: 90%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .station_name {
    position: absolute;
    z-index: 2000;
    font-size: 28px;
    font-weight: bold;
    color: #4c504d;
  }
  .station_name_bg {
    position: absolute;
    z-index: 1000;
    color: #4c504d;
    user-select: none; /* CSS3 */
    -moz-user-select: none; /* Firefox */
    -webkit-user-select: none; /* Safari、Chrome */
    -ms-user-select: none; /* IE10 */
  }
}
.next_infomation_container {
  margin: 15px 0;
  width: 90%;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .line_info {
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    font-size: 25px;
    font-weight: bold;
    color: #4c504d;
  }
  .next_text {
    width: 75%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    font-size: 15px;
    font-weight: bold;
    color: #4c504d;
  }
  .next_depert_time {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 40px;
    font-weight: bold;
    color: #4c504d;
  }
}
.stop_btn_container {
  width: 90%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .btn_element {
    position: absolute;
    z-index: 3000;
    width: 240px;
    height: 200px;
    border-radius: 999px;
    margin-bottom: 15px;
  }
  .btn_image {
    position: absolute;
    z-index: 2000;
    user-select: none; /* CSS3 */
    -moz-user-select: none; /* Firefox */
    -webkit-user-select: none; /* Safari、Chrome */
    -ms-user-select: none; /* IE10 */
  }
}
.bottom_menu_container {
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 9000;
  bottom: 0px;
  .station_selector {
    width: 100%;
    height: 100%;
    padding-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #4157d3;
    border-radius: 25px 25px 0 0;
    font-size: 20px;
    font-weight: 900;
    color: #ffffff;
    box-shadow: 0 1px 2px #00000077;
  }
  .line_selector {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #6e54ba;
    border-radius: 25px 25px 0 0;
    font-size: 20px;
    font-weight: 900;
    color: #ffffff;
    box-shadow: 0 1px 2px #00000077;
  }
}
.setting_modal {
  position: absolute;
  z-index: 10000;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(15px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .test_btn {
    position: absolute;
    top: 0px;
    width: 100%;
    height: 20px;
  }
  .setting_container {
    height: 40%;
    width: 80%;
    background-color: #fafafa;
    border: solid #ffffff 2px;
    border-radius: 15px;
    box-shadow: 0 1px 2px #00000044;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    .setting_title {
      font-size: 30px;
      font-weight: bold;
      color: #4c504d;
    }
    select {
      width: 90%;
      height: 50px;
      font-size: 20px;
      margin-bottom: 20px;
    }
    .setting_decide_btn {
      position: absolute;
      bottom: 5px;
      width: 90%;
      height: 40px;
      margin-top: 50px;
      border-radius: 999px;
      font-size: 20px;
      font-weight: 900;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      background-image: linear-gradient(
        90deg,
        rgba(103, 126, 250, 1),
        rgba(142, 84, 219, 1)
      );
    }
  }
}
</style>
