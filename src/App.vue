<template>
  <div class="app">
    <header>
      <Alert id="header_visited"></Alert>
      <!-- <h1 class="display-5" style="display: inline;">Vue.js</h1> -->
      <router-link id="headerHome" class="mobileHidden" to="/">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-house-door" viewBox="0 0 16 16">
          <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"/>
        </svg>
      </router-link>
      <div id="headerMenu" class="dropdown">
      <!-- <div class="dropdown"> -->
        <button class="btn btn-secondary dropdown-toggle pcHidden" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-justify" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
          </svg>
        </button>
        <ul class="dropdown-menu">
          <li><router-link to="/"><a class="dropdown-item">HOME</a></router-link></li>
          <li><router-link :to="{ name: 'Timecode' }"><a class="dropdown-item">TC GEN</a></router-link></li>
          <li><router-link :to="{ name: 'Sketch' }"><a class="dropdown-item">CANVAS</a></router-link></li>
          <li><router-link :to="{ name: 'Chat' }"><a class="dropdown-item">CHAT</a></router-link></li>
          <li><router-link :to="{ name: 'Lotto' }"><a class="dropdown-item">LOTTO</a></router-link></li>
          <li><router-link :to="{ name: 'Button' }"><a class="dropdown-item">BUTTON</a></router-link></li>
          <li><router-link :to="{ name: 'Var' }"><a class="dropdown-item">VAR</a></router-link></li>
        </ul>
      </div>
      <a id="headerPersonbadge" data-bs-toggle="modal" data-bs-target="#headerProfile">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-person-badge" viewBox="0 0 16 16">
          <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
          <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0h-7zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492V2.5z"/>
        </svg>
      </a>
      <div class="modal fade" id="headerProfile" tabindex="-1" aria-labelledby="headerProfileModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h6 class="modal-title" id="alertModalLabel">Profile</h6>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="card" style="width: 100%;">
                  <div class="card-body">
                    <h5 class="card-title">chuck</h5><br>
                    <p class="card-text">chanwoowee@gmail.com</p>
                  </div>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">Vue.js</li>
                    <li class="list-group-item">Express(Node.js)</li>
                    <li class="list-group-item">Django(Python)</li>
                    <li class="list-group-item">HTML/CSS</li>
                    <li class="list-group-item">RabbitMQ</li>
                    <li class="list-group-item">Elasticsearch</li>
                    <li class="list-group-item">ELK Stack</li>
                    <li class="list-group-item">Nginx</li>
                    <li class="list-group-item">Apatch Tomcat</li>
                    <li class="list-group-item">Docker compose</li>
                  </ul>
                  <!-- <div class="card-body">
                    <a href="http://kbs.co.kr/" target="_blank" class="card-link">KBS</a>
                    <a href="https://www.malgn.com/" target="_blank" class="card-link">MALGN</a>
                  </div> -->
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </header>
    <nav>
      <ul class="circle">
        <li><router-link to="/">HOME</router-link></li>
        <li><router-link :to="{ name: 'Timecode' }">TC GEN</router-link></li>
        <li><router-link :to="{ name: 'Sketch' }">CANVAS</router-link></li>
        <li><router-link :to="{ name: 'Chat' }">CHAT</router-link></li>
        <li><router-link :to="{ name: 'Lotto' }">LOTTO</router-link></li>
        <li><router-link :to="{ name: 'Button' }">BUTTON</router-link></li>
        <li><router-link :to="{ name: 'Var' }">VAR</router-link></li>
      </ul>
    </nav>
    <section>
      <!-- router-link 컴포넌트가 아래에 출력 됨 -->
      <router-view></router-view>
    </section>
    <footer>
      <p>Copyright 2022. (chuck) all rights reserved.</p>
    </footer>
  </div>
  </template>
  
  <script>
    // import KdasCounter from "@/components/KdasCounter"
    import Alert from './views/Alert.vue'
    // import Toast from './views/Toast.vue'
  
    export default {
      name: "app",

      mounted() {
        // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
        let vh = window.innerHeight * 0.01;
        // Then we set the value in the --vh custom property to the root of the document
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        // We listen to the resize event
        window.addEventListener('resize', () => {
          // We execute the same script as before
          let vh = window.innerHeight * 0.01;
          document.documentElement.style.setProperty('--vh', `${vh}px`);
        });
      },
  
      components: {
        // KdasCounter,
        Alert, // disabled on 2023-7-22, after rabbitmq
        // Toast
      }
    };
  </script>
  
