<template>
  <div>
    <h1>TIMECODE GENERATOR</h1>
    <p>SMPTE LTC TIMECODE</p>
    <p>timecode to frames</p>
    <p>fromes to timecode</p>
    <br><br>
    <input type="radio" id="fps2997" class="fps" value="29.97" v-model="fps" />
    <label for="fps2997">29.97</label>
    <input type="radio" id="fps30" class="fps" value="30" v-model="fps" />
    <label for="fps30">30</label>
    <input type="radio" id="fps5994" class="fps" value="59.94" v-model="fps" />
    <label for="fps5994">59.94</label>
    <input type="radio" id="fps60" class="fps" value="60" v-model="fps" />
    <label for="fps60">60</label>
    <br><br>
    <!-- <Timecode /> -->
    <!-- <input type="text" id="timecode_hh" class="timecode" ref="focusMe" v-model="hh" maxlength="2" required> -->
    <input type="Number" id="timecode_hh" class="timecodeNumber" ref="focusMe" min="0" max="10" v-model="hh" required 
      @keypress.enter="timecode_to_frame" @focusout="timecode_to_frame">
    <span>:</span>
    <!-- <input type="text" id="timecode_mm" class="timecode" v-model="mm" maxlength="2" required> -->
    <input type="Number" id="timecode_mm" class="timecodeNumber" min="0" max="59" v-model="mm" required 
      @keypress.enter="timecode_to_frame" @focusout="timecode_to_frame">
    <span>:</span>
    <!-- <input type="text" id="timecode_ss" class="timecode" v-model="ss" maxlength="2" required> -->
    <input type="Number" id="timecode_ss" class="timecodeNumber" min="0" max="59" v-model="ss" required 
      @keypress.enter="timecode_to_frame" @focusout="timecode_to_frame">
    <span v-show="isDropframe">;</span>
    <span v-show="!isDropframe">:</span>
    <!-- <input type="text" id="timecode_ff" class="timecode" v-model="ff" maxlength="2" required> -->
    <!-- <input v-show="parseInt(Math.round(fps)/)==" type="Number" id="timecode_ff" class="timecodeNumber" min="0" max="29" v-model="ff" required 
      @keypress.enter="timecode_to_frame" @focusout="timecode_to_frame"> -->
    <input type="Number" id="timecode_ff" class="timecodeNumber" min="0" :max="max" v-model="ff" required 
      @keypress.enter="timecode_to_frame" @focusout="timecode_to_frame">
    <br class="mobileBr">
    <button @click="timecode_to_frame">변환</button>
    <br class="mobileBr">
    <span class="pcSpan"> => </span>
    <input type="text" id="framecount" class="framecount" v-model="framecount" disabled>
    <!-- <button @click="timecode_to_frame">변환</button> -->

    <br><br>
    <input type="Number" id="framecountInput" class="framecount" min="0" v-model="framecountInput" placeholder="frames">
    <br class="mobileBr">
    <button @click="frame_to_timecode">변환</button>
    <br class="mobileBr">
    <span class="pcSpan"> => </span>
    <input type="text" id="framecountTohh" class="timecode" v-model="framecountTohh" maxlength="2" disabled>
    <span>:</span>
    <input type="text" id="framecountTomm" class="timecode" v-model="framecountTomm" maxlength="2" disabled>
    <span>:</span>
    <input type="text" id="framecountToss" class="timecode" v-model="framecountToss" maxlength="2" disabled>
    <span v-show="isDropframe">;</span>
    <span v-show="!isDropframe">:</span>
    <input type="text" id="framecountToff" class="timecode" v-model="framecountToff" maxlength="2" disabled>
    <!-- <button @click="frame_to_timecode">변환</button> -->
  </div>
</template>

