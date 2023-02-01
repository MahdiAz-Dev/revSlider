const playHeadStatus = (status) => {
    if(status === 'on') {
        $('.moment-pointer').css('background-color', 'red')
        $('#count-up').css({ 'background-color': 'red', 'border-color': 'red' })
    }else {
        $('.moment-pointer').css('background-color', '')
        $('#count-up').css({ 'background-color': '#0d0d0e', 'border-color': '#777c80' })
        $("#count-up").html('EDITOR')
    }
}

const playHeadDeactiver = () => {
    const el = document.getElementById('sortable')
    $(".la-square").css('display', 'none')
    $(".la-play").css('display', 'block')
    $(".moment-pointer").draggable("enable");
    el.scrollTo({ left: 0, behavior: 'smooth' });
    playHeadStatus('off')
}

const playHeadActiver = (fsLine) => {
    $('.moment-pointer').css('left', `${fsLine}px`)
    $(".moment-pointer").draggable("disable");
    $(this).css('display', 'none')
    $('.la-square').css('display', 'block')
    playHeadStatus('on')
}

const backgroundObjRender = (id , name) => {
    return `<div id=${id} class='tm-row bg-row'><div class=tm-left-col>
            <div class=left-side-line-ob><i class="las la-image"></i> ${name}</div>
            </div><div id='${id}-line' class= 'tm-right-col align-center '></div></div>`
}

const imgObjRender = (id , name) => {
    return `<div id=${id} class='tm-row sort-row'><div class=tm-left-col>
            <div class=left-side-line-ob><i class="las la-image"></i> ${name}</div><i class="las la-hand-paper"></i>
            </div><div id='${id}-line' class= 'tm-right-col align-center '></div></div>`
}

const textObjRender = (id , name) => {
    return `<div id=${id} class='tm-row sort-row'><div class=tm-left-col>
            <div class=left-side-line-ob><i class="las la-quote-left"></i> ${name}</div>  <i class="las la-hand-paper"></i>
            </div><div id='${id}-line' class= 'tm-right-col align-center '></div></div>`
}

const animationBarRender = (width , delay , id , duration) => {
    return `<div id=${id} class='frame-line' style="left:${delay}px ; width:${width}px"><span>${duration}</span></div>`
}

const clickHandler = (t , hunSecond) => {
    hunSecond = (t * 100)
    var minute = Math.floor((hunSecond) / 6000)
    var seconde = Math.floor((hunSecond - minute * 6000) / 100)
    var hSeconde = Math.floor(hunSecond - (seconde * 100 + minute * 6000))
    $("#count-up").html(`${minute < 10 ? "0" + minute : minute} : ${seconde < 10 ? "0" + seconde : seconde} : ${hSeconde < 10 ? "0" + hSeconde : hSeconde}`)
  }

export { playHeadDeactiver, playHeadActiver , backgroundObjRender , imgObjRender ,textObjRender , animationBarRender , clickHandler , playHeadStatus}