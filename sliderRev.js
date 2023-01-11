//* Fake data

//? Time line duration
const allDuration = 160000
const wait = 13000

//? Objects data
const objectData = [
  {
    id: "ob-1",
    type: "img",
    name: "image01",
    order: 200,
    role: "",
    className: "img-class",
    imgSrc: "assets/img/download.jfif",
    width: "300px",
    height: "400px",
    offsetLeft: "600px",
    offsetTop: "900px",
  },
  {
    id: "ob-2",
    type: "text",
    role: "",
    name: "textppppp",
    order: 400,
    className: "txt-class",
    content: "Hello everyone !",
    width: "150px",
    height: "200px",
    offsetLeft: "100px",
    offsetTop: "200px"
  },
  {
    id: "ob-3",
    type: "text",
    role: "",
    name: "mahdi",
    order: 800,
    className: "txt-class",
    content: "Mahdi!",
    width: "150px",
    height: "200px",
    offsetLeft: "100px",
    offsetTop: "200px"
  },
  {
    id: "ob-4",
    type: "text",
    role: "",
    name: "No",
    order: 600,
    className: "txt-class",
    content: "No everyone !",
    width: "150px",
    height: "200px",
    offsetLeft: "100px",
    offsetTop: "200px"
  },
  {
    id: "ob-5",
    type: "text",
    role: "BG",
    name: "BG",
    order: 600,
    className: "txt-class",
    content: "No everyone !",
    width: "150px",
    height: "200px",
    offsetLeft: "100px",
    offsetTop: "200px"
  },

];

//? Keyframes data
const keyFrames = [
  {
    id: "key-1",
    mid: "ob-1",
    name: 'ball-move',
    duration: 3000,
    delay: 4000,
    timingFunction: 'linear',
    iterationCount: '',
    direction: 'normal',
    fillMode: 'forwards',
    x: 400,
    rotation: 360,
    role: '',
    ease: 'none'

  },
  {
    id: "key-7",
    mid: "ob-1",
    name: 'ball-move',
    duration: 1200,
    delay: 13000,
    timingFunction: 'linear',
    iterationCount: '',
    direction: 'normal',
    fillMode: 'forwards',
    x: 1000,
    role: 'outer',
    ease: 'none'

  },
  {
    id: "key-2",
    mid: "ob-2",
    name: 'text-color',
    duration: 5000,
    delay: 3000,
    timingFunction: 'linear',
    iterationCount: '',
    direction: 'normal',
    fillMode: 'forwards',
    fontSize: 30,
    color: 'red',
    role: '',
    ease: 'none'
  },
  {
    id: "key-4",
    mid: "ob-2",
    name: 'text-cl',
    duration: 2500,
    delay: 9000,
    timingFunction: 'linear',
    iterationCount: '',
    direction: 'normal',
    fillMode: 'forwards',
    rotationY: 60,
    role: '',
    ease: 'none'
  },
  {
    id: "key-3",
    mid: "ob-2",
    name: 'text-spin',
    duration: 550,
    delay: 2255,
    timingFunction: 'linear',
    iterationCount: '',
    direction: 'normal',
    fillMode: 'forwards',
    backgroundColor: 'blue',
    role: '',
    ease: 'none'
  }

]

var tl = gsap.timeline()

var clickCounter = 0
var dargStatus = false
//! Build time line ruler
const msCount = (allDuration / 100) + 1
for (let i = 0; i < msCount; i++) {
  if (i === 0 || i % 10 == 0) {
    const I = (i / 10) + "s"
    $("#tm-rul").append(`<div class=s-line><span class=s-line-num>${I}</span></div>`);
  } else {
    $("#tm-rul").append("<div class=ms-line></div>");
  }
}
const fsLine = $("#tm-rul > div:first-child").offset().left
const lsLine = $("#tm-rul > div:last-child").offset().left
const allWidth = lsLine - fsLine;

