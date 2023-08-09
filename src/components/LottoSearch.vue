<template>
  <div>
    <span v-for="(button, index) in Object.keys(buttons)" :key="index">
      <!-- <button type="button" class="btn btn-primary btn_lotto" :style="button.buttonstyle" -->
      <!-- <button type="button" class="btn btn-primary btn_lotto" :class="GetStyle(button.number)" -->
      <button type="button" class="btn btn-primary btn_lotto" :style="GetStyle(button)"
        @click="SetBackgroundColor(button)">
        <strong>{{ button }}</strong>
      </button>
    </span><br>
    <!-- <button type="button" class="btn btn-primary button_click" 
    @click="GetWinningNumbers()">
      역대당첨번호
    </button> -->
    <button type="button" class="btn btn-primary button_click"
    @click="RecommandNumber()">
      로또번호 추천
    </button>
    <button type="button" class="btn btn-primary button_click" 
    @click="ResetRecommandNumber()">
      추천번호 삭제
    </button>
    <button type="button" class="btn btn-primary button_click" 
    @click="ResetAllRecommandNumber()">
      전체 삭제
    </button><br>
    <div>
      <span v-for="(number, index) in Object.keys(recommand_numbers)" :key="index">
        <button type="button" class="btn btn-primary btn_lotto" :style="GetStyle(number)"
        @click="DeleteRecommandNumber(number)">
          <strong>{{ number }}</strong>
        </button>
      </span>
    </div>
    <div v-for="(list, index) in match_lists" :key="index">
      <span class="float-left">
        <strong>{{ list.drwNo }}회차</strong>
        <strong>({{list.firstPrzwnerCo}}명 {{ list.firstWinamnt }})</strong>
      </span>
      <span class="float-right">
        <button type="button" class="btn btn-primary button_match" :style="GetStyle(list.drwtNo1)">
          <strong>{{ list.drwtNo1 }}</strong>
        </button>
        <button type="button" class="btn btn-primary button_match" :style="GetStyle(list.drwtNo2)">
          <strong>{{ list.drwtNo2 }}</strong>
        </button>
        <button type="button" class="btn btn-primary button_match" :style="GetStyle(list.drwtNo3)">
          <strong>{{ list.drwtNo3 }}</strong>
        </button>
        <button type="button" class="btn btn-primary button_match" :style="GetStyle(list.drwtNo4)">
          <strong>{{ list.drwtNo4 }}</strong>
        </button>
        <button type="button" class="btn btn-primary button_match" :style="GetStyle(list.drwtNo5)">
          <strong>{{ list.drwtNo5 }}</strong>
        </button>
        <button type="button" class="btn btn-primary button_match" :style="GetStyle(list.drwtNo6)">
          <strong>{{ list.drwtNo6 }}</strong>
        </button>
        <strong>+</strong>
        <button type="button" class="btn btn-primary button_match" :style="GetStyle(list.bnusNo)">
          <strong>{{ list.bnusNo }}</strong>
        </button>
      <br>
      </span>
    </div>
  </div>
</template>
  
<script>
// import { mapState, mapMutations } from "vuex";
import axios from "axios";
// import WinningNumbers from "@/files/WinningNumbers.json";