<style>
  .app {
    margin: 2px 2px 2px 2px;
    border: 3px solid #CD5C5C;
    /* display: flex;
    flex-flow: column;
    flex-grow: 1; */
    position: absolute;
    width: calc(100vw - 10px);
    /* min-width: 340px; */
    /* for webapp */
    /* height: calc(100vh - 10px); */
    /* for browser */
    /* height: calc(100vh - 10px - 60px); */
    /* for webapp + broser */
    height: calc(100vh - 10px);
    height: calc((var(--vh, 1vh) * 100) - 10px);
    min-height: 0vh;

    /* 아래 두개는 calc 적용을 못함. 페이지 full 구성 할때는 유용함 */
    /* height: -webkit-fill-available; */
    /* height: fill-available; */
    background: white;
    /* overflow: auto; */
  }
  h2 { text-align: center; }
  header { 
    border: 3px solid #FFD700;
    height: 70px;
    width: calc(100vw - 16px);
    margin: auto;
    /* background-image: url("./images/KBS-HEADER.png"); */
    /* background-size: 40px 30px; */
    /* background-repeat: no-repeat; */
    /* background-position: left top; */
    background-position: 20px 15px;
    background-attachment: absolute;
    
    /* 스크롤 비활성화 */
    touch-action: none;

    /* pointer-events: none; */

  }
  nav {
    display: none;
    /* 스크롤 비활성화 */
    touch-action: none;
  }
  section {
    position: absolute;
    border: 3px solid rgb(118, 198, 252);
    width: calc(100vw - 16px);
    /* for webapp */
    /* height: calc(100vh - 16px - 70px - 55px); */
    /* for browser */
    /* height: calc(100vh - 16px - 70px - 55px - 60px); */
    /* for webapp + broser */
    height: calc((var(--vh, 1vh) * 100) - 16px - 70px - 55px);
    overflow: auto;
    /* 스크롤 비활성화 */
    /* touch-action: none; */
  }
  footer { 
    border: 3px solid #00FA9A; 
    position: absolute;
    left: 0;
    bottom: 0;
    width: calc(100vw - 16px);
    height: 55px;
    /* 스크롤 비활성화 */
    touch-action: none;
  }
  header,
  main,
  section,
  footer {
    text-align: center;
  }
  #logo {
    opacity: 0.2; filter: alpha(opacity=20);
    width: 200px;
  }
  #logo:hover {
    transition: width 2s, opacity 5s;
    opacity: 1.0; filter: alpha(opacity=100);
    width: 360px;
  }
  .inline {
    display: inline;
  }
  .circle { 
    font-size: 20px;
    line-height: 2.0;
  }
  .mytable {
    max-width: 450px;
    /* width:30%; */
    background-color: white;
  }
  .mobileHidden {
    display: none;
  }
  /* #headerHome {
    display: none;
  } */
  #headerMenu {
    display: inline;
    opacity: 1.0; filter: alpha(opacity=100);
    position: absolute;
    left: 15px;
    top: 15px;
    /* z-index: 100; */
  }
  #headerPersonbadge {
    position: absolute;
    text-align: right;
    right: 10px;
    top: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    /* height: 25px; */
    /* width: 100%; */
    /* z-index: 3; */
  }
  #header_visited {
    position: absolute;
    text-align: right;
    right: 50px;
    top: 8px;
    padding-top: 5px;
    padding-bottom: 5px;
    /* height: 25px; */
    /* width: 100%; */
    /* z-index: 3; */
  }
  #search {
    min-width: 375px;
    /* background-color: lightgrey; */
    /* position: fixed; */
    position: absolute;
    left: 0;
    top: 20px;
    /* padding-top: 5px; */
    /* padding-bottom: 5px; */
    /* height: 40px; */
    width: 100%;
    /* z-index: 0; */
  }
  .dropdown {
    display: inline-block;
    position: absolute;
    left: 20px;
    top: 20px;
    /* z-index: 100; */
  }
  .pcSpan {
    display: none;
  }
  .testAlignLeft {
    text-align: left;
  }
  .testAlignright {
    text-align: right;
  }
  .mb-3 {
    text-align: left;
  }
  @media screen and (min-width: 480px) {
    /* 480px 보다 크면 true*/
    .app {
      /* for browser */
      height: calc(100vh - 10px);
    }
    nav {
      display: block;
      border: 3px solid #FF1493;
      width: 150px;
      height: calc(100vh - 16px - 70px - 55px);
      float: left;
      overflow: auto;
    }
    section {
      border: 3px solid #00BFFF;
      position: absolute;
      /* margin-left: 156px; */
      /* width: calc(100vw - 16px - 10px - 150px); */
      margin-left: 150px;
      width: calc(100vw - 16px - 150px);
      height: calc(100vh - 16px - 70px - 55px);
      overflow: auto;
    }
    #headerHome {
      display: inline;
      opacity: 1.0; filter: alpha(opacity=100);
      position: absolute;
      left: 15px;
      top: 15px;
      /* z-index: 100; */
    }
    .dropdown_hidden {
      display: none;
    }
    .mobileBr {
      display: none;
    }
    .pcHidden {
      display: none;
    }
    .pcSpan {
      display: inline;
    }
  }
</style>