//! render objects
objectData.sort(function (a, b) { return b.order - a.order })
for (const obj of objectData) {
  if (obj.role === 'BG') {
    $(".tm-section").append(`<div id=${obj.id} class='tm-row bg-row'><div class=tm-left-col>
        <div class=left-side-line-ob><i class="las la-image"></i> ${obj.name}</div>
      </div><div id='${obj.id}-line' class= 'tm-right-col align-center '></div></div>`)
  }
}
for (let i = 0; i < objectData.length; i++) {
  if (objectData[i].type === "img" && objectData[i].role !== 'BG') {
    $(".tm-section").append(`<div id=${objectData[i].id} class='tm-row sort-row'><div class=tm-left-col>
        <div class=left-side-line-ob><i class="las la-image"></i> ${objectData[i].name}</div>
      </div><div id='${objectData[i].id}-line' class= 'tm-right-col align-center '></div></div>`)
  } else if (objectData[i].type === "text" && objectData[i].role !== 'BG') {
    $(".tm-section").append(`<div id=${objectData[i].id} class='tm-row sort-row'><div class=tm-left-col>
        <div class=left-side-line-ob><i class="las la-quote-left"></i> ${objectData[i].content}</div>
      </div><div id='${objectData[i].id}-line' class= 'tm-right-col align-center '></div></div>`)
  }

  //! render frame lines
  keyFrames.sort(function (a, b) { return a.delay - b.delay })
  for (let j = 0; j < keyFrames.length; j++) {
    if (keyFrames[j].mid === objectData[i].id) {
      const x = `#${keyFrames[j].mid}-line`
      const width = ((keyFrames[j].duration * allWidth) / allDuration)
      const delay = ((keyFrames[j].delay * allWidth) / allDuration)
      if (keyFrames[j].role === 'outer') {
        $(x).append(`<div id=${keyFrames[j].id} class='outer-frame-line' style="left:${delay + 10}px ; min-width:${width}px">${keyFrames[j].duration}</div>`)
      } else {
        $(x).append(`<div id=${keyFrames[j].id} class=frame-line style="left:${delay + 10}px ; min-width:${width}px">${keyFrames[j].duration}</div>`)
      }
    }
  }
}
var tl
var hunSecond
//! Build wait
const waitDelay = (wait * allWidth) / allDuration
$('.align-center').append(`<div class=wait-div style="left:${waitDelay + 10 - 70 - 2}px;">WAIT</div>`)
const lineWidth = (msCount * 1.5) + ((msCount - 1) * 10) + 10;
$(".tm-right-col").css("width", `${lineWidth}px`)
const ctrl = $('#tm-controller > .tm-left-col')
$('.controller-cover').css('top', `${ctrl.offset().top}px`)
var waitPoint = ((wait * allWidth) / allDuration)
$(document).ready(function () {
  tl = gsap.timeline()
  for (const a of keyFrames) {
    if (a.role !== 'outer') {
      tl.to(`#${a.mid}-el`, {
        x: a.x,
        duration: (a.duration / 1000),
        rotation: a.rotation,
        rotationY: a.rotationY,
        fontSize: a.fontSize,
        color: a.color,
        ease: a.ease,
        backgroundColor: a.backgroundColor
      }, (a.delay / 1000));
    }
  }
  tl.pause()
})

