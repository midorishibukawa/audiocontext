const interval = i => Math.pow(2, i / 12)
const root = 440 * interval(-17)

const ctx = new AudioContext()
const osc = ctx.createOscillator()
osc.type = "sawtooth"
osc.connect(ctx.destination)


document.querySelector("#start")?.addEventListener("click", () => {
    osc.frequency.value = root
    const music = [
        { root: 440 * interval(-19)
        , tempo: 4
        , bpm: 128
        , notes: [
              { value: 0
              , duration: 3 / 4 }
            , { value: 3
              , duration: 3 / 4 }
            , { value: -2
              , duration: 1 }
        ] }
    ]

    let start = ctx.currentTime;
    [0, 1, 2].forEach(t =>
    music.forEach(c => c.notes.forEach(
        n => {
            const duration = start + 60 / 124 * n.duration
            osc.frequency.setValueAtTime(root * interval(n.value), start + 60 / 124 * n.duration)
            start += duration
        }
    )))
    osc.start()
})

document.querySelector("#stop")?.addEventListener("click", () => osc.stop())
