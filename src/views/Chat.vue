<template>
  <h2>Open Chat</h2>
  <div id="chat" :style="ChatStyle" ref="ChatMessages">
    <div id="messagesid">
      <ChatLine v-for="(message, index) in messages" :key="index" :idx="index" :received="message"></ChatLine>
    </div>
  </div>
  <div>
    <input
      id="ChatInput"
      ref="focusMe"
      autocomplete="off"
      @keyup.enter="chat"
      v-model.trim="keyword"
      placeholder="Type here..."
    />
  </div>
</template>

<script>
import Stomp from "stompjs";
import ChatLine from "../components/ChatLine"

  export default {
    name: 'Chat',
    data() {
      return {
        messages: [],
        messages_count: 0,
        keyword: '',
        isMobile: null,
        logs: [],
        stomp: {
          alertTimer: null,
          stompClient: "",
          headers: "",
          send: "",
          isSubscription: false,
          data: {
            keyword: '',
            clientId: '',
          }
        },
        ChatStyle: {
          "height": "calc((var(--vh, 1vh) * 100) - 16px - 70px - 150px)"
        }
      }
    },
    computed: {
    },
    components: {
      ChatLine
    },
    mounted() {
      window.addEventListener('resize', () => {
        // We execute the same script as before
        this.getChatStyle()
      });

      this.isMobile = /Mobi/i.test(window.navigator.userAgent); // "Mobi" 가 User agent에 포함되어 있으면 모바일

      this.stomp.data.clientId = this.getDate() + "_" + parseInt(Math.random() * 10000, 10)
      this.logs.push(this.stomp.data.clientId)
      this.stompConnect() //stomp
      this.stompSubscribe()

      this.stomp.alertTimer = setInterval(() => {
        if (this.stomp.stompClient.connected) {
          if (this.stomp.isSubscription) {
            // this.debounce = setTimeout(() => {this.send()}, 1000)
            this.send()
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
      }, 2000)

      this.$nextTick(() => this.$refs.focusMe.focus())
    },
    unmounted() {
      clearInterval(this.stomp.alertTimer)
      this.stomp.subscription.unsubscribe()
      this.stomp.stompClient.disconnect(this.stomp.headers)
    },
    methods: {
      getChatStyle() {
        this.ChatStyle.height = (window.innerHeight - 10 - 70 - 40 - 55 - 32)
      },
      popupLogs() {
        alert(this.logs)
      },
      receiveMessage(message) {
        try {
          var body = JSON.parse(message.body)

          if (body.clientId == this.stomp.data.clientId) {  // 구독 확인을 위해, 본인 메시지를 보내고 받아서 확인 함
            // console.log("message.body in receiveMessage : ", body)
            // this.logs.push(body.clientId + "/" + body.clear + "/" + body.painting + "/" + body.x + ":" + body.y)
            this.stomp.isSubscription = true
          }
          if (body.keyword) {
            // console.log("message.body in receiveMessage : ", body)
            this.messages.push(body.keyword)
            this.messages_count = this.messages.length - 1

            // document.querySelector("#app > div > section > div > div").scrollTop = 10000
            document.querySelector("#chat").scrollTop = 10000
          }
        } catch (err) {
          console.log("error in receiveMessage : ", err); // 예외 처리를 던짐
          this.logs.push(this.getDate() + " - " + "error in receiveMessage")
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
        const logs = this.logs
        const on_connect = function() {
          console.log(getDate + " - open chat connected")
          logs.push(getDate + " - open chat connected")
        };
        const on_error =  function() {
          console.log(getDate + " - open chat disconnected")
          logs.push(getDate + " - open chat disconnected")
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
          this.logs.push(this.getDate() + " - " + "error in stompConnect")
        }
      },
      stompSubscribe() {
        this.debounce = setTimeout(() => {
          try {
            this.stomp.subscription = this.stomp.stompClient.subscribe(
              "/exchange/stompChat/",
              this.receiveMessage,
              // {id: this.stomp.data.clientId}
            );
          } catch (err) {
            console.log("error in stompSubscribe : ", err); // 예외 처리를 던짐
            this.logs.push(this.getDate() + " - " + "error in stompSubscribe")
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
          this.logs.push(this.getDate() + " - " + "error in stompUnsubscribe")
        }
        
        console.log("this.stomp.subscription", this.stomp.subscription)
        this.stomp.isSubscription = false
      },
      chat() {
        if (this.keyword != '') {
          this.send(this.keyword)
        }
        this.keyword = ''
      },
      send(keyword) {
        this.stomp.data.keyword = keyword
        try {
          this.stomp.send = this.stomp.stompClient.send('/exchange/stompChat', {}, JSON.stringify(this.stomp.data))
        } catch (err) {
          console.log("error in send : ", err); // 예외 처리를 던짐
          this.logs.push(this.getDate() + " - " + "error in send")
        }
      },
    },
  }
</script>

<style scoped>
#chat {
  position: absolute;
  /* border: 1px solid; */
  padding: 10px 10px 30px 10px;
  width: 100%;
  /* height: calc(100vh - 16px - 16px - 70px - 50px - 90px); */
  /* margin: 0px 0px 0px 0px; */
  overflow: auto;
  text-align: left;
}
#ChatInput {
  position: absolute;
  left: 0;
  bottom: 0;
  border: 1px solid;
  width: 100%;
  /* height: calc(100vh - 16px - 16px - 70px - 50px); */
  overflow: auto;
  margin: 5px 0px 0px 0px;
  text-align: left;
}

/* footer { 
  border: 3px solid #00FA9A; 
  position: absolute;
  left: 0;
  bottom: 0;
  width: calc(100vw - 16px);
  height: 55px;
  touch-action: none;
} */
@media screen and (min-width: 480px) {
}
</style>