//? Play func  
var timer;
$(".la-play").click(function () {
  clickCounter = clickCounter + 1
  if (tl.paused() === true) {
    tl.restart();
    tl.kill();
    clearTimeout(timer)
    $('.moment-pointer').css('background-color', '')
    $('#count-up').css({ 'background-color': '#0d0d0e', 'border-color': '#777c80' })
    $("#count-up").html('EDITOR')
    $(".la-square").css('display', 'none')
    $(".la-play").css('display', 'block')
    $('.moment-pointer').css('left', `${fsLine}px`)
    $('.moment-pointer').removeClass('dargable-pointer')
    $('.moment-pointer').css('transform', `translate(0px , 0px)`)
  }
  tl = gsap.timeline()
  $(this).css('display', 'none')
  $('.la-square').css('display', 'block')
  $('.moment-pointer').css('background-color', 'red')
  $('.moment-pointer').removeClass('dargable-pointer')
  $('#count-up').css({ 'background-color': 'red', 'border-color': 'red' })

  var waitPoint = ((wait * allWidth) / allDuration)
  for (const a of keyFrames) {
    if (a.role !== 'outer') {
      tl.to(`#${a.mid}-el`, {
        x: a.x,
        duration: (a.duration / 1000),
        rotation: a.rotation,
        rotationY: a.rotationY,
        fontSize: a.fontSize,
        color: a.color,
        ease: a.ease,
        backgroundColor: a.backgroundColor
      }, (a.delay / 1000));
    }
    tl.to(".moment-pointer", {
      x: waitPoint,
      duration: (wait / 1000),
      ease: 'none',
      onComplete: function () {
        tl.restart();
        tl.kill();
        clearTimeout(timer)
        $('.moment-pointer').css('background-color', '')
        $('#count-up').css({ 'background-color': '#0d0d0e', 'border-color': '#777c80' })
        $("#count-up").html('EDITOR')
        $('.moment-pointer').addClass('dargable-pointer')
        $(".la-square").css('display', 'none')
        $(".la-play").css('display', 'block')
      }
    }, 0);
  }

  //? Time counter
  hunSecond = 0
  timerA()
});

function timerA() {
  var interval = 10;
  var expected = Date.now() + interval;
  timer = setTimeout(step, interval);
  function step() {
    var dt = Date.now() - expected;
    // if (dt > interval) {
    //   // something really bad happened. Maybe the browser (tab) was inactive?
    //   // possibly special handling to avoid futile "catch up" run
    // }
    ++hunSecond
    var minute = Math.floor((hunSecond) / 6000)
    var seconde = Math.floor((hunSecond - minute * 6000) / 100)
    var hSeconde = Math.floor(hunSecond - (seconde * 100 + minute * 6000))
    $("#count-up").html(`${minute < 10 ? "0" + minute : minute} : ${seconde < 10 ? "0" + seconde : seconde} : ${hSeconde < 10 ? "0" + hSeconde : hSeconde}`)
    expected += interval;
    timer = setTimeout(step, Math.max(0, interval - dt));
  }
}


//? Reset func 
$('.la-square').click(function () {
  $(this).css('display', 'none')
  $('.la-play').css('display', 'block')
  tl.restart();
  tl.kill();
  clearTimeout(timer)
  $('.moment-pointer').css('background-color', '')
  $('#count-up').css({ 'background-color': '#0d0d0e', 'border-color': '#777c80' })
  $("#count-up").html('EDITOR')
  $(".la-square").css('display', 'none')
  $(".la-play").css('display', 'block')
  $('.moment-pointer').addClass('dargable-pointer')
})


