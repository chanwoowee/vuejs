<template>
  <div class="NoTouchAction" @contextmenu.prevent>
    <!-- <span v-for="(u, index) in Object.keys(users)" :key="index">
      <input type="radio" id="u" value="u" v-model="user" />
      <label class="SelectUser" for="u">선수{{ u }}</label> -->
      <input type="radio" id="user1" value="1" v-model="user" :disabled="status != 'ready'" />
      <label class="SelectUser" for="user1" >선수1</label>
      <input type="radio" id="user2" value="2" v-model="user" :disabled="status != 'ready'" />
      <label class="SelectUser" for="user2" >선수2</label>
      <input type="radio" id="user3" value="3" v-model="user" :disabled="status != 'ready'" />
      <label class="SelectUser" for="user3" >선수3</label>
      <input type="radio" id="user4" value="4" v-model="user" :disabled="status != 'ready'" />
      <label class="SelectUser" for="user4" >선수4</label>
    <!-- </span> -->
  </div>
  <div class="NoTouchAction" @contextmenu.prevent @touchstart="preventBoard($event)">
    <button type="button" class="btn btn-primary button_start" :disabled="status != 'ready'"
    @click="StartGame()" v-touch:press="StartGame" @touchstart="preventBoard($event)">
      게임 시작!!
    </button>
    <br>
    <label class="SelectUser" @touchstart="preventBoard($event)">카운트다운 : <strong>{{ counter }}</strong>초</label>
    <br>
    <label class="font20" @touchstart="preventBoard($event)">게임시간 : </label>
    <!-- <input type="Number" id="timecode_ss" class="font20" min="10" max="60" v-model="time" required  :disabled="status != 'ready'"
    @touchstart="preventBoard($event)" /> -->
    <label class="SelectUser" @touchstart="preventBoard($event)"><strong>{{ time }}</strong>초</label>
    <br>
    <label class="font20" @touchstart="preventBoard($event)">선수{{ users[1].user }} - {{ users[1].count }}</label><br>
    <label class="font20" @touchstart="preventBoard($event)">선수{{ users[2].user }} - {{ users[2].count }}</label><br>
    <label class="font20" @touchstart="preventBoard($event)">선수{{ users[3].user }} - {{ users[3].count }}</label><br>
    <label class="font20" @touchstart="preventBoard($event)">선수{{ users[4].user }} - {{ users[4].count }}</label><br>
    <br>
    <button v-show="status != 'play'" type="button" class="btn btn-primary button_user" :disabled="user != 1"
    @touchstart="preventBoard($event)">
      준비
    </button>
    <button v-show="status != 'play'" type="button" class="btn btn-primary button_user" :disabled="user != 2"
    @touchstart="preventBoard($event)">
      준비
    </button>
    <button v-show="status != 'play'" type="button" class="btn btn-primary button_user" :disabled="user != 3"
    @touchstart="preventBoard($event)">
      준비
    </button>
    <button v-show="status != 'play'" type="button" class="btn btn-primary button_user" :disabled="user != 4"
    @touchstart="preventBoard($event)">
      준비
    </button>
    <button v-show="status == 'play'" type="button" class="btn btn-primary button_user" :disabled="user != 1"
    @click="AddCount()" v-touch:press="AddCount" @touchstart="preventBoard($event)">
      선수 1
    </button>
    <button v-show="status == 'play'" type="button" class="btn btn-primary button_user" :disabled="user != 2"
    @click="AddCount()" v-touch:press="AddCount" @touchstart="preventBoard($event)">
      선수 2
    </button>
    <button v-show="status == 'play'" type="button" class="btn btn-primary button_user" :disabled="user != 3"
    @click="AddCount()" v-touch:press="AddCount" @touchstart="preventBoard($event)">
      선수 3
    </button>
    <button v-show="status == 'play'" type="button" class="btn btn-primary button_user" :disabled="user != 4"
    @click="AddCount()" v-touch:press="AddCount" @touchstart="preventBoard($event)">
      선수 4
    </button>
  </div>
</template>

