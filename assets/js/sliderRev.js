import { playHeadDeactiver, playHeadActiver, backgroundObjRender, imgObjRender, textObjRender, animationBarRender, clickHandler , playHeadStatus } from "./utils.js";

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
    order: 1000000,
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
    delay: 11000,
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


//? vars
var clickCounter = 0,
  dargStatus = false,
  fsLine = $("#tm-rul > div:first-child").offset().left,
  lsLine = $("#tm-rul > div:last-child").offset().left,
  allWidth = lsLine - fsLine,
  tl = gsap.timeline(),
  hunSecond,
  waitPoint = ((wait * allWidth) / allDuration),
  pixelsPerSecond = ($("#tm-rul > .s-line:nth-child(11)").offset().left) - ($("#tm-rul > .s-line:nth-child(1)").offset().left),
  timeLineStatus = 'normal',
  prevE,
  nextE,
  dragE

//! render objects
objectData.sort(function (a, b) { return b.order - a.order })
keyFrames.sort(function (a, b) { return a.delay - b.delay })
for (const obj of objectData) {
  if (obj.role === 'BG') {
    obj.order = 0
    $(".tm-section").append(backgroundObjRender(obj.id, obj.name))
  } else if (obj.type === "img" && obj.role !== 'BG') {
    $(".tm-section").append(imgObjRender(obj.id, obj.name))
  } else if (obj.type === "text" && obj.role !== 'BG') {
    $(".tm-section").append(textObjRender(obj.id, obj.content))
  }
  //! render frame lines
  for (const key of keyFrames) {
    if (key.mid === obj.id) {
      const line = `#${key.mid}-line`
      const width = ((key.duration * allWidth) / allDuration)
      const delay = ((key.delay * allWidth) / allDuration)
      $(line).append(animationBarRender(width, delay, key.id, key.duration))
    }
  }
}
//! Build wait

const timeCounter = (wait) => {
  var time = wait ? parseFloat((wait / 1000).toFixed(2)) : parseFloat(tl.time().toFixed(2))
  var minute = time < 60 ? 0 : Math.floor((time) / 60)
  var seconde = time < 60 ? Math.floor(time) : (Math.floor(time) % 60)
  var hSeconde = Math.floor((time - Math.floor(time)) * 100)
  if(wait) {
    $(".wait-pointer-flag").html(`${minute < 10 ? "0" + minute : minute} : ${seconde < 10 ? "0" + seconde : seconde} : ${hSeconde < 10 ? "0" + hSeconde : hSeconde}`)
  }else {
    $("#count-up").html(`${minute < 10 ? "0" + minute : minute} : ${seconde < 10 ? "0" + seconde : seconde} : ${hSeconde < 10 ? "0" + hSeconde : hSeconde}`)
  }
}
if(wait) {
  $('.wait-pointer').css({'visibility' : 'visible' , 'left' : `${waitPoint + fsLine}px`})
  timeCounter(wait)
}

//!build controller
const lineWidth = (msCount * 1.5) + ((msCount - 1) * 10) + 10;
$(".tm-right-col").css("width", `${lineWidth}px`)
const ctrl = $('#tm-controller > .tm-left-col')
$('.controller-cover').css('top', `${ctrl.offset().top}px`)
//? Timeline

$(document).ready(function () {
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
})
const resetTimeline = () => {
  tl.pause()
  tl.progress(0);
  playHeadDeactiver()
}


tl.eventCallback("onUpdate", movePlayhead).paused(true);
tl.eventCallback("onComplete", resetTimeline);

function movePlayhead() {
  const el = document.getElementById('sortable')
  const x = tl.progress() * tl.duration() * pixelsPerSecond
  gsap.set(".moment-pointer", { x: x });
  timeCounter()
  if (x > (($('#sortable').width() / 2)) - 15) {
    el.scrollTo({ left: x - ($('#sortable').width() / 2) });
  }
}

//* Play func  
$(".la-play").click(function () {
  if (timeLineStatus === 'outer') {
    timeLineStatus = 'normal'
    for (const obj of objectData) {
      tl.killTweensOf(`#${obj.id}-el`);
    }
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
    tl.progress(0);
    playHeadActiver(fsLine)
    tl.play()
  }
  tl.pause()
  tl.progress(0);
  playHeadActiver(fsLine)
  tl.play()
});

//* Reset func 
$('.la-square').click(function () {
  resetTimeline()
})