// ? outer play
const outerPlay = () => {
  clickCounter = clickCounter + 1
  if (tl.paused() === true) {
    tl.restart();
    tl.kill();
    clearTimeout(timer)
    $('.moment-pointer').css('background-color', '')
    $('#count-up').css({ 'background-color': '#0d0d0e', 'border-color': '#777c80' })
    $("#count-up").html('EDITOR')
    $(".la-square").css('display', 'none')
    $(".la-play").css('display', 'block')
    $('.moment-pointer').css('left', `${fsLine}px`)
    $('.moment-pointer').removeClass('dargable-pointer')
    $('.moment-pointer').css('transform', `translate(0px , 0px)`)
  }
  $('.moment-pointer').css('transform', `translate(0px, 0px)`)
  tl = gsap.timeline()
  $(this).css('display', 'none')
  $('.la-square').css('display', 'block')
  $('.moment-pointer').css('background-color', 'red')
  $('.moment-pointer').removeClass('dargable-pointer')
  $('#count-up').css({ 'background-color': 'red', 'border-color': 'red' })

  for (const a of keyFrames) {
    tl.to(`#${a.mid}-el`, {
      x: a.x,
      duration: (a.duration / 1000),
      rotation: a.rotation,
      rotationY: a.rotationY,
      fontSize: a.fontSize,
      color: a.color,
      ease: a.ease,
      backgroundColor: a.backgroundColor
    }, (a.delay / 1000));
    tl.to(".moment-pointer", {
      x: allWidth,
      duration: (allDuration / 1000),
      ease: 'none',
      onComplete: function () {
        tl.restart();
        tl.kill();
        clearTimeout(timer)
        $('.moment-pointer').css('background-color', '')
        $('#count-up').css({ 'background-color': '#0d0d0e', 'border-color': '#777c80' })
        $("#count-up").html('EDITOR')
        $('.moment-pointer').addClass('dargable-pointer')
        $(".la-square").css('display', 'none')
        $(".la-play").css('display', 'block')
      }
    }, 0);
  }
}

//* Sortable rows
$("#sortable").sortable({
  items: "> .sort-row",
  grid: [10, 30],
  axis: "y",
  update: function (event, ui) {
    const htmlArr = $(`#${event.target.id}`).children()
    for (let i = 4; i < htmlArr.length; i++) {
      var foundIndex = objectData.findIndex(x => x.id === htmlArr[i].id);
      objectData[foundIndex].order = (htmlArr.length - i) * 300;
    }
  },
});

//* Frame line resize
const parentLeft = document.getElementById("tm-rul").firstChild.getBoundingClientRect()
const parentRight = document.getElementById("tm-rul").lastChild.getBoundingClientRect()
interact('.frame-line')
  .resizable({
    edges: { left: true, right: true },

    listeners: {
      move(event) {
        var target = event.target
        const sibling = $(`#${target.id}`).siblings()
        if (sibling.length === 0) {
          if (event.rect.left > parentLeft.right && event.rect.right < parentRight.left) {
            var x = (parseFloat(target.getAttribute('data-x')) || 0)
            target.style.minWidth = event.rect.width + 'px'
            x += event.deltaRect.left
            target.style.transform = 'translate(' + x + 'px,' + 0 + 'px)'
            target.setAttribute('data-x', x)
            target.textContent = Math.round((event.rect.width * allDuration) / allWidth)
          }
        } else if (sibling.length === 1) {
          const siblingRect = sibling[0].getBoundingClientRect()
          if (event.rect.left > parentLeft.right && event.rect.right < parentRight.left && siblingRect.left > event.rect.right) {
            var x = (parseFloat(target.getAttribute('data-x')) || 0)
            target.style.minWidth = event.rect.width + 'px'
            x += event.deltaRect.left
            target.style.transform = 'translate(' + x + 'px,' + 0 + 'px)'
            target.setAttribute('data-x', x)
            target.textContent = Math.round((event.rect.width * allDuration) / allWidth)
          } else if (event.rect.left > parentLeft.right && event.rect.right < parentRight.left && siblingRect.right < event.rect.left) {
            var x = (parseFloat(target.getAttribute('data-x')) || 0)
            target.style.minWidth = event.rect.width + 'px'
            x += event.deltaRect.left
            target.style.transform = 'translate(' + x + 'px,' + 0 + 'px)'
            target.setAttribute('data-x', x)
            target.textContent = Math.round((event.rect.width * allDuration) / allWidth)
          }
        } else if (sibling.length > 1) {
          const prev = $(`#${target.id}`).prev()
          const next = $(`#${target.id}`).next()
          if (prev.length > 0 && next.length > 0) {
            if (event.rect.left > prev[0].getBoundingClientRect().right && event.rect.right < next[0].getBoundingClientRect().left) {
              var x = (parseFloat(target.getAttribute('data-x')) || 0)
              target.style.minWidth = event.rect.width + 'px'
              x += event.deltaRect.left
              target.style.transform = 'translate(' + x + 'px,' + 0 + 'px)'
              target.setAttribute('data-x', x)
              target.textContent = Math.round((event.rect.width * allDuration) / allWidth)
            }
          } else if (next.length === 0) {
            if (event.rect.right < parentRight.left && event.rect.left > prev[0].getBoundingClientRect().right) {
              var x = (parseFloat(target.getAttribute('data-x')) || 0)
              target.style.minWidth = event.rect.width + 'px'
              x += event.deltaRect.left
              target.style.transform = 'translate(' + x + 'px,' + 0 + 'px)'
              target.setAttribute('data-x', x)
              target.textContent = Math.round((event.rect.width * allDuration) / allWidth)
            }
          } else if (prev.length === 0) {
            if (event.rect.left > parentLeft.right && event.rect.right < parentRight.left && event.rect.right < next[0].getBoundingClientRect().left) {
              var x = (parseFloat(target.getAttribute('data-x')) || 0)
              target.style.minWidth = event.rect.width + 'px'
              x += event.deltaRect.left
              target.style.transform = 'translate(' + x + 'px,' + 0 + 'px)'
              target.setAttribute('data-x', x)
              target.textContent = Math.round((event.rect.width * allDuration) / allWidth)
            }
          }
        }
      },
      end(event) {
        const delay = ((event.target.getBoundingClientRect().left - fsLine + $('#sortable').scrollLeft()) * allDuration) / allWidth
        const duration = (event.target.getBoundingClientRect().width * allDuration) / allWidth
        const animId = event.target.id
        for (const obj of keyFrames) {
          if (obj.id === animId) {
            if (delay >= 0) {
              obj.delay = delay;
            }
            obj.duration = duration;
            break;
          }
        }
      }
    },
    modifiers: [
      interact.modifiers.restrictEdges({
        outer: 'parent'
      }),
    ],

    inertia: true
  })