<script>
  // import Timecode from '@/components/Timecode.vue'

  export default {
    name: 'Timecode',
    data() {
      return {
        hh: "00",
        mm: "00",
        totalmm: 0,
        timeBase: 0,
        hourFrames: 0,
        minuteFrames: 0,

        ss: '00',
        ff: '00',
        framecount: 0,

        framecountTohh: "00",
        framecountTomm: "00",
        framecountToss: "00",
        framecountToff: "00",
        framecountInput: "",
        framecountNew: "00",

        frame: 0,
        d: 0,
        m: 0,
        frRound: 0,

        fps: 29.97,
        isDropframe: true,
        dropFrames: 0,

        max: 29,

      }
    },
    computed: {
    },
    methods: {
      timecode_to_frame () {
        this.totalmm = (60 * Number(this.hh)) + Number(this.mm)
        if (this.isDropframe) {
          this.update_ff()
          
          // console.log("totalmm : ", this.totalmm)
          this.dropFrames = parseInt(Math.round( this.fps * 0.066666))
          this.timeBase = parseInt(Math.round(this.fps))

          this.hourFrames   = parseInt(this.timeBase * 60 * 60)
          this.minuteFrames = parseInt(this.timeBase * 60)

          this.framecount = parseInt(((this.hourFrames * Number(this.hh)) 
          + (this.minuteFrames * Number(this.mm)) 
          + (this.timeBase * Number(this.ss)) 
          + Number(this.ff)) - (this.dropFrames * (this.totalmm - parseInt(this.totalmm / 10))))

          this.chargeZero()
        } else {
          this.chargeZero()
          this.framecount = parseInt((this.totalmm * 60 + Number(this.ss)) * this.fps + Number(this.ff))
        }
      },
      chargeZero() {
        this.hh = this.hh.padStart(2, '0')
        this.mm = this.mm.padStart(2, '0')
        this.ss = this.ss.padStart(2, '0')
        this.ff = String(this.ff).padStart(2, '0')
      },
      update_ff() {
        if ((this.mm % 10) != 0) {
          if (this.ff < this.dropFrames) {
            this.ff = this.dropFrames
          }
        }
      },
      frame_to_timecode () {
        this.dropFrames = parseInt(Math.round( this.fps * 0.066666))
        const framesPerHour = parseInt(Math.round( this.fps * 3600))
        const framesPer24Hours   = framesPerHour * 24
        const framesPer10Minutes = parseInt(Math.round( this.fps * 600))
        const framesPerMinute    = parseInt(Math.round(this.fps) * 60 - this.dropFrames)

        this.frame = this.framecountInput
        this.frame = this.frame % framesPer24Hours

        this.d = parseInt(this.frame / framesPer10Minutes)
        this.m = this.frame % framesPer10Minutes

        if (this.isDropframe) {
          this.frame = this.frame + (this.dropFrames * 9 * this.d) + this.dropFrames * (parseInt((this.m - this.dropFrames) / framesPerMinute))
        } else {
          // this.frame = this.frame + this.dropFrames * 9 * this.d
        }

        this.frRound = parseInt(Math.round(this.fps))
        this.framecountTohh = parseInt(parseInt(parseInt(this.frame / this.frRound) / 60) / 60)
        this.framecountTomm = parseInt(parseInt(parseInt(this.frame / this.frRound) / 60) % 60)
        this.framecountToss = parseInt(this.frame / this.frRound) % 60
        this.framecountToff = parseInt(this.frame % this.frRound)

        this.framecountTohh = String(this.framecountTohh).padStart(2, '0')
        this.framecountTomm = String(this.framecountTomm).padStart(2, '0')
        this.framecountToss = String(this.framecountToss).padStart(2, '0')
        this.framecountToff = String(this.framecountToff).padStart(2, '0')
      },
      updateIsDropframe() {
        if (this.fps % 1 != 0) {
          this.isDropframe = true
          console.log("isDropframe : ", this.isDropframe)
        } else {
          this.isDropframe = false
          console.log("isDropframe : ", this.isDropframe)
        }
      }
    },
    watch: {
      mm() {
        // this.update_ff();
      },
      framecountInput() {
        this.frame_to_timecode()
      },
      fps() {
        this.max = parseInt(Math.round(this.fps)) - 1
        this.updateIsDropframe()
        this.frame_to_timecode()
        this.timecode_to_frame()
      },
    },
    components: {
      // Timecode
    },
    mounted() {
      this.$nextTick(() => this.$refs.focusMe.focus())
    }
  }
</script>

<style scoped>
.timecodeNumber {
  width: 50px;
  text-align: center;
  margin: 2px;
}
.timecode {
  width: 50px;
  text-align: center;
  margin: 2px;
}
.framecount {
  max-width: 90px;
  text-align: right;
  margin: 2px;
}
.fps {
  margin: 5px;
}
</style>