export default {
    name: "LottoSearch",
    data() {
      return {
        // WinningNumbers: WinningNumbers,
        Debounce: null,
        WinningNumbers: {},
        default_color: [
          { number: 0, "background-color": "rgb(242, 183, 31)"},
          { number: 10, "background-color": "rgb(64, 114, 172)"},
          { number: 20, "background-color": "rgb(222, 76, 13)"},
          { number: 30, "background-color": "rgb(145, 149, 164)"},
          { number: 40, "background-color": "rgb(24, 190, 75)"}
        ],
        buttons: {},
        recommand_numbers: {},
        selected_numbers: [],
        match_count: 0,
        match_lists: [],
        winning_numbers: [
          {
            sequence: 1, 
            numbers: [1,3,5,24,56,45],
            bonus: { number: 45, buttonstyle: {'background-color': 'rgb(242, 183, 31)'}},
            url: "http://"
          }
        ],
      }
    },
    computed: {
      // ...mapState("lotto", [
      //   "inventory",
      // ]),
    },
    methods: {
      // ...mapMutations("lotto", ['updateInventory']),
      GetStyle(number) {
        // console.log(number)
        // console.log("number_" + String(parseInt(number/10)))
        return this.buttons[number]["style"]
      },
      SetBackgroundColor(number) {
        // console.log("SetBackgroundColor :", number)
        if (this.buttons[number]["selected"] === 'True') {
          this.DeleteRecommandNumber(number)
        } 
        else {
          if (Object.keys(this.recommand_numbers).length < 6) {
            this.buttons[number]['selected'] = 'True'
            this.buttons[number]["style"] = "background-color: rgb(0, 0, 0);"
            this.AddRecommandNumber(number, this.buttons[number])
          }
        }
      },
      SetButtons(count) {
        for (let number=1; number<=count; number++) {
          // console.log(number)
          this.buttons[number] = { "selected": "Fasle" }
          if (number < 11) { 
            this.buttons[number]["style_default"] = "background-color: rgb(242, 183, 31);" 
            this.buttons[number]["style"] = "background-color: rgb(242, 183, 31);" 
          }
          else if (number < 21) { 
            this.buttons[number]["style_default"] = "background-color: rgb(64, 114, 172);" 
            this.buttons[number]["style"] = "background-color: rgb(64, 114, 172);" 
          }
          else if (number < 31) { 
            this.buttons[number]["style_default"] = "background-color: rgb(222, 76, 13);" 
            this.buttons[number]["style"] = "background-color: rgb(222, 76, 13);" 
          }
          else if (number < 41) { 
            this.buttons[number]["style_default"] = "background-color: rgb(145, 149, 164);" 
            this.buttons[number]["style"] = "background-color: rgb(145, 149, 164);" 
          }
          else { 
            this.buttons[number]["style_default"] = "background-color: rgb(24, 190, 75)" 
            this.buttons[number]["style"] = "background-color: rgb(24, 190, 75)" 
          }
        }
        // console.log(this.buttons)
      },
      AddRecommandNumber(number, value) {
        // console.log("AddRecommandNumber")
        // console.log(number, value)
        this.recommand_numbers[number] = value
        this.find_dic()
      },
      RecommandNumber() {
        // console.log("RecommandNumber")
        this.ResetRecommandNumber()
        while (Object.keys(this.recommand_numbers).length < 6) {
          let random_number = Math.floor(Math.random() * 45) + 1
          if (!this.recommand_numbers[random_number]) {
            this.recommand_numbers[random_number] = this.buttons[random_number]
          }
        }
        // console.log("this.recommand_numbers : ", this.recommand_numbers)
      },
      DeleteRecommandNumber(number) {
        // console.log("DeleteRecommandNumber")
        this.buttons[number]['selected'] = 'False'
        this.buttons[number]["style"] = this.buttons[number]['style_default']
        delete this.recommand_numbers[number]
        clearTimeout(this.Debounce)
        this.Debounce = setTimeout(() => {
          // console.log("called DeleteRecommandNumber")
          this.find_dic()
        }, 100);
      },
      ResetRecommandNumber() {
        // console.log("ResetRecommandNumber")
        for (let number of Object.keys(this.recommand_numbers)) {
          // console.log("number :", number)
          if (this.recommand_numbers[number]['selected'] != 'True') {
            this.DeleteRecommandNumber(number)
          }
        }
      },
      ResetAllRecommandNumber() {
        // console.log("ResetRecommandNumber")
        for (let number of Object.keys(this.recommand_numbers)) {
          // console.log("number :", number)
          this.DeleteRecommandNumber(number)
        }
      },
      GetWinningNumbers() {
        axios({
          method: "get",
          // url: "https://lastpeople.kr:3000/",
          url: "https://vuejs.co.kr/api/",
        })
        .then((response) => {
          // console.log("response : ", response)
          this.WinningNumbers = response.data
          // console.log("WinningNumbers :", this.WinningNumbers)
          this.find_dic()
          // this.debounce = setTimeout(() => {this.find_dic()}, 500)
        })
        .catch((error) => {
          console.log("catch : " + error);
        })
        .then(function () {
          // console.log("axio then : ");
        });
      },
      find_dic () {
        // console.log("func")
        this.selected_numbers = []
        this.match_lists = []
        for (let recommand_number in this.recommand_numbers) {
          // console.log("recommand_number :", recommand_number)
          if (this.recommand_numbers[recommand_number]['selected'] === 'True') {
            // console.log(this.recommand_numbers[recommand_number]['selected'])
            this.selected_numbers.push(recommand_number)
          }
        }
        let WinningNumbers_key = Object.keys(this.WinningNumbers).sort(function(a, b) {
            return b - a;
          })
        for (let WinningNumber of WinningNumbers_key) {
          // console.log(WinningNumber)
          this.findLotto_dic(WinningNumber)
        }
        // console.log(this.match_lists)
      },
      findLotto_dic(key) {
        // console.log("findLotto_dic :", key)
        this.match_count = 0
        // console.log("this.WinningNumbers[key] :", this.WinningNumbers[key])
        for (let selected_number of this.selected_numbers) {
          // console.log("selected_number :", selected_number)
          if ([
            this.WinningNumbers[key]['drwtNo1'],
            this.WinningNumbers[key]['drwtNo2'],
            this.WinningNumbers[key]['drwtNo3'],
            this.WinningNumbers[key]['drwtNo4'],
            this.WinningNumbers[key]['drwtNo5'],
            this.WinningNumbers[key]['drwtNo6'],
            this.WinningNumbers[key]['bnusNo']
          ].includes(parseInt(selected_number))) {
            this.match_count += 1
          }
        }
        if (this.match_count === this.selected_numbers.length) {
          // console.log(this.WinningNumbers[key])
          // console.log("match_lists :", this.match_lists)
          this.match_lists.push(this.WinningNumbers[key])
          
        }
      },
    },
    watch: {
    },
    components: {
    },
    created() {
      // console.log('created()')
      // this.GetWinningNumbers()
    },
    mounted() {
      // console.log('mounted()')
      this.GetWinningNumbers()
      this.SetButtons(45)
      // this.find() // 데이터가 배열형 때 사용
      // this.find_dic() // 데이터가 사전형 때 사용
      // this.debounce = setTimeout(() => {this.find_dic()}, 500)
    },
    beforeUnmount() {
      // console.log('beforeUnmount()')
    }
}
</script>

<style scoped>
.btn_lotto {
  /* background-color: pink; */
  /* border: 10px black; */
  /* color: white; */
  padding: 0px;
  /* text-align: center; */
  /* text-decoration: none; */
  /* display: inline-block; */
  font-size: 16px;
  margin: 2px;
  /* cursor: pointer; */
  width: 40px;
  height: 40px;
  border-radius: 50%;
  touch-action: none;
}
.button_10 {
  background-color: rgba(244, 20, 20, 0.978);
}
.button_click {
  margin: 2px;
  touch-action: none;
}
.button_match {
  padding: 0px;
  font-size: 15px;
  width: 23px;
  height: 23px;
  margin: 1px;
  border-radius: 50%;
}
.number_0 {
  background-color: rgb(242, 183, 31);
}
.number_1 {
  background-color: rgb(64, 114, 172);
}
.number_2 {
  background-color: rgb(222, 76, 13);
}
.number_3 {
  background-color: rgb(145, 149, 164);
}
.number_4 {
  background-color: rgb(24, 190, 75);
}
.test2 {
  display: inline-block;
  /* text-align: right; */
  /* float: right; */
}
</style>