interact('.outer-frame-line')
  .resizable({
    edges: { left: true, right: true },

    listeners: {
      move(event) {
        var target = event.target
        const next = $(`#${target.id}`).next()
        console.log(next[0].getBoundingClientRect().right);
        console.log(event.rect.left);
        if (event.rect.right < parentRight.left && event.rect.left > next[0].getBoundingClientRect().right) {
          var x = (parseFloat(target.getAttribute('data-x')) || 0)
          target.style.minWidth = event.rect.width + 'px'
          x += event.deltaRect.left
          target.style.transform = 'translate(' + x + 'px,' + 0 + 'px)'
          target.setAttribute('data-x', x)
          target.textContent = Math.round((event.rect.width * allDuration) / allWidth)
        }
      },
      end(event) {
        const delay = ((event.target.getBoundingClientRect().left - fsLine + $('#sortable').scrollLeft()) * allDuration) / allWidth
        const duration = (event.target.getBoundingClientRect().width * allDuration) / allWidth
        const animId = event.target.id
        for (const obj of keyFrames) {
          if (obj.id === animId) {
            if (delay >= 0) {
              obj.delay = delay;
            }
            obj.duration = duration;
            break;
          }
        }
      }
    },
    modifiers: [
      interact.modifiers.restrictEdges({
        outer: 'parent'
      }),
    ],

    inertia: true
  })

//* Frame line drag
interact('.frame-line')
  .draggable({
    startAxis: 'x',
    lockAxis: 'x',
    inertia: true,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ],
    autoScroll: true,
    listeners: {
      move: dragMoveListener,
      end(event) {
        const delay = ((event.target.getBoundingClientRect().left - fsLine + $('#sortable').scrollLeft()) * allDuration) / allWidth
        const animId = event.target.id
        for (const obj of keyFrames) {
          if (obj.id === animId) {
            obj.delay = delay;
            break;
          }
        }
      }
    }
  })