// ? outer play
$('#outerPlay').click(function () {
  if (timeLineStatus === 'normal') {
    timeLineStatus = 'outer'
    for (const obj of objectData) {
      tl.killTweensOf(`#${obj.id}-el`);
    }
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
    }
  }
  tl.pause()
  tl.progress(0);
  playHeadActiver(fsLine)
  tl.play()
})

//* Sortable rows
$("#sortable").sortable({
  items: "> .sort-row",
  handle: ".la-hand-paper ",
  scroll: false,
  axis: "y",
  update: function (event, ui) {
    const htmlArr = $(`#${event.target.id}`).children()
    for (let i = 5; i < htmlArr.length; i++) {
      var foundIndex = objectData.findIndex(x => x.id === htmlArr[i].id);
      objectData[foundIndex].order = (htmlArr.length - i) * 300;
    }
  },
});




//* Mouse pointer
$("#sortable ").mousemove(function (event) {
  if (dargStatus === false) {
    const bottom = document.getElementById("tm-rul").firstChild.getBoundingClientRect().bottom
    $('.mouse-pointer').css('height', `${$('.moment-pointer').height()}px`)
    if (fsLine <= event.originalEvent.clientX <= lsLine && event.originalEvent.clientY > bottom) {
      $(".mouse-pointer").css('visibility', 'visible')
      $(".mouse-pointer").css('display', 'block')
      $(".mouse-pointer").css('left', `${(event.originalEvent.clientX - 2)}px`)
      const off = $('.mouse-pointer')[0].offsetLeft + $('#sortable').scrollLeft()
      const msPos = ((off - fsLine) * allDuration) / allWidth
      var minute = Math.floor((msPos) / 60000)
      var seconde = Math.floor((msPos - minute * 60000) / 1000)
      var hSeconde = Math.floor((msPos - (seconde * 1000 + minute * 60000)) / 10)
      $("#count-mouse").html(`${minute < 10 ? "0" + minute : minute} : ${seconde < 10 ? "0" + seconde : seconde} : ${hSeconde < 10 ? "0" + hSeconde : hSeconde}`)
      if (msPos < 0) {
        $(".mouse-pointer").css('visibility', 'hidden')
      }
    }
  }
});

$("#sortable").mouseleave(function () {
  $(".mouse-pointer").css('display', 'none')
});
$("#tm-controller").mousemove(function () {
  $(".mouse-pointer").css('display', 'none')
});

//* On flags
$(".frame-line").click(function (event) {
  event.stopPropagation();
  const offsetX = this.offsetX
  const width = $(this).width()
  if (offsetX < (width / 2)) {
    console.log(this.id + " left clicked");
  } else {
    console.log(this.id + " right clicked");
  }
});


$(".sort-row").click(function (event) {
  console.log(event.target.id + " row clicked");
});

//* Stick rul
$("#sortable").scroll(function () {
  $('#tm-controller').css('transform', `translate(0px, ${$("#sortable").scrollTop()}px)`)
  $('.moment-pointer').css('top', `${$("#sortable").scrollTop() + 10}px`)
  $('.wait-pointer').css('top', `${$("#sortable").scrollTop() + 10}px`)
});


// * Click rul
$('#tm-rul').click(function (event) {
  playHeadStatus('on')
  $('.moment-pointer').css('left', `${fsLine}px`)
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
        clickHandler(clickTime, hunSecond)
      } else {
        return null
      }
    } else if (waitPoint < (scPos - fsLine) && clickCounter > 0) {
      tl.pause(clickTime)
      $('.moment-pointer').css('transform', `translate3d(${scPos - fsLine}px, 0px, 0px)`)
      $('.moment-pointer').css('top', `${$("#sortable").scrollTop() + 10}px`)
      clickHandler(clickTime, hunSecond)
    } else if (waitPoint => (scPos - fsLine) && clickCounter > 0) {
      tl.pause(clickTime)
      clickHandler(clickTime, hunSecond)
    }
  } else {
    tl.seek(clickTime)
    clickHandler(clickTime, hunSecond)
  }

})

