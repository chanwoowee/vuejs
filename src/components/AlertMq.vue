<template>
  <div>
    <span>Total {{ visitedCount }}</span><br>
    <span>Now {{ userCount }}</span>

  </div>
</template>
  
  <script>
  import axios from "axios";
  import Paho from "paho-mqtt";
  // import Paho from "../js/paho-mqtt";
  import Stomp from "stompjs";
  
  export default {
    name: "alertmq",
    el: '#alertmq',
    data() {
      return {
        isAlert: true, // 테스트 완료 후
        // isAlert: false, // 테스트 중
        alearTimer : '',
        users: [],
        userCount: '',
        visitedCount: '',
        sender: '',
        message: '',
        client: {
          client: "",
          message: "",
          connected: false,
        },
        response: '',
        error: '',
        connectedTime: '',
        connection: {
          // host: "10.20.30.94",
          host: "vuejs.co.kr",
          port: 15674,
          endpoint: "/ws",
          clean: true, // Reserved session
          connectTimeout: 4000, // Time out
          reconnectPeriod: 4000, // Reconnection interval
          // Certification Information
          clientId: "vuejs",
          username: "guest",
          password: "oraclerabbitmq",
        },
        stompClient: "",
        subscription: "",
        clientId: "",
        headers: "",
        Paho: "",
      }
    },
    computed: {
    },
    mounted() {
      // this.alertTimer = setInterval(() => { // paho test
      //   this.pahoConnection() 
      // }, 5000)
      // this.pahoConnection() // paho
      // this.debounce = setTimeout(() => {this.pahoSubscribe()}, 1000) // 테스트 완료 후 조건
      

      // this.stompConnect() //stomp
      this.alertTimer = setInterval(() => {
        if (this.isAlert) {
          this.getConnections() // 소켓연결(connect) 수 확인하기 위해
          // console.log("!this.stompClient", this.stompClient)
          if (!this.stompClient.connected) {
            // this.stompConnect()
          } else { // 구독 끊겼을 때 상태조건 추가 후 구독하는 기능 넣기
            // );
          }
        }
      }, 5000)

      this.publishMessage()
      this.getMessageLists()
      this.getConnections()
    },
    unmounted() {
      // for paho
      // if(this.client.client.clientId) {
      //   if(this.client.client.isConnected()) {
      //     this.pahoDisConnect();
      //   }
      // }
      clearInterval(this.alertTimer);
      // this.subscription.unsubscribe()
      // this.stompClient.disconnect(this.headers)
    },
    components: {
      // CallAxios
    },
    methods: {
      stompConnect() {
        const ws = new WebSocket('wss://vuejs.co.kr:15673/ws');
        this.stompClient = Stomp.over(ws);
        this.stompClient.debug = null // 디버그 모드 오프(운영 배포시 반영 필요)

        const getDate = this.getDate()
        const on_connect = function() {
          console.log(getDate + " - alert connected");
        };
        const on_error =  function() {
          console.log(getDate + '- alert disconnected');
        };
        // const on_close = function() {
        //   console.log(getDate + '- unsubscibe');
        // }
        
        this.headers = {
          login: 'guest',
          passcode: 'oraclerabbitmq',
          // additional header
          'client-id': "vuejs_" + getDate + "_" + parseInt(Math.random() * 10000, 10)
        };
        try {
          this.stompClient.connect(this.headers, on_connect, on_error);
        } catch (err) {
          console.log("error in stompConnect : ", err);
        }

        this.debounce = setTimeout(() => {
          this.clientId = "vuejs_" + this.getDate() + "_" + parseInt(Math.random() * 10000, 10)
          try {
            this.subscription = this.stompClient.subscribe(
              "/exchange/stompExchanges", 
              function(message) {
                console.log("message : ", message.body);
              },
              // {id: 'alert'}
            );
          } catch (err) {
            console.log("error in stompConnect's setTimeout : ", err);
          }
          // console.log("this.stompClient.connected : ", this.stompClient.connected)
          // console.log("client : ", this.stompClient)
        }, 1000)
      },
      pahoConnection() {
        // console.log("pahoConnection");
        // var wsbroker = location.hostname; // mqtt websocket enabled broker
        // var wsbroker = "10.20.6.238";
        // var wsport = 15675; // port for above
        // var wsbroker = "130.162.128.227";  // for oracle IP
        // var wsport = 15675;  // for oracle IP
        var wsbroker = "vuejs.co.kr";  // for oracle Domain
        var wsport = 15676;  // for oracle Domain
        // console.log("Paho : ", Paho.MQTT.Client)
        this.client.client = new Paho.Client(
          wsbroker,
          wsport,
          "/ws",
          // "vuejs_" + String(Date.now()) + parseInt(Math.random() * 10000, 10)
          "vuejs_" + this.getDate() + "_" + parseInt(Math.random() * 10000, 10)
        );
        // console.log("this.client.client : ", this.client.client)
        // console.log("clientId : ", this.client.client.clientId)
        this.client.client.onConnectionLost = function (responseObject) {
          // this.toggleIsAlert()
          console.log("CONNECTION LOST - " + responseObject.errorMessage);
        };
        this.client.client.onMessageArrived = function (message) {
          // console.log('Received message : ', message);
          // console.log(
          //   "RECEIVE ON " +
          //     message.destinationName +
          //     " PAYLOAD : " +
          //     message.payloadString
          // );
          // let ele = document.getElementById(time)
          // let ele = document.getElementsByClassName("data-bs-toggle")
          // console.log("ele : ", ele)
          alert(message.payloadString)
          // document.location.reload() // 메시지 받고, 페이지 강제로 새로고침 하기 위함
          // confirm(message.payloadString)
        };
        var options = {
          timeout: 5,
          keepAliveInterval: 30,
          onSuccess: function () {
            console.log("CONNECTION SUCCESS");
            // console.log("onSuccess!!!")
          },
          onFailure: function (message) {
            console.log("CONNECTION FAILURE - " + message.errorMessage);
          },
        };
        if (location.protocol == "https:") {
          options.useSSL = true;
        }
        // console.log("before connect : ", this.client.client)
        this.client.client.uri
        this.client.client.connect(options);
        // console.log("CONNECT TO ", wsbroker + ":" + wsport);
  
        this.debounce = setTimeout(() => {
          // console.log("after connect : ", this.client.client)
          // console.log("this.client.client.uri : ", this.client.client.uri)
          // console.log("this.client.client.isConnected() : ", this.client.client.isConnected())
        }, 500)
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
      updateIsAlert() {
        if(this.client.client.clientId) {
          if(!this.client.client.isConnected()) {
            // this.isAlert = false // 테스트 중 조건
            this.pahoConnection() // 테스트 완료 후 조건
            this.debounce = setTimeout(() => {this.pahoSubscribe()},500) // 테스트 완료 후 조건
            // this.pahoSubscribe()
            // console.log("알림 설정")
          }
        }
      },
      toggleIsAlert() {
        if (this.isAlert) {
          if(this.client.client.clientId) {
            if(this.client.client.isConnected()) {
              this.pahoDisConnect()
            }
          }
          this.isAlert = !this.isAlert
        } else {
          this.pahoConnection()
          this.debounce = setTimeout(() => {this.pahoSubscribe()},500)
          // this.pahoSubscribe()
          this.isAlert = !this.isAlert
        }
      },
      pahoDisConnect() {
        // console.log("pahoDisConnect");
        this.client.client.disconnect();
      },
      pahoSubscribe() {
        console.log("pahoSubscribe");
        // this.client.client.subscribe("#/alert", { qos: 1 })
        this.client.client.subscribe("topic")
        // this.debounce = setTimeout(() => {this.client.client.subscribe("#/alert", { qos: 1 })},500)
      },
      pahoSendMessage() {
        // console.log("pahoSendMessage");
        this.client.message = new Paho.Message(this.message + "\n\nfrom. " + this.sender);
        this.client.message.destinationName = "vuejs.alert";
        // debug("SEND ON " + message.destinationName + " PAYLOAD " + data);
        // console.log("this.client : ", this.client);
        this.client.client.send(this.client.message);
      },
      getConnections() {
        axios({
          method: "get",
          url: "https://vuejs.co.kr:15671/api/connections",
          auth: {
            username: "guest",
            password: "oraclerabbitmq",
          },
        })
          .then((response) => {
            this.userCount = response.data.length
          })
          .catch((error) => {
            this.error = error
          })
          .then(function () {
          });
      },
      getQueueLists() {
        this.users = []
        axios({
          method: "get",
          // url: "http://130.162.128.227:15672/api/queues/%2F", // production 모드에서 호출 되는문법
          url: "https://vuejs.co.kr:15671/api/queues/%2F", // production 모드에서 호출 되는문법
          // url: "https://lastpeople.kr/rabbitmq/#/api/queues/%2F", // production 모드에서 호출 되는문법
          auth: {
            username: "guest",
            password: "oraclerabbitmq",
          },
        })
          .then((response) => {
            // console.log(
            //   "axios post response : " + JSON.stringify(response, null, 2)
            // );
            this.userCount = response.data.length - 1
            // console.log("this.userCount : ", this.userCount)
            for (let data of response.data) {
              this.users.push(data.name)
            }
            // console.log(this.users)
          })
          .catch((error) => {
            // console.log("catch : ", error);
            this.error = error
          })
          .then(function () {
            // console.log("axio then : ");
          });
      },
      getMessageLists() {
        this.users = []
        axios({
          method: "get",
          // url: "http://lastpeople.kr:15672/api/queues/%2F/vuejsVisited", // production 모드에서 호출 되는문법
          url: "https://vuejs.co.kr:15671/api/queues/%2F/vuejsVisited", // production 모드에서 호출 되는문법
          auth: {
            username: "guest",
            password: "oraclerabbitmq",
          },
        })
          .then((response) => {
            // console.log(
            //   "axios post response : " + JSON.stringify(response, null, 2)
            // );
            this.visitedCount = response.data.messages
            // console.log("this.visitedCount : ", this.visitedCount)
          })
          .catch((error) => {
            // console.log("catch : ", error);
            this.error = error
          })
          .then(function () {
            // console.log("axio then : ");
          });
      },
      publishMessage() {
        this.users = []
        axios({
          method: "post",
          // url: "http://lastpeople.kr:15672/api/exchanges/%2F/vuejsVisited/publish",
          url: "https://vuejs.co.kr:15671/api/exchanges/%2F/vuejsVisited/publish",
          headers: {
            'Content-Type': 'application/json'
            // content-type: "application/json"
          },
          auth: {
            // username: "guest",
            // password: "guest",
            'username': 'guest',
            'password': 'oraclerabbitmq',
          },
          data: {
            // properties: {},
            // routing_key: "vuejs.alert",
            // payload: this.message,
            // payload_encoding: "string",
  
            'properties': {'delivery_mode': 2},
            'routing_key': 'vuejs.visited',
            'payload': this.getDate(),
            'payload_encoding': 'string',
          },
        })
        .then((response) => {
          // console.log(
          //   "axios post response : " + JSON.stringify(response, null, 2)
          // );
          this.response = response.data;
          // console.log("this.response : ", this.response)
        })
        .catch((error) => {
          this.error = error
          // console.log("catch : " + error);
        })
        .then(function () {
          // console.log("axio then : ");
        });
      },
      createExchange() {
        this.users = []
        axios({
          method: "put",
          url: "/rabbitmq/api/exchanges/%2F/vuejs.direct",
          auth: {
            username: "guest",
            password: "oraclerabbitmq",
          },
          data: {
            type: "topic",
            auto_delete: false,
            durable: true,
            internal: false,
            arguments: {},
          },
        })
          .then((response) => {
            console.log(
              "axios post response : " + JSON.stringify(response, null, 2)
            );
            // this.r_mq = response.data;
          })
          .catch((error) => {
            console.log("catch : " + error);
          })
          .then(function () {
            console.log("axio then : ");
          });
      },
      createQueue() {
        axios({
          method: "put",
          // url: "/rabbitmq/api/queues/%2F/test", 
          url: "/rabbitmq/api/queues/%2F/vuejs_" + this.connectedTime,
          auth: {
            username: "guest",
            password: "oraclerabbitmq",
          },
          data: {
            auto_delete: true,
            durable: true,
            arguments: {},
          },
        })
          .then((response) => {
            console.log(
              "axios post response : " + JSON.stringify(response, null, 2)
            );
            // this.r_mq = response.data;
          })
          .catch((error) => {
            console.log("catch : " + error);
          })
          .then(function () {
            console.log("axio then : ");
          });
      },
      bindingsExchange() {
        axios({
          method: "post",
          url: "/rabbitmq/api/bindings/%2F/e/vuejs.direct/q/vuejs_" + this.connectedTime,
          auth: {
            username: "guest",
            password: "oraclerabbitmq",
          },
          data: {
            routing_key: "vuejs.alert",
          },
        })
          .then((response) => {
            console.log(
              "axios post response : " + JSON.stringify(response, null, 2)
            );
            // this.r_mq = response.data;
          })
          .catch((error) => {
            console.log("catch : " + error);
          })
          .then(function () {
            console.log("axio then : ");
          });
      },
      deleteQueue() {
        axios({
          method: "delete",
          // url: "/rabbitmq/api/queues/%2F/test", 
          url: "/rabbitmq/api/queues/%2F/vuejs_" + this.connectedTime,
          auth: {
            username: "guest",
            password: "oraclerabbitmq",
          },
          // data: {
          //   auto_delete: false,
          //   durable: true,
          //   arguments: {},
          // },
        })
          .then((response) => {
            console.log(
              "axios post response : " + JSON.stringify(response, null, 2)
            );
            // this.r_mq = response.data;
          })
          .catch((error) => {
            console.log("catch : " + error);
          })
          .then(function () {
            console.log("axio then : ");
          });
      },
      getMessage() {
        axios({
          method: "post",
          url: "/rabbitmq/api/queues/%2F/vuejs_" + this.connectedTime + "/get",
          auth: {
            username: "guest",
            password: "oraclerabbitmq",
          },
          data: {
            count: 1,
            ackmode: "ack_requeue_false",
            encoding: "auto",
            truncate: 50000,
          },
        })
          .then((response) => {
            console.log(
              "axios post response : " + JSON.stringify(response, null, 2)
            );
            this.response = response.data;
            console.log(this.response)
          })
          .catch((error) => {
            console.log("catch : " + error);
          })
          .then(function () {
            console.log("axio then : ");
          });
      },
    },
  };
  </script>
  
  <style>
  
  .mb-3 {
    text-align: left;
  }
  
  </style>