<script>
import Stomp from "stompjs";
  // import SampleComponent from '@/components/SampleComponent.vue'

  export default {
    name: 'Button',
    data() {
      return {
        counter: 5,
        user: null,
        count: null,
        status: "ready",
        users: {
          1: { "user": 1, "count": 0, "winner": false },
          2: { "user": 2, "count": 0, "winner": false },
          3: { "user": 3, "count": 0, "winner": false },
          4: { "user": 4, "count": 0, "winner": false }
        },
        time: 10,
        timer: '',
        stomp: {
          alertTimer: null,
          stompClient: "",
          headers: "",
          send: "",
          isSubscription: false,
          data: {
            clientId: '',
            user: '',
            count: '',
            start: false,
            status: ''
          }
        },
      };
    },
    methods: {
      preventBoard(Event) {
        // this.logs.push("Event.preventDefault() : " + Event.type)
        Event.preventDefault()
      },
      receiveMessage(message) {
        try {
          var body = JSON.parse(message.body)

          if (body.clientId == this.stomp.data.clientId) {  // 구독 확인을 위해, 본인 메시지를 보내고 받아서 확인 함
            // console.log("message.body in receiveMessage : ", body)
            this.stomp.isSubscription = true
          }
          if (body.start) {
            console.log("message.body in receiveMessage : ", body)
            // this.messages.push(body.keyword)
            this.CountDown(body)
          }
          if (body.user) {
            console.log("message.body in receiveMessage : ", body)
            this.users[body.user]['count'] = body.count
          }
        } catch (err) {
          console.log("error in receiveMessage : ", err); // 예외 처리를 던짐
          // this.logs.push(this.getDate() + " - " + "error in receiveMessage")
        }
      },
      
      getDate() {
        const nowDate = new Date()
        const id = nowDate.getFullYear()
        + "/" + (nowDate.getMonth()+1)
        + "/" + nowDate.getDate()
        // + "/" + nowDate.getDay()
        + "_" + nowDate.getHours()
        + ":" + nowDate.getMinutes()
        + ":" + nowDate.getSeconds()
        + "." + nowDate.getMilliseconds()
        return id
      },

      stompConnect() {
        const ws = new WebSocket('wss://vuejs.co.kr:15673/ws');
        // console.log(ws); 
        this.stomp.stompClient = Stomp.over(ws);
        this.stomp.stompClient.debug = null // 디버그 모드 오프(운영 배포시 반영 필요)

        const getDate = this.getDate()
        // const logs = this.logs
        const on_connect = function() {
          console.log(getDate + " - open button game connected")
          // logs.push(getDate + " - open chat connected")
        };
        const on_error =  function() {
          console.log(getDate + " - open chat disconnected")
          // logs.push(getDate + " - open chat disconnected")
        };
        
        this.stomp.headers = {
          login: 'guest',
          passcode: 'oraclerabbitmq',
          "client-id": this.stomp.data.clientId
        };
        try {
          this.stomp.stompClient.connect(this.stomp.headers, on_connect, on_error);
        } catch (err) {
          console.log("error in stompConnect : ", err); // 예외 처리를 던짐
          // this.logs.push(this.getDate() + " - " + "error in stompConnect")
        }
      },
      stompSubscribe() {
        this.debounce = setTimeout(() => {
          try {
            this.stomp.subscription = this.stomp.stompClient.subscribe(
              "/exchange/stompButton/",
              this.receiveMessage,
              // {id: this.stomp.data.clientId}
            );
          } catch (err) {
            console.log("error in stompSubscribe : ", err); // 예외 처리를 던짐
            // this.logs.push(this.getDate() + " - " + "error in stompSubscribe")
          }
          
          // console.log("this.stompClient.connected : ", this.stompClient.connected)
          // console.log("client : ", this.stompClient)
          this.stomp.isSubscription = true
        }, 500)
      },
      stompUnsubscribe() {  // 수동 테스트용 함수
        try {
          this.stomp.subscription.unsubscribe(this.stomp.data.clientId)
        } catch (err) {
          console.log("error in stompUnsubscribe : ", err); // 예외 처리를 던짐
          // this.logs.push(this.getDate() + " - " + "error in stompUnsubscribe")
        }
        
        console.log("this.stomp.subscription", this.stomp.subscription)
        this.stomp.isSubscription = false
      },

      send(data) {
        try {
          this.stomp.send = this.stomp.stompClient.send('/exchange/stompButton', {}, JSON.stringify(data))
        } catch (err) {
          console.log("error in send : ", err); // 예외 처리를 던짐
          // this.logs.push(this.getDate() + " - " + "error in send")
        }
      },
      StartGame() {
        let data = {...this.stomp.data}
        data.start = true
        this.send(data)
        // this.stomp.data.start = false
      },
      CountDown(body) {
        // console.log("CountDown : ", body)
        this.count = 0
        this.users['1']['count'] = 0
        this.users['2']['count'] = 0
        this.users['3']['count'] = 0
        this.users['4']['count'] = 0
        if (!this.stomp.data.start) {
          console.log("if in CountDown : ", body)
          this.status = 'counting'
          // this.stomp.data.start = body.start
          this.counter = 5
          this.timer = setInterval(() => {
            if (this.counter > 0) {
              this.counter -= 1
            }
            else {
              this.status = 'play'
              clearInterval(this.timer);
              this.Counting()
            }
          }, 1000)
        }
      },
      AddCount() {
        this.count += 1
        let data = {...this.stomp.data}
        data.user = this.user
        data.count = this.count
        this.send(data)
        console.log(this.count)
      },
      Counting() {
        this.timer = setInterval(() => {
          if (this.time > 0) {
            this.time -= 1
          }
          else {
            this.status = 'ready'
            this.time = 10
            this.counter = 5
            clearInterval(this.timer);
          }
        }, 1000)
      }
    },
    components: {
      // SampleComponent
    },
    mounted() {
      this.stomp.data.clientId = this.getDate() + "_" + parseInt(Math.random() * 10000, 10)
      // this.logs.push(this.stomp.data.clientId)
      this.stompConnect() //stomp
      this.stompSubscribe()

      this.stomp.alertTimer = setInterval(() => {
        if (this.stomp.stompClient.connected) {
          if (this.stomp.isSubscription) {
            // this.debounce = setTimeout(() => {this.send()}, 1000)
            let data = {...this.stomp.data}
            this.send(data)
          } else {
            if (this.isMobile) { // 모바일은 브라우저 비활성화 시 disconnect, unsubscribe 됨
              // console.log(this.getDate() + " - " + "only mobile")
              // this.logs.push(this.getDate() + " - " + "only mobile")
              this.stompConnect()
              this.stompSubscribe()
            }
          }
        } else {
          this.stompConnect()
          this.stompSubscribe()
        }
        this.stomp.isSubscription = false
      }, 10000)
    },
    unmounted() {
      console.log('unmounted, clearInternal')
      clearInterval(this.timer);
      clearInterval(this.stomp.alertTimer)
      this.stomp.subscription.unsubscribe()
      this.stomp.stompClient.disconnect(this.stomp.headers)
    },
  }
</script>

<style scoped>
.NoTouchAction {
  touch-action: none;
}
.SelectUser {
  font-size: 20px;
  margin: 10px 10px 10px 0px;
}
.button_start {
  margin: 10px;
  background-color: red;
  color: black;
}
.button_user {
  margin: 5px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
}
.font20 {
  font-size: 20px;
}
</style>