//* Frame line draggable
    $(".frame-line").draggable({
      scroll: true,
      scrollSensitivity: 100,
      axis: "x",
      containment: "parent",
      start: function (event, ui) {
        dragE = event.target
        prevE = $(`#${dragE.id}`).prev()[0];
        nextE = $(`#${dragE.id}`).next()[0];
      },
      drag: function (event, ui) {
        dragController(event, ui)
      },
      stop: function (event, ui) {
        if(ui.position.left > waitPoint) {
          ui.position.left = waitPoint
        }
        const delay = ((event.target.getBoundingClientRect().left - fsLine + $('#sortable').scrollLeft()) * allDuration) / allWidth
        const animId = event.target.id
        for (const obj of keyFrames) {
          if (obj.id === animId) {
            obj.delay = delay;
            break;
          }
        }
      },
    });

  const dragController = (event, ui) => {
    if (prevE && nextE) {
      if (ui.offset.left < prevE.getBoundingClientRect().right) {
        ui.position.left = (prevE.getBoundingClientRect().right - (ui.offset.left - ui.position.left))
  
      }
      if ((ui.offset.left + dragE.getBoundingClientRect().width) > nextE.getBoundingClientRect().left) {
        ui.position.left = ((nextE.getBoundingClientRect().left - (ui.offset.left - ui.position.left)) - dragE.getBoundingClientRect().width)
      }
    }
    if (!prevE && nextE) {
      if ((ui.offset.left + dragE.getBoundingClientRect().width) > nextE.getBoundingClientRect().left) {
        ui.position.left = ((nextE.getBoundingClientRect().left - (ui.offset.left - ui.position.left)) - dragE.getBoundingClientRect().width)
      }
    }
    if (prevE && !nextE) {
      if (ui.offset.left < prevE.getBoundingClientRect().right) {
        ui.position.left = (prevE.getBoundingClientRect().right - (ui.offset.left - ui.position.left))
      }
    }
    if(ui.position.left > waitPoint) {
      ui.position.left = waitPoint
    }
  }
  


//* Frame line resizable
$(".frame-line").resizable({
  handles: "e,w",
  containment: "parent",
  start: function (event, ui) {
    dragE = event.target
    prevE = $(`#${dragE.id}`).prev()[0];
    nextE = $(`#${dragE.id}`).next()[0];
  },
  resize: function (event, ui) {
    resizeController(event, ui)
  },
  stop: function (event, ui) {
    if(ui.position.left > waitPoint) {
      ui.position.left = waitPoint
    }
    $(this).resizable("option", "maxWidth", null);
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
  },
});;

const resizeController = (event, ui) => {
  if (prevE && nextE) {
    if (dragE.getBoundingClientRect().left < prevE.getBoundingClientRect().right) {
      ui.position.left = (prevE.getBoundingClientRect().right - (dragE.getBoundingClientRect().left - ui.position.left))
      $(event.target).resizable("option", "maxWidth", dragE.getBoundingClientRect().width);
    }
    if (dragE.getBoundingClientRect().right > nextE.getBoundingClientRect().left) {
      ui.position.left = ((nextE.getBoundingClientRect().left - (dragE.getBoundingClientRect().left - ui.position.left)) - ui.size.width)
      $(event.target).resizable("option", "maxWidth", dragE.getBoundingClientRect().width);
    }
  }
  if (!prevE && nextE) {
    if (dragE.getBoundingClientRect().right > nextE.getBoundingClientRect().left) {
      ui.position.left = ((nextE.getBoundingClientRect().left - (dragE.getBoundingClientRect().left - ui.position.left)) - ui.size.width)
      $(event.target).resizable("option", "maxWidth", dragE.getBoundingClientRect().width);
    }
  }
  if (prevE && !nextE) {
    if (dragE.getBoundingClientRect().left < prevE.getBoundingClientRect().right) {
      ui.position.left = (prevE.getBoundingClientRect().right - (dragE.getBoundingClientRect().left - ui.position.left))
      $(event.target).resizable("option", "maxWidth", dragE.getBoundingClientRect().width);
    }
  }
  if(ui.position.left > waitPoint) {
    ui.position.left = waitPoint
  }
  event.target.firstChild.textContent = Math.round((ui.size.width * allDuration) / allWidth)
}


//* Moment pointer draggable
$(".moment-pointer").draggable({
  scroll: true,
  scrollSensitivity: 100,
  axis: "x",
  containment: "parent",
  start: function (event, ui) {
    dargStatus = true
    ui.position.left = 0
  },
  drag: function (event, ui) {
    if (ui.position.left < fsLine) {
      ui.position.left = fsLine
      playHeadStatus('off')
    } else if ((ui.position.left) > lsLine) {
      ui.position.left = lsLine 
    } else {
      playHeadStatus('on')
      const clickPos = ui.position.left
      const clickTime = (((clickPos - fsLine) * allDuration) / allWidth) / 1000
      tl.pause(clickTime)
      clickHandler(clickTime, hunSecond)
      $('.moment-pointer').css('transform', `translate3d(0px, 0px, 0px)`)
    }
  },
  stop: function (event, ui) {
    dargStatus = false
  },
});




