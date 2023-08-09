<template>
  <div>
    <div class="boardMenu"
      @contextmenu.prevent
      @touchstart="preventBoard($event)">
    </div>
    <span v-show="locked" class="sketchLockButton" @click="unlock">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
      </svg>
    </span>
    <span v-show="locked" class="resetBoardButton">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
      </svg>
    </span>
    <span v-show="!locked" class="sketchLockButton" @click="lock">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-unlock-fill" viewBox="0 0 16 16">
        <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2z"/>
      </svg>
    </span>
    <span v-show="!locked" class="resetBoardButton" @click="changeBoard(canvasSetting.canvasColor)">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
      </svg>
    </span>
    <span class="whiteBoardButton" @click="changeBoard('white')">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-clipboard2" viewBox="0 0 16 16">
        <path d="M3.5 2a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-12a.5.5 0 0 0-.5-.5H12a.5.5 0 0 1 0-1h.5A1.5 1.5 0 0 1 14 2.5v12a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-12A1.5 1.5 0 0 1 3.5 1H4a.5.5 0 0 1 0 1h-.5Z"/>
        <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5Z"/>
      </svg>
    </span>
    <span class="blackBoardButton" @click="changeBoard('black')">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-clipboard2-fill" viewBox="0 0 16 16">
        <path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5h3Z"/>
        <path d="M3.5 1h.585A1.498 1.498 0 0 0 4 1.5V2a1.5 1.5 0 0 0 1.5 1.5h5A1.5 1.5 0 0 0 12 2v-.5c0-.175-.03-.344-.085-.5h.585A1.5 1.5 0 0 1 14 2.5v12a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-12A1.5 1.5 0 0 1 3.5 1Z"/>
      </svg>
    </span>
    <span class="whiteBoardPen" @click="changePenSend(({'strokeStyle':'black', 'lineWidth':'3'}))">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
      </svg>
    </span>
    <span class="blackBoardPen" @click="changePenSend({'strokeStyle':'white', 'lineWidth':'3'})">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
      </svg>
    </span>
    <span class="clearBoard" @click="changePenSend({'strokeStyle':canvasSetting.canvasColor, 'lineWidth':'15'})">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-eraser" viewBox="0 0 16 16">
        <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414l-3.879-3.879zM8.746 13.547 3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z"/>
      </svg>
    </span>

    <!-- 이벤트 발생 테스트 -->
    <!-- <button class="sketchTestButton"
      @click="warn('@click : ', $event)"
      @dblclick="warn('@double-click : ')"
      @right-click="warn('@double-click : ', $event)"
      @contextmenu="warn('@contextmenu : ', $event)"
      @touchstart="warn('@touchstart : ', $event)"
      @touchmove="warn('@touchmove : ', $event)"
      @touchend="warn('@touchend : ', $event)"
      v-touch:press="warn('touchstart : ')"
      v-touch:tap="warn('v-touch:tap : ')"
      v-touch:release="warn('v-touch:tap : ')"
    >Event</button> -->
    
    <!-- <button class="sketchLogsButton"
      v-touch:press="popupLogs"
      @contextmenu.prevent
      @touchstart="preventBoard($event)"
    >Logs</button> -->

    <span id="sketchLogsButton" class="sketchLogsButton" data-bs-toggle="modal" data-bs-target="#sketchLogs">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-info-square" viewBox="0 0 16 16">
        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
      </svg>
    </span>
    <div class="modal fade" id="sketchLogs" tabindex="-1" aria-labelledby="sketchLogsModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="alertModalLabel">Logs</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
              <div v-for="log in logs" :key="log.key">
                <p style="text-align: left; margin: 0 0 0 2px;">{{ log }}</p>
              </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
          </div>
        </div>
      </div>
    </div>

    <div class="boardBack"
      @contextmenu.prevent
      @touchstart="preventBoard($event)"
    ></div>
    <!-- <div class="boardMenu"  
      @mousedown="preventBoard($event)"
      @contextmenu.prevent
      @touchstart="preventBoard($event)"
    ></div> -->
      <!-- vue3-touch-events 사용하여 구현, drag 빈도 조절이 가능함(main.js) -->
      <canvas id="sketchBoard" :style="cssSketchBoard" width="348" :height="canvasSetting.height"
        @mousedown="startPainting($event, '@mousedown')"
        @mouseup="finishedPainting($event, '@mouseup')"
        @mousemove="draw"
        v-touch:press="startPainting"
        v-touch:release="finishedPainting"
        v-touch:drag="draw"
        v-touch:rollover="draw"
        @contextmenu.prevent
        @touchstart="preventBoard"
      ></canvas>

      <!-- 기본 이벤트로 구현 -->
      <!-- <canvas id="sketchBoard" :style="cssSketchBoard" width="348" height="637"
        @mousedown="startPainting($event, '@mousedown')"
        @mouseup="finishedPainting($event, '@mouseup')"
        @mousemove="draw"
        @touchstart="startPainting($event, '@touchstart')"
        @touchend="finishedPainting($event, '@touchend')"
        @touchmove="draw"
        @contextmenu.prevent
      ></canvas> -->
  </div>