function dragMoveListener(event) {
  const target = event.target
  const sibling = $(`#${target.id}`).siblings()
  const parentLeft = document.getElementById("tm-rul").firstChild.getBoundingClientRect()
  const parentRight = document.getElementById("tm-rul").lastChild.getBoundingClientRect()
  if (sibling.length === 0) {
    if (event.rect.left > parentLeft.right && event.rect.right < parentRight.left) {
      var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
      target.style.transform = 'translate(' + x + 'px, ' + 0 + 'px)'
      target.setAttribute('data-x', x)
    }
  } else if (sibling.length === 1) {
    const siblingRect = sibling[0].getBoundingClientRect()
    if (event.rect.left > parentLeft.right && event.rect.right < parentRight.left && siblingRect.left > event.rect.right) {
      var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
      target.style.transform = 'translate(' + x + 'px, ' + 0 + 'px)'
      target.setAttribute('data-x', x)
    } else if (event.rect.left > parentLeft.right && event.rect.right < parentRight.left && siblingRect.right < event.rect.left) {
      var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
      target.style.transform = 'translate(' + x + 'px, ' + 0 + 'px)'
      target.setAttribute('data-x', x)
    }
  } else if (sibling.length > 1) {
    const prev = $(`#${target.id}`).prev()
    const next = $(`#${target.id}`).next()
    if (prev.length > 0 && next.length > 0) {
      if (event.rect.left > parentLeft.right && event.rect.right < parentRight.left && event.rect.left > prev[0].getBoundingClientRect().right && event.rect.right < next[0].getBoundingClientRect().left) {
        var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
        target.style.transform = 'translate(' + x + 'px, ' + 0 + 'px)'
        target.setAttribute('data-x', x)
      }
    } else if (next.length === 0) {
      if (event.rect.left > parentLeft.right && event.rect.right < parentRight.left && event.rect.left > prev[0].getBoundingClientRect().right) {
        var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
        target.style.transform = 'translate(' + x + 'px, ' + 0 + 'px)'
        target.setAttribute('data-x', x)
      }
    } else if (prev.length === 0) {
      if (event.rect.left > parentLeft.right && event.rect.right < parentRight.left && event.rect.right < next[0].getBoundingClientRect().left) {
        var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
        target.style.transform = 'translate(' + x + 'px, ' + 0 + 'px)'
        target.setAttribute('data-x', x)
      }
    }
  }
}
window.dragMoveListener = dragMoveListener

//* Moment Pointer Drag
interact('.dargable-pointer')
  .draggable({
    startAxis: 'x',
    lockAxis: 'x',
    inertia: true,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ],
    autoScroll: true,
    listeners: {
      move(event) {
        const target = event.target
        if (event.rect.left >= fsLine) {
          var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
          target.style.transform = 'translate(' + x + 'px, ' + 0 + 'px)'
          target.setAttribute('data-x', x)
          $('.moment-pointer').css('background-color', 'red')
          $('#count-up').css({ 'background-color': 'red', 'border-color': 'red' })
          const clickPos = event.rect.left
          const scroll = $('#sortable').scrollLeft()
          const clickTime = (((clickPos - fsLine + scroll) * allDuration) / allWidth) / 1000
          tl.pause(clickTime)
          clickHandler(clickTime)
        } else if ((parseFloat(target.getAttribute('data-x'))) < fsLine - 2) {
          $('.moment-pointer').css('background-color', '')
          $('#count-up').css({ 'background-color': '#0d0d0e', 'border-color': '#777c80' })
          $("#count-up").html('EDITOR')
        }
      },
      end(event) {
        dargStatus = false
      }
      ,
      start() {
        dargStatus = true
      }
    }
  })