</template>

<script>
import Stomp from "stompjs";

  export default {
    name: 'Sketch',
    data() {
      return {
        isMobile: null,
        logs: [],
        locked: false,
        cssSketchBoard: {
          'touch-action': null,
          'pointer-events': null
        },
        canvasSetting: {
          height: "",
          canvasColor: "white",
          strokeStyle: "black",
          lineWidth: 3,
          lineCap: "round",
        },
        vueCanvas: null,
        painting: false,
        canvas: null,
        ctx: null,
        currX: null,
        currY: null,
        stomp: {
          alertTimer: null,
          stompClient: "",
          headers: "",
          send: "",
          isSubscription: false,
          data: {
            x: null,
            y: null,
            painting: false,
            board: {
              canvasColor: false,
              strokeStyle: false,
              lineWidth: false,
            },
            clientId: "",
          }
        },
      }
    },
    components: {
      // SampleComponent
    },
    beforeCreate() { 
      console.log("beforeCreate")
    },
    created() { 
      this.logs.push(this.getDate() + " - " + "created")
      console.log(this.getDate() + " - " + "created")
      this.getCanvasHeight()
    },
    beforeMount() {
      this.logs.push(this.getDate() + " - " + "beforeMount")
      console.log(this.getDate() + " - " + "beforeMount")
    },
    beforeUpdate() { 
      this.logs.push(this.getDate() + " - " + "beforeUpdate") 
      console.log(this.getDate() + " - " + "beforeUpdate") 
    },
    updated() {
      console.log(this.getDate() + " - " + "updated")
      this.setCanvas()
    },
    beforeUnmount() { 
      this.logs.push(this.getDate() + " - " + "beforeUnmount") 
      console.log(this.getDate() + " - " + "beforeUnmount")
    },
    errorCaptured() { 
      console.log(this.getDate() + " - " + "errorCaptured") 
    },
    renderTracked() { 
      console.log(this.getDate() + " - " + "renderTracked") 
    },
    renderTriggered() { 
      console.log(this.getDate() + " - " + "renderTriggered")
    },
    mounted() {
      // console.log(this.getDate() + " - " + "mounted")
      // console.log(window.navigator.userAgent)
      // this.logs.push(this.getDate() + " - " + "mounted")
      // this.logs.push(window.navigator.userAgent)

      window.addEventListener('resize', () => {
        // We execute the same script as before
        this.getCanvasHeight()
      });

      // this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent); // 안드로이드 아이폰을 검사해 체크 
      this.isMobile = /Mobi/i.test(window.navigator.userAgent); // "Mobi" 가 User agent에 포함되어 있으면 모바일
      
      this.setCanvas()

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
    },
    unmounted() {
      clearInterval(this.stomp.alertTimer)
      // console.log(this.getDate() + " - " + "unmounted")
      // this.logs.push(this.getDate() + " - " + "unmounted")
      this.stomp.subscription.unsubscribe()
      this.stomp.stompClient.disconnect(this.stomp.headers)
    },
    methods: {
      setCanvas(){
        this.canvas = document.getElementById("sketchBoard");
        this.ctx = this.canvas.getContext("2d")
        this.ctx.strokeStyle = this.canvasSetting.strokeStyle
        this.ctx.lineWidth = this.canvasSetting.lineWidth
        this.ctx.lineCap = this.canvasSetting.lineCap
      },
      getCanvasHeight() {
        this.canvasSetting.height = (window.innerHeight - 10 - 70 - 40 - 55 - 32)
        if (this.canvasSetting.height > 637) { this.canvasSetting.height = 635 }
      },
      warn(message, event) {
        try {
          // now we have access to the native event
          if (event) {
            event.preventDefault()
            this.logs.push(message + event.type)
          }
          // alert(this.logs)
        } catch (err) {
          console.log("error in warn : ", err); // 예외 처리를 던짐
          this.logs.push(this.getDate() + " - " + "error in warn")
        }
      },
      preventBoard(Event) {
        // this.logs.push("Event.preventDefault() : " + Event.type)
        Event.preventDefault()
      },
      popupLogs() {
        alert(this.logs)
      },
      lock() {
        this.cssSketchBoard['pointer-events'] = 'none'
        this.locked = !this.locked
      },
      unlock() {
        this.cssSketchBoard['pointer-events'] = null
        this.cssSketchBoard['touch-action'] = 'none'
        this.locked = !this.locked
      },
      changePenSend(data) {
        this.stomp.data.board.strokeStyle = data.strokeStyle
        this.stomp.data.board.lineWidth = data.lineWidth
        this.send()
        this.stomp.data.board.strokeStyle = false
        this.stomp.data.board.lineWidth = false
      },
      changeBoard(color) {
        this.stomp.data.board.canvasColor = color
        this.send()
        this.stomp.data.board.canvasColor = false
      },
      changePen(color, width) {
        this.ctx.strokeStyle = color
        this.ctx.lineWidth = width
      },
      chargeBoard(color) {
        this.canvasSetting.canvasColor = color
        this.ctx.fillStyle = color
        this.ctx.globalAlpha = 1
        this.ctx.fillRect(0, 0, 368, 687)
      },
      startPainting() {
        this.painting = true
        // this.logs.push("startPainting")
        // this.getPosition(Event) // 터치/클릭 만 해도 그려지도록 하기 위해
        // this.send() // 터치/클릭 만 해도 그려지도록 하기 위해
        // Event.preventDefault()
      },
      draw(Event) {
        if(!this.painting) { return }
        this.getPosition(Event)
        this.send()
      },
      finishedPainting() {
        this.painting = false;
        // console.log(this.painting)
        // this.logs.push("finishedPainting")
        this.send()
        this.ctx.beginPath()
        this.currX = null
        this.currY = null
      },
      getPosition(Event) {
        if(Event.touches && window.innerWidth <= 480) { // for mobile, 390
          this.currX = (Event.touches[0].clientX - 20)
          this.currY = (Event.touches[0].clientY - 90- 40)
          // console.log("mobile_currX:currY :", this.currX + ":" + this.currY)
        } else if(Event.touches && window.innerWidth > 480) { // for mobile width, 390
          this.currX = (Event.touches[0].clientX - 170)
          this.currY = (Event.touches[0].clientY - 90- 40)
          // console.log("mobile_currX:currY :", this.currX + ":" + this.currY)
        } else if (Event.clientX) {
          this.currX = (Event.clientX - 170)
          this.currY = (Event.clientY - 90 - 40)
          // console.log("mobile_currX:currY :", this.currX + ":" + this.currY)
        }
      },
      receiveMessage(message) {
        try {
          var body = JSON.parse(message.body)

          if (body.clientId == this.stomp.data.clientId) {  // 구독 확인을 위해, 본인 메시지를 보내고 받아서 확인 함
            console.log("message.body in receiveMessage : ", body)
            // this.logs.push(body.clientId + "/" + body.clear + "/" + body.painting + "/" + body.x + ":" + body.y)
            this.stomp.isSubscription = true
          }
          
          var x = body.x
          var y = body.y
          if (body.board.canvasColor) {
            // this.ctx.clearRect(0, 0, 368, 687)
            this.chargeBoard(body.board.canvasColor)
          } else if (body.board.strokeStyle && body.board.lineWidth) {
            this.changePen(body.board.strokeStyle, body.board.lineWidth)
          } else if (!body.clear && !body.painting) {
            if(!x || !y) { return }
            this.ctx.lineTo(x, y)
            this.ctx.stroke()
            this.ctx.beginPath()
          } else {
            if(!x || !y) { return }
            this.drawScreen(x, y)
          }
        } catch (err) {
          console.log("error in receiveMessage : ", err); // 예외 처리를 던짐
          this.logs.push(this.getDate() + " - " + "error in receiveMessage")
        }
      },
      drawScreen(x, y) {
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
        this.ctx.beginPath()
        this.ctx.lineTo(x, y)
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
          console.log(getDate + " - canvas connected")
          logs.push(getDate + " - canvas connected")
        };
        const on_error =  function() {
          console.log(getDate + " - canvas disconnected")
          logs.push(getDate + " - canvas disconnected")
        };
        
        this.stomp.headers = {
          login: 'guest',
          passcode: 'oraclerabbitmq',
          // additional header
          // 'client-id': "vuejs_" + this.getDate() + "_" + parseInt(Math.random() * 10000, 10)
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
              "/exchange/stompSketch/",
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
      send() {
        this.stomp.data.x = this.currX
        this.stomp.data.y = this.currY
        this.stomp.data.painting = this.painting
        try {
          this.stomp.send = this.stomp.stompClient.send('/exchange/stompSketch', {}, JSON.stringify(this.stomp.data))
        } catch (err) {
          console.log("error in send : ", err); // 예외 처리를 던짐
          this.logs.push(this.getDate() + " - " + "error in send")
        }
      },
    },
  }
</script>

<style scoped>

header {
  display: none;
}
.boardBack {
  position: absolute;
  border: 10px solid white;
  background-color: white;
  left: 0px;
  top: 0px;
  width: calc(100vw - 16px - 6px);

  /* for webapp */
  /* height: calc(100vh - 16px - 70px - 55px - 6px); */
  /* for browser */
  height: calc(100vh - 16px - 70px - 55px - 6px - 60px);
  z-index: 1;
}
.boardMenu {
  position: absolute;
  border: 1px solid gray;
  background-color: white;
  width: calc(100vw - 16px - 6px);
  height: 40px;
  z-index: 5;
  /* 스크롤 비활성화 */
  touch-action: none;
}
#sketchBoard {
  position: absolute;
  left: 0px;
  top: 40px;
  border: 10px solid #f0f4f5;
  /* overflow: auto; */
  z-index: 10;
}
.sketchLockButton {
  position: absolute;
  left: 2px;
  top: 3px;
  z-index: 100;
}
.resetBoardButton {
  position: absolute;
  display: block;
  left: 332px;
  top: 3px;
  z-index: 100;
}
.whiteBoardButton {
  position: absolute;
  left: 60px;
  top: 4px;
  z-index: 100;
}
.blackBoardButton {
  position: absolute;
  left: 100px;
  top: 4px;
  z-index: 100;
}
.whiteBoardPen {
  position: absolute;
  left: 160px;
  top: 4px;
  z-index: 100;
}
.blackBoardPen {
  position: absolute;
  left: 200px;
  top: 4px;
  z-index: 100;
}
.clearBoard {
  position: absolute;
  left: 260px;
  top: 4px;
  z-index: 100;
}
.sketchTestButton {
  position: absolute;
  left: 106px;
  top: 3px;
  z-index: +100;
}
.sketchLogsButton {
  position: absolute;
  left: 332px;
  top: 43px;
  z-index: 100;
  background-color: white;
}

@media screen and (min-width: 480px) {
  .boardBack {
    position: absolute;
    border: 10px solid white;
    background-color: white;
    left: 0px;
    top: 0px;
    width: calc(100vw - 16px - 150px - 6px);
    height: calc(100vh - 16px - 70px - 55px - 6px);
    z-index: 1;
    }
  .boardMenu {
    position: absolute;
    border: 1px solid gray;
    background-color: white;
    width: 368px;
    height: 40px;
    z-index: 5;
  }
  #sketchBoard {
    position: absolute;
    left: 0px;
    right: 0px;
    top: 40px;
    border: 10px solid #f0f4f5;
    z-index: 10;
  }
}
</style>