//? Mouse pointer
$("#sortable").mousemove(function (event) {
  if (dargStatus === false) {
    const bottom = document.getElementById("tm-rul").firstChild.getBoundingClientRect().bottom
    $('.mouse-pointer').css('height', `${$('.moment-pointer').height()}px`)
    if (fsLine <= event.originalEvent.clientX <= lsLine && event.originalEvent.clientY > bottom) {
      $(".mouse-pointer").css('display', 'block')
      $(".mouse-pointer").css('left', `${(event.originalEvent.clientX - 2)}px`)
      const off = $('.mouse-pointer')[0].offsetLeft + $('#sortable').scrollLeft()
      const msPos = ((off - fsLine) * allDuration) / allWidth
      var minute = Math.floor((msPos) / 60000)
      var seconde = Math.floor((msPos - minute * 60000) / 1000)
      var hSeconde = Math.floor((msPos - (seconde * 1000 + minute * 60000)) / 10)
      $("#count-mouse").html(`${minute < 10 ? "0" + minute : minute} : ${seconde < 10 ? "0" + seconde : seconde} : ${hSeconde < 10 ? "0" + hSeconde : hSeconde}`)
    }
  }
});
$("#sortable").mouseleave(function () {
  $(".mouse-pointer").css('display', 'none')
});
$("#tm-controller").mousemove(function () {
  $(".mouse-pointer").css('display', 'none')
});

//? On flags
$(".frame-line").click(function (event) {
  event.stopPropagation();
  const offsetX = event.offsetX
  const width = $(`#${event.target.id}`).width()
  if (offsetX < (width / 2)) {
    console.log(event.target.id + " left clicked");
  } else {
    console.log(event.target.id + " right clicked");
  }
});


$(".sort-row").click(function (event) {
  console.log(event.target.id + " row clicked");
});

//? Stick rul
$("#sortable").scroll(function () {
  $('#tm-controller').css('transform', `translate(0px, ${$("#sortable").scrollTop()}px)`)
  if (clickCounter !== 0) {
    $('.moment-pointer').css('top', `${$("#sortable").scrollTop() + 10}px`)
  } else {
    $('.moment-pointer').css('top', `${$("#sortable").scrollTop() + 10}px`)
  }
});


// ? Click rul
$('#tm-rul').click(function (event) {
  $('.moment-pointer').css('background-color', 'red')
  $('#count-up').css({ 'background-color': 'red', 'border-color': 'red' })
  const clickPos = event.screenX
  const scroll = $('#sortable').scrollLeft()
  const clickTime = (((clickPos - fsLine + scroll) * allDuration) / allWidth) / 1000
  const scPos = scroll + clickPos
  if ($('.la-square').css('display') === 'none') {
    if (clickCounter === 0) {
      if ((fsLine - .25) <= scPos && scPos <= (lsLine + .25)) {
        $('.moment-pointer').css('transform', `translate3d(${scPos - fsLine}px, 0px, 0px)`)
        $('.moment-pointer').css('top', `${$("#sortable").scrollTop() + 10}px`)
        tl.pause(clickTime)
        clickHandler(clickTime)
      } else {
        return null
      }
    } else if (waitPoint < (scPos - fsLine) && clickCounter > 0) {
      tl.pause(clickTime)
      $('.moment-pointer').css('transform', `translate3d(${scPos - fsLine}px, 0px, 0px)`)
      $('.moment-pointer').css('top', `${$("#sortable").scrollTop() + 10}px`)
      clickHandler(clickTime)
    } else if (waitPoint => (scPos - fsLine) && clickCounter > 0) {
      tl.pause(clickTime)
      clickHandler(clickTime)
    }
  } else {
    tl.seek(clickTime)
    clickHandler(clickTime)
  }

})

const clickHandler = (t) => {
  hunSecond = (t * 100)
  var minute = Math.floor((hunSecond) / 6000)
  var seconde = Math.floor((hunSecond - minute * 6000) / 100)
  var hSeconde = Math.floor(hunSecond - (seconde * 100 + minute * 6000))
  $("#count-up").html(`${minute < 10 ? "0" + minute : minute} : ${seconde < 10 ? "0" + seconde : seconde} : ${hSeconde < 10 ? "0" + hSeconde : hSeconde}`)
}
